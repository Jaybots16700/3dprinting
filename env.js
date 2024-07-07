// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */
const { z } = require("zod");

/* eslint sort-keys: "error" */
const envSchema = z.object({
	DISCORD_WEBHOOK: z.string().url(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	MONGODB_URI: z.string(),
	NEXTAUTH_SECRET: z.string(),
	NODE_ENV: z.enum(["development", "test", "production"]),
	PAYPAL_URL: z.string().url(),
	RESEND_API_KEY: z.string(),
	URL: z.string().url(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
	console.error("❌ Invalid environment variables:", JSON.stringify(env.error.format(), null, 4));
	process.exit(1);
}

module.exports.env = env.data;
