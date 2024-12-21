import { Box, LoadingOverlay, Skeleton, Table, TextInput } from "@mantine/core";
import { Suspense, useState, useTransition } from "react";
import { TableContainer, UserTable } from "./UserTable";
import { User } from "../mocks/db";

const fetchData = async () => {
  const response = await fetch("/users", {
    method: "GET",
  });
  return await response.json();
};

const postData = async (formData: FormData) => {
  const name = formData.get("name");
  const response = await fetch("/user", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  return await response.json();
};

const Fallback = () => {
  return (
    <>
      <LoadingOverlay visible zIndex={1000} />
      <TableContainer>
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <Table.Tr key={index}>
              <Table.Td colSpan={3}>
                <Skeleton height={24} />
              </Table.Td>
            </Table.Tr>
          );
        })}
      </TableContainer>
    </>
  );
};

export const Users = () => {
  const [isPending, startTransition] = useTransition();
  const [usersPromise, setUsersPromise] = useState<Promise<{ data: User[] }>>(
    fetchData()
  );

  const postUser = async (formData: FormData) => {
    startTransition(() => {
      setUsersPromise(postData(formData));
    });
  };

  return (
    <Box p="md">
      <LoadingOverlay visible={isPending} zIndex={1000} />
      <Box>
        <form action={postUser}>
          <TextInput
            w="20em"
            required
            name="name"
            label="user name"
            placeholder="please input user name"
          />
        </form>
        <Suspense fallback={<Fallback />}>
          <UserTable usersPromise={usersPromise} />
        </Suspense>
      </Box>
    </Box>
  );
};
