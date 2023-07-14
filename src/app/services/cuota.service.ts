import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {
  /* urlBase: string = "https://proyecto-final-pysw-backend.vercel.app/api/cuota"; */
  urlBase: string = "http://localhost:3000/api/cuota";

  constructor(private _http:HttpClient) { }

  public getCuotas():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
    }
    return this._http.get(this.urlBase + "/", httpOptions);
  }

  public getCuotasFecha(fechaInicio: string, fechaFin: string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        "Authorization": `${window.localStorage.getItem("token")}`
      }),
    }
    let body= JSON.stringify({fechaInicio, fechaFin})
    return this._http.post(this.urlBase + "/fechas/", body, httpOptions);
  }  
}
