import fastify from "fastify";
import autoLoad from "@fastify/autoload";
import formBody from "@fastify/formbody";
import path from "node:path";

export const bootstrap = async () => {
  const app = fastify();

  await app.register(formBody);
  await app.register(autoLoad, {
    dir: path.resolve(import.meta.dirname, "routes"),
    dirNameRoutePrefix: false,
  });

  return app;
};
