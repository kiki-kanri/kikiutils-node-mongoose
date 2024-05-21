# @kikiutils/mongoose

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

For mongoose v8 types and utils.

- [✨ Release Notes](/CHANGELOG.md)

## Features

- Enhanced `toJSON` method with normalization functions, auto-converts `_id` to `id`, and more.
- Commonly used schema settings for fast schema creation.
- Automatic timestamp field settings.
- Pre-registered `mongoose-paginate-v2` and `mongoose-aggregate-paginate-v2` plugins.
- Automatic Decimal128 field conversion and processing.
- TypeScript support.

## Installation

```bash
# Using pnpm
pnpm add @kikiutils/mongoose

# Using yarn
yarn add @kikiutils/mongoose

# Using npm
npm install @kikiutils/mongoose
```

## Environmental Requirements

- ESM only
- Mongoose v8
- NodeJS 18 or higher

**Detailed documentation will be added in future releases.**

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@kikiutils/mongoose/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@kikiutils/mongoose

[npm-downloads-src]: https://img.shields.io/npm/dm/@kikiutils/mongoose.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@kikiutils/mongoose

[license-src]: https://img.shields.io/npm/l/@kikiutils/mongoose.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@kikiutils/mongoose
