import type { FilterQuery, mongo, PaginateOptions, Schema } from 'mongoose';

declare module 'mongoose' {
	interface PaginateCustomLabels<T = string | undefined | boolean> {
		totalDocs?: T;
		docs?: T;
		limit?: T;
		page?: T;
		nextPage?: T;
		prevPage?: T;
		hasNextPage?: T;
		hasPrevPage?: T;
		totalPages?: T;
		pagingCounter?: T;
		meta?: T;
	}

	interface PaginateReadOptions {
		pref: string;
		tags?: any[];
	}

	interface PaginateOptions {
		select?: object | string;
		collation?: mongo.CollationOptions;
		sort?: object | string;
		populate?: PopulateOptions[] | string[] | PopulateOptions | string;
		projection?: any;
		lean?: boolean;
		leanWithId?: boolean;
		offset?: number;
		page?: number;
		limit?: number;
		customLabels?: PaginateCustomLabels;
		/* If pagination is set to `false`, it will return all docs without adding limit condition. (Default: `true`) */
		pagination?: boolean;
		useEstimatedCount?: boolean;
		useCustomCountFn?: () => Promise<number>;
		forceCountFn?: boolean;
		allowDiskUse?: boolean;
		read?: PaginateReadOptions;
		options?: QueryOptions;
	}

	interface SubPaginateOptions {
		select?: object | string;
		populate?: PopulateOptions[] | string[] | PopulateOptions | string;
		pagination?: boolean;
		read?: PaginateReadOptions;
		pagingOptions: SubDocumentPagingOptions | undefined;
	}

	interface SubDocumentPagingOptions {
		populate?: PopulateOptions[] | string[] | PopulateOptions | string;
		page?: number;
		limit?: number;
	}

	interface PaginateResult<T> {
		docs: T[];
		totalDocs: number;
		limit: number;
		hasPrevPage: boolean;
		hasNextPage: boolean;
		page?: number;
		totalPages: number;
		offset: number;
		prevPage?: number | null;
		nextPage?: number | null;
		pagingCounter: number;
		meta?: any;
		[customLabel: string]: T[] | number | boolean | null | undefined;
	}

	type PaginateDocument<T, TMethods, TQueryHelpers, O extends PaginateOptions = object> = O['lean'] extends true ? (O['leanWithId'] extends true ? T & { id: string } : T) : HydratedDocument<T, TMethods, TQueryHelpers>;

	interface PaginateModel<T, TQueryHelpers = object, TMethods = object> extends Model<T, TQueryHelpers, TMethods> {
		paginate: {
			<O extends PaginateOptions>(
				query?: FilterQuery<T>,
				options?: O,
				callback?: (err: any, result: PaginateResult<PaginateDocument<T, TMethods, TQueryHelpers, O>>) => void
			): Promise<PaginateResult<PaginateDocument<T, TMethods, TQueryHelpers, O>>>;

			<UserType = T, O extends PaginateOptions = PaginateOptions>(
				query?: FilterQuery<T>,
				options?: O,
				callback?: (err: any, result: PaginateResult<PaginateDocument<UserType, TMethods, TQueryHelpers, O>>) => void
			): Promise<PaginateResult<PaginateDocument<UserType, TMethods, TQueryHelpers, O>>>;

			<UserType = T>(
				query?: FilterQuery<T>,
				options?: PaginateOptions,
				callback?: (err: any, result: PaginateResult<PaginateDocument<UserType, TMethods, TQueryHelpers, PaginateOptions>>) => void
			): Promise<PaginateResult<PaginateDocument<UserType, TMethods, TQueryHelpers, PaginateOptions>>>;
		};
	}

	// @ts-expect-error Ignore this error.
	interface Query<ResultType, DocType, THelpers = NonNullable<unknown>, RawDocType = DocType, _QueryOp = 'find', TInstanceMethods = Record<string, never>> {
		paginate: {
			<O extends PaginateOptions>(options?: O): Promise<PaginateResult<PaginateDocument<RawDocType, TInstanceMethods, THelpers, O>>>;
			<UserType = ResultType, O extends PaginateOptions = PaginateOptions>(options?: O): Promise<PaginateResult<PaginateDocument<UserType, TInstanceMethods, THelpers, O>>>;
			<UserType = ResultType>(options?: PaginateOptions): Promise<PaginateResult<PaginateDocument<UserType, TInstanceMethods, THelpers, PaginateOptions>>>;
		};
	}
}

declare function _(schema: Schema): void;

/* eslint-disable-next-line ts/no-namespace */
declare namespace _ {
	const paginate: { options: PaginateOptions };
	const paginateSubDocs: { options: PaginateOptions };

	class PaginationParameters<T, O extends PaginateOptions> {
		constructor(request: { query?: Record<string, any> });
		get: () => [FilterQuery<T>, O];
		getOptions: () => O;
		getQuery: () => FilterQuery<T>;
	}
}

export default _;
