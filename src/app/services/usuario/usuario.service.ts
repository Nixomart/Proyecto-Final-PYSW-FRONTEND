import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase: string = 'http://localhost:3000';
  constructor(private _http: HttpClient) {}

  
  //crear usuario y alumno
  public createAlumnoYUsuario(alumno: any): Observable<any> {
    console.log("DATOS EN EL SERVICE:", alumno);
    
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(alumno);
    return this._http.post(this.urlBase + "/api/usuario/create", body, httpOptions);
  }

  public ingresarUser = (user: Usuario) => {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    const nombreUsuario = user.nombreUsuario
    const password = user.password
    let body = {
      nombreUsuario, password
    }
    return this._http.post(this.urlBase + "/api/usuario/login", body);
  };
  
  //cuando resetea o se loguea la pagina obtiene los datos del usuario que se legeuo yo lo hice para alumnos
  //en el edpoint del back api/usuario/getuser esta el codigo pero solo para obtener la info del alumno
  //se puede hacer con los demas roles
  public getData = (token: string) =>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${token}`
      }),
      
      params: new HttpParams()
    };
    console.log("TOKEN EN GET DATA SERVICE: ", token)
    return this._http.get(this.urlBase + "/api/usuario/getUser", httpOptions);
  }

  //cuando resetea la pagina se llama a ese evento para verificar el token y dependiendo del token redirige ala pagina segun su rol
  //se usa en alumno perfil. se puede usar para los diferenes roles
  public userOnly = (token: string) =>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${token}`
      }),
      params: new HttpParams()
    };
    return this._http.get(this.urlBase + "/api/usuario/verify", httpOptions);
  }
}
