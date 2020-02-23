export function hourStringByMinutes(minutes) {
    if (minutes <= 0) {
        return "00:00";
    }

    const leftMinutes = minutes % 60;
    const hours = (minutes - leftMinutes) / 60;
    return pad(hours, 2) + ":" + pad(leftMinutes, 2)
}

export function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

export function getDiferenceInMinutes(end, ini) {
    const total = getMinutes(end) - getMinutes(ini);
    if (total <= 0) {
        return 0;
    }

    return total;
}

export function getMinutes(texto) {
    try {
        if (!texto) {
            return 0;
        }
        const [valorUm, valorDois] = texto.split(":")
        return (+valorUm * 60) + (+valorDois);
    } catch{
        return null;
    }
}

export function getTotalHours(turnos) {
    let totalMinutos = 0;
    turnos.forEach(turno => {
        totalMinutos += getMinutes(turno.fim) - getMinutes(turno.ini);
    });
    return hourStringByMinutes(totalMinutos);
}

export function getStringTotalTurno(turno) {
    const total = getMinutes(turno.fim) - getMinutes(turno.ini);
    return hourStringByMinutes(total);
}