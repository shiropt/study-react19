import { Box, Button, LoadingOverlay, TextInput } from "@mantine/core";
import {
  useActionState,
  useEffect,
  useOptimistic,
  useTransition,
  startTransition,
} from "react";
import { UserTable } from "./UserTable";
import { User } from "../mocks/db";

export const Users = () => {
  const postUser = async (formData: FormData) => {
    const name = formData.get("name");
    const response = await fetch("/user", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    return await response.json();
  };

  const [users, setUsers, isSubmitting] = useActionState<
    User[],
    User[] | FormData
  >(async (prev, next) => {
    if (next instanceof FormData) {
      const response = await postUser(next);
      return [...prev, response.data];
    }
    return next;
  }, []);
  const [displayUsers, setDisplayUsers] = useOptimistic<User[], User[]>(
    users,
    (_, next) => next
  );

  const [isLoading, startLoading] = useTransition();

  const fetchData = async () => {
    startLoading(async () => {
      const response = await fetch("/users", {
        method: "GET",
      });
      const data = await response.json();
      startTransition(() => setUsers(data.data));
    });
  };

  const handleLikeButtonClick = async (id: string) => {
    const user = users.find((user) => user.id === id);
    if (!user) return;

    startTransition(async () => {
      const optimisticValue = displayUsers.map((u) =>
        u.id === id ? { ...u, like: u.like + 1 } : u
      );
      setDisplayUsers(optimisticValue);

      const response = await fetch(`/user/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...user, like: user.like + 1 }),
      });
      const data = await response.json();
      setUsers(data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [count, increment, isPending] = useActionState((currentCount) => {
    startTransition(async () => {
      setOptimisticValue(optimisticValue + 1);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    return currentCount + 1;
  }, 0);

  const [optimisticValue, setOptimisticValue] = useOptimistic<number, number>(
    count,
    (_, next) => next
  );
  return (
    <Box p="md">
      <LoadingOverlay visible={isLoading || isSubmitting} zIndex={1000} />
      <Box>
        <Button
          disabled={isPending}
          variant="transparent"
          p={4}
          size="xs"
          onClick={increment}
        >
          ❤️ {optimisticValue}
        </Button>
        <form action={setUsers}>
          <TextInput
            w="20em"
            required
            name="name"
            label="user name"
            placeholder="please input user name"
          />
        </form>
        <UserTable
          handleLikeButtonClick={handleLikeButtonClick}
          isLoading={isLoading}
          users={displayUsers}
        />
      </Box>
    </Box>
  );
};
