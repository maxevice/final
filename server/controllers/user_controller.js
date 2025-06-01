const bcrypt = require('bcrypt');
const User = require('../models/User_model');

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

module.exports = {
  handleRegister
};