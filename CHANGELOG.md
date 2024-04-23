# Changelog

## v0.5.0

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v0.4.1...v0.5.0)

### 💅 Refactors

- ⚠️ Convert paginate plugin to a universally registered plugin ([2d4a7d6](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/2d4a7d6))
- ⚠️ Remove beforeBuild attribute from options in buildMongooseModel ([1817898](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/1817898))

### 🏡 Chore

- Change declaration method of buildMongooseModel ([3e03996](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/3e03996))

#### ⚠️ Breaking Changes

- ⚠️ Convert paginate plugin to a universally registered plugin ([2d4a7d6](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/2d4a7d6))
- ⚠️ Remove beforeBuild attribute from options in buildMongooseModel ([1817898](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/1817898))

### ❤️ Contributors

- kiki-kanri

## v0.4.1

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v0.4.0...v0.4.1)

### 🩹 Fixes

- Change import method for mongoose functions in utils file to resolve issues ([0bae4b2](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/0bae4b2))

### ❤️ Contributors

- kiki-kanri

## v0.4.0

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v0.3.0...v0.4.0)

### 💅 Refactors

- ⚠️ Modify parameter order and passing method for `setupDecimal128FieldsToStringGetter` utils ([f62d43b](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/f62d43b))

#### ⚠️ Breaking Changes

- ⚠️ Modify parameter order and passing method for `setupDecimal128FieldsToStringGetter` utils ([f62d43b](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/f62d43b))

### ❤️ Contributors

- kiki-kanri

## v0.3.0

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v0.2.1...v0.3.0)

### 🚀 Enhancements

- Add global data utils types ([fd75b2c](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/fd75b2c))

### 🩹 Fixes

- Correct schema type errors ([229ea2c](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/229ea2c))

### 💅 Refactors

- Rename type generic parameter names ([d183367](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/d183367))
- Change default connection creation and usage ([50d05b1](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/50d05b1))

### ❤️ Contributors

- kiki-kanri

## v0.2.1

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v0.2.0...v0.2.1)

### 💅 Refactors

- Switch package to ESM and set 'type' to 'module' in package.json ([9c50dfd](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/9c50dfd))

### ❤️ Contributors

- kiki-kanri

## v0.2.0

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v0.1.1...v0.2.0)

### 🚀 Enhancements

- Add `createMongooseObjectIdRefSchema` utils and related types ([0abd723](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/0abd723))

### ❤️ Contributors

- kiki-kanri

## v0.1.1

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v0.1.0...v0.1.1)

### 🩹 Fixes

- Correct type errors in some cases when using `createCommonMongooseSchemas` ([4b1a7d9](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/4b1a7d9))

### ❤️ Contributors

- kiki-kanri

## v0.1.0

### 🚀 Enhancements

- Add base files ([ff0f343](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/ff0f343))
- Add mongoose dependency ([d9935ea](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/d9935ea))
- Add `createMongooseStringSchema` utils and related types ([16ee7d7](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/16ee7d7))
- Add lodash dependency ([fa38a77](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/fa38a77))
- Add `createCommonMongooseSchemas` utils ([48fa1a8](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/48fa1a8))
- Add `commonMongooseSchemas` constant ([b316b9e](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/b316b9e))
- Add decimal.js dependency ([a09dfce](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/a09dfce))
- Add decimal128 settings to default `commonMongooseSchemas` constant ([a30cdf2](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/a30cdf2))
- Add mongoose-paginate-v2 dependency ([2f1c91e](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/2f1c91e))
- Add `setupDecimal128FieldsToStringGetter` utils ([83cb5a5](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/83cb5a5))
- Add normalize plugin file ([005aca2](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/005aca2))
- Add `defaultMongooseConnection` constant ([07a07bc](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/07a07bc))
- Add utils types ([1743779](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/1743779))
- Add `buildMongooseModel` utils and related types ([295eb0d](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/295eb0d))
- Add additional settings to exports field in package.json ([8a3f8b7](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/8a3f8b7))

### ❤️ Contributors

- kiki-kanri
