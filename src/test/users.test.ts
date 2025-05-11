import { createServer } from '../server'
import request from 'supertest'
import { RawUser } from '../models/user'

const app = createServer()

const user: RawUser = {
  username: 'Dmitry',
  age: 22,
  hobbies: ['reading']
}
describe('Users API', () => {
  test('GET /users should return empty array', async () => {
    const res = await request(app).get('/users')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  test('POST + GET /users should return the same user', async () => {
    const postRes = await request(app).post('/users').send(user)

    expect(postRes.status).toBe(201)
    expect(postRes.body).toHaveProperty('id')
    expect(postRes.body.username).toBe(user.username)
    expect(postRes.body.age).toBe(user.age)
    expect(postRes.body.hobbies).toEqual(user.hobbies)
    const userId = postRes.body.id

    const getRes = await request(app).get('/users')
    expect(getRes.body).toEqual([
      {
        id: userId,
        ...user
      }
    ])
  })
})
