import React, { useState, useEffect } from 'react';
import './App.scss';
import {
  hourStringByMinutes,
  getMinutes
} from './services/functions'

import Article from './components/article'
import Aside from './components/aside'
import Footer from './components/footer'

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
    <div className="container">
      {/* <div>

        Primiro Turno
        <div className="row">
          <br />

          <Input
            valor={hrUm}
            setValor={setHrUm}
            label="Inicio"
          />

          <Input
            valor={hrDois}
            setValor={setHrDois}
            label="Fim"
          />

        </div>

        <br />
        <br />

        Segundo Turno
        <div className="row">
          <br />

          <Input
            valor={hrTres}
            setValor={setHrTres}
            label="Inicio"
          />

          <Input
            valor={hrQuatro}
            setValor={setHrQuatro}
            label="Fim"
          />

        </div>


        <div className="row">
          <button
            onClick={calcular}
            className="btn btn-primary"
            type="submit">Calcular</button>
        </div>
      </div> */}

      <div className="row">
        <Article />

        <Aside />
      </div>

      <Footer />


    </div>
  );
}

export default App;
