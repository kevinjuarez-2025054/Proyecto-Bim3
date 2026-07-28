import { EstadoPedido } from "./estdoPedido";

export interface Pedido{
    numero_pedido: number;
    fecha: string;
    estado_pedido: EstadoPedido;
    id_cliente: number;
    numero_mesa: number;
    id_platillo: number;
}