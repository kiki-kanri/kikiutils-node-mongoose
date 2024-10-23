import { createCommonMongooseSchemas } from './utils';

export { mongooseConnections } from './_connections';
import type { schemaBuilders } from './schema-builders';

export type DoNotUseOrRemoveThisType = typeof schemaBuilders;

/**
 * Common Mongoose schemas.
 *
 * This constant holds a set of commonly used Mongoose schema definitions, generated
 * by the `createCommonMongooseSchemas` utility function. These schemas include common
 * field types and configurations used across multiple models.
 *
 * @deprecated - Will be removed in the next major version. Use {@link schemaBuilders} instead.
 */
export const commonMongooseSchemas = createCommonMongooseSchemas();
