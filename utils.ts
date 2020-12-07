import request from "sync-request";
import { readFileSync, writeFileSync, existsSync, mkdir, mkdirSync } from "fs";

// Pull the Cookie header out of chrome and paste the value in authCookie.ts
import { AOC_AUTH_COOKIE } from "./authCookie";

export const transformIdentity = (i: string[]) => i;
export const transformNumber = (i: string[]) => i.map((n) => Number(n));
export const transformNumberList = (i: string[]) =>
  i.map((al) => transformNumber(al.split(",")));

export function getRawInput(year: string, day:string): string {
  let rawInput = readInputFromCache(day, year);
  if (rawInput == null) {
    rawInput = readInputFromWeb(day, year);
    writeInputToCache(day, year, rawInput);
  }
  return rawInput;
}

export function readInput<T>(
  year: string,
  day: string,
  transform?: (i: string[]) => T
): T {
  const rawInput = getRawInput(year, day);

  return transform(
    rawInput.split("\n").filter((l, i, a) => {
      if (l.length === 0) {
        console.log(`Warning empty line on ${i + 1} / ${a.length}`);
        return false;
      }
      return true;
    })
  );
}

export function readInputFromWeb(day: string, year: string = "2019") {
  const response = request(
    "GET",
    `https://adventofcode.com/${year}/day/${day}/input`,
    { headers: { cookie: AOC_AUTH_COOKIE } }
  );
  if (response.statusCode === 400) {
    throw new Error("Get a fresh cookie at ");
  }
  return response.body.toString();
}

function inputCacheFile(day: string, year: string) {
  const cacheDir = `${process.cwd()}/inputCache/${year}`;
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true });
  }
  return `${cacheDir}/day_${day}.input.txt`;
}

function readInputFromCache(day: string, year: string) {
  const file = inputCacheFile(day, year);
  return existsSync(file) ? readFileSync(file).toString() : null;
}

function writeInputToCache(day: string, year: string, input: string) {
  const filePath = inputCacheFile(day, year);
  writeFileSync(filePath, input);
}

export function pretty(obj: any) {
  return JSON.stringify(obj, null, 2);
}

export function sum(a: number[]): number {
  return a.reduce((p, n) => p + n, 0);
}