import { setupDecimal128FieldsToStringGetter } from '@kikiutils/mongoose/utils';
import { Schema } from 'mongoose';
import type { FilterQuery, mongo, MongooseQueryOptions, Query, QueryOptions, QueryWithHelpers, Types, UpdateWriteOpResult } from 'mongoose';

import { commonMongooseSchemas } from '../../constants/mongoose';
import type { UserData } from '../../types/data/user';
import { buildMongooseModel } from '../../utils/mongoose';

export * from './group';
export * from './log';

type StaticModifyBalanceOptions = (mongo.UpdateOptions & Omit<MongooseQueryOptions<User>, 'lean'>) | null;
export type UserDocument = MongooseHydratedDocument<User, UserMethodsAndOverrides>;
type UserDocumentOrObjectId = MongooseDocumentOrObjectId<UserDocument>;

export interface User extends BaseMongooseDocType<Omit<UserData, 'group'>> {
	group?: Types.ObjectId;
}

// Use overrides to set the password field not to be optional in the document.
interface UserMethodsAndOverrides {
	modifyBalance: (amount: number | string, options?: Nullable<QueryOptions>) => Query<any, UserDocument>;
	password: string;
}

interface UserModel extends BaseMongoosePaginateModel<User, UserMethodsAndOverrides> {
	modifyBalance(user: UserDocumentOrObjectId, amount: number | string, options?: StaticModifyBalanceOptions, filterQuery?: FilterQuery<User>): QueryWithHelpers<UpdateWriteOpResult, UserDocument, {}, User, 'updateOne'>;
}

const userSchema = new Schema<User, UserModel, UserMethodsAndOverrides>(
	{
		account: commonMongooseSchemas.string.short.trimmed.unique.required,
		// @ts-ignore
		balance: { ...commonMongooseSchemas.decimal128.autoRoundAndToFixed.required, default: '0' },
		email: { ...commonMongooseSchemas.string.trimmed.nonRequired, lowercase: true },
		enabled: commonMongooseSchemas.boolean.defaultTrue.required,
		group: commonMongooseSchemas.ref.userGroup.nonRequired,
		name: commonMongooseSchemas.string.trimmed.required,
		password: commonMongooseSchemas.string.private.trimmed.required
	},
	{
		statics: {
			modifyBalance(user: UserDocumentOrObjectId, amount: string, options?: StaticModifyBalanceOptions, filterQuery?: FilterQuery<User>) {
				const _id = typeof user === 'string' ? user : user._id.toHexString();
				return this.updateOne({ ...filterQuery, _id }, { $inc: { balance: amount.toString() } }, options);
			}
		}
	}
);

userSchema.method('modifyBalance', function (amount: number | string, options?: Nullable<QueryOptions>) {
	return this.updateOne({ $inc: { balance: amount.toString() } }, options);
});

setupDecimal128FieldsToStringGetter(userSchema, 'balance');
export const UserModel = buildMongooseModel<User, UserModel, UserMethodsAndOverrides>('users', 'User', userSchema);
