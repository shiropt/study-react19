import { delay, http, HttpResponse, PathParams } from "msw";
import { db, User } from "./db";

export const handlers = [
  http.get("/users", async () => {
    const users = db.user.getAll();
    await delay(1000);
    return HttpResponse.json({
      data: users,
    });
  }),

  http.get<{ id: string }>("/user/:id", async ({ params }) => {
    const { id } = params;
    await delay(1000);

    const user = db.user.findFirst({ where: { id: { equals: id } } });
    return HttpResponse.json({
      data: user,
    });
  }),

  http.post<PathParams<string>, Pick<User, "name">>(
    "/user",
    async ({ request }) => {
      await delay(1000);
      const data = await request.json();
      const user = db.user.create({
        id: String(db.user.getAll().length + 1),
        name: data.name,
        like: 0,
      });
      return HttpResponse.json({
        data: user,
      });
    }
  ),

  http.put<{ id: string }, User>("/user/:id", async ({ params, request }) => {
    await delay(1000);
    const { id } = params;
    const data = await request.json();
    db.user.update({
      where: { id: { equals: id } },
      data: data,
    });
    const users = db.user.getAll();
    return HttpResponse.json({
      data: users,
    });
  }),

  http.delete<{ id: string }>("/user/:id", async ({ params }) => {
    const { id } = params;
    await delay(1000);
    db.user.delete({ where: { id: { equals: id } } });
    const users = db.user.getAll();
    return HttpResponse.json({
      data: users,
    });
  }),
];
