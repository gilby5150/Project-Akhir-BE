const morgan = require("morgan");
const { logger } = require("../models");

const stream = {
  write: async (message , req) => {
    const data = message.split(" ", 6);

    try {

      const date = new Date();
      const response = await logger.create({
        request_method: data[1],
        endpoint: data[2],
        status_code: data[3],
        content_length: data[4],
        response_time: data[5],
        timestamp: date.toLocaleString(),
      });
      console.log("res", response);
    } catch (error) {
      console.log(error.message);
    }
  },
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

exports.morganMiddleware = morgan(
  ":remote-addr :method :url :status :res[content-length] :response-time ",
  { stream, skip }
);