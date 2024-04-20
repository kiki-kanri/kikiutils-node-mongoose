import Decimal from 'decimal.js';
import { merge } from 'lodash';
import { Schema } from 'mongoose';
import type { Model as MongooseModel, PaginateModel, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { defaultMongooseConnection } from './constants';
import mongooseNormalizePlugin from './plugins/normalize';
import type { BuildMongooseModelOptions } from './types/options';
import type { CreateCommonMongooseSchemasOptions, MongooseStringSchemaAttribute, MongooseStringSchema } from './types/schema';

export function buildMongooseModel<DocType, Model extends MongooseModel<DocType, QueryHelpers, InstanceMethods>, InstanceMethods = {}, QueryHelpers = {}>(
	collectionName: string,
	name: string,
	schema: Schema<DocType, Model, InstanceMethods, QueryHelpers>,
	options: BuildMongooseModelOptions<DocType, Model, InstanceMethods, QueryHelpers> & { enablePaginatePlugin: false }
): Model;
export function buildMongooseModel<DocType, Model extends PaginateModel<DocType, QueryHelpers, InstanceMethods>, InstanceMethods = {}, QueryHelpers = {}>(
	collection: string,
	name: string,
	schema: Schema<DocType, Model, InstanceMethods, QueryHelpers>,
	options?: BuildMongooseModelOptions<DocType, Model, InstanceMethods, QueryHelpers>
): Model;
export function buildMongooseModel<DocType, Model extends MongooseModel<DocType, QueryHelpers, InstanceMethods> | PaginateModel<DocType, QueryHelpers, InstanceMethods>, InstanceMethods = {}, QueryHelpers = {}>(
	collection: string,
	name: string,
	schema: Schema<DocType, Model, InstanceMethods, QueryHelpers>,
	options?: BuildMongooseModelOptions<DocType, Model, InstanceMethods, QueryHelpers>
) {
	if (options?.enableNormalizePlugin !== false) schema.plugin(mongooseNormalizePlugin);
	if (options?.enablePaginatePlugin !== false) schema.plugin(mongoosePaginate);
	schema.set('timestamps', options?.timestamps === undefined ? true : options.timestamps);
	options?.beforeBuild?.(schema);
	return (options?.connection || defaultMongooseConnection).model<DocType, Model, QueryHelpers>(name, schema, collection);
}

export const createCommonMongooseSchemas = <T extends {}>(customSchemas?: T, options?: CreateCommonMongooseSchemasOptions) => {
	const autoRoundAndToFixedDecimal128Places = options?.autoRoundAndToFixedDecimal128?.places || 2;
	const autoRoundAndToFixedDecimal128Rounding = options?.autoRoundAndToFixedDecimal128?.rounding || Decimal.ROUND_DOWN;
	const baseAutoRoundAndToFixedDecimal128 = {
		set: (value: number | string | { toString(): string }) => new Decimal(value.toString()).toFixed(autoRoundAndToFixedDecimal128Places, autoRoundAndToFixedDecimal128Rounding),
		type: Schema.Types.Decimal128
	} as const;

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
			decimal128: {
				autoRoundAndToFixed: {
					nonRequired: baseAutoRoundAndToFixedDecimal128,
					required: { ...baseAutoRoundAndToFixedDecimal128, required: true }
				},
				nonRequired: { type: Schema.Types.Decimal128 },
				required: { required: true, type: Schema.Types.Decimal128 }
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

export const setupDecimal128FieldsToStringGetter = <
	DocType,
	Model extends MongooseModel<DocType, QueryHelpers, InstanceMethodsAndOverrides> | PaginateModel<DocType, QueryHelpers, InstanceMethodsAndOverrides>,
	InstanceMethodsAndOverrides = {},
	QueryHelpers = {}
>(
	fields: string[],
	schema: Schema<DocType, Model, InstanceMethodsAndOverrides, QueryHelpers>
) => fields.forEach((field) => schema.path(field).get((value?: Types.Decimal128) => value?.toString()));
