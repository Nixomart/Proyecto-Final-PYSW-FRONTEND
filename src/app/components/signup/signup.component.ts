import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  alumno: Alumno = new Alumno()
  rol:Rol = new Rol();
  constructor(private usuarioService: UsuarioService, private rolService:RolService ){
    //siempre cuando se registra tiene el valor de rol alumno
    // this.alumno.usuario.rol = '64aada555467cf7bcb2d5614'
    this.alumno.usuario.rol = this.rol;
  }

  public obtenerRol() {
    this.rolService.getRolRols().subscribe(
      (result: any) => {
        console.log(result);
        const rolAlumno = result.find((element: any) => element.nombreRol === "alumno");
        console.log(rolAlumno);
        if (rolAlumno) {
          this.rol = rolAlumno;
          console.log(this.rol);
        } else {
          console.log("No se encontró el rol 'alumno' en la respuesta del servicio.");
        }
      },
      (error: any) => {
        console.log("Error al obtener los roles:", error);
      }
    );
  }

  signup = () =>{
    console.log("RESULTADO REGISTRO: ", this.alumno)

    this.usuarioService.createAlumnoYUsuario(this.alumno).subscribe((result)=>{
      console.log("RESULTADO REGISTRO: ", result)
    })
  }
}
