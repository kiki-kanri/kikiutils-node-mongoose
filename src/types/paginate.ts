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
		populate?: PopulateOptions[] | string[] | PopulateOptions | string | PopulateOptions;
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
		populate?: PopulateOptions[] | string[] | PopulateOptions | string | PopulateOptions;
		pagination?: boolean;
		read?: PaginateReadOptions;
		pagingOptions: SubDocumentPagingOptions | undefined;
	}

	interface SubDocumentPagingOptions {
		populate?: PopulateOptions[] | string[] | PopulateOptions | string | PopulateOptions;
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

	type PaginateDocument<T, TMethods, TVirtuals, O extends PaginateOptions = {}> = O['lean'] extends true ? (O['leanWithId'] extends true ? T & { id: string } : T) : HydratedDocument<T, TMethods, TVirtuals>;

	interface PaginateModel<T, TQueryHelpers = {}, TMethods = {}> extends Model<T, TQueryHelpers, TMethods> {
		paginate<O extends PaginateOptions>(query?: FilterQuery<T>, options?: O, callback?: (err: any, result: PaginateResult<PaginateDocument<T, TMethods, O>>) => void): Promise<PaginateResult<PaginateDocument<T, TMethods, O>>>;
	}

	interface PaginateModel<T, TQueryHelpers = {}, TMethods = {}> extends Model<T, TQueryHelpers, TMethods> {
		paginate<UserType = T, O extends PaginateOptions = PaginateOptions>(
			query?: FilterQuery<T>,
			options?: O,
			callback?: (err: any, result: PaginateResult<PaginateDocument<UserType, TMethods, O>>) => void
		): Promise<PaginateResult<PaginateDocument<UserType, TMethods, O>>>;
	}

	interface PaginateModel<T, TQueryHelpers = {}, TMethods = {}> extends Model<T, TQueryHelpers, TMethods> {
		paginate<UserType = T>(
			query?: FilterQuery<T>,
			options?: PaginateOptions,
			callback?: (err: any, result: PaginateResult<PaginateDocument<UserType, TMethods, PaginateOptions>>) => void
		): Promise<PaginateResult<PaginateDocument<UserType, TMethods, PaginateOptions>>>;
	}
}

declare function _(schema: Schema): void;
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
