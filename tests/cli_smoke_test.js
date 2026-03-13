#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.join(__dirname, '..');
const cliPath = path.join(repoRoot, 'cli', 'healthguard.js');

function makeTempWorkspace() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'hg-smoke-'));
}

function copyCliToTemp(tempDir) {
  fs.mkdirSync(path.join(tempDir, 'cli'), { recursive: true });
  fs.mkdirSync(path.join(tempDir, 'skills', 'healthguard'), { recursive: true });
  fs.copyFileSync(cliPath, path.join(tempDir, 'cli', 'healthguard.js'));
}

function runCli(tempDir) {
  try {
    const out = execFileSync(process.execPath, [path.join(tempDir, 'cli', 'healthguard.js')], {
      cwd: tempDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env },
    });
    return { code: 0, output: out };
  } catch (err) {
    return {
      code: err.status ?? 1,
      output: `${err.stdout || ''}${err.stderr || ''}`,
    };
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function testMissingTools() {
  const tempDir = makeTempWorkspace();
  copyCliToTemp(tempDir);
  const result = runCli(tempDir);
  assert(result.code === 1, 'Expected missing TOOLS.md to fail with exit code 1');
  assert(result.output.includes('TOOLS.md not found'), 'Expected missing TOOLS.md message');
  console.log('[PASS] missing TOOLS.md fails correctly');
}

function testWithdrawalMarker() {
  const tempDir = makeTempWorkspace();
  copyCliToTemp(tempDir);
  fs.writeFileSync(path.join(tempDir, 'TOOLS.md'), `## Binance Accounts\n### main\n- API Key: demo\n- Secret: demo\n- Testnet: false\n- withdrawal: true\n`);
  const result = runCli(tempDir);
  assert(result.code === 1, 'Expected withdrawal marker to fail with exit code 1');
  assert(result.output.includes('Withdrawal permissions detected'), 'Expected withdrawal detection message');
  console.log('[PASS] withdrawal marker is blocked before live checks');
}

function main() {
  testMissingTools();
  testWithdrawalMarker();
  console.log('✅ CLI smoke tests passed.');
}

main();
