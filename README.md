# express-mongo-graphql-starter

A starter API project with nodejs + express + mongo + graphql (apollo) stack. This project is intended to be a starting point for bootstrapping a nodejs graphql api.

Creates a mongo database with two collections: `User` and `Record`. Collections have a 1-n relation.

Running on port number `3333`, serving two endpoints:
> `/auth` for signup and authentication
> `/graphql` for basic crud operations and search of record entity
