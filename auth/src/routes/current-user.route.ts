import express from 'express'
import { currentUser } from '../middlewares/current-user.middleware'

const router = express.Router()


router.get('/api/v1/users/currentUser',currentUser, (req, res) => {
   res.send({currentUser:req.currentUser || null})
})


export {router as currentuserRouter}