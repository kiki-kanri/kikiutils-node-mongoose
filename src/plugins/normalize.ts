import { get as lodashGet, set as lodashSet, unset as lodashUnset } from 'lodash-es';
import type { Schema, Types } from 'mongoose';

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
