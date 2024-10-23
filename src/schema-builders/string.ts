import type { DefaultType, StringSchemaDefinition } from 'mongoose';
import net from 'net';

import { createBaseSchemaBuilderFactory } from './base';
import type { MaybeReadonly } from '../types/utils';

type ExtendStringSchemaBuilder<Props, ExtraOmitFields extends string> = Omit<StringSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;
type IPSchema<T extends string> = { trim: true; validate: { message: T; validator: (value: string) => boolean } };

export interface StringSchemaBuilder<Props = { type: StringSchemaDefinition }, ExtraOmitFields extends string = never, PropsWithRequired = Props & { required: true }> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }, ExtraOmitFields>;
	enum: <
		T extends
			| MaybeReadonly<Array<S | null>>
			| {
					message?: M;
					values: MaybeReadonly<Array<S | null>>;
			  }
			| { [path: string]: S | null },
		M extends string,
		S extends string
	>(
		value: T
	) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { enum: T })]: (Props & { enum: T })[key] }, ExtraOmitFields>;

	ipv4: <T extends string = '`{VALUE}` is not a valid IPv4 address for path `{PATH}`.'>(message?: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & IPSchema<T>)]: (Props & IPSchema<T>)[key] }, ExtraOmitFields | 'ipv4' | 'ipv6'>;
	ipv6: <T extends string = '`{VALUE}` is not a valid IPv6 address for path `{PATH}`.'>(message?: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & IPSchema<T>)]: (Props & IPSchema<T>)[key] }, ExtraOmitFields | 'ipv4' | 'ipv6'>;
	length: <T extends L | MaybeReadonly<[L, S]>, L extends number, S extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { maxlength: T; minlength: T })]: (Props & { maxlength: T; minlength: T })[key] }, ExtraOmitFields>;
	lowercase: ExtendStringSchemaBuilder<{ [key in keyof (Props & { lowercase: true })]: (Props & { lowercase: true })[key] }, ExtraOmitFields>;
	maxlength: <T extends L | MaybeReadonly<[L, S]>, L extends number, S extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { maxlength: T })]: (Props & { maxlength: T })[key] }, ExtraOmitFields>;
	minlength: <T extends L | MaybeReadonly<[L, S]>, L extends number, S extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { minlength: T })]: (Props & { minlength: T })[key] }, ExtraOmitFields>;
	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendStringSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }, ExtraOmitFields>;
	required: { [key in keyof PropsWithRequired]: PropsWithRequired[key] };
	sparse: ExtendStringSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }, ExtraOmitFields>;
	text: ExtendStringSchemaBuilder<{ [key in keyof (Props & { text: true })]: (Props & { text: true })[key] }, ExtraOmitFields>;
	trim: ExtendStringSchemaBuilder<{ [key in keyof (Props & { trim: true })]: (Props & { trim: true })[key] }, ExtraOmitFields>;
	unique: ExtendStringSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }, ExtraOmitFields>;
	uppercase: ExtendStringSchemaBuilder<{ [key in keyof (Props & { uppercase: true })]: (Props & { uppercase: true })[key] }, ExtraOmitFields>;
}

const baseBuilderFactory = createBaseSchemaBuilderFactory(String);
export const stringSchemaBuilder = () => {
	const baseBuilder = baseBuilderFactory();
	return new Proxy(baseBuilder, {
		get(target, key, receiver) {
			// @ts-expect-error
			const schema = target._schema;
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

			if (key === 'length') return (value: any) => ((schema['maxlength'] = schema['minlength'] = value), receiver);
			return Reflect.get(target, key, receiver);
		}
	}) as StringSchemaBuilder;
};
