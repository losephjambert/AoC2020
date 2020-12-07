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

// right 3, down 1

const countTrees = (map: string[], currentPosition:Coord, treeCount = 0):number => {
  const [x,y] = currentPosition;
  const nextX = walkHorizontal(map[y], x, 3);
  const nextY = walkVertical(y,1,map[y+1]);

  if(nextY == null) {
    console.log(treeCount);
    return;
  }

  const terrainKey = map[nextY][nextX];

  return countTrees(map, [nextX, nextY], treeCount + terrain.indexOf(terrainKey));
}

// Part One
countTrees(input, [0,0]);
