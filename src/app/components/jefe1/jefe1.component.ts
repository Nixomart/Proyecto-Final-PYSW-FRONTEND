import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { CuotaService } from 'src/app/services/cuota.service';
import { PagoService } from 'src/app/services/pagos/pago.service';
import { Pago } from 'src/app/models/pago';
/* import { CuotasService } from 'src/app/services/cuotas.service'; */

@Component({
  selector: 'app-jefe1',
  templateUrl: './jefe1.component.html',
  styleUrls: ['./jefe1.component.css']
})

export class Jefe1Component implements OnInit {

  //barra
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  datosTorta: ApexNonAxisChartSeries = [];
  labelsTorta!: Array<any>;
  tituloTorta: ApexTitleSubtitle = {
    text: 'Pagos',
    align: 'center'
  };

  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  };

  chartTitle: ApexTitleSubtitle = {
    text: 'Leading Companies',
    align: 'center'
  };

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };

  datosBarChar!: ChartData<'bar'>;
  datosBarCharIng!: ChartData<'bar'>;
  fechaInicio!: Date;
  fechaFin!: Date;
  arrayDatos!: Array<any>;
  arrayPagos!: Array<any>;
  filtrado!: Boolean;



  constructor(private cuotasService: CuotaService, private pagosService: PagoService) {
    this.arrayDatos = new Array<any>();
    this.arrayPagos = new Array<any>();
    this.obtenerPagos();
    
  }

  //filtro por fecha
  filtrarFecha() {
    if (this.fechaInicio < this.fechaFin) {
      let fechaInicio = new Date(this.fechaInicio);
      let fechaFin = new Date(this.fechaFin);

      this.filtrado = true;
      this.arrayDatos = this.arrayDatos.filter(pago => (pago.fecha > fechaInicio) && (pago.fecha < fechaFin));
      this.limpiarFechas();
    }
  }

  limpiarFechas() {
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
  }

  ngOnInit(): void {

  }

  tipoLabel!: string; // meses, year
  tipoEstadistica!: string; //pagos, ingresos alumnos, ingreso dinero, asistencias
  tipoGrafico: string = "barra"; // barra, torta

  private cargarDatosLabel(datos: Array<any>): Array<any> {
    let labels = new Array();
    for (let pago of datos) {
      let valor;
      let currentYear;
      
      if (this.tipoLabel === "year") {
        valor = pago.fecha.getFullYear();
      }
      else {
        valor = pago.fecha.toLocaleString('es-ES', { month: 'long' });
      }

      if (!labels.includes(valor)) {
        labels.push(valor);
      }
    }
    return labels;
  }

  public actualizarGraficos() {
    this.obtenerPagos();
  }

  private cargarDatos(labels: Array<any>, datosBD: Array<any>, acumular: string): Array<number> {
    //Cargar valores por cada mes o anio
    let datos = new Array();
    for (let mesAnio of labels) {
      let valor = 0;
      for (let pago of datosBD) {
        if (this.tipoLabel === "year") {
          if (pago.fecha.getFullYear() === mesAnio) {
            valor = acumular == 'cantidad' ? valor + 1 : pago.precio;
          }
        }
        else {
          if (pago.fecha.toLocaleString('es-ES', { month: 'long' }) === mesAnio) {
            valor = acumular == 'cantidad' ? valor + 1 : pago.precio;
          }
        }
      }

      //Se guarda el valor
      datos.push(valor);
    }

    return datos;
  }

  public CargarGraficoBarras(): void {

    this.filtrarFecha();
    //Labels inferiores, solo puede ser meses o anios
    let labels = this.cargarDatosLabel(this.arrayDatos);
    //Cargar valores por cada mes o anio
    let datos = this.cargarDatos(labels, this.arrayDatos, 'cantidad');

    this.datosBarChar = {
      labels: labels,
      datasets: [
        { data: datos, label: "Pagos" }
      ]
    };
    this.chart?.update();
  }

  public CargarGraficoLineas(): void {

    this.filtrarFecha();
    //Labels inferiores, solo puede ser meses o anios
    let labels = this.cargarDatosLabel(this.arrayDatos);
    //Cargar valores por cada mes o anio
    let datos = this.cargarDatos(labels, this.arrayDatos, 'precio');

    this.datosBarCharIng = {
      labels: labels,
      datasets: [
        { data: datos, label: "Ingresos" }
      ]
    };
    this.chart?.update();
  }


  public cargarGraficoTorta(): void {
    //Labels inferiores, solo puede ser meses o anios
    let labels = this.cargarDatosLabel(this.arrayDatos);

    //Cargar valores por cada mes o anio
    let datos = this.cargarDatos(labels, this.arrayDatos, 'cantidad');

    this.labelsTorta = labels;
    this.datosTorta = datos;

  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartTypeIng: ChartType = 'line';



  obtenerPagos() {
    this.pagosService.getPagos().subscribe(
      (result) => {
        //console.log(result);
        this.arrayDatos = new Array<any>();
        result.forEach((pago: Pago) => {
          var aux: Pago = new Pago();
          Object.assign(aux, pago);
          aux.fecha = new Date(aux.fecha);
          this.arrayDatos.push(aux);
        });
        this.CargarGraficoBarras();
        this.cargarGraficoTorta();
        this.CargarGraficoLineas();
      },
      (error) => { console.log(error); }
    )
  }

  obtenerPagos2() {
    this.pagosService.getPagos().subscribe(
      (result) => {
        //console.log(result);
        this.arrayDatos = new Array<any>();
        result.forEach((pago: Pago) => {
          var aux: Pago = new Pago();
          Object.assign(aux, pago);
          aux.fecha = new Date(aux.fecha);
          this.arrayPagos.push(aux);
        });
        this.CargarGraficoBarras();
        this.cargarGraficoTorta();
      },
      (error) => { console.log(error); }
    )
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    /* console.log(event, active); */
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    /* console.log(event, active); */
  }
}