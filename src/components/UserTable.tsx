import { Skeleton, Table } from "@mantine/core";
import { FC } from "react";

type Props = {
  isLoading: boolean;
  users: { id: string; name: string }[];
};

export const UserTable: FC<Props> = ({ isLoading, users }) => {
  return (
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
  );
};
