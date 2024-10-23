import type { DefaultType, NumberSchemaDefinition } from 'mongoose';

import { createSchemaBuilder } from './base';
import type { MaybeReadonly } from '../types/utils';

type ExtendNumberSchemaBuilder<Props> = Omit<NumberSchemaBuilder<Props>, keyof Props>;

export interface NumberSchemaBuilder<Props = { type: NumberSchemaDefinition }, PropsWithRequired = Props & { required: true }> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends number>(value: T) => ExtendNumberSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }>;
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
	) => ExtendNumberSchemaBuilder<{ [key in keyof (Props & { enum: T })]: (Props & { enum: T })[key] }>;

	max: <T extends N | MaybeReadonly<[N, S]>, N extends number, S extends string>(value: T) => ExtendNumberSchemaBuilder<{ [key in keyof (Props & { max: T })]: (Props & { max: T })[key] }>;
	min: <T extends N | MaybeReadonly<[N, S]>, N extends number, S extends string>(value: T) => ExtendNumberSchemaBuilder<{ [key in keyof (Props & { min: T })]: (Props & { min: T })[key] }>;
	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendNumberSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }>;
	required: { [key in keyof PropsWithRequired]: PropsWithRequired[key] };
	sparse: ExtendNumberSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }>;
	unique: ExtendNumberSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }>;
}

export const numberSchemaBuilder = createSchemaBuilder<NumberSchemaBuilder>(Number);
