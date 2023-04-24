import request from 'supertest'
import { app } from '../../app'

describe('The signin flow', () => {
    it('Should fail when an email that does not exist tries to sign up', async () => {
        return request(app)
            .post('/api/v1/users/signIn')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(400)
    })

    it('Should fail when an incorrect password is used to signin', async () => {
        await request(app)
            .post('/api/v1/users/signUp')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201)

        await request(app)
            .post('/api/v1/users/signIn')
            .send({
                email: 'test@test.com',
                password: 'password1'
            })
            .expect(400)
    })
    
    it('Should return a 400 with an  invalid eamil', async () => {
        return request(app)
            .post('/api/v1/users/signIn')
            .send({
                email: 'testtest.com',
                password: 'password'
            })
            .expect(400)
    })

    it('Should respond with a cookie when given valid credential', async () => {
        await request(app)
            .post('/api/v1/users/signUp')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201)

        const response =   await request(app)
            .post('/api/v1/users/signIn')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(200)
        expect(response.get('Set-Cookie')).toBeDefined()
    })
})