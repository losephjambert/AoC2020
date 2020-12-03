import { readInput, transformNumber } from "../utils";
const input = readInput("2020", "1", transformNumber);

const findDiff = (input: number, sum: number) => sum - input;

function arrToTotal(arr: number[]): number | null {
  if (!arr.length) {
    return null;
  }

  return arr.reduce((a, b) => a * b, 1);
}

function partOne(input: number[], sum: number) {
  const lookupPairs = new Set();
  const pair = [];
  input.forEach(num => {
    const diff = findDiff(num, sum);
    if (lookupPairs.has(diff)) {
      pair.push(...[num, diff]);
    } else {
      lookupPairs.add(num);
    }
  });
  
  const total = arrToTotal(pair);
  console.log(total);
  return;
}

type TripleTuple = [number, number, number] | [];

function partTwo(input: number[], sum: number) {
  const lookupPairs = new Set();
  let triplet:TripleTuple= [];
  
  for (let i = 0; i < input.length; i++) {
    const num = input[i];
    const diff = findDiff(num, sum);
    
    for (let j = i + 1; j < input.length; j++) {
      const secondNum = input[j];
      const secondDiff = findDiff(secondNum, diff);
      if (lookupPairs.has(secondDiff)) {
        triplet = [num, secondNum, secondDiff];
        const total = arrToTotal(triplet);
        console.log(total);
        return;
      }
    }
      lookupPairs.add(num);
  }
  return null
}

partOne(input, 2020);
partTwo(input, 2020);