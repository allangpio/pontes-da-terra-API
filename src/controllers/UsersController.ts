import {Request, Response} from 'express';
import knex from '../db/index';
import bcript from 'bcrypt';

/// aqui vai mudar um pouco pq eu vou usar o bcrypt no front-end e depois passar ele pra cá já encriptado

class UsersController {
  async create(request: Request, response: Response) {
    try {
      const {name, lastName, email, password} = request.body;

      if (await knex('users').where('email', email).first()) {
        return response.status(400).json({message: 'User already exists'});
      }

      const user = {
        name,
        lastName,
        email,
        password,
      };

      await knex('users').insert(user);

      return response.json({message: 'User successfuly registered'});
    } catch (err) {
      return response.status(400).json({err: 'Unable to register'});
    }
  }
}

export default UsersController;
