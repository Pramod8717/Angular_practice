import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as Chartist from 'chartist';
import { Label } from 'ng2-charts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-internalpayerportal',
  templateUrl: './internalpayerportal.component.html',
  styleUrls: ['./internalpayerportal.component.css']
})
export class InternalpayerportalComponent implements OnInit {
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
  },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
            
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = [
    'New',
    'Due Today',
    '30 Days Past Due',
    '60 Days Past Due',
    '90 Days Past Due'
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public chartColors: Array<any>  = [
    { // all colors in order
      backgroundColor: ['#95e02e','#ffe133', '#27cdd8', '#6af71b', '#ff8bf5']
    }
]
  public barChartData: ChartDataSets[] = [
    { data: [23,6,10,15,20,25] }
  ];
  public searchList = new FormGroup({
    PONumber: new FormControl(''),
    Status: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    invoiceType: new FormControl('')
  })
  Duration = ['Last 3 Months','Last 6 Months','Last 9 Months','Last Year','None']
  poNumberList = ['Invoices','Invoices without PO','Unpaid Invoices']
  invoiceType = ['Unpaid Invoices','Invoices without PO']
  pipe: DatePipe;
  //dataSource = new MatTableDataSource <Element>(this.searchList);
  constructor() { }

 
  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
};
startAnimationForBarChart(chart){
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if(data.type === 'bar'){
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
    });

    seq2 = 0;
};
ngOnInit() {
    

    /* ----------==========    Unpaid Invoices Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['New', 'Due Today', '30 Days Past Due ', '60 Days Past Due', '90 Days Past Due'],
      series: [
        [22, 14, 10, 16, 4]

      ]
    };
    var optionswebsiteViewsChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 25,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    // var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    // this.startAnimationForBarChart(websiteViewsChart);
}


}
