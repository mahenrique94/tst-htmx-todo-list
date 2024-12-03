import { FastifyInstance } from "fastify";
import fs from "node:fs/promises";
import path from "node:path";
import { TaskRepository } from "../repositories/task";
import { noTasksListItemUi, taskListItemUi } from "../utils/view";

export default (fastify: FastifyInstance) => {
  fastify.get("/", async (_, reply) => {
    const content = await fs.readFile(
      path.resolve(import.meta.dirname, "..", "views", "index.html"),
      "utf-8"
    );

    reply.header("content-type", "text/html");

    const tasks = TaskRepository.singleton().getAll();

    return reply.send(
      content.replace(
        "<slot />",
        tasks.length > 0
          ? tasks.map((t) => taskListItemUi(t)).join("")
          : noTasksListItemUi()
      )
    );
  });
};
