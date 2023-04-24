import request from 'supertest'
import { app } from '../../app'

it('Should respond with details of the current user', async () => {
    const cookie = await global.signin();
    
    const response = await request(app)
        .get('/api/v1/users/currentUser')
        .set('Cookie', cookie)
        .send()
        .expect(200)

    expect(response.body.currentUser.email).toEqual('test@test.com');
        
})

it('Should respond with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/v1/users/currentUser')
        .send()
        .expect(200)
    expect(response.body.currentUser).toEqual(null)
})