import { Cliente } from "../models/clientes";
import { ClientesRepository } from "../data/clientesRepository";
import { ClienteValidation } from "../validation/clienteValidation";

export class ClienteService {

    private repository = new ClientesRepository();

    async obtenerClientes(): Promise<Cliente[]> {
        return await this.repository.obtenerClientes();
    }

    async obtenerClientesPorId(id: number): Promise<Cliente | undefined>{
        ClienteValidation.validatePorId(id);
        return await this.repository.obtenerClientePorId(id);
    }

    async crearCliente(cliente: Cliente): Promise<void> {
        ClienteValidation.validate(cliente);
        await this.repository.crearCliente(cliente);
    }

    async actualizarCliente(id: number, cliente: Cliente): Promise<void> {
        ClienteValidation.validatePorId(id);
        ClienteValidation.validate(cliente);
        const existingCliente = await this.repository.obtenerClientePorId(id);
        if (!existingCliente) {
            throw new Error(`Cliente con id ${id} no fue encontrado`);
        }
        await this.repository.actualizarCliente(id, cliente);
    }

    async eliminarCliente(id: number): Promise<void> {
        ClienteValidation.validatePorId(id);
        const existingCliente = await this.repository.obtenerClientePorId(id);
        if (!existingCliente) {
            throw new Error(`Cliente con id ${id} no fue encontrado`);
        }
        await this.repository.eliminarCliente(id);
    }
}