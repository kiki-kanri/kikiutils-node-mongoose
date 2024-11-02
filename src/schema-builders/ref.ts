import { Schema } from 'mongoose';
import type { DefaultType, IndexDirection, IndexOptions, Model, ObjectIdSchemaDefinition, Types } from 'mongoose';
import type { Merge } from 'type-fest';

import { createBaseSchemaBuilderFactory } from './base';
import type { Readonlyable } from '../types/utils';

type BaseProps = { type: ObjectIdSchemaDefinition };
export type ExtendRefSchemaBuilder<Props extends BaseProps, ExtraOmitFields extends string> = Omit<RefSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;

export interface RefSchemaBuilder<Props extends { type: ObjectIdSchemaDefinition } = { type: ObjectIdSchemaDefinition }, ExtraOmitFields extends string = never> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends Types.ObjectId>(value: T) => ExtendRefSchemaBuilder<Merge<Props, { default: T }>, ExtraOmitFields>;
	enum: <
		T extends
			| Readonlyable<Array<O | null>>
			| {
					message?: M;
					values: Readonlyable<Array<O | null>>;
			  }
			| { [path: string]: O | null },
		M extends string,
		O extends Types.ObjectId
	>(
		value: T
	) => ExtendRefSchemaBuilder<Merge<Props, { enum: T }>, ExtraOmitFields>;

	index: <T extends boolean | IndexDirection | IndexOptions>(value: T) => ExtendRefSchemaBuilder<Merge<Props, { index: T }>, ExtraOmitFields>;
	nonRequired: Props;
	private: ExtendRefSchemaBuilder<Merge<Props, { private: true }>, ExtraOmitFields>;
	required: Merge<Props, { required: true }>;
	sparse: ExtendRefSchemaBuilder<Merge<Props, { sparse: true }>, ExtraOmitFields>;
	unique: ExtendRefSchemaBuilder<Merge<Props, { unique: true }>, ExtraOmitFields>;
}

const baseBuilderFactory = createBaseSchemaBuilderFactory(Schema.Types.ObjectId);
export const refSchemaBuilder = <T extends string | Model<any> | ((this: any, doc: any) => string | Model<any>)>(ref: T) => baseBuilderFactory({ ref }) as RefSchemaBuilder<{ ref: T; type: ObjectIdSchemaDefinition }>;
