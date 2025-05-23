import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3001;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reptilesPath = path.join(__dirname, "reptiles.json");

//POST /api/reptiles create reptile
app.post("/api/reptiles", async (request, response) => {
  const newReptile = request.body;
  try {
    const data = await fs.readFile(reptilesPath, "utf-8");
    const reptiles = JSON.parse(data);

    const newId = reptiles.length ? reptiles[reptiles.length - 1].id + 1 : 1;
    const newReptileWithId = { ...newReptile, id: newId };
    reptiles.push(newReptileWithId);

    await fs.writeFile(reptilesPath, JSON.stringify(reptiles, null, 2));
    response.status(201).json(newReptile);
  } catch (error) {
    console.error("Error creating reptile ", error);
    response.status(500).json({ error: "Could not create reptile" });
  }
});

//DELETE /api/reptiles/:id delete reptile
app.delete("/api/reptiles/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const data = await fs.readFile(reptilesPath, "utf-8");
    const reptiles = await JSON.parse(data);
    const index = reptiles.findIndex((r) => r.id === parseInt(id));
    if (index === -1) {
      response.status(404).json({ error: "Reptile not found" });
    }

    reptiles.splice(index, 1);

    await fs.writeFile(reptilesPath, JSON.stringify(reptiles, null, 2));
    response.json({ message: "Reptile deleted successfully" });
  } catch (error) {
    console.error("Error deleting reptile ", error);
    response.status(500).json({ error: "Could not delete reptile" });
  }
});

//PUT /api/reptiles/:id update reptile
app.put("/api/reptiles/:id", async (request, response) => {
  const { id } = request.params;
  const updatedReptile = request.body;
  try {
    const data = await fs.readFile(reptilesPath, "utf-8");
    const reptiles = await JSON.parse(data);
    const index = reptiles.findIndex((r) => r.id === parseInt(id));
    if (index === -1) {
      response.status(404).json({ error: "Reptile not found" });
    }

    reptiles[index] = { ...reptiles[index], ...updatedReptile };
    await fs.writeFile(reptilesPath, JSON.stringify(reptiles, null, 2));
    response.json({ message: "Reptile updated successfully" });
  } catch (error) {
    console.error("Error updating reptile data");
    response.status(500).json({ error: "Failed to update reptile's data" });
  }
});

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

// Listen to PORT
app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`);
});
