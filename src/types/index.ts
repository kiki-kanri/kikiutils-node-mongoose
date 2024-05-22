import type { AggregatePaginateModel, HydratedDocument, PaginateModel, QueryWithHelpers, Types } from 'mongoose';

// @ts-ignore
export interface BaseModelStatics<RawDocType, InstanceMethodsAndOverrides = {}, QueryHelpers = {}> {}

declare global {
	type BaseMongooseDocType<T, CreatedAtField extends boolean = true, UpdatedAtField extends boolean = true> = Omit<T, 'createdAt' | 'id' | 'updatedAt'> &
		(CreatedAtField extends true ? { createdAt: Date } : {}) &
		(UpdatedAtField extends true ? { updatedAt: Date } : {});

	type BaseMongoosePaginateModel<RawDocType, InstanceMethodsAndOverrides = {}, QueryHelpers = {}> = AggregatePaginateModel<RawDocType, QueryHelpers, InstanceMethodsAndOverrides> &
		PaginateModel<RawDocType, QueryHelpers, InstanceMethodsAndOverrides> &
		BaseModelStatics<RawDocType, InstanceMethodsAndOverrides, QueryHelpers>;

	type MongooseDocumentOrObjectId<D> = D | string | Types.ObjectId;
	type MongooseFindOneReturnType<RawDocType, DocType, QueryHelpers = {}> = QueryWithHelpers<DocType | null, DocType, QueryHelpers, RawDocType, 'findOne'>;
	type MongooseHydratedDocument<DocType, InstanceMethodsAndOverrides = {}, QueryHelpers = {}> = HydratedDocument<DocType, InstanceMethodsAndOverrides, QueryHelpers>;
}
