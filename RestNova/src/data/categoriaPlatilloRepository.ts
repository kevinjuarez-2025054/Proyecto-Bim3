import connection from "../config/db";
import { CategoriaPlatilloModel } from "../models/categoriaPlatillo";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class CategoriaPlatilloRepository {
    async obtenerCategoriasPlatillo(): Promise<CategoriaPlatilloModel[]> {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM CategoriaPlatillo");
        return rows as CategoriaPlatilloModel[];
    }

    async obtenerCategoriaPlatilloPorId(id: number): Promise<CategoriaPlatilloModel | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM CategoriaPlatillo WHERE id_categoria = ?", [id]
        );
        return rows[0] as CategoriaPlatilloModel | undefined;
    }

    async crearCategoriaPlatillo(categoriaPlatillo: CategoriaPlatilloModel): Promise<CategoriaPlatilloModel> {
        await connection.query<ResultSetHeader>(
            "INSERT INTO CategoriaPlatillo (categoria_platillo) VALUES (?)",
            [categoriaPlatillo.categoria_platillo]
        );
        return categoriaPlatillo;
    }

    async actualizarCategoriaPlatillo(id: number, categoriaPlatillo: CategoriaPlatilloModel): Promise<CategoriaPlatilloModel | undefined> {
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE CategoriaPlatillo SET categoria_platillo = ? WHERE id_categoria = ?",
            [categoriaPlatillo.categoria_platillo, id]
        );
        return result.affectedRows > 0 ? categoriaPlatillo : undefined;
    }

    async eliminarCategoriaPlatillo(id: number): Promise<boolean> {
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM CategoriaPlatillo WHERE id_categoria = ?", [id]
        );
        return result.affectedRows > 0;
    }
}