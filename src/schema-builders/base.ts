import type { Schema } from 'mongoose';

export const createBaseSchemaBuilderFactory = <Builder = Readonly<Record<string, any>>>(type: BooleanConstructor | DateConstructor | NumberConstructor | Schema.Types.ObjectId['constructor'] | StringConstructor) => {
	return (schema: Record<string, any> = {}) => {
		schema.type = type;
		return new Proxy(Object.freeze({}), {
			get(_, key, receiver) {
				if (typeof key === 'symbol') throw new Error('Cannot use symbol as a schema attribute');
				if (key in schema) throw new Error(`Duplicate schema attribute: ${key}`);
				if (isFunctionKeys.has(key)) return (value: any) => ((schema[key] = value), receiver);
				if (key === 'nonRequired') return { ...schema };
				if (key === 'required') return { ...schema, required: true };
				schema[key] = true;
				return receiver;
			}
		}) as Builder;
	};
};

const isFunctionKeys = new Set([
	'default',
	'enum',
	'max',
	'maxlength',
	'min',
	'minlength'
]);
