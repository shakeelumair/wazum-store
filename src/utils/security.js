// Secure Cryptographic Hashing Utility for Wazum Luxury Store
// Uses standard Web Crypto API (SHA-256) with unique cryptographic salt.
// Plaintext passwords are NEVER stored in code, bundles, or localStorage.

const AUTH_SALT = 'wazum_lux_auth_salt_2026_#';

// Precomputed SHA-256 hashes with AUTH_SALT for default credentials
export const DEFAULT_ADMIN_HASH = '6c384255dbb7c6e7a7de9c675427e1dc2495f5e1380ba5990a60959e737a2a36';
export const DEFAULT_SUPER_ADMIN_HASH = '57660607abb4dbba365d105ba1bbfab8d4e2f7003944cedb596bb608138b39f5';

/**
 * Hash a plain password string using SHA-256 with the application salt
 * @param {string} password - The plain password to hash
 * @returns {Promise<string>} Hex-encoded SHA-256 hash
 */
export const hashPassword = async (password) => {
  if (!password) return '';
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(AUTH_SALT + password);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (err) {
    console.error('Cryptographic hashing error:', err);
  }
  return '';
};

/**
 * Verify a plain password against a stored SHA-256 hash
 * @param {string} inputPassword - The password entered by the user
 * @param {string} storedHash - The stored SHA-256 hash
 * @returns {Promise<boolean>} True if password matches hash
 */
export const verifyPassword = async (inputPassword, storedHash) => {
  if (!inputPassword || !storedHash) return false;
  const inputHash = await hashPassword(inputPassword);
  return inputHash === storedHash;
};
