import React, { useState } from 'react';

function AdminDashboard() {
  const [table, setTable] = useState('');
  const [fields, setFields] = useState('');
  const [rows, setRows] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    // Parse fields and rows
    const fieldList = fields.split(',').map(f => f.trim());
    const rowList = rows.split('\n').map(row => row.split(',').map(v => v.trim()));
    // Send to backend
    const response = await fetch('/api/admin/upload-table-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, fields: fieldList, rows: rowList })
    });
    const result = await response.json();
    setMessage(result.message || (result.success ? 'Upload successful!' : 'Upload failed.'));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard: Upload Table Data</h2>
        <input
          type="text"
          placeholder="Table name (e.g. albums)"
          value={table}
          onChange={e => setTable(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Fields (comma separated, e.g. id,title,release_date)"
          value={fields}
          onChange={e => setFields(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          placeholder="Rows (CSV, one row per line)\nExample: 1,Test Album,2025-01-01"
          value={rows}
          onChange={e => setRows(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          rows={6}
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Upload</button>
        {message && <div className="mt-4 text-center text-blue-600">{message}</div>}
      </form>
    </div>
  );
}

export default AdminDashboard;
