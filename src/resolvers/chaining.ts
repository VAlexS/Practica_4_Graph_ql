import { cochesCollection, vendedoresCollection } from "../db/conexiondb.ts";
import { Coche, Vendedor} from "../types.ts";

export const Chaining = {
    coches: async() : Promise<Coche[] | null> => {
        try{
            const todos_los_coches = await cochesCollection.find({}).toArray();
            
            if(todos_los_coches.length === 0){
                return null;
            }
            else{
                return todos_los_coches.map((coche) => ({...coche})); 
            }
           
        }catch(err){
            console.log(err);
            throw new Error("Error al crear el vendedor");
        }
            
    },
    vendedores: async() : Promise<Vendedor[] | null> => {
        try{
            const todos_los_vendedores = await vendedoresCollection.find({}).toArray();
            
            if(todos_los_vendedores.length === 0){
                return null;
            }
            else{
                return todos_los_vendedores.map((vendedor) => ({...vendedor})); 
            }
           
        }catch(err){
            console.log(err);
            throw new Error("Error al crear el vendedor");
        }
            
    },

}