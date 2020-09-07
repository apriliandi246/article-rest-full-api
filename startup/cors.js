const cors = require("cors");

module.exports = function (app) {
   const corsOption = { origin: process.env.ORIGIN };
   app.use(cors(corsOption));
};
