import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  user: {
    id: primaryKey(String),
    name: String,
    like: Number,
  },
});

for (let i = 0; i < 10; i++) {
  db.user.create({
    id: String(i + 1),
    name: `User ${i + 1}`,
    like: 0,
  });
}

export type User = {
  id: string;
  name: string;
  like: number;
};
