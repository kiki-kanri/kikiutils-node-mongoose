import { Schema } from 'mongoose';
import type { Types } from 'mongoose';

import { commonMongooseSchemas } from '../../constants/mongoose';
import type { UserLogData } from '../../types/data/user';
import { buildMongooseModel } from '../../utils/mongoose';

export type UserLogDocument = MongooseHydratedDocument<UserLog>;
type UserLogModel = BaseMongoosePaginateModel<UserLog>;

export interface UserLog extends BaseMongooseDocType<Omit<UserLogData, 'user'>, true, false> {
	user: Types.ObjectId;
}

const userLogSchema = new Schema<UserLog, UserLogModel>({
	fingerprint: { ...commonMongooseSchemas.string.trimmed.nonRequired, index: 1 },
	ip: { ...commonMongooseSchemas.string.trimmed.nonRequired, index: 1 },
	text: commonMongooseSchemas.string.trimmed.nonRequired,
	type: { ...commonMongooseSchemas.number.required, index: 1 },
	user: { ...commonMongooseSchemas.ref.user.required, index: 1 }
});

userLogSchema.index({ createdAt: 1 });
export const UserLogModel = buildMongooseModel<UserLog, UserLogModel>('user_logs', 'UserLog', userLogSchema, { timestamps: { createdAt: true, updatedAt: false } });
