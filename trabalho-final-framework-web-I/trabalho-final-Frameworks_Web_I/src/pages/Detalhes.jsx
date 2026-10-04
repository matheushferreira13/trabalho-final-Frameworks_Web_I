import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Detalhes() {
  const { id } = useParams();
  const [personagem, setPersonagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        setLoading(true);
        const resposta = await api.get(`/character/${id}`);
        if (resposta.data.length > 0) {
          setPersonagem(resposta.data[0]);
        } else {
          setErro('Personagem não encontrado.');
        }
      } catch (err) {
        setErro('Erro ao buscar os detalhes do personagem.');
      } finally {
        setLoading(false);
      }
    }
    carregarDetalhes();
  }, [id]);

  if (loading) {
    return <div className="page-container"><p>Carregando detalhes...</p></div>;
  }

  if (erro || !personagem) {
    return (
      <div className="page-container">
        <p style={{ color: 'red' }}>{erro}</p>
        <Link to="/" className="back-link">← Voltar para a listagem</Link>
      </div>
    );
  }

  return (
    <div className="page-container details-page">
      <img 
        src={personagem.image || 'https://via.placeholder.com/150'} 
        alt={personagem.name} 
        className="details-img"
      />
      <div className="details-info">
        <h1>{personagem.name}</h1>
        <p><strong>Casa:</strong> {personagem.house || 'Não informada'}</p>
        <p><strong>Ator/Atriz:</strong> {personagem.actor || 'Desconhecido'}</p>
        <p><strong>Espécie:</strong> {personagem.species}</p>
        <p><strong>Patrono:</strong> {personagem.patronus || 'Desconhecido'}</p>
        <p><strong>Data de Nascimento:</strong> {personagem.dateOfBirth || 'Desconhecida'}</p>
        
        <Link to="/" className="back-link">← Voltar para a listagem</Link>
      </div>
    </div>
  );
}