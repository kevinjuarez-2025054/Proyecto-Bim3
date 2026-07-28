import connection from "../config/db";
import { Factura } from "../models/factura";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class FacturaRepository {
    async obtenerFacturas(): Promise<Factura[]> {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM factura");
        return rows as Factura[];
    }

    async obtenerFacturaPorId(id: number): Promise<Factura | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM factura WHERE numero_factura = ?", [id]
        );
        return rows[0] as Factura | undefined;
    }

    async crearFactura(factura: Factura): Promise<Factura> {
        await connection.query<ResultSetHeader>(
            "INSERT INTO factura (fecha, Subtotal, iva, total, numero_pedido,id_platillo,id_detalle_pedido) VALUES (?,?,?,?,?,?,?)",
            [factura.fecha, factura.subtotal, factura.iva, factura.total, factura.numero_pedido, factura.id_platillo, factura.id_detalle_pedido]
        );
        return factura;
    }

    async actualizarFactura(id: number, factura: Factura): Promise<Factura | undefined> {
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE factura SET fecha = ?, Subtotal = ?, iva = ?, total = ?, numero_pedido = ?, id_platillo = ?, id_detalle_pedido = ? WHERE numero_factura = ?",
            [factura.fecha, factura.subtotal, factura.iva, factura.total, factura.numero_pedido, factura.id_platillo, factura.id_detalle_pedido, id]
        );
        return result.affectedRows > 0 ? factura : undefined;
    }

    async eliminarFactura(id: number): Promise<boolean> {
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM factura WHERE numero_factura = ?", [id]
        );
        return result.affectedRows > 0;
    }

}