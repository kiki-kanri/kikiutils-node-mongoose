import { Schema } from 'mongoose';
import type { DefaultType, ObjectIdSchemaDefinition, Types } from 'mongoose';

import { createBaseSchemaBuilderFactory } from './base';
import type { MaybeReadonly } from '../types/utils';

type ExtendObjectIdSchemaBuilder<Props extends { type: ObjectIdSchemaDefinition }, ExtraOmitFields extends string> = Omit<ObjectIdSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;

export interface ObjectIdSchemaBuilder<Props extends { type: ObjectIdSchemaDefinition } = { type: ObjectIdSchemaDefinition }, ExtraOmitFields extends string = never> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends Types.ObjectId>(value: T) => ExtendObjectIdSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }, ExtraOmitFields>;
	enum: <
		T extends
			| MaybeReadonly<Array<O | null>>
			| {
					message?: M;
					values: MaybeReadonly<Array<O | null>>;
			  }
			| { [path: string]: O | null },
		M extends string,
		O extends Types.ObjectId
	>(
		value: T
	) => ExtendObjectIdSchemaBuilder<{ [key in keyof (Props & { enum: T })]: (Props & { enum: T })[key] }, ExtraOmitFields>;

	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendObjectIdSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }, ExtraOmitFields>;
	required: { [key in keyof (Props & { required: true })]: (Props & { required: true })[key] };
	sparse: ExtendObjectIdSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }, ExtraOmitFields>;
	unique: ExtendObjectIdSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }, ExtraOmitFields>;
}

export const objectIdSchemaBuilder = createBaseSchemaBuilderFactory<ObjectIdSchemaBuilder>(Schema.Types.ObjectId);
