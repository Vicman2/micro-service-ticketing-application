import express from 'express'
import cookieSession from 'cookie-session'
import 'express-async-errors'
import { NotFoundError } from './errors/not-found.error'
import { errorHandler } from './middlewares/error-handler.middleware'
import { currentuserRouter } from './routes/current-user.route'
import { signInRouter } from './routes/signin.route'
import { signOutRouter } from './routes/signout.route'
import { signUpRouter } from './routes/signup.route'
const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))



app.use(currentuserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)
app.all('*', async(req, res, next) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export {app}