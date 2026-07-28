import { IncomingMessage, ServerResponse } from "http";
import { ClienteController } from "../controller/clienteController";

export async function clienteRouter(
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> {

    const url = req.url || "";
    const metodo = req.method || "";

    if (metodo === "GET" && url === "/clientes") {
        await ClienteController.obtenerClientes(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/clientes") {
        await ClienteController.crearCliente(req, res);
        return true;
    }

    const match = url.match(/^\/clientes\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await ClienteController.obtenerClientesPorId(req, res, id);
            return true;
        }

        if (metodo === "PUT") {
            await ClienteController.actualizarCliente(req, res, id);
            return true;
        }

        if (metodo === "DELETE") {
            await ClienteController.eliminarCliente(req, res, id);
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
