import type { DefaultType, DateSchemaDefinition } from 'mongoose';

import { createBaseSchemaBuilderFactory } from './base';
import type { MaybeReadonly } from '../types/utils';

type ExtendDateSchemaBuilder<Props, ExtraOmitFields extends string> = Omit<DateSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;

export interface DateSchemaBuilder<Props = { type: DateSchemaDefinition }, ExtraOmitFields extends string = never, PropsWithRequired = Props & { required: true }> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends NativeDate>(value: T) => ExtendDateSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }, ExtraOmitFields>;
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
	) => ExtendDateSchemaBuilder<{ [key in keyof (Props & { enum: T })]: (Props & { enum: T })[key] }, ExtraOmitFields>;

	max: <T extends D | MaybeReadonly<[D, S]>, D extends NativeDate, S extends string>(value: T) => ExtendDateSchemaBuilder<{ [key in keyof (Props & { max: T })]: (Props & { max: T })[key] }, ExtraOmitFields>;
	min: <T extends D | MaybeReadonly<[D, S]>, D extends NativeDate, S extends string>(value: T) => ExtendDateSchemaBuilder<{ [key in keyof (Props & { min: T })]: (Props & { min: T })[key] }, ExtraOmitFields>;
	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendDateSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }, ExtraOmitFields>;
	required: { [key in keyof PropsWithRequired]: PropsWithRequired[key] };
	sparse: ExtendDateSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }, ExtraOmitFields>;
	unique: ExtendDateSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }, ExtraOmitFields>;
}

export const dateSchemaBuilder = createBaseSchemaBuilderFactory<DateSchemaBuilder>(Date);
