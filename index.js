const express = require("express");
const app = express();

require("dotenv").config();

const Sentry = require("@sentry/node");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ejs = require("ejs");
const multer = require('multer');

const port = process.env.PORT || 3000;
app.use(cookieParser());
app.set("view engine", "ejs");

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app }),
        ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
    tracesSampleRate: 1.0,
});

const router = require("./util/router");

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.use(function (req, res, next) {
    res.status(404).render("404");
});

app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});