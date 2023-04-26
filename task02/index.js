const fs = require('fs');
const { data: array } = JSON.parse(fs.readFileSync('./input.json'));

const findDuplicate = (array) => {
  for (let index = 0; index < array.length; index++) {
    const numericalElementValue = Math.abs(array[index]);
    if (array[numericalElementValue] < 0) return numericalElementValue;

    array[numericalElementValue] = array[numericalElementValue] * (-1);
  }

  return 'No duplicates found.';
};

const result = findDuplicate(array);

fs.writeFile('output.json', JSON.stringify({ result }, null, ' '), function (err) {
  if (err) throw err;
  console.log(`Result '${result}' is saved.`);
});
