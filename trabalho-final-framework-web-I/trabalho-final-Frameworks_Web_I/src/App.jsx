import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detalhes from './pages/Detalhes';
import Casas from './pages/Casas';
import './App.css';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://hp-api.onrender.com/api',
});

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/casas" element={<Casas />} />
        <Route path="/personagem/:id" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;