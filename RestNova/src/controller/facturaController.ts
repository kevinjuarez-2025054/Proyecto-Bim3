import { IncomingMessage, ServerResponse } from "node:http";
import { FacturaService } from "../service/facturaService";
import { Factura } from "../models/factura";

const service = new FacturaService();

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

export class FacturaController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const facturas = await service.obtenerFacturas();
            res.writeHead(200);
            res.end(JSON.stringify(facturas));
        } catch (error: any) {
            res.writeHead(500);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const factura = await service.obtenerFacturaPorId(id);
            if (!factura) {
                res.writeHead(404);
                return res.end(JSON.stringify({mensaje: "Factura no encontrada"}));
            }
            res.writeHead(200);
            res.end(JSON.stringify(factura));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse) {
        try {
            const factura: Factura = await leerBody(req);
            await service.crearFactura(factura);
            res.writeHead(201);
            res.end(JSON.stringify({mensaje: "Factura creada correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const factura: Factura = await leerBody(req);
            await service.actualizarFactura(id, factura);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje: "Factura actualizada correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminarFactura(id);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje: "Factura eliminada correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

} 