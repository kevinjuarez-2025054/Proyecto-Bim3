import { IncomingMessage, ServerResponse } from "http";
import { PlatilloController } from "../controller/platilloController";

export async function platilloRouter(
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> {

    const url = req.url || "";
    const metodo = req.method || "";

    if (metodo === "GET" && url === "/platillos") {
        await PlatilloController.obtenerPlatillos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/platillos") {
        await PlatilloController.crearPlatillo(req, res);
        return true;
    }

    const match = url.match(/^\/platillos\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await PlatilloController.obtenerPlatilloPorId(req, res, id);
            return true;
        }

        if (metodo === "PUT") {
            await PlatilloController.actualizarPlatillo(req, res, id);
            return true;
        }

        if (metodo === "DELETE") {
            await PlatilloController.eliminarPlatillo(req, res, id);
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
