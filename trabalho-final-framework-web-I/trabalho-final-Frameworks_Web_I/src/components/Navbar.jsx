import { Link } from 'react-router-dom';
import logoHp from '../assets/logo-harry-potter.png'; // Certifique-se de salvar a imagem com esse nome em src/assets/

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logoHp} alt="Harry Potter" style={{ height: '38px', objectFit: 'contain' }} />
      </Link>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link className="nav-link" to="/">Personagens</Link>
        <Link className="nav-link" to="/casas">Casas de Hogwarts</Link>
      </div>
    </nav>
  );
}