import {Request, Response} from 'express';
import knex from '../db/index';
import bcript from 'bcrypt';
import jwt from 'jsonwebtoken';

const authConfig = require('../config/auth');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

/// aqui vai mudar um pouco pq eu vou usar o bcrypt no front-end e depois passar ele pra cá já encriptado

class UsersController {
  async create(request: Request, response: Response) {
    try {
      const {name, lastName, email, password} = await request.body;

      if (await knex('users').where('email', email).first()) {
        return response.status(400).json({message: 'User already exists'});
      }

      const user = {
        name,
        lastName,
        email,
        password,
      };

      const insertedId = await knex('users').returning('id').insert(user);

      const id = insertedId[0];

      return response.json({name, lastName, email, token: generateToken({id})});
    } catch (err) {
      return response.status(400).json({message: 'Unable to register'});
    }
  }

  async authenticate(request: Request, response: Response) {
    try {
      const {email, password} = await request.body;

      const user = await knex
        .select('email', 'password')
        .from('users')
        .where('email', email)
        .then((data) => {
          if (data[0].password === password) {
            return knex.select('*').from('users').where('email', email).first();
          } else {
            throw Error;
            // return response.status(400).json({err: 'Wrong email or password'});
          }
        });

      const {id, name, lastName} = user;

      return response.json({
        id,
        name,
        lastName,
        email,
        token: generateToken({id}),
      });
    } catch (err) {
      response.status(400).json({err: 'Error authenticating user'});
    }
  }
}

export default UsersController;
