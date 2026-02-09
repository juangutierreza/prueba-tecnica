export function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);

  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({ error: 'Ya existe un registro con esos datos' });
  }

  res.status(500).json({ error: 'Error interno del servidor' });
}
