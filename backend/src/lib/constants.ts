import { loadEnv } from '@medusajs/framework/utils'

import { assertValue } from 'utils/assert-value'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

/**
 * Is development environment
 */
export const IS_DEV = process.env.NODE_ENV === 'development'

/**
 * Public URL for the backend.
 * Railway exposes the deployed host (without scheme) as RAILWAY_PUBLIC_DOMAIN.
 */
const RAILWAY_PUBLIC_URL = process.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : undefined

export const BACKEND_URL =
  process.env.BACKEND_PUBLIC_URL ?? RAILWAY_PUBLIC_URL ?? 'http://localhost:9000'

/**
 * Reject known-weak secret values outside of development so they cannot
 * silently ship to production (e.g. the placeholder from .env.template).
 */
function assertStrongSecret(value: string, name: string): string {
  const weak = ['supersecret', 'secret', 'changeme', 'something']
  if (!IS_DEV && weak.includes(value.trim().toLowerCase())) {
    throw new Error(
      `Environment variable ${name} is set to a known-weak value. Set a strong, unique secret.`,
    )
  }
  return value
}

/**
 * Database URL for Postgres instance used by the backend
 */
export const DATABASE_URL = assertValue(
  process.env.DATABASE_URL,
  'Environment variable for DATABASE_URL is not set',
)

/**
 * (optional) Redis URL for Redis instance used by the backend
 */
export const REDIS_URL = process.env.REDIS_URL;

/**
 * Admin CORS origins
 */
export const ADMIN_CORS = process.env.ADMIN_CORS;

/**
 * Auth CORS origins
 */
export const AUTH_CORS = process.env.AUTH_CORS;

/**
 * Store/frontend CORS origins
 */
export const STORE_CORS = process.env.STORE_CORS;

// CORS origins are security-relevant. Outside of development, a missing value
// means the admin dashboard / storefront cannot reach the API — warn loudly.
if (!IS_DEV) {
  for (const [name, value] of Object.entries({ ADMIN_CORS, AUTH_CORS, STORE_CORS })) {
    if (!value || value.trim() === '') {
      console.warn(`[config] ${name} is not set — cross-origin requests for this scope will be blocked.`)
    }
  }
}

/**
 * JWT Secret used for signing JWT tokens
 */
export const JWT_SECRET = assertStrongSecret(
  assertValue(
    process.env.JWT_SECRET,
    'Environment variable for JWT_SECRET is not set',
  ),
  'JWT_SECRET',
)

/**
 * Cookie secret used for signing cookies
 */
export const COOKIE_SECRET = assertStrongSecret(
  assertValue(
    process.env.COOKIE_SECRET,
    'Environment variable for COOKIE_SECRET is not set',
  ),
  'COOKIE_SECRET',
)

/**
 * (optional) Minio configuration for file storage
 */
export const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT;
export const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
export const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY;
export const MINIO_BUCKET = process.env.MINIO_BUCKET; // Optional, if not set bucket will be called: medusa-media

/**
 * (optional) Resend API Key and from Email - do not set if using SendGrid
 */
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM;

/**
 * (optionl) SendGrid API Key and from Email - do not set if using Resend
 */
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || process.env.SENDGRID_FROM;

/**
 * (optional) Stripe API key and webhook secret
 */
export const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * (optional) Meilisearch configuration
 */
export const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST;
export const MEILISEARCH_ADMIN_KEY = process.env.MEILISEARCH_ADMIN_KEY;

/**
 * Worker mode
 */
export const WORKER_MODE =
  (process.env.MEDUSA_WORKER_MODE as 'worker' | 'server' | 'shared' | undefined) ?? 'shared'

/**
 * Disable Admin
 */
export const SHOULD_DISABLE_ADMIN = process.env.MEDUSA_DISABLE_ADMIN === 'true'
