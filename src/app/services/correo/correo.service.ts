import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  urlBase: string = "https://proyecto-final-pysw-backend.vercel.app/api/correo";
  constructor(private _http:HttpClient) { }

  public enviarCorreo(pago: any):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
    }
    console.log("CORREO EN SERVICE: ",pago );
    let body = pago
    /* return this._http.post(this.urlBase + "/send-email", body, httpOptions); */
    return this._http.get(this.urlBase + "/")
  }
}
