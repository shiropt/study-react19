import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  user: {
    id: primaryKey(String),
    name: String,
  },
});

for (let i = 0; i < 10; i++) {
  db.user.create({
    id: String(i + 1),
    name: `User ${i + 1}`,
  });
}
