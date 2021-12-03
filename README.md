# Band Names

Objective: try out OTel autoinstrumentation on database calls

This project is gonna use TypeORM (seems popular, has autoinstrumentation) with SQLite (super easy).

## Database

access the database:

`psql --host db --user postgres`

and then the password is `postgres`

and then you need to create a db

`create database yo;`

(this needs to match the database in ormconfig.json)

It would be better to create a matching user, but this is the minimum that works, for now.
