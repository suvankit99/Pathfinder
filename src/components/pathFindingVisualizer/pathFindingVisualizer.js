import React, { useEffect } from "react";
import Node from "../Node/Node";
import { useState } from "react";
import { Box, Center, Checkbox, Heading, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { bfs } from "../../algorithms/BFS";
import { getGrid } from "../utility/getGrid";
import djikstra from "../../algorithms/Djikstra";
import InfoHeader from "../InfoHeader/InfoHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faWeight,
  faWeightHanging,
  faCircleNodes,
} from "@fortawesome/free-solid-svg-icons";

const rows = 20;
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
    const visitedNodes = djikstra(grid, startNode, endNode, rows, cols);
    animateAlgorithm(visitedNodes);
    const shortestPath = getShortestPath(endNode);
    animateShortestPath(shortestPath, visitedNodes.length * 10 + 100);
  };
  const visualizeBfs = (grid, startNode, endNode, rows, cols) => {
    setIsAnimating(true);
    const visitedNodes = bfs(grid, startNode, endNode, rows, cols);
    animateAlgorithm(visitedNodes);
    const shortestPath = getShortestPath(endNode);
    animateShortestPath(shortestPath, visitedNodes.length * 10 + 100);
  };
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = grid[row][col];
    if (row === startRow && col === startCol) {
      setstartRow(row);
      setstartCol(col);
    } else if (addWeights) {
      node.weight = 5;
    } else {
      if (node.weight === 0 && row !== startRow && col !== startCol) {
        node.isWall = true;
      }
    }
    newGrid[row][col] = node;
    return newGrid;
  };
  const handleMouseDown = (row, col) => {
    if (isAnimating) return;
    if (row === startRow && col === startCol) {
      setIsDragStart(true);
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setIsMousePressed(true);
    setGrid(newGrid);
  };

  const handleMouseEnter = (row, col) => {
    if (isAnimating) return;
    if (!isMousePressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setIsMousePressed(true);
    setGrid(newGrid);
  };
  const handleMouseUp = () => {
    setIsMousePressed(false);
  };
  const handleAddWeights = () => {
    console.log(addWeights);
    setAddWeights(!addWeights);
  };
  useEffect(() => {
    setGrid(getGrid(rows, cols));
  }, [reset]);

  return (
    <>
      {/* header section */}
      <Box backgroundColor={"#34495E"} marginBottom={"20px"}>
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
              visualizeBfs(
                grid,
                grid[startRow][startCol],
                grid[endRow][endCol],
                rows,
                cols
              );
            }}
          >
            {" "}
            visualize bfs
          </Button>
          <Button
            marginTop={"20px"}
            marginBottom={"30px"}
            colorScheme="teal"
            onClick={() => {
              visualizeDjikstra(
                grid,
                grid[startRow][startCol],
                grid[endRow][endCol],
                rows,
                cols
              );
            }}
          >
            {" "}
            visualize djikstra
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
