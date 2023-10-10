import { useState, useContext } from "react";
import { set, unset } from "lodash";
import { CharacterContext } from "./CharacterTemplate";

export default function NestedObject({ obj, path }) {
  const { setCharacter } = useContext(CharacterContext);
  const isAtRoot = [...path].length === 1;
  const isAtAbilityScoresRoot = [...path].slice(-1)[0] === "abilityScores";
  const isAtSpellsRoot = [...path].slice(-1)[0] === "spells";
  const isAtSpellLevels = [...path][0] === "spells" && [...path].length === 2;

  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newSpellLevel, setNewSpellLevel] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleUpdate = (event, path) => {
    const currentValue = event.target.value;
    console.log("Updating path", path, "with value", currentValue);
    setCharacter((prev) => {
      const character = { ...prev };
      set(character, path, currentValue); // use lodash set method to set value to object using path
      return character;
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    // const upLevelPath = path.slice(0, -1); // go back a level
    setCharacter((prev) => {
      const character = { ...prev };
      unset(character, path);
      return character;
    });
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    if (newItemName && newItemDesc) {
      if (isAtSpellLevels) {
        setCharacter((prev) => {
          const character = { ...prev };
          set(character, [...path, newItemName, "description"], newItemDesc);
          return character;
        });
      } else {
        setCharacter((prev) => {
          const character = { ...prev };
          set(character, [...path, newItemName, "description"], newItemDesc);
          return character;
        });
      }
    }
    console.log(obj);
    setNewItemName("");
    setNewItemDesc("");
  };

  const handleAddSpellLevel = (event) => {
    event.preventDefault();
    if (newSpellLevel) {
      setCharacter((prev) => {
        const character = { ...prev };
        set(character, [...path, newSpellLevel], {});
        return character;
      });
    }
    console.log(obj);
    setNewSpellLevel("");
  };

  const handleDeleteSpellLevel = (event) => {
    event.preventDefault();
    setCharacter((prev) => {
      const character = { ...prev };
      unset(character, path);
      return character;
    });
  };

  return (
    <div>
      {obj &&
        Object.entries(obj).map(([key, value]) => {
          const currentPath = [...path, key];

          return typeof value === "object" ? (
            <div key={key}>
              <label className="text-2xl">{key}</label>

              <NestedObject obj={value} path={currentPath} />
            </div>
          ) : (
            <div key={key} className="flex flex-row justify-center">
              <label className="text-1xl">{key}</label>
              {isAtAbilityScoresRoot ? (
                <input
                  onKeyDown={handleKeyPress}
                  type="text"
                  value={value as string}
                  onChange={(event) => handleUpdate(event, currentPath)}
                />
              ) : (
                <>
                  <input
                    onKeyDown={handleKeyPress}
                    type="text"
                    value={value as string}
                    onChange={(event) => handleUpdate(event, currentPath)}
                  />
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
                    onClick={(event) => handleDelete(event)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          );
        })}
      {/* to add new spell level category */}
      {isAtSpellsRoot && (
        <div>
          <label>New Level</label>
          <input
            onKeyDown={handleKeyPress}
            type="text"
            placeholder=""
            value={newSpellLevel}
            onChange={(e) => setNewSpellLevel(e.target.value)}
          />
          <button
            className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
            type="button"
            onClick={(event) => handleAddSpellLevel(event)}
          >
            Add Level
          </button>
        </div>
      )}
      {/* to add new spell under spell -> level */}
      {isAtSpellLevels && (
        <div>
          <label>New Spell</label>
          <input
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <input
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="description"
            value={newItemDesc}
            onChange={(e) => setNewItemDesc(e.target.value)}
          />

          <button
            type="button"
            className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
            onClick={(event) => handleAddItem(event)}
          >
            Add
          </button>

          <div>
            <button
              className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
              type="button"
              onClick={(event) => handleDeleteSpellLevel(event)}
            >
              Delete Level
            </button>
          </div>
        </div>
      )}
      {/* add new name, description into current obj excluding spells */}
      {!isAtSpellsRoot && !isAtAbilityScoresRoot && isAtRoot && (
        <div>
          <label>New Item</label>
          <input
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <input
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="description"
            value={newItemDesc}
            onChange={(e) => setNewItemDesc(e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleAddItem(event)}
            className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-3 rounded-full"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}