import { Button, Table } from "@mantine/core";
import { FC, use } from "react";
import { User } from "../mocks/db";
import { IconHeart } from "@tabler/icons-react";

export const TableContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>id</Table.Th>
          <Table.Th>name</Table.Th>
          <Table.Th aria-label="like"></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{children}</Table.Tbody>
    </Table>
  );
};

type Props = {
  usersPromise: Promise<{ data: User[] }>;
  handleLikeButtonClick?: (id: string) => void;
};

export const UserTable: FC<Props> = ({
  usersPromise,
  handleLikeButtonClick,
}) => {
  if (!usersPromise) return null;
  const users = use(usersPromise);

  return (
    <TableContainer>
      {users.data.map((user) => (
        <Table.Tr key={user.id}>
          <Table.Td>{user.id}</Table.Td>
          <Table.Td>{user.name}</Table.Td>
          <Table.Td>
            <Button
              onClick={() => handleLikeButtonClick?.(user.id)}
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
      ))}
    </TableContainer>
  );
};
