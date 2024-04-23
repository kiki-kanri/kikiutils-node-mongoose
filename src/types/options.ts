import type { Connection, Schema, SchemaTimestampsConfig } from 'mongoose';

export interface BuildMongooseModelOptions<DocType, Model, InstanceMethodsAndOverrides, QueryHelpers> {
	beforeBuild?: (schema: Schema<DocType, Model, InstanceMethodsAndOverrides, QueryHelpers>) => void;
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
