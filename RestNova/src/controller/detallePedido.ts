import { IncomingMessage, ServerResponse } from "node:http";
import { DetallePedidoService } from "../service/detallePedidoService";
import { DetallePedido } from "../models/detallePedido";

const service = new DetallePedidoService();

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

export class DetallePedidoController {

    static async obtenerDetallesPedido(req: IncomingMessage, res: ServerResponse) {
        try {
            const detalles = await service.obtenerDetallesPedidos();
            res.writeHead(200);
            res.end(JSON.stringify(detalles));
        } catch (error: any) {
            res.writeHead(500);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async obtenerDetallePedidoPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const detalle = await service.obtenerDetallePedidoPorId(id);
            if (!detalle) {
                res.writeHead(404);
                return res.end(JSON.stringify({mensaje: "Detalle del pedido no encontrado"}));
            }
            res.writeHead(200);
            res.end(JSON.stringify(detalle));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async crearDetallePedido(req: IncomingMessage, res: ServerResponse) {
        try {
            const detalle: DetallePedido = await leerBody(req);
            await service.crearDetallePedido(detalle);
            res.writeHead(201);
            res.end(JSON.stringify({mensaje: "Detalle del pedido creado correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async actualizarDetallePedido(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const detalle: DetallePedido = await leerBody(req);
            await service.actualizarDetallePedido(id, detalle);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje: "Detalle del pedido actualizado correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async eliminarDetallePedido(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.EliminarDetallePedido(id);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje: "Detalle del pedido eliminado correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

}