import type { BooleanSchemaDefinition, DefaultType } from 'mongoose';

import { createBaseSchemaBuilderFactory } from './base';

type ExtendBooleanSchemaBuilder<Props extends { type: BooleanSchemaDefinition }, ExtraOmitFields extends string> = Omit<BooleanSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;

export interface BooleanSchemaBuilder<Props extends { type: BooleanSchemaDefinition } = { type: BooleanSchemaDefinition }, ExtraOmitFields extends string = never, PropsWithRequired = Props & { required: true }> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends boolean>(value: T) => ExtendBooleanSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }, ExtraOmitFields>;
	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendBooleanSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }, ExtraOmitFields>;
	required: { [key in keyof PropsWithRequired]: PropsWithRequired[key] };
	sparse: ExtendBooleanSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }, ExtraOmitFields>;
	unique: ExtendBooleanSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }, ExtraOmitFields>;
}

export const booleanSchemaBuilder = createBaseSchemaBuilderFactory<BooleanSchemaBuilder>(Boolean);
