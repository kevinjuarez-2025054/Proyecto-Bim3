export interface Reserva {
    id_reserva: number;
    fecha_reserva: Date;
    hora: string;
    cantidad_personas: number;
    id_cliente: number;
    numero_mesa: number;
    id_empleado: number;
}