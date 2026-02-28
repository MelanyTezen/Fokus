import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.emoji}>😸</span>
      <h1 className={styles.titulo}>fokus</h1>
      <p className={styles.subtitulo}>organiza tu día con estilo ✨</p>
    </header>
  );
}

export default Header;