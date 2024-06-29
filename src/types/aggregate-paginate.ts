//
// Based on type declarations for mongoose-paginate-v2 1.3.
//
// Thanks to knyuwork <https://github.com/knyuwork>
// and LiRen Tu <https://github.com/tuliren> for their contribution
// Used with mongoose-paginate, redefined and renamed here to avoid conflicts.

import type { AggregatePaginateOptions, Schema } from 'mongoose';

declare module 'mongoose' {
	interface AggregateCustomLabels<T = string | undefined | boolean> {
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

	interface AggregatePaginateOptions {
		sort?: object | string;
		offset?: number;
		page?: number;
		limit?: number;
		customLabels?: AggregateCustomLabels;
		/* If pagination is set to `false`, it will return all docs without adding limit condition. (Default: `true`) */
		pagination?: boolean;
		allowDiskUse?: boolean;
		countQuery?: object;
		useFacet?: boolean;
	}

	interface AggregatePaginateQueryPopulateOptions {
		/** space delimited path(s) to populate */
		path: string;
		/** optional fields to select */
		select?: any;
		/** optional query conditions to match */
		match?: any;
		/** optional model to use for population */
		model?: string | Model<any> | undefined;
		/** optional query options like sort, limit, etc */
		options?: any;
		/** deep populate */
		populate?: AggregatePaginateQueryPopulateOptions | AggregatePaginateQueryPopulateOptions[];
	}

	interface AggregatePaginateResult<T> {
		docs: T[];
		totalDocs: number;
		limit: number;
		page?: number;
		totalPages: number;
		nextPage?: number | null;
		prevPage?: number | null;
		pagingCounter: number;
		hasPrevPage: boolean;
		hasNextPage: boolean;
		meta?: any;
		[customLabel: string]: T[] | number | boolean | null | undefined;
	}

	interface AggregatePaginateModel<RawDocType, QueryHelpers = {}, InstanceMethodsAndOverrides = {}> extends Model<RawDocType, QueryHelpers, InstanceMethodsAndOverrides> {
		aggregatePaginate<T>(query?: Aggregate<T[]>, options?: AggregatePaginateOptions, callback?: (err: any, result: AggregatePaginateResult<T>) => void): Promise<AggregatePaginateResult<T>>;
	}
}

declare function mongooseAggregatePaginate(schema: Schema): void;
declare namespace mongooseAggregatePaginate {
	const PREPAGINATION_PLACEHOLDER: string;
	const aggregatePaginate: { options: AggregatePaginateOptions };
}

export default mongooseAggregatePaginate;
