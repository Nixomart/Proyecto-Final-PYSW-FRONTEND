import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entrenador } from '../models/entrenador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  urlBase: string = "https://proyecto-final-pysw-backend.vercel.app/api/entrenador";

  constructor(private _http:HttpClient) { }

  public createEntrenador(entrenador: Entrenador): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(entrenador);
    return this._http.post(this.urlBase + "/", body, httpOptions);
  }

  public updateEntrenador(entrenador: Entrenador): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(entrenador);
    return this._http.put(this.urlBase + "/" + entrenador._id, body, httpOptions);
  }

  public eliminarEntrenador(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
      params: new HttpParams()
    };

    return this._http.delete(this.urlBase + "/" + id, httpOptions);
  }

  public getEntrenadors():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        // "Authorization": `${window.localStorage.getItem("token")}`
      }),
    }
    return this._http.get(this.urlBase + "/", httpOptions);
  }

  // Obtener entrenador segun el ID

  public getEntrenadorById(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase + "/detalle/" + id, httpOptions);
  }
}

