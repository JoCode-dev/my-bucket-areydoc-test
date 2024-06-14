import { Box, Button, Container, Flex } from "@radix-ui/themes";
import ToggleButton from "./toggle-button";
import Image from "next/image";
import useModal from "@/hooks/useModal";

const Navbar = () => {
    const { toggleModal } = useModal();

    return (
        <nav>
            <Flex direction="row" justify="between" className="w-screen p-5">
                <Box as="div" className="">
                    <Image
                        src="/arey_light.png"
                        alt="Vercel Logo"
                        className="dark:invert"
                        width={100}
                        height={24}
                        priority
                    />
                </Box>

                <Flex direction="row" justify="between" gap={"5"}
                    as="div"
                >
                    <Box as="div">
                        <Button onClick={() => toggleModal()}>
                            Upload a file
                        </Button>
                    </Box>
                    <Box as="div">
                        <ToggleButton />
                    </Box>
                </Flex>
            </Flex>
        </nav>
    )
}

export default Navbar;