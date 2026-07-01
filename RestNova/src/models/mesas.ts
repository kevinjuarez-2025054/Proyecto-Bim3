import {EstadoMesa} from './estadoMesa';

export interface Mesa {
    id_mesa: number;
    numero_mesa: number;
    estado: EstadoMesa;
}