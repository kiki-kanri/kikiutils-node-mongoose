import { Schema } from 'mongoose';

import { commonMongooseSchemas } from '../../constants/mongoose';
import type { UserGroupData } from '../../types/data/user';
import { buildMongooseModel } from '../../utils/mongoose';

export type UserGroup = BaseMongooseDocType<UserGroupData>;
export type UserGroupDocument = MongooseHydratedDocument<UserGroup>;
type UserGroupModel = BaseMongoosePaginateModel<UserGroup>;

const userGroupSchema = new Schema<UserGroup, UserGroupModel>({ name: commonMongooseSchemas.string.short.trimmed.unique.required });
userGroupSchema.virtual('userCount', {
	count: true,
	foreignField: 'group',
	localField: '_id',
	ref: 'User'
});

export const UserGroupModel = buildMongooseModel<UserGroup, UserGroupModel>('user_groups', 'UserGroup', userGroupSchema);
