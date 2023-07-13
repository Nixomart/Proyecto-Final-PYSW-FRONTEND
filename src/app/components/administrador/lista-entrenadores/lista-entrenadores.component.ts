import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entrenador } from 'src/app/models/entrenador';
import { EntrenadorService } from 'src/app/services/entrenador.service';


@Component({
  selector: 'app-lista-entrenadores',
  templateUrl: './lista-entrenadores.component.html',
  styleUrls: ['./lista-entrenadores.component.css']
})
export class ListaEntrenadoresComponent  implements OnInit {

  entrenadores: Array<Entrenador>

  constructor(private entrenadorService: EntrenadorService, private router:Router){
    this.entrenadores = new Array<Entrenador>();

    this.obtenerEntrenadors();
  }

  public obtenerEntrenadors(){
    this.entrenadorService.getEntrenadors().subscribe((result:any) => {
      console.log(result);
      this.entrenadores = [];
      let unEntrenador : Entrenador = new Entrenador();
      result.forEach((element:any) => {
        Object.assign(unEntrenador, element);
        this.entrenadores.push(unEntrenador);
        unEntrenador = new Entrenador();
      });
    })
  }

  public modificarEntrenador(entrenador: Entrenador){
    this.router.navigate(["administrador/formulario/entrenador", entrenador._id])
  }

  public eliminarEntrenador(entrenador:Entrenador){
    this.entrenadorService.eliminarEntrenador(entrenador._id).subscribe((result:any) => {
      const index = this.entrenadores.indexOf(entrenador);
      if(index > -1){
        this.entrenadores.splice(index, 1);
      }
    });
    location.reload();
    // Nose xq no se redirige a la url formulario-entrenador/0 cuando elimino el entrenador, se queda en el id en la url
    this.router.navigate(["administrador/formulario/entrenador", 0])
  }


  ngOnInit(): void {

  }

}

