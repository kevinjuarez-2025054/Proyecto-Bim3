import { DetallePedido } from "../models/detallePedido";

export class DetallePedidoValidation {
    static validate(detallePedido: DetallePedido): void {
        if (detallePedido.id_platillo === undefined || detallePedido.id_platillo === null || detallePedido.id_platillo <= 0) {
            throw new Error("El id del platillo es obligatorio y debe ser mayor que cero");
        }

        if (detallePedido.cantidad === undefined || detallePedido.cantidad === null || detallePedido.cantidad <= 0) {
            throw new Error("La cantidad es obligatoria y debe ser mayor que cero");
        }

        if (detallePedido.subtotal === undefined || detallePedido.subtotal === null || detallePedido.subtotal < 0) {
            throw new Error("El subtotal es obligatorio y no puede ser negativo");
        }

        if (detallePedido.numero_pedido === undefined || detallePedido.numero_pedido === null || detallePedido.numero_pedido <= 0) {
            throw new Error("El número de pedido es obligatorio y debe ser mayor que cero");
        }

        if (detallePedido.id_empleado === undefined || detallePedido.id_empleado === null || detallePedido.id_empleado <= 0) {
            throw new Error("El id del empleado es obligatorio y debe ser mayor que cero");
        }
    }

    static validatePorId(id: number): void {
        if(id === undefined || id === null){
            throw new Error("El id del detalle de pedido es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }
    }
}