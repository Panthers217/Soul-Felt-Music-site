import React, { useState } from "react";
import InputFields from "../adminComponents/InputFields";
import DeleteRecordModal from "./DeleteRecordModal";

export default function UpdateArtistInfoModal({
  show,
  onClose,
  pendingUpdate,
  editValues,
  setEditValues,
  updateLoading,
  handleLocalSubmit,
  requiredFields,
  booleanFields,
  isRestrictedField,
  handleDeleteRecord,
  table,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  if (!show || !pendingUpdate) return null;
  // Get the currently visible fields
  const visibleFields = Object.keys(editValues);
  // Create a filtered values object
  const filteredValues = {};
  visibleFields.forEach((field) => {
    filteredValues[field] = editValues[field];
  });
  const recordId = editValues.id;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
          <h3 className="text-xl font-bold mb-4 text-center text-purple-700">
            Edit Record Before Update
          </h3>
          <form
            onSubmit={(e) => handleLocalSubmit(e, "update", visibleFields, filteredValues)}
          >
            <InputFields
              fields={visibleFields}
              fieldValues={editValues}
              setFieldValues={setEditValues}
              requiredFields={requiredFields}
              booleanFields={booleanFields}
              isRestrictedField={isRestrictedField}
            />
            <div className="flex justify-between gap-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-semibold"
                onClick={onClose}
                disabled={updateLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold"
                onClick={() => setShowDeleteModal(true)}
                disabled={updateLoading}
              >
                Delete
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
                disabled={updateLoading}
              >
                {updateLoading ? "Updating..." : "Confirm Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <DeleteRecordModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          handleDeleteRecord(table, recordId);
          setShowDeleteModal(false);
          onClose();
        }}
        recordId={recordId}
      />
    </>
  );
}
