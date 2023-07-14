import { Component } from '@angular/core';
import { GooService } from 'src/app/services/goo.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarioGoogle:any=null;
  idCalendario:string = "54fa1906b86afadc65b1dcaa5bbb4d0a38ec29cdacbbfda9e21a586aebb45e31%40group.calendar.google.com";
  fromDate: string="";
  toDate: string="";
  summary:string="";
  emailUser!:string;
  showIframe: boolean = false;
  event:any =
  {
    "kind": "calendar#event",
    "status": "confirmed",
    "summary": this.summary,
    "creator": {
      "email": "leonel19coraite@gmail.com"
    },
    "start": {
      "dateTime": "",
      "timeZone": "America/Argentina/Jujuy"
    },
    "end": {
      "dateTime": "",
      "timeZone": "America/Argentina/Jujuy"
    }
  }

  constructor(private gooService: GooService) {
    console.log(this.gooService.getToken());
    this.showIframe = true;
  }


  ngOnInit(): void {
    this.gooService.configureSingleSignOne();
  }

  login(){
    this.gooService.login()
  }

  logout(){
    this.gooService.logout();
  }
  verEventos(){
    idCalendario:String;
    this.gooService.getEvents(this.idCalendario).subscribe((result:any)=>{
      this.calendarioGoogle = result;
      alert(JSON.stringify(this.calendarioGoogle))
    },
    error=>{
      console.log(error)
    })
  }

  postEvent() {
    let fechafrom: Date = new Date(this.fromDate);
    let fechato: Date = new Date(this.toDate);

    // Verificar que las fechas y horas no estén vacías
    if (isNaN(fechafrom.getTime()) || isNaN(fechato.getTime())) {
      console.error('Fechas y horas no válidas');
      return;
    }

    // Convert dates to ISO 8601 strings
    let fromDateTime = fechafrom.toISOString();
    let toDateTime = fechato.toISOString();

    // Manipulate strings to get desired format
    fromDateTime = fromDateTime.replace('Z', '-03:00');
    toDateTime = toDateTime.replace('Z', '-03:00');

    // Actualizar el evento con las fechas y horas correctas
    this.event.start.dateTime = toDateTime;
    this.event.end.dateTime = fromDateTime;
    // this.event.start.dateTime = fromDateTime;
    // this.event.end.dateTime = toDateTime;
    this.event.summary = this.summary;

    console.log(this.event);

    this.gooService.createEvent(this.idCalendario, this.event).subscribe(
      (result: any) => {
        console.log(result);
        this.showIframe = true; // Mostrar el iframe
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // postEvent() {
  //   let fechafrom: Date = new Date(this.fromDate);
  //   let fechato: Date = new Date(this.toDate);

  //   // Verificar que las fechas y horas no estén vacías
  //   if (isNaN(fechafrom.getTime()) || isNaN(fechato.getTime())) {
  //     console.error('Fechas y horas no válidas');
  //     return;
  //   }

  //   // Restar 3 horas a las fechas y horas
  //   fechafrom.setHours(fechafrom.getHours() - 3);
  //   fechato.setHours(fechato.getHours() - 3);

  //   // Convertir las fechas a cadenas ISO 8601
  //   let fromDateTime = fechafrom.toISOString();
  //   let toDateTime = fechato.toISOString();

  //   // Actualizar el evento con las fechas y horas correctas
  //   this.event.start.dateTime = toDateTime;
  //   this.event.end.dateTime = fromDateTime;
  //   this.event.summary = this.summary;

  //   console.log(this.event);

  //   this.gooService.createEvent(this.idCalendario, this.event).subscribe(
  //     (result: any) => {
  //       console.log(result);
  //       this.showIframe = true; // Mostrar el iframe
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }




  //METODO interno que se utiliza para obtener el formato
  //que se requiere en la API de google Calendar. Ej. 2022-06-20T17:04:00-03:00
  toIsoString(date:Date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num:any) {
          return (num < 10 ? '0' : '') + num;
        };
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }

  token(){
    alert(this.gooService.getToken())
  }
}
