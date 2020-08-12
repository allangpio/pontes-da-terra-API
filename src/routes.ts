import express from 'express';

import ItemsController from './controllers/ItemsController';
import FarmersController from './controllers/FarmersController';

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
