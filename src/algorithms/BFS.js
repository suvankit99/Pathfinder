const getGrid = (rows, cols) => {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      let node = {
        row: i,
        col: j,
        distance: Infinity,
        isStart: false,
        isFinish: false,
        isVisited: false,
      };
      row.push(node);
    }
    grid.push(row);
  }
  return grid;
};

let dr = [-1, 0, 1, 0];
let dc = [0, 1, 0, -1];
const bfs = (grid, startNode, endNode, rows, cols) => {
  // let unvisitedNodes = grid.slice();
  console.log(startNode);
  startNode.parentNode = startNode ;
  startNode.distance = 0;
  startNode.visited = true;
  console.log(startNode);
  let Q = [startNode];
  let visitedInorder = [startNode];
  while (Q.length !== 0) {
    let size = Q.length;
    for (let i = 0; i < size; i++) {
      let node = Q[0];
      let nodeRow = node.row;
      let nodeCol = node.col;
      let initDis = node.distance;
      Q.shift(); // same as q.pop()
      for (let k = 0; k < 4; k++) {
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
          grid[newRow][newCol].parentNode = node ;
          grid[newRow][newCol].distance = initDis + 1;
          visitedInorder.push(grid[newRow][newCol]);
          Q.push(grid[newRow][newCol]);
          if (newRow === endNode.row && newCol === endNode.col) {
            return visitedInorder;
          }
        }
      }
    }
  }
  return visitedInorder;
};

// const rows = 20;
// const cols = 60;
// const grid = getGrid(rows, cols);
// const startRow = 10;
// const startCol = 20;
// const endRow = 10;
// const endCol = 40;

// const startNode = grid[startRow][startCol];
// // console.log("startNode = " , startNode) ;
// const endNode = grid[endRow][endCol];
// // console.log("endNode = " , endNode) ;

// const visitedNodes = bfs(grid, startNode, endNode, rows, cols);

// console.log("number of nodes visited = ", visitedNodes.length);

module.exports = { bfs };
