import { getClient } from './client';

async function main() {
  const client = getClient();
  const height = await client.getBlockNumber();
  console.log('Latest block:', Number(height));
}
main().catch(console.error);
