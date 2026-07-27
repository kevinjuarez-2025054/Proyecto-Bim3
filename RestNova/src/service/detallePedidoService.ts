import { DetallePedido } from "../models/detallePedido";
import { DetallePedidoRepository } from "../data/detallePedidoRepository";
import { DetallePedidoValidation } from "../validation/detallePedidoValidation";

export class DetallePedidoService{
    private repository = new DetallePedidoRepository();

    async obtenerDetallesPedidos(): Promise<DetallePedido[]>{
        return await this.repository.obtenerDetallesPedido();
    }

    async obtenerDetallePedidoPorId(id : number): Promise<DetallePedido | undefined>{
        DetallePedidoValidation.validatePorId(id);
        return await this.repository.obtenerDetallePedidoPorId(id);
    }

    async crearDetallePedido(detallePedido: DetallePedido): Promise<void>{
        DetallePedidoValidation.validate(detallePedido);
        await this.repository.crearDetallePedido(detallePedido);
    }

    async actualizarDetallePedido(id: number, detallePedido: DetallePedido): Promise<void>{
        DetallePedidoValidation.validatePorId(id);
        DetallePedidoValidation.validate(detallePedido);
        const existenteDetallepedido = await this.repository.obtenerDetallePedidoPorId(id);
        if(!existenteDetallepedido){
            throw new Error(`DetallePedido con id ${id} no fue encontrado`);
        }
        await this.repository.actualizarDetallePedido(id, detallePedido);
    }

    async EliminarDetallePedido(id: number): Promise<void>{
        DetallePedidoValidation.validatePorId(id);
        const existenteDetallepedido = await this.repository.obtenerDetallePedidoPorId(id);
        if(!existenteDetallepedido){
            throw new Error(`DetallePedido con id ${id} no fue encontrado`);
        }
        await this.repository.eliminarDetallePedido(id);
    }
}