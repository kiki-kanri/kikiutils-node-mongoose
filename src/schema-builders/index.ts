import { booleanSchemaBuilder } from './boolean';
import { dateSchemaBuilder } from './date';
import { decimal128SchemaBuilder } from './decimal128';
import { numberSchemaBuilder } from './number';
import { objectIdSchemaBuilder } from './object-id';
import { refSchemaBuilder } from './ref';
import { stringSchemaBuilder } from './string';

export * from './boolean';
export * from './date';
export * from './decimal128';
export * from './number';
export * from './ref';
export * from './string';

export const schemaBuilders = {
	boolean: booleanSchemaBuilder,
	date: dateSchemaBuilder,
	decimal128: decimal128SchemaBuilder,
	number: numberSchemaBuilder,
	objectId: objectIdSchemaBuilder,
	ref: refSchemaBuilder,
	string: stringSchemaBuilder,
};

export default schemaBuilders;
