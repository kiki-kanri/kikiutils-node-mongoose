import type { AggregatePaginateModel, Connection, HydratedDocument, PaginateModel, QueryWithHelpers, Types } from 'mongoose';

export type {} from './aggregate-paginate';
export type {} from './paginate';

// @ts-ignore
export interface BaseModelStatics<RawDocType, InstanceMethodsAndOverrides = {}, QueryHelpers = {}> {}

export interface MongooseConnections {
	default?: Connection;
}

declare global {
	/**
	 * Type definition for a base Mongoose document type.
	 *
	 * This type alias omits the `createdAt`, `id`, and `updatedAt` fields from type `T`,
	 * and conditionally includes `createdAt` and `updatedAt` fields as `Date` based on
	 * the `CreatedAtField` and `UpdatedAtField` flags.
	 *
	 * @template T - The original document type.
	 * @template CreatedAtField - A boolean flag indicating whether the `createdAt` field should be included.
	 * @template UpdatedAtField - A boolean flag indicating whether the `updatedAt` field should be included.
	 */
	type BaseMongooseDocType<T, CreatedAtField extends boolean = true, UpdatedAtField extends boolean = true> = Omit<T, 'createdAt' | 'id' | 'updatedAt'> &
		(CreatedAtField extends true ? { createdAt: Date } : {}) &
		(UpdatedAtField extends true ? { updatedAt: Date } : {});

	/**
	 * Type definition for a Mongoose model with pagination and aggregation capabilities.
	 *
	 * This type alias combines the `AggregatePaginateModel` and `PaginateModel` interfaces,
	 * along with custom static methods defined in `BaseModelStatics`.
	 *
	 * @template RawDocType - The raw document type as stored in MongoDB.
	 * @template InstanceMethodsAndOverrides - Optional type parameter for instance methods and overrides.
	 * @template QueryHelpers - Optional type parameter for additional query helper methods.
	 */
	type BaseMongoosePaginateModel<RawDocType, InstanceMethodsAndOverrides = {}, QueryHelpers = {}> = AggregatePaginateModel<RawDocType, QueryHelpers, InstanceMethodsAndOverrides> &
		PaginateModel<RawDocType, QueryHelpers, InstanceMethodsAndOverrides> &
		BaseModelStatics<RawDocType, InstanceMethodsAndOverrides, QueryHelpers>;

	/**
	 * Type definition for a Mongoose document or ObjectId.
	 *
	 * This type alias represents a value that can be either a Mongoose document, a string,
	 * or an ObjectId. It is useful when working with Mongoose models where you might have
	 * references to documents that are stored either as objects or as ObjectIds.
	 *
	 * @template D - The Mongoose document type.
	 */
	type MongooseDocumentOrObjectId<D> = D | string | Types.ObjectId;

	/**
	 * Type definition for the return type of a Mongoose `findOne` query.
	 *
	 * This type alias represents the return type of a `findOne` query in Mongoose.
	 * It extends the `QueryWithHelpers` type, indicating that the query can return
	 * either a document of type `DocType` or `null` if no document is found. The
	 * `QueryHelpers` type parameter allows for the inclusion of additional query
	 * helper methods.
	 *
	 * @template RawDocType - The raw document type as stored in MongoDB.
	 * @template DocType - The Mongoose document type after applying schema transformations.
	 * @template QueryHelpers - Optional type parameter for additional query helper methods.
	 */
	type MongooseFindOneReturnType<RawDocType, DocType, QueryHelpers = {}> = QueryWithHelpers<DocType | null, DocType, QueryHelpers, RawDocType, 'findOne'>;

	/**
	 * Type definition for a hydrated Mongoose document.
	 *
	 * This type alias represents a hydrated document in Mongoose, which is a fully
	 * populated document that includes instance methods and query helpers. It extends
	 * the `HydratedDocument` type from Mongoose, allowing for additional instance
	 * methods and query helpers to be specified.
	 *
	 * @template DocType - The Mongoose document type after applying schema transformations.
	 * @template InstanceMethodsAndOverrides - Optional type parameter for instance methods and overrides.
	 * @template QueryHelpers - Optional type parameter for additional query helper methods.
	 */
	type MongooseHydratedDocument<DocType, InstanceMethodsAndOverrides = {}, QueryHelpers = {}> = HydratedDocument<DocType, InstanceMethodsAndOverrides, QueryHelpers>;
}
