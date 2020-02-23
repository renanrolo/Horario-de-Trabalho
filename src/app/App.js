import React, { useState, useEffect } from 'react';
import './App.scss';
import {
  hourStringByMinutes,
  getMinutes
} from './services/functions'

import Article from './components/article'
import Aside from './components/aside'
import Footer from './components/footer'
import Navbar from './components/navbar'

function App() {

  const [hrUm, setHrUm] = useState('07:00')
  const [hrDois, setHrDois] = useState('12:00')
  const [hrTres, setHrTres] = useState('13:00')
  const [hrQuatro, setHrQuatro] = useState('')

  useEffect(() => {
    calcular()
  })

  const getMinutosTrabalhoDia = () => {
    return (8 * 60);
  }

  const formularioInvalido = () => {
    return !getMinutes(hrUm) ||
      !getMinutes(hrDois) ||
      !getMinutes(hrTres);
  }

  const calcular = (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      if (formularioInvalido()) {
        return false;
      }

      const primeiroPeriodo = getMinutes(hrDois) - getMinutes(hrUm);
      const quantoFaltaEmMinutos = getMinutosTrabalhoDia() - primeiroPeriodo;
      const estimativaEmMinutos = getMinutes(hrTres) + quantoFaltaEmMinutos;
      const estimativa = hourStringByMinutes(estimativaEmMinutos);

      setHrQuatro(estimativa)
    }
    catch {
      return false;
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <Article />
          <Aside />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
