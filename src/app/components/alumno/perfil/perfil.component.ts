import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';
import { DatosUsuarioService } from 'src/app/services/datos/datos-usuario.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  editar: boolean = false;
  today: Date = new Date();
  alumno: any;
  message: string = ''
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  calendario: { dia: string, fecha: string, asistencia: boolean }[];

asistencia : Array<any> = []
  constructor(
    private usuarioService: UsuarioService,
    private alumnoService: AlumnoService,
    private router: Router
  ) {


    let token = window.localStorage.getItem('token');
    if (token) {
      this.usuarioService.getData(token).subscribe((result: any) => {
        this.alumno = result[0];
        this.asistencia = this.alumno.asistencias
        
      });
    }else{
      this.router.navigate(["login"])
    }

    this.calendario = [];
    
    
  }
  ngOnInit() {




    let token = window.localStorage.getItem('token');
    if (token) {
      this.usuarioService.getData(token).subscribe((result: any) => {
        this.alumno = result[0];
        this.asistencia = this.alumno.asistencias
        console.log("ASISTENCIAS DEL ALUMNO!!: ", this.alumno.asistencias);
        

        const fechaActual = new Date();
        const primerDiaSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - fechaActual.getDay() + 1);

    for (let i = 0; i < 5; i++) {
      const fechaDia = new Date(primerDiaSemana.getFullYear(), primerDiaSemana.getMonth(), primerDiaSemana.getDate() + i);
      const fechaString = fechaDia.toISOString().split('T')[0];
      console.log("FECHA STRING: ", fechaString);
      console.log("this asistencia: ", this.asistencia);
      
      const asistenciaDia = this.asistencia.find(asistencia => asistencia.fecha.split('T')[0] === fechaString);
      console.log("asistencia find????: ", asistenciaDia);
      const asistencia = asistenciaDia ? asistenciaDia.asistido : false;

      this.calendario.push({
        dia: this.diasSemana[i],
        fecha: fechaDia.toLocaleDateString(),
        asistencia: asistencia
      });
      
    }
      });
    }else{
      this.router.navigate(["login"])
    }
  }
  handleEdit = (editar: string) => {
    if (editar == 'editar') {
      this.editar = true;
    } else {
      console.log('NUEVOS DATOS! : ', this.alumno);
      this.editar = false;
      this.alumnoService.updateAlumno(this.alumno).subscribe((result)=>{
        console.log("resultaado de update: ", result);
        if(result.status){
          this.message = "Edicion correcta!"
        }
        
      })
    }
  };
}
