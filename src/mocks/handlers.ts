import { delay, http, HttpResponse, PathParams } from "msw";
import { db } from "./db";

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

  http.post<PathParams<string>, { name: string }>(
    "/user",
    async ({ request }) => {
      await delay(1000);
      const data = await request.json();
      const user = db.user.create({
        id: String(db.user.getAll().length + 1),
        name: data.name,
      });
      return HttpResponse.json({
        data: user,
      });
    }
  ),

  http.put<{ id: string }, { name: string }>(
    "/user/:id",
    async ({ params, request }) => {
      await delay(1000);
      const { id } = params;
      const data = await request.json();
      const user = db.user.update({
        where: { id: { equals: id } },
        data: data,
      });
      return HttpResponse.json({
        data: user,
      });
    }
  ),

  http.delete<{ id: string }>("/user/:id", async ({ params }) => {
    const { id } = params;
    await delay(1000);
    const user = db.user.delete({ where: { id: { equals: id } } });
    return HttpResponse.json({
      data: user,
    });
  }),
];
