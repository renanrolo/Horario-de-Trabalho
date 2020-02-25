import {
    hourStringByMinutes,
    getMinutes
} from '../services/functions'

const key = "cargahoraria";
const log = window.console ? console.log : function () { };

const turnoVazio = { ini: '', fim: '', }

function saveState(state) {
    localStorage.setItem(key, JSON.stringify(state));
    return state;
}


function loadState() {
    try {
        const state = JSON.parse(localStorage.getItem(key))
        if (state) {
            return state;
        }
    } catch (e) {
        log("invalid loadJson", e)
    }

    return {
        Turnos: [{
            ini: '08:00',
            fim: '11:30'
        },
        {
            ini: '12:30',
            fim: '17:00'
        }],
        CargaHoraria: '08:00'
    }
}

const INITIAL_STATE = loadState();

function addMinutes(oldValue, value) {
    const newValue = getMinutes(oldValue) + value;
    if (newValue <= 0) {
        return "00:00"
    }

    return hourStringByMinutes(newValue);
}

function hourHasValue(hour) {
    const minutes = getMinutes(hour);

    if (minutes && minutes > 0) {
        return true;
    }

    return false;
}

function previewLastTime(propName, index, turnos, cargaHoraria) {
    if (!cargaHoraria) {
        return; //se não tiver carga horaria
    }

    const ultimoIndex = turnos.length - 1;

    if (propName === "fim" && index === ultimoIndex) {
        return; //se estiver editando o ultimo registro
    }

    let todosPreenchidos = true;
    turnos.forEach((t, i) => {
        if (i === ultimoIndex) {
            if (!hourHasValue(t.ini)) {
                todosPreenchidos = false;
            }
        } else {
            if (!hourHasValue(t.ini) || !hourHasValue(t.fim)) {
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

export default function horaReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'ADD_MINUTES_INI':
            {
                const { turno, minutes } = action.payload;
                turno.ini = addMinutes(turno.ini, minutes);
                const turnos = turnos;
                return saveState({ ...state.Turnos, turnos })
            }


        case 'ADD_MINUTES_FIM':
            {
                const { turno, minutes } = action.payload;
                turno.horaFim = addMinutes(turno.horaFim, minutes);
                return saveState({ ...state, state })
            }


        case 'ADD_TURNO':
            {
                state.Turnos.push(turnoVazio);
                return saveState({ ...state, Turnos: state.Turnos })
            }

        case 'CHANGE_TURNO_VALUE':
            {
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

                previewLastTime(propName, index, newTurnos, state.CargaHoraria)

                return saveState({ ...state, Turnos: newTurnos })
            }

        case 'UPDATE_CARGA_HORARIA':
            {
                return saveState({ ...state, CargaHoraria: action.payload })
            }

        default:
            return state;
    }
}