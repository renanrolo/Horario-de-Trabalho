import React, { useState } from "react"
import dispatcher from "../../store/dispatcher";
import { getTotalHours, getStringTotalTurno } from "../../services/functions"
import { horasTrabalhadasSaindoAgora } from "../../services/functions"

const Aside = ({ Turnos }) => {

    const [saindoAgora, setSaindoAgora] = useState(horasTrabalhadasSaindoAgora(Turnos));

    const calcularHorasTrabalhadas = () => {
        setSaindoAgora(horasTrabalhadasSaindoAgora(Turnos));
    }

    return (
        <>
            <div className="col-md-4 order-md-2 mb-4">

                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Resumo</span>
                </h4>

                <ul className="list-group mb-3">
                    {Turnos.map((turno, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">{index + 1}º Turno</h6>
                                <small className="text-muted">Das {turno.ini} as {turno.fim}</small>
                            </div>
                            <span className="text-muted">{getStringTotalTurno(turno)}</span>
                        </li>
                    ))}

                    <li className="list-group-item d-flex justify-content-between bg-light">
                        <div className="text-success">
                            <h6 className="my-0">TOTAL</h6>
                        </div>
                        <strong className="text-success">{getTotalHours(Turnos)}</strong>
                    </li>

                    {saindoAgora &&
                        <li
                            onClick={() => { calcularHorasTrabalhadas() }}
                            className="cursor-pointer btn-outline-primary list-group-item d-flex justify-content-between lh-condensed">
                            <span>Agora</span>
                            <strong>{saindoAgora}</strong>
                        </li>
                    }

                </ul>

            </div>
        </>
    )
}

export default dispatcher(Aside);
