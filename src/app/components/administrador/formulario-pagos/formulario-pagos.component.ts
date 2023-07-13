import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { InsumoService } from 'src/app/services/insumo.service';
import { MercadopService } from 'src/app/services/mercadop/mercadop.service';
import { PagoService } from 'src/app/services/pagos/pago.service';
import { PlanService } from 'src/app/services/plannes/plan.service';

@Component({
  selector: 'app-formulario-pagos',
  templateUrl: './formulario-pagos.component.html',
  styleUrls: ['./formulario-pagos.component.css'],
})
export class FormularioPagosComponent implements OnInit {
  categoriaActual: any = 'insumo';
  alumnos:any
  insumos: any
  alumno: any
  planes: any
  insumo:any
  qr:any
  enlace:any
  form = {
    precio: 0,
    descripcion: '',
    categoria: '',
    fecha: new Date(),
  };

  mp = {
    precio: 0,
    descripcion: ''
  }
  constructor(private pagoS:PagoService,private planS: PlanService, private alumnoS:AlumnoService, private mercadop: MercadopService, private insumoS: InsumoService) {
  this.getplanes()    
  this.getalumnos()
  this.getinsmo()
  }

  getplanes = () =>{
    this.planS.getPlanes().subscribe((result)=>{
      this.planes = result
    })
  }

  getalumnos = () =>{
    this.alumnoS.getAlumnos().subscribe((result)=>{
      this.alumnos = result
    })
  }
  generarqr = () =>{
    if (this.categoriaActual === 'PLAN MENSUAL') {
      this.mercadop.generarqrrr(this.mp).subscribe((result: any)=>{
        console.log("qrrr???: ", result);
        this.qr = result.message
        this.enlace = result.enlance
      })
    }else{
      const insumoad = this.insumos.filter((ins:any)=> ins._id == this.insumo)
      console.log("asdmaoisndoia: ",insumoad );
      
      this.mp ={descripcion: insumoad[0].nombre, precio: insumoad[0].stock}
      
      this.mercadop.generarqrrr(this.mp).subscribe((result: any)=>{
        console.log("qrrr???: ", result);
        this.qr = result.message
        this.enlace = result.enlance
      })
      
    }
  
  }

  ngOnInit(): void {}
  onCategoriaChange = (ca: string) => {
    this.categoriaActual = ca;
  };

  getinsmo = () =>{
    this.insumoS.getInsumos().subscribe((result)=>{
      console.log(result);
      this.insumos =result
    })
  }

  guardarplan=()=>{
    this.alumnoS.generarPlan(this.alumno, this.mp.descripcion).subscribe((result)=>{
      console.log("resultado de plan a  alumno: ", result);
      
    })
    
    if (this.categoriaActual === 'PLAN MENSUAL') {
      this.mp.descripcion = this.categoriaActual
      this.pagoS.createPago(this.mp).subscribe((result)=>{
        console.log(result);
        
      })
      console.log("PAGO A CREARR: ", this.mp);
      
    }else{
      const insumoad = this.insumos.filter((ins:any)=> ins._id == this.insumo)
      
      this.mp ={descripcion: insumoad[0].nombre, precio: insumoad[0].stock}
      console.log("PAGO A CREARR: ", this.mp);

      this.pagoS.createPago(this.mp).subscribe((result)=>{
        console.log(result);
        
      })
      
    }
  }
}
