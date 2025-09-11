import React, { useEffect, useState } from "react";
import ArtistSearchForm from "./ArtistSearchForm";
import axios from "axios";
import AdminSqlViewer from "./AdminSqlViewer";

function SelectTable({ table, setTable, tableOptions }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">Select Table</label>
      <select
        value={table || ""}
        onChange={(e) => setTable(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      >
        <option value="" disabled>
          Choose a table
        </option>
        {tableOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
function SelectFields({ table1, fields1, setFields1, tableFields1 }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">Select Fields</label>
      <select
        multiple
        value={fields1 && fields1.length > 0 ? fields1 : [""]}
        onChange={(e) => {
          const selected = Array.from(
            e.target.selectedOptions,
            (opt) => opt.value
          );
          // If 'all' is selected, select all fields
          if (selected.includes("all")) {
            setFields1(tableFields1[table1] || []);
          } else {
            setFields1(selected);
          }
        }}
        className="w-full p-2 mb-4 border rounded h-32"
        required
      >
        <option value="all">Select All</option>
        {table1 &&
          tableFields1[table1]?.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
      </select>
    </div>
  );
}
const InputFields = ({ fields, fieldValues, setFieldValues }) => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Enter values for selected fields:</h3>
      {fields.map((field, i) => (
        <div key={field} className="mb-2">
          <label className="block mb-1">{field}</label>
          <input
            type="text"
            autoFocus={i === 0} // focus only the first input initially
            value={fieldValues[field] || ""}
            onChange={(e) =>
              setFieldValues({ ...fieldValues, [field]: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
    </div>
  );
};

function MultipleInputFields({ rows, setRows }) {
  return (
    <textarea
      placeholder="Rows (CSV, one row per line)\nExample: 1,Test Album,2025-01-01"
      value={rows}
      onChange={(e) => setRows(e.target.value)}
      className="w-full p-2 mb-4 border rounded"
      rows={6}
      required
    />
  );
}

function ExistingArtist({
  inputMode,
  setInputMode,
  table,
  setTable,
  fields,
  setFields,
  tableFields,
  tableOptions,
  fieldValues,
  setFieldValues,
  rows,
  setRows,
  message,
  handleSubmit,
  dbSnapshot
}) {
  useEffect(() => {
    setInputMode("single");
  }, [setInputMode]);
  const [searchType, setSearchType] = useState("id");
  const [searchValue, setSearchValue] = useState("");
  const [artistResult, setArtistResult] = useState(null);

  useEffect(() => {
    setSearchValue("");
  }, [searchType]);


  // Search dbSnapshot for artist
  const handleArtistSearch = (e) => {
    e.preventDefault();
    setArtistResult(null);
    if (!searchValue || !dbSnapshot || !dbSnapshot["artists"] || !dbSnapshot["artists"].records) {
      setArtistResult({ error: "No artist data available" });
      return;
    }
    const records = dbSnapshot["artists"].records;
    let found = null;
    if (searchType === "id") {
      found = records.find((a) => String(a.id) === String(searchValue));
    } else if (searchType === "name") {
      found = records.find(
        (a) => a.name && a.name.toLowerCase() === searchValue.toLowerCase()
      );
    }
    setArtistResult(found || { error: "Artist not found" });
  };

  

  return (
    <div>
      <ArtistSearchForm
        searchType={searchType}
        setSearchType={setSearchType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleArtistSearch={handleArtistSearch}
        artistResult={artistResult}
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Artist Name: {artistResult?.name || "Unknown"} | Artist Id:{" "}
          {artistResult?.id || "Unknown"}
        </h2>

        {/* Select Table */}
        {inputMode && (
          <SelectTable
            table={table}
            setTable={setTable}
            tableOptions={tableOptions}
          />
        )}
        {/* Select Fields: Only visible if inputMode is 'single' and a table is selected */}
        {inputMode === "single" && table && (
          <SelectFields
            table1={table}
            fields1={fields}
            setFields1={setFields}
            tableFields1={tableFields}
          />
        )}
        {/* Render input boxes for each selected field */}
        {inputMode === "single" && fields.length > 0 && (
          <InputFields
            fields={fields}
            fieldValues={fieldValues}
            setFieldValues={setFieldValues}
          />
        )}
        {/* CSV rows input */}
        {inputMode === "multiple" && (
          <MultipleInputFields rows={rows} setRows={setRows} />
        )}
        {/* Submit button only visible if input is visible */}
        {((inputMode === "single" && fields.length > 0) ||
          inputMode === "multiple") && (
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Upload
          </button>
        )}
        {message && (
          <div className="mt-4 text-center text-blue-600">{message}</div>
        )}
      </form>
    </div>
  );
}

// TOP-LEVEL (file scope) — not inside any other component
// ...existing code...

function UploadNewArtist({
  inputMode,
  setInputMode,
  table,
  setTable,
  fields,
  setFields,
  tableFields,
  tableOptions,
  fieldValues,
  setFieldValues,
  rows,
  setRows,
  message,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Admin Dashboard: Upload Artist Data
      </h2>
      {/* Choose Input Mode */}
      <label className="block mb-2 font-semibold">Choose Input Mode</label>
      <select
        value={inputMode || ""}
        onChange={(e) => setInputMode(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      >
        <option value="" disabled>
          Choose an option
        </option>
        <option value="single">Single input</option>
        <option value="multiple">Multiple input (csv or json)</option>
      </select>
      {/* Select Table */}
      {inputMode && (
        <SelectTable
          table={table}
          setTable={setTable}
          tableOptions={tableOptions}
        />
      )}
      {/* Select Fields: Only visible if inputMode is 'single' and a table is selected */}
      {inputMode === "single" && table && (
        <SelectFields
          table1={table}
          fields1={fields}
          setFields1={setFields}
          tableFields1={tableFields}
        />
      )}
      {/* Render input boxes for each selected field */}
      {inputMode === "single" && fields.length > 0 && (
        <InputFields
          fields={fields}
          fieldValues={fieldValues}
          setFieldValues={setFieldValues}
        />
      )}
      {/* CSV rows input */}
      {inputMode === "multiple" && (
        <MultipleInputFields rows={rows} setRows={setRows} />
      )}
      {/* Submit button only visible if input is visible */}
      {((inputMode === "single" && fields.length > 0) ||
        inputMode === "multiple") && (
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Upload
        </button>
      )}
      {message && (
        <div className="mt-4 text-center text-blue-600">{message}</div>
      )}
    </form>
  );
}

//Main exporting component
function AdminDashboard() {
  const [artistMenu, setArtistMenu] = useState("upload");
  const [inputMode, setInputMode] = useState("");
  const [fieldValues, setFieldValues] = useState({});
  const [table, setTable] = useState("");
  const [fields, setFields] = useState([]);
  const [rows, setRows] = useState("");
  const [message, setMessage] = useState("");
  const [tableOptions, setTableOptions] = useState([]);
  const [dbSnapshot, setDbSnapshot] = useState(null);

  
  useEffect(() => {
    setInputMode("");
    setTable("");
    setFields([]);
    setFieldValues({});
    setRows("");
    setMessage("");
  }, [artistMenu]);

  // Fetch table options from backend on mount
  useEffect(() => {
    axios
      .get("/api/admin/tables-with-fields-records")
      .then((res) => {
        setDbSnapshot(res.data);
        console.log("DB Snapshot:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching DB snapshot:", err);
      });
  }, []);

  useEffect(() => {
    if (dbSnapshot) {
      setTableOptions(Object.keys(dbSnapshot));
      // Set default table if not set
      if (!table) {
        const firstTable = Object.keys(dbSnapshot)[0];
        setTable(firstTable);
      }
    }
  }, [dbSnapshot]);

  // When table changes, update fields and rows from dbSnapshot
  useEffect(() => {
    if (dbSnapshot && table && dbSnapshot[table]) {
      // Set fields from dbSnapshot
      setFields(dbSnapshot[table].fields || []);
      // Set rows as CSV string
      const records = dbSnapshot[table].records || [];
      if (records.length > 0 && dbSnapshot[table].fields) {
        const csvRows = records.map(record =>
          dbSnapshot[table].fields.map(field => record[field] ?? "").join(",")
        );
        setRows(csvRows.join("\n"));
      } else {
        setRows("");
      }
    }
  }, [dbSnapshot, table]);

 
  const tableFields = React.useMemo(() => {
    if (!dbSnapshot) return {};
    const fieldsObj = {};
    Object.keys(dbSnapshot).forEach(tableName => {
      fieldsObj[tableName] = dbSnapshot[tableName].fields || [];
    });
    return fieldsObj;
  }, [dbSnapshot]);

  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // Parse fields and rows
    const fieldList = fields.split(",").map((f) => f.trim());
    const rowList = rows
      .split("\n")
      .map((row) => row.split(",").map((v) => v.trim()));
    // Send to backend
    const response = await fetch("/api/admin/upload-table-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, fields: fieldList, rows: rowList }),
    });
    const result = await response.json();
    setMessage(
      result.message ||
        (result.success ? "Upload successful!" : "Upload failed.")
    );
  };

    // Update a record in the selected table
  async function handleUpdateRecord(table, id, updates) {
    try {
      const response = await fetch(`/api/admin/records/${table}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const result = await response.json();
      setMessage(result.message || (result.success ? "Update successful!" : "Update failed."));
      return result;
    } catch (error) {
      setMessage("Update failed: " + error.message);
      return { success: false, error: error.message };
    }
  }

  // Delete a record from the selected table
  async function handleDeleteRecord(table, id) {
    try {
      const response = await fetch(`/api/admin/records/${table}/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      setMessage(result.message || (result.success ? "Delete successful!" : "Delete failed."));
      return result;
    } catch (error) {
      setMessage("Delete failed: " + error.message);
      return { success: false, error: error.message };
    }
  }
  

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pb-[10%]">
        <AdminSqlViewer
          table={table}
          fields={fields}
          rows={rows}
          dbSnapshot={dbSnapshot}
        />
        <div className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-6">
          <label className="block mb-2 font-bold text-lg text-center">
            Soul Felt Music Artist
          </label>
          <select
            value={artistMenu || ""}
            onChange={(e) => setArtistMenu(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="upload">Upload New Artist</option>
            <option value="search">Search Existing Artist</option>
          </select>
        </div>
        {artistMenu === "upload" && (
          <UploadNewArtist
            inputMode={inputMode}
            setInputMode={setInputMode}
            table={table}
            setTable={setTable}
            fields={fields}
            setFields={setFields}
            tableFields={tableFields}
            tableOptions={tableOptions}
            fieldValues={fieldValues}
            setFieldValues={setFieldValues}
            rows={rows}
            setRows={setRows}
            message={message}
            handleSubmit={handleSubmit}
            artistMenu={artistMenu}
          />
        )}
        {artistMenu === "search" && (
          <ExistingArtist
            inputMode={inputMode}
            setInputMode={setInputMode}
            table={table}
            setTable={setTable}
            fields={fields}
            setFields={setFields}
            tableFields={tableFields}
            tableOptions={tableOptions}
            fieldValues={fieldValues}
            setFieldValues={setFieldValues}
            rows={rows}
            setRows={setRows}
            message={message}
            handleSubmit={handleSubmit}
            artistMenu={artistMenu}
            dbSnapshot={dbSnapshot}
          />
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
