import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, useColorMode } from "@chakra-ui/react";

export default function ColorSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box zIndex={-1}>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? (
          <MoonIcon fontSize={"1em"} />
        ) : (
          <SunIcon fontSize={"1em"} />
        )}
      </Button>
    </Box>
  );
}
