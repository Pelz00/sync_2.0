# lib/validations

All zod schemas, one file per domain. Imported by:
- `react-hook-form` on the client (`@hookform/resolvers/zod`).
- Server Actions and API routes on the server.

**Rule:** the server re-validates with the same schema. Client validation is UX, not security.
