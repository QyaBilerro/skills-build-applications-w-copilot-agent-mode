import { Document, Model, Schema, model, models } from 'mongoose';

export interface IActivity extends Document {
  user: Schema.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  performedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number },
    caloriesBurned: { type: Number, required: true },
    performedAt: { type: Date, required: true }
  },
  { timestamps: true }
);

const Activity: Model<IActivity> = models.Activity || model<IActivity>('Activity', activitySchema);

export default Activity;
