import { FormControl, FormErrorMessage, VStack } from "@chakra-ui/react";
import FieldLabel from "./FieldLabel";
import { useField } from "formik";
import { useEffect } from "react";


const FormElementRegular = ({ inputComponent, label = "Label", isRequired, ...props }) => {

    const { name, type } = props;

    const [field, meta, helpers] = useField(name);

    useEffect(() => { name === "additionalInfo" && console.log(name, type, field, props) });

    return (
        <FormControl
            as={(type === "radio" || type === "checkbox") && "fieldset"}
            isInvalid={meta.touched && meta.error}
            isRequired={isRequired}
            {...props}
        >
            <VStack
                align="start"
                w={{ base: "full" }}
                spacing={2}
            >
                <FieldLabel
                    radio={type === "radio"}
                    checkbox={type === "checkbox"}
                >
                    {label}
                </FieldLabel>
                <VStack
                    w={{ base: "full" }}
                    spacing={0}
                    align="start"
                >
                    {
                        type === "textarea"
                            ? inputComponent({ ...field, ...props })
                            : inputComponent({ ...field, ...props, formikHelpers: helpers, formikMeta: meta })
                    }
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                </VStack>
            </VStack>
        </FormControl>
    )
}

export default FormElementRegular;