import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  urlBase: string = "https://proyecto-final-pysw-backend.vercel.app/api/plan";

  constructor(private _http:HttpClient) { }

  public getPlanes():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
    }
    return this._http.get(this.urlBase + "/", httpOptions);
  }

  public createPlan(plan: Plan): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(plan);
    return this._http.post(this.urlBase + "/", body, httpOptions);
  }

  public modificarPlans(plans: Array<Plan>): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(plans);
    return this._http.post(this.urlBase + "/modificarPlans", body, httpOptions);
  }

  public updatePlan(plan: Plan): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };
    let body = JSON.stringify(plan);
    return this._http.put(this.urlBase + "/" + plan._id, body, httpOptions);
  }

  public eliminarPlan(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams()
    };

    return this._http.delete(this.urlBase + "/" + id, httpOptions);
  }

  public getPlans():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
    }
    return this._http.get(this.urlBase + "/", httpOptions);
  }

  // Obtener alumno segun el ID

  public getPlanById(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._http.get(this.urlBase + "/detalle/" + id, httpOptions);
  }

}
