import express from 'express';

import UsersController from './controllers/UsersController';
import FarmersController from './controllers/FarmersController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

const itemsController = new ItemsController();
const farmersController = new FarmersController();

// List items produced by the farmers
routes.get('/items', itemsController.index);

// Register farmers
routes.post('/farmers', farmersController.create);

// Filter by city and state
routes.get('/farmers', farmersController.index);

// List a specifc farmer
routes.get('/farmers/:id', farmersController.show);

export default routes;
