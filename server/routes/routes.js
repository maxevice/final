const { handleRegister, handleLogin } = require('../controllers/user_controller');
const { registerSchema } = require('../schemas/user.schema');
const { getHabits, createHabit } = require('../controllers/habit_controller');
const { getHabitsSchema, createHabitSchema } = require('../schemas/habit.schema');
const verifyToken = require('../plugins/auth');

const userRoutes = async (fastify, opts) => {
  fastify.post('/register', { schema: registerSchema }, handleRegister);
  fastify.post('/login', {schema: registerSchema}, handleLogin)
};


const habitRoutes = async (fastify, opts) => {
  fastify.get('/', {
    preHandler: verifyToken,
    schema: getHabitsSchema
  }, getHabits);

  fastify.post('/', {
    preHandler: verifyToken,
    schema: createHabitSchema
  }, createHabit);
};

module.exports = {habitRoutes, userRoutes};


