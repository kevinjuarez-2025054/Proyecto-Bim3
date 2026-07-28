import { IncomingMessage, ServerResponse } from "http";
import { PedidoController } from "../controller/pedidoController";

export async function pedidoRouter(
    req: IncomingMessage,
    res: ServerResponse
): Promise<boolean> {

    const url = req.url || "";
    const metodo = req.method || "";

    if (metodo === "GET" && url === "/pedidos") {
        await PedidoController.obtenerPedidos(req, res);
        return true;
    }

    if (metodo === "POST" && url === "/pedidos") {
        await PedidoController.crearPedido(req, res);
        return true;
    }

    const match = url.match(/^\/pedidos\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);

        if (metodo === "GET") {
            await PedidoController.obtenerPedidoPorId(req, res, id);
            return true;
        }

        if (metodo === "PUT") {
            await PedidoController.actualizarPedido(req, res, id);
            return true;
        }

        if (metodo === "DELETE") {
            await PedidoController.eliminarPedido(req, res, id);
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
