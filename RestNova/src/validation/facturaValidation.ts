import { Factura } from "../models/factura";

export class FacturaValidation {
    static validate(factura: Factura): void {
        if (!factura.fecha || isNaN(factura.fecha.getTime())) {
            throw new Error("La fecha es obligatoria y debe ser una fecha válida");
        }

        if (factura.subtotal === undefined || factura.subtotal === null || factura.subtotal < 0) {
            throw new Error("El subtotal es obligatorio y no puede ser negativo");
        }

        if (factura.iva === undefined || factura.iva === null || factura.iva < 0) {
            throw new Error("El IVA es obligatorio y no puede ser negativo");
        }

        if (factura.total === undefined || factura.total === null || factura.total < 0) {
            throw new Error("El total es obligatorio y no puede ser negativo");
        }

        if (factura.numero_pedido === undefined || factura.numero_pedido === null || factura.numero_pedido <= 0) {
            throw new Error("El número de pedido es obligatorio y debe ser mayor que cero");
        }

        if (factura.id_platillo === undefined || factura.id_platillo === null || factura.id_platillo <= 0) {
            throw new Error("El id del platillo es obligatorio y debe ser mayor que cero");
        }

        if (factura.id_detalle_pedido === undefined || factura.id_detalle_pedido === null || factura.id_detalle_pedido <= 0) {
            throw new Error("El id del detalle de pedido es obligatorio y debe ser mayor que cero");
        }
    }

    static validatePorId(id: number): void {
        if(id === undefined || id === null){
            throw new Error("El id de la factura es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }
    }
}