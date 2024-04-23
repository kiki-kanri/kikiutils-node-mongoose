import Decimal from 'decimal.js';
import { merge } from 'lodash-es';
import mongoose from 'mongoose';
import type { PaginateModel, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { mongooseConnections } from './constants';
import mongooseNormalizePlugin from './plugins/normalize';
import type { BuildMongooseModelOptions } from './types/options';
import type { BaseSchemaAttribute, CreateCommonMongooseSchemasOptions, MongooseObjectIdRefSchema, MongooseStringSchema, MongooseStringSchemaAttribute } from './types/schema';

export const buildMongooseModel = <DocType, Model extends PaginateModel<DocType, QueryHelpers, InstanceMethodsAndOverrides>, InstanceMethodsAndOverrides = {}, QueryHelpers = {}>(
	collection: string,
	name: string,
	schema: mongoose.Schema<DocType, Model, InstanceMethodsAndOverrides, QueryHelpers>,
	options?: BuildMongooseModelOptions
) => {
	if (options?.enableNormalizePlugin !== false) schema.plugin(mongooseNormalizePlugin);
	schema.plugin(mongoosePaginate);
	schema.set('timestamps', options?.timestamps === undefined ? true : options.timestamps);
	return (options?.connection || mongooseConnections.default || (mongooseConnections.default = mongoose.createConnection(process.env.MONGODB_URI || 'mongodb://localhost:27017'))).model<DocType, Model, QueryHelpers>(name, schema, collection);
};

export const createCommonMongooseSchemas = <T extends {}>(customSchemas?: T, options?: CreateCommonMongooseSchemasOptions) => {
	const autoRoundAndToFixedDecimal128Places = options?.autoRoundAndToFixedDecimal128?.places || 2;
	const autoRoundAndToFixedDecimal128Rounding = options?.autoRoundAndToFixedDecimal128?.rounding || Decimal.ROUND_DOWN;
	const baseAutoRoundAndToFixedDecimal128 = {
		set: (value: number | string | { toString(): string }) => new Decimal(value.toString()).toFixed(autoRoundAndToFixedDecimal128Places, autoRoundAndToFixedDecimal128Rounding),
		type: mongoose.Schema.Types.Decimal128
	} as const;

	const baseRequiredBoolean = { required: true, type: Boolean } as const;
	const baseRequiredNumber = { required: true, type: Number } as const;
	const baseRequiredObjectId = { required: true, type: mongoose.Schema.Types.ObjectId } as const;
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
			decimal128: {
				autoRoundAndToFixed: {
					nonRequired: baseAutoRoundAndToFixedDecimal128,
					required: { ...baseAutoRoundAndToFixedDecimal128, required: true }
				},
				nonRequired: { type: mongoose.Schema.Types.Decimal128 },
				required: { required: true, type: mongoose.Schema.Types.Decimal128 }
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
				nonRequired: { type: mongoose.Schema.Types.ObjectId },
				required: baseRequiredObjectId,
				unique: {
					nonRequired: { type: mongoose.Schema.Types.ObjectId, unique: true },
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

export const createMongooseObjectIdRefSchema = <R extends string, T extends BaseSchemaAttribute[]>(refModelName: R, ...attributes: T) => {
	const schema: Partial<MongooseObjectIdRefSchema<R, T>> = { ref: refModelName, type: mongoose.Schema.Types.ObjectId };
	new Set(attributes).forEach((attribute) => (schema[attribute] = true));
	return schema as MongooseObjectIdRefSchema<R, T>;
};

export const createMongooseStringSchema = <T extends MongooseStringSchemaAttribute[]>(...attributes: T) => {
	const schema: Partial<MongooseStringSchema<T>> = { type: String };
	new Set(attributes).forEach((attribute) => {
		if (attribute === 'short') return (schema.maxlength = 16);
		schema[attribute] = true;
	});

	return schema as MongooseStringSchema<T>;
};

export const setupDecimal128FieldsToStringGetter = <DocType, Model extends PaginateModel<DocType, QueryHelpers, InstanceMethodsAndOverrides>, InstanceMethodsAndOverrides = {}, QueryHelpers = {}>(
	schema: mongoose.Schema<DocType, Model, InstanceMethodsAndOverrides, QueryHelpers>,
	...fields: string[]
) => fields.forEach((field) => schema.path(field).get((value?: Types.Decimal128) => value?.toString()));
