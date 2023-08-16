let dr = [-1, 0, 1, 0];
let dc = [0, 1, 0, -1];
const djikstra = (grid, startNode, endNode, rows, cols) => {
  startNode.parentNode = startNode;
  startNode.distance = 0;
  startNode.visited = true;
  console.log(startNode);
  let Q = [startNode];
  let visitedInorder = [startNode];
  while (Q.length !== 0) {
    Q.sort(function (a, b) {
      return a.weight - b.weight;
    });
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
        grid[newRow][newCol].parentNode = node;
        grid[newRow][newCol].distance = initDis + 1;
        visitedInorder.push(grid[newRow][newCol]);
        Q.push(grid[newRow][newCol]);
        if (newRow === endNode.row && newCol === endNode.col) {
          return visitedInorder;
        }
      }
    }
  }
  return visitedInorder;
};

module.exports = djikstra;
