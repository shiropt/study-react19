import { Box, Flex, Title } from "@mantine/core";
import { Users } from "./components/Users";

function App() {
  return (
    <Box p="md">
      <Flex direction="column">
        <Title p="md" order={1}>
          Hello React v19
        </Title>
        <Users />
      </Flex>
    </Box>
  );
}

export default App;
