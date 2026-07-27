import { Factura } from "../models/factura";
import { FacturaRepository } from "../data/facturaRepository";
import { FacturaValidation } from "../validation/facturaValidation";

export class FacturaService {
    private repository = new FacturaRepository();

    async obtenerFacturas(): Promise<Factura[]>{
        return await this.repository.obtenerFacturas();
    }

    async obtenerFacturaPorId(id: number): Promise<Factura | undefined>{
        FacturaValidation.validatePorId(id);
        return await this.repository.obtenerFacturaPorId(id);
    }

    async crearFactura(factura: Factura): Promise<void>{
        FacturaValidation.validate(factura);
        await this.repository.crearFactura(factura);
    }

    async actualizarFactura(id: number, factura: Factura): Promise<void>{
        FacturaValidation.validatePorId(id);
        FacturaValidation.validate(factura);
        const existingFactura = await this.repository.obtenerFacturaPorId(id);
        if(!existingFactura){
            throw new Error(`Factura con id ${id} no fue encontrada`);
        }
        await this.repository.actualizarFactura(id, factura);
    }

    async eliminarFactura(id: number): Promise<void>{
        FacturaValidation.validatePorId(id);
        const existingFactura = await this.repository.obtenerFacturaPorId(id);
        if(!existingFactura){
            throw new Error(`Factura con id ${id} no fue encontrada`);
        }   
        await this.repository.eliminarFactura(id);
    }
}