
let dr = [-1, 0, 1, 0];
let dc = [0, 1, 0, -1];
const dfs = (currentNode , grid, endNode, rows, cols , visitedInorder) => {
    visitedInorder.push(currentNode) ;
    if(currentNode === endNode){
        return true ;
    }
    for(let k = 0 ; k < 4 ; k++){
        let newRow = currentNode.row + dr[k] ;
        let newCol = currentNode.col + dc[k] ;
        if(newRow < rows && newRow >= 0 && newCol < cols && newCol >= 0 && !grid[newRow][newCol].isWall && !visitedInorder.includes(grid[newRow][newCol])){
            grid[newRow][newCol].parentNode = currentNode ;
            if(dfs(grid[newRow][newCol] , grid , endNode , rows , cols , visitedInorder)){
                return true ;
            }
        }
    }
    return false ;
}


  const getShortestPath = (endNode) => {
    let path = [];
    let node = endNode;
    while (node.parentNode !== node) {
      path.push(node);
      node = node.parentNode;
    }
    path.push(node);
    return path.reverse();
  };

// const rows = 20;
// const cols = 60;
// const grid = getGrid(rows, cols);
// const startRow = 15;
// const startCol = 10;
// const endRow = 10;
// const endCol = 10;

// const startNode = grid[startRow][startCol];
// console.log("startNode = " , startNode) ;
// const endNode = grid[endRow][endCol];
// console.log("endNode = " , endNode) ;

// let visitedInorder = [] ;
// startNode.parentNode = startNode ;

// dfs(startNode , grid, endNode, rows, cols , visitedInorder);

// console.log("number of nodes visited = ", visitedInorder.length);
  
// const path = getShortestPath(endNode) ;
// console.log("path length = " , path.length) ;

module.exports = {dfs}