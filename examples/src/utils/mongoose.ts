import type { BuildMongooseModelOptions } from '@kikiutils/mongoose/types/options';
import { buildMongooseModel as _buildMongooseModel } from '@kikiutils/mongoose/utils';
import type { Schema } from 'mongoose';

export const buildMongooseModel = <DocType, Model extends BaseMongoosePaginateModel<DocType, InstanceMethodsAndOverrides, QueryHelpers>, InstanceMethodsAndOverrides = {}, QueryHelpers = {}>(
	collection: string,
	name: string,
	schema: Schema<DocType, Model, InstanceMethodsAndOverrides, QueryHelpers>,
	options?: BuildMongooseModelOptions
) => {
	// You can unify schema changes, register plugins, statics, and other things here.
	// If you don't need to unify the pre-processing, you can use buildMongooseModel directly without creating this function.
	return _buildMongooseModel(collection, name, schema, options);
};
