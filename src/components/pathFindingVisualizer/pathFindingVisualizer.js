import React, { useEffect } from "react";
import Node from "../Node/Node";
import { useState } from "react";
import {
  Box,
  Center,
  Checkbox,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { bfs } from "../../algorithms/BFS";
import { getGrid } from "../utility/getGrid";
import djikstra from "../../algorithms/Djikstra";
import InfoHeader from "../InfoHeader/InfoHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWeightHanging,
  faCircleNodes,
  faRoute
} from "@fortawesome/free-solid-svg-icons";
import { dfs } from "../../algorithms/DFS";
import { useToast } from "@chakra-ui/react";
import Astar from "../../algorithms/Astar";
import { ChevronDownIcon } from "@chakra-ui/icons";

const rows = 18;
const cols = 60;

const PathFindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [startRow, setstartRow] = useState(5);
  const [startCol, setstartCol] = useState(18);
  const [endRow, setendRow] = useState(10);
  const [endCol, setendCol] = useState(40);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reset, setReset] = useState(false);
  const [isDragStart, setIsDragStart] = useState(false);
  const [addWeights, setAddWeights] = useState(false);
  const [algorithm, setalgorithm] = useState("");
  const [isDragEnd, setisDragEnd] = useState(false);
  const [visualizeButtonText, setvisualizeButtonText] = useState("Visualize");
  const toast = useToast();

  const animateAlgorithm = (visitedNodes) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        node.isVisited = true;
        const newGrid = grid.slice();
        newGrid[node.row][node.col] = node;
        setGrid(newGrid);
      }, 10 * (i + 1));
    }
  };

  const animateShortestPath = (path, initialTime) => {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        node.isPathNode = true;
        const newGrid = grid.slice();
        newGrid[node.row][node.col] = node;
        setGrid(newGrid);
      }, initialTime + 25 * i);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, initialTime + 25 * path.length + 1);
  };
  const visualizeDjikstra = (grid, startNode, endNode, rows, cols) => {
    setIsAnimating(true);
    const { visitedNodes, reachedGoal } = djikstra(
      grid,
      startNode,
      endNode,
      rows,
      cols
    );
    animateAlgorithm(visitedNodes);
    if (reachedGoal) {
      const shortestPath = getShortestPath(endNode);
      animateShortestPath(shortestPath, visitedNodes.length * 10 + 100);
    } else {
      setTimeout(() => {
        toast({
          title: "There is no path to reach finish node",
          duration: 2500,
          status: "info",
          isClosable: true,
        });
      }, visitedNodes.length * 10 + 100);
    }
  };
  const visualizeBfs = (grid, startNode, endNode, rows, cols) => {
    setIsAnimating(true);
    const { visitedNodes, reachedGoal } = bfs(
      grid,
      startNode,
      endNode,
      rows,
      cols
    );
    animateAlgorithm(visitedNodes);
    if (reachedGoal) {
      const shortestPath = getShortestPath(endNode);
      animateShortestPath(shortestPath, visitedNodes.length * 10 + 100);
    } else {
      setTimeout(() => {
        toast({
          title: "There is no path to reach finish node",
          duration: 2500,
          status: "info",
          isClosable: true,
        });
      }, visitedNodes.length * 10 + 100);
    }
  };
  const visualizeDfs = (grid, startNode, endNode, rows, cols) => {
    setIsAnimating(true);
    let visitedNodes = [];
    // set parent of startnode to be himself
    startNode.parentNode = startNode;
    const reachedGoal = dfs(startNode, grid, endNode, rows, cols, visitedNodes);
    animateAlgorithm(visitedNodes);
    if (reachedGoal) {
      const shortestPath = getShortestPath(endNode);
      animateShortestPath(shortestPath, visitedNodes.length * 10 + 100);
    } else {
      setTimeout(() => {
        toast({
          title: "There is no path to reach finish node",
          duration: 2500,
          status: "info",
          isClosable: true,
        });
      }, visitedNodes.length * 10 + 100);
    }
  };
  const visualizeAstar = (grid, startNode, endNode, rows, cols) => {
    setIsAnimating(true);
    const { visitedNodes, reachedGoal } = Astar(
      grid,
      startNode,
      endNode,
      rows,
      cols
    );
    animateAlgorithm(visitedNodes);
    if (reachedGoal) {
      const shortestPath = getShortestPath(endNode);
      animateShortestPath(shortestPath, visitedNodes.length * 10 + 100);
    } else {
      setTimeout(() => {
        toast({
          title: "There is no path to reach finish node",
          duration: 2500,
          status: "info",
          isClosable: true,
        });
      }, visitedNodes.length * 10 + 100);
    }
  };
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
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = grid[row][col];
    if (isDragStart) {
      setstartRow(row);
      setstartCol(col);
      return grid;
    } else if (isDragEnd) {
      setendRow(row);
      setendCol(col);
    }
    if (isDragStart || isDragEnd) return grid;
    // add weights
    else if (
      addWeights &&
      node.weight === 1 &&
      !(row === startRow && col === startCol) &&
      !(row === endRow && col === endCol)
    ) {
      node.weight = 5;
    } else if (
      node.weight === 1 &&
      !(row === startRow && col === startCol) &&
      !(row === endRow && col === endCol)
    ) {
      node.isWall = true;
    }

    newGrid[row][col] = node;
    return newGrid;
  };
  const handleMouseDown = (row, col) => {
    if (isAnimating) return;
    if (row === startRow && col === startCol) {
      setIsDragStart(true);
    } else if (row === endRow && col === endCol) {
      setisDragEnd(true);
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setIsMousePressed(true);
    setGrid(newGrid);
  };

  const handleMouseUp = (row, col) => {
    if (isDragStart) {
      setstartRow(row);
      setstartCol(col);
      setIsDragStart(false);
    } else if (isDragEnd) {
      setendRow(row);
      setendCol(col);
      setisDragEnd(false);
    }
    setIsMousePressed(false);
  };

  const handleMouseEnter = (row, col) => {
    // if (isAnimating) return;
    if (!isMousePressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setIsMousePressed(true);
    setGrid(newGrid);
  };

  const handleAddWeights = () => {
    setAddWeights(!addWeights);
  };

  const handleClick = (row, col) => {
    // handleMouseDown(row , col) ;
    // handleMouseUp(row , col) ;
  };

  const selectAlgorithm = () => {
    if (algorithm === "BFS") {
      visualizeBfs(
        grid,
        grid[startRow][startCol],
        grid[endRow][endCol],
        rows,
        cols
      );
    } else if (algorithm === "DFS") {
      visualizeDfs(
        grid,
        grid[startRow][startCol],
        grid[endRow][endCol],
        rows,
        cols
      );
    } else if (algorithm === "Djikstra") {
      visualizeDjikstra(
        grid,
        grid[startRow][startCol],
        grid[endRow][endCol],
        rows,
        cols
      );
    } else if (algorithm === "A* search") {
      visualizeAstar(
        grid,
        grid[startRow][startCol],
        grid[endRow][endCol],
        rows,
        cols
      );
    } else {
      setvisualizeButtonText("Pick an algorithm !");
    }
  };
  useEffect(() => {
    setGrid(getGrid(rows, cols));
  }, [reset]);

  return (
    <>
      {/* header section */}
      <Box backgroundColor={"#393E46"} marginBottom={"20px"}>
        <Heading
          display={"flex"}
          gap={"20px"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          cursor={"pointer"}
          marginTop={"0px"}
          paddingTop={"10px"}
          color={"white"}
          fontFamily={"sans-serif"}
          fontWeight={"bold"}
          onClick={() => {
            setReset(!reset);
          }}
        >
          Pathfinder
          <FontAwesomeIcon icon={faCircleNodes} spin size="sm" />
        </Heading>
        <Box display={"flex"} justifyContent={"center"} gap={"40px"}>
          <Menu>
            <MenuButton
              marginTop={"20px"}
              marginBottom={"30px"}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Algorithms
            </MenuButton>
            <MenuList>
              <MenuItem
                as={Button}
                onClick={() => {
                  setReset(!reset);
                  setalgorithm("A* search");
                  setvisualizeButtonText("Visualize A* search");
                }}
              >
                A* search
              </MenuItem>
              <MenuItem
                as={Button}
                onClick={() => {
                  setReset(!reset);
                  setalgorithm("Djikstra");
                  setvisualizeButtonText("Visualize Djikstra");
                }}
              >
                Djikstra
              </MenuItem>
              <MenuItem
                as={Button}
                onClick={() => {
                  setReset(!reset);
                  setalgorithm("BFS");
                  setvisualizeButtonText("Visualize BFS");
                }}
              >
                <div>Breadth First Search</div>
              </MenuItem>
              <MenuItem
                as={Button}
                onClick={() => {
                  setReset(!reset);
                  setalgorithm("DFS");
                  setvisualizeButtonText("Visualize DFS");
                }}
              >
                <div>Depth First Search</div>
              </MenuItem>
            </MenuList>
          </Menu>
          <Checkbox
            marginTop={"20px"}
            marginBottom={"30px"}
            onChange={handleAddWeights}
          >
            <Text
              fontFamily={"sans-serif"}
              fontWeight={"normal"}
              color={"white"}
            >
              Add weights
            </Text>
          </Checkbox>
          <Button
            marginTop={"20px"}
            marginBottom={"30px"}
            colorScheme="teal"
            onClick={() => {
              selectAlgorithm();
            }}
          >
            {" "}
            {visualizeButtonText}
          </Button>

          <Button
            marginTop={"20px"}
            marginBottom={"30px"}
            colorScheme="teal"
            onClick={() => {
              setReset(!reset);
            }}
          >
            {" "}
            Clear Path
          </Button>
        </Box>
      </Box>
      <InfoHeader />
      {/* grid section  */}
      <Center
        backgroundColor={"white"}
        display={"flex"}
        flexDir={"column"}
        width={"100%"}
        height={"100%"}
        flexWrap={"wrap"}
      >
        {grid.map((row, rowInd) => {
          return (
            <Box
              key={rowInd}
              display={"flex"}
              flexDir={"row"}
              flexWrap={"nowrap"}
            >
              {row.map((node, nodeInd) => {
                return (
                  <Node
                    key={rowInd * 20 + nodeInd}
                    row={node.row}
                    col={node.col}
                    weight={node.weight}
                    isStart={node.row === startRow && node.col === startCol}
                    isFinish={node.row === endRow && node.col === endCol}
                    isVisited={node.isVisited}
                    isWall={node.isWall}
                    isPathNode={node.isPathNode}
                    handleMouseDown={handleMouseDown}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseUp={handleMouseUp}
                    handleClick={handleClick}
                  ></Node>
                );
              })}
            </Box>
          );
        })}
      </Center>
    </>
  );
};

export default PathFindingVisualizer;
