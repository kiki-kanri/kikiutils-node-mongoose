import type { Connection, SchemaTimestampsConfig } from 'mongoose';

export interface BuildMongooseModelOptions {
	connection?: Connection;

	/**
	 * @default true
	 */
	enableNormalizePlugin?: boolean;

	/**
	 * @default true
	 */
	timestamps?: boolean | SchemaTimestampsConfig;
}
