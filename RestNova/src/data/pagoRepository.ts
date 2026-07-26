import connection from "../config/db";
import { Pago } from "../models/pago";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class PagoRepository {
    async obtenerPagos(): Promise<Pago[]> {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM pago");
        return rows as Pago[];
    }

    async obtenerPagoPorId(id: number): Promise<Pago | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM pago WHERE id_pago = ?", [id]
        );
        return rows[0] as Pago | undefined;
    }

    async crearPago(pago: Pago): Promise<Pago> {
        await connection.query<ResultSetHeader>(
            "INSERT INTO pago (metodo_pago, monto, fecha_pago, numero_factura, id_cliente) VALUES (?,?,?,?,?)",
            [pago.metodo_pago, pago.monto, pago.fecha_pago, pago.numero_factura, pago.id_cliente]
        );
        return pago;
    }

    async actualizarPago(id: number, pago: Pago): Promise<Pago | undefined> {
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE pago SET metodo_pago = ?, monto = ?, fecha_pago = ?, numero_factura = ?, id_cliente = ? WHERE id_pago = ?",
            [pago.metodo_pago, pago.monto, pago.fecha_pago, pago.numero_factura, pago.id_cliente, id]
        );
        return result.affectedRows > 0 ? pago : undefined;
    }

    async eliminarPago(id: number): Promise<boolean> {
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM pago WHERE id_pago = ?", [id]
        );
        return result.affectedRows > 0;
    }
}