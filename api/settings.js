// Settings & Config API - Backed by MongoDB Atlas
import { getDatabase } from './db.js';

export default async function handler(req, res) {
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

  try {
    const db = await getDatabase();
    const settingsCol = db.collection('settings');

    // GET SETTINGS
    if (req.method === 'GET') {
      const type = req.query.type || 'all';
      if (type === 'all') {
        const allSettings = await settingsCol.find({}).toArray();
        const settingsMap = {};
        allSettings.forEach(item => {
          settingsMap[item.key] = item.value;
        });
        return res.status(200).json(settingsMap);
      } else {
        const item = await settingsCol.findOne({ key: type });
        return res.status(200).json(item ? item.value : null);
      }
    }

    // SAVE SETTINGS
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) {}
      }

      const { key, value } = body;
      if (!key) {
        return res.status(400).json({ error: 'Key is required' });
      }

      await settingsCol.updateOne(
        { key },
        { $set: { key, value, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );

      return res.status(200).json({ success: true, key });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Settings API error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
