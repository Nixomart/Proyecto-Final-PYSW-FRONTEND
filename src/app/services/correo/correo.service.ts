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
    let body = {
      nombre: pago.nombre,
      username: pago.usuario.nombreUsuario,
      password: pago.usuario.password,
      emailTo: pago.email
    }
    return this._http.post(this.urlBase + "/send-email", body, httpOptions);
  }
}
