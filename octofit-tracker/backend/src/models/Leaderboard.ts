import { Document, Model, Schema, model, models } from 'mongoose';

export interface ILeaderboard extends Document {
  user: Schema.Types.ObjectId;
  points: number;
  rank: number;
  streakDays: number;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    streakDays: { type: Number, required: true }
  },
  { timestamps: true }
);

const Leaderboard: Model<ILeaderboard> = models.Leaderboard || model<ILeaderboard>('Leaderboard', leaderboardSchema);

export default Leaderboard;
