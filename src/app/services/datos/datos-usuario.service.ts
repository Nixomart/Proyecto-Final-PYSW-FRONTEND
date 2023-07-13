import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosUsuarioService {
  //CONTEXTO GLOBAL DE LOS DATOS ASI CUANDO INGRESA EN EL LOGIN
  //LOS DATOS QUE OBTIENE EN EL LOGIN SON SETEADOS A ESTADI USERDATA PARA TENER LA INFO DEL USUARI CONECTADO
  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$ = this.userDataSubject.asObservable();
  constructor() { }
  setUserData(userData: any) {
    this.userDataSubject.next(userData);
  }
}
