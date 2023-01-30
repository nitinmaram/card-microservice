
const isValidCustomerName = name => (name && typeof name === 'string' && name !== '');

const isValidLimit = limit => (limit !== undefined && typeof limit === 'number' && limit > 0)

// luhn check
export const isValidCard = (number) => {
  //convert into array of numeric digits and reverse it.
  let numArr = number?.split('')?.reverse()?.map(Number);

  //double the array's elements which are at odd index
  numArr = numArr?.map((n, i) => i % 2 === 1 ? (n * 2) > 9 ? (n * 2) - 9 : n * 2 : n);

  //find the sum of all the elements of the modified array
  const sum = numArr?.reduce((acc, curr) => {
    acc += curr
    return acc
  }, 0)

  //return true if the sum is divisible by 10
  return sum % 10 === 0
}

export const validateRequest = (req) => {
  const { customerName, cardNumber, limit } = req
  let errors = []
  if (!isValidCustomerName(customerName)) errors.push('customerName')
  if (!isValidLimit(limit)) errors.push('limit')
  if (!isValidCard(cardNumber)) errors.push('cardNumber')

  return errors

}