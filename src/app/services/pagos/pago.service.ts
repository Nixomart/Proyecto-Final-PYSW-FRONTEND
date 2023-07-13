import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  urlBase: string = "https://proyecto-final-pysw-backend.vercel.app/api/pagos";
  
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
