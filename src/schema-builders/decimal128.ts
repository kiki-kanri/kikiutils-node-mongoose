import Decimal from 'decimal.js';
import { Schema } from 'mongoose';
import type { DefaultType, Types } from 'mongoose';

import { createBaseSchemaBuilderFactory } from './base';
import type { MaybeReadonly } from '../types/utils';

type ExtendDecimal128SchemaBuilder<Props extends { type: Schema.Types.Decimal128 }, ExtraOmitFields extends string> = Omit<Decimal128SchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;
type ToStringGetterSchema = { get: (value: Types.Decimal128) => string };
type ToStringSetterSchema = { set: (value: { toString(): string }) => string };

export interface Decimal128SchemaBuilder<Props extends { type: Schema.Types.Decimal128 } = { type: Schema.Types.Decimal128 }, ExtraOmitFields extends string = never> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends Types.Decimal128>(value: T) => ExtendDecimal128SchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }, ExtraOmitFields>;
	enum: <
		T extends
			| MaybeReadonly<Array<D | null>>
			| {
					message?: M;
					values: MaybeReadonly<Array<D | null>>;
			  }
			| { [path: string]: D | null },
		D extends Types.Decimal128,
		M extends string
	>(
		value: T
	) => ExtendDecimal128SchemaBuilder<{ [key in keyof (Props & { enum: T })]: (Props & { enum: T })[key] }, ExtraOmitFields>;

	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendDecimal128SchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }, ExtraOmitFields>;
	required: { [key in keyof (Props & { required: true })]: (Props & { required: true })[key] };
	setRoundAndToFixedSetter: (places?: number, rounding?: Decimal.Rounding) => ExtendDecimal128SchemaBuilder<{ [key in keyof (Props & ToStringSetterSchema)]: (Props & ToStringSetterSchema)[key] }, ExtraOmitFields | 'setRoundAndToFixedSetter'>;
	setToStringGetter: ExtendDecimal128SchemaBuilder<{ [key in keyof (Props & ToStringGetterSchema)]: (Props & ToStringGetterSchema)[key] }, ExtraOmitFields | 'setToStringGetter'>;
	sparse: ExtendDecimal128SchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }, ExtraOmitFields>;
	unique: ExtendDecimal128SchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }, ExtraOmitFields>;
}

const baseBuilderFactory = createBaseSchemaBuilderFactory(Schema.Types.Decimal128);
export const decimal128SchemaBuilder = () => {
	const schema: Record<string, any> = {};
	const baseBuilder = baseBuilderFactory(schema);
	return new Proxy(baseBuilder, {
		get(target, key, receiver) {
			if (key === 'setRoundAndToFixedSetter') {
				return (places: number = 2, rounding: Decimal.Rounding = Decimal.ROUND_DOWN) => {
					schema['set'] = (value: { toString(): string }) => new Decimal(value.toString()).toFixed(places, rounding);
					return receiver;
				};
			}

			if (key === 'setToStringGetter') return (schema['get'] = (value: Types.Decimal128) => value.toString()), receiver;
			return Reflect.get(target, key, receiver);
		}
	}) as Decimal128SchemaBuilder;
};
