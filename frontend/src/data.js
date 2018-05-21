import gql from "graphql-tag";

export default {
  createUser: gql`
    mutation SignupUserMutation(
      $email: String
      $password: String
      $username: String
    ) {
      signupResponse: signupUser(
        email: $email
        password: $password
        username: $username
      ) {
        token
        user {
          id
          username
        }
      }
    }
  `,

  loginUser: gql`
    mutation SigninUserMutation($email: String!, $password: String!) {
      loginResponse: authenticateUser(email: $email, password: $password) {
        token
        user {
          id
          username
        }
      }
    }
  `,

  queryRecords: gql`
    query searchRecord(
      $keyword: String!
      $dateGreaterThanEqual: String!
      $dateLessThanEqual: String!
    ) {
      items: searchRecord(
        keyword: $keyword
        dateGreaterThanEqual: $dateGreaterThanEqual
        dateLessThanEqual: $dateLessThanEqual
      ) {
        id
        date
        description
        updatedAt
        createdAt
      }
    }
  `,

  getRecordById: gql`
    query getRecordById($id: ID) {
      record: getRecordById(id: $id) {
        id
        date
        description
      }
    }
  `,

  createRecord: gql`
    mutation create($date: DateTime!, $description: String) {
      createRecord(date: $date, description: $description) {
        id
      }
    }
  `,

  updateRecord: gql`
    mutation updateRecord($id: ID!, $date: DateTime, $description: String) {
      updateRecord(id: $id, date: $date, description: $description)
    }
  `,

  deleteRecord: gql`
    mutation deleteRecord($id: ID!) {
      deleteRecord(id: $id)
    }
  `
};
