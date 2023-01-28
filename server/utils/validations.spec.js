import { expect } from 'chai';
import { validateRequest } from './validations.js';

describe('Validate Card Request', () => {
  it('Should return error array with customerName, cardNumber & limit when empty request is passed', (done) => {
    expect(validateRequest({})).to.be.an("array").to.have.length(3);
    expect(validateRequest({})).to.include.members(['customerName', 'cardNumber', 'limit']);
    done();
  });
  it('Should return empty error array when valid card request is passed', (done) => {
    const validRequest = { customerName: 'Test User', cardNumber: '5574130084175298', limit: 100 }
    expect(validateRequest(validRequest)).to.be.an("array").that.is.empty;
    done();
  });
  it('Should return cardNumber in error array when card number is less than 12 digits or greater than 19 digits', (done) => {
    const smallCardNoRequest = { customerName: 'Test User', cardNumber: '11111111', limit: 100 }
    const bigCardNoRequest = { customerName: 'Test User', cardNumber: '1111111111111111111111111111111111111', limit: 100 }
    expect(validateRequest(smallCardNoRequest)).to.have.length(1);
    expect(validateRequest(smallCardNoRequest)).to.include.members(['cardNumber']);
    expect(validateRequest(bigCardNoRequest)).to.include.members(['cardNumber']);
    done();
  });
  it('Should return cardNumber in error array when invalid card number is passed', (done) => {
    const invalidCardRequest = { customerName: 'Test User', cardNumber: '11111111111111111', limit: 100 }
    expect(validateRequest(invalidCardRequest)).to.have.length(1);
    expect(validateRequest(invalidCardRequest)).to.include.members(['cardNumber']);
    done();
  });
  it('Should return limit in error array when invalid limit is passed', (done) => {
    const req = {customerName: 'Test User', cardNumber: '5574130084175298'}
    const invalidLimits = ['xyz', -100, '$%888']
    for (const limit of invalidLimits) {
      expect(validateRequest({...req, limit})).to.have.length(1);
      expect(validateRequest({...req, limit})).to.include.members(['limit']);
    }
    done();
  });
  it('Should return customerName in error array when invalid customerName is passed', (done) => {
    const req = { cardNumber: '5574130084175298', limit: 100 }
    const invalidCustomerNames = ['', 123, true]
    for (const customerName of invalidCustomerNames) {
      expect(validateRequest({...req, customerName})).to.have.length(1);
      expect(validateRequest({...req, customerName})).to.include.members(['customerName']);
    }
    done();
  });
});
