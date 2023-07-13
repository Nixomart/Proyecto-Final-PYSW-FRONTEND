import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  urlBase: string = "http://localhost:3000/api/pagos";
  
  constructor(private _http:HttpClient) { }

  public getPlanes():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
    }
    return this._http.get(this.urlBase + "/", httpOptions);
  }
  public createPago(pago: any):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
    }
    let body = pago
    return this._http.post(this.urlBase + "/", body, httpOptions);
  }
}
