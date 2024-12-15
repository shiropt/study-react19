import {
  Box,
  Flex,
  LoadingOverlay,
  Skeleton,
  Table,
  Title,
} from "@mantine/core";
import { useEffect, useState, useTransition } from "react";

function App() {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchData = async () => {
    startTransition(async () => {
      const response = await fetch("/users", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box p="md">
      <LoadingOverlay visible={isPending} zIndex={1000} />
      <Flex direction="column">
        <Title p="md" order={1}>
          Hello React v19
        </Title>
        <Box p="md">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>id</Table.Th>
                <Table.Th>name</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isPending && (
                <>
                  {Array.from({ length: 10 }).map((_, index) => {
                    return (
                      <Table.Tr key={index}>
                        <Table.Td colSpan={2}>
                          <Skeleton height={24} />
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </>
              )}
              {users.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Td>{user.id}</Table.Td>
                  <Table.Td>{user.name}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
