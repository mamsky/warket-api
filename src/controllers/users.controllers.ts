import { NextFunction, Request, Response } from 'express';
import { RegisterSchemas } from '../utils/schemas/auth.schemas';
import usersService from '../services/users.service';
import bcrypt from 'bcrypt';
import { RegisterTypeDTO } from '../utils/types/users.types';
const dice = 10;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    console.log(body);

    const validate = await RegisterSchemas.validateAsync(body);

    const isusername = await usersService.GetUsersByUsername(validate.username);
    if (isusername) {
      res.status(409).json({ message: 'Username already exists' });
      return;
    }

    const isEmail = await usersService.GetUsersByEmail(validate.email);
    if (isEmail) {
      res.status(500).json({ message: 'Email already exists' });
      return;
    }

    const hashPassword = await bcrypt.hash(validate.password, dice);
    const data: RegisterTypeDTO = {
      ...validate,
      password: hashPassword,
    };

    const { password: _password, ...datas } = data;

    const createNewUsers = await usersService.CreateNewUsers(data);
    res.status(201).json({ message: 'success', data: { ...datas } });
  } catch (error) {
    next(error);
  }
};
