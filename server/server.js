const Fastify = require('fastify')
const mongoose = require('mongoose')
require('dotenv').config()

const server = Fastify({
  logger: true,
});

server.get('/ping', async (req, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('✅ MongoDB Atlas підключено');

    await server.listen({ port: 3000});
    console.log('Сервер запущено на http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();