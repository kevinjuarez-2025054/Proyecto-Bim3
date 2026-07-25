import connection from "../config/db";
import { Empleado } from "../models/empleados";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class EmpleadosRepository {
    async obtenerEmpleados(): Promise<Empleado[]> {
        const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM empleados");
        return rows as Empleado[];
    }

    async obtenerEmpleadoPorId(id: number): Promise<Empleado | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT * FROM empleados WHERE id_empleado = ?", [id]
        );
        return rows[0] as Empleado | undefined;
    }

    async crearEmpleado(empleado: Empleado): Promise<Empleado> {
        await connection.query<ResultSetHeader>(
            "INSERT INTO empleados (nombre_empleado, apellido_empleado, cargo, telefono, email) VALUES (?,?,?,?,?)",
            [empleado.nombre_empleado, empleado.apellido_empleado, empleado.cargo, empleado.telefono, empleado.email]
        );
        return empleado;
    }

    async actualizarEmpleado(id: number, empleado: Empleado): Promise<Empleado | undefined> {
        const [result] = await connection.query<ResultSetHeader>(
            "UPDATE empleados SET nombre_empleado = ?, apellido_empleado = ?, cargo = ?, telefono = ?, email = ? WHERE id_empleado = ?",
            [empleado.nombre_empleado, empleado.apellido_empleado, empleado.cargo, empleado.telefono, empleado.email, id]
        );
        return result.affectedRows > 0 ? empleado : undefined;
    }

    async eliminarEmpleado(id: number): Promise<boolean> {
        const [result] = await connection.query<ResultSetHeader>(
            "DELETE FROM empleados WHERE id_empleado = ?", [id]
        );
        return result.affectedRows > 0;
    }
}