"use client";

import { Button, Card, Flex, Spinner } from "@radix-ui/themes";
import CloudUploadIcon from "./cloud-upload-icon";
import React, { useRef, useState } from "react";
import { BookmarkIcon } from "@radix-ui/react-icons";

interface DropZoneProps {
    file: string;
    setFile: (e: string) => void;
    fileEnter: boolean;
    setFileEnter: (e: boolean) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ file, fileEnter, setFile, setFileEnter }) => {
    const input_file_ref = useRef<HTMLInputElement>(null);

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

        [...e.dataTransfer.files].forEach((file, i) => {
            console.log(file);
        })
    }

    return (
        <Card draggable onDragOver={(e) => onDragOver(e)}
            onDragLeave={() => setFileEnter(false)} onDragEnd={(e) => onDragEnd(e)}
            onDrop={(e) => onDrop(e)}
            className="dark:border-zinc-800 rounded-lg p-10 space-y-6">
            <Flex align="center" justify="center" direction="column">
                <CloudUploadIcon className="my-10" />
                <Button variant="outline" onClick={() => handleInput()}>
                    Select File
                </Button>
                <input className="hidden" type="file" name="file-input" ref={input_file_ref} />
            </Flex>

        </Card>
    )
}

export default DropZone;