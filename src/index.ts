import tracingStartup from "./tracing";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

import express = require("express");
import * as otel from "@opentelemetry/api";

tracingStartup.then(() => {
    const tracerProvider = otel.trace;
    const span = tracerProvider.getTracer("hoo").startSpan("banana");
    span.end();
});

function initExpress() {

const PORT = process.env.PORT || "8080";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
}

tracingStartup.then(createConnection).then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    initExpress();

}).catch(error => console.log(error));
