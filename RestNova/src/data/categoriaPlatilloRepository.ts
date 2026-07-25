import connection from "../config/db";
import { CategoriaPlatilloModel } from "../models/categoriaPlatillo";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class CategoriaPlatilloRepository {
    async obtenerCategoriasPlatillo(): Promise<CategoriaPlatilloModel[]> {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM categoria_platillo");
        return rows as CategoriaPlatilloModel[];
    }

    async obtenerCategoriaPlatilloPorId(id: number): Promise<CategoriaPlatilloModel | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM categoria_platillo WHERE id_categoria = ?", [id]
        );
        return rows[0] as CategoriaPlatilloModel | undefined;
    }

    async crearCategoriaPlatillo(categoriaPlatillo: CategoriaPlatilloModel): Promise<CategoriaPlatilloModel> {
        await connection.query<ResultSetHeader>(
            "INSERT INTO categoria_platillo (nombre_categoria) VALUES (?)",
            [categoriaPlatillo.nombre_categoria]
        );
        return categoriaPlatillo;
    }

    async actualizarCategoriaPlatillo(id: number, categoriaPlatillo: CategoriaPlatilloModel): Promise<CategoriaPlatilloModel | undefined> {
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE categoria_platillo SET nombre_categoria = ? WHERE id_categoria = ?",
            [categoriaPlatillo.nombre_categoria, id]
        );
        return result.affectedRows > 0 ? categoriaPlatillo : undefined;
    }

    async eliminarCategoriaPlatillo(id: number): Promise<boolean> {
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM categoria_platillo WHERE id_categoria = ?", [id]
        );
        return result.affectedRows > 0;
    }
}