import type { DefaultType, StringSchemaDefinition } from 'mongoose';
import net from 'net';

import { createBaseSchemaBuilderFactory } from './base';
import type { Readonlyable } from '../types/utils';

export type ExtendStringSchemaBuilder<Props extends { type: StringSchemaDefinition }, ExtraOmitFields extends string> = Omit<StringSchemaBuilder<Props, ExtraOmitFields>, ExtraOmitFields | keyof Props>;
type IPSchema<T extends string> = { trim: true; validate: { message: T; validator: (value: string) => boolean } };

export interface StringSchemaBuilder<Props extends { type: StringSchemaDefinition } = { type: StringSchemaDefinition }, ExtraOmitFields extends string = never> {
	default: <T extends DefaultType<D> | ((this: any, doc: any) => DefaultType<D>) | null, D extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { default: T })]: (Props & { default: T })[key] }, ExtraOmitFields>;
	enum: <
		T extends
			| Readonlyable<Array<S | null>>
			| {
					message?: M;
					values: Readonlyable<Array<S | null>>;
			  }
			| { [path: string]: S | null },
		M extends string,
		S extends string
	>(
		value: T
	) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { enum: T })]: (Props & { enum: T })[key] }, ExtraOmitFields>;

	/**
	 * Adds IPv4 validation to the string schema.
	 * Ensures the string is a valid IPv4 address and trims the input. The validation message can be customized.
	 *
	 * @param message - The custom error message to return if validation fails. Defaults to a standard IPv4 validation message.
	 *
	 * @returns A schema builder with IPv4 validation and the `trim` option enabled.
	 */
	ipv4: <T extends string = typeof defaultIPv4ValidateMessage>(message?: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & IPSchema<T>)]: (Props & IPSchema<T>)[key] }, ExtraOmitFields | 'ipv4' | 'ipv6'>;

	/**
	 * Adds IPv6 validation to the string schema.
	 * Ensures the string is a valid IPv6 address and trims the input. The validation message can be customized.
	 *
	 * @param message - The custom error message to return if validation fails. Defaults to a standard IPv6 validation message.
	 *
	 * @returns A schema builder with IPv6 validation and the `trim` option enabled.
	 */
	ipv6: <T extends string = typeof defaultIPv6ValidateMessage>(message?: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & IPSchema<T>)]: (Props & IPSchema<T>)[key] }, ExtraOmitFields | 'ipv4' | 'ipv6'>;

	/**
	 * Sets both the maximum and minimum length of the string.
	 * This method ensures the string length is exactly or within a specified range.
	 *
	 * @param value - A number representing the exact length or an array specifying [minimum, maximum] length.
	 *
	 * @returns A schema builder with both `maxlength` and `minlength` options applied.
	 */
	length: <T extends L | Readonlyable<[L, S]>, L extends number, S extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { maxlength: T; minlength: T })]: (Props & { maxlength: T; minlength: T })[key] }, ExtraOmitFields>;
	lowercase: ExtendStringSchemaBuilder<{ [key in keyof (Props & { lowercase: true })]: (Props & { lowercase: true })[key] }, ExtraOmitFields>;
	maxlength: <T extends L | Readonlyable<[L, S]>, L extends number, S extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { maxlength: T })]: (Props & { maxlength: T })[key] }, ExtraOmitFields>;
	minlength: <T extends L | Readonlyable<[L, S]>, L extends number, S extends string>(value: T) => ExtendStringSchemaBuilder<{ [key in keyof (Props & { minlength: T })]: (Props & { minlength: T })[key] }, ExtraOmitFields>;
	nonRequired: { [key in keyof Props]: Props[key] };
	private: ExtendStringSchemaBuilder<{ [key in keyof (Props & { private: true })]: (Props & { private: true })[key] }, ExtraOmitFields>;
	required: { [key in keyof (Props & { required: true })]: (Props & { required: true })[key] };
	sparse: ExtendStringSchemaBuilder<{ [key in keyof (Props & { sparse: true })]: (Props & { sparse: true })[key] }, ExtraOmitFields>;
	text: ExtendStringSchemaBuilder<{ [key in keyof (Props & { text: true })]: (Props & { text: true })[key] }, ExtraOmitFields>;
	trim: ExtendStringSchemaBuilder<{ [key in keyof (Props & { trim: true })]: (Props & { trim: true })[key] }, ExtraOmitFields>;
	unique: ExtendStringSchemaBuilder<{ [key in keyof (Props & { unique: true })]: (Props & { unique: true })[key] }, ExtraOmitFields>;
	uppercase: ExtendStringSchemaBuilder<{ [key in keyof (Props & { uppercase: true })]: (Props & { uppercase: true })[key] }, ExtraOmitFields>;
}

const baseBuilderFactory = createBaseSchemaBuilderFactory(String);
const defaultIPv4ValidateMessage = '`{VALUE}` is not a valid IPv4 address for path `{PATH}`.';
const defaultIPv6ValidateMessage = '`{VALUE}` is not a valid IPv6 address for path `{PATH}`.';
export const stringSchemaBuilder = () => {
	const schema: Record<string, any> = {};
	const baseBuilder = baseBuilderFactory(schema);
	return new Proxy(baseBuilder, {
		get(target, key, receiver) {
			if (key === 'ipv4') {
				return (message: string = defaultIPv4ValidateMessage) => {
					schema.trim = true;
					schema.validate = { message, validator: (value: string) => net.isIPv4(value) };
					return receiver;
				};
			}

			if (key === 'ipv6') {
				return (message: string = defaultIPv6ValidateMessage) => {
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
