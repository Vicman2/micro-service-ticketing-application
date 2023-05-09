import express, {Request, Response} from 'express'
import { NotFoundError, requireAuth, validateRequest } from '@vicmanticketing/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket.model'

const router = express.Router()

router.get('/api/v1/tickets/:id', async(req: Request, res: Response) => {
    const ticketId = req.params.id
    const ticket = await Ticket.findOne({_id: ticketId})

    if(!ticket) throw new NotFoundError()

    res.send(ticket)
})

export {router as ShowTicketRouter}