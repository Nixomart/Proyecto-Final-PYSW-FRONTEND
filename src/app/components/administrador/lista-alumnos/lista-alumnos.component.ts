import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  alumnos: Array<Alumno>
alumnoa: any
  constructor(private alumnoService: AlumnoService, private router:Router){
    this.alumnos = new Array<Alumno>();

    this.obtenerAlumnos();
  }

  public obtenerAlumnos(){
    this.alumnoService.getAlumnos().subscribe((result:any) => {
      console.log(result);
      this.alumnos = [];
      let unAlumno : Alumno = new Alumno();
      result.forEach((element:any) => {
        Object.assign(unAlumno, element);
        this.alumnos.push(unAlumno);
        unAlumno = new Alumno();
      });
    })
  }

  public setearModificar(alumno: Alumno){
    this.alumnoa = alumno
    /* this.router.navigate(["administrador/formulario/alumno", alumno._id]) */
  }
  modificarAlumno = () =>{
    this.alumnoService.updateAlumno(this.alumnoa).subscribe((result)=>{
      console.log("resultado editar alumno:", result);
      
    })
  }
  public eliminarAlumno(alumno:Alumno){
    this.alumnoService.eliminarAlumno(alumno._id).subscribe((result:any) => {
      const index = this.alumnos.indexOf(alumno);
      if(index > -1){
        this.alumnos.splice(index, 1);
      }
    });
    location.reload();
    // Nose xq no se redirige a la url formulario-alumno/0 cuando elimino el alumno, se queda en el id en la url
    this.router.navigate(["administrador/formulario/alumno", 0])
  }


  ngOnInit(): void {
    
  }

}
