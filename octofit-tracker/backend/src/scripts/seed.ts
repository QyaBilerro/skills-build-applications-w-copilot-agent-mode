import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectToDatabase } from '../config/db';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

dotenv.config();

async function seed(): Promise<void> {
  // Seed the octofit_db database with test data
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({})
  ]);

  const teams = await Team.insertMany([
    { name: 'Madrid Striders', city: 'Madrid', focus: '5K speed sessions', members: [] },
    { name: 'Valencia Pulse', city: 'Valencia', focus: 'Cross-training and endurance', members: [] }
  ]);
  const [teamMadrid, teamValencia] = teams;

  const users = await User.insertMany([
    {
      name: 'Lucia Moreno',
      email: 'lucia.moreno@octofit.test',
      fitnessLevel: 'intermediate',
      age: 29,
      weeklyGoal: 'Run 20 km this week',
      team: teamMadrid._id
    },
    {
      name: 'Carlos Vega',
      email: 'carlos.vega@octofit.test',
      fitnessLevel: 'advanced',
      age: 34,
      weeklyGoal: 'Complete 4 HIIT sessions',
      team: teamMadrid._id
    },
    {
      name: 'Marta Gil',
      email: 'marta.gil@octofit.test',
      fitnessLevel: 'beginner',
      age: 26,
      weeklyGoal: 'Train 3 days consistently',
      team: teamValencia._id
    }
  ]);

  await Promise.all([
    Team.findByIdAndUpdate(teamMadrid._id, { $set: { members: [users[0]._id, users[1]._id] } }),
    Team.findByIdAndUpdate(teamValencia._id, { $set: { members: [users[2]._id] } })
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      type: 'Running',
      durationMinutes: 42,
      distanceKm: 8.1,
      caloriesBurned: 520,
      performedAt: new Date('2026-06-01T07:30:00Z')
    },
    {
      user: users[1]._id,
      type: 'HIIT',
      durationMinutes: 35,
      caloriesBurned: 610,
      performedAt: new Date('2026-06-01T18:15:00Z')
    },
    {
      user: users[2]._id,
      type: 'Cycling',
      durationMinutes: 50,
      distanceKm: 16.2,
      caloriesBurned: 470,
      performedAt: new Date('2026-05-31T09:00:00Z')
    }
  ]);

  await Leaderboard.insertMany([
    { user: users[1]._id, points: 1920, rank: 1, streakDays: 12 },
    { user: users[0]._id, points: 1710, rank: 2, streakDays: 9 },
    { user: users[2]._id, points: 1180, rank: 3, streakDays: 5 }
  ]);

  await Workout.insertMany([
    {
      user: users[0]._id,
      title: 'Tempo Run + Core',
      category: 'Cardio',
      difficulty: 'medium',
      durationMinutes: 55,
      exercises: ['10 min warm-up jog', '25 min tempo run', '3x plank 45 sec', '5 min cooldown']
    },
    {
      user: users[1]._id,
      title: 'Power HIIT Circuit',
      category: 'HIIT',
      difficulty: 'hard',
      durationMinutes: 40,
      exercises: ['Burpees', 'Kettlebell swings', 'Mountain climbers', 'Jump squats']
    },
    {
      user: users[2]._id,
      title: 'Starter Full Body',
      category: 'Strength',
      difficulty: 'easy',
      durationMinutes: 30,
      exercises: ['Bodyweight squats', 'Push-ups on knees', 'Glute bridges', 'Dead bug']
    }
  ]);

  console.log('Seeding complete: users, teams, activities, leaderboard, workouts.');
  await mongoose.connection.close();
}

seed().catch(async (error) => {
  console.error('Seed failed:', error);
  await mongoose.connection.close();
  process.exit(1);
});
