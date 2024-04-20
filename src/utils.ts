import type { MongooseStringSchemaAttribute, MongooseStringSchema } from './types/schema';

export const createMongooseStringSchema = <T extends MongooseStringSchemaAttribute[]>(...attributes: T): MongooseStringSchema<T> => {
	const schema: Partial<MongooseStringSchema<MongooseStringSchemaAttribute[]>> = { type: String };
	new Set(attributes).forEach((attribute) => {
		if (attribute === 'short') return (schema.maxlength = 16);
		schema[attribute] = true;
	});

	return schema as MongooseStringSchema<T>;
};
