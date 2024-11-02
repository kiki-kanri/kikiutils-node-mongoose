import type { BooleanSchemaDefinition, DefaultType, IndexDirection, IndexOptions } from 'mongoose';
import type { Merge } from 'type-fest';

import { createBaseSchemaBuilderFactory } from './base';

type BaseProps = { type: BooleanSchemaDefinition };
export type ExtendBooleanSchemaBuilder<Props extends BaseProps, ExtraOmitFields extends string> = Omit<BooleanSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;

export interface BooleanSchemaBuilder<Props extends BaseProps = BaseProps, ExtraOmitFields extends string = never> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends boolean>(value: T) => ExtendBooleanSchemaBuilder<Merge<Props, { default: T }>, ExtraOmitFields>;
	index: <T extends boolean | IndexDirection | IndexOptions>(value: T) => ExtendBooleanSchemaBuilder<Merge<Props, { index: T }>, ExtraOmitFields>;
	nonRequired: Props;
	private: ExtendBooleanSchemaBuilder<Merge<Props, { private: true }>, ExtraOmitFields>;
	required: Merge<Props, { required: true }>;
	sparse: ExtendBooleanSchemaBuilder<Merge<Props, { sparse: true }>, ExtraOmitFields>;
	unique: ExtendBooleanSchemaBuilder<Merge<Props, { unique: true }>, ExtraOmitFields>;
}

export const booleanSchemaBuilder = createBaseSchemaBuilderFactory<BooleanSchemaBuilder>(Boolean);
