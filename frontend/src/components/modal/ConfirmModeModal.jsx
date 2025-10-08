import React from "react";
import { useApiData } from "../../context/ApiDataContext";


export default function ConfirmModeModal({ show, onConfirm, onCancel }) {
  const { mode, setMode } = useApiData();
  if (!show) return null;
  const modeTextColor = mode === "live" ? "text-green-600" : "text-orange-500";
  const modeDisplay = mode.charAt(0).toUpperCase() + mode.slice(1);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full relative">
        <h3 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Confirm Upload Mode
        </h3>
        <p className="mb-4 text-center text-gray-700">
          You are about to insert your table in
          <span className={`font-bold ${modeTextColor} text-3xl mx-2`}>
            {modeDisplay}
          </span>
          mode.
        </p>
        <label className="block mb-2 font-semibold text-center">Change Mode</label>
        <select
          value={mode}
          onChange={e => setMode(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="live">Live</option>
          <option value="demo">Demo</option>
        </select>
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-semibold"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
            onClick={onConfirm}
          >
            Confirm & Upload
          </button>
        </div>
      </div>
    </div>
  );
}
