import { useState } from 'react';
import styles from './FormularioTarea.module.css';

function FormularioTarea({ onAgregarTarea }) {
  const [texto, setTexto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (texto.trim() === '') return;
    onAgregarTarea(texto);
    setTexto('');
  };

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="¿qué quieres lograr hoy?"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button className={styles.boton} type="submit">+</button>
      </form>
    </div>
  );
}

export default FormularioTarea;