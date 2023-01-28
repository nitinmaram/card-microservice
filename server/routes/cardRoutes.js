import { Router } from 'express';
import { addCard, getAllCards, deleteCard } from '../controller/cardController.js';

const cardRouter = Router();

/* GET All Cards. */
cardRouter.get('/cards', getAllCards);
/* Insert a Card. */
cardRouter.post('/card', addCard);
/* Delete a Card. */
cardRouter.delete('/card', deleteCard);

export default cardRouter;
