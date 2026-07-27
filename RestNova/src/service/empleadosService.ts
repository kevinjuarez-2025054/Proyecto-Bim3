import { Empleado } from "../models/empleados";
import { EmpleadosRepository } from "../data/empleadosRepository";
import { EmpleadoValidation } from "../validation/empleadosValidation";

export class EmpleadoService {
    private repository = new EmpleadosRepository();

    async obtenerEmpleados(): Promise<Empleado[]>{
        return await this.repository.obtenerEmpleados();
    }

    async obtenerEmpleadoPorId(id: number) : Promise<Empleado | undefined>{
        EmpleadoValidation.validatePorId(id);
        return await this.repository.obtenerEmpleadoPorId(id);
    }

    async crearEmpleado(empleado: Empleado): Promise<void>{
        EmpleadoValidation.validate(empleado);
        await this.repository.crearEmpleado(empleado);
    }

    async actualizarEmpleado(id: number, empleado: Empleado): Promise<void>{
        EmpleadoValidation.validatePorId(id);
        EmpleadoValidation.validate(empleado);
        const existingEmpleado = await this.repository.obtenerEmpleadoPorId(id);
        if(!existingEmpleado){
            throw new Error(`Empleado con id ${id} no fue encontrado`);
        }
        await this.repository.actualizarEmpleado(id, empleado);
    }

    async eliminarEmpleado(id: number): Promise<void>{
        EmpleadoValidation.validatePorId(id);
        const existingEmpleado = await this.repository.obtenerEmpleadoPorId(id);
        if(!existingEmpleado){
            throw new Error(`Empleado con id ${id} no fue encontrado`);
        }
        await this.repository.eliminarEmpleado(id);
    }
}