import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as Chartist from 'chartist';
import { Label, ThemeService } from 'ng2-charts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { saveAs } from 'file-saver';
import { InternalportalserviceService } from 'app/services/internalportal/internalportalservice.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { PopupComponent } from '../../../commoncomponents/popup/popup.component';
import { runInThisContext } from 'vm';
import { isRegExp } from 'util';
declare var $: any;
import * as moment from 'moment/moment';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
// import { Moment } from 'moment/moment';
// import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
@Component({
  selector: 'app-internalportaldashboard',
  templateUrl: './internalportaldashboard.component.html',
  styleUrls: ['./internalportaldashboard.component.css']
})
export class InternalportaldashboardComponent implements OnInit {
  statusList: any = [];
  poDataList: any = [];
  invoicedetailsList: any = [];
  customManagerList: any = [];
  colleaguesList;
  colleaguesDataList: Array<colleaguesList> = [];
  selectedColleaguesList: Array<colleaguesList> = [];
  isemailExists: Boolean = false;
  tempPurchaseList: any = [];
  tempPlantList: any = [];
  selectedPage: any;
  fromdateofpo: string = "NA";
  todateofpo: string = "NA";
  mindate: any;
  maxdate: any;
  disable: boolean = false;
  disableprevious: boolean = false;
  disablenext: boolean = false;
  todateerror: boolean = false;
  fromdateerror: boolean = false;
  statList: any;
  statListforpo: any;
  statusValue: any;
  requisitioner: any;
  popaginationnumber = 1;
  enduserstatuslist: { id: string; status: string; value: string; }[];
  managerstatuslist: { status: string; value: string; }[];
  currstatus: string = 'P';
  internalpaginationpagenumber: number = 1;
  totalItems: any;
  endpagenumber: number = 1;
  pageSize = 50;
  pgNolist: any = [];
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

  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#95e02e', '#ffe133', '#27cdd8', '#6af71b', '#ff8bf5']
    }
  ]
  public barChartData: ChartDataSets[] = [
    { data: [23, 6, 10, 15, 20, 25] }
  ];
  public searchList = new FormGroup({
    PONumber: new FormControl(''),
    Status: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    modeType: new FormControl(''),
    Plant: new FormControl(''),
    ByFunction: new FormControl(''),
    PurchaseGroup: new FormControl(''),
    Requisitioner: new FormControl(''),
    RequisitionerName: new FormControl(''),
    InvoiceAmount: new FormControl(''),
    invoicemin: new FormControl(''),
    invoicemax: new FormControl(''),
    pomin: new FormControl('0'),
    pomax: new FormControl('5000000'),
    Ageing: new FormControl(''),
    Category: new FormControl(''),
    poType: new FormControl(''),
    InvNumber: new FormControl(''),
    managerdata: new FormControl(''),
    Vendor: new FormControl(''),
    Purchasegroup: new FormControl(''),
    selected: new FormControl({ startDate: moment.isMoment, endDate: moment.isMoment }),
    // invoiceType: new FormControl('')
  })
  public POOrderList = new FormGroup({
    PONumber: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required)
  })
  Duration = ['Last 3 Months', 'Last 6 Months', 'Last 9 Months', 'Last Year', 'None']
  POTypeList: any = []
  modeList = ['Invoices', 'PO']
  invoiceType = ['Unpaid Invoices', 'Invoices without PO']
  // StatusList =['Approved','New','Pending','Returned','On Hold','Processed','Partially Paid','Paid','Submitted','']
  List = ['15 days', 'More than 90 days']
  categoryList = ['Consumubles']
  InvoiceAmountList = ['Below 100000', 'Below 50000', 'Below 25000']
  PurchasingGroupList: any = [];
  PlantList: any = [];
  FunctionList = ['IT']
  pipe: DatePipe;
  email: string;
  invoiceMode: boolean = false;
  poMode: boolean = false;
  //dataSource = new MatTableDataSource <Element>(this.searchList);
  searchColleagues;
  disableoff: boolean = false;
  emailid: string;
  plantpresent: boolean;
  durationpresent: boolean;
  ponumberpresent: boolean;
  fromtodatepresent: boolean;
  filteredponumberData: any[];
  filtereddurationData: any[];
  filtereddate: any[];
  durationfromdate: string;
  durationtodate: string;
  fromdateofduration: string = "NA";
  todateofduration: string = "NA";
  ponum: any;
  mintodate: Date;
  filterpodatalist: any;
  _currentValues: number[];
  // @ViewChild(DaterangepickerDirective, { static: true }) picker: DaterangepickerDirective;
  // selected: { startDate: moment.Moment, endDate: moment.Moment };
  vendorList: any[];
  purchasegroupList: any[];
  purchaseList: any[];
  modelist: { key: string; name: string; }[];
  ageingList: { key: string; name: string; }[];
  invoicestatusList: { stype: string; value: string; }[];
  postatusList: { stype: string; value: string; }[];
  invalue = "NA";
  selectedPlant = "NA"
  purchvalue = "NA"
  invAmount = "NA"
  status = "NA"
  ageingfrom = "NA"
  ageingto = "NA"
  invoicepopaginationnumber = 1
  invamountfrom: string = "NA ";
  invamountto: string = "NA";
  povalue: any = "NA";
  plant: any = "NA";
  invpoamountfrom: string = "NA";
  invpoamountto: string = "NA";
  vendor: string = "NA";
  submitted: boolean = false;
  DecodedFile: any = [];
  extensionType: any;
  error: boolean = false;
  subceed: boolean = false;
  empty: boolean = false;
  invoiceCountAsPerStatus: any = [];
  pendingPo: number = 0;
  poCountAsPerStatus: any = [];
  tempPlantList1: any = [];
  // statList: { stype: string; value: string; }[];
  // popaginationnumber: number;
  // fromdateofpo: string;
  // todateofpo: string;
  // statusValue: any;
  // requisitioner: string;
  // enduserstatuslist: { id: string; status: string; value: string; }[];
  // managerstatuslist: { status: string; value: string; }[];
  // internalpaginationpagenumber: number;
  // disableprevious: boolean;
  // currstatus: any;
  // totalItems: any;
  // endpagenumber: number;
  // disablenext: boolean=true;
  // pageSize: number;
  constructor(private loaderservice: LoaderService,
    private internalportalservice: InternalportalserviceService,
    private route: ActivatedRoute, public dialog: MatDialog,
    private internalportalserviceService: InternalportalserviceService,
    private purchaseOrderListService: PurchaseOrderListService,
    private router: Router,
    private trackOrderListService: TrackOrderListService,
    private activatedRoute: ActivatedRoute,
    private renderer:Renderer2 ) { }

  // startAnimationForLineChart(chart) {
  //   let seq: any, delays: any, durations: any;
  //   seq = 0;
  //   delays = 80;
  //   durations = 500;

  //   chart.on('draw', function (data) {
  //     if (data.type === 'line' || data.type === 'area') {
  //       data.element.animate({
  //         d: {
  //           begin: 600,
  //           dur: 700,
  //           from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
  //           to: data.path.clone().stringify(),
  //           easing: Chartist.Svg.Easing.easeOutQuint
  //         }
  //       });
  //     } else if (data.type === 'point') {
  //       seq++;
  //       data.element.animate({
  //         opacity: {
  //           begin: seq * delays,
  //           dur: durations,
  //           from: 0,
  //           to: 1,
  //           easing: 'ease'
  //         }
  //       });
  //     }
  //   });

  //   seq = 0;
  // };
  // startAnimationForBarChart(chart) {
  //   let seq2: any, delays2: any, durations2: any;

  //   seq2 = 0;
  //   delays2 = 80;
  //   durations2 = 500;
  //   chart.on('draw', function (data) {
  //     if (data.type === 'bar') {
  //       seq2++;
  //       data.element.animate({
  //         opacity: {
  //           begin: seq2 * delays2,
  //           dur: durations2,
  //           from: 0,
  //           to: 1,
  //           easing: 'ease'
  //         }
  //       });
  //     }
  //   });

  //   seq2 = 0;
  // };
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  ngOnInit() {

    this.ageingList = [
      { key: 'NA', name: 'ALL' },
      { key: '0-5', name: 'From 0 to 5 days' },
      { key: '0-5', name: 'From 5 to 10 days' },
      { key: '0-5', name: 'From 10 to 15 days' },
      { key: '0-5', name: 'From 15 to 30 days' },
      { key: '0-5', name: '30 days and above' }
    ]

    this.invoicestatusList = [
      { stype: 'ALL', value: 'ALL' },
      { stype: 'Pending', value: 'P' },
      { stype: 'Approved', value: 'A' },
      // { stype: 'New', value: 'N' },
      { stype: 'Returned', value: 'V' },
      { stype: 'On Hold', value: 'O' },
      { stype: 'Processed', value: 'PRO' },
      { stype: 'Partially Paid', value: 'PP' },
      { stype: 'Paid', value: 'PD' },
      // { stype: 'Submitted', value: 'S' }
    ];

    this.postatusList = [
      { stype: 'ALL', value: 'ALL' },
      { stype: 'New PO', value: 'N' },
      { stype: 'Accepted', value: 'A' },
      { stype: 'Work In Progress', value: 'P' },
      { stype: 'Shipped', value: 'S' },
      { stype: 'Complete', value: 'C' },
    ]
    this.activatedRoute.queryParams.subscribe(params => {
      let productid = params['productid'];
      console.log(productid); // Print the parameter to the console. 
  
    if(productid)
    {
    //   localStorage.setItem('options',this.invalue+"_"+this.povalue+"_"+this.status+"_"+this.fromdateofduration+"_"
    // +this.todateofduration+"_"+this.plant+"_"+this.purchvalue+"_"+this.requisitioner+"_"+this.invpoamountfrom+"_"
    // +this.invpoamountto+"_"+this.ageingfrom+"_"+this.ageingto+"_"+this.vendor);
      this.loaderservice.show();
      var details = localStorage.getItem('options');
      var spliteddetails = details.split('_');
      
      this.invalue = spliteddetails[0];
      if(this.invalue != "NA" && this.invalue != "" && this.invalue != null && this.invalue != "null")
      {
        this.searchList.controls.InvNumber.setValue(this.invalue);
      }
      this.povalue = spliteddetails[1];
      if(this.povalue != "NA" && this.povalue != "" && this.povalue != null && this.povalue != "null")
      {
        this.searchList.controls.PONumber.setValue(this.povalue);
      }
      this.status = spliteddetails[2];
      if(this.status != "NA" && this.status != "" && this.status != null && this.status != "null")
      {
        for(var a = 0 ;a<this.invoicestatusList.length;a++){
          if(this.status == this.invoicestatusList[a].value)
          {
            console.log("this.status "+this.status);
            this.searchList.controls.Status.setValue(this.invoicestatusList[a].stype); 
          }
        }
        console.log("this.status "+this.status);
      }
      this.fromdateofduration = spliteddetails[3];
      if(this.fromdateofduration != "NA" && this.fromdateofduration != "" && this.fromdateofduration != null && this.fromdateofduration != "null")
      {
//         let dateString = 'this.fromdateofduration';  
// let momentVariable = moment(dateString, 'DD/MM/YYYY');  
// let stringvalue = momentVariable.format('DD/MM/YYYY');   
// console.log(stringvalue);
// console.log(moment(new Date(this.fromdateofduration)).format("DD/MM/YYYY").trim());
        this.searchList.controls.fromDate.setValue(moment(new Date(this.fromdateofduration)).format("DD/MM/YYYY").trim());
        // moment(new Date(this.fromdateofduration)).format("DD/MM/YYYY").trim();
      }
      this.todateofduration = spliteddetails[4];
      
      if(this.todateofduration != "NA" && this.todateofduration != "" && this.todateofduration != null && this.todateofduration != "null")
      {
        console.log("this.todateofduration =>"+this.todateofduration);
        this.searchList.controls.toDate.setValue(moment(new Date(this.todateofduration)).format("DD/MM/YYYY"));
      }
      this.plant = spliteddetails[5];
       if(this.plant != "NA" && this.plant != "" && this.plant != null && this.plant != "null")
      {
        this.internalportalservice.getPlanCode(this.plant).subscribe(res => {
          this.tempPlantList1 = res[0].grnbasedonpo;
          for(var b=0;b<this.tempPlantList1.length;b++)
          {
            if(this.plant ==  this.tempPlantList1[b].PLANTCODE)
            {
              this.searchList.controls.Plant.setValue(this.tempPlantList1[b].PLANTNAME);
            }
          }
        });
        // this.searchList.controls.Purchasegroup.setValue(this.purchvalue);
      }
      this.purchvalue = spliteddetails[6];
      if(this.purchvalue != "NA" && this.purchvalue != "" && this.purchvalue != null && this.purchvalue != "null")
      {
        this.searchList.controls.Purchasegroup.setValue(this.purchvalue);
      }
      this.requisitioner = spliteddetails[7];
      if(this.requisitioner != "NA" && this.requisitioner != "" && this.requisitioner != null && this.requisitioner != "null")
      {
        this.searchList.controls.Requisitioner.setValue(this.requisitioner);
      }
      this.invamountfrom = spliteddetails[8];
      if(this.invamountfrom != "NA" && this.invamountfrom != "" && this.invamountfrom != null && this.invamountfrom != "null")
      {
        this.searchList.controls.invoicemin.setValue(this.invamountfrom);
      }
      this.invamountto = spliteddetails[9];
      if(this.invamountto != "NA" && this.invamountto != "" && this.invamountto != null && this.invamountto != "null")
      {
        this.searchList.controls.invoicemax.setValue(this.invamountto);
      }
      this.ageingfrom = spliteddetails[10];
      if(this.ageingfrom != "NA" && this.ageingfrom != "" && this.ageingfrom != null && this.ageingfrom != "null")
      {
        this.ageingto = spliteddetails[11];
        if(this.ageingfrom != "30")
        {
          var ageinggap = "From "+this.ageingfrom+" to "+this.ageingto+" days";
        }
        else
        {
          var ageinggap = this.ageingfrom+" days and above";
        }
        console.log("ageinggap =>"+ageinggap);
        this.searchList.controls.Ageing.setValue(ageinggap);
       
        // this.ageingList = [
        //   { key: 'NA', name: 'ALL' },
        //   { key: '0-5', name: 'From 0 to 5 days' },
        //   { key: '0-5', name: 'From 5 to 10 days' },
        //   { key: '0-5', name: 'From 10 to 15 days' },
        //   { key: '0-5', name: 'From 15 to 30 days' },
        //   { key: '0-5', name: '30 days and above' }
        // ]
        // this.searchList.controls.Vendor.setValue(this.ageingfrom);
      }
      this.vendor = spliteddetails[12];
       if(this.vendor != "NA" && this.vendor != "" && this.vendor != null && this.vendor != "null")
      {
        this.searchList.controls.Vendor.setValue(this.vendor);
      }

      this.internalportalservice.getinternalSearchdata(this.invalue, this.povalue, this.status, this.fromdateofduration, this.todateofduration,
        this.plant, this.purchvalue, this.requisitioner, this.invpoamountfrom, this.invpoamountto, this.ageingfrom, this.ageingto,
        '1', this.vendor).subscribe(res => {
          this.loaderservice.hide();
          if(res[0].invoiceCountAsPerStatus)
          {
            this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
              this.pendingPo = this.invoiceCountAsPerStatus.M;
            }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = this.invoiceCountAsPerStatus.P;
            }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = 0;
            }else{
              this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            }
          }
          if (res[0].message == 'Success') {
            console.log(res, 'response of search')
            this.invoicedetailsList = res[0].invoicedetails;
            this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
            if (Number(res[0].invoicedetailsrecords) / this.invoicepopaginationnumber <= this.pageSize) {
              this.disablenext = true;
            }
            else {
              this.disablenext = false;
            }

            setTimeout(() => {
              for (var k = 0; k < this.invoicedetailsList.length; k++) {
                 if (this.statusList.length != 0) {

                  for (var j = 0; j < this.statusList.length; j++) {
                    if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoicedetailsList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoicedetailsList[k]['PONUMBER']) {
                      console.log("insise A--------------------------==============", this.invoicedetailsList[k]['INVOICENUMBER'])
                      $("#green" + k).addClass('displayBlock');
                      $("#white" + k).addClass('displayNone');
                      $("#white" + k).removeClass('displayBlock');

                    }
                    else {
                      //$("#green" + k).addClass('displayNone');
                      $("#white" + k).addClass('displayBlock');
                    }
                  }
                }
                else {
                  $("#white" + k).addClass('displayBlock');
                }

              }
            }, 500);
          }
        });

    }
  });
    // this.searchList.value.selected.startDate.set

    // this.searchList.controls.selected.startDate.setValue(this.rawinvoicenumber);
    this.disableoff = false;
    this.getstatus();
    this.getmessageStatus();
    this.invoiceMode = true;
    // $("#invoicemax").val('50000000');
    // $("#invoicemin").val('0');
    // $("#pomin").val('50000000');
    // $("#pomax").val('0');
    // this.searchList.controls.invoicemax.setValue("5000000");
    // this.searchList.controls.invoicemin.setValue("0");
    // this.searchList.controls.pomin.setValue("0");
    // this.searchList.controls.pomax.setValue("5000000");
    this.emailid = sessionStorage.getItem("username");
    this.route.queryParams.subscribe(params => {
      this.searchList.controls.modeType.setValue("INVOICE");
      // this.searchList.controls.poType.setValue("With PO");
      // this.searchList.controls.Status.setValue("ALL");
      // this.searchList.controls.Plant.setValue("C00010");
      // this.searchList.controls.InvoiceAmount.setValue("Below 1 Lakhs");
      // this.searchList.controls.PurchaseGroup.setValue("IT");
      // this.searchList.controls.Ageing.setValue("15 days & above");
      this.searchList.controls.Category.setValue("Consumubles");
      this.searchList.controls.ByFunction.setValue("IT");
      console.log("what are the ?", params); // { order: "popular" }
      this.email = params.orderNo

      // this.statList = [
      //   { stype: '1L', value: 'Below 1 lakhs' },
      //   { stype: 'New', value: 'N' },
      //   { stype: 'Pending', value: 'P'},
      //   { stype: 'Returned', value: 'R'},
      //   { stype: 'On Hold', value: 'O' },
      //   { stype: 'Processed', value: 'PRO'},
      //   { stype: 'Partially Paid', value: 'PP' },
      //   { stype: 'Paid', value: 'P' },
      //   { stype: 'Submitted', value: 'S' }
      // ];
    });

    /* ----------==========    Unpaid Invoices Chart initialization    ==========---------- */
    // sessionStorage.setItem("portaltype","innerportal");
    // var datawebsiteViewsChart = {
    //   labels: ['New', 'Due Today', '30 Days Past Due ', '60 Days Past Due', '90 Days Past Due'],
    //   series: [
    //     [22, 14, 10, 16, 4]

    //   ]
    // };
    // var optionswebsiteViewsChart = {
    //   axisX: {
    //     showGrid: false
    //   },
    //   low: 0,
    //   high: 25,
    //   chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    // };
    // var responsiveOptions: any[] = [
    //   ['screen and (max-width: 640px)', {
    //     seriesBarDistance: 5,
    //     axisX: {
    //       labelInterpolationFnc: function (value) {
    //         return value[0];
    //       }
    //     }
    //   }]
    // ];
    // var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    // this.startAnimationForBarChart(websiteViewsChart);
  }

  openAdavnceSearch() {
    let advanceSearcBox = document.getElementById("advanceSearcBox");
    let closeArrow = document.getElementById("closeArrow");
    let openArrow = document.getElementById("openArrow");
    if (advanceSearcBox.style.display === "none") {
      advanceSearcBox.style.display = "block";
      closeArrow.style.display = "block";
      openArrow.style.display = "none";
    } else {
      advanceSearcBox.style.display = "none";
      openArrow.style.display = "block";
      closeArrow.style.display = "none";
    }
  }
  setMode(event) {
    this.invoicedetailsList = [];
    this.poDataList = [];
    this.disableprevious = true;
    this.disablenext = true;
    this.disable = false;
    this.error = false;
    this.subceed = false;
    this.empty = false;
    if (event.value == 'INVOICE') {
      this.ResetData();
      this.invoiceCountAsPerStatus = [];
      this.pendingPo = 0;
      this.searchList.controls.modeType.setValue("INVOICE");
      this.invoiceMode = true;
      this.poMode = false;
    }
    else if (event.value == 'PO') {
      this.ResetData();
      this.searchList.controls.modeType.setValue("PO");
      this.poMode = true;
      this.invoiceMode = false;
    }
  }

  getInvDetails(invoicenumber, ponumber) {
    localStorage.removeItem('options');
    // this.invalue, this.povalue, this.status, this.fromdateofduration, this.todateofduration,
    // this.plant, this.purchvalue, this.requisitioner, this.invpoamountfrom, this.invpoamountto, 
    // this.ageingfrom, this.ageingto, this.vendor
    localStorage.setItem('options',this.invalue+"_"+this.povalue+"_"+this.status+"_"+this.fromdateofduration+"_"
    +this.todateofduration+"_"+this.plant+"_"+this.purchvalue+"_"+this.requisitioner+"_"+this.invpoamountfrom+"_"
    +this.invpoamountto+"_"+this.ageingfrom+"_"+this.ageingto+"_"+this.vendor);
    this.router.navigate(['./internaltrackinvoicedetails'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber),origin:btoa('internaldashboard') } });
  }

  callDynamicData() {

    if (this.searchList.value.Requisitioner != null && this.searchList.value.Requisitioner != undefined && this.searchList.value.Requisitioner != "") {

      this.getColleaguesData(this.searchList.value.Requisitioner);
    }
  }

  getColleaguesData(searchString) {
    // $("#searchLoading").show();
    this.colleaguesDataList = [];
    this.internalportalservice.searchPeople(searchString, true, 'NA', 'NA').subscribe(res => {
      for (let i = 0; i <= (this.customManagerList.length - 1); i++) {
        if (this.customManagerList[i].EUMANAGER != null) {
          var serachname = this.customManagerList[i].EUMANAGER.toString();

          var found = res[0].searchdetailslist.filter(function (item) {
            if (item.EMAILID === serachname) {
              return item.EMAILID;
            }
          });
          if (found == null || found.length == 0) {
            continue;
          }
          else {
            console.log('found', found[0].DESIGNATION);
            this.customManagerList[i].DESIGNATION = found[0].DESIGNATION;

          }
        }
      }



      if (res != "undefined") {

        if (res[0].searchdetailslist != undefined) {
          //console.log("search data",res[0].data);
          this.colleaguesDataList = [];
          this.searchColleagues = res[0].searchdetailslist;
          console.log("this.searchColleagues", this.searchColleagues);
          this.searchColleagues.forEach(element => {
            let tempColleages = new colleaguesList();
            tempColleages.email = element['EMAILID'];
            // console.log("tempColleages.email",tempColleages.email);
            //split the response which is format in email and seperate the . with space.
            //comment this line to show email directly.
            //var nameFromEmail = element.split('@')[0].replace('.', " ");
            //tempColleages.name = nameFromEmail;

            tempColleages.name = element['NAME'];
            tempColleages.designation = element['DESIGNATION']
            //assign name and email to colleagues model
            this.colleaguesDataList.push(tempColleages);
            if (this.searchList.value.Requisitioner != null && this.searchList.value.Requisitioner != undefined && this.searchList.value.Requisitioner != "") {
              // this.onSearchKeyUp();
            }
          });
          console.log("this.colleaguesDataList", this.colleaguesDataList);
          this.colleaguesList = this.colleaguesDataList;
          $("#search").focus();
        }
        else {

          //   console.log('error in fetch data.');
        }

        // $("#searchLoading").hide();
      }
    }, err => {
      // $("#searchLoading").hide();
    });
  }



  addColleaguesToSuggestionList(e, item) {
    this.searchList.value.Requisitioner = "";
    $(".addbtn").hide();
    if (this.selectedColleaguesList.length > 0) {
      this.selectedColleaguesList = [];
      this.selectedColleaguesList.push(item);
    }
    else {
      this.selectedColleaguesList.push(item);
      console.log("selectedColleaguesList===============>", this.selectedColleaguesList)
      //to not delete if item is newly added.
      if (this.colleaguesDataList.indexOf(item) >= 0)
        this.colleaguesDataList.splice(this.colleaguesDataList.indexOf(item), 1);
      //clear the search list after adding fileds.
      this.colleaguesList = null;
      this.searchList.value.Requisitioner = "";
    }
  }
  removeColleaguesFromSuggestionList(e, item) {
    item.checked = true;
    this.colleaguesDataList.push(item);
    this.selectedColleaguesList.splice(this.selectedColleaguesList.indexOf(item), 1);
  }


  clearSearchData() {
    setTimeout(() => {
      this.colleaguesList = null;
    }, 200);

  }

  downloadPo(po_number, singlepodownload) {
    // this.loaderservice.show();
    console.log(po_number);
    this.DecodedFile = [];
    this.trackOrderListService.getfile(po_number, singlepodownload)
      .subscribe(result => {
        console.log(result);
        console.log("filename===>" + result[0].filename);
        this.DecodedFile = result[0].data;
        if (this.DecodedFile) {
          var data = this.DecodedFile;
          const agent = window.navigator.userAgent.toLowerCase()
          if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: 'application/octet-stream' });
            window.navigator.msSaveOrOpenBlob(blob, result[0].filename);
          }
          else if (agent.indexOf('firefox') > -1) {
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: "application/octet-stream" });
            saveAs(blob, result[0].filename);
          }
          else {
            console.log(data, 'data')
            let FileToDownload = 'data:application/octet-stream;base64,' + data;
            var link = document.createElement("a");
            const filename = result[0].filename;
            link.href = FileToDownload;
            link.download = filename;
            // link.click();
            var extensionName = filename.substr(filename.lastIndexOf('.') + 1)
            this.getFileType(extensionName);
            this.trackOrderListService.downloadEncryptedFile(data, this.extensionType);
          }
          this.loaderservice.hide();
        }
        else if (result[0].reason != 'none') {
          // this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: result[0].reason,
            condition: 'success',
            page: 'purchseorderlist'
          };
          const mydata = dialogConfig.data;
          console.log("PopupComponent", mydata);

          const dialogRef = this.dialog.open(PopupComponent, {
            panelClass: 'custom-modalbox',

            width: '400px',
            data: { datakey: dialogConfig.data }

          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result1: ${result}`);
            // this.router.navigate(['/internaltrackInvoiceList']);
          });
        }
        // this.loaderservice.hide();
        // if (result[0].status == "Fail") {
        //   this.dialogBox.popUpOpen2(result[0].message ,'error','profiledata');
        //  }
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );

  }

  SearchData() {

    this.loaderservice.show();
    this.invoicedetailsList = [];
    this.poDataList = [];
    this.popaginationnumber = 1;
    this.disableprevious = true;

    // console.log("this.searchList.value.selected" + moment(new Date(this.searchList.value.selected.startDate)).format("DD/MM/YYYY"));
    // return;
    console.log("this.searchList.value.modeType " + this.searchList.value.modeType)
    // this.invamountfrom = (Number(word[0]) * 100000).toString();
    // this.invamountto = (Number(word[1]) * 100000).toString();
    // if (this.invamountfrom != 'NA') {
    //   this.invpoamountfrom = this.invamountfrom;
    //   this.invpoamountto = this.invamountto;
    // }


    if (this.searchList.value.modeType == 'INVOICE') {

      // this.invpoamountfrom = this.searchList.value.invoicemin;
      // this.invpoamountto = this.searchList.value.invoicemax;

      if (this.searchList.value.invoicemin != "") {
        this.invpoamountfrom = this.searchList.value.invoicemin;
        this.invpoamountto = this.searchList.value.invoicemax;
      } else {
        this.invpoamountfrom = "NA";
        this.invpoamountto = "NA";
      }

      if (this.searchList.value.PONumber != "") {
        this.povalue = this.searchList.value.PONumber;
      }
      else {
        this.povalue = 'NA'
      }
      if (this.searchList.value.Vendor != "") {
        this.vendor = this.searchList.value.Vendor;
      }
      else {
        this.vendor = 'NA'
      }
      if (this.searchList.value.InvNumber != "") {
        this.invalue = this.searchList.value.InvNumber;
      }
      else {
        this.invalue = 'NA'
      }
      if (this.searchList.value.Status != "") {
        // this.status = this.searchList.value.Status;
        // this.postatusList = [
        //   { stype: 'ALL', value: 'ALL' },
        //   { stype: 'New PO', value: 'N' },
        //   { stype: 'Accepted', value: 'A' },
        //   { stype: 'Work In Progress', value: 'P' },
        //   { stype: 'Shipped', value: 'S' },
        //   { stype: 'Complete', value: 'C' },
        if (this.searchList.value.Status == 'Pending') {
          this.status = 'P';
        }
        if (this.searchList.value.Status == 'Approved') {
          this.status = 'A';
        }
        if (this.searchList.value.Status == 'Returned') {
          this.status = 'V';
        }
        if (this.searchList.value.Status == 'On Hold') {
          this.status = 'O';
        }
        if (this.searchList.value.Status == 'Processed') {
          this.status = 'PRO';
        }
        if (this.searchList.value.Status == 'Partially Paid') {
          this.status = 'PP';
        }
        if (this.searchList.value.Status == 'Paid') {
          this.status = 'PD';
        }
        if (this.searchList.value.Status == 'ALL') {
          this.status = 'ALL';
        }

      }
      else {
        this.status = 'NA'

      }
      if (this.searchList.controls['fromDate'].value) {
        this.fromtodatepresent = true;
        this.fromdateofduration = moment(new Date(this.searchList.controls['fromDate'].value)).format("DD/MM/YYYY").trim();
        this.todateofduration = moment(new Date(this.searchList.controls['toDate'].value)).format("DD/MM/YYYY").trim();
      }
      else {
        this.fromdateofduration = 'NA';
        this.todateofduration = 'NA';
      }
      // if (this.searchList.value.selected.startDate != 'Invalid date' ) {
      //   this.fromdateofduration =  moment(new Date(this.searchList.value.selected.startDate)).format("DD/MM/YYYY");
      //   this.todateofduration = moment(new Date(this.searchList.value.selected.endDate)).format("DD/MM/YYYY");
      // }
      // else {
      //   this.fromdateofduration = "NA";
      //   this.todateofduration = "NA";
      // }
      // this.statusValue = this.searchList.value.Status;
      if (this.searchList.value.Requisitioner) {
        this.requisitioner = this.searchList.value.Requisitioner;
      }

      // this.requisitioner = this.selectedColleaguesList[0].email;
      // if (this.selectedColleaguesList.length > 0) {
      //   this.requisitioner = this.selectedColleaguesList[0].email;
      // }
      else {
        this.requisitioner = "NA";
      }
      // if (this.searchList.value.Plant != "") {
      //   selectedPlant = this.searchList.value.Plant
      // }
      // else {
      //   selectedPlant = "NA"
      // }
      if (this.searchList.value.PurchaseGroup != "") {
        this.purchvalue = this.searchList.value.PurchaseGroup
      }
      else {
        this.purchvalue = 'NA'
      }
      console.log("this.searchList.value.Ageing " + this.searchList.value.Ageing);

      if (this.searchList.value.Ageing != undefined && this.searchList.value.Ageing != "ALL") {
        if (this.searchList.value.Ageing == "From 0 to 5 days") {
          this.ageingfrom = "0";
          this.ageingto = "5";
        }
        if (this.searchList.value.Ageing == "From 5 to 10 days") {
          this.ageingfrom = "5";
          this.ageingto = "10";
        }
        if (this.searchList.value.Ageing == "From 10 to 15 days") {
          this.ageingfrom = "10";
          this.ageingto = "15";
        }
        if (this.searchList.value.Ageing == "From 15 to 30 days") {
          this.ageingfrom = "15";
          this.ageingto = "30";
        }
        if (this.searchList.value.Ageing == "30 days and above") {
          this.ageingfrom = "30";
          this.ageingto = "NA";
        }
      }
      else {
        this.ageingfrom = "NA";
        this.ageingto = "NA"
      }

      if (this.searchList.value.Plant != "") {
        for (var a = 0; a < this.tempPlantList.length; a++) {
          if (this.tempPlantList[a].PLANTNAME == this.searchList.value.Plant) {
            this.plant = this.tempPlantList[a].PLANTCODE;
          }
        }
      }
      if (this.searchList.value.Purchasegroup != "") {
        this.purchvalue = this.searchList.value.Purchasegroup;
      }

      this.internalportalservice.getinternalSearchdata(this.invalue, this.povalue, this.status, this.fromdateofduration, this.todateofduration,
        this.plant, this.purchvalue, this.requisitioner, this.invpoamountfrom, this.invpoamountto, this.ageingfrom, this.ageingto,
        '1', this.vendor).subscribe(res => {
          this.loaderservice.hide();
          // $("#search").focus();
          // const element = this.renderer.selectRootElement('#search');
          // setTimeout(() => element.focus(), 0);
         
          // setTimeout(() => {
          //   const selectedRow = document.getElementById("search");
          //   selectedRow.scrollIntoView();
          // //   if(selectedRow) {
          // //     selectedRow.scrollIntoView({block: 'center'});
          // //   }
          // }, 500);
          if(res[0].invoiceCountAsPerStatus)
          {
            this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
              this.pendingPo = this.invoiceCountAsPerStatus.M;
            }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = this.invoiceCountAsPerStatus.P;
            }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
              this.pendingPo = 0;
            }else{
              this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            }
          }
          if (res[0].message == 'Success') {
            console.log(res, 'response of search')
            this.invoicedetailsList = res[0].invoicedetails;
            this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
            if (Number(res[0].invoicedetailsrecords) / this.invoicepopaginationnumber <= this.pageSize) {
              this.disablenext = true;
            }
            else {
              this.disablenext = false;
            }
            // const matTable= document.getElementById('search');
            // matTable.scrollTop = 0;
            setTimeout(() => {
              for (var k = 0; k < this.invoicedetailsList.length; k++) {
                console.log("this.statusList ", this.statusList);
                console.log("this.invoicedetailsList ", this.invoicedetailsList);
                if (this.statusList.length != 0) {

                  for (var j = 0; j < this.statusList.length; j++) {
                    if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoicedetailsList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoicedetailsList[k]['PONUMBER']) {
                      console.log("insise A--------------------------==============", this.invoicedetailsList[k]['INVOICENUMBER'])
                      $("#green" + k).addClass('displayBlock');
                      $("#white" + k).addClass('displayNone');
                      $("#white" + k).removeClass('displayBlock');

                    }
                    else {
                      //$("#green" + k).addClass('displayNone');
                      $("#white" + k).addClass('displayBlock');
                    }
                  }
                }
                else {
                  $("#white" + k).addClass('displayBlock');
                }

              }
            }, 500);
            // const element = $(`#${'search'}`);
            // element.animate({
            //    scrollTop: element.prop("scrollHeight")
            // }, 500);
           
          }
          
        });
    }
    else if (this.searchList.value.modeType == 'PO') {

      // this.invpoamountfrom = this.searchList.value.pomin;
      // this.invpoamountto = this.searchList.value.pomax;

      if (this.searchList.value.pomin != "") {
        this.invpoamountfrom = this.searchList.value.pomin;
        this.invpoamountto = this.searchList.value.pomax;
      }
      else {
        this.invpoamountfrom = "NA";
        this.invpoamountto = "NA";
      }


      if (this.searchList.value.PONumber != "") {
        this.povalue = this.searchList.value.PONumber;
      }
      else {
        this.povalue = 'NA'
      }
      if (this.searchList.value.Vendor != "") {
        this.vendor = this.searchList.value.Vendor;
      }
      else {
        this.vendor = 'NA'
      }
      if (this.searchList.value.InvNumber != "") {
        this.invalue = this.searchList.value.InvNumber;
      }
      else {
        this.invalue = 'NA'
      }
      if (this.searchList.value.Status != "") {

        this.status = this.searchList.value.Status;
        // this.postatusList = [
        //   { stype: 'ALL', value: 'ALL' },
        //   { stype: 'New PO', value: 'N' },
        //   { stype: 'Accepted', value: 'A' },
        //   { stype: 'Work In Progress', value: 'P' },
        //   { stype: 'Shipped', value: 'S' },
        //   { stype: 'Complete', value: 'C' },
        if (this.status == "New PO") {
          this.status = 'N';
        }
        if (this.status == "Accepted") {
          this.status = 'A';
        }
        if (this.status == "Work In Progress") {
          this.status = 'P';
        }
        if (this.status == "Shipped") {
          this.status = 'S';
        }
        if (this.status == "Complete") {
          this.status = 'C';
        }
        if (this.status == "ALL") {
          this.status = 'ALL';
        }
      }
      else {
        this.status = 'NA'

      }
      // if (this.searchList.value.fromDate != "") {
      //   this.fromdateofpo = moment(new Date(this.searchList.controls['fromDate'].value)).format("DD/MM/YYYY");
      //   this.todateofpo = moment(new Date(this.searchList.controls['toDate'].value)).format("DD/MM/YYYY");
      // }
      // else {
      //   this.fromdateofpo = "NA";
      //   this.todateofpo = "NA";
      // }
      if (this.searchList.controls['fromDate'].value) {
        this.fromtodatepresent = true;
        this.fromdateofduration = moment(new Date(this.searchList.controls['fromDate'].value)).format("DD/MM/YYYY").trim();
        this.todateofduration = moment(new Date(this.searchList.controls['toDate'].value)).format("DD/MM/YYYY").trim();
      }
      else {
        this.fromdateofduration = 'NA';
        this.todateofduration = 'NA';
      }
      // if (this.searchList.value.selected.startDate != 'Invalid date') {
      //   this.fromdateofduration = moment(new Date(this.searchList.value.selected.startDate)).format("DD/MM/YYYY");
      //   this.todateofduration = moment(new Date(this.searchList.value.selected.endDate)).format("DD/MM/YYYY");
      // }
      // else {
      //   this.fromdateofduration = "NA";
      //   this.todateofduration = "NA";
      // }
      // this.statusValue = this.searchList.value.Status;
      if (this.searchList.value.Requisitioner) {
        this.requisitioner = this.searchList.value.Requisitioner;
      }

      // this.requisitioner = this.selectedColleaguesList[0].email;
      // if (this.selectedColleaguesList.length > 0) {
      //   this.requisitioner = this.selectedColleaguesList[0].email;
      // }
      else {
        this.requisitioner = "NA";
      }
      // if (this.searchList.value.Plant != "") {
      //   selectedPlant = this.searchList.value.Plant
      // }
      // else {
      //   selectedPlant = "NA"
      // }
      if (this.searchList.value.PurchaseGroup != "") {
        this.purchvalue = this.searchList.value.PurchaseGroup
      }
      else {
        this.purchvalue = 'NA'
      }
      console.log("this.searchList.value.ageingfrom " + this.searchList.value.ageingfrom);

      if (this.searchList.value.Ageing != undefined && this.searchList.value.Ageing != "ALL") {
        if (this.searchList.value.Ageing == "From 0 to 5 days") {
          this.ageingfrom = "0";
          this.ageingto = "5";
        }
        if (this.searchList.value.Ageing == "From 5 to 10 days") {
          this.ageingfrom = "5";
          this.ageingto = "10";
        }
        if (this.searchList.value.Ageing == "From 10 to 15 days") {
          this.ageingfrom = "10";
          this.ageingto = "15";
        }
        if (this.searchList.value.Ageing == "From 15 to 30 days") {
          this.ageingfrom = "15";
          this.ageingto = "30";
        }
        if (this.searchList.value.Ageing == "30 days and above") {
          this.ageingfrom = "30";
          this.ageingto = "NA";
        }
      }
      else {
        this.ageingfrom = "NA";
        this.ageingto = "NA"
      }

      if (this.searchList.value.Plant != "") {
        for (var a = 0; a < this.tempPlantList.length; a++) {
          if (this.tempPlantList[a].PLANTNAME == this.searchList.value.Plant) {
            this.plant = this.tempPlantList[a].PLANTCODE;
          }
        }
      }
      if (this.searchList.value.Purchasegroup != "") {
        this.purchvalue = this.searchList.value.Purchasegroup;
      }

      this.internalportalservice.pointernaldashboardsearch(this.povalue, this.status, this.fromdateofduration,
        this.todateofduration, this.plant, this.purchvalue, this.requisitioner, this.invpoamountfrom, this.invpoamountto,
        this.ageingfrom, this.ageingto, '1', this.vendor).subscribe(res => {
          this.loaderservice.hide();
          $("#search").focus();
          this.poCountAsPerStatus = res[0].invoiceCountAsPerStatus;
          if (res[0].message == "Success") {
            console.log(res, 'response of search')
            this.poDataList = res[0].poData;
            this.endpagenumber = Math.ceil((Number(res[0].popages) / this.pageSize))
            if (Number(res[0].popages) / this.invoicepopaginationnumber <= this.pageSize) {
              this.disablenext = true;
            }
            else {
              this.disablenext = false;
            }
            setTimeout(() => {
              this.loaderservice.show();
              for (var k = 0; k < this.poDataList.length; k++) {
                console.log("this.statusList.length " + this.statusList.length);
                if (this.statusList.length != 0) {
                  for (var j = 0; j < this.statusList.length; j++) {
                    if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['PONUMBER'] == this.poDataList[k]['PO_NUMBER']) {

                      $("#green" + k).addClass('displayBlock');
                      $("#white" + k).addClass('displayNone');
                    }
                    else {
                      //$("#green" + k).addClass('displayNone');
                      $("#white" + k).addClass('displayBlock');
                    }
                  }
                }
                else {
                  $("#white" + k).addClass('displayBlock');
                }

              }
              this.loaderservice.hide();
            }, 500);
          }

        });

    }

  }

  ResetData() {
    this.searchList.reset();
    // this.searchList.controls.invoicemax.setValue("5000000");
    // this.searchList.controls.invoicemin.setValue("0");
    // this.searchList.controls.pomin.setValue("0");
    // this.searchList.controls.pomax.setValue("5000000");
    this.searchList.controls.invoicemax.setValue("");
    this.searchList.controls.invoicemin.setValue("");
    this.searchList.controls.pomin.setValue("");
    this.searchList.controls.pomax.setValue("");
    this.searchList.controls.modeType.setValue("INVOICE");
    this.invoiceMode = true;
    this.poMode = false;
    this.invoiceCountAsPerStatus = [];
    this.pendingPo = 0;
    // this.searchList.controls.poType.setValue("With PO");
    this.searchList.controls.Status.setValue("ALL");
    this.searchList.controls.PONumber.setValue("");
    this.searchList.controls.Vendor.setValue("");
    this.searchList.controls.InvNumber.setValue("");
    this.searchList.controls.PurchaseGroup.setValue("");
    this.searchList.controls.Purchasegroup.setValue("");


  }

  getPurchaseGroupData(e) {
    this.PurchasingGroupList = [];
    this.internalportalservice.getPurchaseGroup(e.target.value.toUpperCase()).subscribe(res => {
      console.log(res, 'getPurchaseGroupData----------------');
      this.tempPurchaseList = res[0].grnbasedonpo;

      // for (var i = 0; i < this.tempPurchaseList.length; i++) {
      //   // var purchaseList = this.tempPurchaseList[i].MATERIALTYPE + ' - ' + this.tempPurchaseList[i].MATERIALDESCRIPTION
      //   var purchaseList = this.tempPurchaseList[i].MATERIALTYPE;
      //   this.PurchasingGroupList.push(purchaseList);
      // }
      console.log(this.PurchasingGroupList, 'PurchasingGroupList')
    });
  }
  // getPlantData(e) {
  //   this.PlantList = [];
  //   this.internalportalservice.getPlanCode(e.target.value).subscribe(res => {
  //     this.tempPlantList = res[0].grnbasedonpo;
  //     for (var i = 0; i < this.tempPlantList.length; i++) {
  //       // var plantdata = this.tempPlantList[i].PLANTCODE + ' - ' + this.tempPlantList[i].PLANTNAME
  //       var plantdata = this.tempPlantList[i].PLANTCODE;
  //       this.PlantList.push(plantdata);
  //     }
  //     console.log(this.PlantList, 'PlantList')
  //   });
  // }


  getstatus() {
    this.enduserstatuslist = [
      { id: 'P', status: 'Pending', value: 'P' },
      { id: 'A', status: 'Approved', value: 'A' },
      { id: 'O', status: 'On Hold', value: 'O' },
      // { id: 'R', status: 'Rejected', value: 'R' }

    ]
    this.managerstatuslist = [
      { status: 'Pending', value: 'M' },
      { status: 'Approved', value: 'A' },
      { status: 'On Hold', value: 'O' },
      // { status: 'Rejected', value: 'R' }

    ]

    this.modelist = [
      { key: 'INV', name: 'INVOICE' },
      { key: 'PO', name: 'PO' }
    ]

    this.ageingList = [
      { key: 'NA', name: 'ALL' },
      { key: '0-5', name: 'From 0 to 5 days' },
      { key: '5-10', name: 'From 5 to 10 days' },
      { key: '10-15', name: 'From 10 to 15 days' },
      { key: '15-30', name: 'From 15 to 30 days' },
      { key: '30-NA', name: '30 days and above' }



    ]
  }

  getmessageStatus() {
    // this.loaderservice.show();
    this.internalportalservice.getInternalInvoiceReadStatus().subscribe(res => {
      console.log("response", res[0].poQueryList)
      // this.purchaseOrderListService.getChatStatus().subscribe(res => {
      if (res[0].message != "No Data Found for given Vendor Id") {
        console.log("is Data Coming??", res[0].poQueryList);
        this.statusList = res[0].poQueryList
      }
      else {
        this.statusList = [];
      }
      this.loaderservice.hide()

    }); err => {

      this.loaderservice.hide();
    }
  }


  sortdata(status) {
    // this.invoiceList.controls.POlineitemNumber.setValue(null);
    // this.invoiceList.controls.POOrderNumber.setValue(null);
    this.internalpaginationpagenumber = 1;
    this.disableprevious = true;
    this.invoicedetailsList = [];
    this.currstatus = status;
    // this.getInvoiceData();
    console.log("in here" + status)
    this.internalportalservice.getinvoicedetailsbasedonemailid(this.emailid, this.internalpaginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA', 'NA', 'NA').subscribe(res => {
      console.log("res is here ==>" + res[0].message);
      if (res[0].message == "Success") {
        // this.loaderservice.show();
        // }
        this.invoicedetailsList = res[0].invoicedetails;
        // this.searchList = res[0].invoicedetails;
        console.log("response====>", res)
        console.log("this.invoiceData ==>", this.invoicedetailsList);
        // this.totalItems = this.invoicedetailsList.length
        console.log(this.invoicedetailsList, 'this.invoicedetailsList=========')
        this.totalItems = res[0].invoicedetailsrecords;
        this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
        if (Number(res[0].invoicedetailsrecords) / this.internalpaginationpagenumber <= this.pageSize) {
          this.disablenext = true;
        }
        else {
          this.disablenext = false;
        }
        // console.log("this.totalItems ==>" + this.totalItems);
        // console.log("this.invoicedetailsList ==>" + this.invoicedetailsList);

        setTimeout(() => {
          for (var k = 0; k < this.invoicedetailsList.length; k++) {
            for (var j = 0; j < this.statusList.length; j++) {
              if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoicedetailsList[k]['INVOICENUMBER']) {

                $("#green" + k).addClass('displayBlock');
                $("#white" + k).addClass('displayNone');
              }
              else {
                //$("#green" + k).addClass('displayNone');
                $("#white" + k).addClass('displayBlock');
              }
            }
          }
        }, 1000);

      }
      this.loaderservice.hide();
    });

    // }
    // else {
    //   this.invoicedetailsList = this.invoiceData;
    //   this.totalItems = this.invoiceData.length;
    // }
  }

  // getPlantData(e) {
  //   this.PlantList = [];
  //   this.internalportalservice.getPlanCode(e.target.value.toUpperCase()).subscribe(res => {
  //     this.tempPlantList = res[0].grnbasedonpo;
  //     console.log(this.PlantList, 'PlantList')
  //   });
  // }

  gettrackInvPoList(action) {
    if (action == 'PREV') {
      if (this.invoicepopaginationnumber != 1) {
        this.invoicepopaginationnumber = this.invoicepopaginationnumber - 1;
        if (this.invoicepopaginationnumber == 1) {
          this.disableprevious = true;
        }
        else {
          this.disableprevious = false;
        }
      }
      else {
        return;
      }

    }
    else if (action == 'NEXT') {
      this.invoicepopaginationnumber = this.invoicepopaginationnumber + 1;
      this.disableprevious = false;

    }
    else if (action == 'HOME') {
      this.invoicepopaginationnumber = 1;
      this.disableprevious = true;

    }
    else if (action == 'END') {

      this.invoicepopaginationnumber = this.endpagenumber;
      if (this.invoicepopaginationnumber == 1) {
        this.disableprevious = true;
      }
      else {
        this.disableprevious = false;
      }
    }

    this.invoicedetailsList = [];
    this.poDataList = [];

    if (this.searchList.value.modeType == "INVOICE") {
      this.internalportalservice.getinternalSearchdata(this.invalue, this.povalue, this.status, this.fromdateofduration, this.todateofduration,
        this.plant, this.purchvalue, this.requisitioner, this.invpoamountfrom, this.invpoamountto, this.ageingfrom, this.ageingto,
        this.invoicepopaginationnumber, this.vendor).subscribe(res => {
          console.log(res, 'response of search')
          this.invoicedetailsList = res[0].invoicedetails;
          this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
          if (Number(res[0].invoicedetailsrecords) / this.invoicepopaginationnumber <= this.pageSize) {
            this.disablenext = true;
          }
          else {
            this.disablenext = false;
          }

          setTimeout(() => {
            for (var k = 0; k < this.invoicedetailsList.length; k++) {
              console.log("this.statusList ", this.statusList);
              console.log("this.invoicedetailsList ", this.invoicedetailsList);
              if (this.statusList.length != 0) {

                for (var j = 0; j < this.statusList.length; j++) {
                  if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoicedetailsList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoicedetailsList[k]['PONUMBER']) {
                    console.log("insise A--------------------------==============", this.invoicedetailsList[k]['INVOICENUMBER'])
                    $("#green" + k).addClass('displayBlock');
                    $("#white" + k).addClass('displayNone');
                    $("#white" + k).removeClass('displayBlock');

                  }
                  else {
                    //$("#green" + k).addClass('displayNone');
                    $("#white" + k).addClass('displayBlock');
                  }
                }
              }
              else {
                $("#white" + k).addClass('displayBlock');
              }

            }
          }, 500);
        });
    }
    else if (this.searchList.value.modeType == "PO") {
      this.internalportalservice.pointernaldashboardsearch(this.povalue, this.status, this.fromdateofpo,
        this.todateofpo, this.plant, this.purchvalue, this.requisitioner, this.invpoamountfrom, this.invpoamountto,
        this.ageingfrom, this.ageingto, this.invoicepopaginationnumber, this.vendor).subscribe(res => {
          if (res[0].message == "Success") {
            console.log(res, 'response of search')
            this.poDataList = res[0].poData;
            this.endpagenumber = Math.ceil((Number(res[0].popages) / this.pageSize))
            if (Number(res[0].popages) / this.invoicepopaginationnumber <= this.pageSize) {
              this.disablenext = true;
            }
            else {
              this.disablenext = false;
            }
            setTimeout(() => {
              this.loaderservice.show();
              for (var k = 0; k < this.poDataList.length; k++) {
                console.log("this.statusList.length " + this.statusList.length);
                if (this.statusList.length != 0) {
                  for (var j = 0; j < this.statusList.length; j++) {
                    if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['PONUMBER'] == this.poDataList[k]['PO_NUMBER']) {

                      $("#green" + k).addClass('displayBlock');
                      $("#white" + k).addClass('displayNone');
                    }
                    else {
                      //$("#green" + k).addClass('displayNone');
                      $("#white" + k).addClass('displayBlock');
                    }
                  }
                }
                else {
                  $("#white" + k).addClass('displayBlock');
                }

              }
              this.loaderservice.hide();
            }, 500);
          }

        });
    }

  }



  onDateChange() {
    if (this.searchList.controls['fromDate'].value) {
      if (this.searchList.controls['toDate'].value) {
        this.disable = false;
        this.fromdateerror = false;
        this.todateerror = false;
      }
      else {
        this.todateerror = true;
        this.fromdateerror = false;
        this.disable = true;
      }
      this.mintodate = new Date(this.searchList.controls['fromDate'].value);
    }
    else if (this.searchList.controls['toDate'].value) {
      if (this.searchList.controls['fromDate'].value) {
        this.disable = false;
        this.fromdateerror = false;
        this.todateerror = false;
      }
      else {
        this.fromdateerror = true;
        this.todateerror = false;
        this.disable = true;
      }
    }
    this.maxdate = new Date(this.searchList.controls['toDate'].value);

  }

  // gettrackInvList(action) {
  //   // this.loaderservice.show();
  //   this.selectedPage = event;
  //   console.log(event);
  //   if (action == 'PREV') {
  //     if (this.internalpaginationpagenumber != 1) {
  //       this.internalpaginationpagenumber = this.internalpaginationpagenumber - 1;
  //       if (this.internalpaginationpagenumber == 1) {
  //         this.disableprevious = true;
  //       }
  //       else {
  //         this.disableprevious = false;
  //       }
  //     }
  //     else {
  //       return;
  //     }

  //   }
  //   else if (action == 'NEXT') {
  //     this.internalpaginationpagenumber = this.internalpaginationpagenumber + 1;
  //     this.disableprevious = false;

  //   }
  //   else if (action == 'HOME') {
  //     this.internalpaginationpagenumber = 1;
  //     this.disableprevious = true;

  //   }
  //   else if (action == 'END') {

  //     this.internalpaginationpagenumber = this.endpagenumber;
  //     if (this.internalpaginationpagenumber == 1) {
  //       this.disableprevious = true;
  //     }
  //     else {
  //       this.disableprevious = false;
  //     }
  //   }
  //   if (this.currstatus == "AS") {
  //     this.internalportalservice.getinvoicedetailsbasedonemailid(this.emailid, this.internalpaginationpagenumber, this.currstatus, this.innum, this.ponum, this.fd, this.td).subscribe(res => {
  //       //console.log("res is here ==>"+res[0].message);
  //       if (res[0].storekeeper == 'true') {
  //         this.storekeeper = true;
  //         sessionStorage.setItem('storekeeper', "true");
  //       } else {
  //         sessionStorage.setItem('storekeeper', "false");
  //         this.storekeeper = false;
  //       }
  //       if (res[0].message == "Success") {
  //         //  if(this.pgNolist.length==0)
  //         //  {
  //         this.pendinginvList = [];
  //         this.invoicedetailsList = res[0].invoicedetails;
  //         console.log(this.invoicedetailsList, ' this.invoicedetailsList')
  //         for (let i = 0; i < this.invoicedetailsList.length; i++) {
  //           this.invoicedetailsList[i].TOTALAMOUNT = Number(this.invoicedetailsList[i].TOTALAMOUNT)
  //           // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
  //           if (this.invoicedetailsList[i].PAYMENTAMOUNT != null) {
  //             this.invoicedetailsList[i].PAYMENTAMOUNT = Number(this.invoicedetailsList[i].PAYMENTAMOUNT)
  //           }
  //           if (this.invoicedetailsList[i].OVERALLSTATUS == 'P' || this.invoicedetailsList[i].OVERALLSTATUS == 'M') {
  //             this.ENDUSERStatus[i] = this.invoicedetailsList[i].ENDUSERSTATUS;
  //             if(this.invoicedetailsList[i].ENDUSERSTATUS=='A'){
  //               if(this.invoicedetailsList[i].OVERALLSTATUS=='PRO' || this.invoicedetailsList[i].OVERALLSTATUS=='PP'|| this.invoicedetailsList[i].OVERALLSTATUS=='PD')
  //               {
  //                this.ManagerStatus[i] ='A';

  //               } 
  //               else
  //               {
  //                this.ManagerStatus[i] = this.invoicedetailsList[i].STATUS;
  //               }

  //              }

  //           }

  //         }
  //         this.totalItems = res[0].invoicedetailsrecords
  //         this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
  //         if (Number(res[0].invoicedetailsrecords) / this.internalpaginationpagenumber <= this.pageSize) {
  //           this.disablenext = true;
  //         }
  //         else {
  //           this.disablenext = false;
  //         }

  //         this.getUserData()

  //         this.invoiceList.reset();
  //         this.loaderservice.hide();
  //       }
  //       else {
  //         this.loaderservice.hide();
  //       }
  //     }); err => {
  //       this.loaderservice.hide();
  //     }

  //   }
  //   else {
  //     this.internalportalservice.getinvoicedetailsbasedonemailid(this.emailid, this.internalpaginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA').subscribe(res => {
  //       //console.log("res is here ==>"+res[0].message);
  //       if (res[0].storekeeper == 'true') {
  //         this.storekeeper = true;
  //         sessionStorage.setItem('storekeeper', "true");
  //       } else {
  //         sessionStorage.setItem('storekeeper', "false");
  //         this.storekeeper = false;
  //       }
  //       if (res[0].message == "Success") {
  //         //  if(this.pgNolist.length==0)
  //         //  {
  //         this.pendinginvList = [];
  //         this.invoicedetailsList = res[0].invoicedetails;
  //         console.log(this.invoicedetailsList, ' this.invoicedetailsList')
  //         for (let i = 0; i < this.invoicedetailsList.length; i++) {
  //           this.invoicedetailsList[i].TOTALAMOUNT = Number(this.invoicedetailsList[i].TOTALAMOUNT)
  //           // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
  //           if (this.invoicedetailsList[i].PAYMENTAMOUNT != null) {
  //             this.invoicedetailsList[i].PAYMENTAMOUNT = Number(this.invoicedetailsList[i].PAYMENTAMOUNT)
  //           }
  //           if (this.invoicedetailsList[i].OVERALLSTATUS == 'P' || this.invoicedetailsList[i].OVERALLSTATUS == 'M') {
  //             this.ENDUSERStatus[i] = this.invoicedetailsList[i].ENDUSERSTATUS;
  //             if(this.invoicedetailsList[i].ENDUSERSTATUS=='A' || this.invoicedetailsList[i].ENDUSERSTATUS == 'PP' || this.invoicedetailsList[i].ENDUSERSTATUS == 'PRO' || this.invoicedetailsList[i].ENDUSERSTATUS == 'PD'){
  //               this.ManagerStatus[i] = this.invoicedetailsList[i].STATUS;
  //               }

  //           }

  //         }
  //         this.totalItems = res[0].invoicedetailsrecords
  //         this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
  //         if (Number(res[0].invoicedetailsrecords) / this.internalpaginationpagenumber <= this.pageSize) {
  //           this.disablenext = true;
  //         }
  //         else {
  //           this.disablenext = false;
  //         }

  //         this.getUserData()

  //         this.invoiceList.reset();
  //         this.loaderservice.hide();
  //       }
  //       else {
  //         this.loaderservice.hide();
  //       }
  //     }); err => {
  //       this.loaderservice.hide();
  //     }
  //   }

  //   setTimeout(() => {
  //     // this.getInvoiceData();
  //     this.getmessageStatus();
  //     console.log(this.pageSize, 'pageSize')
  //     this.pgNolist = [];
  //     this.pgNolist = this.invoicedetailsList;
  //     console.log("what is data here ??", this.pgNolist)

  //     for (var a = 0; a < this.pgNolist.length; a++) {
  //       // this.getFilteredData(this.pgNolist[a].MATERIAL, this.pgNolist[a].PLANT, a)
  //       var splitted = this.pgNolist[a].USERID.split();

  //       this.ENDUSERStatus[a] = this.pgNolist[a].ENDUSERSTATUS;
  //       if(this.pgNolist[a].ENDUSERSTATUS=='A' || this.pgNolist[a].ENDUSERSTATUS=='PD' || this.pgNolist[a].ENDUSERSTATUS=='PRO' || this.pgNolist[a].ENDUSERSTATUS=='PP'){
  //       this.ManagerStatus[a] = this.pgNolist[a].STATUS;
  //       }
  //       console.log("EnduserID", this.pgNolist[a].ENDUSERID);
  //       if ((this.pgNolist[a].GRNNUMBER != null && this.pgNolist[a].CREDITADVICENO == null) ||
  //         (this.pgNolist[a].GRNNUMBER != null && this.pgNolist[a].CREDITADVICENO != null
  //           && this.pgNolist[a].CREDITNOTENO != null)) {
  //             if (this.pgNolist[a].EUMANAGER != "") {
  //               var splittedmanager = this.pgNolist[a].EUMANAGER.split('_');
  //             }
  //         if (this.pgNolist[a].ENDUSERID == this.specificemailid) {
  //           $('#SelManager' + a).attr('disabled', true);
  //           // if (this.pgNolist[a].STATUS != 'M') {
  //             if (this.pgNolist[a].OVERALLSTATUS != 'P' && this.pgNolist[a].ENDUSERSTATUS != 'A') {
  //             $('#Seluser' + a).attr('disabled', true);
  //           }
  //         }
  //         // else if (this.pgNolist[a].EUMANAGER == this.specificemailid) {
  //         //   console.log("a is here in else" + a);
  //         //   $('#Seluser' + a).attr('disabled', true);
  //         //   if (this.pgNolist[a].ENDUSERSTATUS != 'A') {
  //         //     $('#SelManager' + a).attr('disabled', true);
  //         //   }
  //         // }
  //         else if (this.pgNolist[a].EUMANAGER != "") {

  //           for (let b = 0; b < splittedmanager.length; b++) {
  //             if (this.specificemailid == splittedmanager[b]) {
  //               $('#Seluser' + b).attr('disabled', true);
  //             }
  //           }
  //           if (this.pgNolist[a].ENDUSERSTATUS != 'A') {
  //             $('#SelManager' + a).attr('disabled', true);
  //           }
  //         }
  //         else if (this.invoicedetailsList[a].ENDUSERID != this.specificemailid && this.invoicedetailsList[a].PROXY == 'X') {

  //           for (let c = 0; c < splitted.length; c++) {
  //             console.log(this.specificemailid, 'specificemailid')
  //             // console.log(this.proxyusers[c].Userid, 'this.proxyusers')
  //             if (this.specificemailid == splitted[c]) {
  //               $('#SelManager' + a).attr('disabled', true);
  //               if (this.invoicedetailsList[a].STATUS != 'M') {
  //                 $('#Seluser' + a).attr('disabled', true);
  //               }
  //             }
  //           }
  //         }
  //         if (this.pgNolist[a].ENDUSERSTATUS == 'A' || this.pgNolist[a].ENDUSERSTATUS == 'R') {
  //           $('#Seluser' + a).attr('disabled', true);
  //         }
  //         if (this.pgNolist[a].STATUS == 'A' || this.pgNolist[a].STATUS == 'R' || this.pgNolist[a].OVERALLSTATUS == 'R') {
  //           $('#SelManager' + a).attr('disabled', true);
  //         }
  //       }
  //       else {
  //         $('#Seluser' + a).attr('disabled', true);
  //         $('#SelManager' + a).attr('disabled', true);
  //       }



  //       for (var j = 0; j < this.statusList.length; j++) {
  //         if (this.statusList.length != 0) {
  //           if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.pgNolist[a]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.pgNolist[a]['PONUMBER']) {
  //             // console.log("green",);

  //             $("#green" + a).addClass('displayBlock');
  //             $("#white" + a).addClass('displayNone');
  //           }
  //           else {
  //             //$("#green" + k).addClass('displayNone');
  //             $("#white" + a).addClass('displayBlock');
  //           }
  //         }
  //         else {
  //           $("#white" + a).addClass('displayBlock');
  //         }
  //       }
  //       this.loaderservice.hide();
  //     }
  //     this.loaderservice.hide();


  //   }, 300);

  // }

  /*Method to listen for onChange event from slider*/
  onSliderChange(selectedValues: number[]) {
    this._currentValues = selectedValues;
    console.log("this._currentValues ==> " + this._currentValues);
    let word = this._currentValues.toString().split(',');
    // .toString().split(',');
    this.invamountfrom = (Number(word[0]) * 100000).toString();
    this.invamountto = (Number(word[1]) * 100000).toString();
  }

  getPlantData(e) {
    this.PlantList = [];
    this.internalportalservice.getPlanCode(e.target.value.toUpperCase()).subscribe(res => {
      this.tempPlantList = res[0].grnbasedonpo;
      console.log(this.PlantList, 'PlantList')
    });
  }


  getVendorData(e) {
    this.vendorList = [];
    this.internalportalservice.getVendorData(e.target.value.toUpperCase()).subscribe(res => {
      this.vendorList = res[0].vendordetail;
      console.log(this.vendorList, 'vendorList')
    });
  }

  getPurchaseData(e) {
    this.purchaseList = [];
    this.internalportalservice.getpurchasegroupData(e.target.value.toUpperCase()).subscribe(res => {
      this.purchaseList = res[0].grnbasedonpo;
      console.log(this.purchaseList, 'grnbasedonpo')
    });
  }

  ValidateEmail(event) {
    // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(event.target.value)) {
      // [<>=]{1,2}
      this.submitted = false;
      console.log("true here");
      return (true)
    }
    else if (event.target.value == '') {
      this.submitted = false;
      return (true);

    }
    else {
      this.submitted = true;
    }

    console.log("false here");
    // alert("You have entered an invalid email address!")
    return (false)
  }

  downloadpolist() {
    this.loaderservice.show();

    this.purchaseOrderListService.getinternalpolistdashboardfile(this.povalue, this.status, this.fromdateofduration,
      this.todateofduration, this.plant, this.purchvalue, this.requisitioner, this.invpoamountfrom, this.invpoamountto,
      this.ageingfrom, this.ageingto, this.invoicepopaginationnumber, this.vendor).subscribe(res => {
        // console.log(res[0].message)

        if (res[0].message == "Success") {
          var nameoffile = "polistdownload.xlsx";
          console.log("filename===>" + nameoffile);
          this.DecodedFile = res[0].data;

          if (this.DecodedFile) {
            var data = this.DecodedFile;
            const agent = window.navigator.userAgent.toLowerCase()
            if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
              var byteCharacters = atob(data);
              var byteNumbers = new Array(byteCharacters.length);
              for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              var byteArray = new Uint8Array(byteNumbers);
              var blob = new Blob([byteArray], { type: 'application/octet-stream' });
              window.navigator.msSaveOrOpenBlob(blob, nameoffile);
            }
            else if (agent.indexOf('firefox') > -1) {
              var byteCharacters = atob(data);
              var byteNumbers = new Array(byteCharacters.length);
              for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              var byteArray = new Uint8Array(byteNumbers);
              var blob = new Blob([byteArray], { type: "application/octet-stream" });
              saveAs(blob, nameoffile);
            }
            else {
              console.log(data, 'data')
              let FileToDownload = 'data:application/octet-stream;base64,' + data;
              var link = document.createElement("a");
              const filename = nameoffile;
              link.href = FileToDownload;
              link.download = filename;
              link.click();
            }
          }
          this.loaderservice.hide();
        }
        else {
          this.loaderservice.hide();
          this.dialogBox.popUpOpen2('Failed to download !!', 'error', 'puchaseorderlist');
        }
      });
  }

  download(savedfilename, singlepodownload, actualfilename) {
    if (savedfilename == "" || savedfilename == null || actualfilename == "" || actualfilename == null
      || savedfilename == undefined || actualfilename == undefined) {
      // this.dialogBox.popUpOpen2("File not present", 'success', 'purchaseorderlist');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'File not present',
        condition: 'success',
        page: 'purchaseoerderlist'
      };
      const mydata = dialogConfig.data;
      console.log("PopupComponent", mydata);

      const dialogRef = this.dialog.open(PopupComponent, {
        panelClass: 'custom-modalbox',

        width: '400px',
        data: { datakey: dialogConfig.data }

      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result1: ${result}`);
        // this.router.navigate(['/internaltrackInvoiceList']);
      });
      return;
    }
    // this.loaderservice.show();
    console.log(savedfilename);
    this.DecodedFile = [];
    this.trackOrderListService.getinternalfile(savedfilename, singlepodownload)
      .subscribe(result => {
        console.log(result);
        console.log("filename===>" + result[0].filename);
        this.DecodedFile = result[0].data;
        if (this.DecodedFile) {
          var data = this.DecodedFile;
          const agent = window.navigator.userAgent.toLowerCase()
          if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: 'application/octet-stream' });
            window.navigator.msSaveOrOpenBlob(blob, result[0].filename);
          }
          else if (agent.indexOf('firefox') > -1) {
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: "application/octet-stream" });
            saveAs(blob, result[0].filename);
          }
          else {
            console.log(data, 'data')
            let FileToDownload = 'data:application/octet-stream;base64,' + data;
            var link = document.createElement("a");
            const filename = result[0].filename;
            link.href = FileToDownload;
            link.download = filename;
            // link.click();
            var extensionName = filename.substr(filename.lastIndexOf('.') + 1)
            this.getFileType(extensionName);
            this.trackOrderListService.downloadEncryptedFile(data, this.extensionType);

          }
          // this.loaderservice.hide();
        }
        else if (result[0].reason != 'none') {
          // this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: result[0].reason,
            condition: 'success',
            page: 'purchaseorderlist'
          };
          const mydata = dialogConfig.data;
          console.log("PopupComponent", mydata);

          const dialogRef = this.dialog.open(PopupComponent, {
            panelClass: 'custom-modalbox',

            width: '400px',
            data: { datakey: dialogConfig.data }

          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result1: ${result}`);
            // this.router.navigate(['/internaltrackInvoiceList']);
          });
        }
        // else if (result[0].status == "Fail") {
        // 	this.dialogBox.popUpOpen2(result[0].message ,'success','purchaseorderlist');
        // }
      }, err => {
        // this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );

  }

  getFileType(extensionName) {
    console.log("extensionName" + extensionName);
    if (extensionName.toLowerCase() === 'jpg' || extensionName.toLowerCase() === 'png' || extensionName.toLowerCase() === 'jpeg') {
      this.extensionType = 'image/' + extensionName;
    } else if (extensionName.toLowerCase() === 'pdf') {
      this.extensionType = 'application/pdf';
    } else if (extensionName.toLowerCase() === 'doc') {
      this.extensionType = 'application/msword';
    } else if (extensionName.toLowerCase() === 'docx') {
      this.extensionType = 'application/msword';
    } else if (extensionName.toLowerCase() === 'xls') {
      this.extensionType = 'application/vnd.ms-excel';
    } else if (extensionName.toLowerCase() === 'xlsx') {
      this.extensionType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (extensionName.toLowerCase() === 'csv') {
      this.extensionType = 'text/csv';
    }
  }

  keyPressAlphanumeric(event): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
      || (charCode >= 48 && charCode <= 57) || charCode == 32 ||
      charCode == 45 || charCode == 47 || charCode == 92) {
      return true;
    }
    return false;
  }

  downloadinvoicelist() {
    this.loaderservice.show();

    this.purchaseOrderListService.downloadinternalInvoiceData(this.invalue, this.povalue, this.status, this.fromdateofduration, this.todateofduration,
      this.plant, this.purchvalue, this.requisitioner, this.invpoamountfrom, this.invpoamountto, this.ageingfrom, this.ageingto,
      this.invoicepopaginationnumber, this.vendor).subscribe(res => {

        // this.purchaseOrderListService.getpolistfile(this.downloaddatalist).subscribe(res => {
        // console.log(res[0].message)

        if (res[0].message == "Success") {
          var nameoffile = "invoicedownload.xlsx";
          console.log("filename===>" + nameoffile);
          this.DecodedFile = res[0].data;

          if (this.DecodedFile) {
            var data = this.DecodedFile;
            const agent = window.navigator.userAgent.toLowerCase()
            if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
              var byteCharacters = atob(data);
              var byteNumbers = new Array(byteCharacters.length);
              for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              var byteArray = new Uint8Array(byteNumbers);
              var blob = new Blob([byteArray], { type: 'application/octet-stream' });
              window.navigator.msSaveOrOpenBlob(blob, nameoffile);
            }
            else if (agent.indexOf('firefox') > -1) {
              var byteCharacters = atob(data);
              var byteNumbers = new Array(byteCharacters.length);
              for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              var byteArray = new Uint8Array(byteNumbers);
              var blob = new Blob([byteArray], { type: "application/octet-stream" });
              saveAs(blob, nameoffile);
            }
            else {
              console.log(data, 'data')
              let FileToDownload = 'data:application/octet-stream;base64,' + data;
              var link = document.createElement("a");
              const filename = nameoffile;
              link.href = FileToDownload;
              link.download = filename;
              link.click();


            }
          }
          this.loaderservice.hide();
        }
        else if (res[0].message != "Success") {
          // this.dialogBox.popUpOpen2(res[0].message ,'error','purchaseorderlist'); 
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: res[0].message,
            condition: 'success',
            page: 'purchaseorderlist'
          };
          const mydata = dialogConfig.data;
          console.log("PopupComponent", mydata);

          const dialogRef = this.dialog.open(PopupComponent, {
            panelClass: 'custom-modalbox',

            width: '400px',
            data: { datakey: dialogConfig.data }

          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result1: ${result}`);
          });
        }

      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      })
  }

  Validateamount(amount) {
    if (this.searchList.value.modeType == 'INVOICE') {
      if ((this.searchList.value.invoicemin == "" && this.searchList.value.invoicemax != "")
        || (this.searchList.value.invoicemin != "" && this.searchList.value.invoicemax == "")
        || this.searchList.value.invoicemin.includes("-") || this.searchList.value.invoicemax.includes("-")
        || Number(this.searchList.value.invoicemin) < 0
        || Number(this.searchList.value.invoicemax) < 0) {
        this.disable = true;
        this.error = false;
        this.subceed = false;
        if (Number(this.searchList.value.invoicemax) < 0 || Number(this.searchList.value.invoicemin) < 0) {
          this.subceed = true;
          this.empty = false;
        }
        else if ((this.searchList.value.invoicemin == "" && this.searchList.value.invoicemax != "")
          || (this.searchList.value.invoicemin != "" && this.searchList.value.invoicemax == "")) {
          this.empty = true;
          this.subceed = false;
        }
      }
      else if (Number(this.searchList.value.invoicemin) > Number(this.searchList.value.invoicemax)) {
        this.disable = true;
        this.error = true;
        this.subceed = false;
        this.empty = false;
      }

      else {
        this.disable = false;
        this.error = false;
        this.empty = false;
        this.subceed = false;
      }

    }
    else if (this.searchList.value.modeType == 'PO') {
      if ((this.searchList.value.pomin == "" && this.searchList.value.pomax != "")
        || (this.searchList.value.pomin != "" && this.searchList.value.pomax == "")
        || this.searchList.value.pomin.includes("-") || this.searchList.value.pomax.includes("-")
        || Number(this.searchList.value.pomin) < 0
        || Number(this.searchList.value.pomax) < 0) {
        this.disable = true;
        this.error = false;
        this.subceed = false;
        if (Number(this.searchList.value.pomax) < 0 || Number(this.searchList.value.pomin) < 0) {
          this.subceed = true;
          this.empty = false;
        }
        else if ((this.searchList.value.pomin == "" && this.searchList.value.pomax != "")
          || (this.searchList.value.pomin != "" && this.searchList.value.pomax == "")) {
          this.empty = true;
          this.subceed = false;
        }

      }
      else if (Number(this.searchList.value.pomin) > Number(this.searchList.value.pomax)) {
        this.disable = true;
        this.error = true;
        this.subceed = false;
        this.empty = false;
      }

      else {
        this.disable = false;
        this.error = false;
        this.subceed = false;
        this.empty = false;
      }

    }

  }

  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}

export class colleaguesList {
  email: string;
  name: string;
  designation: string;
  checked: boolean = true;
  constructor() {

  }
}
