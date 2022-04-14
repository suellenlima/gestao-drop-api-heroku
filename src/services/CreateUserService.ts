import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if(checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const values = { name: name, email: email, password: hashedPassword }
        const newUser = new User();
        Object.assign(newUser, values);

        const user = usersRepository.create(newUser);

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
