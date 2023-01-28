
const isValidCustomerName = name => (name && typeof name === 'string' && name !== '');

const isValidLimit = limit => (limit !== undefined && typeof limit === 'number' && limit > 0)

export const isValidCard = (number) => {
  let d = 0;
  let e = false; // e = even = n-th digit counted from the end
  let arr = number?.split("")
  //check if credit card has 13 to 19 digits
  if (arr?.length > 12 && arr?.length < 20) {
    //luhn check
    return (arr.reverse().reduce(
      (s, dstr) => {
        d = parseInt(dstr); // reduce arg-0 - callback fnc
        return (s + ((e = !e) ? d : [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][d]));
      } // /end of callback fnc
      , 0 // reduce arg-1 - prev number for first iteration (sum)
    ) % 10 == 0
    );
  }
}

export const validateRequest = (req) => {
  const { customerName, cardNumber, limit } = req
  let errors = []
  if (!isValidCustomerName(customerName)) errors.push('customerName')
  if (!isValidLimit(limit)) errors.push('limit')
  if (!isValidCard(cardNumber)) errors.push('cardNumber')

  return errors

}