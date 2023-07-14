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

  chartLabels = ["Apple", "Microsoft", "Facebook", "Google"];

  chartTitle: ApexTitleSubtitle = {
    text: 'Leading Companies',
    align: 'center'
  };

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };

  datosBarChar!: ChartData<'bar'>;
  fechaInicio!: Date;
  fechaFin!: Date;
  arrayDatos!: Array<any>;
  arrayPagos!: Array<any>;
  filtrado!: Boolean;



  constructor(private cuotasService: CuotaService, private pagosService: PagoService) {
    this.arrayDatos = new Array<any>();
    this.obtenerPagos();
  }

  tempDataPagos = [
    { fecha: new Date("2022-03-25"), precio: 200 },
    { fecha: new Date("2022-04-25"), precio: 400 },
    { fecha: new Date("2022-04-25"), precio: 100 },
    { fecha: new Date("2022-07-25"), precio: 300 },
    { fecha: new Date("2022-08-25"), precio: 400 },
    { fecha: new Date("2022-11-25"), precio: 200 },
    { fecha: new Date("2022-12-25"), precio: 250 },
    { fecha: new Date("2022-12-25"), precio: 20 },
    { fecha: new Date("2023-01-25"), precio: 1100 },
    { fecha: new Date("2023-01-25"), precio: 2000 }
  ]

  filtrarFecha() {
     /* this.formatDate(this.fechaInicio)
    this.formatDate(this.fechaFin)  */
    if (this.fechaInicio < this.fechaFin) {
      let fechaInicio = new Date(this.fechaInicio);
      let fechaFin = new Date(this.fechaFin);

      this.filtrado = true;
      this.arrayDatos = this.arrayDatos.filter(pago => (pago.fecha > fechaInicio) && (pago.fecha < fechaFin));
      /* this.arrayDatos = this.arrayDatos.filter(pago => (pago.fecha >= new Date("2022-03-25")) && (pago.fecha <= new Date("2022-12-25"))); */
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

  private cargarDatosLabel(): Array<any> {
    let labels = new Array();
    for (let pago of this.arrayDatos) {
      let valor;
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
    /* if (this.tipoGrafico === "barra") {
      this.CargarGraficoBarras();
    }
    else if (this.tipoGrafico === "torta") {
      this.cargarGraficoTorta();
    }
    else if (this.tipoGrafico === "todos") {
      this.cargarGraficoTorta();
      this.CargarGraficoBarras();
    } */
  }

  private cargarDatos(labels: Array<any>): Array<number> {
    //Cargar valores por cada mes o anio
    let datos = new Array();
    for (let mesAnio of labels) {
      let valor = 0;
      for (let pago of this.arrayDatos) {
        if (this.tipoLabel === "year") {
          if (pago.fecha.getFullYear() === mesAnio) {
            valor++;
          }
        }
        else {
          if (pago.fecha.toLocaleString('es-ES', { month: 'long' }) === mesAnio) {
            valor++;
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
    let labels = this.cargarDatosLabel();
    //Cargar valores por cada mes o anio
    let datos = this.cargarDatos(labels);

    this.datosBarChar = {
      labels: labels,
      datasets: [
        { data: datos, label: "Pagos" }
      ]
    };
    this.chart?.update();
  }



  public cargarGraficoTorta(): void {
    //Labels inferiores, solo puede ser meses o anios
    let labels = this.cargarDatosLabel();

    //Cargar valores por cada mes o anio
    let datos = this.cargarDatos(labels);

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

  obtenerPagos(){
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
      },
      (error) => { console.log(error); }
    )
  }

  formatDate(date: Date): string {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    /* console.log(event, active); */
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    /* console.log(event, active); */
  }
}