"use client";

import { Cross2Icon, FileIcon, ImageIcon, MagnifyingGlassIcon, VideoIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import Image from "next/image";

interface CardFileProps {
    icon?: string;
    fileName?: string;
    removeFile: () => void;
}

const Icon = ({ icon }: { icon: string }) => {
    switch (icon) {
        case 'Image':
            return (
                <Image
                    src="/icons/image-file.svg"
                    alt="File Icon - Image"
                    className="dark:invert"
                    width={100}
                    height={24}
                    priority
                />
            )
            break;
        case 'Video':
            return (
                <Image
                    src="/icons/video-file.svg"
                    alt="File Icon - Video"
                    className="dark:invert"
                    width={100}
                    height={24}
                    priority
                />
            )
        case 'Doc':
            return (
                <Image
                    src="/icons/doc-file.svg"
                    alt="File Icon - Doc"
                    className="dark:invert"
                    width={100}
                    height={24}
                    priority
                />
            )
        case 'Music':
            return (
                <Image
                    src="/icons/music-file.svg"
                    alt="File Icon - Music"
                    className="dark:invert"
                    width={100}
                    height={24}
                    priority
                />
            )
        case 'Compressed':
            return (
                <Image
                    src="/icons/compressed-file.svg"
                    alt="File Icon - Compressed"
                    className="dark:invert"
                    width={100}
                    height={24}
                    priority
                />
            )
        default:
            break;
    }
}

const CardFile: React.FC<CardFileProps> = ({ icon, fileName, removeFile }) => {
    return (
        <Flex direction="column" align="center" justify="center" className="fixed border-4 border-zinc-200/30 w-44 h-52 rounded-xl">
            <div className="cursor-pointer hover:scale-110 transition flex items-center justify-center absolute -top-5 -right-5 h-9 w-9 rounded-full bg-red-500" onClick={removeFile}>
                <Cross2Icon width="18" height="18" color="#ffffff" />
            </div>


            <Icon icon="Image" />

            <span>{fileName}</span>
        </Flex>
    )
}

export default CardFile;