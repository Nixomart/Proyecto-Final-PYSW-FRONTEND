import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  urlBase: string = "http://localhost:3000/api/alumno";

  constructor(private _http:HttpClient) { }

  public createAlumno(alumno: Alumno): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(alumno);
    return this._http.post(this.urlBase + "/", body, httpOptions);
  }

  public updateAlumno(alumno: Alumno): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(alumno);
    return this._http.put(this.urlBase + "/" + alumno._id, body, httpOptions);
  }
  public generarPlan(alumno:string, plan: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(plan);
    return this._http.post(this.urlBase + "/plan/"+ alumno +  body, httpOptions);
  }

  public setearAsistencia(alumno:string, plan: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    };
    
    let body = {
      asistencias: plan
    };
    console.log("ASISTENCIA EN SERVICE: ", body);
    return this._http.post(this.urlBase + "/asistencia/"+ alumno,  body, httpOptions);
  }


  public eliminarAlumno(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    };

    return this._http.delete(this.urlBase + "/" + id, httpOptions);
  }

  public getAlumnos():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
    }
    return this._http.get(this.urlBase + "/", httpOptions);
  }

  // Obtener alumno segun el ID

  public getAlumnoById(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase + "/detalle/" + id, httpOptions);
  }
}
