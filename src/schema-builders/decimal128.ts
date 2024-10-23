import { Schema } from 'mongoose';
import type { DefaultType, Types } from 'mongoose';

import { createBaseSchemaBuilderFactory } from './base';
import type { MaybeReadonly } from '../types/utils';

type ExtendDecimal128SchemaBuilder<Props extends { type: Schema.Types.Decimal128 }, ExtraOmitFields extends string> = Omit<Decimal128SchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;

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
	sparse: ExtendDecimal128SchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }, ExtraOmitFields>;
	unique: ExtendDecimal128SchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }, ExtraOmitFields>;
}

export const decimal128SchemaBuilder = createBaseSchemaBuilderFactory(Schema.Types.Decimal128);
