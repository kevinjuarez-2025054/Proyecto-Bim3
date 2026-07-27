import { Reserva } from "../models/reserva";
import { ReservaRepository } from "../data/reservaRepository";
import { ReservaValidation } from "../validation/reservaValidation";

export class ReservaService {
    private repository = new ReservaRepository();

    async obtenerReservas(): Promise<Reserva[]>{
        return await this.repository.obtenerReservas();
    }

    async obtenerReservaPorId(id: number): Promise<Reserva | undefined>{
        ReservaValidation.validatePorId(id);
        return await this.repository.obtenerReservaPorId(id);
    }

    async crearReserva(reserva: Reserva): Promise<void>{
        ReservaValidation.validate(reserva);
        await this.repository.crearReserva(reserva);
    }

    async actualizarReserva(id: number, reserva: Reserva): Promise<void>{
        ReservaValidation.validatePorId(id);
        ReservaValidation.validate(reserva);
        const existingReserva = await this.repository.obtenerReservaPorId(id);
        if(!existingReserva){
            throw new Error(`Reserva con id ${id} no fue encontrada`);
        }
        await this.repository.actualizarReserva(id, reserva);
    }

    async eliminarReserva(id: number): Promise<void>{
        ReservaValidation.validatePorId(id);
        const existingReserva = await this.repository.obtenerReservaPorId(id);
        if(!existingReserva){
            throw new Error(`Reserva con id ${id} no fue encontrada`);
        }
        await this.repository.eliminarReserva(id);
    }
}