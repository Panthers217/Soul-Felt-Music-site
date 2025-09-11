import React, { useRef, useEffect } from "react";

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

    // Use the callback from parent to perform the search and update result
    // The actual search logic is handled in the parent (AdminDashboard)
    
  return (
    <form
  onSubmit={handleArtistSearch}
      className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-6"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Search Existing Artist
      </h2>
      <div className="flex mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 border rounded mr-2"
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={
            searchType === "id" ? "Enter artist ID" : "Enter artist name"
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
      {artistResult && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          {artistResult.error ? (
            <span className="text-red-600">{artistResult.error}</span>
          ) : (
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(artistResult, null, 2)}
            </pre>
          )}
        </div>
      )}
    </form>
  );
}

export default ArtistSearchForm;
