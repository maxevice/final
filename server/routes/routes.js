const { handleRegister } = require('../controllers/user_controller');
const { registerSchema } = require('../schemas/user.schema');

const userRoutes = async (fastify, opts) => {
  fastify.post('/register', { schema: registerSchema }, handleRegister);
};

module.exports = userRoutes;
