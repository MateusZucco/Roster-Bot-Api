const EXPRESS = require("express");
const ROUTES_ROSTER = require("./routes/rosters");
const ROUTES_USER = require("./routes/users");
const APP = EXPRESS();
const CORS = require("cors");

require("./database");

APP.use(EXPRESS.json());
APP.use(CORS());

APP.set("http://localhost");
APP.use(ROUTES_ROSTER);
APP.use(ROUTES_USER);
APP.listen(3030);
