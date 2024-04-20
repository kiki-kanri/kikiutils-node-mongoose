import type { SchemaTypeOptions } from 'mongoose';

export type MongooseStringSchemaAttribute = 'lowercase' | 'private' | 'required' | 'short' | 'trim' | 'unique' | 'uppercase';

export interface MongooseStringSchema<T extends MongooseStringSchemaAttribute[]> extends SchemaTypeOptions<string> {
	lowercase: 'lowercase' extends T[number] ? boolean : SchemaTypeOptions<string>['lowercase'];
	maxlength: 'short' extends T[number] ? number : SchemaTypeOptions<string>['maxlength'];
	private: 'private' extends T[number] ? true : boolean | undefined;
	required: 'required' extends T[number] ? true : SchemaTypeOptions<string>['required'];
	trim: 'trim' extends T[number] ? true : SchemaTypeOptions<string>['trim'];
	unique: 'unique' extends T[number] ? true : SchemaTypeOptions<string>['unique'];
	uppercase: 'uppercase' extends T[number] ? boolean : SchemaTypeOptions<string>['uppercase'];
}
