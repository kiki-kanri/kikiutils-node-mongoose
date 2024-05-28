# @kikiutils/mongoose

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

For mongoose v8 types and utils.

- [✨ Release Notes](/CHANGELOG.md)

## Features

- Enhanced `toJSON` method with normalization functions:
  - Auto-converts `_id` to `id`
  - Removes `private` fields from the JSON output (if using the normalize plugin)
  - Converts `Decimal128` fields to strings
  - Removes `__v` version key
- Commonly used schema settings for fast schema creation with `createCommonMongooseSchemas`.
- Automatic timestamp field settings based on configuration.
- Pre-registered `mongoose-paginate-v2` and `mongoose-aggregate-paginate-v2` plugins for pagination support.
- Automatic Decimal128 field conversion and rounding configuration.
- TypeScript support for better type safety and IntelliSense.
- Flexible model creation with `buildMongooseModel`, supporting custom connections and plugin configurations.

## Installation

```bash
# Using pnpm
pnpm add @kikiutils/mongoose

# Using yarn
yarn add @kikiutils/mongoose

# Using npm
npm i @kikiutils/mongoose
```

## Environmental Requirements

- ESM only
- Mongoose v8
- NodeJS 18 or higher

## Usage

Example code is provided in the examples folder. Follow the steps below to understand how to use the package:

1. Navigate to the examples folder

```bash
cd examples
```

2. Install the dependencies

```bash
pnpm i
```

3. Copy the .env.example file to .env

```bash
cp .env.example .env
```

4. Set the MONGODB_URI in the .env file with your MongoDB connection string.
5. Run the example code

- If you use bun, run this command directly
  ```bash
  bun --watch run ./src/index.ts
  ```

- Use node
  ```bash
  pnpm run build
  MONGODB_URI="mongodb://127.0.0.1:27017/kikiutils-mongoose-test?directConnection=true" node ./dist/index.mjs
  ```

This will execute the example code and demonstrate how to use the @kikiutils/mongoose package with your MongoDB setup.

You can modify the code in examples/src/index.ts and run it to test other functions.

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@kikiutils/mongoose/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@kikiutils/mongoose

[npm-downloads-src]: https://img.shields.io/npm/dm/@kikiutils/mongoose.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@kikiutils/mongoose

[license-src]: https://img.shields.io/npm/l/@kikiutils/mongoose.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@kikiutils/mongoose
