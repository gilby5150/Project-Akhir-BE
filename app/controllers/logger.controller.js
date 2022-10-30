const db = require("../models");
const Log = db.logger;
const Op = db.Sequelize.Op;

exports.getLog = async (req, res) => {
  const search = req.query.search_query || '';

  const result = await Log.findAll({
    where: {
      [Op.or]: [
        {
          request_method: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          endpoint: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          status_code: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          content_length: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          response_time: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          timestamp: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
    order: [['id', 'DESC']],
  });

  res.json({
    result: result,
  });
};
