import tracingStartup from "./tracing";
import "reflect-metadata";
import { Connection, createConnection, Repository } from "typeorm";

import express = require("express");
import * as otel from "@opentelemetry/api";
import { Winnings } from "./entity/Winnings";

tracingStartup.then(() => {
  const tracerProvider = otel.trace;
  const span = tracerProvider.getTracer("hoo").startSpan("banana");
  span.end();
});

function initExpress(connection: Connection) {
  const PORT = process.env.PORT || "8080";
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  const winController = new WinController(connection.getRepository(Winnings));
  app.get("/win", winController.respondToWin)

  app.listen(parseInt(PORT, 10), () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
  });
}

tracingStartup
  .then(createConnection)
  .then(async connection => {

    initExpress(connection);

  }).catch(error => console.log(error));

class WinController {

  constructor(private readonly winRepository: Repository<Winnings>) {
  }

  public respondToWin = async (req: express.Request, res: express.Response) => {

    const username = "jessitron";
    const record = new Winnings(username, 1);
    this.winRepository.save(record);

    const { total_winnings } = await this.winRepository
      .createQueryBuilder("wins")
      .select("SUM(winnings)", "total_winnings")
      .where("wins.username = :username", { username })
      .getRawOne();

    res.send("Total so far:" + total_winnings);
  }
}
