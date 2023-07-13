import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrenador } from 'src/app/models/entrenador';
import { EntrenadorService } from 'src/app/services/entrenador.service';


@Component({
  selector: 'app-formulario-entrenador',
  templateUrl: './formulario-entrenador.component.html',
  styleUrls: ['./formulario-entrenador.component.css']
})
export class FormularioEntrenadorComponent implements OnInit {

  entrenador:Entrenador;
  accion:string = "";

  constructor(private entrenadorService: EntrenadorService, private activaedRoute:ActivatedRoute, private router:Router){
    this.entrenador = new Entrenador();
  }
  submitted : boolean=false;

  ngOnInit(): void {
    this.activaedRoute.params.subscribe(params =>{
      if(params['id'] == 0){
        this.accion = "new";
      }
      else{
        this.accion = "update"
        this.cargarEntrenador(params['id']);
      }
    })
  }
  public cargarEntrenador(id: string){
    this.entrenadorService.getEntrenadorById(id).subscribe((result:any) => {
      Object.assign(this.entrenador, result)
    })
  }

  public confirmarModificacion(){
    this.entrenadorService.updateEntrenador(this.entrenador).subscribe((result:any) => {
      alert("entrenador modificado");
    })
    location.reload();
  }

  public crearEntrenador(){
    console.log(this.entrenador)
    this.entrenadorService.createEntrenador(this.entrenador).subscribe((result:any) => {
      console.log(result);
    });
    location.reload();
  }

  public guardarEntrenador(){
    this.entrenador = new Entrenador();
    this.router.navigate(["administrador/formulario/entrenador", 0])

  }

  procesarForm(){
    this.submitted=true;
  }

}
