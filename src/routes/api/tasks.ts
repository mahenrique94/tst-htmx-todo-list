import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import { TaskRepository } from "../../repositories/task";
import { noTasksListItemUi, taskListItemUi } from "../../utils/view";

const postInputSchema = Type.Object({
  task: Type.String(),
});

const deleteInputSchema = Type.Object({
  id: Type.String({ format: "uuid" }),
});

export default (fastify: FastifyInstance) => {
  fastify.delete<{ Params: Static<typeof deleteInputSchema> }>(
    "/api/tasks/:id",
    {
      schema: {
        params: deleteInputSchema,
      },
    },
    (request, reply) => {
      TaskRepository.singleton().delete(request.params.id);

      const remainingTasks = TaskRepository.singleton().getAll();

      return reply.send(remainingTasks.length > 0 ? "" : noTasksListItemUi());
    }
  );

  fastify.post<{ Body: Static<typeof postInputSchema> }>(
    "/api/tasks",
    {
      schema: {
        body: postInputSchema,
      },
    },
    (request, reply) => {
      const newTask = TaskRepository.singleton().add(request.body.task);

      return reply.send(taskListItemUi(newTask));
    }
  );
};
