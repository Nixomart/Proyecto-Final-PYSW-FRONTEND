import { Categoria } from "./categoria";

export class Insumo {
  _id!:string;
  nombre!:string;
  descripcion!:string;
  precio!:number;
  stock!:number;
  imagen!:string;
  categoria!:Categoria;
}
