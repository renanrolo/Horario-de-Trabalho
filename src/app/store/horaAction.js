// export function login(values) {
//     return { type: 'USER_FETCHED', payload: resp.data }
// }

export function addMinutesIni(turno, minutes) {
    return { type: 'ADD_MINUTES_INI', payload: { turno: turno, minutes: minutes } }
}


export function addMinutesFim(turno, minutes) {
    return { type: 'ADD_MINUTES_FIM', payload: { turno: turno, minutes: minutes } }
}

export function addTurno() {
    return { type: 'ADD_TURNO'}
}


export function onChangeTurnoProperty(index, propName, value){
    return { type: 'CHANGE_TURNO_VALUE', payload: {index, propName, value}}
}