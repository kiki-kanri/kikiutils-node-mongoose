import type {
    Connection,
    Schema,
    SchemaTimestampsConfig,
} from 'mongoose';

import type { buildMongooseModel } from '../utils';

export type DoNotRemoveOrUseThisType = typeof buildMongooseModel;

/**
 * Interface for options used when building a Mongoose model.
 *
 * This interface defines the optional configuration settings that can be provided
 * when creating a Mongoose model. It includes options for specifying the database
 * connection, enabling the normalize plugin, and configuring timestamp fields.
 */
export interface BuildMongooseModelOptions {
    /**
     * The Mongoose connection to be used for the model.
     *
     * This is an optional setting that allows specifying a custom connection
     * for the model.
     */
    connection?: Connection;

    /**
     * Flag to enable or disable the normalize plugin.
     *
     * This flag indicates whether the normalize plugin should be enabled.
     * The default value is `true`.
     *
     * @default true
     */
    enableNormalizePlugin?: boolean;

    /**
     * Configuration for Mongoose timestamps.
     *
     * This option allows enabling or disabling timestamps, or providing a
     * custom timestamp configuration using `SchemaTimestampsConfig`.
     * The default value is `true`.
     *
     * @default true
     */
    timestamps?: boolean | SchemaTimestampsConfig;
}

export interface CustomMongooseOptions {
    /**
     * A function that will be executed before the final build when using {@link buildMongooseModel}.
     */
    beforeModelBuild?: <DocType, Model extends BaseMongoosePaginateModel<DocType, InstanceMethodsAndOverrides, QueryHelpers>, InstanceMethodsAndOverrides = object, QueryHelpers = object>(
        schema: Schema<DocType, Model, InstanceMethodsAndOverrides, QueryHelpers>
    ) => void;
}
