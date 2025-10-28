import { Request, Response } from 'express';
import { getClient } from '../client.js';

export async function getTxHandler(req: Request, res: Response) {
  try {
    const hash = req.params.hash;
    if (!hash) return res.status(400).json({ error: 'Missing tx hash' });
    const client = getClient();
    const t = await client.getTransaction({ hash: hash as `0x${string}` });
    res.json({
      hash: t.hash,
      from: t.from,
      to: t.to,
      value: t.value?.toString(),
      nonce: t.nonce,
      gas: t.gas?.toString(),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
