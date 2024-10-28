# @kikiutils/mongoose

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

A Mongoose plugin for enhanced JSON normalization and common schema creation, with built-in support for pagination and automatic Decimal128 conversion.

- [✨ Release Notes](./CHANGELOG.md)

## Features

- ✨ Flexible Connections: Supports both default and custom connections, automatically creating connections when none are provided
- 🔌 Plugin Integration: Automatically integrates `mongoose-aggregate-paginate-v2`, `mongoose-paginate-v2`, and custom normalization for cleaner JSON outputs
- 🛠 Predefined & Customizable Schemas: Provides common schemas (boolean, date, decimal128, number, objectId, string) with the flexibility to customize attributes such as `private`, `required`, `unique`, `default`, and more
- 🧮 Decimal Precision: Supports `Decimal128` fields with options for automatic rounding and fixed decimal precision
- 🔄 Optimized JSON Output: Adds an `id` field, removes `_id` and `__v`, hides private fields, and converts `Decimal128` fields to strings in JSON responses
- 🔄 Reference Management: Enables easy conversion of ObjectId references to fully populated documents with field selection and population options
- 🔧 Utility Functions: Includes helper functions for converting and normalizing documents, handling ObjectId transformations, and processing schema fields

## Environment Requirements

- Mongoose version 8.x
- Node.js version 18.12.1 or higher

## Installation

Add dependency (example using pnpm).

```bash
pnpm add @kikiutils/mongoose mongoose
```

You can also use yarn, npm, or bun to add the dependency.

That's it! You're ready to use this package in your project. Check out the [usage instructions](#usage) below ✨.

## Usage

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
