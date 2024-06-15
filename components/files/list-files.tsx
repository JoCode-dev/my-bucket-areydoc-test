import React from 'react';
import Image from 'next/image';
import { Box, Container, Flex, Grid, Text } from '@radix-ui/themes';
import FileItem from './file-item';
import { FilesType } from '@/app/page';

interface ListFilesProps {
    files: FilesType[],
    setFiles: (files: FilesType[]) => void;
}

const ListFiles: React.FC<ListFilesProps> = ({ files, setFiles }) => {
    return (
        <Box className="h-full min-h-[90vh]" px={"9"} py="3">
            {
                files?.length ?
                    <Grid columns={{ initial: '1', sm: "3", md: '5', lg: "6" }} gap="8" width="auto" justify="center" align="center">
                        {files.map((item, index) => (
                            <FileItem key={index} file={item} setFiles={setFiles} />
                        ))}
                    </Grid>
                    : <Flex direction="column" align="center" justify="center" className="h-[80vh]">
                        <Image src="https://shop.apaym.com/img/boite-vide.54c9f6d2.png" alt="Box empty" width={240} height={20} />
                        <Text size="5" className="text-zinc-400">No files found</Text>
                    </Flex>
            }
        </Box>
    )
}

export default ListFiles;