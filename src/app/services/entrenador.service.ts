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
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(entrenador);
    return this._http.post(this.urlBase + "/", body, httpOptions);
  }

  public editEntrenador(entrenador: Entrenador): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(entrenador);
    return this._http.put(this.urlBase + "/" + entrenador._id, body, httpOptions);
  }

  public deleteEntrenador(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };

    return this._http.delete(this.urlBase + "/" + id, httpOptions);
  }

  public getEntrenadores():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
    }
    return this._http.get(this.urlBase + "/", httpOptions);
  }

  // Obtener entrenador segun el ID

  public getEntrenadorId(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase + "/detalle/" + id, httpOptions);
  }
}

