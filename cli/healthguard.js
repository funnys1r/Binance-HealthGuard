/**
 * @file healthguard.js
 * @description The CLI Orchestrator for Binance HealthGuard.
 * This script provides a production-grade entry point for the HealthGuard Agent.
 * @author High-Quality-Dev-Expert
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

function logger(msg, type = 'INFO') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${type}] ${msg}`);
}

function parseToolsMd(content) {
    const apiKey = (content.match(/- API Key:\s*(.+)/i) || [])[1]?.trim();
    const secret = (content.match(/- Secret:\s*(.+)/i) || [])[1]?.trim();
    const testnet = ((content.match(/- Testnet:\s*(.+)/i) || [])[1] || 'false').trim().toLowerCase() === 'true';
    return { apiKey, secret, testnet };
}

function getJson({ hostname, pathWithQuery, apiKey }) {
    return new Promise((resolve, reject) => {
        const headers = apiKey ? { 'X-MBX-APIKEY': apiKey } : {};
        const req = https.request(
            {
                hostname,
                port: 443,
                path: pathWithQuery,
                method: 'GET',
                timeout: 10000,
                headers,
            },
            (res) => {
                let body = '';
                res.on('data', (c) => (body += c));
                res.on('end', () => {
                    let parsed;
                    try {
                        parsed = JSON.parse(body);
                    } catch {
                        parsed = { raw: body };
                    }
                    resolve({ statusCode: res.statusCode, body: parsed });
                });
            }
        );
        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy(new Error('timeout'));
        });
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

async function probeBinance(hostname, attempts = 2) {
    let lastError;
    for (let i = 1; i <= attempts; i++) {
        try {
            const serverTime = await getServerTime(hostname);
            return { ok: true, serverTime, attempt: i };
        } catch (err) {
            lastError = err;
            logger(`Connectivity probe attempt ${i}/${attempts} failed: ${err.message}`, 'WARN');
        }
    }
    throw lastError;
}

async function fetchApiRestrictions({ hostname, apiKey, secret, serverTime }) {
    const recvWindow = 10000;
    const timestamp = serverTime || (await getServerTime(hostname));
    const query = `timestamp=${timestamp}&recvWindow=${recvWindow}`;
    const signature = crypto.createHmac('sha256', secret).update(query).digest('hex');
    const pathWithQuery = `/sapi/v1/account/apiRestrictions?${query}&signature=${signature}`;
    return getJson({ hostname, pathWithQuery, apiKey });
}

function summarizeRestrictions(body) {
    return {
        enableReading: !!body.enableReading,
        enableSpotAndMarginTrading: !!body.enableSpotAndMarginTrading,
        enableWithdrawals: !!body.enableWithdrawals,
        enableFutures: !!body.enableFutures,
        enableMargin: !!body.enableMargin,
        enableInternalTransfer: !!body.enableInternalTransfer,
        ipRestrict: !!body.ipRestrict,
    };
}

function printPermissionSummary(summary) {
    console.log('\n--- API KEY SCOPE SUMMARY ---');
    for (const [key, value] of Object.entries(summary)) {
        console.log(`- ${key}: ${value ? 'enabled' : 'disabled'}`);
    }
    let verdict = 'SAFE_FOR_OBSERVER';
    if (summary.enableWithdrawals) verdict = 'UNSAFE_WITHDRAWALS_ENABLED';
    else if (summary.enableSpotAndMarginTrading) verdict = 'GUARDIAN_CAPABLE_CONFIRM_REQUIRED';
    console.log(`Verdict: ${verdict}`);
    console.log('-----------------------------\n');
    return verdict;
}

async function runPreCheck() {
    logger('Initializing Binance HealthGuard System...');

    const toolsPath = path.join(__dirname, '../TOOLS.md');
    if (!fs.existsSync(toolsPath)) {
        logger('TOOLS.md not found! Please create it based on README.md', 'ERROR');
        process.exit(1);
    }
    logger('Found credentials in TOOLS.md.');

    const skillsDir = path.join(__dirname, '../skills/healthguard');
    if (!fs.existsSync(skillsDir)) {
        logger('HealthGuard skills directory missing!', 'ERROR');
        process.exit(1);
    }
    logger('HealthGuard skills detected.');

    const content = fs.readFileSync(toolsPath, 'utf8');
    const { apiKey, secret, testnet } = parseToolsMd(content);
    if (!apiKey || !secret) {
        logger('Missing Binance API Key or Secret in TOOLS.md.', 'ERROR');
        process.exit(1);
    }
    const hostname = testnet ? 'testnet.binance.vision' : 'api.binance.com';

    if (content.toLowerCase().includes('withdrawal: true') || content.toLowerCase().includes('enable_withdrawals: true')) {
        console.log('\n' + '!'.repeat(60));
        logger('CRITICAL SECURITY ALERT: Withdrawal permissions detected in local configuration!', 'FATAL');
        logger('For safety reasons, HealthGuard WILL NOT START with withdrawal access.', 'FATAL');
        logger('Please edit TOOLS.md and remove withdrawal permissions immediately.', 'FATAL');
        console.log('!'.repeat(60) + '\n');
        process.exit(1);
    }
    logger('Local configuration audit passed: no explicit withdrawal markers detected.');

    logger('Probing Binance API connectivity (server time handshake + retry)...');
    let probeResult;
    try {
        probeResult = await probeBinance(hostname, 2);
        logger(`Network connection to ${hostname}... [SUCCESS]`);
        logger(`Binance server time acquired... [${probeResult.serverTime}]`);
        logger(`Connectivity stabilized on attempt ${probeResult.attempt}.`);
    } catch (err) {
        logger(`Network Probe Failed: ${err.message}`, 'FATAL');
        logger('Binance HealthGuard requires a stable API connection to function.', 'FATAL');
        process.exit(1);
    }

    logger('Initiating real Binance API key scope audit...');
    let restrictions;
    try {
        const res = await fetchApiRestrictions({ hostname, apiKey, secret, serverTime: probeResult.serverTime });
        if (res.statusCode !== 200) {
            throw new Error(`Permission audit failed with status ${res.statusCode}: ${JSON.stringify(res.body)}`);
        }
        restrictions = summarizeRestrictions(res.body);
    } catch (err) {
        logger(`Permission Audit Failed: ${err.message}`, 'FATAL');
        logger('Could not verify API key scope against Binance. Refusing to continue blindly.', 'FATAL');
        process.exit(1);
    }

    const verdict = printPermissionSummary(restrictions);
    if (verdict === 'UNSAFE_WITHDRAWALS_ENABLED') {
        console.log('\n' + '!'.repeat(60));
        logger('PERMISSION AUDIT FAILED: Binance reports withdrawal-enabled API key.', 'FATAL');
        logger('Safety First: We refuse to run with withdrawal-enabled keys.', 'FATAL');
        console.log('!'.repeat(60) + '\n');
        process.exit(1);
    }
    if (verdict === 'GUARDIAN_CAPABLE_CONFIRM_REQUIRED') {
        logger('Trading-capable API key detected. Guardian mode is possible, but human CONFIRM is still mandatory.', 'INFO');
    } else {
        logger('Read-only API key verified. Observer mode is the correct default.', 'INFO');
    }

    const args = process.argv.slice(2);
    const mode = args.includes('--guardian') ? 'GUARDIAN' : 'OBSERVER';
    logger(`Selected Mode: ${mode}`);

    console.log('\n--- SYSTEM READY ---');
    console.log('To start the agentic loop, please copy the path of this workspace into OpenClaw.');
    console.log(`Current Workspace: ${path.resolve(__dirname, '..')}`);
    console.log('--------------------\n');
}

runPreCheck().catch((err) => {
    logger(err.message, 'FATAL');
    process.exit(1);
});
