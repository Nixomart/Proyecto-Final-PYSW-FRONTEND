import { Component } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css'],
})
export class AsistenciasComponent {
  alumnos: any;
  alumno: any;
  check: boolean = true;
  today: Date = new Date();
  asistencias: { asistido: boolean; fecha: Date }[] = [];
  /* asistencianew = {
    asistido: boolean,
    fecha: new Date,
  } */
  asistido: boolean = false;
  constructor(private alumS: AlumnoService, private router: Router) {
    this.cargar();
  }
  modificar = (alum: any, asistido: boolean) => {
    const asistencianew = {
      asistido: asistido,
      fecha: new Date(),
    };

    this.asistencias.push(asistencianew);
    this.alumS
      .setearAsistencia(alum._id, this.asistencias)
      .subscribe((result) => {
        console.log('RESULT DE ASISTENCIA A SETEAR: ', result);
        window.location.reload();
      });
  };

  cargar = () => {
    this.alumS.getAlumnos().subscribe((result) => {
      this.alumnos = result;
    });
  };
  setearModificar = (alum: any) => {
    this.alumno = alum;
    this.asistencias = alum.asistencias;
    console.log('TIENE ASISTENCIA?? : ', this.asistencias);
    if (this.asistencias.length === 0) {
      console.log('PRIMERA ASISTNECIA');
      this.check = false
    } else {


      const ultimo = this.asistencias.length - 1;
      const asis = this.asistencias[ultimo].fecha;
      console.log('ULTIMA ASISTENCUIA: ', asis.toString().split('T')[0]);
      if (
        asis.toString().split('T')[0] === this.today.toISOString().split('T')[0]
      ) {
        console.log('SON IGUALES!!');
        this.check = true
      }else{
        this.check = false
      }
    }
  };
}
