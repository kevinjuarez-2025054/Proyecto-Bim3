import http from "node:http";

import { categoriaPlatilloRouter } from "./categoriaPlatilloRouter";
import { clienteRouter } from "./clienteRouter";
import { detallePedidoRouter } from "./detallePedidoRouter";
import { empleadosRouter } from "./empleadosRouter";
import { facturaRouter } from "./facturaRouter";
import { mesaRouter } from "./mesaRouter";
import { pagoRouter } from "./pagoRouter";
import { pedidoRouter } from "./pedidoRouter";
import { platilloRouter } from "./platilloRouter";
import { reservaRouter } from "./reservaRouter";

export function iniciarServidor() {

    const server = http.createServer(async (req, res) => {

        res.setHeader("Content-Type", "application/json");

        try {

            if (await categoriaPlatilloRouter(req, res)) return;
            if (await clienteRouter(req, res)) return;
            if (await detallePedidoRouter(req, res)) return;
            if (await empleadosRouter(req, res)) return;
            if (await facturaRouter(req, res)) return;
            if (await mesaRouter(req, res)) return;
            if (await pagoRouter(req, res)) return;
            if (await pedidoRouter(req, res)) return;
            if (await platilloRouter(req, res)) return;
            if (await reservaRouter(req, res)) return;

            res.writeHead(404);
            res.end(JSON.stringify({
                mensaje: "Ruta no encontrada"
            }));

        } catch (error: any) {

            res.writeHead(400);

            res.end(JSON.stringify({
                mensaje: error.message
            }));

        }

    });

    server.listen(3000, () => {
        console.log("Servidor ejecutándose en http://localhost:3000");
    });

}