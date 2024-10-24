import Decimal from 'decimal.js';
import { Schema, Types } from 'mongoose';

import { decimal128SchemaBuilder } from '../../src/schema-builders/decimal128';

describe('decimal128SchemaBuilder', () => {
	it('should create a schema with the correct type for Decimal128', () => {
		expect(decimal128SchemaBuilder().nonRequired).toEqual({ type: Schema.Types.Decimal128 });
	});

	it('should return the string representation of Decimal128 when using setToStringGetter', () => {
		const schema = decimal128SchemaBuilder().setToStringGetter.nonRequired;
		expect(schema.get(new Types.Decimal128('114514.1919810'))).toEqual('114514.1919810');
	});

	it('should set the value correctly with rounding and fixed decimal places', () => {
		const schema1 = decimal128SchemaBuilder().setRoundAndToFixedSetter().nonRequired;
		expect(schema1.set('114514.1919810')).toEqual('114514.19');
		const schema2 = decimal128SchemaBuilder().setRoundAndToFixedSetter(1, Decimal.ROUND_UP).nonRequired;
		expect(schema2.set(114514.191981)).toEqual('114514.2');
		const schema3 = decimal128SchemaBuilder().setRoundAndToFixedSetter(undefined, Decimal.ROUND_UP).nonRequired;
		expect(schema3.set({ toString: () => '114514.1919810' })).toEqual('114514.20');
	});
});
