import {
  Box,
  Flex,
  LoadingOverlay,
  Skeleton,
  Table,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState, useTransition } from "react";

function App() {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setLoading] = useTransition();
  const [isSubmitting, setIsSubmitting] = useTransition();

  const fetchData = async () => {
    setLoading(async () => {
      const response = await fetch("/users", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data.data);
    });
  };

  const handleSubmit = async (v: React.FormEvent<HTMLFormElement>) => {
    v.preventDefault();
    const formData = new FormData(v.target as HTMLFormElement);
    const name = formData.get("name");

    setIsSubmitting(async () => {
      const response = await fetch("/user", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      setUsers((prev) => [...prev, data.data]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box p="md">
      <LoadingOverlay visible={isLoading || isSubmitting} zIndex={1000} />
      <Flex direction="column">
        <Title p="md" order={1}>
          Hello React v19
        </Title>
        <Box p="md">
          <form onSubmit={handleSubmit}>
            <TextInput
              w="20em"
              required
              name="name"
              label="user name"
              placeholder="please input user name"
            />
          </form>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>id</Table.Th>
                <Table.Th>name</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isLoading ? (
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
              ) : (
                users.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>{user.id}</Table.Td>
                    <Table.Td>{user.name}</Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
