import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
const authConfig = require('../config/auth');

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({Error: 'No token provided'});

  const parts = authHeader.split(' ');

  if (!parts.length === 2) return res.status(401).json({Error: 'Token error'});

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({Error: 'Token malformatted'});

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).json({Error: 'Invalid token'});

    req.id = decoded.id;

    return next();
  });
}
