const getHabitsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          owner: { type: 'string' },
          createdAt: { type: 'string' }
        }
      }
    }
  }
};

const createHabitSchema = {
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', minLength: 1 }
    },
    additionalProperties: false
  },
  response: {
    201: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        title: { type: 'string' },
        owner: { type: 'string' },
        createdAt: { type: 'string' }
      }
    }
  }
};

module.exports = {
  getHabitsSchema,
  createHabitSchema
};
