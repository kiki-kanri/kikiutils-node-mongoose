import type { HydratedDocument, Model as MongooseModel, PaginateModel, QueryWithHelpers, Types } from 'mongoose';

export {} from 'mongoose-paginate-v2';

// @ts-ignore
export interface BaseModelStatics<T, TMO = {}, TQ = {}> {}

declare global {
	type BaseMongooseDocType<T, CreatedAtField extends boolean = true, UpdatedAtField extends boolean = true> = Omit<T, 'createdAt' | 'id' | 'updatedAt'> &
		(CreatedAtField extends true ? { createdAt: Date } : {}) &
		(UpdatedAtField extends true ? { updatedAt: Date } : {});

	type BaseMongooseModel<T, TMO = {}, TQ = {}> = MongooseModel<T, TQ, TMO> & BaseModelStatics<T, TMO, TQ>;
	type BaseMongoosePaginateModel<T, TMO = {}, TQ = {}> = PaginateModel<T, TQ, TMO> & BaseModelStatics<T, TMO, TQ>;
	type MongooseDocumentOrObjectId<D> = D | string | Types.ObjectId;
	type MongooseFindOneReturnType<T, TD, TQ = {}> = QueryWithHelpers<TD | null, TD, TQ, T, 'findOne'>;
	type MongooseHydratedDocument<D, TMO = {}, TQ = {}> = HydratedDocument<D, TMO, TQ>;
}
