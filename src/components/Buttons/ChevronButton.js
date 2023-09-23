import { Center } from "@chakra-ui/react";
import { ReactComponent as ChevronSvg } from "../../assets/icons/chevron.svg"
import { useAnimate } from "framer-motion";
import { useEffect } from "react";
import { motion } from "framer-motion";

const ChevronButton = ({
    hexColorCode,
    filter = "drop-shadow(0px 2px 2px #33333380)",
    ...props
}) => {

    const [scope, animate] = useAnimate();

    useEffect(() => {
        console.log(props);
        scope.current.querySelector("path").style.fill = hexColorCode;
    })

    return (
        <Center
            as={motion.button}
            type="button"
            w={6}
            h={8}
            ref={scope}
            {...props}
        >
            <ChevronSvg
                style={{
                    filter: filter
                }}
            />
        </Center>
    )
}

export default ChevronButton;