import { Document, Model, Schema, model, models } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  city: string;
  focus: string;
  members: Schema.Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    focus: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const Team: Model<ITeam> = models.Team || model<ITeam>('Team', teamSchema);

export default Team;
