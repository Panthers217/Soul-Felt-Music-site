


import React, { useState } from "react";
import { Disc3, Mic } from "lucide-react";

const tables = {
  artists: {
    icon: Mic,
    fields: [
      "id",
      "name",
      "bio",
      "image_url",
      "demos",
      "artist_country",
      "Career_Highlights",
      "Influences",
      "Featured_Tracks",
    ],
    data: [
      {
        id: 1,
        name: "Luna Rivers",
        bio: "Indie pop sensation with ethereal vocals and dreamy soundscapes",
        image_url:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150",
        demos: "luna_demo_2024.mp3",
        artist_country: "USA",
        Career_Highlights:
          "Grammy nomination 2023, Coachella headliner",
        Influences: "Lana Del Rey, Beach House, Mazzy Star",
        Featured_Tracks:
          "Midnight Dreams, Ocean Waves, Starlight",
      },
      {
        id: 2,
        name: "The Neon Collective",
        bio: "Electronic duo pushing boundaries of synthwave and ambient music",
        image_url:
          "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=150",
        demos: "neon_synth_demo.wav",
        artist_country: "UK",
        Career_Highlights:
          "Glastonbury 2024, Pitchfork 8.5 rating",
        Influences: "Boards of Canada, Aphex Twin, Burial",
        Featured_Tracks:
          "Neon Nights, Digital Rain, Cyber Dreams",
      },
      {
        id: 3,
        name: "Marcus Stone",
        bio: "Soulful blues guitarist with roots in Delta traditions",
        image_url:
          "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=150",
        demos: "blues_guitar_sessions.mp3",
        artist_country: "USA",
        Career_Highlights:
          "Blues Music Award 2023, Austin City Limits",
        Influences: "B.B. King, Muddy Waters, John Lee Hooker",
        Featured_Tracks:
          "Mississippi Blues, Crossroads, Midnight Train",
      },
    ],
  },
  albums: {
    icon: Disc3,
    fields: [
      "id",
      "artist_id",
      "title",
      "release_date",
      "cover_url",
    ],
    data: [
      {
        id: 1,
        artist_id: 1,
        title: "Ethereal Nights",
        release_date: "2024-03-15",
        cover_url:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
      },
      {
        id: 2,
        artist_id: 1,
        title: "Dreamscapes",
        release_date: "2025-01-10",
        cover_url:
          "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300",
      },
    ],
  },
};

const user = {
  name: "Alex Thompson",
  role: "Music Data Analyst",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

export default function AdminSqlViewer() {
  const [selectedTable, setSelectedTable] = useState("artists");
  const [selectedFields, setSelectedFields] = useState(
    tables[selectedTable].fields.slice(0, 3)
  );

  const table = tables[selectedTable];

  const handleFieldToggle = (field) => {
    setSelectedFields((fields) =>
      fields.includes(field)
        ? fields.filter((f) => f !== field)
        : [...fields, field]
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span>Music Database Viewer</span>
          </h1>
          <p className="text-sm text-gray-500">Explore recording artist database tables</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-right">
            <span className="block font-medium text-gray-700">{user.name}</span>
            <span className="block text-xs text-gray-400">{user.role}</span>
          </span>
          <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full border" />
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 flex gap-6 mb-6">
        {/* Select Table */}
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Table</label>
          <select
            className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none"
            value={selectedTable}
            onChange={(e) => {
              setSelectedTable(e.target.value);
              setSelectedFields(tables[e.target.value].fields.slice(0, 3));
            }}
          >
            {Object.keys(tables).map((tableKey) => (
              <option key={tableKey} value={tableKey}>
                {tableKey}
              </option>
            ))}
          </select>
        </div>

        {/* Select Fields */}
        <div className="w-2/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Fields</label>
          <p className="text-xs text-gray-500 mb-2">Choose which columns to display from the {selectedTable} table</p>
          <div className="flex flex-wrap gap-2">
            {table.fields.map((field) => (
              <button
                key={field}
                className={`px-2 py-1 rounded text-xs border ${
                  selectedFields.includes(field)
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
                onClick={() => handleFieldToggle(field)}
              >
                {field}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">{selectedFields.length} of {table.fields.length} fields selected</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-medium text-gray-700">{selectedTable}</span>
          <span className="text-xs text-gray-500">({table.data.length} rows)</span>
        </div>
        <p className="text-xs text-gray-500 mb-2">
          Displaying {selectedFields.length} columns from the {selectedTable} table
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-50">
                {selectedFields.map((field) => (
                  <th key={field} className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {selectedFields.map((field) => (
                    <td key={field} className="px-4 py-2 text-sm text-gray-700 border-b">
                      {row[field] ? row[field] : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}