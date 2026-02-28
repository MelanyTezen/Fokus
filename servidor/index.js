const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const leerTareas = () => {
  const data = fs.readFileSync('./db.json', 'utf-8');
  return JSON.parse(data).tareas;
};

const guardarTareas = (tareas) => {
  fs.writeFileSync('./db.json', JSON.stringify({ tareas }, null, 2));
};

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  res.json(leerTareas());
});

// Agregar una tarea
app.post('/tareas', (req, res) => {
  const tareas = leerTareas();
  const nuevaTarea = {
    id: Date.now(),
    texto: req.body.texto,
    completada: false
  };
  tareas.push(nuevaTarea);
  guardarTareas(tareas);
  res.json(nuevaTarea);
});

// Completar o descompletar una tarea
app.put('/tareas/:id', (req, res) => {
  const tareas = leerTareas();
  const index = tareas.findIndex(t => t.id === parseInt(req.params.id));
  tareas[index].completada = !tareas[index].completada;
  guardarTareas(tareas);
  res.json(tareas[index]);
});

// Eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
  let tareas = leerTareas();
  tareas = tareas.filter(t => t.id !== parseInt(req.params.id));
  guardarTareas(tareas);
  res.json({ mensaje: 'Tarea eliminada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});