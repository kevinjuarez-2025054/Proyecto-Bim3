import { IncomingMessage, ServerResponse } from "node:http";
import { PagoService } from "../service/pagoService";
import { Pago } from "../models/pago";

const service = new PagoService();

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

export class PagoController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const pagos = await service.obtenerPagos();
            res.writeHead(200);
            res.end(JSON.stringify(pagos));
        } catch (error: any) {
            res.writeHead(500);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const pago = await service.obtenerPagoPorId(id);
            if (!pago) {
                res.writeHead(404);
                return res.end(JSON.stringify({mensaje: "Pago no encontrado"}));
            }
            res.writeHead(200);
            res.end(JSON.stringify(pago));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse) {
        try {
            const pago: Pago = await leerBody(req);
            await service.crearPago(pago);
            res.writeHead(201);
            res.end(JSON.stringify({mensaje: "Pago creado correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const pago: Pago = await leerBody(req);
            await service.actualizarPago(id, pago);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje: "Pago actualizado correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminarPago(id);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje: "Pago eliminado correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

}