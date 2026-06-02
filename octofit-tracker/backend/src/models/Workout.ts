import { Document, Model, Schema, model, models } from 'mongoose';

export interface IWorkout extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    durationMinutes: { type: Number, required: true },
    exercises: [{ type: String, required: true }]
  },
  { timestamps: true }
);

const Workout: Model<IWorkout> = models.Workout || model<IWorkout>('Workout', workoutSchema);

export default Workout;
