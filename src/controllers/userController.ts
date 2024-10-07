import { Request, Response } from 'express';
import jsonWebToken from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userName, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(400).json({message: 'User already exist'})
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        })

    } catch (error) {
        res.status(500).json({message: 'Error registering user'})
    }
}