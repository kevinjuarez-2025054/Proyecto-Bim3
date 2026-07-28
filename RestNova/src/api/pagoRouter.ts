import { IncomingMessage, ServerResponse } from "http";
import { PagoController } from "../controller/pagoController";

export async function pagoRouter(
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> {

    const url = req.url || "";
    const metodo = req.method || "";

    if (metodo === "GET" && url === "/pagos") {
        await PagoController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/pagos") {
        await PagoController.crear(req, res);
        return true;
    }

    const match = url.match(/^\/pagos\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await PagoController.obtenerPorId(req, res, id);
            return true;
        }

        if (metodo === "PUT") {
            await PagoController.actualizar(req, res, id);
            return true;
        }

        if (metodo === "DELETE") {
            await PagoController.eliminar(req, res, id);
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
