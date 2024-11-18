import { Schema } from 'mongoose';
import type { DefaultType, IndexDirection, IndexOptions, ObjectIdSchemaDefinition, Types } from 'mongoose';
import type { Merge } from 'type-fest';

import type { Readonlyable } from '../types/utils';

import { createBaseSchemaBuilderFactory } from './base';

export type ExtendObjectIdSchemaBuilder<Props extends BaseProps, ExtraOmitFields extends string> = Omit<ObjectIdSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;

interface BaseProps {
	type: ObjectIdSchemaDefinition;
}

export interface ObjectIdSchemaBuilder<Props extends { type: ObjectIdSchemaDefinition } = { type: ObjectIdSchemaDefinition }, ExtraOmitFields extends string = never> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends Types.ObjectId>(value: T) => ExtendObjectIdSchemaBuilder<Merge<Props, { default: T }>, ExtraOmitFields>;
	enum: <
		T extends
		| Readonlyable<Array<O | null>>
		| { message?: M; values: Readonlyable<Array<O | null>> }
		| { [path: string]: O | null },
		M extends string,
		O extends Types.ObjectId,
	>(
		value: T
	) => ExtendObjectIdSchemaBuilder<Merge<Props, { enum: T }>, ExtraOmitFields>;

	index: <T extends boolean | IndexDirection | IndexOptions>(value: T) => ExtendObjectIdSchemaBuilder<Merge<Props, { index: T }>, ExtraOmitFields>;
	nonRequired: Props;
	private: ExtendObjectIdSchemaBuilder<Merge<Props, { private: true }>, ExtraOmitFields>;
	required: Merge<Props, { required: true }>;
	sparse: ExtendObjectIdSchemaBuilder<Merge<Props, { sparse: true }>, ExtraOmitFields>;
	unique: ExtendObjectIdSchemaBuilder<Merge<Props, { unique: true }>, ExtraOmitFields>;
}

export const objectIdSchemaBuilder = createBaseSchemaBuilderFactory<ObjectIdSchemaBuilder>(Schema.Types.ObjectId);
