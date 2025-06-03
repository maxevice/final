const Habit = require('../models/Habit_model');

const createHabit = async (req, reply) => {
  const { title } = req.body;
  const userId = req.user.id;
  const exists = await Habit.findOne({ title, owner: userId });
  if (exists) {
    return reply.code(400).send({ error: 'Звичка з такою назвою вже існує' });
  }  
  const newHabit = await Habit.create({
    title,
    owner: userId
  });

  reply.code(201).send(newHabit);
};

const getHabits = async (req, reply) => {
  const userId = req.user.id;

  const habits = await Habit.find({ owner: userId }).sort({ createdAt: -1 });

  reply.send(habits);
};


module.exports = {
  getHabits,
  createHabit 
};
