import type { DefaultType, DateSchemaDefinition } from 'mongoose';

import { createSchemaBuilder } from './base';
import type { MaybeReadonly } from '../types/utils';

type ExtendDateSchemaBuilder<Props> = Omit<DateSchemaBuilder<Props>, keyof Props>;

export interface DateSchemaBuilder<Props = { type: DateSchemaDefinition }, PropsWithRequired = Props & { required: true }> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends NativeDate>(value: T) => ExtendDateSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }>;
	enum: <
		T extends
			| MaybeReadonly<Array<D | null>>
			| {
					message?: M;
					values: MaybeReadonly<Array<D | null>>;
			  }
			| { [path: string]: D | null },
		D extends NativeDate,
		M extends string
	>(
		value: T
	) => ExtendDateSchemaBuilder<{ [key in keyof (Props & { enum: T })]: (Props & { enum: T })[key] }>;

	max: <T extends D | MaybeReadonly<[D, S]>, D extends NativeDate, S extends string>(value: T) => ExtendDateSchemaBuilder<{ [key in keyof (Props & { max: T })]: (Props & { max: T })[key] }>;
	min: <T extends D | MaybeReadonly<[D, S]>, D extends NativeDate, S extends string>(value: T) => ExtendDateSchemaBuilder<{ [key in keyof (Props & { min: T })]: (Props & { min: T })[key] }>;
	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendDateSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }>;
	required: { [key in keyof PropsWithRequired]: PropsWithRequired[key] };
	sparse: ExtendDateSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }>;
	unique: ExtendDateSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }>;
}

export const dateSchemaBuilder = createSchemaBuilder<DateSchemaBuilder>(Date);
