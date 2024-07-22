import { createCommonMongooseSchemas } from './utils';

export { mongooseConnections } from './_connections';

/**
 * Common Mongoose schemas.
 *
 * This constant holds a set of commonly used Mongoose schema definitions, generated
 * by the `createCommonMongooseSchemas` utility function. These schemas include common
 * field types and configurations used across multiple models.
 */
export const commonMongooseSchemas = createCommonMongooseSchemas();
