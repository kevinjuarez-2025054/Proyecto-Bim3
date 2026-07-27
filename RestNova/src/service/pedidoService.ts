import { Pedido } from "../models/pedido";
import { PedidoReppository } from "../data/pedidoRepository";
import { PedidoValidation } from "../validation/pedidoValidation";

export class PedidoService{
    private repository = new PedidoReppository();

    async obtenerPedidos(): Promise<Pedido[]>{
        return await this.repository.obtenerPedido();
    }

    async obtenerPedidoPorId(id: number): Promise<Pedido | undefined>{
        PedidoValidation.validatePorId(id);
        return await this.repository.obtenerPedidosPorId(id);
    }

    async crearPedido(pedido: Pedido): Promise<void>{
        PedidoValidation.validate(pedido);
        await this.repository.crearPedido(pedido);
    }

    async actualizarPedido(id: number, pedido: Pedido): Promise<void>{
        PedidoValidation.validatePorId(id);
        PedidoValidation.validate(pedido);
        const existentePedido = await this.repository.obtenerPedidosPorId(id);
        if(!existentePedido){
            throw new Error(`Pedido con id ${id} no fue encontrado`);
        }
        await this.repository.actualizarPedido(id, pedido);
    }

    async eliminarPedido(id: number): Promise<void>{
        PedidoValidation.validatePorId(id);
        const existentePedido = await this.repository.obtenerPedidosPorId(id);
        if(!existentePedido){
            throw new Error(`Pedido con id ${id} no fue encontrado`);
        }
        await this.repository.eliminarPedido(id);
    }
}