import type { BooleanSchemaDefinition, DefaultType } from 'mongoose';

import { createSchemaBuilder } from './base';

type ExtendBooleanSchemaBuilder<Props> = Omit<BooleanSchemaBuilder<Props>, keyof Props>;

export interface BooleanSchemaBuilder<Props = { type: BooleanSchemaDefinition }, PropsWithRequired = Props & { required: true }> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends boolean>(value: T) => ExtendBooleanSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }>;
	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendBooleanSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }>;
	required: { [key in keyof PropsWithRequired]: PropsWithRequired[key] };
	sparse: ExtendBooleanSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }>;
	unique: ExtendBooleanSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }>;
}

export const booleanSchemaBuilder = createSchemaBuilder<BooleanSchemaBuilder>(Boolean);
