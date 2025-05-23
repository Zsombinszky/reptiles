import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [reptiles, setReptiles] = useState([]);
  const [reptile, setReptile] = useState({});
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
    /* const fetchReptiles = async () => {
      const response = await fetch("/api/reptiles");
      const data = await response.json();
      setReptiles(data);
    };

    fetchReptiles(); */
    /*  const fetchReptileById = async (id) => {
      const response = await fetch(`/api/reptiles/${id}`);
      const data = await response.json();
      setReptile(data);
    };

    fetchReptileById(7); */
  }, []);

  return (
    <div className="flex flex-col">
      {/* show all reptiles */}
      {/* <div>
        <h1 className="text-3xl text-blue-500">Reptile List</h1>
        <ul>
          {reptiles.map((r) => (
            <li key={r.id}>{r.name}</li>
          ))}
        </ul>
      </div> */}

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
      <div>
        <h1 className="text-3xl text-blue-500">Create Reptile</h1>
        <form onSubmit={() => {}} className="flex flex-col gap-2 p-6">
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
          <button type="submit">Create Reptile</button>
        </form>
      </div>
    </div>
  );
}

export default App;
