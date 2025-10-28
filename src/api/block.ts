import { Request, Response } from 'express';
import { getClient } from '../client.js';

export async function getBlockHandler(req: Request, res: Response) {
  try {
    const num = req.params.num;
    if (!num) return res.status(400).json({ error: 'Missing block number' });
    const client = getClient();
    const b = await client.getBlock({ blockNumber: BigInt(num), includeTransactions: false });
    res.json({
      number: Number(b.number),
      hash: b.hash,
      txCount: b.transactions?.length ?? 0,
      gasUsed: b.gasUsed?.toString(),
      timestamp: Number(b.timestamp),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
