import { CategoriaPlatilloModel } from "../models/categoriaPlatillo";

export class CategoriaPlatilloValidation {
    static validate(categoriaPlatillo: CategoriaPlatilloModel): void {
        if (!categoriaPlatillo.categoria_platillo || categoriaPlatillo.categoria_platillo.trim() === "") {
            throw new Error("El nombre de la categoría es obligatorio");
        }
    }

    static validatePorId(id: number): void {
        if(id === undefined || id === null){
            throw new Error("El id de la categoría es obligatorio")
        }

        if(!Number.isInteger(id) || id <= 0){
            throw new Error("El id proporcionado no es válido.");
        }

    }
}