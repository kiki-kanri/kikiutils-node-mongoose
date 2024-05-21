interface _BaseMongooseModelData<CreatedAtField extends boolean = true, UpdatedAtField extends boolean = true> extends _WithTimestampFieldsData<CreatedAtField, UpdatedAtField> {
	id: string;
}

interface _WithTimestampFieldsData<CreatedAt extends boolean = true, UpdatedAt extends boolean = true> {
	createdAt: CreatedAt extends true ? string : never;
	updatedAt: UpdatedAt extends true ? string : never;
}

type OmitNever<T> = { [P in keyof T as T[P] extends never ? never : P]: T[P] };

declare global {
	/**
	 * Global type for base mongoose model data.
	 *
	 * @example
	 * interface UserData extends BaseMongooseModelData {
	 *   account: string;
	 *   name: string;
	 * }
	 *
	 * // Resulting type:
	 * // {
	 * //   account: string;
	 * //   createdAt: string;
	 * //   id: string;
	 * //   name: string;
	 * //   updatedAt: string;
	 * // }
	 */
	type BaseMongooseModelData<CreatedAtField extends boolean = true, UpdatedAtField extends boolean = true> = OmitNever<_BaseMongooseModelData<CreatedAtField, UpdatedAtField>>;

	/**
	 * Global type to omit timestamp fields and optionally other fields from a given type.
	 *
	 * @example
	 * interface UserData extends BaseMongooseModelData {
	 *   account: string;
	 *   name: string;
	 * }
	 *
	 * type UserDataWithoutTimestamps = OmitMongooseTimestampAndOtherFields<UserData>;
	 *
	 * // Resulting type:
	 * // {
	 * //   account: string;
	 * //   id: string;
	 * //   name: string;
	 * // }
	 */
	type OmitMongooseTimestampAndOtherFields<T, OT extends number | symbol | string = ''> = Omit<T, 'createdAt' | 'updatedAt' | OT>;

	/**
	 * Global type for handling optional timestamp fields.
	 *
	 * @example
	 * interface UserLogData extends WithMongooseTimestampFieldsData<true, false> {
	 *   content: string;
	 *   type: number;
	 * }
	 *
	 * // Resulting type:
	 * // {
	 * //   content: string;
	 * //   createdAt: string;
	 * //   type: number;
	 * // }
	 * }
	 */
	type WithMongooseTimestampFieldsData<CreatedAt extends boolean = true, UpdatedAt extends boolean = true> = OmitNever<_WithTimestampFieldsData<CreatedAt, UpdatedAt>>;
}

export {};
