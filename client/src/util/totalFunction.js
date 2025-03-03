export const calculatetotalAmount = (amounts) => {
  return amounts.reduce((sum, amount) => sum + amount, 0);
};
