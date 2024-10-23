import type { DefaultType, NumberSchemaDefinition } from 'mongoose';

import { createBaseSchemaBuilderFactory } from './base';
import type { MaybeReadonly } from '../types/utils';

type ExtendNumberSchemaBuilder<Props, ExtraOmitFields extends string> = Omit<NumberSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;

export interface NumberSchemaBuilder<Props = { type: NumberSchemaDefinition }, ExtraOmitFields extends string = never, PropsWithRequired = Props & { required: true }> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends number>(value: T) => ExtendNumberSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }, ExtraOmitFields>;
	enum: <
		T extends
			| MaybeReadonly<Array<N | null>>
			| {
					message?: M;
					values: MaybeReadonly<Array<N | null>>;
			  }
			| { [path: string]: N | null },
		M extends string,
		N extends number
	>(
		value: T
	) => ExtendNumberSchemaBuilder<{ [key in keyof (Props & { enum: T })]: (Props & { enum: T })[key] }, ExtraOmitFields>;

	max: <T extends N | MaybeReadonly<[N, S]>, N extends number, S extends string>(value: T) => ExtendNumberSchemaBuilder<{ [key in keyof (Props & { max: T })]: (Props & { max: T })[key] }, ExtraOmitFields>;
	min: <T extends N | MaybeReadonly<[N, S]>, N extends number, S extends string>(value: T) => ExtendNumberSchemaBuilder<{ [key in keyof (Props & { min: T })]: (Props & { min: T })[key] }, ExtraOmitFields>;
	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendNumberSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }, ExtraOmitFields>;
	required: { [key in keyof PropsWithRequired]: PropsWithRequired[key] };
	sparse: ExtendNumberSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }, ExtraOmitFields>;
	unique: ExtendNumberSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }, ExtraOmitFields>;
}

export const numberSchemaBuilder = createBaseSchemaBuilderFactory<NumberSchemaBuilder>(Number);
