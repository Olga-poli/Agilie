const fs = require('fs');
const {
  data: {
    firstPlayerNumber,
    secondPlayerNumber
  }
} = JSON.parse(fs.readFileSync('./input.json'));

const multiply = num => num * 2;
const add = num => Number(num.toString() + 1);

const isTransformable = (s, firstPlayerNumber, secondPlayerNumber) => {
  if (firstPlayerNumber === secondPlayerNumber) return true;
  if (firstPlayerNumber > secondPlayerNumber) return false;

  return isTransformable(s+'*', multiply(firstPlayerNumber), secondPlayerNumber)
    || isTransformable(s+'*', add(firstPlayerNumber), secondPlayerNumber);
};

const result = isTransformable('', firstPlayerNumber, secondPlayerNumber);

fs.writeFile('output.json', JSON.stringify({ result }, null, ' '), function (err) {
  if (err) throw err;
  console.log(`Result '${result}' is saved.`);
});
