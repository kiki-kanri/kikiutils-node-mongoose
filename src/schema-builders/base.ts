import net from 'net';

export const createSchemaBuilder = <Builder>(type: BooleanConstructor | DateConstructor | NumberConstructor | StringConstructor) => {
	return () => {
		const schema: Record<string, any> = { type };
		return new Proxy(Object.freeze({}), {
			get(_, key, receiver) {
				// Base
				if (typeof key === 'symbol') throw new Error('Cannot use symbol as a schema attribute');
				if (key in schema) throw new Error(`Duplicate schema attribute: ${key}`);
				if (isFunctionKeys.has(key)) return (value: any) => ((schema[key] = value), receiver);
				if (key === 'length') return (value: any) => ((schema['maxlength'] = schema['minlength'] = value), receiver);
				if (key === 'nonRequired') return schema;
				if (key === 'required') return { ...schema, required: true };

				// IP
				if (key === 'ipv4') {
					return (message: string = '`{VALUE}` is not a valid IPv4 address for path `{PATH}`.') => {
						schema.trim = true;
						schema.validate = { message, validator: (value: string) => net.isIPv4(value) };
						return receiver;
					};
				}

				if (key === 'ipv6') {
					return (message: string = '`{VALUE}` is not a valid IPv6 address for path `{PATH}`.') => {
						schema.trim = true;
						schema.validate = { message, validator: (value: string) => net.isIPv6(value) };
						return receiver;
					};
				}

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
