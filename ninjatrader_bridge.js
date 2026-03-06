const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies from TradingView
app.use(bodyParser.json());

// ------------------------------------------------------------------
// CONFIGURATION - NINJATRADER / TRADOVATE API
// ------------------------------------------------------------------
// Get these from your Prop Firm or Tradovate dashboard (Application Settings)
const config = {
    authUrl: 'https://demo.tradovateapi.com/v1/auth/accesstokenrequest', // Use live URL for real trading
    orderUrl: 'https://demo.tradovateapi.com/v1/order/placeorder',       // Use live URL for real trading

    // Credentials
    name: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
    appId: 'YOUR_APP_ID',
    appVersion: '1.0',
    cid: 0, // CID is optional for some, required for others
    sec: 'YOUR_API_SECRET',

    // Trading Settings
    accountId: 123456, // Your underlying Account ID
    symbol: 'NQH6',    // Example: Nasdaq March 2026 Contract
};

let accessToken = null;
let tokenExpiry = 0;

// ------------------------------------------------------------------
// HELPER: AUTHENTICATION
// ------------------------------------------------------------------
async function getAuthToken() {
    const now = Date.now();
    // Return existing token if valid
    if (accessToken && now < tokenExpiry) {
        return accessToken;
    }

    console.log('Authenticating with NinjaTrader/Tradovate...');

    try {
        const response = await axios.post(config.authUrl, {
            name: config.name,
            password: config.password,
            appId: config.appId,
            appVersion: config.appVersion,
            cid: config.cid,
            sec: config.sec
        });

        if (response.data && response.data.accessToken) {
            accessToken = response.data.accessToken;
            // Set expiry a bit before the actual expiration (usually comes in response)
            // Assuming 1 hour for safety if not specified
            tokenExpiry = now + (3600 * 1000);
            console.log('Authentication successful.');
            return accessToken;
        } else {
            console.error('Auth succeeded but no token returned:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Authentication Failed:', error.message);
        return null;
    }
}

// ------------------------------------------------------------------
// ROUTES
// ------------------------------------------------------------------

app.get('/', (req, res) => {
    res.send('NinjaTrader Bridge is Running. Point TradingView Webhooks to /webhook');
});

// WEBHOOK ENDPOINT
// Expected Payload from TradingView:
// { "action": "buy", "symbol": "NQ", "quantity": 1 }
app.post('/webhook', async (req, res) => {
    const signal = req.body;
    console.log('Received Signal:', signal);

    if (!signal || !signal.action) {
        return res.status(400).send('Invalid Signal payload');
    }

    const token = await getAuthToken();
    if (!token) {
        return res.status(500).send('Authentication Error');
    }

    // Map "buy"/"sell" to Tradovate Action
    const action = signal.action.toLowerCase() === 'buy' ? 'Buy' : 'Sell';
    const quantity = signal.quantity || 1;

    try {
        const orderPayload = {
            accountSpec: config.accountId,
            accountId: config.accountId,
            action: action,
            symbol: config.symbol,
            orderQty: quantity,
            orderType: 'Market',
            isAutomated: true
        };

        console.log(`Placing ${action} Order for ${quantity} x ${config.symbol}...`);

        const orderResponse = await axios.post(config.orderUrl, orderPayload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Order Response:', orderResponse.data);
        res.status(200).send('Order Processed');

    } catch (error) {
        console.error('Order Placement Failed:', error.response ? error.response.data : error.message);
        res.status(500).send('Order Failed');
    }
});

// ------------------------------------------------------------------
// START SERVER
// ------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`
    🚀 NinjaTrader Bridge listening on port ${PORT}
    
    1. Update the 'config' object at the top of this file with your credentials.
    2. Install dependencies: npm install express axios body-parser
    3. Run: node ninjatrader_bridge.js
    4. Set TradingView Webhook URL to: http://<YOUR_IP>:3000/webhook
    `);
});
