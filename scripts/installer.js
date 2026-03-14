#!/usr/bin/env node
/**
 * @file installer.js
 * @description Layered installer for Binance HealthGuard.
 * Supports core-only install, optional intelligence add-ons, and dry-run mode.
 */

const { execSync } = require('child_process');

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const coreOnly = args.has('--core-only');
const withOptionalIntel = args.has('--with-optional-intel');

const results = [];

const coreInstallSteps = [
  { cmd: 'npx skills add https://github.com/binance/binance-skills-hub --skill assets --yes --global', label: 'assets' },
  { cmd: 'npx skills add https://github.com/binance/binance-skills-hub --skill alpha --yes --global', label: 'alpha' },
  { cmd: 'npx skills add https://github.com/binance/binance-skills-hub --skill spot --yes --global', label: 'spot' },
  { cmd: 'npx skills add https://github.com/binance/binance-skills-hub --skill crypto-market-rank --yes --global', label: 'crypto-market-rank' },
  { cmd: 'npx skills add https://github.com/binance/binance-skills-hub --skill trading-signal --yes --global', label: 'trading-signal' },
];

const bundledCoreChecks = [
  { path: 'skills/binance/simple-earn/SKILL.md', label: 'simple-earn (bundled)' },
  { path: 'skills/binance/token-unlocks/SKILL.md', label: 'token-unlocks (bundled)' },
];

const optionalIntelSteps = [
  { cmd: 'npx skills add https://github.com/6551Team/opennews-mcp --skill opennews', label: 'opennews' },
  { cmd: 'npx skills add https://github.com/6551Team/opentwitter-mcp --skill opentwitter', label: 'opentwitter' },
];

function printPlan() {
  console.log('--- Binance HealthGuard Layered Installer ---\n');
  console.log(`Mode: ${coreOnly ? 'core-only' : withOptionalIntel ? 'core+optional-intel' : 'core-only (default)'}`);
  console.log(`Dry-run: ${dryRun ? 'yes' : 'no'}`);
  console.log('\nCore install set (external official skills):');
  coreInstallSteps.forEach(s => console.log(`- ${s.label}`));
  console.log('\nCore bundled skills (shipped with this repository):');
  bundledCoreChecks.forEach(s => console.log(`- ${s.label}`));
  console.log('\nOptional intelligence set:');
  optionalIntelSteps.forEach(s => console.log(`- ${s.label}`));
  console.log('\nPreflight:');
  console.log('- node cli/healthguard.js');
  console.log('');
}

function run(step) {
  console.log(`> Executing: ${step.cmd}`);
  if (dryRun) {
    results.push({ label: step.label, status: 'DRY_RUN' });
    return;
  }
  try {
    execSync(step.cmd, { stdio: 'inherit' });
    results.push({ label: step.label, status: 'OK' });
  } catch (e) {
    results.push({ label: step.label, status: 'FAIL' });
    console.error(`| Failed: ${step.cmd}`);
    printSummary();
    process.exit(1);
  }
}

function checkBundled(step) {
  console.log(`> Checking bundled skill: ${step.path}`);
  if (dryRun) {
    results.push({ label: step.label, status: 'DRY_RUN' });
    return;
  }
  const fs = require('fs');
  if (fs.existsSync(step.path)) {
    results.push({ label: step.label, status: 'OK' });
  } else {
    results.push({ label: step.label, status: 'FAIL' });
    console.error(`| Missing bundled skill: ${step.path}`);
    printSummary();
    process.exit(1);
  }
}

function printSummary() {
  console.log('\n--- Install Summary ---');
  for (const item of results) {
    console.log(`- ${item.label}: ${item.status}`);
  }
}

printPlan();

console.log('[1/4] Installing core official Binance skills...');
for (const step of coreInstallSteps) run(step);

console.log('\n[2/4] Verifying bundled core skills...');
for (const step of bundledCoreChecks) checkBundled(step);

if (!coreOnly && withOptionalIntel) {
  console.log('\n[3/4] Installing optional intelligence providers...');
  for (const step of optionalIntelSteps) run(step);
} else {
  console.log('\n[3/4] Skipping optional intelligence providers.');
  if (!withOptionalIntel) {
    console.log('Tip: rerun with --with-optional-intel if you want OpenNews/OpenTwitter.');
  }
}

console.log('\n[4/4] Finalizing environment...');
run({ cmd: 'node cli/healthguard.js', label: 'preflight' });

printSummary();
console.log('\n✅ Deployment Complete! Core mode is ready. Optional intelligence can be added later with --with-optional-intel.');
