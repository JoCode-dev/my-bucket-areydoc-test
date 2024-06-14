"use client";
import { ReactNode, createContext, useContext, useState } from "react";

export interface ModalContextProps {
    isOpen: boolean;
    toggleModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}

export interface ModalProviderProps {
    children: ReactNode;
}


export default useModal;