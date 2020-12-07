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

partOne(input);