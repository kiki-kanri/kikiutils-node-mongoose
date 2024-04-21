interface _BaseMongooseModelData<CreatedAtField extends boolean = true, UpdatedAtField extends boolean = true> extends _WithTimestampFieldsData<CreatedAtField, UpdatedAtField> {
	id: string;
}

interface _WithTimestampFieldsData<CreatedAt extends boolean = true, UpdatedAt extends boolean = true> {
	createdAt: CreatedAt extends true ? string : never;
	updatedAt: UpdatedAt extends true ? string : never;
}

type OmitNever<T> = { [P in keyof T as T[P] extends never ? never : P]: T[P] };

declare global {
	type BaseMongooseModelData<CreatedAtField extends boolean = true, UpdatedAtField extends boolean = true> = OmitNever<_BaseMongooseModelData<CreatedAtField, UpdatedAtField>>;
	type OmitMongooseTimestampAndOtherFields<T, OT extends number | symbol | string = ''> = Omit<T, 'createdAt' | 'updatedAt' | OT>;
	type WithMongooseTimestampFieldsData<CreatedAt extends boolean = true, UpdatedAt extends boolean = true> = OmitNever<_WithTimestampFieldsData<CreatedAt, UpdatedAt>>;
}

export {};
