"use client";
import { Overlay, Portal } from '@radix-ui/react-dialog';
import { Button, Dialog, Flex, Spinner, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import DropZone from './dropzone';
import { UploadIcon } from '@radix-ui/react-icons';
import useModal from '@/hooks/useModal';
import { getBase64 } from '@/utils/file';

interface UploadModalProps {
    isOpen?: boolean;
    onChange?: () => void;
    files: string[] | null;
    setFiles: (files: string[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onChange, files, setFiles }) => {
    const { toggleModal } = useModal();

    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fileEnter, setFileEnter] = useState<boolean>(false);

    const uploadFile = async () => {
        if (!file) return;

        // File validations
        // console.log(file);

        // Upload file to LocalStorage
        const data = await getBase64(file);
        console.log(data);

        if (files?.includes(String(data))) {
            setFile(null);
            toggleModal();
            return false;
        } else {
            const updatedFiles = files ? [...files, String(data)] : [String(data)];
            setFiles(updatedFiles);
            console.log(updatedFiles);
            localStorage.setItem("files", JSON.stringify(updatedFiles));
            setFile(null);
            toggleModal();
        }
    }

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
                        isLoading
                    />

                    <Flex align="center" justify="center" direction="row" mt="5" gap="3">
                        <Button className="w-[20vw]" size={"2"} onClick={uploadFile} style={{ cursor: "pointer" }} disabled={!file}>
                            Let's go!
                            <Spinner loading={isLoading}>
                                <UploadIcon />
                            </Spinner>
                        </Button>

                        <span className="dark:text-zinc-500 text-zinc-400 cursor-pointer" onClick={onChange}>
                            Cancel
                        </span>
                    </Flex>
                </Dialog.Content>
            </Portal>
        </Dialog.Root>


    )
}

export default UploadModal;