import Image from "next/image";
import React from "react";

interface FileIconProps {
    icon: string | any;
}

const FileIcon: React.FC<FileIconProps> = ({ icon }) => {
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

export default FileIcon