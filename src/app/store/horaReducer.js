import {
    hourStringByMinutes,
    getMinutes
} from "../services/functions"

const key = "cargahoraria";

const INITIAL_STATE = _loadState();

export default function horaReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case "REMOVE_TURNO": {
            return REMOVE_TURNO(action, state);
        }

        case "ADD_TURNO": {
            return ADD_TURNO(state);
        }

        case "CHANGE_TURNO_VALUE": {
            return CHANGE_TURNO_VALUE(action, state);
        }

        case "UPDATE_CARGA_HORARIA": {
            return UPDATE_CARGA_HORARIA(action, state);
        }

        default:
            return state;
    }
}

function REMOVE_TURNO(action, state) {
    const index = action.payload;
    const newTurnos = [...state.Turnos]
    newTurnos.splice(index, 1);
    return _saveState({ ...state, Turnos: newTurnos })
}

function ADD_TURNO(state) {
    const newTurnos = [...state.Turnos];
    newTurnos.push({ ini: "", fim: "" });
    return _saveState({ ...state, Turnos: newTurnos })
}

function CHANGE_TURNO_VALUE(action, state) {
    const { propName, value, index } = action.payload;

    const newTurno = (propName === "ini") ?
        { ini: value } :
        { fim: value }

    const newTurnos = state.Turnos.map((item, i) => {
        if (i !== index) { // This isn't the item we care about - keep it as-is
            return item
        }
        return { // Otherwise, this is the one we want - return an updated value
            ...item, ...newTurno
        }
    });

    _previewLastTime(propName, index, newTurnos, state.CargaHoraria)

    return _saveState({ ...state, Turnos: newTurnos })
}

function UPDATE_CARGA_HORARIA(action, state) {
    const newTurnos = state.Turnos.map((item, i) => {
        return {
            ...item
        }
    });

    _previewLastTime("ini", 0, newTurnos, action.payload)

    return _saveState({ ...state, CargaHoraria: action.payload, Turnos: newTurnos })
}

function _saveState(state) {
    localStorage.setItem(key, JSON.stringify(state));
    return state;
}

function _loadState() {
    try {
        const state = JSON.parse(localStorage.getItem(key))
        if (state) {
            return state;
        }
    } catch (e) {
        if (window.console) {
            console.log("invalid loadJson", e)
        }
    }

    return {
        Turnos: [{
            ini: "08:00",
            fim: "11:30"
        },
        {
            ini: "12:30",
            fim: "17:00"
        }],
        CargaHoraria: "08:00"
    }
}

function _previewLastTime(propName, index, turnos, cargaHoraria) {
    if (!cargaHoraria) {
        return;
    }

    const ultimoIndex = turnos.length - 1;

    if (propName === "fim" && index === ultimoIndex) {
        return;
    }

    let todosPreenchidos = true;
    turnos.forEach((t, i) => {
        if (i === ultimoIndex) {
            if (!_hourHasValue(t.ini)) {
                todosPreenchidos = false;
            }
        } else {
            if (!_hourHasValue(t.ini) || !_hourHasValue(t.fim)) {
                todosPreenchidos = false;
            }
        }
    });

    if (!todosPreenchidos) {
        return;
    }

    let total = 0;
    turnos.forEach((t, i) => {
        if (i < ultimoIndex) {
            total += getMinutes(t.fim) - getMinutes(t.ini);
        }
    });

    const ultimoTurno = turnos[ultimoIndex];

    const restante = getMinutes(cargaHoraria) - total;

    const previsaoSaidaEmMinutos = getMinutes(ultimoTurno.ini) + restante;

    ultimoTurno.fim = hourStringByMinutes(previsaoSaidaEmMinutos);
}

function _hourHasValue(hour) {
    const minutes = getMinutes(hour);

    if (minutes && minutes > 0) {
        return true;
    }

    return false;
}