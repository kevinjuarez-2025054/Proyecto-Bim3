import { Pedido } from "../models/pedido";

export class PedidoValidation {
    static validate(pedido: Pedido): void {
        if (!pedido.fecha || pedido.fecha.trim() === "" ) {
            throw new Error("La fecha del pedido es obligatoria y debe ser una fecha válida");
        }

        if (!pedido.estado_pedido || pedido.estado_pedido.trim() === "") {
            throw new Error("El estado del pedido es obligatorio");
        }

        if (pedido.id_cliente === undefined || pedido.id_cliente === null || pedido.id_cliente <= 0) {
            throw new Error("El id del cliente es obligatorio y debe ser mayor que cero");
        }

        if (pedido.numero_mesa === undefined || pedido.numero_mesa === null || pedido.numero_mesa <= 0) {
            throw new Error("El número de mesa es obligatorio y debe ser mayor que cero");
        }

        if (pedido.id_platillo === undefined || pedido.id_platillo === null || pedido.id_platillo <= 0) {
            throw new Error("El id del platillo es obligatorio y debe ser mayor que cero");
        }
    }

    static validatePorId(id: number): void {
        if(id === undefined || id === null){
            throw new Error("El id del pedido es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }
    }
}