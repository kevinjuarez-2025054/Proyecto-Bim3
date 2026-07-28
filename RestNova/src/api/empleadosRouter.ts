import { IncomingMessage, ServerResponse } from "http";
import { EmpleadoController } from "../controller/empleadosController";

export async function empleadosRouter(
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> {

    const url = req.url || "";
    const metodo = req.method || "";

    if (metodo === "GET" && url === "/empleados") {
        await EmpleadoController.obtenerEmpleados(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/empleados") {
        await EmpleadoController.crearEmpleado(req, res);
        return true;
    }

    const match = url.match(/^\/empleados\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await EmpleadoController.obtenerEmpleadoPorId(req, res, id);
            return true;
        }

        if (metodo === "PUT") {
            await EmpleadoController.actualizarEmpleado(req, res, id);
            return true;
        }

        if (metodo === "DELETE") {
            await EmpleadoController.eliminarEmpleado(req, res, id);
            return true;
        }

        res.writeHead(405);
        res.end(JSON.stringify({
            mensaje: "Método no permitido"
        }));
        return true;
    }

    return false;
}
