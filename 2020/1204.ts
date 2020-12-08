import { getRawInput } from "../utils";
const input = getRawInput("2020", "4");

/**

The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:

byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)
 
**/

/**
 * Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?
*/

interface Passport {
  byr: string;
  iyr: string;
  eyr: string;
  hgt: string;
  hcl: string;
  ecl: string;
  pid: string;
  cid: string;
}

type Validator = 1 | 0;

const validatePassport = (passport: Passport):Validator => {
  for(const key in passport) {
    if(key !== 'cid' && !passport[key]) {
      return 0
    }
  }
  return 1;
}

const validatePassportStrict = (passport: Passport):Validator => {
  for(const key in passport) {
    if(!validateFactory[key](`${key}:${passport[key]}`)) {
      return 0;
    }
  }
  return 1;
}

const transformInputToPassport = (input:string): Passport => {
  const passport: Passport = {
    byr: '',
    iyr: '',
    eyr: '',
    hgt: '',
    hcl: '',
    ecl: '',
    pid: '',
    cid: '',
  };

  const passPortKeySet = new Set(Object.keys(passport))
  input.split(' ').forEach(pair => {
    const [key, value] = pair.split(':');
    if(passPortKeySet.has(key)) {
      passport[key] = value;
    }
  });

  return passport;
}

const transformPassports = (input: string): string[] => {
   return input.split(/\n/).join(' ').split('  ');
}

const filterPassports = (input: string[]): Passport[] => {
  return input.map(passport =>
    transformInputToPassport(passport))
    .filter(passport => !!validatePassport(passport));
}

const partOne = (input: string): number => {
  console.log(
    filterPassports(transformPassports(input)).length
    );
    
    return;
  }

// partOne(input);
// console.log(transformPassports(input));

/**
 * Part Two (unsolved)
 * 
 * Validation Rules
  byr (Birth Year) - four digits; at least 1920 and at most 2002.
  iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
  hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  pid (Passport ID) - a nine-digit number, including leading zeroes.
  cid (Country ID) - ignored, missing or not.
 */

type NumberValidationRange = [number, number];
interface NumberValidation {
  pivot: number;
  range: NumberValidationRange;
}

interface NumberValidationRanges {
  [index: string]: NumberValidationRange;
}
const NUMBER_VALIDATION_RANGES: NumberValidationRanges = {
  cm:  [150, 193],
  in:  [59, 76],
  byr: [1920, 2002],
  iyr: [2010, 2020],
  eyr: [2020, 2030],

}
const eyeColors = new Set(...['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);

const checkRange = (key: string, obj: NumberValidationRanges): NumberValidationRange | undefined => obj[key];
const validateRange = (input: NumberValidation): boolean => {
  return input.pivot >= input.range[0] && input.pivot <= input.range[1];
};

// input type iyr:2010
const parseYear = (input:string): boolean => {
  const [key, pivot] = input.split(':');
  const range: NumberValidationRange = checkRange(key, NUMBER_VALIDATION_RANGES);
  return validateRange({pivot: Number(pivot), range,}) || false;
}

const parseHeight = (input: string): boolean => {
  const [_, value] = input.split(':');
  const key = value.slice(value.length - 2);
  const pivot = value.slice(0, value.length - 2);
  const range: NumberValidationRange = checkRange(key, NUMBER_VALIDATION_RANGES);
  if(range == null) return false;
  return validateRange({pivot: Number(pivot), range,}) || false;
}

const parseInput = (input: string): string[] => {
  return input.split(':');
}

const validateHcl = (input: string): boolean => {
  const [_, value] = parseInput(input);
  return value[0] === '#' && value.slice(1).length === 6
}

const validateEcl = (input: string): boolean => {
  const [_, value] = parseInput(input);
  return value.length === 3 && eyeColors.has(value)
}

const validatePid = (input: string): boolean => {
  const [_, value] = parseInput(input);
  return !isNaN(Number(value)) && value.split('').length === 9
}

const validateFactory = {
  byr: (input: string) => parseYear(input),
  iyr: (input: string) => parseYear(input),
  eyr: (input: string) => parseYear(input),
  hgt: (input: string) => parseHeight(input),
  hcl: (input: string) => validateHcl(input),
  ecl: (input: string) => validateEcl(input),
  pid: (input: string) => validatePid(input),
  cid: (_input: string) => true,
}

const filterPassportsPartTwo = (input: string[]): Passport[] => {
  console.log(input.length);
  return input.map(passport =>
    transformInputToPassport(passport))
    .filter(passport => !!validatePassport(passport))
    .filter(passport => !!validatePassportStrict(passport));
}

const partTwo = (input: string): number => {
  const filtered = filterPassportsPartTwo(transformPassports(input));
  console.log(filtered.length);
  return;
}

partTwo(input);