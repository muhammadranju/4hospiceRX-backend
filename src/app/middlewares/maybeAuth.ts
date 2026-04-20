/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { jwtHelper } from '../../helpers/jwtHelper';

const maybeAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer && tokenWithBearer.startsWith('Bearer')) {
      const token = tokenWithBearer.split(' ')[1];

      // verify token
      const verifyUser = jwtHelper.verifyToken(
        token,
        config.jwt.jwt_secret as Secret,
      );

      // set user to req
      req.user = verifyUser;
    }
    next();
  } catch (error: any) {
    next();
  }
};

export default maybeAuth;
