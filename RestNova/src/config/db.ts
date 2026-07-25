import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: "localhost",
    user: "IN5CM",
    password: "?donmoA5m@",
    database: "DBGestion_Restaurante_in5cm",
    waitForConnections: true,
    connectionLimit: 10
});

connection.getConnection()
    .then((conn) => {
        console.log("Conexión a la base de datos establecida");
        conn.release(); 
    })
    .catch((err) => {
        console.error("Error al conectar a la base de datos:", err);
    });

export default connection;