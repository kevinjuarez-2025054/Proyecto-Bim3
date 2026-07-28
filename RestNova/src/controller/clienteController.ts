import { IncomingMessage, ServerResponse } from "node:http";
import { ClienteService } from "../service/clienteService";
import { Cliente } from "../models/clientes";

const service = new ClienteService();

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

export class ClienteController {

    static async obtenerClientes(req: IncomingMessage, res: ServerResponse) {
        const clientes = await service.obtenerClientes();
        res.writeHead(200);
        res.end(JSON.stringify(clientes));
    }

    static async obtenerClientesPorId(req: IncomingMessage, res: ServerResponse, id: number){
        const cliente = await service.obtenerClientesPorId(id);
        if(!cliente){
            res.writeHead(404);
            return res.end(JSON.stringify({ mensaje: "Cliente no encontrado"}))
        }
    }

    static async crearCliente(req: IncomingMessage,  res: ServerResponse){
        try {
            const cliente : Cliente = await leerBody(req);
            await service.crearCliente(cliente);
            res.writeHead(201);
            res.end(JSON.stringify({mensaje: "cliente agregado correctamente"}));
        } catch (error : any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje : error.message}));
        }
    }

    static async actualizarCliente(req: IncomingMessage, res: ServerResponse, id: number){
        try {
            const cliente : Cliente = await leerBody(req);
            await service.actualizarCliente(id,cliente);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "cliente actualizado correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje : error.menssage}));
        }
    }

    static async eliminarCliente(req: IncomingMessage, res: ServerResponse, id: number){
        try {
            await service.eliminarCliente(id);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje : "cliente eliminado exitosamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje : error.menssage }));
        }
    }
}