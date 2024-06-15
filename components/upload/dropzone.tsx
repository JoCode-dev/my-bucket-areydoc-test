"use client";

import { Box, Button, Card, Flex, Spinner, Text } from "@radix-ui/themes";
import CloudUploadIcon from "./cloud-upload-icon";
import React, { useEffect, useRef, useState } from "react";
import { BookmarkIcon } from "@radix-ui/react-icons";
import CardFile from "../ui/card-file";

interface DropZoneProps {
    file: string | File | null;
    setFile: (e: File | null) => void;
    fileEnter: boolean;
    setFileEnter: (e: boolean) => void;

    isLoading: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ file, fileEnter, setFile, setFileEnter, isLoading }) => {
    const input_file_ref = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");

    const handleInput = () => {
        input_file_ref.current?.click();
    }

    const chooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.files instanceof FileList) {
            setFile(target.files[0])
        }
    }

    const onDragOver = (e: DragEvent | any) => {
        e.preventDefault();
        setFileEnter(true);

    }

    const onDragEnd = (e: DragEvent | any) => {
        e.preventDefault();
        setFileEnter(false);
    }

    const onDrop = (e: DragEvent | any) => {
        e.preventDefault();
        setFileEnter(false);

        setFile(e.dataTransfer.files[0]);
    }

    useEffect(() => {
        if (file instanceof File) setFileName(file.name)
    }, [file])


    return (
        <Card draggable onDragOver={(e) => onDragOver(e)}
            onDragLeave={() => setFileEnter(false)}
            onDragEnd={(e) => onDragEnd(e)}
            onDrop={(e) => onDrop(e)}
            className="dark:border-zinc-800 rounded-lg p-10 space-y-6">
            {file === null ?
                <Flex align="center" justify="center" direction="column" className="w-full h-[250px]">
                    {fileEnter ?
                        <Flex className="w-full h-[250px]" align="center" justify="center" direction="column">
                            <Text size={"7"} className="text-zinc-400">Deposit your file here</Text>
                            <Text size={"2"}>Upload your file by dropping it in this zone</Text>
                        </Flex>
                        :
                        <CloudUploadIcon className="my-10" />
                    }

                    <Button variant="outline" onClick={() => handleInput()} style={{ cursor: "pointer" }}>
                        Select File
                    </Button>
                    <input className="hidden" type="file" name="file-input" ref={input_file_ref} onChange={(e) => chooseFile(e)} />
                </Flex>
                :
                <Flex className="w-full h-[250px]" align="center" justify="center" direction="column">
                    <CardFile fileName={fileName} removeFile={() => setFile(null)} />
                </Flex>
            }

        </Card>
    )
}

export default DropZone;