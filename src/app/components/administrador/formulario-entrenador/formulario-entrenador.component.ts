import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrenador } from 'src/app/models/entrenador';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { EntrenadorService } from 'src/app/services/entrenador.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-formulario-entrenador',
  templateUrl: './formulario-entrenador.component.html',
  styleUrls: ['./formulario-entrenador.component.css']
})
export class FormularioEntrenadorComponent implements OnInit {

  entrenador:Entrenador;
  usuario:Usuario;
  accion:string = "";
  roles:Array<Rol>;
  rol: Rol;
  usuarios:Array<Usuario>;
  iduser:string;
  username!:string;
  user:any;

  constructor(private entrenadorService: EntrenadorService,
              private activaedRoute:ActivatedRoute,
              private router:Router,
              private usuarioService:UsuarioService,
              private rolService:RolService,
              ){
    this.entrenador = new Entrenador();
    this.usuario = new Usuario();
    this.rol = new Rol();
    this.roles = new Array<Rol>();
    this.usuarios = new Array<Usuario>();
    this.iduser = "";
    this.user = new Usuario();
  }
  submitted : boolean=false;

  public obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe((result: any) => {
      console.log(result);
      this.usuarios = [];
      result.forEach((element: any) => {
        let unUsuario: Usuario = new Usuario();
        Object.assign(unUsuario, element);
        this.usuarios.push(unUsuario);
      });
      console.log(this.usuarios); // Imprimir los usuarios obtenidos
    });
  }

  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerRol();
    this.obtenerUsuarios();
    console.log(this.rol);
    for(let i=0;i<this.roles.length;i++){
      if(this.roles[i].nombreRol == "entrenador"){
        this.rol = this.roles[i];
      }
    }
    this.activaedRoute.params.subscribe(params =>{
      if(params['id'] == 0){
        this.accion = "new";
      }
      else{
        this.accion = "update"
        this.cargarEntrenador(params['id']);
      }
    })
  }

  public obtenerRoles(){
    this.rolService.getRolRols().subscribe((result:any) => {
      console.log(result);
    })
  }

  public obtenerRol() {
    this.rolService.getRolRols().subscribe(
      (result: any) => {
        console.log(result);
        const rolEntrenador = result.find((element: any) => element.nombreRol === "entrenador");
        console.log(rolEntrenador);
        if (rolEntrenador) {
          this.rol = rolEntrenador;
          console.log(this.rol);
        } else {
          console.log("No se encontró el rol 'entrenador' en la respuesta del servicio.");
        }
      },
      (error: any) => {
        console.log("Error al obtener los roles:", error);
      }
    );
  }

  public cargarEntrenador(id: string){
    this.entrenadorService.getEntrenadorById(id).subscribe((result:any) => {
      Object.assign(this.entrenador, result)
    })
  }

  public cargarUsuario(id: string){
    this.usuarioService.getUsuarioById(id).subscribe((result:any) => {
      console.log(result)
      Object.assign(this.usuario, result);
      console.log(this.usuario)
    })
  }

  public confirmarModificacion(){
    this.entrenadorService.updateEntrenador(this.entrenador).subscribe((result:any) => {
      alert("entrenador modificado");
    })
    location.reload();
  }

  public crearEntrenador(){
    console.log(this.entrenador);
    console.log(this.usuarios);
    this.user =  this.usuarios[this.usuarios.length - 1];
    console.log(this.user);
    this.entrenador.usuario = this.user;
    this.entrenadorService.createEntrenador(this.entrenador).subscribe((result:any) => {
      console.log(result);
    });
    // location.reload();
  }

  public crearUsuario(){
    this.usuario.rol = this.rol;
    console.log(this.usuario);
    this.usuarioService.createUser(this.usuario).subscribe((result: any) => {
      console.log("-----USUARIO GUARDADO?-----");
      console.log(result);
    })
    this.obtenerUsuarios();
  }

  public confirmarAlta(){
    console.log("-------creando usuario-------")
    this.crearUsuario();
    this.obtenerUsuarios();
    console.log("-------creando entrenador-------")
    setTimeout(() => {
        this.crearEntrenador();
    }, 1000);
}

  public guardarEntrenador(){
    this.entrenador = new Entrenador();
    this.router.navigate(["administrador/formulario/entrenador", 0])

  }

  procesarForm(){
    this.submitted=true;
  }

}
