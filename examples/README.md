# Examples

This folder contains examples to demonstrate the usage of the `@kikiutils/mongoose` package.

## Getting Started

### Environment Requirements

- MongoDB server 6.x or higher
- Mongoose version 8.x
- Node.js version 18.12.1 or higher

### Install Dependencies

To install the necessary dependencies, run the following command:

```bash
pnpm i
```

Alternatively, you can use yarn, npm, or bun to install the dependencies.

### Example Usage

Refer to [./src/index.ts](./src/index.ts) for example usage.

For extending the model with instance methods, statics, or virtuals, please refer to the [Mongoose documentation](https://mongoosejs.com/docs/guide.html).

### Running the Examples

1. Copy the `.env.example` file to `.env` and update the MONGODB_URI value.

2. To run the project in development mode:
	```bash
	pnpm run dev
	```

Feel free to modify [./src/index.ts](./src/index.ts) to test different functionalities.
