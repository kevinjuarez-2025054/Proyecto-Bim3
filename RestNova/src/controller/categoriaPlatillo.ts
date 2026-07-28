import { IncomingMessage, ServerResponse } from "node:http";
import { CategoriaPlatilloService } from "../service/categoriaPlatilloService";
import { CategoriaPlatilloModel } from "../models/categoriaPlatillo";

const service = new CategoriaPlatilloService();

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

export class CategoriaPlatilloController {

    static async obtenerTodos(req: IncomingMessage, res: ServerResponse) {
        try {
            const categorias = await service.obtenerCategoriasPlatillo();
            res.writeHead(200);
            res.end(JSON.stringify(categorias));
        } catch (error: any) {
            res.writeHead(500);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async obtenerPorId(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const categoria = await service.obtenerCategoriaPlatilloPorId(id);
            if (!categoria) {
                res.writeHead(404);
                return res.end(JSON.stringify({ mensaje: "Categoría no encontrada"}));
            }
            res.writeHead(200);
            res.end(JSON.stringify(categoria));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async crear(req: IncomingMessage, res: ServerResponse) {
        try {
            const categoria: CategoriaPlatilloModel = await leerBody(req);
            await service.crearCategoriaPlatillo(categoria);
            res.writeHead(201);
            res.end(JSON.stringify({mensaje: "Categoría creada correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async actualizar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            const categoria: CategoriaPlatilloModel = await leerBody(req);
            await service.actualizarCategoriaPlatillo(id, categoria);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje: "Categoría actualizada correctamente"}));

        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

    static async eliminar(req: IncomingMessage, res: ServerResponse, id: number) {
        try {
            await service.eliminarCategoriaPlatillo(id);
            res.writeHead(200);
            res.end(JSON.stringify({mensaje: "Categoría eliminada correctamente"}));
        } catch (error: any) {
            res.writeHead(400);
            res.end(JSON.stringify({mensaje: error.message}));
        }
    }

}