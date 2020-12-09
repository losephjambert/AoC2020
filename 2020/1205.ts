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
// const rows = new Array<number[]>(128);
// const column = new Array<number>(8);

// for(let i = 0; i < column.length; i++) {
//   column[i] = 0;
// }
// for(let i = 0; i < rows.length; i++) {
//   rows[i] = column;
// }

const seatSearchMap = {
  F: (start: number, end: number) => [start, Math.floor((start+end)/2)],
  B: (start: number, end: number) => [Math.floor((start+end)/2), end],
  L: (start: number, end: number) => [start, Math.floor((start+end)/2)],
  R: (start: number, end: number) => [Math.floor((start+end)/2), end],
}

// BFFFBBFRRR: row 70, column 7, seat ID 567.
const testInput = 'BFFFBBFRRR';

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
const findSeatId = (input: string): number => {
  const rows = input.slice(0, input.length - 3);
  const cols = input.slice(input.length - 3);
  const row = processSeatCode(rows, 0, 127);
  const col = processSeatCode(cols, 0, 7);
  const seatId = (row * 8) + col;
  return seatId;
};

const seatIds = input.map(id => findSeatId(id));
const highestSeatId = seatIds.sort((a,b) => b - a)[0];
console.log(highestSeatId);