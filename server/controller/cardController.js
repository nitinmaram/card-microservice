import { validateRequest, isValidCard } from '../utils/validations.js';
import { cardService } from '../service/cardService.js';

export const addCard = async (req, res) => {
    const { customerName, cardNumber, limit } = req.body;
    const errors = validateRequest(req.body)
    if (errors.length > 0) {
        return res.status(400).send({ message: `Bad Request: Please enter valid ${errors}` });
    }
    else {
        try {
            const addedCard = await cardService.addCard({ customerName, cardNumber, limit });
            return res.status(201).send({ message: `Successfully added new Card : ${addedCard.cardNumber}` });
        } catch (error) {
            console.log(`Error while adding card to the DB : ${JSON.stringify(error)}`);
            return error.code === 'P2002' ?
                res.status(409).send({ message: `${cardNumber} already exists in DB. Please Enter a new Card number` }) :
                res.status(500).send({ message: `Internal Server Error while insering card details into DB ${JSON.stringify(error)}` });
        }
    }
}
export const getAllCards = async (req, res) => {
    try {
        const cards = await cardService.getAllCards();
        return res.status(200).send(cards);
    } catch (error) {
        console.log(`Error while fetching cards from DB : ${JSON.stringify(error)}`);
        return res.status(500).send({ message: `Internal Server Error while fetching cards from DB ${JSON.stringify(error)}` });
    }
}
export const deleteCard = async (req, res) => {
    const { cardNumber } = req.body;
    if (!isValidCard(cardNumber)) {
        res.status(400).send({ message: `Bad Request: Please enter valid Card number` });
    }
    else {
        try {
            const deletedCard = await cardService.deleteCard({ cardNumber });
            return res.status(200).send({ message: `Sucessfully deleted the credit card number : ${deletedCard.cardNumber}` });
        } catch (error) {
            console.log(`Error while deleting the card from the DB : ${JSON.stringify(error)}`);
            res.status(500).send({ message: `Internal Server Error while deleting the card from the DB` });
        }
    }
}
