"use client";

import { useState } from "react";

interface Character {
  id: string;
  name: string;
  class: string;
  level: number;
  hp: number;
  maxHp: number;
  customImage?: string;
  ac?: number;
  spellSlots?: number;
  conditions?: string[];
}

interface Monster {
  id: string;
  name: string;
  type: string;
  ac: number;
  hp: number;
  damage?: string;
  abilities?: string[];
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "characters" | "combat" | "monsters">("dashboard");
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "1",
      name: "Raul",
      class: "Operative",
      level: 5,
      hp: 45,
      maxHp: 45,
      customImage: "/images/raul.jpg",
      ac: 16,
      spellSlots: 0,
      conditions: [],
    },
    {
      id: "2",
      name: "Sog.Wog",
      class: "Specialist",
      level: 5,
      hp: 32,
      maxHp: 32,
      ac: 15,
      spellSlots: 0,
      conditions: [],
    },
  ]);

  const [monsters, setMonsters] = useState<Monster[]>([
    {
      id: "m1",
      name: "Eldar Team",
      type: "Astra Militarum",
      ac: 15,
      hp: 7,
      damage: "1d6+2",
      abilities: ["Lasgun", "Bayonet"],
    },
    {
      id: "m2",
      name: "Necron Team",
      type: "Xenos",
      ac: 13,
      hp: 15,
      damage: "1d8+3",
      abilities: ["Gauss Flayer", "Melee"],
    },
    {
      id: "m3",
      name: "Chaos Team",
      type: "Heretic Astartes",
      ac: 16,
      hp: 27,
      damage: "1d8+4",
      abilities: ["Bolter", "Chain Sword"],
    },
  ]);

  const [combatants, setCombatants] = useState<Character[]>([
    {
      id: "1",
      name: "Raul",
      class: "Operative",
      level: 5,
      hp: 45,
      maxHp: 45,
      ac: 16,
      spellSlots: 0,
      conditions: ["Concentration"],
    },
    {
      id: "e1",
      name: "Eldar Operative",
      class: "Xenos Team",
      level: 1,
      hp: 7,
      maxHp: 7,
      ac: 15,
      spellSlots: 0,
      conditions: [],
    },
  ]);

  const conditionsList = ["Poisoned", "Prone", "Paralyzed", "Concentration", "Advantage", "Disadvantage", "Invisible"];

  const [newCharName, setNewCharName] = useState("");
  const [newCharClass, setNewCharClass] = useState("Fighter");
  const [newCharLevel, setNewCharLevel] = useState(1);

  const addCharacter = () => {
    if (newCharName.trim()) {
      setCharacters([
        ...characters,
        {
          id: Math.random().toString(),
          name: newCharName,
          class: newCharClass,
          level: newCharLevel,
          hp: 30,
          maxHp: 30,
        },
      ]);
      setNewCharName("");
    }
  };

  const updateCharacterHp = (id: string, newHp: number) => {
    setCharacters(
      characters.map((c) =>
        c.id === id ? { ...c, hp: Math.max(0, Math.min(newHp, c.maxHp)) } : c
      )
    );
  };

  const deleteCharacter = (id: string) => {
    setCharacters(characters.filter((c) => c.id !== id));
  };

  const toggleCondition = (id: string, condition: string) => {
    setCharacters(
      characters.map((c) => {
        if (c.id === id) {
          const conditions = c.conditions || [];
          return {
            ...c,
            conditions: conditions.includes(condition)
              ? conditions.filter((cond) => cond !== condition)
              : [...conditions, condition],
          };
        }
        return c;
      })
    );
  };

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCharacters(
          characters.map((c) =>
            c.id === id ? { ...c, customImage: imageData } : c
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const getCharacterImage = (character: Character) => {
    if (character.customImage) {
      return character.customImage;
    }
    // Using DiceBear API for generated character avatars
    const seed = encodeURIComponent(character.name);
    return `https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}&scale=80&backgroundColor=b6e3f5`;
  };

  const addMonsterToCombat = (monster: Monster) => {
    setCombatants([
      ...combatants,
      {
        id: Math.random().toString(),
        name: monster.name,
        class: monster.type,
        level: 1,
        hp: monster.hp,
        maxHp: monster.hp,
        ac: monster.ac,
        spellSlots: 0,
        conditions: [],
      },
    ]);
  };

  const sortedCombatants = [...combatants].sort(
    (a, b) => (b.ac || 0) - (a.ac || 0)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <nav className="bg-slate-950 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-amber-400">🔫 Raul Nikki Game Tracker: Bang Your Dead</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your team and matches</p>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-6 flex-wrap">
          {["dashboard", "characters", "combat", "monsters"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeTab === tab
                  ? "bg-amber-500 text-slate-900"
                  : "bg-slate-700 text-slate-100 hover:bg-slate-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
                <div className="text-slate-400 text-sm">Team Size</div>
                <div className="text-4xl font-bold text-amber-400 mt-2">{characters.length}</div>
              </div>
              <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
                <div className="text-slate-400 text-sm">Avg Operational Status</div>
                <div className="text-4xl font-bold text-amber-400 mt-2">
                  {Math.round((characters.reduce((a, c) => a + c.hp, 0) / characters.reduce((a, c) => a + c.maxHp, 0)) * 100) || 0}%
                </div>
              </div>
              <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
                <div className="text-slate-400 text-sm">Active Matches</div>
                <div className="text-4xl font-bold text-amber-400 mt-2">3</div>
              </div>
            </div>

            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
              <h2 className="text-2xl font-bold text-amber-400 mb-4">Current Mission</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-slate-400">Team Name:</span>
                  <span className="text-slate-100 ml-2">Nemesis Claw</span>
                </div>
                <div>
                  <span className="text-slate-400">Faction:</span>
                  <span className="text-slate-100 ml-2">Astra Militarum</span>
                </div>
                <div>
                  <span className="text-slate-400">Current Match:</span>
                  <span className="text-slate-100 ml-2">Jawn Team Gaming Tournament</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "characters" && (
          <div className="space-y-6">
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
              <h2 className="text-2xl font-bold text-amber-400 mb-4">Add New Operative</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Operative Name"
                  value={newCharName}
                  onChange={(e) => setNewCharName(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-600 text-slate-100 placeholder-slate-400 rounded border border-slate-500 focus:outline-none focus:border-amber-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newCharClass}
                    onChange={(e) => setNewCharClass(e.target.value)}
                    className="px-4 py-2 bg-slate-600 text-slate-100 rounded border border-slate-500 focus:outline-none focus:border-amber-400"
                  >
                    <option>Gunner</option>
                    <option>Sniper</option>
                    <option>Leader</option>
                    <option>Scout</option>
                    <option>Specialist</option>
                    <option>Demolitions</option>
                  </select>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newCharLevel}
                    onChange={(e) => setNewCharLevel(parseInt(e.target.value))}
                    className="px-4 py-2 bg-slate-600 text-slate-100 rounded border border-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  onClick={addCharacter}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 rounded transition"
                >
                  Add Operative
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {characters.map((character) => (
                <div key={character.id} className="bg-slate-700 p-6 rounded-lg border border-slate-600 hover:border-amber-500 transition overflow-hidden">
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 relative group">
                      <img
                        src={getCharacterImage(character)}
                        alt={character.name}
                        className="w-24 h-24 rounded-lg border-2 border-amber-500 object-cover"
                      />
                      <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 cursor-pointer transition">
                        <span className="text-white text-xs font-semibold text-center px-1">Change Image</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                          onChange={(e) => handleImageUpload(character.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-amber-400">{character.name}</h3>
                          <p className="text-slate-400">
                            Level {character.level} {character.class}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteCharacter(character.id)}
                          className="text-red-400 hover:text-red-300 font-semibold"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-3">
                        {/* Statblock Info */}
                        <div className="grid grid-cols-2 gap-2 p-2 bg-slate-600 rounded">
                          <div className="text-xs">
                            <span className="text-slate-400">AC:</span>
                            <span className="text-amber-400 ml-1">{character.ac || 10}</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-slate-400">Spells:</span>
                            <span className="text-amber-400 ml-1">{character.spellSlots || 0}</span>
                          </div>
                        </div>

                        {/* HP Bar */}
                        <div>
                          <div className="flex justify-between text-slate-300 mb-1">
                            <span>Hit Points</span>
                            <span>
                              {character.hp}/{character.maxHp}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1 bg-slate-600 rounded h-6 overflow-hidden">
                              <div
                                className="bg-green-500 h-full transition-all"
                                style={{ width: `${(character.hp / character.maxHp) * 100}%` }}
                              />
                            </div>
                            <input
                              type="number"
                              value={character.hp}
                              onChange={(e) => updateCharacterHp(character.id, parseInt(e.target.value))}
                              className="w-16 px-2 py-1 bg-slate-600 text-slate-100 rounded border border-slate-500 text-sm"
                            />
                          </div>
                        </div>

                        {/* Conditions */}
                        <div>
                          <div className="text-sm text-slate-400 mb-2">Conditions:</div>
                          <div className="flex flex-wrap gap-1">
                            {conditionsList.map((condition) => (
                              <button
                                key={condition}
                                onClick={() => toggleCondition(character.id, condition)}
                                className={`text-xs px-2 py-1 rounded transition ${
                                  character.conditions?.includes(condition)
                                    ? "bg-purple-600 text-white"
                                    : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                                }`}
                              >
                                {condition}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "combat" && (
          <div className="space-y-6">
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
              <h2 className="text-2xl font-bold text-amber-400 mb-4">Match Combat Tracker</h2>
              <div className="space-y-2">
                {sortedCombatants.map((combatant, index) => (
                  <div
                    key={combatant.id}
                    className={`flex items-center justify-between p-4 rounded ${
                      index === 0
                        ? "bg-amber-900 border-2 border-amber-500"
                        : "bg-slate-600 border border-slate-500"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div>
                          <div className="font-bold text-slate-100">{combatant.name}</div>
                          <div className="text-sm text-slate-400">AC: {combatant.ac}</div>
                        </div>
                        {index === 0 && (
                          <div className="text-amber-300 text-sm font-semibold ml-auto">Active Turn</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-xs bg-slate-500 px-2 py-1 rounded">
                          HP: {combatant.hp}/{combatant.maxHp}
                        </div>
                        <button
                          onClick={() => {
                            setCombatants(
                              combatants.map((c) =>
                                c.id === combatant.id
                                  ? { ...c, hp: Math.max(0, c.hp - 1) }
                                  : c
                              )
                            );
                          }}
                          className="text-red-400 hover:text-red-300 text-xs px-2 py-1 bg-red-900 rounded"
                        >
                          -1 HP
                        </button>
                        <button
                          onClick={() => {
                            setCombatants(
                              combatants.map((c) =>
                                c.id === combatant.id
                                  ? { ...c, hp: Math.min(c.maxHp, c.hp + 1) }
                                  : c
                              )
                            );
                          }}
                          className="text-green-400 hover:text-green-300 text-xs px-2 py-1 bg-green-900 rounded"
                        >
                          +1 HP
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {combatant.conditions && combatant.conditions.length > 0 && (
                          <div className="text-xs">
                            {combatant.conditions.map((cond) => (
                              <span
                                key={cond}
                                className="inline-block bg-purple-600 text-white px-2 py-1 rounded mr-1 mb-1"
                              >
                                {cond}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "monsters" && (
          <div className="space-y-6">
            <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
              <h2 className="text-2xl font-bold text-amber-400 mb-4">Enemy Teams & Match Builder</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monsters.map((monster) => (
                  <div key={monster.id} className="bg-slate-600 p-4 rounded border border-slate-500 hover:border-amber-500 transition">
                    <h3 className="font-bold text-amber-400 mb-2">{monster.name}</h3>
                    <div className="text-sm text-slate-300 space-y-1 mb-3">
                      <div><span className="text-slate-400">Faction:</span> {monster.type}</div>
                      <div><span className="text-slate-400">AC:</span> {monster.ac}</div>
                      <div><span className="text-slate-400">HP:</span> {monster.hp}</div>
                      {monster.damage && <div><span className="text-slate-400">Damage:</span> {monster.damage}</div>}
                      {monster.abilities && (
                        <div>
                          <span className="text-slate-400">Weapons:</span> {monster.abilities.join(", ")}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => addMonsterToCombat(monster)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-2 rounded transition text-sm"
                    >
                      Add to Match
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
