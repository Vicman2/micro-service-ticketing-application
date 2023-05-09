import express, {Request, Response} from 'express'
import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@vicmanticketing/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket.model'

const router = express.Router()

router.put('/api/v1/tickets/:id', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({gt: 0}).withMessage('Price must be greater than zero')
], validateRequest, async(req: Request, res: Response) => {
    const ticket = await Ticket.findOne({_id: req.params.id})
    if(!ticket) throw new NotFoundError()

    if(ticket.userId !== req?.currentUser?.id!) throw new NotAuthorizedError()

    ticket.set({
        title: req.body.title,
        price: req.body.price
    })

    await ticket.save()

    res.send(ticket)
})

export {router as updateTicketRouter}