const { handleRegister, handleLogin } = require('../controllers/user_controller');
const { registerSchema } = require('../schemas/user.schema');

const userRoutes = async (fastify, opts) => {
  fastify.post('/register', { schema: registerSchema }, handleRegister);
  fastify.post('/login', {schema: registerSchema}, handleLogin)
};

module.exports = userRoutes;
