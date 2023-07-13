import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  urlBase: string = "https://proyecto-final-pysw-backend.vercel.app/api/rol";
  // urlBase: string = "http://localhost:3000/api/rol";

  constructor(private _http:HttpClient) { }

  public createRolRol(rol:Rol): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(rol);
    return this._http.post(this.urlBase + "/", body, httpOptions);
  }

  public updateRolRol(rol:Rol): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(rol);
    return this._http.put(this.urlBase + "/" + rol._id, body, httpOptions);
  }

  public eliminarRolRol(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };

    return this._http.delete(this.urlBase + "/" + id, httpOptions);
  }

  public getRolRols():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
    }
    return this._http.get(this.urlBase + "/", httpOptions);
  }

  // Obtener alumno segun el ID

  public getRolRolById(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase + "/detalle/" + id, httpOptions);
  }

}
