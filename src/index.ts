import { bootstrap } from "./server";

const app = await bootstrap();

const host = process.env.API_HOST || "0.0.0.0";
const port = parseInt(process.env.API_PORT || "8080");

try {
  await app.listen({
    host,
    port,
  });

  console.log(`Server running at http://${host}:${port}`);
  console.log("Press CTR+C to stop it");
} catch (error) {
  console.error("The app can't be listen");
  console.error(error);
}
