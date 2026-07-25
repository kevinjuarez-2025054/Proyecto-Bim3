import connection from "../config/db";
import { Mesa } from "../models/mesas";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class MesaRepository {

    async obtenerMesas(): Promise<Mesa []>{
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM Mesa");
        return rows as Mesa[];
    }

    async obtenerMesaPorId(id: number): Promise<Mesa | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM Mesa WHERE numero_mesa = ?", [id]
        );
        return rows[0] as Mesa | undefined;
    }

    async crearMesa(mesa: Mesa): Promise<Mesa>{
        await connection.query<ResultSetHeader>(
            "INSERT INTO Mesa (capasidad,estado) VALUES (?,?)",
            [mesa.capacidad,mesa.estado]
        );
        return mesa;
    }

    async actualizarMesa(id: number, mesa: Mesa): Promise<Mesa | undefined>{
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE Mesa SET capacidad = ?,estado = ? WHERE numero_mesa = ?",
            [mesa.capacidad,mesa.estado,id]
        );
        return result.affectedRows > 0 ? mesa: undefined;
    }

    async eliminarMesa(id:number): Promise<boolean>{
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM Mesa WHERE numero_mesa = ?",
            [id]
        );
        return result.affectedRows > 0;
    }
}