# OpenTelemetry with Postgres example

Objective: try out OTel autoinstrumentation on database calls

This project uses TypeORM (seems popular, has autoinstrumentation) with PostgreSQL (easy).

(I tried SQLite but its traces weren't nearly as useful)

## What does it do?

Not much so far. Hit `/` for "Hello World"

Hit `/win` to count a win, and get a message about how many wins so far.

You can try this at https://win-with-tracing.herokuapp.com/win if you want.

## Traces

Production traces are on my "jessitron" team. For instance, 
[here's](https://ui.honeycomb.io/jessitron/datasets/otel-pg/trace/CFxJQftVg2a?span=323ac537b47c05bf)
a nice one from 5.12.2021 that shows a DNS lookup in the database connection, that's kinda cool.

Fork this app and run locally with your own HONEYCOMB_API_KEY to get traces yourself.

## Running locally

There is a dev environment defined in .devcontainer; in VSCode with the Remote Container , you can "reopen in container" to spin up a docker-compose environment.

### Run

```bash
export HONEYCOMB_API_KEY=your api key
unset NODE_OPTIONS # for a current vscode bug, hopefully fixed soon. Do this if node won't start because of an unfound file in a .vscode directory
npm install
npm run start
```

### Database

This is all the defaults. Easiest possible thing; this is not a prod-ready app.

to access the database:

`psql --host db --user postgres --password postgres`

(this needs to match the database in ormconfig.json)

## Deploy

This does deploy to Heroku. It's currently running here: https://win-with-tracing.herokuapp.com/

Deploys are manual.
