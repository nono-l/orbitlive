import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type CommentRow = {
  id: number;
  userId: string;
  authorName: string;
  authorImage: string | null;
  body: string;
  createdAt: string;
  mine: boolean;
};

type CommentSql = {
  id: number;
  user_id: string;
  author_name: string;
  author_image: string | null;
  body: string;
  created_at: string;
};

function mapRow(row: CommentSql, viewerId: string | null): CommentRow {
  return {
    id: row.id,
    userId: row.user_id,
    authorName: row.author_name,
    authorImage: row.author_image,
    body: row.body,
    createdAt: row.created_at,
    mine: viewerId !== null && row.user_id === viewerId,
  };
}

export const listComments = createServerFn({ method: "GET" }).handler(
  async (): Promise<CommentRow[]> => {
    const sql = await getSql();
    const rows = await sql<CommentSql>`
      select
        id,
        user_id,
        author_name,
        author_image,
        body,
        created_at::text as created_at
      from comments
      order by created_at desc
      limit 80
    `;
    return rows.map((row) => mapRow(row, null));
  },
);

export const addComment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) =>
    z
      .object({
        body: z.string().trim().min(1).max(400),
      })
      .parse(data),
  )
  .handler(async ({ context, data }): Promise<CommentRow> => {
    const sql = await getSql();
    const users = await sql<{ name: string; image: string | null }>`
      select name, image from "user" where id = ${context.userId} limit 1
    `;
    const authorName = users[0]?.name?.trim() || "Signed-in";
    const authorImage = users[0]?.image ?? null;
    const inserted = await sql<CommentSql>`
      insert into comments (user_id, author_name, author_image, body)
      values (${context.userId}, ${authorName}, ${authorImage}, ${data.body})
      returning
        id,
        user_id,
        author_name,
        author_image,
        body,
        created_at::text as created_at
    `;
    const row = inserted[0];
    if (!row) throw new Error("Failed to save comment");
    return mapRow(row, context.userId);
  });

export const deleteComment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => z.object({ id: z.number().int().positive() }).parse(data))
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    const sql = await getSql();
    await sql`
      delete from comments
      where id = ${data.id} and user_id = ${context.userId}
    `;
    return { ok: true };
  });
