import { cochesCollection, concesionariosCollection, vendedoresCollection } from "../db/conexiondb.ts";
import { Coche, Concesionario, Vendedor } from "../types.ts";
import { validarDNI, validarMatricula } from "../validaciones.ts";
import { ObjectId } from "mongo";

export const Mutation = {
    crearVendedor: async (_: unknown, 
        args: {dni: string, nombre: string, apellido: string}
        ): Promise<Vendedor> => {
        try{
            const dniValido = validarDNI(args.dni);
            if(!dniValido){
                throw new Error("El dni no es valido, no cumple con el formato");
            }
            
            const vendedorMismoDni = await vendedoresCollection.findOne({dni: args.dni});
            if(vendedorMismoDni){
                throw new Error("Ya existe un vendedor con ese dni");
            }
            await vendedoresCollection.insertOne({
                dni: args.dni,
                nombre: args.nombre,
                apellido: args.apellido,
                coches: [],
            });
            return { 
                dni: args.dni,
                nombre: args.nombre,
                apellido: args.apellido,
                coches: [],
            };
            
        }catch(err){
            console.log(err);
            throw new Error("Error al crear el vendedor");
        }
    },
    crearCoche: async (_: unknown,
        args: {matricula: string, marca: string, modelo: string, precio: number}
    ): Promise<Coche> => {
        try{
            const cocheMismaMatricula = await cochesCollection.findOne({matricula: args.matricula});
            if(cocheMismaMatricula){
                throw new Error("Ya existe un coche con esa matricula");
            }

            const matriculaValida = validarMatricula(args.matricula);
            if(!matriculaValida){
                throw new Error("La matricula no es valida, no cumple con el formato");
            }

            await cochesCollection.insertOne({
                matricula: args.matricula,
                marca: args.marca,
                modelo: args.modelo,
                precio: args.precio,
            });
            
            
            return {
                matricula: args.matricula,
                marca: args.marca,
                modelo: args.modelo,
                precio: args.precio,
            };

        }catch(err){
            console.log(err);
            throw new Error("Error al crear el coche");
        }
    },
    crearConcesionario: async(): Promise<Concesionario> => {
        try{
            await concesionariosCollection.insertOne({
                vendedores: [],
            });
            return {
                vendedores: [],
            };
        }catch(err){
            console.log(err);
            throw new Error("Error al crear el concesionario");
        }
    },
    asignarCocheVendedor: async(_: unknown, 
        args: {dniVendedor: string, matriculaCoche: string}): Promise<Coche> => {
                try{
                    const vendedor = await vendedoresCollection.findOne({dni: args.dniVendedor});
                    const coche = await cochesCollection.findOne({matricula: args.matriculaCoche});
                    if(!vendedor || !coche){
                        throw new Error("Algun parametro no existe en la bbdd");
                    }
                    
                    const cochesVendedor = vendedor.coches;
                    const matriculaRepetida = cochesVendedor.find((matricula) => matricula === args.matriculaCoche);
                    if(matriculaRepetida){
                        throw new Error("El vendedor ya tiene asignado un coche con esa matricula")
                    }
                    
                    cochesVendedor.push(args.matriculaCoche);
                    await vendedoresCollection.updateOne(
                        {dni: args.dniVendedor},
                        {$set: {coches: cochesVendedor}},
                    );
                    return coche;
                    

                }catch(err){
                console.log(err);
                throw new Error("Error al asignar un coche al vendedor");
            }
        },
        asignarVendedorConcesionario: async(_: unknown, 
            args: {dniVendedor: string, idConcesionario: string}): Promise<Vendedor> => {
                    try{
                        const vendedor = await vendedoresCollection.findOne({dni: args.dniVendedor});
                        const concesionario = await concesionariosCollection.findOne({_id: new ObjectId(args.idConcesionario)});
                        if(!vendedor || !concesionario){
                            throw new Error("Algun parametro no existe en la bbdd");
                        }
                        
                        const vendedoresConcesionario = concesionario.vendedores;
                        const vendedorDuplicado = vendedoresConcesionario.find((dni) => dni === args.dniVendedor);
                        if(vendedorDuplicado){
                            throw new Error("El vendedor ya tiene asignado un coche con esa matricula")
                        }
                        
                        vendedoresConcesionario.push(args.dniVendedor);
                        await concesionariosCollection.updateOne(
                            {_id: new ObjectId(args.idConcesionario)},
                            {$set: {vendedores: vendedoresConcesionario}},
                        );
                        return vendedor;
                        
    
                    }catch(err){
                        console.log(err);
                        throw new Error("Error al asignar un coche al vendedor");
                }
            },
};