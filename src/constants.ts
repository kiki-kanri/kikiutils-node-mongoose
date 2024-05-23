import type { Connection } from 'mongoose';

import { createCommonMongooseSchemas } from './utils';

/**
 * Common Mongoose schemas.
 *
 * This constant holds a set of commonly used Mongoose schema definitions, generated
 * by the `createCommonMongooseSchemas` utility function. These schemas include common
 * field types and configurations used across multiple models.
 */
export const commonMongooseSchemas = createCommonMongooseSchemas();

/**
 * Mongoose connections.
 *
 * This constant is a record of named Mongoose connections, allowing multiple
 * database connections to be managed within the application. An optional `default`
 * connection can also be specified for use when a specific connection is not provided.
 */
export const mongooseConnections: Record<string, Connection> & { default?: Connection } = {};
