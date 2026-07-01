import { metodoPago } from "./metodoPago";

export interface Pago{
    id_pago: number;
    metodo_pago: metodoPago;
    monto: number;
    fecha_pago: Date;
    numero_factura: number;
    id_cliente: number;
}