import { logger } from '../../utils/logger.js';

const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const fromNumber = process.env.TWILIO_FROM_NUMBER || '';

let twilioClient: any = null;

if (accountSid && authToken) {
  try {
    // Dynamically import to avoid hard dependency at runtime without creds
    const twilioModule = await import('twilio');
    twilioClient = twilioModule.default(accountSid, authToken);
  } catch (e) {
    logger.warn('Twilio SDK load failed, falling back to mock. ' + (e as Error).message);
  }
}

export async function sendSms(to: string, body: string): Promise<{ ok: boolean; sid?: string }>{
  if (!twilioClient || !fromNumber) {
    logger.info(`[MOCK SMS] to=${to} body="${body}"`);
    return { ok: true, sid: 'mock_sid_' + Math.random().toString(36).slice(2) };
  }
  const result = await twilioClient.messages.create({ to, from: fromNumber, body });
  return { ok: true, sid: result.sid };
}