import { createCommonMongooseSchemas, createMongooseObjectIdRefSchema } from '@kikiutils/mongoose/utils';

// Expand or create your own commonMongooseSchemas constants here.
export const commonMongooseSchemas = (() => {
	return createCommonMongooseSchemas({
		ref: {
			user: {
				nonRequired: createMongooseObjectIdRefSchema('User'),
				required: createMongooseObjectIdRefSchema('User', 'required')
			},
			userGroup: { nonRequired: createMongooseObjectIdRefSchema('UserGroup') }
		}
	} as const);
})();
