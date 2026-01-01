/**
 * NAMERLY STRIPE BACKEND
 * Simple Node.js server for Stripe integration
 */

const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_...');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Middleware (SKIP JSON parsing for webhook to keep raw buffer)
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(express.static(__dirname)); // Serve from current directory instead of /public

// Stripe configuration
const PRICE_ID = process.env.STRIPE_PRICE_ID || 'price_...';
const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

// 🤖 Gemini AI Integration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

app.post('/api/ai/generate', async (req, res) => {
  const { prompt, maxLength } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const https = require('https');
  const data = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: maxLength || 100, temperature: 0.7 }
  });

  const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const gReq = https.request(options, (gRes) => {
    let body = '';
    gRes.on('data', (chunk) => body += chunk);
    gRes.on('end', () => {
      try {
        const json = JSON.parse(body);
        if (gRes.statusCode === 200) {
          const aiText = json.candidates?.[0]?.content?.parts?.[0]?.text;
          res.json({ text: aiText || null });
        } else {
          console.error('Gemini API Details:', JSON.stringify(json, null, 2));
          res.status(gRes.statusCode).json({ error: 'Gemini API Error', details: json });
        }
      } catch (e) {
        res.status(500).json({ error: 'Parse Error' });
      }
    });
  });

  gReq.on('error', (error) => {
    console.error('Gemini Proxy Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  gReq.write(data);
  gReq.end();
});


// 🌩️ Supabase Admin Client (for Webhooks)
const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// 💳 Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  const { userId } = req.body; // Expecting userId from client

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      client_reference_id: userId, // CRITICAL: Pass Supabase User ID to Stripe
      mode: 'subscription',
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/cancel`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_creation: 'always',
      subscription_data: {
        trial_period_days: 7,
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// ... (Success/Cancel routes remain same) ...

// 🔔 Stripe Webhooks (Production)
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const userId = session.client_reference_id;

      console.log(`✅ Checkout completed for User: ${userId}`);

      if (userId) {
        // Update Supabase
        const { error } = await supabaseAdmin
          .from('user_profiles')
          .update({ is_premium: true })
          .eq('id', userId);

        if (error) console.error('Supabase Update Error:', error);
        else console.log('🎉 User upgraded to Premium in Database!');
      }
      break;

    case 'invoice.payment_succeeded':
      // Optional: Handle renewals
      break;

    case 'customer.subscription.deleted':
      const sub = event.data.object;
      // In a real app, you might want to fetch the customer -> find user -> downgrade.
      // But we stored client_reference_id on the Checkout Session, not the Subscription object directly.
      // We'd need to lookup the user by customer_id if we saved it.
      // For now, MVP: Once premium, always premium (or manual downgrade).
      console.log('Subscription deleted:', sub.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Serve static files (your Namerly website)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server only if run directly (locally)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`💳 Stripe integration ready!`);
  });
}

// Export for Netlify Functions
module.exports = app;
