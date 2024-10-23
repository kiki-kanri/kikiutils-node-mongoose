import type { DefaultType, StringSchemaDefinition } from 'mongoose';

import { createSchemaBuilder } from './base';

type ExtendStringSchemaBuilder<Props> = Omit<StringSchemaBuilder<Props>, keyof Props>;

export interface StringSchemaBuilder<Props = { type: StringSchemaDefinition }, PropsWithRequired = Props & { required: true }> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }>;
	enum: <
		T extends
			| Array<S | N | null>
			| ReadonlyArray<S | N | null>
			| {
					values: Array<S | N | null> | ReadonlyArray<S | N | null>;
					message?: M;
			  }
			| { [path: string]: S | N | null },
		M extends string,
		N extends number,
		S extends string
	>(
		value: T
	) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { enum: T })]: (Props & { enum: T })[key] }>;

	length: <T extends L | [L, M] | readonly [L, M], L extends number, M extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { maxlength: T; minlength: T })]: (Props & { maxlength: T; minlength: T })[key] }>;
	lowercase: ExtendStringSchemaBuilder<{ [key in keyof (Props & { lowercase: true })]: (Props & { lowercase: true })[key] }>;
	maxlength: <T extends L | [L, M] | readonly [L, M], L extends number, M extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { maxlength: T })]: (Props & { maxlength: T })[key] }>;
	minlength: <T extends L | [L, M] | readonly [L, M], L extends number, M extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { minlength: T })]: (Props & { minlength: T })[key] }>;
	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendStringSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }>;
	required: { [key in keyof PropsWithRequired]: PropsWithRequired[key] };
	sparse: ExtendStringSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }>;
	text: ExtendStringSchemaBuilder<{ [key in keyof (Props & { text: true })]: (Props & { text: true })[key] }>;
	trim: ExtendStringSchemaBuilder<{ [key in keyof (Props & { trim: true })]: (Props & { trim: true })[key] }>;
	unique: ExtendStringSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }>;
	uppercase: ExtendStringSchemaBuilder<{ [key in keyof (Props & { uppercase: true })]: (Props & { uppercase: true })[key] }>;
}

export const stringSchemaBuilder = createSchemaBuilder<StringSchemaBuilder>(String);
