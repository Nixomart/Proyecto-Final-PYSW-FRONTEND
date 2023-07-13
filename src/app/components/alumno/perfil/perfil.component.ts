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
  constructor(
    private usuarioData: DatosUsuarioService,
    private usuarioService: UsuarioService,
    private alumnoService: AlumnoService,
    private router: Router
  ) {
    this.today = new Date();
  }
  ngOnInit() {
    let token = window.localStorage.getItem('token');
    if (token) {
      this.usuarioService.getData(token).subscribe((result: any) => {
        this.alumno = result[0];
        console.log("RESULTADO DE GET DATA USER RESEET PAGE: ",result);
        
      });
    }else{
      this.router.navigate(["login"])
    }
    /* 
    this.usuarioData.userData$.subscribe(userdata =>{
      console.log("USER DATA: ", userdata.alumno[0]);
      this.alumno = userdata.alumno[0]
      
    }) */
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
