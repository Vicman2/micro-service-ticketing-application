import express, {Request, Response} from 'express'
import { Ticket } from '../models/ticket.model'

const router = express.Router()

router.get('/api/v1/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({})
    res.send(tickets)
})

export {router as indexTicket}