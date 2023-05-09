import express, {Request, Response} from 'express'
import { requireAuth, validateRequest } from '@vicmanticketing/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket.model'

const router = express.Router()

router.post('/api/v1/tickets', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({gt: 0}).withMessage('Price must be greater than zero')
], validateRequest, async(req: Request, res: Response) => {
   const {title, price} = req.body
   const userId = req.currentUser?.id!
   console.log(req.currentUser)
   console.log(userId)

   const ticket = Ticket.build({
    title, 
    price,
    userId
   })
   await ticket.save()

   res.status(201).send(ticket)
})

export {router as  createTicketRouter }