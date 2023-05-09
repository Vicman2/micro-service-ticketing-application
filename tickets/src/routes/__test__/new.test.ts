import request from 'supertest'
import {app} from '../../app'
import { Ticket } from '../../models/ticket.model'

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/v1/tickets')
        .send({})
    expect(response.statusCode).not.toEqual(404)
})

it('can only be accessed if the user is logged in', async () => {
    const response = await request(app)
        .post('/api/v1/tickets')
        .send({})
    expect(response.statusCode).toEqual(401)
})

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/v1/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10,
        })
    expect(response.statusCode).not.toEqual(401)
})

it('should return an error if an invalid title is provided', async () => {
     await request(app)
        .post('/api/v1/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400)

    await request(app)
        .post('/api/v1/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400)
})

it('should return an error if an invalid price is provided', async () => {
    await request(app)
    .post('/api/v1/tickets')
    .set('Cookie', global.signin())
    .send({
        title: '',
        price: -10
    })
    .expect(400)

await request(app)
    .post('/api/v1/tickets')
    .set('Cookie', global.signin())
    .send({
        title: '',
    })
    .expect(400)
})

it('should create a ticket with valid parameters', async () => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)
    await request(app)
        .post('/api/v1/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'dssd',
            price: 10
        })
        .expect(201)
    
    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)

})