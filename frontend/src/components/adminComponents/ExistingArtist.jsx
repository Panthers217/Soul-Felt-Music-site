import React, { useEffect, useState } from "react";

import ArtistSearchForm from "../ArtistSearchForm";
import TableSelector from "./TableSelector";
import { useArtistFormValidation } from "../../hooks/useArtistFormValidation";

function ExistingArtist({
  setInputMode,
  table,
  setTable,
  tableOptions,
  dbSnapshot,
}) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageForDelete, setMessageForDelete] = useState("");

  // Move handleUpdateRecord above useArtistFormValidation
  const handleUpdateRecord = async (record) => {
    setUpdateLoading(true);
    setUpdateError("");
    setUpdateSuccess("");
    try {
      const formData = new FormData();
      Object.entries(record).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await window.axios.put(
        `/api/admin/updatedRecord/${table}/${record.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUpdateSuccess(response.data.message || "Update successful!");
      setShowUpdateModal(false);
    } catch (err) {
      setUpdateError(
        err.response?.data?.message || err.message || "Update failed"
      );
    } finally {
      setUpdateLoading(false);
    }
  };
  const { requiredFields, booleanFields, handleLocalSubmit, isRestrictedField } = useArtistFormValidation(handleUpdateRecord);

 // Delete a record from the selected table
  async function handleDeleteRecord(table, id) {
    try {
      const response = await fetch(`/api/admin/records/${table}/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      setMessageForDelete(
        result.message ||
          (result.success ? "Delete successful!" : "Delete failed.")
      );
      return result;
    } catch (error) {
      setMessageForDelete("Delete failed: " + error.message);
      return { success: false, error: error.message };
    }
  }

  useEffect(() => {
      if (table) {
        setLoading(true);
        setError("");
        fetch(`/api/admin/records/${table}`)
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch table data");
            return res.json();
          })
          .then((data) => {
            setTableData(data.records || data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setTableData(null);
            setLoading(false);
          });
      } else {
        setTableData(null);
      }
    }, [table]);



 




  useEffect(() => {
    setInputMode("single");
  }, [setInputMode]);

  const [searchType, setSearchType] = useState("id");
  const [searchValue, setSearchValue] = useState("");
  const [artistResult, setArtistResult] = useState(null);

  // Clear search handler
  const handleClearSearch = () => {
    setArtistResult(null);
  };

  useEffect(() => {
    setSearchValue("");
  }, [searchType]);

  // Search dbSnapshot for selected table
  const handleArtistSearch = (e) => {
    e.preventDefault();
    setArtistResult(null);
    if (
      !searchValue ||
      !dbSnapshot ||
      !table ||
      !dbSnapshot[table] ||
      !dbSnapshot[table].records
    ) {
      setArtistResult({ error: "No data available for this table" });
      return;
    }
    const records = dbSnapshot[table].records;
    let found = null;
    if (
      [
        "albums",
        "promotional_videos",
        "promotional_tracks",
        "tracks",
        "videos",
      ].includes(table)
    ) {
      if (searchType === "id") {
        found = records.find((r) => String(r.id) === String(searchValue));
      } else if (searchType === "title") {
        found = records.find(
          (r) => r.title && r.title.toLowerCase() === searchValue.toLowerCase()
        );
      } else if (searchType === "artist_id") {
        found = records.find(
          (r) => String(r.artist_id) === String(searchValue)
        );
      }
    } else if (table === "artists") {
      if (searchType === "id") {
        found = records.find((a) => String(a.id) === String(searchValue));
      } else if (searchType === "name") {
        found = records.find(
          (a) => a.name && a.name.toLowerCase() === searchValue.toLowerCase()
        );
      }
    } else {
      // Any other table: only id
      found = records.find((r) => String(r.id) === String(searchValue));
    }
    setArtistResult(found || { error: "Record not found" });
  };

  return (
    <div>
      <ArtistSearchForm
        table={table}
        setTable={setTable}
        tableOptions={tableOptions}
        searchType={searchType}
        setSearchType={setSearchType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleArtistSearch={handleArtistSearch}
        artistResult={artistResult}
        onClearSearch={handleClearSearch}
      />
      {/* Stylish TableSelector for updating/viewing tables */}
      <TableSelector
        table={table}
        setTable={setTable}
        tableOptions={tableOptions}
        searchResult={artistResult}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        pendingUpdate={pendingUpdate}
        setPendingUpdate={setPendingUpdate}
        editValues={editValues}
        setEditValues={setEditValues}
        updateLoading={updateLoading}
        updateError={updateError}
        updateSuccess={updateSuccess}
        handleLocalSubmit={handleLocalSubmit}
        requiredFields={requiredFields}
        booleanFields={booleanFields}
        isRestrictedField={isRestrictedField}
        tableData={tableData}
        loading={loading}
        error={error} 
      />
    </div>
  );
}

export default ExistingArtist;
