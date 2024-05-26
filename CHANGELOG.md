# Changelog

## v1.0.0-rc.3

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v1.0.0-rc.2...v1.0.0-rc.3)

### 🩹 Fixes

- Modify function definition to resolve issues ([44a5b93](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/44a5b93))

### ❤️ Contributors

- kiki-kanri

## v1.0.0-rc.2

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v1.0.0-rc.1...v1.0.0-rc.2)

### 🩹 Fixes

- Correct keyword list in package.json ([005ab15](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/005ab15))

### 💅 Refactors

- Change file location of paginate type definitions ([74d18e4](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/74d18e4))

### 📖 Documentation

- Add comments to functions and types ([9439b01](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/9439b01))
- Edit readme ([940dc84](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/940dc84))
- Update comment for `buildMongooseModel` function ([179da14](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/179da14))

### ❤️ Contributors

- kiki-kanri

## v1.0.0-rc.1

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v1.0.0-rc.0...v1.0.0-rc.1)

### 🚀 Enhancements

- Update `AggregatePaginateModel` interface to support `QueryHelpers` and `InstanceMethodsAndOverrides` ([1cc3e99](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/1cc3e99))
- Extend `BaseMongoosePaginateModel` to include `AggregatePaginateModel` ([a72e682](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/a72e682))

### ❤️ Contributors

- kiki-kanri

## v1.0.0-rc.0

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v0.6.0...v1.0.0-rc.0)

### 🚀 Enhancements

- Add type definitions for mongoose-aggregate-paginate-v2 ([f0b5db3](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/f0b5db3))
- Add mongoose-aggregate-paginate-v2 plugin to mongoose schema ([af4ef3f](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/af4ef3f))

### 💅 Refactors

- Replace all mongoose-paginate-v2 types with custom definitions and rename some types ([608fb46](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/608fb46))
- Remove explicit undefined from mongoose-paginate-v2 type definitions ([31cebf8](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/31cebf8))

### 📖 Documentation

- Add comments to specific types ([faa826c](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/faa826c))
- Edit readme ([9ab49eb](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/9ab49eb))

### 🏡 Chore

- Upgrade dependencies ([7172259](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/7172259))
- Add `mongoose-aggregate-paginate-v2` dependency ([b9c7c55](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/b9c7c55))

### ❤️ Contributors

- kiki-kanri

## v0.6.0

[compare changes](https://github.com/kiki-kanri/kikiutils-node-mongoose/compare/v0.5.0...v0.6.0)

### 🚀 Enhancements

- Add `mongooseDocumentOrObjectIdToDocument` utils ([555b70e](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/555b70e))

### 🏡 Chore

- Copy LICENSE into dist folder during build ([06d4a5e](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/06d4a5e))
- Modify keywords field in package.json ([f69c5ad](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/f69c5ad))
- Upgrade dependencies ([f7476c9](https://github.com/kiki-kanri/kikiutils-node-mongoose/commit/f7476c9))

### ❤️ Contributors

- kiki-kanri

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
