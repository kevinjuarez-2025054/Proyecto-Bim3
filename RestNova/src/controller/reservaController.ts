import { IncomingMessage, ServerResponse } from "node:http";
import { Reserva } from "../models/reserva";
import { ReservaService } from "../service/reservaService";

const service = new ReservaService();

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

export class ReservaController{

    static async obtenerReservas(req: IncomingMessage, res: ServerResponse){
        const reserva = await service.obtenerReservas();
        res.writeHead(200);
        res.end(JSON.stringify(reserva));
    }

    static async obtenerReservasPorId(req: IncomingMessage, res: ServerResponse, id: number){
        const reserva = await service.obtenerReservaPorId(id);
        if(!reserva){
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: "reserva no encontrada "}));
        }
        res.writeHead(200);
        res.end(JSON.stringify(reserva));
    }

    static async crearReserva(req: IncomingMessage, res: ServerResponse){
        try {
            const reserva : Reserva = await leerBody(req);
            await service.crearReserva(reserva);
            res.writeHead(201);
            res.end(JSON.stringify({ mensaje : "reserva creada correctamente" }));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje : error.menssage}));
        }
    }

    static async actualizarReserva(req: IncomingMessage, res: ServerResponse, id: number){
        try {
            const reserva : Reserva = await leerBody(req);
            await service.actualizarReserva(id,reserva);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje : "reserva actualizada correctamente" }));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje : error.menssage}));
        }
    }

    static async eliminarReserva(req: IncomingMessage, res: ServerResponse, id: number){
        try {
            await service.eliminarReserva(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje : "reserva eliminada correctamente" }));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje : error.menssage}));
        }
    }
}