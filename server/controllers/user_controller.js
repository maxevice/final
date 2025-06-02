const bcrypt = require('bcrypt');
const User = require('../models/User_model');
const jwt = require('jsonwebtoken');

const handleRegister = async (req, reply) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return reply.code(400).send({ error: 'Користувач вже існує' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword
  });

  reply.code(201).send({
    id: user._id,
    email: user.email,
    createdAt: user.createdAt
  });
};

const handleLogin = async (req, reply) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return reply.code(400).send({ error: 'Невірний email або пароль' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return reply.code(400).send({ error: 'Невірний email або пароль' });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  reply.send({ token });
};

module.exports = {
  handleRegister, handleLogin
};