import { booleanSchemaBuilder } from './boolean';
import { numberSchemaBuilder } from './number';
import { stringSchemaBuilder } from './string';

export * from './boolean';
export * from './number';
export * from './string';

export const schemaBuilders = {
	boolean: booleanSchemaBuilder,
	number: numberSchemaBuilder,
	string: stringSchemaBuilder
};

export default schemaBuilders;
