// Orders API Endpoint - Backed by MongoDB Atlas
import { getDatabase } from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PATCH,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('orders');

    // GET ALL ORDERS (For Admin Panel)
    if (req.method === 'GET') {
      const orders = await collection.find({}).sort({ timestamp: -1, createdAt: -1 }).toArray();
      const cleanOrders = orders.map(({ _id, ...rest }) => ({
        ...rest,
        _id: _id.toString()
      }));
      return res.status(200).json(cleanOrders);
    }

    // CREATE NEW CUSTOMER ORDER (From Checkout Modal)
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) {}
      }

      if (!body) {
        return res.status(400).json({ error: 'Order data is required' });
      }

      const order = {
        ...body,
        id: body.id || `WZ-${Date.now().toString().slice(-6)}`,
        status: body.status || 'Pending',
        timestamp: body.timestamp || new Date().toISOString(),
        createdAt: new Date()
      };

      await collection.insertOne(order);
      const { _id, ...cleanOrder } = order;

      return res.status(201).json({ success: true, order: cleanOrder });
    }

    // UPDATE ORDER STATUS (Admin action)
    if (req.method === 'PATCH' || req.method === 'PUT') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) {}
      }

      const { id, status } = body;
      if (!id) {
        return res.status(400).json({ error: 'Order id is required' });
      }

      await collection.updateOne(
        { id },
        { $set: { status, updatedAt: new Date().toISOString() } }
      );

      return res.status(200).json({ success: true, id, status });
    }

    // DELETE ORDER (Admin action)
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Order id is required' });
      }

      await collection.deleteOne({ id });
      return res.status(200).json({ success: true, id });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Orders API error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
