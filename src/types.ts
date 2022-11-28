export type Vendedor = {
    dni: string;
    nombre: string;
    apellido: string;
    coches: string[]; //cada string hace referencia a la matricula de cada coche
}

export type Coche = {
    matricula: string;
    marca: string;
    modelo: string;
    precio: number;
}

export type Concesionario = {
    vendedores: string[]; //cada string hace referencia al DNI de cada vendedor
}
