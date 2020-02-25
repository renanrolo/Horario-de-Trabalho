import React, { useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as HoraAction from '../../store/horaAction'
import InputMask from 'react-input-mask';
import './style.css'

const Article = ({ Turnos, CargaHoraria, setCargaHoraria, addTurno, onChangeTurnoProperty }) => {

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
                            <label htmlFor="firstName">Carga horaria necessária</label>
                            <div className="row">
                                <div className="col-md-4">
                                    <InputMask
                                        mask="99:99"
                                        maskChar=" "
                                        className="form-control app-input"
                                        value={CargaHoraria}
                                        //ref={input => turno._name = input}
                                        onChange={(e) => setCargaHoraria(e.target.value)}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    
                    <div className="col-12">
                        {Turnos.map((turno, index) => (
                            <div className="row" key={index}>
                                <div className="input-box mr-3 mb-3">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Início</div>
                                        </div>
                                        <InputMask
                                            mask="99:99"
                                            maskChar=" "
                                            className="form-control app-input"
                                            value={turno.ini}
                                            //ref={input => turno._name = input}
                                            onChange={(e) => onChange(index, "ini", e)}
                                        />
                                    </div>
                                </div>

                                <div className="input-box mr-3 mb-3">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">Fim</div>
                                        </div>
                                        <InputMask
                                            mask="99:99"
                                            maskChar=" "
                                            className="form-control app-input"
                                            value={turno.fim}
                                            //ref={input => turno._name = input}
                                            onChange={(e) => onChange(index, "fim", e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => (state)
const mapDispatchToProps = dispatch => bindActionCreators(HoraAction, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Article);