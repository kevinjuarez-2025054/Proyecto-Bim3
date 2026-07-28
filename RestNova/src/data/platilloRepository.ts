import connection from "../config/db";
import { Platillo } from "../models/platillo";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class PlatilloRepository {
    async obtenerPlatillos(): Promise<Platillo[]> {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM platillo");
        return rows as Platillo[];
    }

    async obtenerPlatilloPorId(id: number): Promise<Platillo | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM platillo WHERE id_platillo = ?", [id]
        );
        return rows[0] as Platillo | undefined;
    }

    async crearPlatillo(platillo: Platillo): Promise<Platillo> {
        await connection.query<ResultSetHeader>(
            "INSERT INTO platillo (nombre_platillo, descripcion, precio,id_categoria) VALUES (?,?,?,?)",
            [platillo.nombre_platillo, platillo.descripcion, platillo.precio, platillo.id_categoria]
        );
        return platillo;
    }

    async actualizarPlatillo(id: number, platillo: Platillo): Promise<Platillo | undefined> {
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE platillo SET nombre_platillo = ?, descripcion = ?, precio = ?, id_categoria = ? WHERE id_platillo = ?",
            [platillo.nombre_platillo, platillo.descripcion, platillo.precio, platillo.id_categoria, id]
        );
        return result.affectedRows > 0 ? platillo : undefined;
    }

    async eliminarPlatillo(id: number): Promise<boolean> {
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM platillo WHERE id_platillo = ?", [id]
        );
        return result.affectedRows > 0;
    }
}