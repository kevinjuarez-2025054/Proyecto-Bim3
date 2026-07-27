import { Pago } from "../models/pago";

export class PagoValidation {
    static validate(pago: Pago): void {
        if (!pago.metodo_pago || pago.metodo_pago.trim() === "") {
            throw new Error("El método de pago es obligatorio");
        }

        if (pago.monto === undefined || pago.monto === null || pago.monto < 0) {
            throw new Error("El monto es obligatorio y no puede ser negativo");
        }

        if (!pago.fecha_pago || isNaN(pago.fecha_pago.getTime())) {
            throw new Error("La fecha de pago es obligatoria y debe ser una fecha válida");
        }

        if (pago.numero_factura === undefined || pago.numero_factura === null || pago.numero_factura <= 0) {
            throw new Error("El número de factura es obligatorio y debe ser mayor que cero");
        }

        if (pago.id_cliente === undefined || pago.id_cliente === null || pago.id_cliente <= 0) {
            throw new Error("El id del cliente es obligatorio y debe ser mayor que cero");
        }
    }

    static validatePorId(id: number): void {
        if(id === undefined || id === null){
            throw new Error("El id del pago es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }
    }
}