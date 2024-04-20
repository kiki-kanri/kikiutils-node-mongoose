import { merge } from 'lodash';
import { Schema } from 'mongoose';

import type { MongooseStringSchemaAttribute, MongooseStringSchema } from './types/schema';

export const createCommonMongooseSchemas = <T extends {}>(customSchemas?: T) => {
	const baseRequiredBoolean = { required: true, type: Boolean } as const;
	const baseRequiredNumber = { required: true, type: Number } as const;
	const baseRequiredObjectId = { required: true, type: Schema.Types.ObjectId } as const;
	return merge(
		{
			boolean: {
				defaultFalse: {
					nonRequired: { default: false, type: Boolean },
					required: { ...baseRequiredBoolean, default: false }
				},
				defaultTrue: {
					nonRequired: { default: true, type: Boolean },
					required: { ...baseRequiredBoolean, default: true }
				},
				nonRequired: { type: Boolean },
				required: baseRequiredBoolean
			},
			number: {
				nonRequired: { type: Number },
				required: baseRequiredNumber,
				unique: {
					nonRequired: { type: Number, unique: true },
					required: { ...baseRequiredNumber, unique: true }
				}
			},
			objectId: {
				nonRequired: { type: Schema.Types.ObjectId },
				required: baseRequiredObjectId,
				unique: {
					nonRequired: { type: Schema.Types.ObjectId, unique: true },
					required: { ...baseRequiredObjectId, unique: true }
				}
			},
			string: {
				nonRequired: createMongooseStringSchema(),
				private: {
					nonRequired: createMongooseStringSchema('private'),
					required: createMongooseStringSchema('private', 'required'),
					short: {
						nonRequired: createMongooseStringSchema('private', 'short'),
						required: createMongooseStringSchema('private', 'required', 'short'),
						trimmed: {
							nonRequired: createMongooseStringSchema('private', 'short', 'trim'),
							required: createMongooseStringSchema('private', 'required', 'short', 'trim'),
							unique: {
								nonRequired: createMongooseStringSchema('private', 'short', 'trim', 'unique'),
								required: createMongooseStringSchema('private', 'required', 'short', 'trim', 'unique')
							}
						},
						unique: {
							nonRequired: createMongooseStringSchema('private', 'short', 'unique'),
							required: createMongooseStringSchema('private', 'required', 'short', 'unique')
						}
					},
					trimmed: {
						nonRequired: createMongooseStringSchema('private', 'trim'),
						required: createMongooseStringSchema('private', 'required', 'trim'),
						unique: {
							nonRequired: createMongooseStringSchema('private', 'trim', 'unique'),
							required: createMongooseStringSchema('private', 'required', 'trim', 'unique')
						}
					},
					unique: {
						nonRequired: createMongooseStringSchema('private', 'unique'),
						required: createMongooseStringSchema('private', 'required', 'unique')
					}
				},
				required: createMongooseStringSchema('required'),
				short: {
					nonRequired: createMongooseStringSchema('short'),
					required: createMongooseStringSchema('required', 'short'),
					trimmed: {
						nonRequired: createMongooseStringSchema('short', 'trim'),
						required: createMongooseStringSchema('required', 'short', 'trim'),
						unique: {
							nonRequired: createMongooseStringSchema('short', 'trim', 'unique'),
							required: createMongooseStringSchema('required', 'short', 'trim', 'unique')
						}
					},
					unique: {
						nonRequired: createMongooseStringSchema('short', 'unique'),
						required: createMongooseStringSchema('required', 'short', 'unique')
					}
				},
				trimmed: {
					nonRequired: createMongooseStringSchema('trim'),
					required: createMongooseStringSchema('required', 'trim'),
					unique: {
						nonRequired: createMongooseStringSchema('trim', 'unique'),
						required: createMongooseStringSchema('required', 'trim', 'unique')
					}
				},
				unique: {
					nonRequired: createMongooseStringSchema('unique'),
					required: createMongooseStringSchema('required', 'unique')
				}
			}
		} as const,
		customSchemas
	);
};

export const createMongooseStringSchema = <T extends MongooseStringSchemaAttribute[]>(...attributes: T): MongooseStringSchema<T> => {
	const schema: Partial<MongooseStringSchema<MongooseStringSchemaAttribute[]>> = { type: String };
	new Set(attributes).forEach((attribute) => {
		if (attribute === 'short') return (schema.maxlength = 16);
		schema[attribute] = true;
	});

	return schema as MongooseStringSchema<T>;
};
