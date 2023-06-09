import nats, { Message } from 'node-nats-streaming'
import {randomBytes} from 'crypto'
console.clear()


const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
})

stan.on('connect', () => {
    console.log('Listener connected to Nats')

    stan.on('close', () => {
        console.log('Nats connection closed')
        process.exit()
    })

    const options = stan.subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName('accounting-service')
    const subscription = stan.subscribe(
        'ticket:created', 
        'orders-service-queue-group', 
        options
    )

    subscription.on('message', (msg: Message) => {
        const data = msg.getData()
        if(typeof data === 'string'){
            console.log(`Received data #${msg.getSequence()}, with data: ${data}`)
        }

        msg.ack()
    })
})

stan.on('SIGINT', () => stan.close())
stan.on('SIGTERM', () => stan.close())

