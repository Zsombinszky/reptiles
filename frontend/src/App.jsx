import { useEffect } from "react";
import { useState } from "react";
import ReptileCard from "./components/ReptileCard";

function App() {
  const [reptiles, setReptiles] = useState([]);
  const [reptile, setReptile] = useState({});
  const [selectedReptile, setSelectedReptile] = useState({});
  const [newReptile, setNewReptile] = useState({
    name: "",
    type: "",
    weight: "",
    color: "",
    description: "",
    image: "",
    isVenomous: false,
    habitat: "",
    continent: "",
    temperament: "",
  });

  useEffect(() => {
    const fetchReptiles = async () => {
      const response = await fetch("/api/reptiles");
      const data = await response.json();
      setReptiles(data);
    };

    fetchReptiles();

    /*  const fetchReptileById = async (id) => {
      const response = await fetch(`/api/reptiles/${id}`);
      const data = await response.json();
      setReptile(data);
    };

    fetchReptileById(7); */
  }, []);

  const handleCreateReptile = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/reptiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReptile),
      });

      if (!res.ok) throw new Error("Failed to create reptile");

      const data = await res.json();
      console.log(data);

      setReptiles((prev) => [...prev, data]);
      alert("Reptile created successfully");
    } catch (error) {
      console.error("Error: ", error);
      alert("Failed to create reptile.");
    }
  };

  const handleDeleteReptile = async (reptileId) => {
    try {
      const res = await fetch(`/api/reptiles/${reptileId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete reptile.");

      setReptiles((prev) => prev.filter((r) => r.id !== reptileId));

      alert("Reptile deleted successfully");
    } catch (error) {
      console.error("Error: ", error);
      alert("Failed to delete reptile.");
    }
  };

  const handleSelectReptile = async (reptile) => {
    setSelectedReptile(reptile);
  };

  const handleUpdateReptile = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/reptiles/${selectedReptile.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedReptile),
      });

      if (!res.ok) {
        throw new Error("Failed to update reptile");
      }

      const updated = await res.json();
      setReptiles((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );

      setSelectedReptile({});
      alert("Reptile updated successfully");
    } catch (error) {
      console.error("Error: ", error);
      alert("Failed to update reptile");
    }
  };

  return (
    <div className="flex flex-col">
      {/* show all reptiles */}
      <div>
        <h1 className="text-3xl text-blue-500">Reptile List</h1>
        <ul>
          {reptiles.map((r) => (
            <li className="mb-4" key={r.id}>
              {r.name}
              <button
                onClick={() => handleDeleteReptile(r.id)}
                className="bg-red-500 px-2 py-1 text-black rounded border
             border-red-800 ml-6"
              >
                Delete
              </button>
              <button
                onClick={() => handleSelectReptile(r)}
                className="bg-blue-500 px-2 py-1 text-black rounded border border-blue-800 ml-6 "
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {reptiles.map((r) => (
        <ReptileCard
          key={r.id}
          reptile={r}
          onDelete={handleDeleteReptile}
          onUpdate={handleSelectReptile}
        />
      ))}

      {/* fetch one reptile by Id */}
      {/* <div>
        <h1 className="text-3xl text-blue-500">Get Reptile by ID</h1>
        <div>
          <h2 className="text-3xl">{reptile.name}</h2>
          <p>{reptile.type}</p>
          <p>{reptile.description}</p>
          <p>{reptile.continent}</p>
          <img
            className="object-cover rounded-lg"
            src={reptile.image}
            alt={reptile.name}
          />
        </div>
      </div> */}

      {/* create reptile with form */}
      {/*  <div>
        <h1 className="text-3xl text-blue-500">Create Reptile</h1>
        <form
          onSubmit={handleCreateReptile}
          className="flex flex-col gap-2 p-6"
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="ml-6"
              type="text"
              name="name"
              value={newReptile.name}
              onChange={(e) =>
                setNewReptile({ ...newReptile, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <input
              className="ml-6"
              type="text"
              name="type"
              value={newReptile.type}
              onChange={(e) =>
                setNewReptile({ ...newReptile, type: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="weight">Weight</label>
            <input
              className="ml-6"
              type="number"
              name="weight"
              value={newReptile.weight}
              onChange={(e) =>
                setNewReptile({ ...newReptile, weight: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="color">Color</label>
            <input
              className="ml-6"
              type="text"
              name="color"
              value={newReptile.color}
              onChange={(e) =>
                setNewReptile({ ...newReptile, color: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              className="ml-6"
              type="text"
              name="description"
              value={newReptile.description}
              onChange={(e) =>
                setNewReptile({ ...newReptile, description: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              className="ml-6"
              type="text"
              name="image"
              value={newReptile.image}
              onChange={(e) =>
                setNewReptile({ ...newReptile, image: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="isVenomous">IsVenomous</label>
            <input
              className="ml-6"
              type="checkbox"
              name="isVenomous"
              checked={newReptile.isVenomous}
              onChange={(e) =>
                setNewReptile({ ...newReptile, isVenomous: e.target.checked })
              }
            />
          </div>
          <div>
            <label htmlFor="habitat">Habitat</label>
            <input
              className="ml-6"
              type="text"
              name="habitat"
              value={newReptile.habitat}
              onChange={(e) =>
                setNewReptile({ ...newReptile, habitat: e.target.value })
              }
            />
          </div>{" "}
          <div>
            <label htmlFor="continent">Continent</label>
            <input
              className="ml-6"
              type="text"
              name="continent"
              value={newReptile.continent}
              onChange={(e) =>
                setNewReptile({ ...newReptile, continent: e.target.value })
              }
            />
          </div>{" "}
          <div>
            <label htmlFor="temperament">Temperament</label>
            <input
              className="ml-6"
              type="text"
              name="temperament"
              value={newReptile.temperament}
              onChange={(e) =>
                setNewReptile({ ...newReptile, temperament: e.target.value })
              }
            />
          </div>
          <button type="submit">Create Reptile</button>
        </form>
      </div> */}

      {/* UPDATE */}
      {selectedReptile?.id && (
        <>
          <button
            onClick={() => setSelectedReptile({})}
            className="bg-gray-300 px-2 py-1 text-black rounded mt-2 w-fit"
          >
            Cancel
          </button>
          <h1>Update Reptile</h1>
          <form
            onSubmit={handleUpdateReptile}
            className="flex flex-col gap-2 p-6"
          >
            <div>
              <label htmlFor="name">Name</label>
              <input
                className="ml-6"
                type="text"
                name="name"
                value={selectedReptile.name}
                onChange={(e) =>
                  setSelectedReptile({
                    ...selectedReptile,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="type">Type</label>
              <input
                className="ml-6"
                type="text"
                name="type"
                value={selectedReptile.type}
                onChange={(e) =>
                  setSelectedReptile({
                    ...selectedReptile,
                    type: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="weight">Weight</label>
              <input
                className="ml-6"
                type="number"
                name="weight"
                value={selectedReptile.weight}
                onChange={(e) =>
                  setSelectedReptile({
                    ...selectedReptile,
                    weight: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="color">Color</label>
              <input
                className="ml-6"
                type="text"
                name="color"
                value={selectedReptile.color}
                onChange={(e) =>
                  setSelectedReptile({
                    ...selectedReptile,
                    color: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                className="ml-6"
                type="text"
                name="description"
                value={selectedReptile.description}
                onChange={(e) =>
                  setSelectedReptile({
                    ...selectedReptile,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                className="ml-6"
                type="text"
                name="image"
                value={selectedReptile.image}
                onChange={(e) =>
                  setSelectedReptile({
                    ...selectedReptile,
                    image: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="isVenomous">IsVenomous</label>
              <input
                className="ml-6"
                type="checkbox"
                name="isVenomous"
                checked={selectedReptile.isVenomous}
                onChange={(e) =>
                  setSelectedReptile({
                    ...selectedReptile,
                    isVenomous: e.target.checked,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="habitat">Habitat</label>
              <input
                className="ml-6"
                type="text"
                name="habitat"
                value={selectedReptile.habitat}
                onChange={(e) =>
                  setSelectedReptile({
                    ...selectedReptile,
                    habitat: e.target.value,
                  })
                }
              />
            </div>{" "}
            <div>
              <label htmlFor="continent">Continent</label>
              <input
                className="ml-6"
                type="text"
                name="continent"
                value={selectedReptile.continent}
                onChange={(e) =>
                  setSelectedReptile({
                    ...selectedReptile,
                    continent: e.target.value,
                  })
                }
              />
            </div>{" "}
            <div>
              <label htmlFor="temperament">Temperament</label>
              <input
                className="ml-6"
                type="text"
                name="temperament"
                value={selectedReptile.temperament}
                onChange={(e) =>
                  setSelectedReptile({
                    ...selectedReptile,
                    temperament: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
