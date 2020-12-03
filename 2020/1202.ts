import { readInput, transformIdentity } from "../utils";
const input = readInput("2020", "2", transformIdentity);

interface Password {
  rule: Rule;
  password: string;
}

interface Rule {
  min: number;
  max: number;
  letter: string;
}

function parsePassword(input: string) {
  const tuple = input.split(': ');
  const [rule, password] = tuple;
  return {
    rule: parseRule(rule),
    password: password.toUpperCase()
  }
}

function parseRule(input: string) {
  const tuple = input.split(' ');
  const [frequency, letter] = tuple;
  const range = frequency.split('-');
  const [min, max] = range;
  return {
    min: Number(min),
    max: Number(max),
    letter: letter.toUpperCase()
  }
}

const validatePassword = (input: Password) => {
  const keyFrequency = input.password.split('').filter(letter => letter === input.rule.letter);
  return keyFrequency.length >= input.rule.min && keyFrequency.length <= input.rule.max;
}

const validateTobboganPassword = (input: Password) => {
  // Tobbogan Corp doesn't index at 0, they index at 1
  const splitPassword = input.password.split('');
  const index1 = input.rule.min - 1;
  const index2 = input.rule.max - 1;
  const freq1 = splitPassword[index1] === input.rule.letter;
  const freq2 = splitPassword[index2] === input.rule.letter;
  return (freq1 && freq2 || !freq1 && !freq2) ? false : true;
}

function validatePasswords(input: string[], validator: (input: Password) => boolean) {
  const parsed = input.map(password => parsePassword(password));
  const validated = parsed.map(p => validator(p)).filter(valid => valid === true);
  console.log(validated.length);
  return;
}

const partOne = (input: string[]) => validatePasswords(input, validatePassword);
const partTwo = (input: string[]) => validatePasswords(input, validateTobboganPassword);

partOne(input);
partTwo(input);