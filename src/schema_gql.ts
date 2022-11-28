import { gql } from "graphql_tag";



export const typeDefs = gql`
    type Vendedor {
        dni: String!
        nombre: String!
        apellido: String!
        coches: [String!]!
    }

    type Coche{
        matricula: String!
        marca: String!
        modelo: String!
        precio: Int!
    }

    type Concesionario{
        vendedores: [String!]!
    }

    type Query{
        obtenerCoche(id: String!): Coche!
        obtenerCoches(precioMinimo: Int, precioMaximo: Int): [Coche!]
        obtenerVendedor(id: String!): Vendedor!
        obtenerVendedores(nombre: String!): [Vendedor!]
        obtenerConcesionario(id: String!): Concesionario!
    }

    type Chaining{
        coches: [Coche!]
        vendedores: [Vendedor!]
    }

    type Mutation{
        crearVendedor(dni: String!, nombre: String!, apellido: String!): Vendedor!
        crearCoche(matricula: String!, marca: String!, modelo: String!, precio: Int): Coche!
        crearConcesionario: Concesionario!
        asignarCocheVendedor(dniVendedor: String!, matriculaCoche: String!): Coche!
        asignarVendedorConcesionario(dniVendedor: String!, idConcesionario: String!): Vendedor!
    }
`;

