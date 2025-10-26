#!/usr/bin/env node
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';
import { getClient } from './client';

async function latest() {
  const c = getClient();
  const n = await c.getBlockNumber();
  console.log(Number(n));
}

async function block(num?: string) {
  if (!num) throw new Error('Provide --number');
  const c = getClient();
  const bn = BigInt(num);
  const b = await c.getBlock({ blockNumber: bn, includeTransactions: false });
  console.log(JSON.stringify({
    number: Number(b.number),
    hash: b.hash,
    txCount: b.transactions?.length ?? 0,
    gasUsed: b.gasUsed?.toString(),
    timestamp: Number(b.timestamp),
  }, null, 2));
}

async function tx(hash?: string) {
  if (!hash) throw new Error('Provide --hash');
  const c = getClient();
  const t = await c.getTransaction({ hash: hash as `0x${string}` });
  console.log(JSON.stringify({
    hash: t.hash,
    from: t.from,
    to: t.to,
    value: t.value?.toString(),
    nonce: t.nonce,
    gas: t.gas?.toString(),
  }, null, 2));
}

yargs(hideBin(process.argv))
  .command('latest', 'print latest block number', {}, latest)
  .command('block', 'fetch block by number', (y) => y.option('number', { type:'string', demandOption:true }), (argv)=>block(argv.number as string))
  .command('tx', 'fetch tx by hash', (y) => y.option('hash', { type:'string', demandOption:true }), (argv)=>tx(argv.hash as string))
  .demandCommand(1)
  .strict()
  .help()
  .parse();
