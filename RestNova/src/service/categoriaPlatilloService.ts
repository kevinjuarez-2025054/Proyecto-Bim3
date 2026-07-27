import { CategoriaPlatilloModel } from "../models/categoriaPlatillo";
import { CategoriaPlatilloRepository } from "../data/categoriaPlatilloRepository";
import { CategoriaPlatilloValidation } from "../validation/categoriaPlatilloValidation";

export class CategoriaPlatilloService{
    private repository = new CategoriaPlatilloRepository();

    async obtenerCategoriasPlatillo(): Promise<CategoriaPlatilloModel[]>{
        return await this.repository.obtenerCategoriasPlatillo();
    }

    async obtenerCategoriaPlatilloPorId(id: number): Promise<CategoriaPlatilloModel | undefined>{
        CategoriaPlatilloValidation.validatePorId(id);
        return await this.repository.obtenerCategoriaPlatilloPorId(id);
    }

    async crearCategoriaPlatillo(categoriaPlatillo: CategoriaPlatilloModel): Promise<void>{
        CategoriaPlatilloValidation.validate(categoriaPlatillo);
        await this.repository.crearCategoriaPlatillo(categoriaPlatillo);
    }

    async actualizarCategoriaPlatillo(id: number, categoriaPlatillo: CategoriaPlatilloModel): Promise<void>{
        CategoriaPlatilloValidation.validatePorId(id);
        CategoriaPlatilloValidation.validate(categoriaPlatillo);
        const existingCategoriaPlatillo = await this.repository.obtenerCategoriaPlatilloPorId(id);
        if(!existingCategoriaPlatillo){
            throw new Error(`CategoriaPlatillo con id ${id} no fue encontrada`);
        }
        await this.repository.actualizarCategoriaPlatillo(id, categoriaPlatillo);
    }

    async eliminarCategoriaPlatillo(id: number): Promise<void>{
        CategoriaPlatilloValidation.validatePorId(id);
        const existingCategoriaPlatillo = await this.repository.obtenerCategoriaPlatilloPorId(id);
        if(!existingCategoriaPlatillo){
            throw new Error(`CategoriaPlatillo con id ${id} no fue encontrada`);
        }
        await this.repository.eliminarCategoriaPlatillo(id);
    }
}