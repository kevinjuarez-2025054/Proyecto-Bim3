import connection from "../config/db";
import { DetallePedido } from "../models/detallePedido";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class DetallePedidoRepository {
    async obtenerDetallesPedido(): Promise<DetallePedido[]> {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM detalle_pedido");
        return rows as DetallePedido[];
    }

    async obtenerDetallePedidoPorId(id: number): Promise<DetallePedido | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM detalle_pedido WHERE id_detalle_pedido = ?", [id]
        );
        return rows[0] as DetallePedido | undefined;
    }

    async crearDetallePedido(detallePedido: DetallePedido): Promise<DetallePedido> {
        await connection.query<ResultSetHeader>(
            "INSERT INTO detalle_pedido (id_platillo, cantidad, subtotal, numero_pedido, id_empleado) VALUES (?,?,?,?,?)",
            [detallePedido.id_platillo, detallePedido.cantidad, detallePedido.subtotal, detallePedido.numero_pedido, detallePedido.id_empleado]
        );
        return detallePedido;
    }

    async actualizarDetallePedido(id: number, detallePedido: DetallePedido): Promise<DetallePedido | undefined> {
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE detalle_pedido SET id_platillo = ?, cantidad = ?, subtotal = ?, numero_pedido = ?, id_empleado = ? WHERE id_detalle_pedido = ?",
            [detallePedido.id_platillo, detallePedido.cantidad, detallePedido.subtotal, detallePedido.numero_pedido, detallePedido.id_empleado, id]
        );
        return result.affectedRows > 0 ? detallePedido : undefined;
    }

    async eliminarDetallePedido(id: number): Promise<boolean> {
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM detalle_pedido WHERE id_detalle_pedido = ?", [id]
        );
        return result.affectedRows > 0;
    }
}