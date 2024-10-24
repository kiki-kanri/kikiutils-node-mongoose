import { dateSchemaBuilder } from '../../src/schema-builders/date';

describe('dateSchemaBuilder', () => {
	it('should create a schema with the correct type for Date', () => {
		expect(dateSchemaBuilder().nonRequired).toEqual({ type: Date });
	});
});
