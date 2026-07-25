import connection from "../config/db";
import { Pedido } from "../models/pedido";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class PedidoReppository {
    async obtenerPedido() : Promise<Pedido[]>{
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM pedido");
        return rows as Pedido[];
    }

    async obtenerPedidosPorId(id: number): Promise<Pedido | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM pedido WHERE id_pedido = ?", [id]
        );
        return rows[0] as Pedido | undefined;
    }

    async crearPedido(pedido: Pedido): Promise<Pedido> {
        await connection.query<ResultSetHeader>(
            "INSERT INTO pedido (id_cliente,fecha,estado_pedido,id_cliente,numero_mesa,id_platillo) VALUES (?,?,?,?,?,?)",
            [pedido.id_cliente, pedido.fecha, pedido.estado_pedido, pedido.id_cliente, pedido.numero_mesa, pedido.id_platillo]
        );
        return pedido;
    }

    async actualizarPedido(id: number, pedido: Pedido): Promise<Pedido | undefined> {
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE pedido SET id_cliente = ?, fecha = ?, estado_pedido = ?, id_cliente = ?, numero_mesa = ?, id_platillo = ? WHERE id_pedido = ?",
            [pedido.id_cliente, pedido.fecha, pedido.estado_pedido, pedido.id_cliente, pedido.numero_mesa, pedido.id_platillo, id]
        );
        return result.affectedRows > 0 ? pedido : undefined;
    }

    async eliminarPedido(id: number): Promise<boolean> {
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM pedido WHERE id_pedido = ?", [id]
        );
        return result.affectedRows > 0;
    }   
}