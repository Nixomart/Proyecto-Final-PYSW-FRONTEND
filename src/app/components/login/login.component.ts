import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { DatosUsuarioService } from 'src/app/services/datos/datos-usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  ngOnInit(){
    let token = window.localStorage.getItem("token")
    if(token){
      console.log("TOKEN EN LOGIN COMPOENNT: ", token);
      this.usuarioService.userOnly(token!).subscribe((result:any)=>{
        console.log(result);
        
        //hay dats {id: '64aaf46182be77453822e5a3', rol: 'alumno', iat: 1688940367}
         if(result.rol == 'alumno'){
          this.router.navigate(["alumno/perfil"])
         }
         if(result.rol == 'administrativo'){
          this.router.navigate(["administrador/lista-insumos"])
         }
         if(result.rol == 'entrenador'){
          this.router.navigate(["generarRutinas"])
         }
         
      })
    }else{
      console.log("NO HAY TOKEN NO HAY SESION");
      
    }
  }
  user: Usuario = new Usuario() 
  constructor(private usuarioService: UsuarioService, private datosUsuario: DatosUsuarioService, private router:Router){
    
  }
  
  login = () =>{
    console.log("USUARIO QUE QUIERE INGRESAR: ", this.user);
    this.usuarioService.ingresarUser(this.user).subscribe(
      
      (result:any)=>{
        if (result.rol.nombreRol === 'alumno') {
          this.datosUsuario.setUserData(result)
          this.router.navigate(["alumno/perfil"])
          window.localStorage.setItem("token", `Bearer ${result.token}`)
          console.log("LOGIN SUCCESS DATA: ", result);
        }
        if (result.rol.nombreRol === 'administrativo') {
          this.datosUsuario.setUserData(result)
          this.router.navigate(["administrador/lista-insumos"])
          window.localStorage.setItem("token", `Bearer ${result.token}`)
          console.log("LOGIN SUCCESS DATA: ", result);
        }
        if (result.rol.nombreRol === 'entrenador') {
          this.datosUsuario.setUserData(result)
          this.router.navigate(["alumno/perfil"])
          window.localStorage.setItem("token", `Bearer ${result.token}`)
          console.log("LOGIN SUCCESS DATA: ", result);
        }
        

        // PARA BORRAR TOKEN EN CONSOLE DE NAVEGADOR => window.localStorage.removeItem('token')
      }
    )
  }
}
