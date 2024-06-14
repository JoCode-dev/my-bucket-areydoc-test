"use client";

import { Box, Button, Card, Flex, Spinner } from "@radix-ui/themes";
import CloudUploadIcon from "./cloud-upload-icon";
import React, { useEffect, useRef, useState } from "react";
import { BookmarkIcon } from "@radix-ui/react-icons";
import CardFile from "../ui/card-file";

interface DropZoneProps {
    file: string | HTMLInputElement | null;
    setFile: (e: string | null) => void;
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
            onDragLeave={() => setFileEnter(false)} onDragEnd={(e) => onDragEnd(e)}
            onDrop={(e) => onDrop(e)}
            className="dark:border-zinc-800 rounded-lg p-10 space-y-6">
            {file === null ?
                <Flex align="center" justify="center" direction="column" className="w-full h-[250px]">
                    <CloudUploadIcon className="my-10" />
                    <Button variant="outline" onClick={() => handleInput()}>
                        Select File
                    </Button>
                    <input className="hidden" type="file" name="file-input" ref={input_file_ref} />
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