import { Pago } from "../models/pago";
import { PagoRepository } from "../data/pagoRepository";
import { PagoValidation } from "../validation/pagoValidation";

export class PagoService {
    private repository = new PagoRepository();

    async obtenerPagos(): Promise<Pago[]>{
        return await this.repository.obtenerPagos();
    }

    async obtenerPagoPorId(id: number): Promise<Pago | undefined>{
        PagoValidation.validatePorId(id);
        return await this.repository.obtenerPagoPorId(id);
    }

    async crearPago(pago: Pago): Promise<void>{
        PagoValidation.validate(pago);
        await this.repository.crearPago(pago);
    }

    async actualizarPago(id: number, pago: Pago): Promise<void>{
        PagoValidation.validatePorId(id);
        PagoValidation.validate(pago);
        const existingPago = await this.repository.obtenerPagoPorId(id);
        if(!existingPago){
            throw new Error(`Pago con id ${id} no fue encontrado`);
        }
        await this.repository.actualizarPago(id, pago);
    }

    async eliminarPago(id: number): Promise<void>{
        PagoValidation.validatePorId(id);
        const existingPago = await this.repository.obtenerPagoPorId(id);
        if(!existingPago){
            throw new Error(`Pago con id ${id} no fue encontrado`);
        }
        await this.repository.eliminarPago(id);
    }
}