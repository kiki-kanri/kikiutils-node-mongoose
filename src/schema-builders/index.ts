import { dateSchemaBuilder } from './date';
import { decimal128SchemaBuilder } from './decimal128';
import { booleanSchemaBuilder } from './boolean';
import { numberSchemaBuilder } from './number';
import { objectIdSchemaBuilder } from './object-id';
import { refSchemaBuilder } from './ref';
import { stringSchemaBuilder } from './string';

export * from './date';
export * from './decimal128';
export * from './boolean';
export * from './number';
export * from './ref';
export * from './string';

export const schemaBuilders = {
	date: dateSchemaBuilder,
	decimal128: decimal128SchemaBuilder,
	boolean: booleanSchemaBuilder,
	number: numberSchemaBuilder,
	objectId: objectIdSchemaBuilder,
	ref: refSchemaBuilder,
	string: stringSchemaBuilder
};

export default schemaBuilders;
