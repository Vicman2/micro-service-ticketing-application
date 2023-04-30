import express from 'express'
import { currentUser } from '@vicmanticketing/common'

const router = express.Router()


router.get('/api/v1/users/currentUser',currentUser, (req, res) => {
   res.send({currentUser:req.currentUser || null})
})


export {router as currentuserRouter}