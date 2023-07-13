import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Insumo } from 'src/app/models/insumo';
import { CategoriaService } from 'src/app/services/catgorias/categoria.service';
import { InsumoService } from 'src/app/services/insumo.service';

@Component({
  selector: 'app-formulario-insumos',
  templateUrl: './formulario-insumos.component.html',
  styleUrls: ['./formulario-insumos.component.css']
})
export class FormularioInsumosComponent implements OnInit{

  insumo:Insumo;
  accion:string = "";
  submitted : boolean=false;
  categorias: any
  categoriaActual: any
  constructor(private categoriaService: CategoriaService,private insumoService:InsumoService,private activaedRoute:ActivatedRoute, private router:Router){
    this.insumo = new Insumo();
  }
  ngOnInit(): void {
    this.categoriaService.getcategorias().subscribe((result)=>{
      console.log("CATEGORIAS EN FORMULARIO INSUMO: ", result);
      this.categorias = result
    })
    this.activaedRoute.params.subscribe(params =>{
      if(params['id'] == 0){
        this.accion = "new";
      }
      else{
        this.accion = "update"
        this.cargarInsumo(params['id']);
      }
    })
  }

  public cargarInsumo(id: string){
    this.insumoService.getInsumoById(id).subscribe((result:any) => {
      Object.assign(this.insumo, result)
    })
  }

  public confirmarModificacion(){
    this.insumoService.updateInsumo(this.insumo).subscribe((result:any) => {
      
      alert("insumo modificado");
      this.router.navigate(['administrador/lista-insumos']);
    })
    // location.reload();
  }

  public crearInsumo() {
    console.log(this.insumo);
    this.insumoService.createInsumo(this.insumo).subscribe((result: any) => {
      console.log(result);
      this.router.navigate(['administrador/lista-insumos']);
    });
  }

  public guardarInsumo(){
    this.insumo = new Insumo();
    this.router.navigate(["administrador/formulario/insumo", 0]);

  }

  procesarForm(){
    this.submitted=true;
  }

}
