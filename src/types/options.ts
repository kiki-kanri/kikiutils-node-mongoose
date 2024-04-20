import type { Connection, Schema, SchemaTimestampsConfig } from 'mongoose';

export interface BuildMongooseModelOptions<DocType, Model, InstanceMethods, QueryHelpers> {
	beforeBuild?: (schema: Schema<DocType, Model, InstanceMethods, QueryHelpers>) => void;
	connection?: Connection;

	/**
	 * @default true
	 */
	enableNormalizePlugin?: boolean;

	/**
	 * @default true
	 */
	enablePaginatePlugin?: boolean;

	/**
	 * @default true
	 */
	timestamps?: boolean | SchemaTimestampsConfig;
}
