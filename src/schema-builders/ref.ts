import { Schema } from 'mongoose';
import type { DefaultType, IndexDirection, IndexOptions, Model, ObjectIdSchemaDefinition, Types } from 'mongoose';
import type { Merge } from 'type-fest';

import type { Readonlyable } from '../types/utils';

import { createBaseSchemaBuilderFactory } from './base';

export type ExtendRefSchemaBuilder<Props extends BaseProps, ExtraOmitFields extends string> = Omit<RefSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;

interface BaseProps {
	type: ObjectIdSchemaDefinition;
}

export interface RefSchemaBuilder<Props extends { type: ObjectIdSchemaDefinition } = { type: ObjectIdSchemaDefinition }, ExtraOmitFields extends string = never> {
	default: <T extends ((this: any, doc: any) => DefaultType<D>) | DefaultType<D> | null, D extends Types.ObjectId>(value: T) => ExtendRefSchemaBuilder<Merge<Props, { default: T }>, ExtraOmitFields>;
	enum: <
		T extends
		| { [path: string]: O | null }
		| { message?: M; values: Readonlyable<Array<O | null>> }
		| Readonlyable<Array<O | null>>,
		M extends string,
		O extends Types.ObjectId,
	>(
		value: T
	) => ExtendRefSchemaBuilder<Merge<Props, { enum: T }>, ExtraOmitFields>;

	index: <T extends IndexDirection | IndexOptions | boolean>(value: T) => ExtendRefSchemaBuilder<Merge<Props, { index: T }>, ExtraOmitFields>;
	nonRequired: Props;
	private: ExtendRefSchemaBuilder<Merge<Props, { private: true }>, ExtraOmitFields>;
	required: Merge<Props, { required: true }>;
	sparse: ExtendRefSchemaBuilder<Merge<Props, { sparse: true }>, ExtraOmitFields>;
	unique: ExtendRefSchemaBuilder<Merge<Props, { unique: true }>, ExtraOmitFields>;
}

const baseBuilderFactory = createBaseSchemaBuilderFactory(Schema.Types.ObjectId);
export const refSchemaBuilder = <T extends ((this: any, doc: any) => Model<any> | string) | Model<any> | string>(ref: T) => baseBuilderFactory({ ref }) as RefSchemaBuilder<{ ref: T; type: ObjectIdSchemaDefinition }>;
