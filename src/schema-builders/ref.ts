import { Schema } from 'mongoose';
import type { DefaultType, Model, ObjectIdSchemaDefinition, Types } from 'mongoose';

import { createBaseSchemaBuilderFactory } from './base';
import type { MaybeReadonly } from '../types/utils';

type ExtendRefSchemaBuilder<Props, ExtraOmitFields extends string> = Omit<RefSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;

export interface RefSchemaBuilder<Props = { type: ObjectIdSchemaDefinition }, ExtraOmitFields extends string = never, PropsWithRequired = Props & { required: true }> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends Types.ObjectId>(value: T) => ExtendRefSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }, ExtraOmitFields>;
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
	) => ExtendRefSchemaBuilder<{ [key in keyof (Props & { enum: T })]: (Props & { enum: T })[key] }, ExtraOmitFields>;

	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendRefSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }, ExtraOmitFields>;
	required: { [key in keyof PropsWithRequired]: PropsWithRequired[key] };
	sparse: ExtendRefSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }, ExtraOmitFields>;
	unique: ExtendRefSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }, ExtraOmitFields>;
}

const baseBuilderFactory = createBaseSchemaBuilderFactory(Schema.Types.ObjectId);
export const refSchemaBuilder = <T extends string | Model<any> | ((this: any, doc: any) => string | Model<any>)>(ref: T) => baseBuilderFactory({ ref }) as RefSchemaBuilder<{ ref: T }>;
