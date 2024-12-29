import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Heading,
  VStack,
  HStack,
} from "@chakra-ui/react";

interface Location {
  lat: number;
  lng: number;
}

interface MapSelectorProps {
  initialLocation: Location | null;
  onAddressSelect: (address: string, location: Location) => void;
}

export default function MapSelector({
  initialLocation,
  onAddressSelect,
}: MapSelectorProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [address, setAddress] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google && mapRef.current && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: initialLocation || { lat: 0, lng: 0 },
        zoom: 15,
      });
      setMap(newMap);

      const newMarker = new window.google.maps.Marker({
        position: initialLocation || { lat: 0, lng: 0 },
        map: newMap,
        draggable: true,
      });
      setMarker(newMarker);

      newMarker.addListener("dragend", handleMarkerDragEnd);
    }
  }, [initialLocation, map]);

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat() ?? 0;
    const lng = event.latLng?.lng() ?? 0;
    updateAddress(lat, lng);
  };

  const updateAddress = (lat: number, lng: number) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map?.setCenter(pos);
          marker?.setPosition(pos);
          updateAddress(pos.lat, pos.lng);
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  };

  const handleConfirm = () => {
    if (marker) {
      const position = marker.getPosition();
      if (position) {
        onAddressSelect(address, { lat: position.lat(), lng: position.lng() });
      }
    }
  };

  return (
    <Card maxW="2xl" mx="auto">
      <CardHeader>
        <Heading size="md">Select Your Location</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4}>
          <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
          <Input
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
            placeholder="Enter your address"
          />
          <HStack spacing={4} width="full">
            <Button onClick={handleLocateMe} flex={1}>
              Locate Me
            </Button>
            <Button onClick={handleConfirm} colorScheme="blue" flex={1}>
              Confirm Location
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
}
