import express from 'express';
import { getClient } from '../client.js';

const app = express();
const port = process.env.PORT || 4000;

app.get('/latest', async (_req, res) => {
  try {
    const client = getClient();
    const n = await client.getBlockNumber();
    res.json({ latest: Number(n) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 API running on http://localhost:${port}`);
});
