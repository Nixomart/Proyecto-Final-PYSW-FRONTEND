import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadopService {
  urlBase: string = "https://proyecto-final-pysw-backend.vercel.app/api/mercadopago/crearpago";

  constructor(private _http:HttpClient) { }

  public generarqrrr(form: any):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    console.log("BODY SERVICE MPPPP:", form);
    
    let body = form
    return this._http.post(this.urlBase + "/", body,httpOptions);
  }
}
