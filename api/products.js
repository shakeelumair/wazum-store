// Products API Endpoint - Backed by MongoDB Atlas
import { getDatabase } from './db.js';
import { initialProducts } from '../src/data/initialData.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('products');

    // GET ALL PRODUCTS
    if (req.method === 'GET') {
      let products = await collection.find({}).toArray();
      
      // Auto-seed initial catalog if database collection is empty
      if (!products || products.length === 0) {
        console.log('Seeding initial products to MongoDB Atlas...');
        await collection.insertMany(initialProducts);
        products = await collection.find({}).toArray();
      }

      // Remove MongoDB internal _id or map cleanly
      const cleanProducts = products.map(({ _id, ...rest }) => ({
        ...rest,
        _id: _id.toString()
      }));

      return res.status(200).json(cleanProducts);
    }

    // CREATE OR UPDATE PRODUCT (Admin action)
    if (req.method === 'POST' || req.method === 'PUT') {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) {}
      }

      if (Array.isArray(body)) {
        // Bulk update / reorder
        await collection.deleteMany({});
        await collection.insertMany(body);
        return res.status(200).json({ success: true, count: body.length });
      }

      const product = body;
      if (!product || !product.id) {
        return res.status(400).json({ error: 'Product must have an id' });
      }

      const { _id, ...productData } = product;
      await collection.updateOne(
        { id: product.id },
        { $set: productData },
        { upsert: true }
      );

      return res.status(200).json({ success: true, product: productData });
    }

    // DELETE PRODUCT
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Product id is required for deletion' });
      }

      await collection.deleteOne({ id });
      return res.status(200).json({ success: true, id });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Products API error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
