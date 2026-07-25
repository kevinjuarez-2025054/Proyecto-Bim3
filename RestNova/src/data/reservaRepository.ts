import connection from "../config/db";
import { Reserva } from "../models/reserva";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class ReservaRepository {
    async obtenerReservas(): Promise<Reserva[]>{
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM reserva");
        return rows as Reserva[];
    }

    async obtenerReservaPorId(id: number): Promise<Reserva | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM reserva WHERE id_reserva = ?", [id]
        );
        return rows[0] as Reserva | undefined;
    }

    async crearReserva(reserva:Reserva): Promise<Reserva>{
        await connection.query<ResultSetHeader>(
            "INSERT INTO reserva (fecha_reserva,hora,cantidad_personas,id_cliente,numero_mesa,id_empleado) VALUES (?,?,?,?,?,?)",
            [reserva.fecha_reserva,reserva.hora,reserva.cantidad_personas,reserva.id_cliente,reserva.numero_mesa,reserva.id_empleado]
        );
        return reserva;
    }

    async actualizarReserva(id: number, reserva: Reserva): Promise<Reserva | undefined>{
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE reserva SET fecha_reserva = ?, hora = ?, cantidad_personas = ?, id_cliente = ?, numero_mesa = ?, id_empleado = ? WHERE id_reserva = ?",
            [reserva.fecha_reserva,reserva.hora,reserva.cantidad_personas,reserva.id_cliente,reserva.numero_mesa,reserva.id_empleado,id]
        );
        return result.affectedRows > 0 ? reserva: undefined;
    }

    async eliminarReserva(id: number): Promise<boolean>{
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM reserva WHERE id_reserva = ?",
            [id]
        );
        return result.affectedRows > 0;
    }
}