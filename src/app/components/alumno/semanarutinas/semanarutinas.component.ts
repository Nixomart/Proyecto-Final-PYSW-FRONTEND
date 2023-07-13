import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-semanarutinas',
  templateUrl: './semanarutinas.component.html',
  styleUrls: ['./semanarutinas.component.css']
})
export class SemanarutinasComponent {
  diasSemana: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  today: Date = new Date
  ejercicio: any
  ejercicios: any 

  constructor(private usuarioService: UsuarioService, private router: Router,private sanitizer: DomSanitizer){
    this.today = new Date;
    /* this.ejerciciosgett() */
    const diaActual = this.diaActual(this.today);
    /* this.obtenerEjercicioDia(diaActual); */
    this.ejercicio = this.obtenerEjercicioDia(diaActual);
  }

  
  getYouTubeEmbedUrl(demostracion: string): SafeResourceUrl {
    const videoId = this.extractYouTubeVideoId(demostracion);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractYouTubeVideoId(url: string): string {
    const videoIdRegex = /[?&]v=([^&#]+)/;
    const match = url.match(videoIdRegex);
    return match && match[1] ? match[1] : '';
  }
  obtenerEjercicioDia(dia: string): any {
    let token = window.localStorage.getItem('token');
    if (token) {
      this.usuarioService.getData(token).subscribe((result: any) => {
        this.ejercicios = result[0].ejercicios;
        console.log("EJERCICIOS: ", this.ejercicios);
      });
    }else{
      this.router.navigate(["login"])
    }

  }
  
  diaActual = (fecha: Date): string=>{
    const opcionesFecha: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return fecha.toLocaleDateString('es-ES', opcionesFecha);
  }
  
}
