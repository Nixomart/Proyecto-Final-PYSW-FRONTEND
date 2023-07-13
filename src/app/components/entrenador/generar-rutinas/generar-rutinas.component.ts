import { Component } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { EjercicioService } from 'src/app/services/ejercicios/ejercicio.service';

@Component({
  selector: 'app-generar-rutinas',
  templateUrl: './generar-rutinas.component.html',
  styleUrls: ['./generar-rutinas.component.css'],
})
export class GenerarRutinasComponent {
  alumnos: any;
  alumnoa: any
  rutinas: any
  rutinasBueno =  {
    Lunes: [
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' }
    ],
    Martes: [
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' }
    ],
  
    Miercoles: [
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' }
    ],
  
    Jueves: [
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' }
    ],
  
    Viernes: [
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' }
    ]
  };


  rutinasMala = {
    Lunes: [
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' }
    ],
  
    Miercoles: [
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' }
    ],
  
    Viernes: [
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' },
      { nombreEjercicio: '', demostracion: '', repeticiones: 0, variacion: '' }
    ]
  };
    
  rutina: string = ''
  constructor(private alumnoService: AlumnoService, private ejercicioService: EjercicioService) {}
  ngOnInit() {
    this.alumnoService.getAlumnos().subscribe((result: any) => {
      console.log(result);
      this.alumnos = result;
    });
  }
  setearModificar = (alumn:any) =>{
    this.alumnoa = alumn
  }
  guardar = (alum:any) =>{
    
    console.log(alum);

    if (alum.plan.nombrePlan === 'standart') {
      console.log(this.rutinasMala)
    }
    if (alum.plan.nombrePlan === 'premium') {
      console.log(this.rutinasBueno)
    }


    if (alum.plan.nombrePlan === 'standart') {
      this.ejercicioService.generarEjercicio(alum, this.rutinasMala).subscribe((result)=>{
        console.log("REULTADO DE ASIGNAR EJERCICIO: ", this.rutinasMala);
        
      })
    }
    if (alum.plan.nombrePlan === 'premium') {
      this.ejercicioService.generarEjercicio(alum, this.rutinasBueno).subscribe((result)=>{
        console.log("REULTADO DE ASIGNAR EJERCICIO: ",result);
        
      })
    }
  }
}
