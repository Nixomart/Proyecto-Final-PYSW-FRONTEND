import { Component } from '@angular/core';
import { PagoService } from 'src/app/services/pagos/pago.service';

@Component({
  selector: 'app-formulariopagosss',
  templateUrl: './formulariopagosss.component.html',
  styleUrls: ['./formulariopagosss.component.css']
})
export class FormulariopagosssComponent {

  pagoss: any
  constructor(private pagos: PagoService){
  this.getpagos()
}


getpagos= () =>{
  this.pagos.getPlanes().subscribe((result)=>{
    console.log(result);
    this.pagoss = result
    
  })
}
}
