import "dotenv/config";
import { createApp } from "./app.js";

const port = Number(process.env.PORT || 3109);
const app = createApp();

app.listen(port, () => {
  console.log(`funil-api listening on :${port}`);
});
