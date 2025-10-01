import React, { useEffect, useState } from "react";
import CalendarModal from "./modal/CalendarModal";
import CalendarIcon from "./modal/CalendarIcon";
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
  // Utility: remove fields that are 'id' or end with '_id'
  function filterOutIdFields(fields) {
    return fields.filter((field) => field !== "id" && !field.endsWith("_id"));
  }
  const filteredFields =
    table1 && tableFields1[table1]
      ? filterOutIdFields(tableFields1[table1])
      : [];
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
          // If 'all' is selected, select all filtered fields
          if (selected.includes("all")) {
            setFields1(filteredFields);
          } else {
            setFields1(selected);
          }
        }}
        className="w-full p-2 mb-4 border rounded h-32"
        required
      >
        <option value="all">Select All</option>
        {filteredFields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
    </div>
  );
}
const InputFields = ({
  fields,
  fieldValues,
  setFieldValues,
  requiredFields = [],
}) => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Enter values for selected fields:</h3>
      {fields.map((field, i) => (
        <div key={field} className="mb-2">
          <label className="block mb-1">{field}</label>
          {field === "cover_url" ||
          field === "image_url" ||
          field === "promo_audio_url" ||
          field === "promo_video_url" ||
          field === "video_url" ||
          field === "audio_url" ? (
            <>
              <input
                type="file"
                accept={
                  field === "audio_url"
                    ? "audio/*"
                    : field === "video_url"
                    ? "video/*"
                    : field === "image_url"
                    ? "image/*"
                    : field === "promo_audio_url"
                    ? "audio/*"
                    : field === "promo_video_url"
                    ? "video/*"
                    : "image/*"
                }
                onChange={(e) => {
                  setFieldValues({
                    ...fieldValues,
                    [field]: e.target.files[0],
                  });
                }}
                className="w-full p-2 border rounded mb-1"
                required={requiredFields.includes(field)}
              />
              <span className="text-xs text-gray-500">
                (Optional: upload a file or enter a URL below)
              </span>
              <input
                type="text"
                value={
                  typeof fieldValues[field] === "string"
                    ? fieldValues[field]
                    : ""
                }
                onChange={(e) =>
                  setFieldValues({ ...fieldValues, [field]: e.target.value })
                }
                className="w-full p-2 border rounded mt-1"
                placeholder={
                  field === "audio_url"
                    ? "Audio URL (optional)"
                    : "Image URL (optional)"
                }
                required={requiredFields.includes(field)}
              />
            </>
          ) : (
            <input
              type="text"
              autoFocus={i === 0}
              value={fieldValues[field] || ""}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, [field]: e.target.value })
              }
              className="w-full p-2 border rounded"
              required={requiredFields.includes(field)}
              placeholder={field === "phone_number" ? "e.g. 000-123-4567" : field === "email" ? "e.g. example@example.com" : undefined}
            />
          )}
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
  dbSnapshot,
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
    if (
      !searchValue ||
      !dbSnapshot ||
      !dbSnapshot["artists"] ||
      !dbSnapshot["artists"].records
    ) {
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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Helper to format date as yyyy-mm-dd
  function formatDate(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  }

  // Fields that require boolean dropdown
  const booleanFields = [
    "demos",
    "top_track",
    "featured_track",
    "activate",
    "activate_video",
    "featured_artists",
    "is_active",
    "promote_track",
    "promo",
    
  ];

  // Fields that are required
  const requiredFields = ["name", "release_date", "title","email ","phone_number"];
  // Helper to check if a field is required
  const isRequired = (field) => requiredFields.includes(field);
  
  //
  const isEmailvalid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper to validate phone numbers (allow dashes, spaces, parentheses)
  const isPhoneValid = (phone) => {
    if (!phone) return false;
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, "");
    return digits.length === 10;
  };

  // Custom submit handler to validate email before calling parent handleSubmit
  const handleLocalSubmit = (e) => {
    if (fields.includes("email") && !isEmailvalid(fieldValues.email)) {
      e.preventDefault();
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (fields.includes("phone_number")) { // Validate phone if phone field is included
      if (!isPhoneValid(fieldValues.phone_number)) {
        e.preventDefault();
        setPhoneError("Please enter a valid 10-digit phone number.");
        return;
      }
    }
    setEmailError("");
    setPhoneError("");
    handleSubmit(e);
  };

  return (
    <form
      onSubmit={handleLocalSubmit}
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
      {/* Render input boxes for each selected field, with calendar for release_date */}
      {inputMode === "single" && fields.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">
            Enter values for selected fields:
          </h3>
          {/* Render prioritized fields first: name, title, image_url (if present) */}
          {['name', 'title', 'image_url'].filter(f => fields.includes(f)).map((field) => {
            return (
              <InputFields
                key={field}
                fields={[field]}
                fieldValues={fieldValues}
                setFieldValues={setFieldValues}
                requiredFields={requiredFields}
              />
            );
          })}
          {/* Render the rest of the fields, except prioritized ones */}
          {fields.filter(field => !['name', 'title', 'image_url'].includes(field)).map((field) => {
            if (field === "release_date") {
              return (
                <div key={field} className="mb-2 relative">
                  <label className="block mb-1">{field}</label>
                  <input
                    type="text"
                    value={formatDate(fieldValues[field])}
                    onChange={(e) =>
                      setFieldValues({
                        ...fieldValues,
                        [field]: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded pr-10"
                    placeholder="YYYY-MM-DD"
                    required={isRequired(field)}
                  />
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <CalendarIcon onClick={() => setCalendarOpen(true)} />
                  </span>
                  <CalendarModal
                    isOpen={calendarOpen}
                    onClose={() => setCalendarOpen(false)}
                    onSelectDate={(date) => {
                      setFieldValues({
                        ...fieldValues,
                        [field]: formatDate(date),
                      });
                      setCalendarOpen(false);
                    }}
                  />
                </div>
              );
            } else if (booleanFields.includes(field)) {
              return (
                <div key={field} className="mb-2">
                  <label className="block mb-1">{field}</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={
                      fieldValues[field] === 1
                        ? "true"
                        : fieldValues[field] === 0
                        ? "false"
                        : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value === "true" ? 1 : 0;
                      setFieldValues({ ...fieldValues, [field]: val });
                    }}
                    required
                  >
                    <option value="" disabled>
                      Select true or false
                    </option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                </div>
              );
            } else if (field === "email") {
              return (
                <div key={field} className="mb-2">
                  <InputFields
                    fields={[field]}
                    fieldValues={fieldValues}
                    setFieldValues={setFieldValues}
                    requiredFields={requiredFields}
                  />
                  {emailError && (
                    <div className="text-red-500 text-sm">{emailError}</div>
                  )}
                </div>
              );
            } else if (field === "phone_number") {
              return (
                <div key={field} className="mb-2">
                  <InputFields
                    fields={[field]}
                    fieldValues={fieldValues}
                    setFieldValues={setFieldValues}
                    requiredFields={requiredFields}
                  />
                  {phoneError && (
                    <div className="text-red-500 text-sm">{phoneError}</div>
                  )}
                </div>
              );
            } else {
              return (
                <InputFields
                  key={field}
                  fields={[field]}
                  fieldValues={fieldValues}
                  setFieldValues={setFieldValues}
                  requiredFields={requiredFields}
                />
              );
            }
          })}
        </div>
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
  const [mode, setMode] = useState("live");

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

  // When table changes, update fields, rows, and initialize fieldValues to null for all fields
  useEffect(() => {
    if (dbSnapshot && table && dbSnapshot[table]) {
      // Set fields from dbSnapshot
      const newFields = dbSnapshot[table].fields || [];
      setFields(newFields);
      // Set rows as CSV string
      const records = dbSnapshot[table].records || [];
      if (records.length > 0 && dbSnapshot[table].fields) {
        const csvRows = records.map((record) =>
          dbSnapshot[table].fields.map((field) => record[field] ?? "").join(",")
        );
        setRows(csvRows.join("\n"));
      } else {
        setRows("");
      }

      async function insertFieldsValues() {
        // Utility: remove fields that are 'id' or end with '_id'
        function filterOutIdFields(fields) {
          return fields.filter(
            (field) => field !== "id" && !field.endsWith("_id")
          );
        }

        // Initialize fieldValues to empty string for filtered fields
        const filteredFields = await filterOutIdFields(newFields);
        const initialFieldValues = await filteredFields.reduce((acc, field) => {
          acc[field] = "";
          return acc;
        }, {});
        // Add boolean fields demos and activate, default to false

        initialFieldValues["demos"] = false;
        initialFieldValues["activate"] = false;
        initialFieldValues["featured_artists"] = false;
        initialFieldValues["is_active"] = false;
        initialFieldValues["promote_track"] = false;
        initialFieldValues["top_track"] = false;
        initialFieldValues["featured_track"] = false;
        // initialFieldValues["release_date"] = new Date().toISOString().split("T")[0];
        setFields(filteredFields);
        setFieldValues(initialFieldValues);
      }
      insertFieldsValues();
    }
  }, [dbSnapshot, table]);

  const tableFields = React.useMemo(() => {
    if (!dbSnapshot) return {};
    const fieldsObj = {};
    Object.keys(dbSnapshot).forEach((tableName) => {
      fieldsObj[tableName] = dbSnapshot[tableName].fields || [];
    });
    return fieldsObj;
  }, [dbSnapshot]);

  // Handle form submission
  const handleSubmit = async (e, modeArg = mode) => {
    e.preventDefault();

    console.log("your fields", fieldValues);
    setMessage("");

    if (Array.isArray(fields) && fields.length > 0) {
      // Mode is available as modeArg --- this is your mode state variable
      console.log("Current mode in handleSubmit:", modeArg);
      console.log("Selected field values:", fieldValues);

      // Use FormData for file upload
      const formData = new FormData();
      // Only append field values for the selected table
      const tableFieldsSet = new Set(fields);
      Object.entries(fieldValues).forEach(([key, value]) => {
        if (tableFieldsSet.has(key)) {
          formData.append(key, value);
        }
      });

      try {
        const response = await axios.post(
          `/api/admin/records/${table}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-mode": modeArg,
            },
          }
        );
        const result = response.data;
        setMessage(
          result.message ||
            (result.success ? "Upload successful!" : "Upload failed.")
        );
      } catch (error) {
        setMessage(
          "Upload failed: " + (error.response?.data?.message || error.message)
        );
      }
    }
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
      setMessage(
        result.message ||
          (result.success ? "Update successful!" : "Update failed.")
      );
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
      setMessage(
        result.message ||
          (result.success ? "Delete successful!" : "Delete failed.")
      );
      return result;
    } catch (error) {
      setMessage("Delete failed: " + error.message);
      return { success: false, error: error.message };
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 pb-[10%]">
        <div className="mb-2 font-semibold">Current Mode: {mode}</div>
        <AdminSqlViewer
          table={table}
          fields={fields}
          rows={rows}
          dbSnapshot={dbSnapshot}
        />
        <div className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-bold text-lg">Soul Felt Music Artist</label>
            <button
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
              onClick={() => setMode(mode === "live" ? "demo" : "live")}
            >
              {mode === "live" ? "Switch to Demo Mode" : "Switch to Live Mode"}
            </button>
          </div>
          <div
            className={`mb-4 text-center font-extrabold text-2xl ${
              mode === "live" ? "text-green-600" : "text-orange-500"
            }`}
          >
            {mode === "live" ? "LIVE MODE" : "DEMO MODE"}
          </div>

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
            handleSubmit={(e) => handleSubmit(e, mode)}
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
            handleSubmit={(e) => handleSubmit(e, mode)}
            artistMenu={artistMenu}
            dbSnapshot={dbSnapshot}
          />
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
