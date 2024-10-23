import { numberSchemaBuilder } from './number';
import { stringSchemaBuilder } from './string';

export * from './number';
export * from './string';

export const schemaBuilders = {
	number: numberSchemaBuilder,
	string: stringSchemaBuilder
};

export default schemaBuilders;
