create database DBGestion_Restaurante_in5cm;
use DBGestion_Restaurante_in5cm;

create table Clientes(
	id_cliente int primary key  not null auto_increment,
    nombre varchar(50),
    apellido varchar(50),
    telefono varchar(8),
    email varchar(50)
);

create table Mesa(
	numero_mesa int primary key not null auto_increment,
    capacidad int,
    estado enum("DISPONIBLE","OCUPADA","RESERVADA")
);

create table Empleados(
	id_empleado int primary key not null auto_increment,
    nombre_empleado varchar(50),
    apellido_empleado varchar(50),
    cargo varchar(30),
    telefono varchar(8),
    email varchar(30)
);

create table Reserva(
	id_reserva int primary key not null auto_increment,
    fecha_reserva date,
    hora time,
    cantidad_personas int,
    id_cliente int,
    numero_mesa int,
    id_empleado int,
    foreign key (id_cliente) references Clientes (id_cliente) on delete cascade,
    foreign key (numero_mesa) references Mesa (numero_mesa) on delete cascade,
    foreign key (id_empleado) references Empleados (id_empleado) on delete cascade
);

create table CategoriaPlatillo(
	id_categoria int primary key not null,
    categoria_platillo enum("ENTRADA","SOPA Y ENSALDA","BEBIDAS","PLATO FUERTE","ACOMPAÑAMIENTOS")
);

create table Platillo(
	id_platillo int primary key not null,
    nombre_platillo varchar(50),
    descripcion varchar(80),
    precio decimal(5,2),
    id_categoria int,
    foreign key (id_categoria) references CategoriaPlatillo (id_categoria) on delete cascade
);

create table Pedido(
	numero_pedido int primary key not null auto_increment,
    fecha date,
    estado_pedido enum("EN PROCESO","ENTREGDO"),
    id_cliente int,
    numero_mesa int,
    id_platillo int,
    foreign key (id_cliente) references Clientes (id_cliente) on delete cascade,
    foreign key (numero_mesa) references Mesa (numero_mesa) on delete cascade,
	foreign key (id_platillo) references Platillo (id_platillo) on delete cascade
);

create table DetallePedido(
	id_detalle_pedido int primary key not null auto_increment,
    id_platillo int,
    cantidad int,
    subtotal decimal(5,2),
    numero_pedido int,
    id_empleado int,
    foreign key (id_platillo) references Platillo (id_platillo) on delete cascade,
    foreign key (numero_pedido) references Pedido (numero_pedido) on delete cascade,
    foreign key (id_empleado) references Empleados (id_empleado) on delete cascade
);

create table Factura(
	numero_factura int primary key not null auto_increment,
    fecha date,
    subtotal decimal(5,2),
    iva decimal(2,2),
    total decimal(5,2),
    numero_pedido int,
    id_platillo int,
    id_detalle_pedido int,
    foreign key (numero_pedido) references Pedido (numero_pedido) on delete cascade,
    foreign key (id_platillo) references Platillo (id_platillo) on delete cascade,
    foreign key (id_detalle_pedido) references DetallePedido (id_detalle_pedido) on delete cascade
);

create table Pago(
	id_pago int primary key not null auto_increment,
    metodo_pago enum("EFECTIVO","TRANSFERENCIA","TARJETA"),
    monto decimal(5,2),
    fecha_pago date,
    numero_factura int,
    id_cliente int,
    foreign key (numero_factura) references Factura (numero_factura) on delete cascade,
    foreign key (id_cliente) references Clientes (id_cliente) on delete cascade
);


-- =========================
-- clientes
-- =========================

delimiter $$

create procedure sp_insertar_cliente(
	in p_nombre varchar(50),
    in p_apellido varchar(50),
    in p_telefono varchar(8),
    in p_email varchar(50)
)
begin
	insert into Clientes(nombre, apellido, telefono, email)
	values(p_nombre, p_apellido, p_telefono, p_email);
end $$

delimiter ;

-- datos clientes

call sp_insertar_cliente('Juan','Perez','12345678','juan@gmail.com');
call sp_insertar_cliente('Maria','Lopez','12345679','maria@gmail.com');
call sp_insertar_cliente('Carlos','Ramirez','12345670','carlos@gmail.com');
call sp_insertar_cliente('Ana','Morales','12345671','ana@gmail.com');
call sp_insertar_cliente('Luis','Gomez','12345672','luis@gmail.com');
call sp_insertar_cliente('Sofia','Hernandez','12345673','sofia@gmail.com');
call sp_insertar_cliente('Pedro','Martinez','12345674','pedro@gmail.com');
call sp_insertar_cliente('Lucia','Diaz','12345675','lucia@gmail.com');
call sp_insertar_cliente('Jose','Castillo','12345676','jose@gmail.com');
call sp_insertar_cliente('Elena','Ruiz','12345677','elena@gmail.com');

-- =========================
-- mesa
-- =========================

delimiter $$

create procedure sp_insertar_mesa(
	in p_capacidad int,
    in p_estado enum('DISPONIBLE','OCUPADA','RESERVADA')
)
begin
	insert into Mesa(capacidad, estado)
	values(p_capacidad, p_estado);
end $$

delimiter ;

call sp_insertar_mesa(2,'DISPONIBLE');
call sp_insertar_mesa(4,'OCUPADA');
call sp_insertar_mesa(6,'RESERVADA');
call sp_insertar_mesa(2,'DISPONIBLE');
call sp_insertar_mesa(4,'OCUPADA');
call sp_insertar_mesa(8,'DISPONIBLE');
call sp_insertar_mesa(6,'RESERVADA');
call sp_insertar_mesa(4,'DISPONIBLE');
call sp_insertar_mesa(2,'OCUPADA');
call sp_insertar_mesa(10,'DISPONIBLE');

-- =========================
-- empleados
-- =========================

delimiter $$

create procedure sp_insertar_empleado(
	in p_nombre varchar(50),
    in p_apellido varchar(50),
    in p_cargo varchar(30),
    in p_telefono varchar(8),
    in p_email varchar(30)
)
begin
	insert into Empleados(nombre_empleado, apellido_empleado, cargo, telefono, email)
	values(p_nombre, p_apellido, p_cargo, p_telefono, p_email);
end $$

delimiter ;

call sp_insertar_empleado('Miguel','Garcia','Mesero','22334455','miguel@gmail.com');
call sp_insertar_empleado('Laura','Perez','Cajero','22334456','laura@gmail.com');
call sp_insertar_empleado('Diego','Lopez','Chef','22334457','diego@gmail.com');
call sp_insertar_empleado('Andrea','Ruiz','Mesero','22334458','andrea@gmail.com');
call sp_insertar_empleado('Mario','Diaz','Chef','22334459','mario@gmail.com');
call sp_insertar_empleado('Patricia','Santos','Gerente','22334460','patricia@gmail.com');
call sp_insertar_empleado('Kevin','Mendez','Mesero','22334461','kevin@gmail.com');
call sp_insertar_empleado('Rosa','Morales','Cajero','22334462','rosa@gmail.com');
call sp_insertar_empleado('Jorge','Ramirez','Chef','22334463','jorge@gmail.com');
call sp_insertar_empleado('Claudia','Vega','Mesero','22334464','claudia@gmail.com');

-- =========================
-- categoria platillo
-- =========================

delimiter $$

create procedure sp_insertar_categoria(
	in p_id int,
    in p_categoria enum('ENTRADA','SOPA Y ENSALDA','BEBIDAS','PLATO FUERTE','ACOMPAÑAMIENTOS')
)
begin
	insert into CategoriaPlatillo
	values(p_id,p_categoria);
end $$

delimiter ;

call sp_insertar_categoria(1,'ENTRADA');
call sp_insertar_categoria(2,'SOPA Y ENSALDA');
call sp_insertar_categoria(3,'BEBIDAS');
call sp_insertar_categoria(4,'PLATO FUERTE');
call sp_insertar_categoria(5,'ACOMPAÑAMIENTOS');
call sp_insertar_categoria(6,'ENTRADA');
call sp_insertar_categoria(7,'BEBIDAS');
call sp_insertar_categoria(8,'PLATO FUERTE');
call sp_insertar_categoria(9,'ACOMPAÑAMIENTOS');
call sp_insertar_categoria(10,'SOPA Y ENSALDA');

-- =========================
-- platillo
-- =========================

delimiter $$

create procedure sp_insertar_platillo(
	in p_id int,
    in p_nombre varchar(50),
    in p_descripcion varchar(80),
    in p_precio decimal(5,2),
    in p_categoria int
)
begin
	insert into Platillo
	values(p_id,p_nombre,p_descripcion,p_precio,p_categoria);
end $$

delimiter ;

call sp_insertar_platillo(1,'Nachos','Nachos con queso',25.00,1);
call sp_insertar_platillo(2,'Sopa de pollo','Sopa tradicional',20.00,2);
call sp_insertar_platillo(3,'Limonada','Bebida natural',10.00,3);
call sp_insertar_platillo(4,'Carne asada','Carne con guarnicion',60.00,4);
call sp_insertar_platillo(5,'Papas fritas','Papas crujientes',15.00,5);
call sp_insertar_platillo(6,'Ensalada verde','Vegetales frescos',18.00,2);
call sp_insertar_platillo(7,'Hamburguesa','Hamburguesa especial',45.00,4);
call sp_insertar_platillo(8,'Jugo de naranja','Natural',12.00,3);
call sp_insertar_platillo(9,'Aros de cebolla','Entrada especial',16.00,1);
call sp_insertar_platillo(10,'Arroz','Acompañamiento',8.00,5);

-- =========================
-- reserva
-- =========================

delimiter $$

create procedure sp_insertar_reserva(
	in p_fecha date,
    in p_hora time,
    in p_cantidad int,
    in p_cliente int,
    in p_mesa int,
    in p_empleado int
)
begin
	insert into Reserva(fecha_reserva,hora,cantidad_personas,id_cliente,numero_mesa,id_empleado)
	values(p_fecha,p_hora,p_cantidad,p_cliente,p_mesa,p_empleado);
end $$

delimiter ;

call sp_insertar_reserva('2025-01-01','12:00:00',2,1,1,1);
call sp_insertar_reserva('2025-01-02','13:00:00',4,2,2,2);
call sp_insertar_reserva('2025-01-03','14:00:00',3,3,3,3);
call sp_insertar_reserva('2025-01-04','15:00:00',5,4,4,4);
call sp_insertar_reserva('2025-01-05','16:00:00',2,5,5,5);
call sp_insertar_reserva('2025-01-06','17:00:00',4,6,6,6);
call sp_insertar_reserva('2025-01-07','18:00:00',6,7,7,7);
call sp_insertar_reserva('2025-01-08','19:00:00',2,8,8,8);
call sp_insertar_reserva('2025-01-09','20:00:00',3,9,9,9);
call sp_insertar_reserva('2025-01-10','21:00:00',8,10,10,10);

-- =========================
-- pedido
-- =========================

delimiter $$

create procedure sp_insertar_pedido(
	in p_fecha date,
    in p_estado enum('EN PROCESO','ENTREGDO'),
    in p_cliente int,
    in p_mesa int,
    in p_platillo int
)
begin
	insert into Pedido(fecha,estado_pedido,id_cliente,numero_mesa,id_platillo)
	values(p_fecha,p_estado,p_cliente,p_mesa,p_platillo);
end $$

delimiter ;

call sp_insertar_pedido('2025-02-01','EN PROCESO',1,1,1);
call sp_insertar_pedido('2025-02-02','ENTREGDO',2,2,2);
call sp_insertar_pedido('2025-02-03','EN PROCESO',3,3,3);
call sp_insertar_pedido('2025-02-04','ENTREGDO',4,4,4);
call sp_insertar_pedido('2025-02-05','EN PROCESO',5,5,5);
call sp_insertar_pedido('2025-02-06','ENTREGDO',6,6,6);
call sp_insertar_pedido('2025-02-07','EN PROCESO',7,7,7);
call sp_insertar_pedido('2025-02-08','ENTREGDO',8,8,8);
call sp_insertar_pedido('2025-02-09','EN PROCESO',9,9,9);
call sp_insertar_pedido('2025-02-10','ENTREGDO',10,10,10);

-- =========================
-- detalle pedido
-- =========================

delimiter $$

create procedure sp_insertar_detalle_pedido(
	in p_platillo int,
    in p_cantidad int,
    in p_subtotal decimal(5,2),
    in p_pedido int,
    in p_empleado int
)
begin
	insert into DetallePedido(id_platillo,cantidad,subtotal,numero_pedido,id_empleado)
	values(p_platillo,p_cantidad,p_subtotal,p_pedido,p_empleado);
end $$

delimiter ;

call sp_insertar_detalle_pedido(1,2,50.00,1,1);
call sp_insertar_detalle_pedido(2,1,20.00,2,2);
call sp_insertar_detalle_pedido(3,3,30.00,3,3);
call sp_insertar_detalle_pedido(4,1,60.00,4,4);
call sp_insertar_detalle_pedido(5,2,30.00,5,5);
call sp_insertar_detalle_pedido(6,1,18.00,6,6);
call sp_insertar_detalle_pedido(7,2,90.00,7,7);
call sp_insertar_detalle_pedido(8,3,36.00,8,8);
call sp_insertar_detalle_pedido(9,2,32.00,9,9);
call sp_insertar_detalle_pedido(10,4,32.00,10,10);

-- =========================
-- factura
-- =========================

delimiter $$

create procedure sp_insertar_factura(
	in p_fecha date,
    in p_subtotal decimal(5,2),
    in p_iva decimal(2,2),
    in p_total decimal(5,2),
    in p_pedido int,
    in p_platillo int,
    in p_detalle int
)
begin
	insert into Factura(fecha,subtotal,iva,total,numero_pedido,id_platillo,id_detalle_pedido)
	values(p_fecha,p_subtotal,p_iva,p_total,p_pedido,p_platillo,p_detalle);
end $$

delimiter ;

call sp_insertar_factura('2025-03-01',50.00,0.12,56.00,1,1,1);
call sp_insertar_factura('2025-03-02',20.00,0.12,22.40,2,2,2);
call sp_insertar_factura('2025-03-03',30.00,0.12,33.60,3,3,3);
call sp_insertar_factura('2025-03-04',60.00,0.12,67.20,4,4,4);
call sp_insertar_factura('2025-03-05',30.00,0.12,33.60,5,5,5);
call sp_insertar_factura('2025-03-06',18.00,0.12,20.16,6,6,6);
call sp_insertar_factura('2025-03-07',90.00,0.12,100.80,7,7,7);
call sp_insertar_factura('2025-03-08',36.00,0.12,40.32,8,8,8);
call sp_insertar_factura('2025-03-09',32.00,0.12,35.84,9,9,9);
call sp_insertar_factura('2025-03-10',32.00,0.12,35.84,10,10,10);

-- =========================
-- pago
-- =========================

delimiter $$

create procedure sp_insertar_pago(
	in p_metodo enum('EFECTIVO','TRANSFERENCIA','TARJETA'),
    in p_monto decimal(5,2),
    in p_fecha date,
    in p_factura int,
    in p_cliente int
)
begin
	insert into Pago(metodo_pago,monto,fecha_pago,numero_factura,id_cliente)
	values(p_metodo,p_monto,p_fecha,p_factura,p_cliente);
end $$

delimiter ;

call sp_insertar_pago('EFECTIVO',56.00,'2025-04-01',1,1);
call sp_insertar_pago('TARJETA',22.40,'2025-04-02',2,2);
call sp_insertar_pago('TRANSFERENCIA',33.60,'2025-04-03',3,3);
call sp_insertar_pago('EFECTIVO',67.20,'2025-04-04',4,4);
call sp_insertar_pago('TARJETA',33.60,'2025-04-05',5,5);
call sp_insertar_pago('TRANSFERENCIA',20.16,'2025-04-06',6,6);
call sp_insertar_pago('EFECTIVO',100.80,'2025-04-07',7,7);
call sp_insertar_pago('TARJETA',40.32,'2025-04-08',8,8);
call sp_insertar_pago('TRANSFERENCIA',35.84,'2025-04-09',9,9);
call sp_insertar_pago('EFECTIVO',35.84,'2025-04-10',10,10);