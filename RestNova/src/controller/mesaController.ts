import { IncomingMessage, ServerResponse } from "node:http";
import { Mesa } from "../models/mesas";
import { MesaService } from "../service/mesaService";

const service = new MesaService();

async function leerBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on("data", chunk => body += chunk);
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("JSON inválido"));
            }
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
}

export class MesaController{

    static async obtenerMesas(req: IncomingMessage, res: ServerResponse){
        const mesa = await service.obtenerMesas;
        res.writeHead(200);
        res.end(JSON.stringify(mesa))
    }

    static async obtenerMesaPorId(req: IncomingMessage, res: ServerResponse, id: number){
        const mesa = await service.obtenerMesaPorId(id);
        if(!mesa){
            res.writeHead(404);
            res.end(JSON.stringify({mensaje : "Mesa no encontrada"}));
        }
        res.writeHead(200);
        res.end(JSON.stringify(mesa));
    }

    static async crearMesa(req: IncomingMessage, res: ServerResponse){
        try {
            const mesa : Mesa = await leerBody(req);
            await service.crearMesa(mesa);
            res.writeHead(201);
            res.end(JSON.stringify({mensaje : "mesa agregada correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje : error.menssage}));
        }
    }

    static async actualizarMesa(req: IncomingMessage, res: ServerResponse,id: number){
        try {
            const mesa : Mesa = await leerBody(req);
            await service.actualizarMesa(id,mesa);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje : "mesa actualizada correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje : error.menssage}));
        }
    }

    static async eliminarMesa(req: IncomingMessage, res: ServerResponse,id: number){
        try {
            await service.eliminarMesa(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje : "mesa eliminada correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje : error.message }));
        }
    }
}