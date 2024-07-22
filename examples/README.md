# Examples

This folder contains examples to demonstrate the usage of the `@kikiutils/mongoose` package.

## Getting Started

### Environment Requirements

- Node.js version 18 or higher

### Install Dependencies

To install the necessary dependencies, run the following command:

```bash
pnpm i
```

You can also use yarn, npm, or bun to install the dependencies.

## Example Usage

Refer to [`./src/index.ts`](./src/index.ts) and other files for example usage.

To extend the model (instance methods, statics, or virtuals), refer to [`./src/models/user/index.ts`](./src/models/user/index.ts) and the [Mongoose documentation](https://mongoosejs.com/docs/guide.html).

### Running the Examples

Copy `.env.example` file to `.env` and modify the `MONGODB_URI` value inside.

To run the project in development mode:

```bash
pnpm run dev
```

You can freely modify [`./src/index.ts`](./src/index.ts) and other files to test.
