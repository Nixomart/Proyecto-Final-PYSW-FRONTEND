import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Plan } from 'src/app/models/plan';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
import { PlanService } from 'src/app/services/plannes/plan.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.css'],
})
export class FormularioAlumnoComponent implements OnInit {
  alumno:Alumno;
  accion:string = "";
  planes:Array<Plan>;
  usuarios:Array<Usuario>;
  roles:Array<Rol> = new Array<Rol>();
  rol:Rol = new Rol();
  usuario:Usuario = new Usuario();
  id: string = "64ab6fa76a2c15a8d6a07475";
  user:Usuario = new Usuario();

  constructor(private alumnoService: AlumnoService,
    private activaedRoute:ActivatedRoute,
    private router:Router,
    private planService:PlanService,
    private usuarioService:UsuarioService,
    private rolService:RolService
    ){
    this.alumno = new Alumno();
    this.planes = new Array<Plan>();
    this.usuarios = new Array<Usuario>();
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

  public obtenerRolById(){
    this.rolService.getRolRolById(this.id).subscribe((result:any) => {
      this.rol = result;
      console.log(this.rol)
    })
  }

  ngOnInit(): void {
    this.mostrarPlanes();
    this.obtenerRoles();
    this.obtenerRol();
    this.obtenerUsuarios();
    console.log(this.rol);
    for(let i=0;i<this.roles.length;i++){
      if(this.roles[i].nombreRol == "alumno"){
        this.rol = this.roles[i];
      }
    }
    this.activaedRoute.params.subscribe(params =>{
      if(params['id'] == 0){
        this.accion = "new";
      }
      else{
        this.accion = "update"
        this.cargarAlumno(params['id']);
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


  public mostrarPlanes(){
    this.planService.getPlans().subscribe((result:any) => {
      console.log(result);
      this.planes = [];
      let unPlan : Plan = new Plan();
      result.forEach((element:any) => {
        Object.assign(unPlan, element);
        this.planes.push(unPlan);
        unPlan = new Plan();
      });
    })
  }

  public cargarAlumno(id: string){
    this.alumnoService.getAlumnoById(id).subscribe((result:any) => {
      Object.assign(this.alumno, result)
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
    this.alumnoService.updateAlumno(this.alumno).subscribe((result:any) => {
      alert("alumno modificado");
    })
    location.reload();
  }

  public crearAlumno(){
    console.log(this.alumno);
    this.user =  this.usuarios[this.usuarios.length - 1];
    console.log(this.user);
    this.alumno.usuario = this.user;
    this.alumno.fechaInicio = new Date();
    this.alumnoService.createAlumno(this.alumno).subscribe((result:any) => {
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
    console.log("-------creando alumno-------")
    setTimeout(() => {
        this.crearAlumno();
    }, 1000);
}

  public guardarAlumno(){
    this.alumno = new Alumno();
    this.router.navigate(["administrador/formulario/alumno", 0])

  }

  procesarForm(){
    this.submitted=true;
  }
}
