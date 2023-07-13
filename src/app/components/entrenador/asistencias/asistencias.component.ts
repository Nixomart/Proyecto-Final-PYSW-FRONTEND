import { Component } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent {
  alumnos:any
  alumno:any

  asistencias: { asistido: boolean, fecha: Date }[] = [];
  /* asistencianew = {
    asistido: boolean,
    fecha: new Date,
  } */
  asistido: boolean = false
  constructor(private alumS: AlumnoService){
    this.cargar()
  }
  modificar=(alum:any, asistido: boolean)=>{

    
    
    const asistencianew = {
      asistido: asistido,
      fecha: new Date,}
      this.asistencias.push(asistencianew)
      this.alumS.setearAsistencia(alum._id, this.asistencias).subscribe((result)=>{
        console.log("RESULT DE ASISTENCIA A SETEAR: ",result);
        
      })
      
  }

  cargar = () =>{
    this.alumS.getAlumnos().subscribe((result)=>{
      this.alumnos = result
    })
  }
  setearModificar=(alum:any)=>{
      this.alumno = alum
      this.asistencias = alum.asistencias
      console.log("ASISTNECNIAS DEL PIBE: ", this.asistencias);
      console.log("ASISTNECNIAS DEL PIBE: ", alum);
  }
}
