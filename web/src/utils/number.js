const leadingZero = number => {
  let newNumber = number;
  if (newNumber > 0 && newNumber < 10) {
    newNumber = `0${newNumber}`;
  }
  return newNumber;
};

export default leadingZero;
