import { Component } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  alumno: Alumno = new Alumno()
  constructor(private usuarioService: UsuarioService ){
    this.alumno.usuario.rol = '64aada555467cf7bcb2d5614' //siempre cuando se registra tiene el valor de rol alumno
  }

  signup = () =>{
    console.log("RESULTADO REGISTRO: ", this.alumno)

    this.usuarioService.createAlumnoYUsuario(this.alumno).subscribe((result)=>{
      console.log("RESULTADO REGISTRO: ", result)
    })
  }
}
