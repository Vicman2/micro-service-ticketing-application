import express, {Request, Response} from 'express'
import { body } from 'express-validator';
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../errors/bad-request.error';
import { User } from '../models/user.model';
import { validateRequest } from '../middlewares/validate-request.middleware';

const router = express.Router()


router.post('/api/v1/users/signUp', [
    body('email')
    .isEmail()
    .withMessage('Email must be vaid'),
    body('password')
    .trim()
    .isLength({min:4, max: 20})
    .withMessage('Password must between 4 and 20 characters'),
],validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body
   
    const existingUser = await User.findOne({email})

    if(existingUser) {
        throw new BadRequestError('User already exist')
    }

    const user = await User.build({
        email,
        password
    })
    await user.save()

    // Generate json web token and store on session object

    const userJwt = await jwt.sign({
        _id: user.id,
        email: user.email
    }, process.env.JWT_KEY!)

    req.session = {
        jwt: userJwt
    }

    res.status(201).send(user)
    
})


export {router as signUpRouter}