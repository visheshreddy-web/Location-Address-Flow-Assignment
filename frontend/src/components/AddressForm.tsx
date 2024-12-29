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
  Icon,
} from "@chakra-ui/react";
import { FaHome, FaBriefcase, FaUsers } from "react-icons/fa";

interface AddressFormProps {
  initialAddress: string | null;
  onAddressSave: (address: any) => void;
}

export default function AddressForm({
  initialAddress,
  onAddressSave,
}: AddressFormProps) {
  const [address, setAddress] = useState(initialAddress || "");
  const [addressType, setAddressType] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSave = () => {
    onAddressSave({ address, type: addressType });
  };

  return (
    <Box maxW="md" mx="auto">
      <Card>
        <CardHeader>
          <Heading size="md">Enter Address Details</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <Input
              placeholder="House/Flat/Block No."
              value={address}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Apartment/Road/Area"
              onChange={handleInputChange}
            />
            <HStack spacing={4} justify="center">
              <Button
                leftIcon={<Icon as={FaHome} />}
                onClick={() => setAddressType("home")}
                colorScheme={addressType === "home" ? "blue" : "gray"}
              >
                Home
              </Button>
              <Button
                leftIcon={<Icon as={FaBriefcase} />}
                onClick={() => setAddressType("office")}
                colorScheme={addressType === "office" ? "blue" : "gray"}
              >
                Office
              </Button>
              <Button
                leftIcon={<Icon as={FaUsers} />}
                onClick={() => setAddressType("other")}
                colorScheme={addressType === "other" ? "blue" : "gray"}
              >
                Other
              </Button>
            </HStack>
            <Button colorScheme="blue" width="full" onClick={handleSave}>
              Save Address
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
