import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import FormularioTarea from './components/FormularioTarea';
import ListaTareas from './components/ListaTareas';

const API = 'http://localhost:3001/tareas';

function App() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch(API) /*get*/
      .then(res => res.json())
      .then(data => setTareas(data));
  }, []);

  const agregarTarea = (texto) => {
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto })
    })
      .then(res => res.json())
      .then(nuevaTarea => setTareas([...tareas, nuevaTarea]));
  };

  const completarTarea = (id) => {
    fetch(`${API}/${id}`, { method: 'PUT' })
      .then(res => res.json())
      .then(tareaActualizada => {
        setTareas(tareas.map(t => t.id === id ? tareaActualizada : t));
      });
  };

  const eliminarTarea = (id) => {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => setTareas(tareas.filter(t => t.id !== id)));
  };

  return (
    <div className="app-container">
      <Header />
      <FormularioTarea onAgregarTarea={agregarTarea} />
      <ListaTareas
        tareas={tareas}
        onCompletar={completarTarea}
        onEliminar={eliminarTarea}
      />
    </div>
  );
}

export default App;