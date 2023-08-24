import { Box, HStack, LinkBox, LinkOverlay, VStack, chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp, useAnimate } from "framer-motion";
import { useEffect } from "react";


const NavItem = ({ children, href, isActive, setActiveItem }) => {

    const [scope, animate] = useAnimate();

    const animationTransition = { type: "spring", damping: 15 }

    const handleHover = event => {
        const mouseOverSequence = [
            [".topline", { x: "-16px" }],
            [".bottomline", { x: "16px" }, { at: "<" }],
        ]

        const mouseOutSequence = [
            [".topline", { x: "-200px" }],
            [".bottomline", { x: "200px" }, { at: "<" }],
        ]

        switch (event.type) {
            case "mouseover":
                animate(mouseOverSequence, animationTransition);
                break;
            default:
                animate(mouseOutSequence, animationTransition);
        }
    }

    const handleClick = event => {
        event.preventDefault();
        setActiveItem(event.target.text);
    }

    useEffect(() => {
        if (isActive) {
            const itemTransition = {
                ease: [1, -1.1, 0.08, 1.14]
            }
            const itemActivationAfterAnimation = async () => {
                await animate(".topline, .bottomline", { x: "0px" }, itemTransition);
                await animate(".leftline, .rightline", { y: "0px" }, itemTransition);
            }
            itemActivationAfterAnimation();
        }
    })

    const LineBox = chakra(motion.div, {
        shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop)
    })

    return (
        <LinkBox
            w="max"
            color="brand.secondary.darkCharcoal"
            onMouseOver={!isActive ? handleHover : null}
            onMouseOut={!isActive ? handleHover : null}
            onClick={handleClick}
        >
            <VStack spacing={0} overflow="hidden" ref={scope}>
                <Box w="full" h={0} >
                    <LineBox
                        className="topline"
                        initial={isActive ? { x: "-16px" } : { x: "-200px" }}
                        bg="brand.primary.green"
                        w="full"
                        h="2px"
                        borderRadius="1px"
                    />
                </Box>
                <HStack h="26px" spacing={1}>
                    <Box h="full" pt={2}>
                        <LineBox
                            className="leftline"
                            initial={{ y: "20px" }}
                            bg="brand.primary.green"
                            w="2px"
                            h="full"
                            borderRadius="1px"
                        />
                    </Box>
                    <LinkOverlay
                        fontWeight="medium"
                        lineHeight="none"
                        fontSize="18px"
                        href={href}>
                        {children}
                    </LinkOverlay>
                    <Box h="full" pb={2}>
                        <LineBox
                            className="rightline"
                            initial={{ y: "-20px" }}
                            bg="brand.primary.green"
                            w="2px"
                            h="full"
                            borderRadius="1px"
                        />
                    </Box>
                </HStack>
                <Box w="full" h={0}>
                    <LineBox
                        className="bottomline"
                        initial={isActive ? { x: "16px", y: "-2px" } : { x: "200px", y: "-2px" }}
                        bg="brand.primary.green"
                        w="full"
                        h="2px"
                        borderRadius="1px"
                    />
                </Box>
            </VStack>
        </LinkBox>
    )
}

export default NavItem;