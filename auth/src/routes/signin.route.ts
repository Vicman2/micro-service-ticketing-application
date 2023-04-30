import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { validateRequest, BadRequestError } from '@vicmanticketing/common'
import { User } from '../models/user.model'
import { Password } from '../services/password'

const router = express.Router()


router.post('/api/v1/users/signIn', [
    body('email')
    .isEmail()
    .withMessage('Email must be vaid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a body'),
],validateRequest, async(req: Request, res: Response) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})
    if(!existingUser) throw new BadRequestError('Invalid credentials')

    const passwordMatch = await Password.compare(existingUser.password, password)
    if(!passwordMatch) throw new BadRequestError('Invalid credentials')


    // Generate json web token and store on session object

    const userJwt = await jwt.sign({
        _id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!)

    req.session = {
        jwt: userJwt
    }

    res.status(200).send(existingUser)
})


export {router as signInRouter}