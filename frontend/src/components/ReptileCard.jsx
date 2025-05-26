import React from "react";

const ReptileCard = ({ reptile, onDelete, onUpdate }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-md p-4">
      <img
        src={reptile.image}
        alt={reptile.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-1">{reptile.name}</h2>
      <p className="text-gray-600 italic mb-2">
        {reptile.type} - {reptile.color}
      </p>
      <p className="text-sm mb-2">{reptile.description}</p>
      <ul className="text-sm text-gray-700 mb-2 space-y-1">
        <li>
          <strong>Weight:</strong> {reptile.weight} kg
        </li>
        <li>
          <strong>Habitat:</strong> {reptile.habitat}
        </li>
        <li>
          <strong>Continent:</strong> {reptile.continent}
        </li>
        <li>
          <strong>Temperament:</strong> {reptile.temperament}
        </li>
        <li>
          <strong>Venomous:</strong> {reptile.isVenomous ? "Yes" : "No"}
        </li>
        <button
          onClick={() => onDelete(reptile.id)}
          className="bg-red-500 px-2 py-1 text-black rounded border
             border-red-800 ml-6"
        >
          Delete
        </button>
        <button
          onClick={() => onUpdate(reptile)}
          className="bg-blue-500 px-2 py-1 text-black rounded border border-blue-800 ml-6 "
        >
          Edit
        </button>
      </ul>
    </div>
  );
};

export default ReptileCard;
