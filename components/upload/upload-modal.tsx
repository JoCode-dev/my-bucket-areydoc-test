"use client";
import { Overlay, Portal } from '@radix-ui/react-dialog';
import { Button, Dialog, Flex, Spinner, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import DropZone from './dropzone';
import { UploadIcon } from '@radix-ui/react-icons';
import useModal from '@/hooks/useModal';
import { getBase64, getFileType } from '@/utils/file';

import Toaster from '../ui/toast';
import { FilesType } from '@/app/page';
import { createClient } from '@/utils/supabase/client';

interface UploadModalProps {
    isOpen?: boolean;
    onChange?: () => void;
    files: FilesType[] | null;
    setFiles: (files: FilesType[]) => void;

    isUploaded: boolean;
    setIsUploaded: (value: boolean) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onChange, files, setFiles, isUploaded, setIsUploaded }) => {
    const { toggleModal } = useModal();
    const supabase = createClient();

    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fileEnter, setFileEnter] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [errorTitle, setErrorTittle] = useState("");
    const [isError, setIsError] = useState(false);


    /**
     * Function to upload file to Supabase and localStorage
     * 
     * @returns void
     */
    const uploadFile = async () => {
        if (!file) return;

        setIsLoading(true);
        const dataBase64 = await getBase64(file);


        // File validations
        if (files?.includes({ fileName: file.name, data: String(dataBase64) })) {
            setIsError(true);
            setErrorTittle("Files already uploaded");
            setErrorMessage("This file is already uploaded, please choose an other file");
            setIsLoading(false);

            setFile(null);
        }
        else if (getFileType(file.type) === null) {
            setIsError(true);
            setErrorTittle("File type unsupported");
            setErrorMessage("Please choose a valide file");
            setIsLoading(false);
        }
        else if (file.size > 6000000) {
            setIsError(true);
            setErrorTittle("File size exceed 6Mb");
            setErrorMessage("File size is limited to 6Mb, please upload a smaller file.");
            setIsLoading(false);
        }
        else {
            // Upload to Supabase Storage
            const bucket = "arey-doc-test-bucket";
            const { data, error } = await supabase.storage.from(bucket).upload(file.name, file);

            // Upload file to LocalStorage
            const updatedFiles = files ? [...files, { fileName: file.name, data: String(dataBase64) }] : [{ fileName: file.name, data: String(dataBase64) }];
            setFiles(updatedFiles);
            localStorage.setItem("files", JSON.stringify(updatedFiles));

            // Handle error if upload failed
            if (error) {
                setIsError(true);
                setErrorTittle("ERROR !");
                setErrorMessage("Error uploading file.");
            }

            setFile(null);
            setIsLoading(false);
            setIsUploaded(true);

            toggleModal();
        }

        setTimeout(() => {
            setIsError(false);
        }, 3000)
    }

    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}>
            <Portal>
                <Overlay className="bg-zinc-200/50 dark:bg-neutral-900/50 backdrop-blur-sm fixed inset-0" />
                {isError && <Toaster message={errorMessage} title={errorTitle} success={false} />}
                <Dialog.Content maxWidth="450px">
                    <Dialog.Title align={"center"}>Upload a file</Dialog.Title>
                    <Dialog.Description size="2" mb="2" align={"center"}>
                        Choose or drag a file image, music, video or doc (.png, .jpeg, .pdf...)
                    </Dialog.Description>

                    <DropZone
                        file={file}
                        setFile={setFile}
                        fileEnter={fileEnter}
                        setFileEnter={setFileEnter}
                        isLoading={isLoading}
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