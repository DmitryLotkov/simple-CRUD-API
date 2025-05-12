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

  test('GET /users/:id should return created user by id', async () => {
    const postRes = await request(app).post('/users').send(user)
    const userId = postRes.body.id

    const getRes = await request(app).get(`/users/${userId}`)
    expect(getRes.body).toEqual({
      id: userId,
      ...user
    })
    expect(getRes.status).toBe(200)
  })

  test('PUT /users/:id should update user data but id must be initial', async () => {
    const postRes = await request(app).post('/users').send(user)
    const initialUserId = postRes.body.id

    const newUser: RawUser = {
      username: 'Anton',
      age: 95,
      hobbies: ['writing memoirs', 'fishing']
    }

    const putRes = await request(app).put(`/users/${initialUserId}`).send(newUser)

    expect(putRes.body).toEqual({
      id: initialUserId,
      ...newUser
    })

    expect(putRes.body.id).toBe(postRes.body.id)
    expect(putRes.body.username).toBe(newUser.username)
    expect(putRes.body.age).toBe(newUser.age)
    expect(putRes.body.hobbies).toEqual(newUser.hobbies)
    expect(putRes.status).toBe(200)
  })

  test('DELETE /users/:id should delete user by id', async () => {
    const postRes = await request(app).post('/users').send(user)
    const userId = postRes.body.id

    const deleteRes = await request(app).delete(`/users/${userId}`)
    expect(deleteRes.status).toBe(204)

    const getUserById = await request(app).get(`/users/${userId}`)

    expect(getUserById.status).toBe(404)
    expect(getUserById.body).toStrictEqual({
      message: `User with ${userId} not found`
    })
  })

  test('make request to not existing route', async () => {
    const postRes = await request(app).post('/users/not existing').send(user)
    const userId = postRes.body.id
    const deleteRes = await request(app).delete(`/users/not existing`)
    const putRes = await request(app).put(`/users/not existing`)
    const getUserById = await request(app).get(`/users/${userId}/not existing`)
    const getUsers = await request(app).get(`/users/not existing`)

    const notFoundMessage = { message: 'Route not found' }
    expect(getUserById.status).toBe(400)
    expect(getUserById.body).toStrictEqual(notFoundMessage)

    expect(deleteRes.status).toBe(400)
    expect(deleteRes.body).toStrictEqual(notFoundMessage)

    expect(putRes.status).toBe(400)
    expect(putRes.body).toStrictEqual(notFoundMessage)

    expect(getUsers.status).toBe(400)
    expect(getUsers.body).toStrictEqual(notFoundMessage)

    expect(postRes.status).toBe(400)
    expect(postRes.body).toStrictEqual(notFoundMessage)
  })
})
