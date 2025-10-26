import 'dotenv/config';
import { createClient, http } from 'viem';

export function getClient() {
  const url = process.env.RPC_URL;
  if (!url) throw new Error('Missing RPC_URL in .env');
  return createClient({ transport: http(url) });
}
