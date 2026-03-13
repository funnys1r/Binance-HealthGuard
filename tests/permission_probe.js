#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

function parseToolsMd(content) {
  const apiKey = (content.match(/- API Key:\s*(.+)/i) || [])[1]?.trim();
  const secret = (content.match(/- Secret:\s*(.+)/i) || [])[1]?.trim();
  const testnet = ((content.match(/- Testnet:\s*(.+)/i) || [])[1] || 'false').trim().toLowerCase() === 'true';
  if (!apiKey || !secret) throw new Error('Missing API Key or Secret in TOOLS.md');
  return { apiKey, secret, testnet };
}

function getJson({ hostname, pathWithQuery, apiKey }) {
  return new Promise((resolve, reject) => {
    const headers = apiKey ? { 'X-MBX-APIKEY': apiKey } : {};
    const req = https.request({ hostname, port: 443, path: pathWithQuery, method: 'GET', timeout: 10000, headers }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        let parsed;
        try { parsed = JSON.parse(body); } catch { parsed = { raw: body }; }
        resolve({ statusCode: res.statusCode, body: parsed });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(new Error('timeout')); });
    req.end();
  });
}

async function getServerTime(hostname) {
  const res = await getJson({ hostname, pathWithQuery: '/api/v3/time' });
  if (res.statusCode !== 200 || !res.body.serverTime) {
    throw new Error(`Failed to fetch server time: ${JSON.stringify(res.body)}`);
  }
  return res.body.serverTime;
}

async function main() {
  const tools = fs.readFileSync(path.join(__dirname, '..', 'TOOLS.md'), 'utf8');
  const { apiKey, secret, testnet } = parseToolsMd(tools);
  const hostname = testnet ? 'testnet.binance.vision' : 'api.binance.com';
  const serverTime = await getServerTime(hostname);
  const recvWindow = 10000;

  const endpoints = [
    { name: 'apiRestrictions', basePath: '/sapi/v1/account/apiRestrictions' },
    { name: 'accountStatus', basePath: '/sapi/v1/account/status' },
  ];

  for (const ep of endpoints) {
    const query = `timestamp=${serverTime}&recvWindow=${recvWindow}`;
    const signature = crypto.createHmac('sha256', secret).update(query).digest('hex');
    const pathWithQuery = `${ep.basePath}?${query}&signature=${signature}`;
    const res = await getJson({ hostname, pathWithQuery, apiKey });
    const safeKey = `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`;
    console.log(JSON.stringify({
      endpoint: ep.name,
      host: hostname,
      apiKey: safeKey,
      serverTime,
      statusCode: res.statusCode,
      ok: res.statusCode === 200,
      response: res.body,
    }, null, 2));
  }
}

main().catch(err => {
  console.error(JSON.stringify({ error: err.message }, null, 2));
  process.exit(1);
});
