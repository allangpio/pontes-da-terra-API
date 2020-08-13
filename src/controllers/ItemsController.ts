import {Request, Response} from 'express';
import knex from '../db/index';

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(
      (item: {id: number; title: string; image: string}) => {
        return {
          id: item.id,
          title: item.title,
          image_url: `http://localhost:3333/uploads/${item.image}`,
        };
      }
    );
    return response.json(serializedItems);
  }
}

export default ItemsController;
