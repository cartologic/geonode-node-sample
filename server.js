const express = require("express");
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");
const authRouter = require("./routes/auth.route");
const viewsRouter = require("./routes/views.route");
const bodyParser = require("body-parser");
const config = require("./config");
const DBManager = require("./utils/DBManager");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/**
 * configure session
 */
const SessionStore = require("connect-mongodb-session")(session);
const STORE = new SessionStore({
  uri: config.DB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: "geonode",
    saveUninitialized: false,
    store: STORE,
  })
);

app.use(express.static(path.join(__dirname, "assets")));

app.use(flash());

app.set("view engine", "ejs");
app.set("views", "views");

/**
 * Instantiating db instance and connect to db
 */
const DBInstance = new DBManager();
DBInstance.CONNECT();

app.use("/", authRouter);
app.use("/", viewsRouter);

const PORT = config.PORT;
app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
