import type Decimal from 'decimal.js';
import type { ObjectIdSchemaDefinition, SchemaTypeOptions, StringSchemaDefinition, Types } from 'mongoose';

/**
 * Base attributes for Mongoose schemas.
 *
 * This type defines common attributes that can be applied to any schema field.
 */
export type BaseSchemaAttribute = 'private' | 'required' | 'unique';

/**
 * Additional attributes specific to string schema fields in Mongoose.
 *
 * This type extends the base schema attributes with string-specific attributes
 * like `lowercase`, `short`, `trim`, and `uppercase`.
 */
export type MongooseStringSchemaAttribute = BaseSchemaAttribute | 'lowercase' | 'short' | 'trim' | 'uppercase';

/**
 * Interface for options to create common Mongoose schemas.
 *
 * This interface defines options for creating common Mongoose schemas, including
 * settings for automatic rounding and fixed decimal places for Decimal128 fields.
 */
export interface CreateCommonMongooseSchemasOptions {
	/**
	 * Configuration for automatic rounding and fixed decimal places for Decimal128 fields.
	 */
	autoRoundAndToFixedDecimal128?: {
		/**
		 * Number of decimal places to round to.
		 *
		 * @default 2
		 */
		places?: number;

		/**
		 * Rounding mode to be used.
		 *
		 * @default Decimal.ROUND_DOWN
		 */
		rounding?: Decimal.Rounding;
	};
}

/**
 * Interface for defining a Mongoose ObjectId reference schema field.
 *
 * This interface allows specifying attributes for an ObjectId reference field,
 * including whether the field is private, the reference model name, and standard
 * schema options like `required` and `unique`.
 *
 * @template R - The type of the reference model name.
 * @template T - An array of attributes to apply to the schema field.
 */
export interface MongooseObjectIdRefSchema<R extends string, T extends BaseSchemaAttribute[]> {
	/**
	 * Indicates whether the field is private.
	 *
	 * If the 'private' attribute is included in `T`, this is `true`, otherwise it
	 * can be `boolean` or `undefined`. If using the normalize plugin, fields marked
	 * as private will be automatically excluded from the `toJSON` output.
	 */
	private: 'private' extends T[number] ? true : boolean | undefined;

	/**
	 * The model that `populate()` should use if populating this path.
	 */
	ref: R;

	/**
	 * If true, attach a required validator to this path, which ensures this path
	 * path cannot be set to a nullish value. If a function, Mongoose calls the
	 * function and only checks for nullish values if the function returns a truthy value.
	 */
	required: 'required' extends T[number] ? true : SchemaTypeOptions<Types.ObjectId>['required'];

	/**
	 * The schema type definition for ObjectId.
	 */
	type: ObjectIdSchemaDefinition;

	/**
	 * If [truthy](https://masteringjs.io/tutorials/fundamentals/truthy), Mongoose
	 * will build a unique index on this path when the
	 * model is compiled. [The `unique` option is **not** a validator](/docs/validation.html#the-unique-option-is-not-a-validator).
	 */
	unique: 'unique' extends T[number] ? true : SchemaTypeOptions<Types.ObjectId>['unique'];
}

/**
 * Interface for defining a Mongoose string schema field.
 *
 * This interface allows specifying attributes for a string schema field, including
 * whether the field should be lowercased, trimmed, or uppercased, as well as standard
 * schema options like `required` and `unique`.
 *
 * @template T - An array of attributes to apply to the schema field.
 */
export interface MongooseStringSchema<T extends MongooseStringSchemaAttribute[]> {
	/** If truthy, Mongoose will add a custom setter that lowercases this string using JavaScript's built-in `String#toLowerCase()`. */
	lowercase: 'lowercase' extends T[number] ? boolean : SchemaTypeOptions<string>['lowercase'];

	/**
	 * The maximum length of the string.
	 *
	 * If the 'short' attribute is included in `T`, this is set to 16. Otherwise, it
	 * takes the value from `SchemaTypeOptions<string>['maxlength']`.
	 *
	 * If set, Mongoose will add a custom validator that ensures the given string's `length` is at most the given number.
	 */
	maxlength: 'short' extends T[number] ? 16 : SchemaTypeOptions<string>['maxlength'];

	/**
	 * Indicates whether the field is private.
	 *
	 * If the 'private' attribute is included in `T`, this is `true`, otherwise it
	 * can be `boolean` or `undefined`. If using the normalize plugin, fields marked
	 * as private will be automatically excluded from the `toJSON` output.
	 */
	private: 'private' extends T[number] ? true : boolean | undefined;

	/**
	 * If true, attach a required validator to this path, which ensures this path
	 * path cannot be set to a nullish value. If a function, Mongoose calls the
	 * function and only checks for nullish values if the function returns a truthy value.
	 */
	required: 'required' extends T[number] ? true : SchemaTypeOptions<string>['required'];

	/** If truthy, Mongoose will add a custom setter that removes leading and trailing whitespace using JavaScript's built-in `String#trim()`. */
	trim: 'trim' extends T[number] ? true : SchemaTypeOptions<string>['trim'];

	/**
	 * The schema type definition for string.
	 */
	type: StringSchemaDefinition;

	/**
	 * If [truthy](https://masteringjs.io/tutorials/fundamentals/truthy), Mongoose
	 * will build a unique index on this path when the
	 * model is compiled. [The `unique` option is **not** a validator](/docs/validation.html#the-unique-option-is-not-a-validator).
	 */
	unique: 'unique' extends T[number] ? true : SchemaTypeOptions<string>['unique'];

	/** If truthy, Mongoose will add a custom setter that uppercases this string using JavaScript's built-in `String#toUpperCase()`. */
	uppercase: 'uppercase' extends T[number] ? boolean : SchemaTypeOptions<string>['uppercase'];
}
