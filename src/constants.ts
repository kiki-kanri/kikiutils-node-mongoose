import type { Connection } from 'mongoose';

import { createCommonMongooseSchemas } from './utils';

export const commonMongooseSchemas = createCommonMongooseSchemas();
export const mongooseConnections: Record<string, Connection> & { default?: Connection } = {};
