import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as HoraAction from '../../store/horaAction'
import InputMask from 'react-input-mask';
import { validateInputChange } from '../../services/functions'

const Article = ({ Turnos, CargaHoraria, setCargaHoraria, addTurno, onChangeTurnoProperty, removerTurno }) => {

    const onChange = (index, propName, e) => {
        onChangeTurnoProperty(index, propName, e.target.value)
    }

    return (
        <>
            <div className="col-md-8 order-md-1">

                <h4 className="mb-3">Quadro</h4>

                <form className="needs-validation" noValidate="">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">Carga horária necessária</label>
                            <div className="row">
                                <div className="col-md-4">
                                    <InputMask
                                        mask="99:99"
                                        maskChar=" "
                                        className="form-control app-input"
                                        value={CargaHoraria}
                                        //ref={input => turno._name = input}
                                        onChange={(e) => setCargaHoraria(e.target.value)}
                                        type="tel"
                                        beforeMaskedValueChange={validateInputChange}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div className="col-12">
                        {Turnos.map((turno, index) => (
                            <div className="row" key={index}>
                                
                                    <div className="input-group">
                                       
                                        <label className="input-group-text">Início</label>

                                        <InputMask
                                            mask="99:99"
                                            maskChar=" "
                                            className="form-control app-input"
                                            value={turno.ini}
                                            //ref={input => turno._name = input}
                                            onChange={(e) => onChange(index, "ini", e)}
                                            type="tel"
                                            beforeMaskedValueChange={validateInputChange}
                                        />

                                        <label className="input-group-text">Fim</label>
                                     
                                        <InputMask
                                            mask="99:99"
                                            maskChar=" "
                                            className="form-control app-input"
                                            value={turno.fim}
                                            //ref={input => turno._name = input}
                                            onChange={(e) => onChange(index, "fim", e)}
                                            type="tel"
                                            beforeMaskedValueChange={validateInputChange}
                                        />

                                        {index <= 0 &&
                                            <button
                                            type="button"
                                             disabled="disabled"
                                            className="btn btn-secondary mr-2">x</button>
                                        }

                                        {index > 0 &&
                                            <button
                                                onClick={() => { removerTurno(index) }}
                                                type="button"
                                                className="btn btn-danger mr-2">x</button>
                                        }
                                    </div>
                                
                                
                            </div>
                        ))}

                        <br />
                        <div className="">
                            <button onClick={() => { addTurno() }} type="button" className="btn btn-success">Adicionar Turno</button>
                        </div>

                        <br />
                        <br />
                    </div>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => (state)
const mapDispatchToProps = dispatch => bindActionCreators(HoraAction, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Article);