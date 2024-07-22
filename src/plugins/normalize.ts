import lodash from 'lodash';
import type { Schema, Types } from 'mongoose';

const { get: lodashGet, set: lodashSet, unset: lodashUnset } = lodash;

/**
 * Mongoose plugin to normalize the JSON output of documents.
 *
 * This plugin modifies the `toJSON` method of Mongoose schemas to:
 * - Add an `id` field equal to the string representation of `_id`
 * - Remove the `_id` field
 * - Exclude fields marked as `private` from the JSON output
 * - Convert `Decimal128` fields to strings
 * - Remove the `__v` version key
 *
 * @template S - The type of the schema.
 *
 * @param schema - The Mongoose schema to apply the plugin to.
 */
export const mongooseNormalizePlugin = <S extends Schema>(schema: S) => {
	const toJSON = schema.get('toJSON');
	const toJSONTransform = toJSON?.transform;
	schema.set('toJSON', {
		...toJSON,
		transform(doc: any, ret: any, options: any) {
			const copiedRet = { ...ret };
			copiedRet.id = copiedRet._id?.toHexString();
			delete copiedRet._id;
			for (const path in schema.paths) {
				if (schema.paths[path]?.options?.private) lodashUnset(copiedRet, path);
				if (schema.paths[path]?.instance === 'Decimal128') {
					const value: Types.Decimal128 | undefined = lodashGet(copiedRet, path);
					if (value) lodashSet(copiedRet, path, value.toString());
				}
			}

			delete copiedRet.__v;
			if (toJSONTransform && typeof toJSONTransform !== 'boolean') return toJSONTransform(doc, copiedRet, options);
			return copiedRet;
		}
	});
};

export default mongooseNormalizePlugin;
