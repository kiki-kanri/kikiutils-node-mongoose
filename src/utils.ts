import Decimal from 'decimal.js';
import lodash from 'lodash';
import mongoose, { Types } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import net from 'net';

import { mongooseConnections } from './_connections';
import { customMongooseOptions as localCustomMongooseOptions } from './_options';
import { customMongooseOptions, setCustomMongooseOptions } from './options';
import mongooseNormalizePlugin from './plugins/normalize';
import type { schemaBuilders } from './schema-builders';
import type { BuildMongooseModelOptions } from './types/options';
import type { BaseSchemaAttribute, CreateCommonMongooseSchemasOptions, MongooseObjectIdRefSchema, MongooseStringSchema, MongooseStringSchemaAttribute } from './types/schema';

export type DoNotUseOrRemoveThisType = typeof schemaBuilders | typeof setCustomMongooseOptions;

const { merge } = lodash;

/**
 * Builds and returns a Mongoose model with specified schema and options.
 *
 * This function sets up a Mongoose model with optional plugins and timestamp settings.
 * It can optionally use a specified connection or the default connection.
 *
 * Determine the connection to use:
 * 1. Use the connection provided in the options, if available.
 * 2. Otherwise, use the default connection stored in `mongooseConnections`.
 * 3. If there's no default connection, create one using the MongoDB URI from the environment variables,
 *    or fallback to a local MongoDB instance.
 *
 * You can set a function to be executed before the final build by using {@link setCustomMongooseOptions}.
 * However, ensure that this option is configured before calling {@link buildMongooseModel}.
 *
 * @template DocType - The type of the document.
 * @template Model - The type of the model, which extends `BaseMongoosePaginateModel`.
 * @template InstanceMethodsAndOverrides - The type for instance methods and overrides.
 * @template QueryHelpers - The type for additional query helpers.
 *
 * @param collection - The name of the collection.
 * @param name - The name of the model.
 * @param schema - The Mongoose schema to use for the model.
 * @param options - Optional settings for building the model.
 *
 * @returns The created Mongoose model.
 */
export function buildMongooseModel<DocType, Model extends BaseMongoosePaginateModel<DocType, InstanceMethodsAndOverrides, QueryHelpers>, InstanceMethodsAndOverrides = {}, QueryHelpers = {}>(
	collection: string,
	name: string,
	schema: mongoose.Schema<DocType, Model, InstanceMethodsAndOverrides, QueryHelpers>,
	options?: BuildMongooseModelOptions
) {
	if (options?.enableNormalizePlugin !== false) schema.plugin(mongooseNormalizePlugin);
	schema.plugin(mongooseAggregatePaginate);
	schema.plugin(mongoosePaginate);
	schema.set('timestamps', options?.timestamps === undefined ? true : options.timestamps);
	(localCustomMongooseOptions.beforeModelBuild || customMongooseOptions.beforeModelBuild)?.(schema);
	return (options?.connection || mongooseConnections.default || (mongooseConnections.default = mongoose.createConnection(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'))).model<DocType, Model, QueryHelpers>(name, schema, collection);
}

/**
 * Creates common Mongoose schema definitions with optional custom schemas and settings.
 *
 * This function generates a set of commonly used schema definitions, such as boolean,
 * number, objectId, and string schemas, with optional custom configurations and rounding
 * options for Decimal128 fields.
 *
 * @deprecated - Will be removed in the next major version. Use {@link schemaBuilders} instead.
 *
 * @template T - The type for custom schemas.
 *
 * @param customSchemas - Optional custom schemas to merge with the common schemas.
 * @param options - Optional settings for creating the common schemas.
 *
 * @returns The merged common and custom schemas.
 */
export function createCommonMongooseSchemas<T extends {}>(customSchemas?: T, options?: CreateCommonMongooseSchemasOptions) {
	const autoRoundAndToFixedDecimal128Places = options?.autoRoundAndToFixedDecimal128?.places ?? 2;
	const autoRoundAndToFixedDecimal128Rounding = options?.autoRoundAndToFixedDecimal128?.rounding ?? Decimal.ROUND_DOWN;
	const baseAutoRoundAndToFixedDecimal128 = {
		set: (value: number | string | { toString(): string }) => new Decimal(value.toString()).toFixed(autoRoundAndToFixedDecimal128Places, autoRoundAndToFixedDecimal128Rounding),
		type: mongoose.Schema.Types.Decimal128
	} as const;

	const baseIPv4 = {
		trim: true,
		type: String,
		validate: {
			message: '`{VALUE}` is not a valid IPv4 address for path `{PATH}`.',
			validator: (value: string) => net.isIPv4(value)
		}
	} as const;

	const baseIPv6 = {
		...baseIPv4,
		validate: {
			message: '`{VALUE}` is not a valid IPv6 address for path `{PATH}`.',
			validator: (value: string) => net.isIPv6(value)
		}
	} as const;

	const baseRequiredBoolean = { required: true, type: Boolean } as const;
	const baseRequiredNumber = { required: true, type: Number } as const;
	const baseRequiredObjectId = { required: true, type: mongoose.Schema.Types.ObjectId } as const;
	return merge(
		{
			/**
			 * @deprecated - Will be removed in the next major version. Use {@link schemaBuilders.boolean} instead.
			 */
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
			/**
			 * @deprecated - Will be removed in the next major version. Use {@link schemaBuilders.decimal128} instead.
			 */
			decimal128: {
				autoRoundAndToFixed: {
					nonRequired: baseAutoRoundAndToFixedDecimal128,
					required: { ...baseAutoRoundAndToFixedDecimal128, required: true }
				},
				nonRequired: { type: mongoose.Schema.Types.Decimal128 },
				required: { required: true, type: mongoose.Schema.Types.Decimal128 }
			},
			/**
			 * @deprecated - Will be removed in the next major version. Use {@link schemaBuilders.number} instead.
			 */
			number: {
				nonRequired: { type: Number },
				required: baseRequiredNumber,
				unique: {
					nonRequired: { type: Number, unique: true },
					required: { ...baseRequiredNumber, unique: true }
				}
			},
			/**
			 * @deprecated - Will be removed in the next major version. Use {@link schemaBuilders.objectId} instead.
			 */
			objectId: {
				nonRequired: { type: mongoose.Schema.Types.ObjectId },
				required: baseRequiredObjectId,
				unique: {
					nonRequired: { type: mongoose.Schema.Types.ObjectId, unique: true },
					required: { ...baseRequiredObjectId, unique: true }
				}
			},
			/**
			 * @deprecated - Will be removed in the next major version. Use {@link schemaBuilders.string} instead.
			 */
			string: {
				ipv4: {
					nonRequired: baseIPv4,
					private: {
						nonRequired: { ...baseIPv4, private: true },
						required: {
							...baseIPv4,
							private: true,
							required: true
						},
						unique: {
							nonRequired: {
								...baseIPv4,
								private: true,
								unique: true
							},
							required: {
								...baseIPv4,
								private: true,
								required: true,
								unique: true
							}
						}
					},
					required: { ...baseIPv4, required: true },
					unique: {
						nonRequired: { ...baseIPv4, unique: true },
						required: {
							...baseIPv4,
							required: true,
							unique: true
						}
					}
				},
				ipv6: {
					nonRequired: baseIPv6,
					private: {
						nonRequired: { ...baseIPv6, private: true },
						required: {
							...baseIPv6,
							private: true,
							required: true
						},
						unique: {
							nonRequired: {
								...baseIPv6,
								private: true,
								unique: true
							},
							required: {
								...baseIPv6,
								private: true,
								required: true,
								unique: true
							}
						}
					},
					required: { ...baseIPv6, required: true },
					unique: {
						nonRequired: { ...baseIPv6, unique: true },
						required: {
							...baseIPv6,
							required: true,
							unique: true
						}
					}
				},
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
}

/**
 * Creates a Mongoose schema definition for an ObjectId reference with specified attributes.
 *
 * This function generates a schema definition for an ObjectId reference field, including
 * attributes such as 'private', 'required', and 'unique'.
 *
 * @deprecated - Will be removed in the next major version. Use {@link schemaBuilders.ref} instead.
 *
 * @template R - The type of the reference model name.
 * @template T - An array of attributes to apply to the schema field.
 *
 * @param refModelName - The name of the reference model.
 * @param attributes - The attributes to apply to the schema field.
 *
 * @returns The generated ObjectId reference schema definition.
 */
export function createMongooseObjectIdRefSchema<R extends string, T extends BaseSchemaAttribute[]>(refModelName: R, ...attributes: T) {
	const schema: Partial<MongooseObjectIdRefSchema<R, T>> = { ref: refModelName, type: mongoose.Schema.Types.ObjectId };
	new Set(attributes).forEach((attribute) => (schema[attribute] = true));
	return schema as MongooseObjectIdRefSchema<R, T>;
}

/**
 * Creates a Mongoose schema definition for a string field with specified attributes.
 *
 * This function generates a schema definition for a string field, including attributes
 * such as 'private', 'required', 'short', 'trim', and 'unique'. If the 'short' attribute
 * is included, the `maxlength` is set to 16.
 *
 * @deprecated - Will be removed in the next major version. Use {@link schemaBuilders.string} instead.
 *
 * @template T - An array of attributes to apply to the schema field.
 *
 * @param attributes - The attributes to apply to the schema field.
 *
 * @returns The generated string schema definition.
 */
export function createMongooseStringSchema<T extends MongooseStringSchemaAttribute[]>(...attributes: T) {
	const schema: Partial<MongooseStringSchema<T>> = { type: String };
	new Set(attributes).forEach((attribute) => {
		if (attribute === 'short') schema.maxlength = 16;
		else schema[attribute] = true;
	});

	return schema as MongooseStringSchema<T>;
}

/**
 * Converts a document or ObjectId to a document using the specified model.
 *
 * This function takes a document or ObjectId and returns the corresponding document
 * from the database using the specified model. Optionally, specific fields can be selected.
 *
 * @template D - The type of the hydrated document.
 * @template DocType - The type of the document.
 * @template InstanceMethodsAndOverrides - The type for instance methods and overrides.
 * @template QueryHelpers - The type for additional query helpers.
 *
 * @param documentOrObjectId - The document or ObjectId to convert.
 * @param model - The Mongoose model to use for the conversion.
 * @param selectFields - Optional fields to select from the document.
 *
 * @returns The corresponding document or null if not found.
 */
export async function mongooseDocumentOrObjectIdToDocument<D extends MongooseHydratedDocument<DocType, InstanceMethodsAndOverrides, QueryHelpers>, DocType, InstanceMethodsAndOverrides, QueryHelpers>(
	documentOrObjectId: MongooseDocumentOrObjectId<D>,
	model: BaseMongoosePaginateModel<DocType, InstanceMethodsAndOverrides, QueryHelpers>,
	selectFields?: string[]
): Promise<D | null> {
	if (typeof documentOrObjectId === 'string' || documentOrObjectId instanceof Types.ObjectId) return (await model.findById(documentOrObjectId).select(selectFields || [])) as D | null;
	return documentOrObjectId;
}

/**
 * Sets up a getter to convert Decimal128 fields to strings in a Mongoose schema.
 *
 * This function adds a getter to the specified Decimal128 fields in the schema,
 * converting the values to strings for easier use.
 *
 * @deprecated - Will be removed in the next major version. Use {@link schemaBuilders.decimal128} instead.
 *
 * @template DocType - The type of the document.
 * @template Model - The type of the model, which extends `BaseMongoosePaginateModel`.
 * @template InstanceMethodsAndOverrides - The type for instance methods and overrides.
 * @template QueryHelpers - The type for additional query helpers.
 *
 * @param schema - The Mongoose schema to modify.
 * @param fields - The Decimal128 fields to add the getter to.
 */
export function setupDecimal128FieldsToStringGetter<DocType, Model extends BaseMongoosePaginateModel<DocType, InstanceMethodsAndOverrides, QueryHelpers>, InstanceMethodsAndOverrides = {}, QueryHelpers = {}>(
	schema: mongoose.Schema<DocType, Model, InstanceMethodsAndOverrides, QueryHelpers>,
	...fields: string[]
) {
	fields.forEach((field) => schema.path(field).get((value?: Types.Decimal128) => value?.toString()));
}
