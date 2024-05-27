export interface UserData extends BaseMongooseModelData {
	account: string;
	balance: string;
	email?: string;
	enabled: boolean;
	group?: Pick<UserGroupData, 'id' | 'name'>;
	name: string;
	password?: string;
}

export interface UserGroupData extends BaseMongooseModelData {
	name: string;
	userCount?: number;
}

export interface UserLogData extends BaseMongooseModelData<true, false> {
	fingerprint?: string;
	ip?: string;
	text?: string;
	type: number;
	user: Pick<UserData, 'account' | 'id'>;
}
