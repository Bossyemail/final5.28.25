// Environment variable validation
// Import this in server-side code to validate env vars

const requiredEnvVars = [
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'OPENAI_API_KEY',
];

const optionalEnvVars = [
  'NEXT_PUBLIC_GA_ID',
  'NEXT_PUBLIC_APP_URL',
  'ADMIN_EMAIL',
  'RESEND_API_KEY',
  'SENDGRID_API_KEY',
];

export function validateEnvVars() {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required vars
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  // Check optional vars (warn if missing)
  optionalEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      warnings.push(varName);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file or environment configuration.'
    );
  }

  if (warnings.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn(
      `Warning: Optional environment variables not set: ${warnings.join(', ')}\n` +
      'Some features may not work correctly.'
    );
  }

  return { missing, warnings };
}
