# Band Names

Objective: try out OTel autoinstrumentation on database calls

This project is gonna use TypeORM (seems popular, has autoinstrumentation) with SQLite (super easy).

## Database

Accessing a db from the command line is like:

```bash
sqlite3 data/db
```

(where db is the file containing the database)

and then you need to know:

`.exit` quits
`.fullschema` probably prints something useful

Docs: https://www.sqlite.org/cli.html
