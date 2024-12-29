import React, { useState } from "react";
import LocationPermissionModal from "./components/LocationPermissionModal";
import MapSelector from "./components/MapSelector";
import AddressForm from "./components/AddressForm";
import AddressManagement from "./components/AddressManagement";

interface Location {
  lat: number;
  lng: number;
}

export default function App() {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const handleLocationPermission = (enabled: boolean) => {
    if (enabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setStep(2);
        },
        (error) => {
          console.error("Error getting location:", error);
          setStep(2);
        }
      );
    } else {
      setStep(2);
    }
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setStep(3);
  };

  const handleAddressSave = (savedAddress: any) => {
    console.log("Address saved:", savedAddress);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {step === 1 && (
        <LocationPermissionModal onPermission={handleLocationPermission} />
      )}
      {step === 2 && (
        <MapSelector
          initialLocation={location}
          onAddressSelect={handleAddressSelect}
        />
      )}
      {step === 3 && (
        <AddressForm
          initialAddress={address}
          onAddressSave={handleAddressSave}
        />
      )}
      {step === 4 && <AddressManagement />}
    </div>
  );
}
