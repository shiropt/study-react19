import { Button, Skeleton, Table } from "@mantine/core";
import { FC } from "react";
import { User } from "../mocks/db";
import { IconHeart } from "@tabler/icons-react";

type Props = {
  isLoading: boolean;
  users: User[];
  handleLikeButtonClick: (id: string) => void;
};

export const UserTable: FC<Props> = ({
  isLoading,
  users,
  handleLikeButtonClick,
}) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>id</Table.Th>
          <Table.Th>name</Table.Th>
          <Table.Th aria-label="like"></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {isLoading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <Table.Tr key={index}>
                  <Table.Td colSpan={3}>
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
              <Table.Td>
                <Button
                  onClick={() => handleLikeButtonClick(user.id)}
                  size="xs"
                  c={user.like >= 1 ? "red" : "black"}
                  leftSection={<IconHeart size={12} />}
                  variant="transparent"
                  styles={{
                    section: { marginRight: 2 },
                    label: { fontWeight: 400 },
                  }}
                >
                  {user.like}
                </Button>
              </Table.Td>
            </Table.Tr>
          ))
        )}
      </Table.Tbody>
    </Table>
  );
};
