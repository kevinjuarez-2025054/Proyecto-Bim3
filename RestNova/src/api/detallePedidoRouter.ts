import { IncomingMessage, ServerResponse } from "http";
import { DetallePedidoController } from "../controller/detallePedido";

export async function detallePedidoRouter(
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> {

    const url = req.url || "";
    const metodo = req.method || "";

    if (metodo === "GET" && url === "/detalle-pedidos") {
        await DetallePedidoController.obtenerDetallesPedido(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/detalle-pedidos") {
        await DetallePedidoController.crearDetallePedido(req, res);
        return true;
    }

    const match = url.match(/^\/detalle-pedidos\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await DetallePedidoController.obtenerDetallePedidoPorId(req, res, id);
            return true;
        }

        if (metodo === "PUT") {
            await DetallePedidoController.actualizarDetallePedido(req, res, id);
            return true;
        }

        if (metodo === "DELETE") {
            await DetallePedidoController.eliminarDetallePedido(req, res, id);
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
