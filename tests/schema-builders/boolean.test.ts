import { booleanSchemaBuilder } from '../../src/schema-builders/boolean';

describe('booleanSchemaBuilder', () => {
    it('should create a schema with the correct type for Boolean', () => {
        expect(booleanSchemaBuilder().nonRequired).toEqual({ type: Boolean });
    });
});
