import { Mensaje } from "src/mensaje/mensaje.entity";

export interface SalaDTO{
    idCurso: number,
    mensajes: Mensaje[]
}