/* eslint-disable no-console */

import { setCustomMongooseOptions } from '@kikiutils/mongoose/options';
import s from '@kikiutils/mongoose/schema-builders';
import type {} from '@kikiutils/mongoose/types';
import type {} from '@kikiutils/mongoose/types/data';
import { buildMongooseModel } from '@kikiutils/mongoose/utils';
import { Schema } from 'mongoose';
import type {
    ProjectionType,
    QueryOptions,
    Types,
} from 'mongoose';
import type { Except } from 'type-fest';

/**
 * Set mongodb uri env.
 *
 * This is just an automatic default if you don't copy .env.example into .env,
 * the actual project shouldn't have this line
 * (unless you want to handle it the same way as the default).
 */
process.env.MONGODB_URI ||= 'mongodb://127.0.0.1:27017/kikiutils-mongoose-example?directConnection=true';

/**
 * Set custom mongoose options.
 *
 * If you want to unify the processing of schema before model build,
 * you can use this method to set it.
 *
 * Please make sure to set it before using buildMongooseModel,
 * as it will not affect models that have already been built before setting it.
 */
setCustomMongooseOptions('beforeModelBuild', (_schema) => {
    // console.log('building model with schema: ', schema);
});

/*
 * Define data interface.
 *
 * This is the type of data on the front-end or elsewhere,
 * usually populated and after calling toJSON,
 * so the date field type is a string and the password is optional.
 *
 * If you don't need to distinguish between the two interfaces,
 * you can use BaseMongooseDocType<{}> like the User interface below.
 *
 * BaseMongooseModelData accepts two boolean type parameters,
 * the first controls the existence of the createdAt field and
 * the second controls the updatedAt field.
 */
interface UserData extends BaseMongooseModelData {
    account: string;
    // To avoid precision issues use strings (Decimal128)
    balance: string;
    email?: string;
    enabled: boolean;
    // Date Fields toJSON followed by String
    loginAt?: string;
    // Passwords will not be exported in toJSON (the schema uses the private setting)
    password?: string;
}

/*
 * Define document and model interfaces and types.
 *
 * The second type parameter of BaseMongooseDocType
 * controls the existence of the createdAt field
 * and the third controls the updatedAt field.
 */
interface User extends BaseMongooseDocType<Except<UserData, 'loginAt'>> {
    // Correctly set the type in the document state
    loginAt?: Date;
}

interface UserMethodsAndOverrides {
    // Correctly set the type in the document state
    password: string;
    // Document methods
    verifyPassword: (password: string) => boolean;
}

interface UserModel extends BaseMongoosePaginateModel<User, UserMethodsAndOverrides> {
    // Model static methods
    findByAccount: (
        account: string,
        projection?: null | ProjectionType<User>,
        options?: null | QueryOptions<User>
    ) => MongooseFindOneReturnType<
        User,
        UserDocument,
        object,
        UserMethodsAndOverrides
    >;
}

export type UserDocument = MongooseHydratedDocument<User, UserMethodsAndOverrides>;

// Define schema
const userSchema = new Schema<User, UserModel, UserMethodsAndOverrides>({
    account: s.string().maxlength(16).trim.unique.required,
    // @ts-expect-error Ignore this error.
    // Use setRoundAndToFixedSetter to round up on save and setToStringGetter to convert to string on get
    balance: s.decimal128().setRoundAndToFixedSetter().setToStringGetter.required,
    email: s.string().lowercase.trim.nonRequired,
    enabled: s.boolean().default(false).required,
    password: s.string().private.required,
});

// Set methods
userSchema.method<UserDocument>('verifyPassword', function (password: string) {
    return password === this.password;
});

// Set static methods
userSchema.static(
    'findByAccount',
    function (account: string, projection?: null | ProjectionType<User>, options?: null | QueryOptions<User>) {
        return this.findOne({ account }, projection, options);
    },
);

// Build model
const UserModel = buildMongooseModel<User, UserModel, UserMethodsAndOverrides>('user.users', 'User', userSchema);

// Create document
console.log('creating user');
const userAccount = Array.from(
    { length: 8 },
    () => String.fromCharCode((Math.random() > 0.5 ? 97 : 65) + Math.floor(Math.random() * 26)),
).join('');

const user = await UserModel.create({
    account: userAccount,
    balance: '1000.501',
    email: 'example@example.com',
    password: 'test-password',
});

console.log('created user: ', user);
console.log('created user (with toJSON): ', user.toJSON());

// Modify balance
console.log('increasing user balance');
await user.updateOne({ $inc: { balance: '100.105416' } });
console.log('increased user balance: ', (await UserModel.findById(user._id))?.balance);

// Verify password
console.log('verifying user password');
console.log('verified user password: ', user.verifyPassword('test-password'));

// Define user log data interface
export interface UserLogData extends BaseMongooseModelData<true, false> {
    content: string;
    type: number;
    user: Partial<UserData>;
}

// Define document and model interfaces and types
interface UserLog extends BaseMongooseDocType<Except<UserLogData, 'user'>, true, false> {
    user: Types.Decimal128;
}

export type UserLogDocument = MongooseHydratedDocument<UserLog>;
export type UserLogModel = BaseMongoosePaginateModel<UserLog>;

// Define schema
const userLogSchema = new Schema<UserLog, UserLogModel>({
    content: s.string().trim.required,
    type: s.number().required,
    user: s.ref('User').required,
});

// Build model
const UserLogModel = buildMongooseModel<UserLog, UserLogModel>('user.logs', 'UserLog', userLogSchema);

// Create document
console.log('creating user log');
const userLog = await UserLogModel.create({
    content: 'test content',
    type: 1,
    user: user._id,
});

console.log('created user log: ', userLog);
console.log('created user log (with toJSON): ', userLog.toJSON());
console.log('user log with populated user', await userLog.populate('user'));
