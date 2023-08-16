import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowRightIcon, StarIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faWeight,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import Node from "../Node/Node";

const InfoHeader = () => {
  return (
    <Box
      display={"flex"}
      flexDir={"row"}
      justifyContent={"space-around"}
      gap={"50px"}
      marginBottom={"10px"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"20px"}
        alignItems={"center"}
      >
        <ArrowRightIcon boxSize={5} />
        <Text fontFamily={"sans-serif"} fontWeight={"semibold"}>
          Start Node
        </Text>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"20px"}
        alignItems={"center"}
      >
        <StarIcon boxSize={5} />
        <Text fontFamily={"sans-serif"} fontWeight={"semibold"}>
          Finish Node
        </Text>
      </Box>

      <Box display={"flex"} flexDir={"column"} gap={"22px"}>
        <FontAwesomeIcon icon={faWeightHanging} />
        <Text fontFamily={"sans-serif"} fontWeight={"semibold"}>
          Weighted Node
        </Text>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"22px"}
        alignItems={"center"}
      >
        <Center
          display="flex"
          width="23px"
          height="23px"
          borderStyle={"solid"}
          borderColor={"#AFD8F8"}
          borderWidth={"thin"}
          backgroundColor={"#0C3547"}
        ></Center>
        <Text fontFamily={"sans-serif"} fontWeight={"semibold"}>
          Wall Node
        </Text>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"22px"}
        alignItems={"center"}
      >
        <Center
          display="flex"
          width="23px"
          height="23px"
          borderStyle={"solid"}
          borderColor={"#AFD8F8"}
          borderWidth={"thin"}
          backgroundColor={"#FF2E63"}
        ></Center>
        <Text fontFamily={"sans-serif"} fontWeight={"semibold"}>
          Shortest Path Node
        </Text>
      </Box>


      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"22px"}
        alignItems={"center"}
      >
        <Center
          display="flex"
          width="23px"
          height="23px"
          borderStyle={"solid"}
          borderColor={"#AFD8F8"}
          borderWidth={"thin"}
          backgroundColor={"#08D9D6"}
        ></Center>
        <Text fontFamily={"sans-serif"} fontWeight={"semibold"}>
          Visited Node
        </Text>
      </Box>

      {/* <Box display={"flex"} flexDir={"column"} gap={"22px"} alignItems={"center"}>
        <Node isPathNode={true} ></Node>
        <Text fontFamily={"sans-serif"} fontWeight={"semibold"}>
          Shortest Path Node
        </Text>
      </Box> */}
    </Box>
  );
};

export default InfoHeader;
