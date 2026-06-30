import { date } from './../../../node_modules/zod/src/v4/core/regexes';
export class Alerta {
    idAlerta: number = 0;
    fechaHoraAlerta: string = '';
    fechaHoraAtendida: string = '';
    estadoAlerta: string = '';
    observacion: string = '';
    tipoAlerta: string = '';
    usuario: { idUsuario: number } = { idUsuario: 0 };
}
