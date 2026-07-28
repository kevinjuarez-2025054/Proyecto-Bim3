import { IncomingMessage, ServerResponse } from "node:http";
import { PedidoService } from "../service/pedidoService";
import { Pedido } from "../models/pedido";

const service = new PedidoService();

async function leerBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on("data", chunk => body += chunk);
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("JSON inválido"));
            }
        });
        req.on("error", (err) => {
            reject(err);
        });
    });
}

export class PedidoController {

    static async obtenerPedidos(req: IncomingMessage, res: ServerResponse) {
        try {
            const pedidos = await service.obtenerPedidos();
            res.writeHead(200);
            res.end(JSON.stringify(pedidos));
        } catch (error: any) {
            res.writeHead(500);
            res.end(JSON.stringify({ mensaje: error.message }));
        }
    }

    static async obtenerPedidoPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const pedido = await service.obtenerPedidoPorId(id);
            if (!pedido) {
                res.writeHead(404);
                return res.end(JSON.stringify({ mensaje: "Pedido no encontrado" }));
            }
            res.writeHead(200);
            res.end(JSON.stringify(pedido));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje: error.message }));
        }
    }

    static async crearPedido(req: IncomingMessage, res: ServerResponse) {
        try {
            const pedido: Pedido = await leerBody(req);
            await service.crearPedido(pedido);
            res.writeHead(201);
            res.end(JSON.stringify({ mensaje: "Pedido creado correctamente" }));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje: error.message }));
        }
    }

    static async actualizarPedido(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const pedido: Pedido = await leerBody(req);
            await service.actualizarPedido(id, pedido);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Pedido actualizado correctamente" }));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje: error.message }));
        }
    }

    static async eliminarPedido(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminarPedido(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Pedido eliminado correctamente" }));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje: error.message }));
        }
    }

}