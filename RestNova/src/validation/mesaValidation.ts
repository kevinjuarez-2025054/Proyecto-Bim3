import { Mesa } from "../models/mesas";

export class MesaValidation {
    static validate(mesa: Mesa): void {

        if (mesa.capacidad === undefined || mesa.capacidad === null || mesa.capacidad <= 0) {
            throw new Error("La capacidad de la mesa es obligatoria y debe ser mayor que cero");
        }

        if(mesa.capacidad === undefined || mesa.capacidad === null){
            throw new Error("La capacidad de la mesa es obligatoria");
        }

        if (mesa.estado === undefined || mesa.estado === null) {
            throw new Error("El estado de la mesa es obligatorio");
        }
    }

    static validatePorId(id: number): void {
        if(id === undefined || id === null){
            throw new Error("El id de la mesa es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }

    }
}