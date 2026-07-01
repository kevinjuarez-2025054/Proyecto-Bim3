enum CategoriaPlatillo {
    ENTRADA = "ENTRADA",
    PLATO_FUERTE = "PLATO_FUERTE",
    BEBIDA = "BEBIDA",
    SOPA_Y_ENSALADA = "SOPA_Y_ENSALADA",
    ACOMPAÑAMIENTO = "ACOMPAÑAMIENTO"
}

export interface CategoriaPlatilloModel {
    id_categoria: number;
    nombre_categoria: CategoriaPlatillo;
}