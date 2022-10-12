import { Text, useColorModeValue } from "@chakra-ui/react";
import styles from "../styles/components/Input.module.css";

const Input = ({ type = "text", label = "", ...props }) => {
  const color = useColorModeValue("black", "white");

  return (
    <div className={styles.container}>
      {label ? (
        <Text as="label" color={color} className={styles.label}>
          {label}
        </Text>
      ) : null}
      <input type={type} className={styles.input} {...props} />
    </div>
  );
};

export default Input;
