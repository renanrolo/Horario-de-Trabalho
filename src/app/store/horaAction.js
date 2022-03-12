export function addTurno() {
    return { type: "ADD_TURNO" }
}

export function onChangeTurnoProperty(index, propName, value) {
    return { type: "CHANGE_TURNO_VALUE", payload: { index, propName, value } }
}

export function setCargaHoraria(cargaHoraria) {
    return { type: "UPDATE_CARGA_HORARIA", payload: cargaHoraria }

}

export function removerTurno(index) {
    return { type: "REMOVE_TURNO", payload: index }

}