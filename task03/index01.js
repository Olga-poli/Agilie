const fs = require('fs');
const {
  data: {
    subtask01: {
      allowedDiscs,
      recordWeight
    }
  }
} = JSON.parse(fs.readFileSync('./input.json'));

const IbsToKgCoefficient = 0.45359237;
const allAllowedDiscs = [
  ...allowedDiscs.metric,
  ...allowedDiscs.imperial.map(weight => weight * IbsToKgCoefficient)
];
const discsSet = [];

const getSetSum = discsSet => {
  const barWeight = 20;
  return barWeight + (
    discsSet.reduce((accumulator, currentValue) => accumulator + currentValue, 0) * 2
  );
}

const getOptimalDiscs = (recordWeight, discsSet) => {
  const discsCount = discsSet.length * 2;
  const currentWeight = getSetSum(discsSet);

  if (currentWeight > recordWeight) return discsSet;

  if (discsCount === 24 ) return currentWeight > recordWeight ? discsSet : [Infinity];

  let probableSets = [...allAllowedDiscs
    .filter(item => !discsSet.includes(item))
    .filter(item => discsSet.length === 0 || item <= discsSet[discsSet.length - 1])
    .map(item => getOptimalDiscs(recordWeight, [...discsSet, item]))];

  return probableSets.reduce((accumulator, currentValue, index, array) => {
    const currentSum = getSetSum(currentValue);
    if (currentSum < getSetSum(accumulator)) {
      return currentValue;
    }
    return accumulator;
  }, [Infinity]);
};

const result = getOptimalDiscs(recordWeight, discsSet);
const convertedSet = (arr) => arr.map(item => {
  if (allowedDiscs.metric.includes(item)) {
    return `${item} kg`;
  } else {
    return `${item / IbsToKgCoefficient} pounds`
  }
});
const outputData = {
  newRecordWeight: getSetSum(result),
  discsSet: convertedSet(result)
};

fs.writeFile('output.json', JSON.stringify({ subtask01: { result: outputData } }, null, ' '), function (err) {
  if (err) throw err;
  console.log(`Result '${outputData.newRecordWeight} kg' is saved.`);
});
