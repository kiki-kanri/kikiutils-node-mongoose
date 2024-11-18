/** @type {import('jest').Config} */
module.exports = {
	testEnvironment: 'node',
	transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }] },
};
