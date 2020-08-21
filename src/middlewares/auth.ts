import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
const authConfig = require('../config/auth');

// export default function (req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) return res.status(401).json({Error: 'No token provided'});

//   const parts = authHeader.split(' ');

//   if (!(parts.length === 2))
//     return res.status(401).json({Error: 'Token error'});

//   const [scheme, token] = parts;

//   if (!/^Bearer$/i.test(scheme))
//     return res.status(401).json({Error: 'Token malformatted'});

//   jwt.verify(token, authConfig.secret, (err , decoded) => {
//     if (err) return res.status(401).json({Error: 'Invalid token'});

//     req.userId = decoded.id;

//     return next();
//   });
// }

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["auth"];
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};