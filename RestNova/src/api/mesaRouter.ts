import { IncomingMessage, ServerResponse } from "http";
import { MesaController } from "../controller/mesaController";

export async function mesaRouter(
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> {

    const url = req.url || "";
    const metodo = req.method || "";

    if (metodo === "GET" && url === "/mesas") {
        await MesaController.obtenerMesas(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/mesas") {
        await MesaController.crearMesa(req, res);
        return true;
    }

    const match = url.match(/^\/mesas\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await MesaController.obtenerMesaPorId(req, res, id);
            return true;
        }

        if (metodo === "PUT") {
            await MesaController.actualizarMesa(req, res, id);
            return true;
        }

        if (metodo === "DELETE") {
            await MesaController.eliminarMesa(req, res, id);
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
