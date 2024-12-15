import { setupServer } from "msw/node";
import { factory, primaryKey } from "@mswjs/data";

const db = factory({
  user: {
    id: primaryKey(String),
    firstName: String,
  },
});

export const handlers = [...db.user.toHandlers("rest")];

// Establish requests interception.
const server = setupServer(...handlers);
server.listen();
