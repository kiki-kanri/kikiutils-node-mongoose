import { numberSchemaBuilder } from '../../src/schema-builders/number';

describe('numberSchemaBuilder', () => {
	it('should create a schema with the correct type for Number', () => {
		expect(numberSchemaBuilder().nonRequired).toEqual({ type: Number });
	});
});
