import { IncomingMessage, ServerResponse } from "http";
import { ReservaController } from "../controller/reservaController";

export async function reservaRouter(
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> {

    const url = req.url || "";
    const metodo = req.method || "";

    if (metodo === "GET" && url === "/reservas") {
        await ReservaController.obtenerReservas(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/reservas") {
        await ReservaController.crearReserva(req, res);
        return true;
    }

    const match = url.match(/^\/reservas\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await ReservaController.obtenerReservasPorId(req, res, id);
            return true;
        }

        if (metodo === "PUT") {
            await ReservaController.actualizarReserva(req, res, id);
            return true;
        }

        if (metodo === "DELETE") {
            await ReservaController.eliminarReserva(req, res, id);
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
