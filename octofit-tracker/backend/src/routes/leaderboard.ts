import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user', 'name email')
      .sort({ rank: 1 })
      .lean();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch leaderboard', error });
  }
});

export default leaderboardRouter;
