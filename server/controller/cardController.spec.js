
import { stub, spy, mock, assert, restore } from 'sinon';
import { addCard, getAllCards, deleteCard } from './cardController.js';
import { cardService } from '../service/cardService.js';
import { afterEach, describe } from 'mocha';
describe('Test Card Controller', () => {
  let cardServiceStub;

  afterEach(() => {
    restore()
  })

  it('Should throw a bad request error from addCardService when the req card details are invalid', async () => {
    const req = {
      body: {
        customerName: '',
        cardNumber: '111111111111111111111111111111111111',
        limit: 'abc'
      }
    };
    const res = {
      status: stub().returns({ end: spy(), send: mock() })
    };
    await addCard(req, res);
    assert.calledWith(res.status, 400);
    assert.calledOnce(res.status(400).send);
  });

  it('should return a 201 response from addCardService when all the req card details are valid', async () => {
    const req = {
      body: {
        customerName: 'Test User',
        cardNumber: '4024007193092243',
        limit: 1000
      }
    };
    const res = {
      status: stub().returns({ end: spy(), send: mock() })
    };
    cardServiceStub = stub(cardService, 'addCard').callsFake(() => { });
    await addCard(req, res);
    assert.calledWithExactly(cardServiceStub, req.body);
    assert.calledWith(res.status, 201);
    assert.calledOnce(res.status(201).send);
  });

  it('should return a 500 response when the addcardService fails', async () => {
    const req = {
      body: {
        customerName: 'Test User',
        cardNumber: '4024007193092243',
        limit: 1000
      }
    };
    const res = {
      status: stub().returns({ end: spy(), send: mock() })
    };
    const error = {
      code: 'P2002'
    };
    cardServiceStub = stub(cardService, 'addCard').throws(error);
    await addCard(req, res);
    assert.calledWithExactly(cardServiceStub, req.body);
    assert.calledWith(res.status, 409);
    assert.calledOnce(res.status(409).send);
  });

  it('show All cards', async () => {
    const res = {
      status: stub().returns({ end: spy(), send: mock() })
    };
    cardServiceStub = stub(cardService, 'getAllCards').callsFake(() => null);
    await getAllCards({}, res);
    assert.calledWith(res.status, 200);
    assert.calledOnce(res.status(200).send);
  });

  it('should delete a card', async () => {
    const req = {
      body: {
        customerName: 'Test User',
        cardNumber: '4024007193092243',
        limit: 1000
      }
    };
    const res = {
      status: stub().returns({ end: spy(), send: mock() })
    };
    cardServiceStub = stub(cardService, 'deleteCard').returns({ cardNumber: '4024007193092243' });
    await deleteCard(req, res);
    assert.calledWithExactly(cardServiceStub, req.body);
    assert.calledWith(res.status, 200);
    assert.calledOnce(res.status(200).send);
  });
  it('should get 500 error while deleting the card which is not present in db', async () => {
    const req = {
      body: {
        customerName: 'Test User',
        cardNumber: '4024007193092243',
        limit: 1000
      }
    };
    const res = {
      status: stub().returns({ end: spy(), send: mock() })
    };
    cardServiceStub = stub(cardService, 'deleteCard').throws({});
    await deleteCard(req, res);
    assert.calledWithExactly(cardServiceStub, req.body);
    assert.calledWith(res.status, 500);
    assert.calledOnce(res.status(500).send);
  });
});
