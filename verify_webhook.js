// verify_webhook.js - Uses native fetch (Node 18+) or http module
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const SERVER_URL = 'http://localhost:3000/webhook';

if (!WEBHOOK_SECRET) {
    console.error('❌ STRIPE_WEBHOOK_SECRET is missing in .env');
    process.exit(1);
}

// Mock Payload matches Stripe structure
const payload = {
    id: 'evt_test_webhook_' + Date.now(),
    object: 'event',
    type: 'checkout.session.completed',
    created: Math.floor(Date.now() / 1000),
    data: {
        object: {
            id: 'cs_test_session_' + Date.now(),
            object: 'checkout.session',
            client_reference_id: 'test-user-id-mock',
            payment_status: 'paid',
            amount_total: 999,
            currency: 'usd',
        }
    }
};

const payloadString = JSON.stringify(payload); // No pretty print for signature usually, but Stripe CLI might. 
// Note: Stripe raw body for signature verification must be exact. 
// My server uses `express.raw({ type: 'application/json' })`.
// So the body sent must match the signature.

// Generate Signature
const cancelTime = Math.floor(Date.now() / 1000);
const signature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(`${cancelTime}.${payloadString}`)
    .digest('hex');

const stripeSignature = `t=${cancelTime},v1=${signature}`;

console.log(`🚀 Sending mock webhook to ${SERVER_URL}...`);

async function sendWebhook() {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Stripe-Signature': stripeSignature
            },
            body: payloadString
        });

        const text = await response.text();
        console.log(`\n✅ Server responded: ${response.status} ${response.statusText}`);
        console.log(`Response body: ${text}`);

        if (response.ok) {
            console.log(`\n👉 SUCCESS: Server accepted the webhook and verified the signature.`);
        } else {
            console.log(`\n❌ FAILED: Server rejected the request.`);
        }

    } catch (error) {
        console.error(`\n❌ Error sending webhook:`, error.message);
        if (error.cause) console.error('Cause:', error.cause);
    }
}

sendWebhook();
