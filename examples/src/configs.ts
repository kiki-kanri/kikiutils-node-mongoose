import { config } from 'dotenv';

config();
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kikiutils-mongoose-example?directConnection=true';
