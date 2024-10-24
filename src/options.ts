import { customMongooseOptions as internalCustomMongooseOptions } from './_internals';
import type { CustomMongooseOptions } from './types/options';
import type { buildMongooseModel } from './utils';

export type DoNotUseOrRemoveThisType = typeof buildMongooseModel;

/**
 * @deprecated - Will be removed in the next major version. Use {@link setCustomMongooseOptions} instead.
 */
export const customMongooseOptions: CustomMongooseOptions = {};

/**
 * Sets custom options.
 *
 * For example, you can set {@link CustomMongooseOptions.beforeModelBuild} to define a function that will be called
 * every time {@link buildMongooseModel} is used. Inside this function, you can modify
 * the schema, allowing you to apply common settings to all global schemas.
 */
export const setCustomMongooseOptions = <K extends keyof CustomMongooseOptions>(key: K, value: CustomMongooseOptions[K]) => (internalCustomMongooseOptions[key] = value);
