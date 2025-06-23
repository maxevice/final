const Habit = require("../models/Habit_model");

const createHabit = async (req, reply) => {
  const title = req.body.title;
  const userId = req.user.id;
  const exists = await Habit.findOne({ title, owner: userId });
  if (exists) {
    return reply.code(400).send({ error: "Звичка з такою назвою вже існує" });
  }
  const newHabit = await Habit.create({
    title,
    owner: userId,
  });

  reply.code(201).send(newHabit);
};

const getHabits = async (req, reply) => {
  const userId = req.user.id;

  const habits = await Habit.find({ owner: userId }).sort({ createdAt: -1 });

  reply.send(habits);
};

const toggleHabitStatus = async (req, reply) => {
  const id  = req.params.id;
  const done = req.body.done;
  const updated = await Habit.findOneAndUpdate(
    { _id: id, owner: req.user.id },
    { done },
    { new: true }
  );
  if (!updated) return reply.code(404).send({ error: "Звичку не знайдено" });
  reply.send(updated);
};

const deleteHabit = async (req, reply) => {
  const id = req.params.id;
  const userId = req.user.id;

  const habit = await Habit.findOneAndDelete({ _id: id, owner: userId });

  if (!habit) {
    return reply.code(404).send({ error: 'Звичку не знайдено' });
  }

  reply.send({ message: 'Звичку успішно видалено' });
};

module.exports = {
  getHabits,
  createHabit,
  toggleHabitStatus,
  deleteHabit
};
