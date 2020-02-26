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
            return null;
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

export function horaAtualEmMinutos() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (hours * 60) + minutes;
}

export function horasTrabalhadasSaindoAgora(turnos) {
    const _horaAtualEmMinutos = horaAtualEmMinutos();
    const ultimoIndex = turnos.length - 1;
    let totalMinutosTrabalhados = 0;
    let continuar = true;

    turnos.forEach((turno, index) => {
        const ini = getMinutes(turno.ini);
        const fim = getMinutes(turno.fim);

        if (index === ultimoIndex) {
            if (!ini || ini > _horaAtualEmMinutos) {
                continuar = false;
            } else {
                totalMinutosTrabalhados += (_horaAtualEmMinutos - ini);
            }
        }
        else {
            if (!ini || !fim) {
                continuar = false;
            } else {
                totalMinutosTrabalhados += (fim - ini);
            }
        }
    });

    if (!continuar) {
        return null;
    }

    return hourStringByMinutes(totalMinutosTrabalhados);
}