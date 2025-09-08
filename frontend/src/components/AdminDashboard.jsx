  import { useEffect, useRef, useState } from "react";

function SelectTable({table, setTable, tableOptions}) {
  return (
    <div>
      <label className="block mb-2 font-semibold">Select Table</label>
      <select
        value={table}
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
        value={fields1}
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
        </div>)
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
            onChange={e =>
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



function ExistingArtist({ inputMode,
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
  handleSubmit, }) {
    useEffect(() => {
    setInputMode('single');
  }, [setInputMode]);
  const [searchType, setSearchType] = useState('id');
  const [searchValue, setSearchValue] = useState('');
  const [artistResult, setArtistResult] = useState(null);

  useEffect(() => {
    setSearchValue('');
  }, [searchType]);

  // Dummy data for artists
  const dummyArtists = [
    { id: "1", name: "Artist One", bio: "Bio 1" },
    { id: "2", name: "Artist Two", bio: "Bio 2" },
    { id: "3", name: "Artist Three", bio: "Bio 3" },
  ];

  const handleArtistSearch = (e) => {
    e.preventDefault();
    setArtistResult(null);
    if (!searchValue) return;
    let found = null;
    if (searchType === "id") {
      found = dummyArtists.find(a => a.id === searchValue);
    } else if (searchType === "name") {
      found = dummyArtists.find(a => a.name.toLowerCase() === searchValue.toLowerCase());
    }
    setArtistResult(found || { error: "Artist not found" });
  };


  //for api to the database

  // const handleArtistSearch = async (e) => {
  //   e.preventDefault();
  //   setArtistResult(null);
  //   if (!searchValue) return;
  //   const params = new URLSearchParams();
  //   params.append(searchType, searchValue);
  //   try {
  //     const response = await fetch(`/api/artists?${params.toString()}`);
  //     if (!response.ok) throw new Error('Artist not found');
  //     const data = await response.json();
  //     setArtistResult(data);
  //   } catch (err) {
  //     setArtistResult({ error: err.message });
  //   }
  // };

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
        Artist Name: {artistResult?.name || "Unknown"} | Artist Id: {artistResult?.id || "Unknown"}
      </h2>
      
      {/* Select Table */}
      {inputMode && (
        <SelectTable table={table} setTable={setTable} tableOptions={tableOptions} />
      )}
      {/* Select Fields: Only visible if inputMode is 'single' and a table is selected */}
      {inputMode === "single" && table && (
        <SelectFields table1={table} fields1={fields} setFields1={setFields} tableFields1={tableFields} />
      )}
      {/* Render input boxes for each selected field */}
      {inputMode === "single" && fields.length > 0 && (
        <InputFields fields={fields} fieldValues={fieldValues} setFieldValues={setFieldValues} />
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

// ...existing code...

// TOP-LEVEL (file scope) — not inside any other component
function ArtistSearchForm({
  searchType,
  setSearchType,
  searchValue,
  setSearchValue,
  handleArtistSearch,
  artistResult,
  autoFocus = true, // default behavior but controllable
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]); // only refocus when the flag flips
 
  
console.log("you SearchType", searchType, searchValue);
  return (
    <form onSubmit={handleArtistSearch} className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-6">
      <h2 className="text-xl font-bold mb-4 text-center">Search Existing Artist</h2>
      <div className="flex mb-4">
        <select
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
          className="p-2 border rounded mr-2"
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder={searchType === 'id' ? 'Enter artist ID' : 'Enter artist name'}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Search
      </button>
      {artistResult && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          {artistResult.error ? (
            <span className="text-red-600">{artistResult.error}</span>
          ) : (
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(artistResult, null, 2)}</pre>
          )}
        </div>
      )}
    </form>
  );
}


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
        value={inputMode}
        onChange={(e) => setInputMode(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      >
        <option value="" disabled>Choose an option</option>
        <option value="single">Single input</option>
        <option value="multiple">Multiple input (csv or json)</option>
      </select>
      {/* Select Table */}
      {inputMode && (
        <SelectTable table={table} setTable={setTable} tableOptions={tableOptions} />
      )}
      {/* Select Fields: Only visible if inputMode is 'single' and a table is selected */}
      {inputMode === "single" && table && (
        <SelectFields table1={table} fields1={fields} setFields1={setFields} tableFields1={tableFields} />
      )}
      {/* Render input boxes for each selected field */}
      {inputMode === "single" && fields.length > 0 && (
        <InputFields fields={fields} fieldValues={fieldValues} setFieldValues={setFieldValues} />
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
  const [artistMenu, setArtistMenu] = useState('upload');

  const [inputMode, setInputMode] = useState("");
  
  const [fieldValues, setFieldValues] = useState({});
  const [table, setTable] = useState("");
  const [fields, setFields] = useState([]);
  const [rows, setRows] = useState("");
  const [message, setMessage] = useState("");

useEffect(() => {
    setInputMode("");
    setTable("");
    setFields([]);
    setFieldValues({});
    setRows("");
    setMessage("");
  }, [artistMenu]);

  // Example fields for each table as key-value pairs with dummy data
  const tableFields = {
    artists: [
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
    albums: ["id", "artist_id", "title", "release_date", "cover_url"],
    tracks: [
      "id",
      "album_id",
      "title",
      "duration",
      "audio_url",
      "top_track",
      "promo_track",
    ],
    users: ["id", "username", "email", "password_hash", "created_at"],
    newsletter: ["id", "email", "subscribed_at", "is_active"],
    purchases: ["id", "user_id", "track_id", "purchased_at"],
    videos: ["id", "track_id", "video_url", "promo"],
  };
  
  // const tableFields = {
  //   artists: {
  //     id: ["1", "2", "3"],
  //     name: ["Artist One", "Artist Two", "Artist Three"],
  //     bio: ["Bio 1", "Bio 2", "Bio 3"],
  //     image_url: ["url1.jpg", "url2.jpg", "url3.jpg"],
  //     demos: ["Demo 1", "Demo 2", "Demo 3"],
  //     artist_country: ["USA", "UK", "Canada"],
  //     Career_Highlights: ["Highlight 1", "Highlight 2", "Highlight 3"],
  //     Influences: ["Influence 1", "Influence 2", "Influence 3"],
  //     Featured_Tracks: ["Track 1", "Track 2", "Track 3"],
  //   },
  //   albums: {
  //     id: ["101", "102", "103"],
  //     artist_id: ["1", "2", "3"],
  //     title: ["Album A", "Album B", "Album C"],
  //     release_date: ["2025-01-01", "2025-02-01", "2025-03-01"],
  //     cover_url: ["coverA.jpg", "coverB.jpg", "coverC.jpg"],
  //   },
  //   tracks: {
  //     id: ["201", "202", "203"],
  //     album_id: ["101", "102", "103"],
  //     title: ["Track X", "Track Y", "Track Z"],
  //     duration: ["3:30", "4:00", "2:45"],
  //     audio_url: ["audioX.mp3", "audioY.mp3", "audioZ.mp3"],
  //     top_track: ["true", "false", "true"],
  //     promo_track: ["false", "true", "false"],
  //   },
  //   users: {
  //     id: ["u1", "u2", "u3"],
  //     username: ["userA", "userB", "userC"],
  //     email: ["a@email.com", "b@email.com", "c@email.com"],
  //     password_hash: ["hash1", "hash2", "hash3"],
  //     created_at: ["2025-01-01", "2025-01-02", "2025-01-03"],
  //   },
  //   newsletter: {
  //     id: ["n1", "n2", "n3"],
  //     email: ["n1@email.com", "n2@email.com", "n3@email.com"],
  //     subscribed_at: ["2025-01-01", "2025-01-02", "2025-01-03"],
  //     is_active: ["true", "false", "true"],
  //   },
  //   purchases: {
  //     id: ["p1", "p2", "p3"],
  //     user_id: ["u1", "u2", "u3"],
  //     track_id: ["201", "202", "203"],
  //     purchased_at: ["2025-01-01", "2025-01-02", "2025-01-03"],
  //   },
  //   videos: {
  //     id: ["v1", "v2", "v3"],
  //     track_id: ["201", "202", "203"],
  //     video_url: ["video1.mp4", "video2.mp4", "video3.mp4"],
  //     promo: ["true", "false", "true"],
  //   },
  // };


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

  // Example table options (replace with dynamic fetch if needed)
  const tableOptions = [
    "artists",
    "albums",
    "tracks",
    "users",
    "newsletter",
    "purchases",
    "videos",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-6">
        <label className="block mb-2 font-bold text-lg text-center">Soul Felt Music Artist</label>
        <select
          value={artistMenu}
          onChange={e => setArtistMenu(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="upload">Upload New Artist</option>
          <option value="search">Search Existing Artist</option>
        </select>
      </div>
      {artistMenu === 'upload' && (
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
      {artistMenu === 'search' && (
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
        />
      )}
    </div>
  );
}

export default AdminDashboard;
