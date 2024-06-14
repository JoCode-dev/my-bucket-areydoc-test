"use client";
import { ModalContext, ModalProviderProps } from "@/hooks/useModal";
import { useState } from "react";

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <ModalContext.Provider value={{ isOpen, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
}
