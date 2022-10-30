module.exports = (sequelize, Sequelize) => {
    const Logger = sequelize.define("logger", {
    request_method: {
      type: Sequelize.STRING,
    },
    endpoint: {
      type: Sequelize.STRING,
    },
    status_code: {
      type: Sequelize.STRING,
    },
    content_length: {
      type: Sequelize.STRING,
    },
    response_time: {
      type: Sequelize.STRING,
    },
    timestamp: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

return Logger
}
