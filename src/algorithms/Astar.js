const getGrid = (rows, cols) => {
    let grid = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        let node = {
          row: i,
          col: j,
          weight : 1 ,
          distance: Infinity,
          isStart: false,
          isFinish: false,
          isVisited: false,
          isWall : false ,
          parentNode : {} ,
          isPathNode : false 

        };
        row.push(node);
      }
      grid.push(row);
    }
    return grid;
  };


// let dr = [-1, -1, 0, 1, 1, 1, 0, -1];
// let dc = [0, 1, 1, 1, 0, -1, -1, -1];

let dr = [-1, 0, 1, 0];
let dc = [0, 1, 0, -1];

const f = (node, startNode , endNode) => {
  if (node === startNode) {
    return 0;
  }
  return g(node) + heuristic(node , endNode) ;
};

const g = (node) => {
    return node.distance ;
};

const heuristic = (node , endNode) => {
    const deltaX = Math.abs(node.row - endNode.row) ;
    const deltaY = Math.abs(node.col - endNode.col) ;
    const manHattanDistance = node.weight * (deltaX + deltaY);
    return manHattanDistance ;
};

const Astar = (grid, startNode, endNode, rows, cols) => {
  let result = {
    visitedNodes : [] ,
    reachedGoal : false 
  }
  startNode.parentNode = startNode;
  startNode.distance = 0;
  startNode.visited = true;
  console.log(startNode);
  let Q = [startNode];
  let visitedInorder = [startNode];
  while (Q.length !== 0) {
    Q.sort(function (a, b) {
      return f(a , startNode, endNode) - f(b , startNode , endNode);
    });
    let node = Q[0];
    let nodeRow = node.row;
    let nodeCol = node.col;
    let initDis = node.distance;
    Q.shift(); // same as q.pop()
    for (let k = 0; k < dr.length ; k++) {
      let newRow = nodeRow + dr[k];
      let newCol = nodeCol + dc[k];
      if (
        newRow < rows &&
        newRow >= 0 &&
        newCol < cols &&
        newCol >= 0 &&
        !visitedInorder.includes(grid[newRow][newCol])
      ) {
        if (grid[newRow][newCol].isWall) {
          continue;
        }
        grid[newRow][newCol].parentNode = node;
        grid[newRow][newCol].distance = initDis + grid[newRow][newCol].weight;
        visitedInorder.push(grid[newRow][newCol]);
        Q.push(grid[newRow][newCol]);
        if (newRow === endNode.row && newCol === endNode.col) {
            result.visitedNodes = visitedInorder ;
            result.reachedGoal = true ;
            return result ;
        }
      }
    }
  }
  result.visitedNodes = visitedInorder ;
  return result ;
};


const rows = 20;
const cols = 60;
const grid = getGrid(rows, cols);
const startRow = 10;
const startCol = 20;
const endRow = 10;
const endCol = 40;

const startNode = grid[startRow][startCol];
startNode.parentNode = startNode ;
// console.log("startNode = " , startNode) ;
const endNode = grid[endRow][endCol];
// console.log("endNode = " , endNode) ;

const {visitedNodes} = Astar(grid, startNode, endNode, rows, cols);

console.log("number of nodes visited = ", visitedNodes.length);

module.exports = Astar;
