import { readInput, transformIdentity } from "../utils";
const input = readInput("2020", "3", transformIdentity);

type Coord = [number, number];
const terrain = ['.', '#'];

const walkHorizontal = (map: string, startIndex: number, distance: number): number => {
  
  const terminus = map.length;
  const travelled = startIndex + distance;

  return travelled >= terminus ? travelled - terminus : travelled;
}

const walkVertical = (startIndex: number, distance: number, nextMap:string,): number | null => {
  if (nextMap == null) {
    return null;
  }

  return startIndex + distance;
}

const countTrees = (map: string[], currentPosition:Coord, direction: Coord, treeCount = 0):number => {
  const [x,y] = currentPosition;
  const [over, down] = direction;
  const nextX = walkHorizontal(map[y], x, over);
  const nextY = walkVertical(y, down, map[y + down]);

  if(nextY == null) {
    return treeCount;
  }

  const terrainKey = map[nextY][nextX];

  return countTrees(map, [nextX, nextY], direction, treeCount + terrain.indexOf(terrainKey));
}

// Part One
// countTrees(input, [0,0], [3,1]);

// Part Two
// Right 1, down 1.
// Right 3, down 1.
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.

const directions: Coord[] = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2],
];

const partTwo = (map: string[], directions: Coord[]): number => {
  return directions.reduce((prev, direction): number => (countTrees(map, [0,0], direction) * prev), 1);
};

const partTwoSolution = partTwo(input, directions);
console.log(partTwoSolution);