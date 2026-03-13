#!/usr/bin/env node
/**
 * @file installer.js
 * @description One-click dependency installer for Binance HealthGuard.
 * Automatically adds official skills and MCP servers.
 */

const { execSync } = require('child_process');

const results = [];

function run(cmd, label) {
    console.log(`> Executing: ${cmd}`);
    try {
        execSync(cmd, { stdio: 'inherit' });
        results.push({ label, status: 'OK' });
    } catch (e) {
        results.push({ label, status: 'FAIL' });
        console.error(`| Failed: ${cmd}`);
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

console.log('--- Binance HealthGuard Installer ---\n');

// 1. Install Official Binance Skills
console.log('[1/3] Adding official Binance skills...');
run('npx skills add binance/assets', 'binance/assets');
run('npx skills add binance/alpha', 'binance/alpha');
run('npx skills add binance/spot', 'binance/spot');

// 2. Install 6551 MCP Services
console.log('\n[2/3] Connecting to 6551 News & Twitter MCP...');
run('npx skills add https://github.com/6551Team/opennews-mcp --skill opennews', 'opennews');
run('npx skills add https://github.com/6551Team/opentwitter-mcp --skill opentwitter', 'opentwitter');

// 3. Final Pre-flight
console.log('\n[3/3] Finalizing environment...');
run('node cli/healthguard.js', 'preflight');

printSummary();
console.log('\n✅ Deployment Complete! Please configure your TOOLS.md now.');
