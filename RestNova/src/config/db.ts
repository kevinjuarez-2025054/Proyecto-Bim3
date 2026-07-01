import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: "localhost",
    user: "IN5CM",
    password: "?donmoA5m@",
    database: "DBGestion_Restaurante_in5cm"
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }else {
        console.log('Conectado a la base de datos.');
    }
});

export default connection;