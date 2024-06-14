"use client";
import { Overlay, Portal } from '@radix-ui/react-dialog';
import { Button, Dialog, Flex, Spinner, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import DropZone from './dropzone';
import { UploadIcon } from '@radix-ui/react-icons';

interface UploadModalProps {
    isOpen?: boolean;
    onChange?: (open: boolean) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onChange }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [file, setFile] = useState<string>("");
    const [fileEnter, setFileEnter] = useState(false);

    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}>
            <Portal>
                <Overlay className="bg-zinc-200/50 dark:bg-neutral-900/50 backdrop-blur-sm fixed inset-0" />
                <Dialog.Content maxWidth="450px">
                    <Dialog.Title align={"center"}>Upload a file</Dialog.Title>
                    <Dialog.Description size="2" mb="2" align={"center"}>
                        Choose or drag a file (.png, .jpg, .jpeg, .pdf)
                    </Dialog.Description>

                    <DropZone
                        file={file}
                        setFile={setFile}
                        fileEnter={fileEnter}
                        setFileEnter={setFileEnter}
                    />

                    <Flex align="center" justify="center" direction="column" mt="5">
                        <Button className="w-[20vw]" size={"2"}>
                            Let's go!
                            <Spinner loading={isLoading}>
                                <UploadIcon />
                            </Spinner>
                        </Button>
                    </Flex>
                </Dialog.Content>
            </Portal>
        </Dialog.Root>


    )
}

export default UploadModal;