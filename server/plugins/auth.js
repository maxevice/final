const jwt = require('jsonwebtoken');

const verifyToken = async (req, reply) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Токен не вказано' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
  } catch (err) {
    reply.code(401).send({ error: 'Невірний або протермінований токен' });
  }
};

module.exports = verifyToken;
