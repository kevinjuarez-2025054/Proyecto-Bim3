import { IncomingMessage, ServerResponse } from "http";
import { FacturaController } from "../controller/facturaController";

export async function facturaRouter(
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> {

    const url = req.url || "";
    const metodo = req.method || "";

    if (metodo === "GET" && url === "/facturas") {
        await FacturaController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/facturas") {
        await FacturaController.crear(req, res);
        return true;
    }

    const match = url.match(/^\/facturas\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await FacturaController.obtenerPorId(req, res, id);
            return true;
        }

        if (metodo === "PUT") {
            await FacturaController.actualizar(req, res, id);
            return true;
        }

        if (metodo === "DELETE") {
            await FacturaController.eliminar(req, res, id);
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
