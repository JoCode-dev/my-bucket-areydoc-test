"use client";

import React, { useEffect, useState } from 'react';
import { base64ToFile, formatBytes, getFileType } from '@/utils/file';
import { Box, Flex, Skeleton, Text } from '@radix-ui/themes';
import FileIcon from "@/components/ui/file-icon"
import CloseIcon from '../ui/close-icon';

interface FileItemProps {
    file: string
}

type dataFileType = {
    fileName: string;
    size: number;
    type: string | null;
}
const FileItem: React.FC<FileItemProps> = ({ file }) => {
    const [dataFile, setDataFile] = useState<dataFileType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getFile = async () => {
            setIsLoading(true);
            const fileName = 'example.txt';
            const mimeType = 'image/jpeg';

            await base64ToFile(file, fileName).then((result) => {
                setDataFile({
                    fileName: result.name,
                    size: result.size,
                    type: getFileType(result.type)
                })
                setIsLoading(false);
            })

        }

        getFile();
    }, [])

    const handleClick = () => {
        window.open(file, "_blanket")
    }

    const deletFile = (e: Event) => {
        e.stopPropagation()
        const storedFiles = localStorage.getItem("files");
        if(storedFiles){
            const files = JSON.parse(storedFiles)
            if(files instanceof Array){
                console.log(files.indexOf(file));
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
        <Box height="16rem" width="12rem" className="relative cursor-pointer rounded-2xl border-2 border-zinc-400 transition hover:scale-105" onClick={handleClick}>
            <CloseIcon onClick={(e: Event) => deletFile(e)} className="absolute top-2 right-2 h-9 w-9 bg-red-200 hover:bg-red-500" />
            <Flex direction="column" align="center" justify="center" className="h-full">
                <Box className="relative ">
                    <FileIcon icon={dataFile?.type} />
                    <Box as='div' className="mt-2 text-center">
                        <Text size="4" className="text-zinc-500">{dataFile?.fileName}</Text>
                    </Box>
                    <Box as='div' className="text-center">
                        <Text size="3" className="text-zinc-800" weight="medium">{formatBytes(dataFile?.size)}</Text>
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default FileItem;