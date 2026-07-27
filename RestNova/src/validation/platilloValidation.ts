import { Platillo } from "../models/platillo";

export class PlatilloValidation {
    static validate(platillo: Platillo): void {
        if (!platillo.nombre_platillo || platillo.nombre_platillo.trim() === "") {
            throw new Error("El nombre del platillo es obligatorio");
        }

        if (!platillo.descripcion_platillo || platillo.descripcion_platillo.trim() === "") {
            throw new Error("La descripción del platillo es obligatoria");
        }

        if (platillo.precio_platillo === undefined || platillo.precio_platillo === null) {
            throw new Error("El precio del platillo es obligatorio");
        }

        if (typeof platillo.precio_platillo !== "number" || platillo.precio_platillo <= 0) {
            throw new Error("El precio del platillo debe ser un número positivo");
        }

        if (platillo.id_categoria === undefined || platillo.id_categoria === null || platillo.id_categoria <= 0) {
            throw new Error("El id de la categoría es obligatorio y debe ser mayor que cero");
        }
    }

    static validatePorId(id: number): void {
        if(id === undefined || id === null){
            throw new Error("El id del platillo es obligatorio")
        }   

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }
    }
}