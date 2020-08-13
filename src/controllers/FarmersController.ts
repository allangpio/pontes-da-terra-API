import {Request, Response} from 'express';
import knex from '../db/index';

class FarmersController {
  async index(request: Request, response: Response) {
    const {city, uf, items} = request.query;

    // trim method used to avoid errors due to spaces between the item param declaration
    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const farmers = await knex('farmers')
      .join('farmer_items', 'farmers.id', '=', 'farmer_items.farmer_id')
      .whereIn('farmer_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('farmers.*');

    response.json(farmers);
  }

  async show(request: Request, response: Response) {
    const {id} = request.params;

    // as there is only one id passed as param, we use the first method to return the first item of the array
    const farmer = await knex('farmers').where('id', id).first();

    if (!farmer) {
      // If no id was passed as parameter -> return error
      return response.status(400).json({message: 'Farmer not found'});
    }

    // Idendify the items that this farmer produces
    const items = await knex('items')
      .join('farmer_items', 'items.id', '=', 'farmer_items.item_id')
      .where('farmer_items.farmer_id', id)
      .select('items.title');

    response.json({farmer, items});
  }

  async create(request: Request, response: Response) {
    // Recieve the farmer data from the Form
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await knex.transaction();

    const farmer = {
      image:
        'https://images.unsplash.com/photo-1452948491233-ad8a1ed01085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    // Insert farmer data on the Database
    // Knex insert method returns the id of the records as an array
    const insertedIds = await trx('farmers').returning('id').insert(farmer);

    // Insert the data of the items the farmer produces
    const farmer_id = insertedIds[0]; // gets the id from the farmer registered
    console.log(insertedIds);

    const farmerItems = items.map((item_id: number) => {
      return {
        farmer_id,
        item_id,
      };
    });

    await trx('farmer_items').insert(farmerItems);

    // Always use commit when using transaction
    await trx.commit();

    return response.json({
      id: farmer_id,
      ...farmer,
    });
  }
}

export default FarmersController;
