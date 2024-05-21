import type Decimal from 'decimal.js';
import type { ObjectIdSchemaDefinition, SchemaTypeOptions, StringSchemaDefinition, Types } from 'mongoose';

export type BaseSchemaAttribute = 'private' | 'required' | 'unique';
export type MongooseStringSchemaAttribute = BaseSchemaAttribute | 'lowercase' | 'short' | 'trim' | 'uppercase';

export interface CreateCommonMongooseSchemasOptions {
	/**
	 * Options for auto-rounding and fixing decimal places for Decimal128 fields.
	 */
	autoRoundAndToFixedDecimal128?: {
		/**
		 * Number of decimal places to round to.
		 *
		 * @default 2
		 */
		places?: number;

		/**
		 * Rounding strategy to use.
		 *
		 * @default Decimal.ROUND_DOWN
		 */
		rounding?: Decimal.Rounding;
	};
}

export interface MongooseObjectIdRefSchema<R extends string, T extends BaseSchemaAttribute[]> {
	private: 'private' extends T[number] ? true : boolean | undefined;
	ref: R;
	required: 'required' extends T[number] ? true : SchemaTypeOptions<Types.ObjectId>['required'];
	type: ObjectIdSchemaDefinition;
	unique: 'unique' extends T[number] ? true : SchemaTypeOptions<Types.ObjectId>['unique'];
}

export interface MongooseStringSchema<T extends MongooseStringSchemaAttribute[]> {
	lowercase: 'lowercase' extends T[number] ? boolean : SchemaTypeOptions<string>['lowercase'];
	maxlength: 'short' extends T[number] ? number : SchemaTypeOptions<string>['maxlength'];
	private: 'private' extends T[number] ? true : boolean | undefined;
	required: 'required' extends T[number] ? true : SchemaTypeOptions<string>['required'];
	trim: 'trim' extends T[number] ? true : SchemaTypeOptions<string>['trim'];
	type: StringSchemaDefinition;
	unique: 'unique' extends T[number] ? true : SchemaTypeOptions<string>['unique'];
	uppercase: 'uppercase' extends T[number] ? boolean : SchemaTypeOptions<string>['uppercase'];
}
