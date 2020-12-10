import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import { readInput, transformIdentity } from "../utils";
const input = readInput("2020", "5", transformIdentity);

/**
The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

For example, consider just the first seven characters of FBFBBFFRLR:

Start by considering the whole range, rows 0 through 127.
F means to take the lower half, keeping rows 0 through 63.
B means to take the upper half, keeping rows 32 through 63.
F means to take the lower half, keeping rows 32 through 47.
B means to take the upper half, keeping rows 40 through 47.
B keeps rows 44 through 47.
F keeps rows 44 through 45.
The final F keeps the lower of the two, row 44.
The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.

For example, consider just the last 3 characters of FBFBBFFRLR:

Start by considering the whole range, columns 0 through 7.
R means to take the upper half, keeping columns 4 through 7.
L means to take the lower half, keeping columns 4 through 5.
The final R keeps the upper of the two, column 5.
So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.

Every seat also has a unique seat ID: multiply the row by 8, then add the column. In this example, the seat has ID 44 * 8 + 5 = 357.
**/

/** */

const seatSearchMap = {
  F: (start: number, end: number) => [start, Math.floor((start+end)/2)],
  B: (start: number, end: number) => [Math.floor((start+end)/2), end],
  L: (start: number, end: number) => [start, Math.floor((start+end)/2)],
  R: (start: number, end: number) => [Math.floor((start+end)/2), end],
}

// BFFFBBFRRR: row 70, column 7, seat ID 567.
// FFFBBBFRRR: row 14, column 7, seat ID 119.
// BBFFBBFRLL: row 102, column 4, seat ID 820.

const testInputs = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];
const processSingleInput = (input: string, start: number, end: number): number[] => seatSearchMap[input](start, end);
const processSeatCode = (input: string, min: number, max: number) => {
  for(let i = 0; i < input.length; i++) {
    const letter = input[i];
    const [start, end] = processSingleInput(letter, min, max);

    if (end - start <= 1) {
      return letter === 'B' || 'R' ? end : start;
    }

    return processSeatCode(input.slice(i + 1), start, end);
  }

  return;
}
const findSeatId = (row: number, col: number): number => {
  return (row * 8) + col;
};

const findSeatLocation = (input: string): number[] => {
  const rows = input.slice(0, input.length - 3);
  const cols = input.slice(input.length - 3);
  const row = processSeatCode(rows, 0, 127);
  const col = processSeatCode(cols, 0, 7);
  return [row, col];
}

const seatIds = input.map(id => {
  const [row, col] = findSeatLocation(id);
  return findSeatId(row, col);
});
const highestSeatId = seatIds.sort((a,b) => b - a)[0];
// console.log(highestSeatId);

// Part Two
const createSeatMap = (input: string[]): { [key: string]: number[] } => {
  const seatMap = {};
  for (let i = 0; i < 128; i++) {
    seatMap[i] = new Array(8);
  }

  input.forEach(boardingPass => {
    const [row, col] = findSeatLocation(boardingPass);
    const seatId = findSeatId(row, col)
    seatMap[row][col] = seatId;
  });

  return seatMap;
};

const findMySeatId = (input: string[]): number => {
  const seatMap = createSeatMap(input);
  const ids = [];
  for (const row in seatMap) {
    const seatRow = seatMap[row];
    const isEmpty = (list: any[]) => !Object.keys(list).length;
    if (!isEmpty(seatRow)) {
      console.log(seatRow, row);
      const filtered = seatRow.filter(item => item != null)
      ids.push(...filtered)
    }
  }

  console.log(ids);

  return 0;
};

findMySeatId(input);

console.log(findSeatId(69,7));