import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-ver-subscripcion',
  templateUrl: './ver-subscripcion.component.html',
  styleUrls: ['./ver-subscripcion.component.css']
})
export class VerSubscripcionComponent {
  today: Date = new Date
  diaAc:any
  ejercicios: any[] = []
  ejerciciosHoy: any [] =[]
  alumno: any
  ejerciciosGold: any = {
    Lunes: [
      { demostracion: 'youtube', ejercicio: 'asindon' },
      { demostracion: 'youtube', ejercicio: 'asindon2' },
      { demostracion: 'youtube4', ejercicio: 'asindon3' },
      { demostracion: 'youtube', ejercicio: 'asindon4' },
      { demostracion: 'youtube', ejercicio: 'asindon5' }
    ],
    Martes: [
      { demostracion: 'youtube', ejercicio: 'ejercicio1' },
      { demostracion: 'youtube', ejercicio: 'ejercicio2' },
      { demostracion: 'youtube', ejercicio: 'ejercicio3' },
      { demostracion: 'youtube', ejercicio: 'ejercicio4' },
      { demostracion: 'youtube', ejercicio: 'ejercicio5' }
    ],
    Miércoles: [
      { demostracion: 'youtube', ejercicio: 'entrenamiento1' },
      { demostracion: 'youtube', ejercicio: 'entrenamiento2' },
      { demostracion: 'youtube', ejercicio: 'entrenamiento3' },
      { demostracion: 'youtube', ejercicio: 'entrenamiento4' },
      { demostracion: 'youtube', ejercicio: 'entrenamiento5' }
    ],
    Jueves: [
      { demostracion: 'youtube', ejercicio: 'cardio1' },
      { demostracion: 'youtube', ejercicio: 'cardio2' },
      { demostracion: 'youtube', ejercicio: 'cardio3' },
      { demostracion: 'youtube', ejercicio: 'cardio4' },
      { demostracion: 'youtube', ejercicio: 'cardio5' }
    ],
    Viernes: [
      { demostracion: 'youtube', ejercicio: 'flexibilidad1' },
      { demostracion: 'youtube', ejercicio: 'flexibilidad2' },
      { demostracion: 'youtube', ejercicio: 'flexibilidad3' },
      { demostracion: 'youtube', ejercicio: 'flexibilidad4' },
      { demostracion: 'youtube', ejercicio: 'flexibilidad5' }
    ]
  };
  constructor(private usuarioService: UsuarioService,private router: Router){
    this.today = new Date;
    const diaActual = this.diaActual(this.today);
    this.diaAc = this.diaActual(this.today);
    this.obtenerEjercicioDia(diaActual);
    
  }
  diaActual = (fecha: Date): string=>{
    const opcionesFecha: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return fecha.toLocaleDateString('es-ES', opcionesFecha);
  }
  obtenerEjercicioDia(dia: string): any {
    const diaCapitalizado = dia.charAt(0).toUpperCase() + dia.slice(1);
    let token = window.localStorage.getItem('token');
    if (token) {
      this.usuarioService.getData(token).subscribe((result: any) => {
        this.alumno = result[0];
        this.ejercicios = this.alumno.ejercicios[diaCapitalizado]
        /* this.ejercicios = this.alumno.ejercicios.Viernes */
        console.log("EJERCICIOS HOY!", this.ejercicios)
      });
    }else{
      this.router.navigate(["login"])
    }

  }
}
