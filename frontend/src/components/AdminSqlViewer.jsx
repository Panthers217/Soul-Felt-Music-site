import React, { useState, useEffect } from "react";
import { Disc3, Mic } from "lucide-react";

const user = {
  name: "Alex Thompson",
  role: "Music Data Analyst",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

function AdminSqlViewer({ dbSnapshot }) {
  // Always declare hooks at the top level
  const tableKeys = dbSnapshot && Object.keys(dbSnapshot);
  // If only artists table is present, default to it
  const defaultTable = tableKeys && (tableKeys.includes("artists") ? "artists" : tableKeys[0]);
  const [selectedTable, setSelectedTable] = useState(defaultTable);
  const [selectedFields, setSelectedFields] = useState(
    dbSnapshot && dbSnapshot[defaultTable]?.fields?.slice(0, 3) || []
  );

  // Search state
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // Modal state and handlers (must be at top level)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState("");
  const [modalRecord, setModalRecord] = useState(null);

  // Declare table, fields, records before using them in getFilteredRecords
  const table = dbSnapshot && selectedTable ? dbSnapshot[selectedTable] : null;
  const fields = table?.fields || [];
  const records = table?.records || [];

  // Update selectedFields when selectedTable or dbSnapshot changes
  useEffect(() => {
    if (dbSnapshot && selectedTable && dbSnapshot[selectedTable]) {
      setSelectedFields(dbSnapshot[selectedTable].fields?.slice(0, 3) || []);
    }
  }, [selectedTable, dbSnapshot]);

  // If only artists table is present, force selection
  useEffect(() => {
    if (dbSnapshot && Object.keys(dbSnapshot).length === 1 && dbSnapshot.artists) {
      setSelectedTable("artists");
    }
  }, [dbSnapshot]);

  // Search function for albums and artists
  const getFilteredRecords = () => {
    if (!searchType || (searchType !== "all" && !searchValue)) return records;
    if (searchType === "all") {
      return records;
    }
    // If searchType matches a field in the table, filter by that field
    if (fields.includes(searchType)) {
      return records.filter((r) => {
        const value = r[searchType];
        if (value == null) return false;
        // Numeric search: exact match
        if (typeof value === "number" || searchType === "id") {
          return String(value) === String(searchValue);
        }
        // String search: case-insensitive substring
        return String(value).toLowerCase().includes(String(searchValue).toLowerCase());
      });
    }
    return records;
  };

  const filteredRecords = getFilteredRecords();

  // Render loading UI if dbSnapshot is not ready
  if (!dbSnapshot || !tableKeys || tableKeys.length === 0) {
    return (
      <div className="min-h-fit bg-white flex flex-col items-center py-8">
        <div className="w-full max-w-3xl flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span>Music Database Viewer</span>
          </h1>
        </div>
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 flex gap-6 mb-6">
          <div className="w-full text-center text-gray-500">Loading database snapshot...</div>
        </div>
      </div>
    );
  }

  const handleFieldToggle = (field) => {
    setSelectedFields((fields) =>
      fields.includes(field)
        ? fields.filter((f) => f !== field)
        : [...fields, field]
    );
  };

  // Modal handlers
  const handleCellDoubleClick = (record, field) => {
    setModalRecord(record);
    setModalField(field);
    setModalOpen(true);
  };

  const handleModalAction = (action) => {
    // Here you would trigger the actual delete/update/insert logic
    // For now, just close the modal
    setModalOpen(false);
    setModalRecord(null);
    setModalField("");
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalRecord(null);
    setModalField("");
  };

  return (
    <div className="min-h-fit bg-white flex flex-col items-center py-8">
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
            value={selectedTable || ""}
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            <option value="" disabled>
              Choose a table
            </option>
            {tableKeys.map((tableKey) => (
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
            {fields.map((field) => (
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
          <p className="mt-2 text-xs text-gray-400">{selectedFields.length} of {fields.length} fields selected</p>
        </div>
      </div>

      {/* Search Bar & Data Table */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Type</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
              disabled={!selectedTable}
            >
              <option value="">Select</option>
              <option value="all">All</option>
              {/* Dynamically list all field names for the selected table */}
              {fields.map((field) => (
                <option key={field} value={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Value</label>
            <input
              className="border rounded px-2 py-1 text-sm"
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              disabled={!searchType}
              placeholder={searchType ? `Enter ${searchType}` : "Select search type"}
            />
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            onClick={() => setSearchValue("")}
            disabled={!searchValue}
          >Clear</button>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <span className="font-medium text-gray-700">{selectedTable}</span>
          <span className="text-xs text-gray-500">({filteredRecords.length} rows)</span>
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
              {filteredRecords.length > 0 ? (
                filteredRecords.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {selectedFields.map((field) => (
                      <td
                        key={field}
                        className="px-4 py-2 text-sm text-gray-700 border-b cursor-pointer hover:bg-blue-50"
                        onDoubleClick={() => handleCellDoubleClick(row, field)}
                        title="Double click to manage record"
                      >
                        {row[field] ? row[field] : ""}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr><td colSpan={selectedFields.length || 1} className="text-center">No records</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Modal for record actions */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90vw]">
              <h2 className="text-lg font-semibold mb-2">Manage Record</h2>
              <p className="mb-4 text-sm text-gray-600">
                What would you like to do with <span className="font-bold">{modalField}</span> of this record?
              </p>
              <div className="flex gap-4 mb-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleModalAction("delete")}
                >Delete</button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => handleModalAction("update")}
                >Update</button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => handleModalAction("insert")}
                >Insert</button>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700 text-sm"
                onClick={handleModalClose}
              >Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSqlViewer;
// End of AdminSqlViewer component