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
        await newUser.save();
        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({message: 'Error registering user'})
        return;
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            res.status(400).json({ message: 'Invalid user' } );
            return;
        }
        
        const isMatch: boolean = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid user' });
        }

        const token = jsonWebToken.sign({ id: user.id }, 'my_secret', {expiresIn: '2h'});
        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Server error' + error })
    }
}