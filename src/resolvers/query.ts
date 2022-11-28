import { cochesCollection, vendedoresCollection, concesionariosCollection } from "../db/conexiondb.ts";
import { ObjectId } from "mongo";
import { Coche, Concesionario, Vendedor } from "../types.ts";

export const Query = {
    obtenerCoche: async (_: unknown, args: {id: string}): Promise<Coche> => {
        try{
            const coche = await cochesCollection.findOne({_id: new ObjectId(args.id)});
            if(!coche){
                throw new Error("No existe un coche con ese id");
            }
            return { ...coche };

        }catch(err){
            console.log(err);
            throw new Error("Error al obtener el coche");
        }       
    },
   obtenerVendedor: async (_: unknown, args: {id: string}): Promise<Vendedor> => {
        try{
            const vendedor = await vendedoresCollection.findOne({_id: new ObjectId(args.id)});
            if(!vendedor){
                throw new Error("No existe un vendedor con ese id");
            }
            return {...vendedor};

        }catch(err){
            console.log(err);
            throw new Error("Error al obtener el vendedor");
        }
   },
   obtenerCoches: async (_: unknown, args: {precioMinimo?: number, precioMaximo?: number}) : Promise<Coche[] | null> => {
    try{
        //busco los coches que tengan un precio mayor o igual al precio minimo y menor o igual al precio maximo
        const coches = await cochesCollection.find({precio: {$gte: args.precioMinimo, $lte: args.precioMaximo}}).toArray();
        if(!coches){
            return null;
        }
        else{
            return coches.map((coche) => ({...coche}));
        }


    }catch(err){
        console.log(err);
        throw new Error("Error al obtener los coches");
    }  
   },
   obtenerVendedores: async (_: unknown, args: {nombre: string}): Promise<Vendedor[] | null> => {
        try{
            const vendedores = await vendedoresCollection.find({nombre: {$eq: args.nombre}}).toArray();
            if(!vendedores){
                return null;
            }
            else{
                return vendedores.map((vendedor) => ({...vendedor}));
            }
        }catch(err){
            console.log(err);
            throw new Error("Error al obtener los vendedores");
        }
   },
   obtenerConcesionario: async(_: unknown, args: {id: string}): Promise<Concesionario> => {
        try{
            const concesionario = await concesionariosCollection.findOne({_id: new ObjectId(args.id)});
            if(!concesionario){
                throw new Error("No existe un concesionario con ese id");
            }   
            return {...concesionario};
        }catch(err){
                console.log(err);
                throw new Error("Error al obtener el concesionario");
        }
   },
};