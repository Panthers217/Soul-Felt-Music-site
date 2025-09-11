// Admin controller: retrieve tables, fields, records, and update records
import pool from '../../config/db.js';

export async function getTables(req, res) {
  try {
    const [tables] = await pool.query("SHOW TABLES");
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function getFields(req, res) {
  const { table } = req.params;
  try {
    const [fields] = await pool.query(`SHOW COLUMNS FROM \`${table}\``);
    res.json(fields);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function getRecords(req, res) {
  const { table } = req.params;
  try {
    const [records] = await pool.query(`SELECT * FROM \`${table}\``);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function updateRecord(req, res) {
  const { table, id } = req.params;
  const updates = req.body; // { field1: value1, field2: value2, ... }
  try {
    const setClause = Object.keys(updates)
      .map(field => `\`${field}\` = ?`)
      .join(', ');
    const values = Object.values(updates);
    values.push(id); // id for WHERE clause
    const sql = `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`;
    const [result] = await pool.query(sql, values);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function getTablesWithFieldsAndRecords(req, res) {
  try {
    // Get all table names
    const [tables] = await pool.query("SHOW TABLES");
    const tableNames = tables.map(obj => Object.values(obj)[0]);
    const result = {};
    for (const table of tableNames) {
      // Get fields
      const [fields] = await pool.query(`SHOW COLUMNS FROM \`${table}\``);
      // Get records
      const [records] = await pool.query(`SELECT * FROM \`${table}\``);
      result[table] = {
        fields: fields.map(f => f.Field),
        records: records
      };
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
