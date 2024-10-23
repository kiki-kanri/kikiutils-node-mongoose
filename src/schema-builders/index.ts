import { dateSchemaBuilder } from './date';
import { booleanSchemaBuilder } from './boolean';
import { numberSchemaBuilder } from './number';
import { stringSchemaBuilder } from './string';

export * from './date';
export * from './boolean';
export * from './number';
export * from './string';

export const schemaBuilders = {
	date: dateSchemaBuilder,
	boolean: booleanSchemaBuilder,
	number: numberSchemaBuilder,
	string: stringSchemaBuilder
};

export default schemaBuilders;
