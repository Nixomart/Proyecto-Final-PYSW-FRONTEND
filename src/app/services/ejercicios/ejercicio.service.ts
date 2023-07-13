import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {
  urlBase: string = "https://proyecto-final-pysw-backend.vercel.app/api/ejercicio";
  constructor(private _http:HttpClient) { }

  public generarEjercicio(alumno: any, ejercicio:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    console.log("EJERCIOS EN SERVICE!!!!!!!!! : ", ejercicio)
    let body = ejercicio;
    return this._http.post(this.urlBase + "/asignarRutina/"+ alumno._id, body, httpOptions);
  }
}
