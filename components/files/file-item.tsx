"use client";

import React, { useEffect, useState } from 'react';
import { base64ToFile, formatBytes, getFileType } from '@/utils/file';
import { Box, Flex, Skeleton, Text } from '@radix-ui/themes';
import FileIcon from "@/components/ui/file-icon"
import CloseIcon from '../ui/close-icon';
import { FilesType } from '@/app/page';
import { substr } from '@/utils/string';

interface FileItemProps {
    file: FilesType,
    setFiles: (files: FilesType[]) => void;
}

type dataFileType = {
    fileName: string;
    size: number;
    type: string | null;
}

const FileItem: React.FC<FileItemProps> = ({ file, setFiles }) => {
    const [dataFile, setDataFile] = useState<dataFileType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getFile = async () => {
            setIsLoading(true);
            const fileName = 'example.txt';
            const mimeType = 'image/jpeg';

            await base64ToFile(file.data, file.fileName).then((result) => {
                setDataFile({
                    fileName: result.name,
                    size: result.size,
                    type: getFileType(result.type)
                })
                setIsLoading(false);
            })

        }

        getFile();
    }, [file])

    const handleClick = () => {
        window.open(file.data, "_blanket");
    }

    const deletFile = (e: Event) => {
        e.stopPropagation()
        const storedFiles = localStorage.getItem("files");
        if (storedFiles) {
            let files = JSON.parse(storedFiles)
            if (files instanceof Array) {
                const index = files.find(i => i?.fileName === file.fileName);
                if (index) {
                    files = files.filter(item => item !== index)
                    localStorage.setItem("files", JSON.stringify(files));
                    setFiles(files);
                }
            }
        }
    }

    if (isLoading) {
        return (
            <Skeleton width="12rem" height="16rem" style={{ borderRadius: 15 }}>
                Loading
            </Skeleton>
        )
    }


    return (
        <Box height="16rem" width="12rem" className="animate-in fade-in zoom-in relative cursor-pointer rounded-2xl border-2 border-zinc-400 transition hover:scale-105" onClick={handleClick}>
            <CloseIcon onClick={(e: Event) => deletFile(e)} className="absolute top-2 right-2 h-9 w-9 bg-red-200 hover:bg-red-500" />
            <Flex direction="column" align="center" justify="center" className="h-full pt-10">
                <FileIcon icon={dataFile?.type} />
                <Box as='div' className="mt-2 text-center">
                    <Text size="4" className="text-zinc-500 dark:text-white">{substr(dataFile?.fileName, 15)}</Text>
                </Box>
                <Box as='div' className="text-center">
                    <Text size="3" className="text-zinc-800 dark:text-zinc-500" weight="medium">{formatBytes(dataFile?.size)}</Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default FileItem;