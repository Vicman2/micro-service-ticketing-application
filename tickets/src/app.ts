import express from 'express'
import cookieSession from 'cookie-session'
import 'express-async-errors'
import { currentUser, errorHandler, NotFoundError } from '@vicmanticketing/common'
import { createTicketRouter } from './routes/new.route'
import { ShowTicketRouter } from './routes/show.route'
import { indexTicket } from './routes/index.route'
import { updateTicketRouter } from './routes/update.route'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUser)

app.use(createTicketRouter)
app.use(ShowTicketRouter)
app.use(indexTicket)
app.use(updateTicketRouter)

app.all('*', async(req, res, next) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export {app}