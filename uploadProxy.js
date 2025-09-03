// netlify/functions/uploadProxy.js
import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);

    if (!body.image || !body.filename || !body.mimeType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ status: 'error', message: 'Missing image, filename or mimeType' })
      };
    }

    // URL Apps Script Web App
    const WEBAPP_URL = 'https://script.google.com/macros/s/YOUR_WEBAPP_ID/exec';

    const res = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const text = await res.text();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: text
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ status: 'error', message: err.message })
    };
  }
}
