import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const informacoesCasas = {
  Gryffindor: {
    fundador: 'Godric Gryffindor',
    animal: 'Leão',
    cores: 'Vermelho e Dourado',
    descricao: 'Conhecidos pela bravura, ousadia, nervo e cavalheirismo.'
  },
  Slytherin: {
    fundador: 'Salazar Slytherin',
    animal: 'Serpente',
    cores: 'Verde e Prata',
    descricao: 'Conhecidos pela ambição, astúcia, liderança e engenhosidade.'
  },
  Ravenclaw: {
    fundador: 'Rowena Ravenclaw',
    animal: 'Águia',
    cores: 'Azul e Bronze',
    descricao: 'Conhecidos pela inteligência, sabedoria, criatividade e aprendizado.'
  },
  Hufflepuff: {
    fundador: 'Helga Hufflepuff',
    animal: 'Texugo',
    cores: 'Amarelo e Preto',
    descricao: 'Conhecidos pela lealdade, dedicação, justiça, paciência e trabalho duro.'
  }
};

export default function Casas() {
  const [personagensPorCasa, setPersonagensPorCasa] = useState({});
  const [casaSelecionada, setCasaSelecionada] = useState('Gryffindor');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const resposta = await api.get('/characters');
        const todos = resposta.data;

        const agrupados = {
          Gryffindor: todos.filter(p => p.house === 'Gryffindor'),
          Slytherin: todos.filter(p => p.house === 'Slytherin'),
          Ravenclaw: todos.filter(p => p.house === 'Ravenclaw'),
          Hufflepuff: todos.filter(p => p.house === 'Hufflepuff'),
        };

        setPersonagensPorCasa(agrupados);
      } catch (err) {
        console.error('Erro ao carregar dados das casas', err);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  if (loading) return <div className="page-container"><p>Carregando casas de Hogwarts...</p></div>;

  const info = informacoesCasas[casaSelecionada];
  const membros = personagensPorCasa[casaSelecionada] || [];

  return (
    <div className="page-container">
      <h1>Casas de Hogwarts</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {Object.keys(informacoesCasas).map((casa) => (
          <button
            key={casa}
            onClick={() => setCasaSelecionada(casa)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: casaSelecionada === casa ? '2px solid #38bdf8' : '1px solid #334155',
              backgroundColor: casaSelecionada === casa ? '#1e293b' : '#0f172a',
              color: '#f8fafc',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {casa}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #334155' }}>
        <h2>{casaSelecionada}</h2>
        <p><strong>Fundador(a):</strong> {info.fundador}</p>
        <p><strong>Animal-símbolo:</strong> {info.animal}</p>
        <p><strong>Cores:</strong> {info.cores}</p>
        <p><strong>Características:</strong> {info.descricao}</p>
      </div>

      <h2>Membros Famosos ({membros.length})</h2>
      <div className="grid-container" style={{ marginTop: '1rem' }}>
        {membros.map((personagem) => (
          <div key={personagem.id} className="card">
            <img 
              src={personagem.image || 'https://via.placeholder.com/150'} 
              alt={personagem.name} 
              className="card-img"
            />
            <h3>{personagem.name}</h3>
            <p><strong>Ator:</strong> {personagem.actor || 'Desconhecido'}</p>
            <Link to={`/personagem/${personagem.id}`} className="details-btn">
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}