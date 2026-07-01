export interface Factura {
    numero_factura: number;
    fecha: Date;
    subtotal: number;
    iva: number;
    total: number;
    numero_pedido: number;
    id_platillo: number;
    id_detalle_pedido: number;
}