import { Mesa } from "../models/mesas";
import { MesaRepository } from "../data/mesaRepository";
import { MesaValidation } from "../validation/mesaValidation";

export class MesaService {
    private repository = new MesaRepository();

    async obtenerMesas(): Promise<Mesa[]> {
        return await this.repository.obtenerMesas();
    }

    async obtenerMesaPorId(id: number): Promise<Mesa | undefined> {
        MesaValidation.validatePorId(id);
        return await this.repository.obtenerMesaPorId(id);
    }

    async crearMesa(mesa: Mesa): Promise<void> {
        MesaValidation.validate(mesa);
        await this.repository.crearMesa(mesa);
    }

    async actualizarMesa(id: number, mesa: Mesa): Promise<void> {
        MesaValidation.validatePorId(id);
        MesaValidation.validate(mesa);
        const existingMesa = await this.repository.obtenerMesaPorId(id);
        if (!existingMesa) {
            throw new Error(`Mesa con id ${id} no fue encontrada`);
        }
        await this.repository.actualizarMesa(id, mesa);
    }

    async eliminarMesa(id: number): Promise<void> {
        MesaValidation.validatePorId(id);
        const existingMesa = await this.repository.obtenerMesaPorId(id);
        if (!existingMesa) {
            throw new Error(`Mesa con id ${id} no fue encontrada`);
        }
        await this.repository.eliminarMesa(id);
    }
}