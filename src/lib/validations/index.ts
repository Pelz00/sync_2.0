/**
 * Barrel for zod schemas. Import as `import { loginSchema } from '@/lib/validations'`.
 * Domain-specific schemas (hostel, booking, etc.) live alongside their module
 * and re-export through here as the surface grows.
 */
export * from './primitives';
export * from './auth';
export * from './verification';
