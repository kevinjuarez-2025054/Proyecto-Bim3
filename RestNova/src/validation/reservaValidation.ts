import { Reserva } from "../models/reserva"; 

export class ReservaValidation {
    static validate(reserva: Reserva): void {
        if (!reserva.fecha_reserva || isNaN(new Date(reserva.fecha_reserva).getTime())) {
            throw new Error("La fecha de la reserva es obligatoria y debe ser una fecha válida");
        }

        if (!reserva.hora || reserva.hora.trim() === "") {
            throw new Error("La hora de la reserva es obligatoria");
        }

        if (reserva.cantidad_personas === undefined || reserva.cantidad_personas === null || reserva.cantidad_personas <= 0) {
            throw new Error("La cantidad de personas es obligatoria y debe ser mayor que cero");
        }

        if (reserva.id_cliente === undefined || reserva.id_cliente === null || reserva.id_cliente <= 0) {
            throw new Error("El id del cliente es obligatorio y debe ser mayor que cero");
        }

        if (reserva.numero_mesa === undefined || reserva.numero_mesa === null || reserva.numero_mesa <= 0) {
            throw new Error("El número de mesa es obligatorio y debe ser mayor que cero");
        }

        if (reserva.id_empleado === undefined || reserva.id_empleado === null || reserva.id_empleado <= 0) {
            throw new Error("El id del empleado es obligatorio y debe ser mayor que cero");
        }
    }

    static validatePorId(id: number): void {
        if(id === undefined || id === null){
            throw new Error("El id de la reserva es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }

    }
    
}