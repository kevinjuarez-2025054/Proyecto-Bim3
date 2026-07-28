import { IncomingMessage, ServerResponse } from "node:http";
import { Empleado } from "../models/empleados";
import { EmpleadoService } from "../service/empleadosService";

const service = new EmpleadoService();

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

export class EmpleadoController{

    static async obtenerEmpleados(req: IncomingMessage, res: ServerResponse){
        const empleado = await service.obtenerEmpleados();
        res.writeHead(200);
        res.end(JSON.stringify(empleado));
    }

    static async obtenerEmpleadoPorId(req: IncomingMessage, res: ServerResponse, id: number){
        const empleado = await service.obtenerEmpleadoPorId(id);
        if(!empleado){
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje : "empleado no encontrado "}));
        }
        res.writeHead(200);
        res.end(JSON.stringify(empleado));
    }

    static async crearEmpleado(req: IncomingMessage, res: ServerResponse){
        try {
            const empleado : Empleado = await leerBody(req);
            await service.crearEmpleado(empleado);
            res.writeHead(201);
            res.end(JSON.stringify({ mensaje: "se agrego empleado correctamente" }));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje : error.menssage }));
        }
    }

    static async actualizarEmpleado(req: IncomingMessage, res: ServerResponse, id: number){
        try {
            const empleado : Empleado = await leerBody(req);
            await service.actualizarEmpleado(id,empleado);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje : "empleado actualizado correctamente" }));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje : error.menssage }));
        }
    }

    static async eliminarEmpleado(req: IncomingMessage, res: ServerResponse, id: number){
        try {
            await service.eliminarEmpleado(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje : "empleado eliminado correctamenete"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({ mensaje : error.menssage }));
        }
    }
}