import React, { createContext, useState, useContext } from "react";

interface Address {
  id: number;
  type: string;
  address: string;
}

interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (id: number, newAddress: Partial<Address>) => void;
  deleteAddress: (id: number) => void;
}

const AddressContext = createContext<AddressContextType | null>(null);

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const addAddress = (address: Address) => {
    setAddresses([...addresses, address]);
  };

  const updateAddress = (id: number, newAddress: Partial<Address>) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id ? { ...addr, ...newAddress } : addr
      )
    );
  };

  const deleteAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <AddressContext.Provider
      value={{ addresses, addAddress, updateAddress, deleteAddress }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddresses() {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddresses must be used within an AddressProvider");
  }
  return context;
}
