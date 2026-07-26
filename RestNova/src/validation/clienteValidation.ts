import { Cliente } from "../models/clientes";

export class ClienteValidation{
    static validate(cliente: Cliente): void {
        if (!cliente.nombre || cliente.nombre.trim() === "") {
            throw new Error("El nombre es obligatorio");
        }

        if (!cliente.apellido || cliente.apellido.trim() === "") {
            throw new Error("El apellido es obligatorio");
        }

        if (!cliente.telefono || cliente.telefono.trim() === "") {
            throw new Error("El teléfono es obligatorio");
        }

        if (!cliente.email || cliente.email.trim() === "") {
            throw new Error("El email es obligatorio");
        }
    }

    static validatePorId(id: number): void {

        if(id === undefined || id === null){
            throw new Error("El id del cliente es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }

    }
}