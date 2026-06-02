import { Document, Model, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  age: number;
  weeklyGoal: string;
  team?: Schema.Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    age: { type: Number, required: true },
    weeklyGoal: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
);

const User: Model<IUser> = models.User || model<IUser>('User', userSchema);

export default User;
