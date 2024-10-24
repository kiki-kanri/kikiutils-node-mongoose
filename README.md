# @kikiutils/mongoose

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

A Mongoose plugin for enhanced JSON normalization and common schema creation, with built-in support for pagination and automatic Decimal128 conversion.

- [✨ Release Notes](./CHANGELOG.md)

## Features

- ✨ Flexible Connections: Choose to use a specific connection or fall back to a default connection, with an automatic creation of a connection if none is provided
- ✨ Plugin Integration: Automatically integrates `mongoose-aggregate-paginate-v2`, `mongoose-paginate-v2`, and a custom normalization plugin for enhanced JSON output
- 🛠 Predefined Schemas: Provides a set of commonly used schema definitions such as boolean, decimal128, number, objectId, and string
- 🛠 Customizable: Allows for custom schemas and settings, including automatic rounding and fixed decimal places for `Decimal128` fields
- 🔄 Enhanced JSON Output: Adds an `id` field, removes `_id` and `__v` fields, excludes private fields, and converts `Decimal128` fields to strings in JSON output
- 🧩 Reference Schema Creation: Easily create schema definitions for ObjectId references with attributes like `private`, `required`, and `unique`
- 🧩 String Schema Creation: Generate string schema definitions with attributes such as `private`, `required`, `short`, `trim`, and `unique`
- 🧩 Decimal128 Field Conversion: Set up getters to convert `Decimal128` fields to strings for easier handling in documents
- 🧩 Document Conversion: Convert documents or ObjectIds to documents using specified models, with optional field selection

## Environment Requirements

- Mongoose version 8.x
- Node.js version 18 or higher

## Installation

Add dependency (example using pnpm).

```bash
pnpm add @kikiutils/mongoose
```

You can also use yarn, npm, or bun to add the dependency.

That's it! You're ready to use this package in your project. Check out the [usage instructions](#usage) below ✨.

# Usage

Please refer to the [examples](./examples/README.md) folder for usage instructions of this package.

## License

[MIT License](./LICENSE)

<!-- Badges -->
[npm-version-href]: https://npmjs.com/package/@kikiutils/mongoose
[npm-version-src]: https://img.shields.io/npm/v/@kikiutils/mongoose/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/@kikiutils/mongoose
[npm-downloads-src]: https://img.shields.io/npm/dm/@kikiutils/mongoose.svg?style=flat&colorA=18181B&colorB=28CF8D

[codecov-href]: https://codecov.io/github/kiki-kanri/kikiutils-node-mongoose
[codecov-src]: https://codecov.io/github/kiki-kanri/kikiutils-node-mongoose/graph/badge.svg?token=GRSQ7JO39E

[license-href]: https://github.com/kiki-kanri/kikiutils-node-mongoose/blob/main/LICENSE
[license-src]: https://img.shields.io/npm/l/@kikiutils/mongoose.svg?style=flat&colorA=18181B&colorB=28CF8D
