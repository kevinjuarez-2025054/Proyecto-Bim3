import { Platillo } from "../models/platillo";
import { PlatilloRepository } from "../data/platilloRepository";
import { PlatilloValidation } from "../validation/platilloValidation";

export class PlatilloService {
    private repository = new PlatilloRepository();

    async obtenerPlatillos(): Promise<Platillo[]>{
        return await this.repository.obtenerPlatillos();
    }

    async obtenerPlatilloPorId(id: number): Promise<Platillo | undefined>{
        PlatilloValidation.validatePorId(id);
        return await this.repository.obtenerPlatilloPorId(id);
    }

    async crearPlatillo(platillo: Platillo): Promise<void>{
        PlatilloValidation.validate(platillo);
        await this.repository.crearPlatillo(platillo);
    }

    async actualizarPlatillo(id: number, platillo: Platillo): Promise<void>{
        PlatilloValidation.validatePorId(id);
        PlatilloValidation.validate(platillo);
        const existingPlatillo = await this.repository.obtenerPlatilloPorId(id);
        if(!existingPlatillo){
            throw new Error(`Platillo con id ${id} no fue encontrado`);
        }
        await this.repository.actualizarPlatillo(id, platillo);
    }

    async eliminarPlatillo(id: number): Promise<void>{
        PlatilloValidation.validatePorId(id);
        const existingPlatillo = await this.repository.obtenerPlatilloPorId(id);
        if(!existingPlatillo){
            throw new Error(`Platillo con id ${id} no fue encontrado`);
        }
        await this.repository.eliminarPlatillo(id);
    }
}