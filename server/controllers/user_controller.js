const bcrypt = require("bcrypt");
const User = require("../models/User_model");
const jwt = require("jsonwebtoken");
const { log } = require("../plugins/logDecorator");

const register = async (req, reply) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const errorMsg = { error: "Користувач вже існує" };
    reply.code(400).send(errorMsg);
    return errorMsg; 
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  const responseData = {
    id: user._id,
    email: user.email,
    createdAt: user.createdAt,
  };

  reply.code(201).send(responseData);
  return responseData; 
};


const login = async (req, reply) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const errorMsg = { error: "Невірний email або пароль" };
    reply.code(400).send(errorMsg);
    return errorMsg; 
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const errorMsg = { error: "Невірний email або пароль" };
    reply.code(400).send(errorMsg);
    return errorMsg;
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const responseData = { token };

  reply.send(responseData);
  return responseData; 
};


const handleRegister = log({ level: "INFO" })(register);
const handleLogin = log({ level: "INFO" })(login);

module.exports = {
  handleRegister,
  handleLogin,
};
