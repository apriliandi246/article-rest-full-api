"use strict";

const express = require("express");
const app = express();
const http = require("http").Server(app);

require("./startup/database")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./startup/cors")(app);
require("./startup/routes")(app);

http.listen(4000, () => {
   console.log(`Server started on 4000`);
});
