import { Box, LoadingOverlay, TextInput } from "@mantine/core";
import { useActionState, useEffect, useState, useTransition } from "react";
import { UserTable } from "./UserTable";

type User = {
  id: string;
  name: string;
};

export const Users = () => {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, startTransition] = useTransition();

  const fetchData = async () => {
    startTransition(async () => {
      const response = await fetch("/users", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data.data);
    });
  };

  const postUser = async (prevState: User[], formData: FormData) => {
    const name = formData.get("name");
    const response = await fetch("/user", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    setUsers((prev) => [...prev, data.data]);
    return [...prevState, data.data];
  };

  const [, action, isSubmitting] = useActionState(postUser, users);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box p="md">
      <LoadingOverlay visible={isLoading || isSubmitting} zIndex={1000} />
      <Box>
        <form action={action}>
          <TextInput
            w="20em"
            required
            name="name"
            label="user name"
            placeholder="please input user name"
          />
        </form>
        <UserTable isLoading={isLoading} users={users} />
      </Box>
    </Box>
  );
};
