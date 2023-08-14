const getGrid = (rows, cols) => {
    let grid = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        let node = {
          row: i,
          col: j,
          weight : 0 ,
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

module.exports = {getGrid}