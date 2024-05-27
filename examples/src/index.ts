import { UserGroupModel, UserLogModel, UserModel } from './models';
import type { UserGroupDocument } from './models';

// Create user group
const userGroup = await UserGroupModel.create({ name: 'test' });

// Create user
const user = await UserModel.create({
	account: 'test',
	email: 'test@test.com',
	group: userGroup,
	name: 'test',
	password: 'testpassword'
});

// Create user log
await UserLogModel.create({
	ip: '127.0.0.1',
	text: 'test',
	type: 0,
	user: user
});

// Modify user balance
console.log('modify user balance');
console.log(await user.modifyBalance(900));
console.log();
console.log('modify user balance with filter');
console.log(await UserModel.modifyBalance(user, '-900.25', null, { balance: { $gte: '900.25' } }));
console.log();

// Find user
console.log('find user');
const foundUser = await UserModel.findById(user._id);
console.log(foundUser);
console.log(foundUser?.toJSON());
console.log();

// Populate user
console.log('populate user');
const foundUserPopulated = await UserModel.findById(user._id).populate<{ group: UserGroupDocument }>('group');
console.log(foundUserPopulated);
console.log(foundUserPopulated?.toJSON());
console.log();

// Find user log
console.log('find user log');
const foundUserLog = await UserLogModel.findOne({ user: foundUser });
console.log(foundUserLog);
