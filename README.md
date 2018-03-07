# express-mongo-graphql-starter

A starter API project with nodejs + express + mongo + graphql (apollo) stack, secured by jsonwebtoken. This repository will be a starting point for my upcoming nodejs based graphql projects.

Using a mongo database on default port and creating two collections: `User` and `Record`. Collections have a 1-n relation.

Api is running on port number `3333`, serving two endpoints:
- `/auth` signup and authentication, open for everyone
- `/graphql` basic crud operations and search of record entity, requires Authorization token on header

## Usage of API

Any API testing tool like Postman would work. API responds as expected, if the request is a HTTP `POST`, with Content-Type specified as `application/json` on the header.

Sample authentication queries to paste to the request body:

- Signup:
```
{ 
  "query": "mutation SignupUserMutation($email: String, $password: String, $username: String) {
    signupUser(email: $email, password: $password, username: $username) { user { id username } token }
  }", 
  "variables": {"password": "1234", "email": "alperkilci@gmail.com", "username": "alperklc"}
} 
```

- Authentication of a user:
```
{
  "query": "mutation SigninUserMutation($email: String!, $password: String!) { authenticateUser(email: $email, password: $password) { user { id username updatedAt } token }
  }",
  "variables": {"password": "1234", "email": "alperkilci@gmail.com"}
}
```

CRUD and search queries for Record entity:
We will get a token after login via `authenticateUser` mutation on auth endpoint. Following examples are requiring this token specified on the header (Authorization: `token`). CRUD operations are restricted to the given user.

- Create record:
```
{
  "query": "mutation createRecord($description: String) {
    createRecord(description: $description) { id }
  }",
  "variables": {
    "description": "test"
  }
}
```

- Update record:
```
{
  "query": "mutation updateRecord($description: String $id: ID!) { updateRecord(description: $description id: $id) }",
  "variables": {
    "id": "5aa03efc9769c32ba2f4f5b5",
    "description": "test edit"
  }
}
```

- Delete record:
```
{
  "query": "mutation deleteRecord($id: ID!){ deleteRecord(id: $id) }",
   "variables": {
     "id": "5aa05b6a8fef4c40d74c88fb"
   }
}
```

- Get a record by ID:
```
{
  "query": "query getRecordById($id: ID){ initialRecord: getRecordById(id: $id) { id description } }",
  "variables": {"id": "5aa03efc9769c32ba2f4f5b5"}
}
```

- Search record:
```
{
  "query": "query searchRecord($keyword: String! $dateGreaterThanEqual: String! $dateLessThanEqual: String!) { searchRecord(keyword: $keyword, dateGreaterThanEqual: $dateGreaterThanEqual, dateLessThanEqual: $dateLessThanEqual) { id description } }",
  "variables": {
    "keyword": "te",
    "dateGreaterThanEqual": "2017-12-08T00:00:00.000Z",
    "dateLessThanEqual": "2019-08-08"
  }
}
```
