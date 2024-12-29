import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

interface LocationPermissionModalProps {
  onPermission: (enabled: boolean) => void;
}

export default function LocationPermissionModal({
  onPermission,
}: LocationPermissionModalProps) {
  return (
    <Card maxW="md" mx="auto">
      <CardHeader>
        <Heading size="md">Enable Location Services</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4}>
          <Text>
            We need your location to provide accurate delivery options.
          </Text>
          <Button
            colorScheme="blue"
            width="full"
            onClick={() => onPermission(true)}
          >
            Enable Location
          </Button>
          <Button
            variant="outline"
            width="full"
            onClick={() => onPermission(false)}
          >
            Search Manually
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
}
