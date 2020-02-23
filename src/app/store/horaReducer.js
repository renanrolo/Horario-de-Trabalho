import {
    hourStringByMinutes,
    getMinutes
} from '../services/functions'

const turnoVazio = {
    ini: '',
    fim: '',
}

const INITIAL_STATE = {
    //horas: JSON.parse(localStorage.getItem(key))
    Turnos: [{
        ini: '08:00',
        fim: '11:30'
    },
    {
        ini: '12:30',
        fim: '17:00'
    }]
};

function addMinutes(oldValue, value) {
    const newValue = getMinutes(oldValue) + value;
    if (newValue <= 0) {
        return "00:00"
    }

    return hourStringByMinutes(newValue);
}

export default function horaReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'ADD_MINUTES_INI':
            {
                const { turno, minutes } = action.payload;
                turno.ini = addMinutes(turno.ini, minutes);
                const turnos = state.Turnos;
                return { ...state.Turnos, turnos }
            }

        case 'ADD_MINUTES_FIM':
            {
                const { turno, minutes } = action.payload;
                turno.horaFim = addMinutes(turno.horaFim, minutes);
                return { ...state, state }
            }

        case 'ADD_TURNO':
            state.Turnos.push(turnoVazio);
            return { ...state, Turnos: state.Turnos }

        case 'CHANGE_TURNO_VALUE':
            const { propName, value, index } = action.payload;

            const newTurno = (propName === "ini") ?
                { ini: value } :
                { fim: value }

            const newTurnos = state.Turnos.map((item, i) => {
                if (i !== index) {
                    // This isn't the item we care about - keep it as-is
                    return item
                }
                // Otherwise, this is the one we want - return an updated value
                return {
                    ...item, ...newTurno
                }
            });

            return { ...state, Turnos: newTurnos }

        default:
            return state;
    }
}