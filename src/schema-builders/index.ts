import { dateSchemaBuilder } from './date';
import { booleanSchemaBuilder } from './boolean';
import { numberSchemaBuilder } from './number';
import { refSchemaBuilder } from './ref';
import { stringSchemaBuilder } from './string';

export * from './date';
export * from './boolean';
export * from './number';
export * from './ref';
export * from './string';

export const schemaBuilders = {
	date: dateSchemaBuilder,
	boolean: booleanSchemaBuilder,
	number: numberSchemaBuilder,
	ref: refSchemaBuilder,
	string: stringSchemaBuilder
};

export default schemaBuilders;
