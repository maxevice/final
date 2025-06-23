const getHabitsSchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string" },
          owner: { type: "string" },
          createdAt: { type: "string" },
          done: { type: "boolean" },
        },
      },
    },
  },
};

const createHabitSchema = {
  body: {
    type: "object",
    required: ["title"],
    properties: {
      title: { type: "string", minLength: 1 },
    },
    additionalProperties: false,
  },
  response: {
    201: {
      type: "object",
      properties: {
        _id: { type: "string" },
        title: { type: "string" },
        owner: { type: "string" },
        createdAt: { type: "string" },
        done: {type: "boolean"}
      },
    },
  },
};

const updateHabitSchema = {
  body: {
    type: "object",
    required: ["done"],
    properties: {
      done: { type: "boolean" },
    },
  },
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        _id: { type: "string" },
        title: { type: "string" },
        done: { type: "boolean" },
        userId: { type: "string" },
      },
    },
  },
};
const deleteHabitSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 1 }
    },
    required: ['id']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    },
    404: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};

module.exports = { 
  deleteHabitSchema,
  updateHabitSchema,
  createHabitSchema,
  getHabitsSchema
 };
