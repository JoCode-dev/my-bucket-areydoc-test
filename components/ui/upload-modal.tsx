"use client";
import { Overlay, Portal } from '@radix-ui/react-dialog';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import React from 'react';

interface UploadModalProps {
    isOpen?: boolean;
    onChange?: (open: boolean) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen = true, onChange }) => {

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Edit profile</Button>
            </Dialog.Trigger>

            <Portal>
                <Overlay className="bg-zinc-200/50 dark:bg-neutral-900/50 backdrop-blur-sm fixed inset-0" />
                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Make changes to your profile.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Name
                            </Text>
                            <TextField.Root
                                defaultValue="Freja Johnsen"
                                placeholder="Enter your full name"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Email
                            </Text>
                            <TextField.Root
                                defaultValue="freja@example.com"
                                placeholder="Enter your email"
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button>Save</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Portal>
        </Dialog.Root>


    )
}

export default UploadModal;