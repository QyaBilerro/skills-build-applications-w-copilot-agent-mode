import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export async function connectToDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(MONGODB_URI);
}

export { MONGODB_URI };
