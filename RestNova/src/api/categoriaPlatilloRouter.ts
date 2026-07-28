import { IncomingMessage, ServerResponse } from "http";
import { CategoriaPlatilloController } from "../controller/categoriaPlatillo";

export async function categoriaPlatilloRouter(
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> {

    const url = req.url || "";
    const metodo = req.method || "";

    if (metodo === "GET" && url === "/categoria-platillos") {
        await CategoriaPlatilloController.obtenerTodos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/categoria-platillos") {
        await CategoriaPlatilloController.crear(req, res);
        return true;
    }

    const match = url.match(/^\/categoria-platillos\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await CategoriaPlatilloController.obtenerPorId(req, res, id);
            return true;
        }

        if (metodo === "PUT") {
            await CategoriaPlatilloController.actualizar(req, res, id);
            return true;
        }

        if (metodo === "DELETE") {
            await CategoriaPlatilloController.eliminar(req, res, id);
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
