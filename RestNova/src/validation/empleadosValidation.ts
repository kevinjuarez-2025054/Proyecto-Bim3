import { Empleado } from "../models/empleados";

export class EmpleadoValidation {
    static validate(empleado: Empleado): void {
        if (!empleado.nombre_empleado || empleado.nombre_empleado.trim() === "") {
            throw new Error("El nombre del empleado es obligatorio");
        }

        if (!empleado.apellido_empleado || empleado.apellido_empleado.trim() === "") {
            throw new Error("El apellido del empleado es obligatorio");
        }

        if (!empleado.cargo || empleado.cargo.trim() === "") {
            throw new Error("El cargo del empleado es obligatorio");
        }

        if (!empleado.telefono || empleado.telefono.trim() === "") {
            throw new Error("El teléfono del empleado es obligatorio");
        }

        if (!empleado.email || empleado.email.trim() === "") {
            throw new Error("El email del empleado es obligatorio");
        }
    }

    static validatePorId(id: number): void {
        if(id === undefined || id === null){
            throw new Error("El id del empleado es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }

    }
}