const Fastify = require('fastify');
const fastifyStatic = require('@fastify/static');
const mongoose = require('mongoose')
const path = require('path');
require('dotenv').config()

const server = Fastify();

const {userRoutes, habitRoutes} = require('./routes/routes');

server.register(userRoutes, { prefix: '/api/users' });
server.register(habitRoutes, { prefix: '/api/habits' });
server.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'client'),
  prefix: '/',
});


const start = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URL)
    console.log('✅ MongoDB Atlas підключено');
    await server.listen({ port: 3000 });
    console.log('✅ Сервер працює: http://localhost:3000');
  } catch (err) {
    console.error('❌ Помилка при запуску:', err);
    process.exit(1);
  }
};

start();
