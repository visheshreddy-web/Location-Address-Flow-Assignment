import React, { useState } from "react";
import {
  Button,
  Input,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaHome, FaBriefcase, FaUsers, FaSearch } from "react-icons/fa";
import { useAddresses } from "../contexts/AddressContext";

export default function AddressManagement() {
  const { addresses } = useAddresses();
  const [searchTerm, setSearchTerm] = useState("");

  const getIcon = (type: string) => {
    switch (type) {
      case "home":
        return FaHome;
      case "office":
        return FaBriefcase;
      default:
        return FaUsers;
    }
  };

  const filteredAddresses = addresses.filter((addr) =>
    addr.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      maxW="2xl"
      mx="auto"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
    >
      <Card>
        <CardHeader>
          <Heading size="md">Manage Addresses</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaSearch} color="gray.300" />}
              />
              <Input
                placeholder="Search addresses"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
              />
            </InputGroup>
            {filteredAddresses.map((addr) => (
              <Box
                key={addr.id}
                width="full"
                p={4}
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
              >
                <HStack justify="space-between">
                  <HStack>
                    <Icon as={getIcon(addr.type)} />
                    <Text>{addr.address}</Text>
                  </HStack>
                  <HStack>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" colorScheme="red">
                      Delete
                    </Button>
                  </HStack>
                </HStack>
              </Box>
            ))}
            <Button colorScheme="blue" width="full">
              Add New Address
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
