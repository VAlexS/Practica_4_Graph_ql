import { Coche, Concesionario, Vendedor } from "../types.ts";
import { ObjectId } from "mongo";



export type VendedorSchema = Vendedor & {
    _id: ObjectId;
};

export type ConcesionarioSchema = Concesionario & {
    _id: ObjectId;
};

export type CocheSchema = Coche & {
    _id: ObjectId;
};