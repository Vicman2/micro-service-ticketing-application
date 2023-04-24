import mongoose from 'mongoose'
import { app } from './app'

const start = async() => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_SECRET must be defined')
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Connected to mongodb')
    } catch (error) {
        console.error(error)
    }

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Listening on port ${port}!!!`)
    })
}

start()