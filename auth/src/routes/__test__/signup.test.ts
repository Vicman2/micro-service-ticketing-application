import request from 'supertest'
import { app } from '../../app'

describe('The signup flow', () => {
    it('Should return a 201 on successfull signup', async () => {
        return request(app)
            .post('/api/v1/users/signUp')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201)
    })
    
    it('Should return a 400 with an  invalid eamil', async () => {
        return request(app)
            .post('/api/v1/users/signUp')
            .send({
                email: 'testtest.com',
                password: 'password'
            })
            .expect(400)
    })
    
    it('Should return a 400 with an  invalid password', async () => {
        return request(app)
            .post('/api/v1/users/signUp')
            .send({
                email: 'testtest.com',
                password: 'pas'
            })
            .expect(400)
    })
    
    it('Should return a 400 with missing email or password', async () => {
        await request(app)
            .post('/api/v1/users/signUp')
            .send({
                email: 'testtest@.com'
            })
            .expect(400)
    
        await request(app)
            .post('/api/v1/users/signUp')
            .send({
                password: 'password'
            })
            .expect(400)
    })
    
    it('Should disallow duplicate email', async () => {
        await request(app)
            .post('/api/v1/users/signUp')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201)
    
        await request(app)
            .post('/api/v1/users/signUp')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(400)
    })

    it('Sets a cookie after signup', async () => {
        const response = await request(app)
            .post('/api/v1/users/signUp')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201)
        expect(response.get('Set-Cookie')).toBeDefined()
    })
})
