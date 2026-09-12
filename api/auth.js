// Vercel Serverless Authentication Backend API
// Provides true server-side authentication, cryptographic token generation, and signature verification.
// Even if a user attempts to manipulate browser localStorage or console, access is strictly rejected
// without a cryptographically valid token signed by the server's private secret.

import crypto from 'crypto';

// Server-side private secret. Can also be set in Vercel Environment Variables as WAZUM_AUTH_SECRET.
const SERVER_SECRET = process.env.WAZUM_AUTH_SECRET || 'wazum_server_sec_master_2026_9x8b7c6d5e4f3a2b1c';

// Server-side credential salts (NEVER exposed to the browser bundle)
const AUTH_SALT = 'wazum_lux_auth_salt_2026_#';

// Server-side default password hashes
const DEFAULT_ADMIN_HASH = '6c384255dbb7c6e7a7de9c675427e1dc2495f5e1380ba5990a60959e737a2a36';
const DEFAULT_SUPER_ADMIN_HASH = '57660607abb4dbba365d105ba1bbfab8d4e2f7003944cedb596bb608138b39f5';

function hashPassword(password) {
  return crypto.createHash('sha256').update(AUTH_SALT + password).digest('hex');
}

function signToken(payload) {
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SERVER_SECRET).update(payloadStr).digest('base64url');
  return `${payloadStr}.${signature}`;
}

function verifyToken(token, requiredRole = null) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  
  const [payloadStr, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SERVER_SECRET).update(payloadStr).digest('base64url');
  
  // Timing-safe comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSig);
  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Date.now()) {
      return null; // Expired
    }
    if (requiredRole && payload.role !== requiredRole && payload.role !== 'superadmin') {
      return null; // Role mismatch
    }
    return payload;
  } catch (err) {
    return null;
  }
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    body = body || {};

    const action = req.query.action || body.action || 'login';

    // -------------------------------------------------------------
    // ACTION: VERIFY SESSION TOKEN
    // -------------------------------------------------------------
    if (action === 'verify') {
      const authHeader = req.headers.authorization;
      const token = (authHeader && authHeader.startsWith('Bearer ')) 
        ? authHeader.substring(7) 
        : body.token;
      
      const role = body.role || null;
      const verified = verifyToken(token, role);

      if (!verified) {
        return res.status(401).json({
          valid: false,
          error: 'Access Denied: Session token is invalid, tampered with, or expired.'
        });
      }

      return res.status(200).json({
        valid: true,
        role: verified.role,
        username: verified.username,
        expiresAt: verified.exp
      });
    }

    // -------------------------------------------------------------
    // ACTION: LOGIN AUTHENTICATION
    // -------------------------------------------------------------
    if (action === 'login') {
      const { username, password, role = 'admin' } = body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: 'Username and password are required.'
        });
      }

      const inputHash = hashPassword(password);
      const cleanUser = username.trim().toLowerCase();

      // Check Super Admin
      if (role === 'superadmin' || cleanUser === 'superadmin') {
        const expectedSuperUser = (process.env.SUPER_ADMIN_USERNAME || 'superadmin').toLowerCase();
        const expectedSuperHash = process.env.SUPER_ADMIN_HASH || DEFAULT_SUPER_ADMIN_HASH;

        if (cleanUser === expectedSuperUser && inputHash === expectedSuperHash) {
          const exp = Date.now() + (8 * 60 * 60 * 1000); // 8 hours
          const token = signToken({
            username: cleanUser,
            role: 'superadmin',
            iat: Date.now(),
            exp
          });

          return res.status(200).json({
            success: true,
            role: 'superadmin',
            username: cleanUser,
            token,
            expiresAt: exp
          });
        }
        return res.status(401).json({
          success: false,
          error: 'Invalid Super Admin ID or Master Key! Access Denied.'
        });
      }

      // Check Regular Admin
      const expectedAdminUser = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
      const expectedAdminHash = process.env.ADMIN_HASH || DEFAULT_ADMIN_HASH;

      if (cleanUser === expectedAdminUser && inputHash === expectedAdminHash) {
        const exp = Date.now() + (8 * 60 * 60 * 1000); // 8 hours
        const token = signToken({
          username: cleanUser,
          role: 'admin',
          iat: Date.now(),
          exp
        });

        return res.status(200).json({
          success: true,
          role: 'admin',
          username: cleanUser,
          token,
          expiresAt: exp
        });
      }

      return res.status(401).json({
        success: false,
        error: 'Invalid Admin ID or Password! Please try again.'
      });
    }

    return res.status(400).json({ error: 'Unknown authentication action requested.' });

  } catch (error) {
    console.error('Serverless auth error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
