import styles from './ListaTareas.module.css';

function ListaTareas({ tareas, onCompletar, onEliminar }) {
  const pendientes = tareas.filter(t => !t.completada).length;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.titulo}>📝 Mis tareas</span>
        <span className={styles.contador}>{pendientes} pendiente{pendientes !== 1 ? 's' : ''}</span>
      </div>

      {tareas.length === 0 ? (
        <div className={styles.vacio}>
          <span className={styles.vacioemoji}>🌸</span>
          <p>¡Tu lista está vacía!</p>
          <p>Agrega tu primera tarea ✨</p>
        </div>
      ) : (
        <ul className={styles.lista}>
          {tareas.map((tarea) => (
            <li key={tarea.id} className={styles.tarea}>
              <button
                className={`${styles.botonCompletar} ${tarea.completada ? styles.completado : ''}`}
                onClick={() => onCompletar(tarea.id)}
              />
              <span className={`${styles.texto} ${tarea.completada ? styles.textoCompletado : ''}`}>
                {tarea.texto}
              </span>
              <button
                className={styles.botonEliminar}
                onClick={() => onEliminar(tarea.id)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaTareas;