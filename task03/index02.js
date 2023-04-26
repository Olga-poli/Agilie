const fs = require('fs');
const { data: { subtask02: {
  availableShirts, sizesNeeded
} } } = JSON.parse(fs.readFileSync('./input.json'));

const getShirts = (availableShirts, sizesNeeded, index) => {
  if (index === sizesNeeded.length) return sizesNeeded;

  const currentPlayerSizes = sizesNeeded[index];
  for (let size of currentPlayerSizes) {
    const availableShirtIndex = availableShirts.findIndex((shirt) =>
      shirt.name === size && shirt.amount > 0
    );

    if (availableShirtIndex >= 0) {
      const remainingAvailableShirts = [...availableShirts];
      remainingAvailableShirts[availableShirtIndex] = {
        ...remainingAvailableShirts[availableShirtIndex],
        amount: remainingAvailableShirts[availableShirtIndex].amount - 1
      };

      sizesNeeded[index] = size;
      if (getShirts(remainingAvailableShirts, sizesNeeded, index + 1)) return sizesNeeded;
    }
  }

  return false;
};

const result = getShirts(availableShirts, sizesNeeded, 0);
const outputData = JSON.parse(fs.readFileSync('./output.json'));

fs.writeFile('output.json', JSON.stringify({ ...outputData, subtask02: { result } }, null, ' '), function (err) {
  if (err) throw err;
  console.log(`Result '${result}' is saved.`, result);
});
