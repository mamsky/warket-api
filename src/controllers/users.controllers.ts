import dotenv from 'dotenv';
dotenv.config();
import { NextFunction, Request, Response } from 'express';
import { LoginSchemas, RegisterSchemas } from '../utils/schemas/auth.schemas';
import usersService from '../services/users.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

    const createNewUsers = await usersService.CreateNewUsers(data);
    const { password: _password, ...datas } = createNewUsers;

    res.status(201).json({ message: 'success', data: { ...datas } });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY || '';
    const body = req.body;

    const validate = await LoginSchemas.validateAsync(body);
    console.log(validate);
    const isUsers = await usersService.GetUsersByUsername(validate.username);

    if (!isUsers) {
      res.status(404).json({ message: 'username or password wrong' });
      return;
    }

    const passwordCompare = await bcrypt.compare(
      validate.password,
      isUsers.password,
    );

    if (!passwordCompare) {
      res.status(404).json({ message: 'username or password wrong' });
      return;
    }

    const token = jwt.sign(
      {
        id: isUsers.id,
      },
      jwtSecretKey,
      { expiresIn: '1d' },
    );

    res.status(200).json({ message: 'success', token });
  } catch (error) {
    next(error);
  }
};

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = (req as any).users.id;
  const data = await usersService.GetUsersById(userId);
  if (!data) {
    res.status(404).json({ message: 'users not found' });
    return;
  }
  res.status(200).json({ message: 'success', data });
};
