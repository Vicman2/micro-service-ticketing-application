import nats from 'node-nats-streaming'

console.clear()

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
})


stan.on('connect', () => {
    console.log('Publisher connected to Nats')

    const data = JSON.stringify({
        id: '124',
        title: 'concert',
        price: 20
    })
    stan.publish('ticket:created', data, () => {
        console.log('Event published')
    })
})

