import  connection  from "../config/db";
import { Cliente } from "../models/clientes";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class ClientesRepository {

    async obtenerClientes(): Promise<Cliente[]>{
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM clientes");
        return rows as Cliente[];
    }

    async obtenerClientePorId(id: number): Promise<Cliente | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM clientes WHERE id_cliente = ?", [id]
        );
        return rows[0] as Cliente | undefined;
    }

    async crearCliente(cliente: Cliente): Promise<Cliente> {
        await connection.query<ResultSetHeader>(
            "INSERT INTO clientes (nombre,apellido,telefono,email) VALUES (?,?,?,?)",
            [cliente.nombre, cliente.apellido, cliente.telefono, cliente.email]
        );
        return cliente;
    }

    async actualizarCliente(id: number, cliente: Cliente): Promise<Cliente | undefined> {
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE clientes SET nombre = ?, apellido = ?, telefono = ?, email = ? WHERE id_cliente = ?",
            [cliente.nombre, cliente.apellido, cliente.telefono, cliente.email, id]
        );
        return result.affectedRows > 0 ? cliente : undefined;
    }

    async eliminarCliente(id: number): Promise<boolean>{
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM clientes WHERE id_cliente = ?", [id]
        );
        return result.affectedRows > 0;
    }

}