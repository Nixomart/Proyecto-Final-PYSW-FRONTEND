import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { CuotasService } from 'src/app/services/cuotas.service';

@Component({
  selector: 'app-jefe1',
  templateUrl: './jefe1.component.html',
  styleUrls: ['./jefe1.component.css']
})

export class Jefe1Component implements OnInit {

  userChartSeries: ApexNonAxisChartSeries = [];
  chartSeries: ApexNonAxisChartSeries = [];

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

  ngOnInit(): void { }

  createChart(): void {
    //this.chartSeries = [...this.userChartSeries];
    //this.chartSeries = this.userChartSeries.slice();
    this.userChartSeries = [50, 20, 30, 45]; // Aquí puedes cargar los datos dinámicamente
  this.chartSeries = this.userChartSeries;
  
  }
  formData = {
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
  };
  updateChart(): void {
  this.userChartSeries = [
    this.formData.value1,
    this.formData.value2,
    this.formData.value3,
    this.formData.value4,
  ];
  this.chartSeries = this.userChartSeries;
}
  //barra
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
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

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }
  ///Manejar de cuotas
  constructor(private cuotasService: CuotasService) { }
  public obtenerCuotas(): void {
    this.cuotasService.getCuotas().subscribe(
      (response: any) => {
        // Aquí puedes acceder a los datos de la respuesta
        console.log(response);
        // Realiza las operaciones necesarias con los datos
      },
      (error: any) => {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error(error);
      }
    );
  }

  //Manejar asistencia de Alumnos:
  
}