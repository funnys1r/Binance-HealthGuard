/**
 * @file healthguard.js
 * @description The CLI Orchestrator for Binance HealthGuard.
 * This script provides a production-grade entry point for the HealthGuard Agent.
 * @author High-Quality-Dev-Expert
 */

const fs = require('fs');
const path = require('path');

function logger(msg, type = 'INFO') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${type}] ${msg}`);
}

async function runPreCheck() {
    logger('Initializing Binance HealthGuard System...');
    
    // 1. Check for TOOLS.md
    const toolsPath = path.join(__dirname, '../TOOLS.md');
    if (!fs.existsSync(toolsPath)) {
        logger('TOOLS.md not found! Please create it based on README.md', 'ERROR');
        process.exit(1);
    }
    logger('Found credentials in TOOLS.md.');

    // 2. Scan for Skills
    const skillsDir = path.join(__dirname, '../skills/healthguard');
    if (!fs.existsSync(skillsDir)) {
        logger('HealthGuard skills directory missing!', 'ERROR');
        process.exit(1);
    }
    logger('HealthGuard skills detected.');

    // 3. Mode Selection
    const args = process.argv.slice(2);
    const mode = args.includes('--guardian') ? 'GUARDIAN' : 'OBSERVER';
    logger(`Selected Mode: ${mode}`);

    console.log('\n--- SYSTEM READY ---');
    console.log(`To start the agentic loop, please copy the path of this workspace into OpenClaw.`);
    console.log(`Current Workspace: ${path.resolve(__dirname, '..')}`);
    console.log('--------------------\n');
}

runPreCheck().catch(err => {
    logger(err.message, 'FATAL');
    process.exit(1);
});
