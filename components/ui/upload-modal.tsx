"use client";
import { Overlay, Portal } from '@radix-ui/react-dialog';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import React from 'react';

interface UploadModalProps {
    isOpen?: boolean;
    onChange?: (open: boolean) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onChange }) => {

    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}>
            <Portal>
                <Overlay className="bg-zinc-200/50 dark:bg-neutral-900/50 backdrop-blur-sm fixed inset-0" />
                <Dialog.Content maxWidth="450px">
                    <Dialog.Title align={"center"}>Upload a file</Dialog.Title>
                    <Dialog.Description size="2" mb="4" align={"center"}>
                        Choose or drag a file (.png, .jpg, .jpeg, .pdf)
                    </Dialog.Description>


                </Dialog.Content>
            </Portal>
        </Dialog.Root>


    )
}

export default UploadModal;