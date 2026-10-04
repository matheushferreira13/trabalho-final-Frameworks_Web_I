import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Home() {
  const [personagens, setPersonagens] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos'); // 'todos', 'student', 'staff'
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarPersonagens() {
      try {
        setLoading(true);
        const resposta = await api.get('/characters');
        setPersonagens(resposta.data.slice(0, 24));
      } catch (err) {
        setErro('Erro ao carregar os dados da API de Harry Potter.');
      } finally {
        setLoading(false);
      }
    }
    carregarPersonagens();
  }, []);

  // Lógica de filtro por nome e por tipo (Estudante/Staff)
  const personagensFiltrados = personagens.filter((p) => {
    const matchNome = p.name.toLowerCase().includes(busca.toLowerCase());
    if (filtroTipo === 'student') return matchNome && p.hogwartsStudent;
    if (filtroTipo === 'staff') return matchNome && p.hogwartsStaff;
    return matchNome;
  });

  if (loading) {
    return <div className="page-container"><p>Carregando personagens de Hogwarts...</p></div>;
  }

  if (erro) {
    return <div className="page-container"><p style={{ color: 'red' }}>{erro}</p></div>;
  }

  return (
    <div className="page-container">
      <h1>Portal do Mundo Mágico</h1>
      
      <input
        type="text"
        placeholder="Pesquisar personagem por nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="search-input"
      />

      {/* Botões de Filtro em formato de Pílula (Estilo site oficial) */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFiltroTipo('todos')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '9999px',
            border: '1px solid #334155',
            backgroundColor: filtroTipo === 'todos' ? '#38bdf8' : '#1e293b',
            color: filtroTipo === 'todos' ? '#0f172a' : '#f8fafc',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltroTipo('student')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '9999px',
            border: '1px solid #334155',
            backgroundColor: filtroTipo === 'student' ? '#38bdf8' : '#1e293b',
            color: filtroTipo === 'student' ? '#0f172a' : '#f8fafc',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >
          Estudantes
        </button>
        <button
          onClick={() => setFiltroTipo('staff')}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '9999px',
            border: '1px solid #334155',
            backgroundColor: filtroTipo === 'staff' ? '#38bdf8' : '#1e293b',
            color: filtroTipo === 'staff' ? '#0f172a' : '#f8fafc',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >
        Professores / Staff
        </button>
      </div>

      <div className="grid-container">
        {personagensFiltrados.map((personagem) => (
          <div key={personagem.id} className="card">
            <img 
              src={personagem.image || 'https://via.placeholder.com/150'} 
              alt={personagem.name} 
              className="card-img"
            />
            <h3>{personagem.name}</h3>
            <p><strong>Casa:</strong> {personagem.house || 'Desconhecida'}</p>
            <Link to={`/personagem/${personagem.id}`} className="details-btn">
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>

      {/* Banner decorativo com a silhueta de Hogwarts (Agora dentro do return) */}
      <div style={{
        width: '100%',
        height: '120px',
        backgroundImage: `url('/src/assets/horizons_hogwarts.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center bottom',
        backgroundSize: 'contain',
        marginTop: '4rem',
        opacity: 0.8
      }} />
    </div>
  );
}