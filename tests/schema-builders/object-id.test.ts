import { Schema } from 'mongoose';

import { objectIdSchemaBuilder } from '../../src/schema-builders/object-id';

describe('objectIdSchemaBuilder', () => {
    it('should create a schema with the correct type for ObjectId', () => {
        expect(objectIdSchemaBuilder().nonRequired).toEqual({ type: Schema.Types.ObjectId });
    });
});
