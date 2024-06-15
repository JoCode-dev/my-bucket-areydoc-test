"use client";

import { substr } from "@/utils/string";
import { Cross2Icon, ImageIcon, MagnifyingGlassIcon, VideoIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import Image from "next/image";
import FileIcon from "./file-icon";
import CloseIcon from "./close-icon";

interface CardFileProps {
    icon?: string;
    fileName: string;
    removeFile: () => void;
}



const CardFile: React.FC<CardFileProps> = ({ icon, fileName, removeFile }) => {
    return (
        <Flex direction="column" align="center" justify="center" className="fixed border-4 border-zinc-200/30 w-44 h-52 rounded-xl">
            <CloseIcon onClick={removeFile} className="absolute -top-5 -right-5 h-9 w-9 bg-red-500" />

            <FileIcon icon="Image" />

            <span className="text-center leading-5 my-5">{substr(fileName, 15)}</span>
        </Flex>
    )
}

export default CardFile;