import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'


it('should return a 404 if the prodided id does not exist', async()=> {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app).put(`/api/v1/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'sdhshdhsd',
            price: 20
        })
        .expect(404)
})

it('should return a 401 if the user is not authenticated', async()=> {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/v1/tickets/${id}`)
        .send({
            title: 'sdhshdhsd',
            price: 20
        })
        .expect(401)
})

it('should return a 401 if the user does not own the ticket', async()=> {
    const response = await request(app)
        .post('/api/v1/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'dssd',
            price: 10
        })

    await request(app)
        .put(`/api/v1/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'hhhdsdsd',
            price: 20
        })
        .expect(401)
    
})

it('should return a 400 if the user does not provide a price or title', async()=> {
    const cookie = global.signin()
    const response = await request(app)
        .post('/api/v1/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'dssd',
            price: 10
        })

    await request(app)
        .put(`/api/v1/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        })
        .expect(400)
    
    await request(app)
        .put(`/api/v1/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'jsjjdjsjd',
            price: -20
        })
        .expect(400)
})

it('should be able to update a ticket given correct ticket detials ', async () => {
    const cookie = global.signin()
    const response = await request(app)
        .post('/api/v1/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'dssd',
            price: 10
        })

    await request(app)
        .put(`/api/v1/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'Conert',
            price: 50
        })
        .expect(200)
    const ticketResponse = await request(app)
        .get(`/api/v1/tickets/${response.body.id}`)
        
    expect(ticketResponse.body.title).toEqual('Conert')
    expect(ticketResponse.body.price).toEqual(50)
})