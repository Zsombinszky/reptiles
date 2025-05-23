import express, { response } from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3001;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reptilesPath = path.join(__dirname, "reptiles.json");

//GET /api/reptiles get all reptiles
app.get("/api/reptiles", async (request, response) => {
  try {
    const data = await fs.readFile(reptilesPath, "utf-8");
    const reptiles = await JSON.parse(data);

    response.json(reptiles);
  } catch (error) {
    console.error("Error reading file: ", error);
    response.status(500).json({ error: "Server error" });
  }
});

//GET /api/reptiles/:id
app.get("/api/reptiles/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const data = await fs.readFile(reptilesPath, "utf-8");
    const reptiles = await JSON.parse(data);

    const reptile = reptiles.find((reptile) => reptile.id === parseInt(id));

    if (!reptile) {
      response.status(404).json({ error: "Reptile not found" });
    }

    response.json(reptile);
  } catch (error) {
    console.error("Error reading reptile: ", error);
    response.status(500).json({ error: "Could not get reptile" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`);
});
