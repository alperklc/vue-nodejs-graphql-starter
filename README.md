# mongo-express-vue-node-graphql-starter

A starter API project with nodejs + express + mongo + graphql (apollo) + vuejs stack. This project is intended to be a starting point for bootstrapping a nodejs graphql api and vuejs client.

Creates a mongo database with two collections: `User` and `Record`. Collections have a 1-n relation.

Running on port number `3333`, serving two endpoints:
> `/auth` for signup and authentication
> `/graphql` for basic crud operations and search of record entity

## Usage of API

Any API testing tool like Postman would work.

## UI Build 

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

