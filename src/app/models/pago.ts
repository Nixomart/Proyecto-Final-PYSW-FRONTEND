export class Pago {
    _id!: string;
    precio!: number;
    descripcion!: string;
    categoria!: string;
    fecha!: Date;

    constructor(id_?:string, precio?: number, descripcion?: string, categoria?: string, fecha?: Date){
        this._id = id_!;
        this.precio = precio!;
        this.descripcion = descripcion!;
        this.categoria = categoria!;
        this.fecha = new Date();
        this.fecha = fecha!;

    }
}
