
let dr = [-1, 0, 1, 0];
let dc = [0, 1, 0, -1];

const bfs = (grid, startNode, endNode, rows, cols) => {
  let result = {
    visitedNodes : [] ,
    reachedGoal : false 
  }
  startNode.parentNode = startNode ;
  startNode.distance = 0;
  startNode.visited = true;
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
            result.visitedNodes = visitedInorder ;
            result.reachedGoal = true ;
            return result ;
          }
        }
      }
    }
  }
  result.visitedNodes = visitedInorder ;
  return result ;
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
