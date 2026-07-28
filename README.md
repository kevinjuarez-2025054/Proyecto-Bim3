# RestNova


API REST para la gestión de un restaurante, construida con **TypeScript** y el módulo `http` nativo de **Node.js** (sin frameworks como Express), conectada a una base de datos **MySQL**.

Administra clientes, mesas, empleados, reservas, platillos, pedidos, facturación y pagos mediante una arquitectura organizada en capas.

## Tabla de contenido

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración de la base de datos](#configuración-de-la-base-de-datos)
- [Ejecución](#ejecución)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Documentación](#documentación)

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- [pnpm](https://pnpm.io/)
- MySQL 8 (o compatible)

## Instalación

```bash
git clone https://github.com/kevinjuarez-2025054/Proyecto-Bim3.git
cd Proyecto-Bim3/RestNova
pnpm install
```

## Configuración de la base de datos

1. Ejecuta el script `DBGestion_Restaurante_in5cm.sql` (ubicado en la raíz del repositorio) en tu servidor MySQL. Este script crea la base de datos, las tablas, los procedimientos almacenados y datos de ejemplo.

2. Configura las credenciales de conexión en `src/config/db.ts`:

   ```typescript
   const connection = mysql.createPool({
       host: "localhost",
       user: "TU_USUARIO",
       password: "TU_CONTRASEÑA",
       database: "DBGestion_Restaurante_in5cm",
       waitForConnections: true,
       connectionLimit: 10
   });
   ```

## Ejecución

```bash
pnpm run dev
```

Esto levanta el servidor en modo desarrollo en:

```
http://localhost:3000
```

Verás en consola:

```
Servidor ejecutándose en http://localhost:3000
Conexión a la base de datos establecida
```

## Estructura del proyecto

```
RestNova/
├── DBGestion_Restaurante_in5cm.sql   # Script de base de datos
├── src/
│   ├── index.ts                      # Punto de entrada
│   ├── config/
│   │   └── db.ts                     # Conexión (pool) a MySQL
│   ├── models/                       # Interfaces y enums de cada entidad
│   ├── data/                         # Repositorios (consultas SQL)
│   ├── service/                      # Lógica de negocio
│   ├── validation/                   # Reglas de validación por entidad
│   ├── controller/                   # Manejo de peticiones/respuestas HTTP
│   └── api/                          # Routers y arranque del servidor
```

Cada entidad (Cliente, Mesa, Empleado, Reserva, Platillo, CategoriaPlatillo, Pedido, DetallePedido, Factura, Pago) sigue el mismo patrón de capas:

```
Router → Controller → Service → Validation → Repository → MySQL
```