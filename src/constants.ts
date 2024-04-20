import { createConnection } from 'mongoose';

import { createCommonMongooseSchemas } from './utils';

export const commonMongooseSchemas = createCommonMongooseSchemas();
export const defaultMongooseConnection = createConnection(process.env.MONGODB_URI || '');
