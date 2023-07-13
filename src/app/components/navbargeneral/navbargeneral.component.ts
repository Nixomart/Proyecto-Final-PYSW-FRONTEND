import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-navbargeneral',
  templateUrl: './navbargeneral.component.html',
  styleUrls: ['./navbargeneral.component.css']
})
export class NavbargeneralComponent {
  rol: any 
  constructor(private usuarioService: UsuarioService, private router:Router){
  }
  ngOnInit() {
    const token = window.localStorage.getItem("token")
    this.usuarioService.userOnly(token!).subscribe((result)=>{
      this.rol = result
      console.log("TOKEN: ", this.rol);
    })
    
  }
  signOut = ()=>{
    const token = window.localStorage.removeItem("token")
    this.router.navigate(["/home"])
  }
}
