import { IncomingMessage, ServerResponse } from "node:http";
import { PlatilloService } from "../service/platilloService";
import { Platillo } from "../models/platillo";

const service = new PlatilloService();

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

export class PlatilloController {

    static async obtenerPlatillos(req: IncomingMessage, res: ServerResponse) {
        try {
            const platillos = await service.obtenerPlatillos();
            res.writeHead(200);
            res.end(JSON.stringify(platillos));
        } catch (error: any) {
            res.writeHead(500);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async obtenerPlatilloPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const platillo = await service.obtenerPlatilloPorId(id);
            if (!platillo) {
                res.writeHead(404);
                return res.end(JSON.stringify({mensaje: "Platillo no encontrado"}));
            }
            res.writeHead(200);
            res.end(JSON.stringify(platillo));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async crearPlatillo(req: IncomingMessage, res: ServerResponse) {
        try {
            const platillo: Platillo = await leerBody(req);
            await service.crearPlatillo(platillo);
            res.writeHead(201);
            res.end(JSON.stringify({mensaje: "Platillo creado correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async actualizarPlatillo(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const platillo: Platillo = await leerBody(req);
            await service.actualizarPlatillo(id, platillo);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje: "Platillo actualizado correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async eliminarPlatillo(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminarPlatillo(id);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje: "Platillo eliminado correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

}