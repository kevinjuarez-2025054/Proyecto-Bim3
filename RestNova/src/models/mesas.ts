import {EstadoMesa} from './estadoMesa';

export interface Mesa {
    numero_mesa: number;
    capacidad: number;
    estado: EstadoMesa;
}