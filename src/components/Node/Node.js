import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { ArrowRightIcon, StarIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faWeight, faWeightHanging , faCircleNodes } from '@fortawesome/free-solid-svg-icons'

const getColor = (isStart , isFinish , isVisited , isWall , isPathNode ) => {
  
  if(isPathNode){
    return "yellow"
  }
  if(isWall){
    return "#0C3547"
  }
  if(isVisited){
    return "#40CEE3"
  }
 
  return "white" ;
}
const Node = ({isStart , isFinish , isVisited , isWall , isPathNode , handleMouseDown , handleMouseEnter , handleMouseUp , row , col , weight}) => {
  return (
    <Center
      display="flex"
      width="23px"
      height="23px"
      borderStyle={"solid"}
      borderColor={"#AFD8F8"}
      borderWidth={"thin"}
      backgroundColor={getColor(isStart , isFinish , isVisited , isWall , isPathNode)}
      onMouseDown={() => {handleMouseDown(row , col)}} 
      onMouseEnter={() => {handleMouseEnter(row , col)}}
      onMouseUp={() => handleMouseUp()}  
    >
      {isStart && <ArrowRightIcon boxSize={5}></ArrowRightIcon>}
      {isFinish && <StarIcon boxSize={5} ></StarIcon>}
      {weight > 0 && <FontAwesomeIcon icon={faWeightHanging} />}

    </Center>
  );
};

export default Node;
