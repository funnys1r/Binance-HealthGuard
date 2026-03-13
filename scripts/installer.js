#!/usr/bin/env node
/**
 * @file installer.js
 * @description One-click dependency installer for Binance HealthGuard.
 * Automatically adds official skills and MCP servers.
 */

const { execSync } = require('child_process');

function run(cmd) {
    console.log(`> Executing: ${cmd}`);
    try {
        execSync(cmd, { stdio: 'inherit' });
    } catch (e) {
        console.error(`| Failed: ${cmd}`);
    }
}

console.log('--- Binance HealthGuard Installer ---\n');

// 1. Install Official Binance Skills
console.log('[1/3] Adding official Binance skills...');
run('npx skills add binance/assets');
run('npx skills add binance/alpha');
run('npx skills add binance/spot');

// 2. Install 6551 MCP Services
console.log('\n[2/3] Connecting to 6551 News & Twitter MCP...');
run('npx skills add https://github.com/6551Team/opennews-mcp --skill opennews');
run('npx skills add https://github.com/6551Team/opentwitter-mcp --skill opentwitter');

// 3. Final Pre-flight
console.log('\n[3/3] Finalizing environment...');
run('node cli/healthguard.js');

console.log('\n✅ Deployment Complete! Please configure your TOOLS.md now.');
