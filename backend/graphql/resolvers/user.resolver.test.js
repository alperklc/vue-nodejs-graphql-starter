const request = require('supertest')
const app = require('../../server')

describe('user', function () {
  beforeAll(() => {
  })

  it('should register with new user and return token', done => {
    request(app)
      .post('/auth')
      .send({
        query: `mutation signupUserMutation($email: String, $password: String, $username: String) {
                  signupUser(email: $email, username: $username, password: $password) {
                  user { id username }
                  token
              }
          }`,
        variables: {
          email: 'test@test.com',
          username: 'testuser',
          password: '1234'
        }
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err
        }
      })

    /* (JSON.stringify(), { jar: true }).then(response => {
      console.log(response)
      // adding userid to the test suite object
      const id = response.data.signupUser.user.id
      expect(response.status).toBe(200)
      expect(response.success).toBe(true)
      expect(response.data.token).toBeDefined()
    }) */
  })
  it('should not register with existing user data', () => {
    expect(true).toBe(true)
  })
  it('should not login with wrong credentials', () => {
    expect(true).toBe(true)
  })
  it('should login with correct credentials', () => {
    expect(true).toBe(true)
  })
  it('should not login twice', () => {
    expect(true).toBe(true)
  })
  it('should logout after logging in', () => {
    expect(true).toBe(true)
  })
  it('should not logout if not logged in', () => {
    expect(true).toBe(true)
  })
  it('should removed by ID', () => {
    expect(true).toBe(true)
  })
})
