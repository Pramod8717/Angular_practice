import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as Chartist from 'chartist';
import { Label } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { LoaderService } from '../../../services/LoaderService/loader.service';
import { PurchaseOrderListService } from '../../../services/purchaseOrderList/purchaseorderlist.service';
// import { TrackOrderListService } from '../../../services/track-order-list.service';
import { Router } from '@angular/router';
import { blobURL } from 'assets/configdata/baseURL';
import { saveAs } from 'file-saver';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import { purchaseOrderListModel } from 'app/models/purchaseorderlist.model';
import { DatePipe } from '@angular/common';

import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;

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
  confirmationNoAction: boolean = false;
  pageSize = 50;
  poDetail: any = [];
  poDataList: any = [];
  invoiceDataList: any = [];
  searchList: any = [];
  searchInvList: any = [];
  searchPO: any = [];
  showicons: boolean = false;
  searchINV: any = [];
  poItemCount: number = 0
  invItemCount: any;
  searchvalue = "";
  allPOlist: any;
  acceptedPOList: any;
  inProgressPOList: any;
  completedPOList: any;
  shippedPOList: any;
  DecodedFile: any;
  statusList: any;
  purchaseOrderListModel = new purchaseOrderListModel();
  recipientEmail: any;
  topic: any;
  messageList: any;
  filterpodatalist: any;
  totalItems: any;
  searchKey: any;
  pgNolist: any[];
  message: string;
  onholdinvList: any[];
  submittedinvList: any[];
  partiallypaidinvList: any[];
  paidinvList: any[];
  processedinvList: any[];
  acceptedinvList: any[];
  validate: boolean = true;
  uniquePONumber: any;
  uniqueInvNumber: any;
  poReadstatusList: any = [];
  invoiceData1: any = [];
  equalfound: boolean = false;
  extensionType: any;
  

  constructor(private router: Router,
    private purchaseOrderListService: PurchaseOrderListService,
    private TrackOrderListService: TrackOrderListService,
    private trackOrderListService: TrackOrderListService,
    private loaderservice: LoaderService,
    public datepipe: DatePipe,
   

  ) {

  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
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
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
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
    // this.showicons =true;
    this.getmessageStatus();
    this.getinvoiceDataList();
    this.getPurChaseOrderList();
    this.getPOmessageStatus();
    // this.getmessageStatus();
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
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
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

  showPopup(ev, poNumber) {
    console.log("is it ??", poNumber)
    this.purchaseOrderListModel.PONumber = poNumber;
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
  }
  closePopup(ev) {
    $("#popup2").css("visibility", "hidden");
    $("#popup2").css("opacity", "0");
    // location.reload();
    this.confirmationNoAction = false;
    this.getPurChaseOrderList();
    this.getmessageStatus();

  }

  ShowpopupMessage(ev) {
    $("#popupMessage").css("visibility", "visible");
    $("#popupMessage").css("opacity", "1");
    (<any>$("#popupComment").modal('show'));
  }
  ClosepopupMessage(ev) {
    $("#popupMessage").css("visibility", "hidden");
    $("#popupMessage").css("opacity", "0");
    this.getPurChaseOrderList();
    this.getmessageStatus();
    this.getPOmessageStatus();
    this.getinvoiceDataList();
  }
  getQuerry(poNumber, contactPersonMail) {
    this.recipientEmail = contactPersonMail;
    sessionStorage.setItem("receiverMail", contactPersonMail)
    this.purchaseOrderListService.getMessages(poNumber).subscribe(res => {
      console.log("resposne", res[0].message)
      this.messageList = [];
      this.topic = poNumber
      if (res[0].poQueryList[0] != undefined) {
        for (let i = 0; i < (res[0].poQueryList).length; i++) {
          console.log(res[0].poQueryList[i].INVOICENUMBER, "inv number");

          if (res[0].poQueryList[i].INVOICENUMBER == null)
            this.messageList.push(res[0].poQueryList[i])
        }
      }
      // else {
      //   this.messageList = res[0].message
      // }
      console.log(this.messageList)
    })
  }

  getPOmessageStatus() {
    this.purchaseOrderListService.getReadStatus().subscribe(res => {
      console.log("response", res[0].poQueryList)
      // this.purchaseOrderListService.getChatStatus().subscribe(res => {
      if (res[0].message != "No Data Found for given Vendor Id") {
        console.log("is Data Coming??", res[0].poQueryList);
        this.poReadstatusList = res[0].poQueryList
      }
      else {
        this.poReadstatusList = [];
      }

    })
  }
  // getPurChaseOrderList() {
  //   this.loaderservice.show();
  //   this.purchaseOrderListService.getPO().subscribe(res => {
  //     // console.log("Data",res[0].poData)
  //     this.poDataList = res[0].poData;
  //     this.searchList = res[0].poData;
  //     this.allPOlist = res[0].poData;
  //     for(var i=0; i < this.poDataList.length;i++)
  //     {
  //       if(this.poDataList[i]['STATUS']=='N')
  //       {
  //         this.poItemCount = this.poItemCount + 1;
  //       }
  //       // if (this.poDataList[i]['STATUS'] == 'A') {
  //       //   this.acceptedPOList.push(this.poDataList[i]);
  //       // }
  //       // else  if (this.poDataList[i]['STATUS'] == 'P') {
  //       //   this.inProgressPOList.push(this.poDataList[i]);
  //       // }
  //       // else  if (this.poDataList[i]['STATUS'] == 'C') {
  //       //   this.completedPOList.push(this.poDataList[i]);
  //       // }
  //       // else  if (this.poDataList[i]['STATUS'] == 'S') {
  //       //   this.shippedPOList.push(this.poDataList[i]);
  //       // }
  //       // else  if(this.poDataList[i]['STATUS']=="N")
  //       // {
  //       //   this.poItemCount = this.poItemCount + 1;
  //       // }
  //     }
  //     this.loaderservice.hide();
  //     //this.poItemCount = this.poDataList.length
  //   },err => {
  //     this.loaderservice.hide();
  //   });
  // }

  getStatusUpdate(poNumber, invNumber) {
    console.log("ponumber##########", poNumber, invNumber);
    this.uniquePONumber = poNumber;
    this.uniqueInvNumber = invNumber;

    this.purchaseOrderListService.getChatStatusUpdate(poNumber, invNumber).subscribe(res => {
      console.log("is it Updating ??", res);
    }); err => { }

    this.getPOmessageStatus();
  }

  getPurChaseOrderList() {
    this.loaderservice.show();
    this.poItemCount = 0;
    this.poDataList = [];
    this.allPOlist = [];
    this.acceptedPOList = [];
    this.inProgressPOList = [];
    this.completedPOList = [];
    this.shippedPOList = [];
    this.searchList = [];
    this.getPOmessageStatus();

    this.purchaseOrderListService.getPO('1', 'ALL', "NA", "NA", "NA", "NA", "NA", "NA").subscribe(res => {
      if (res[0].message != "No Data Found for given Vendor Id") {
        console.log("Data", res[0].poData);
        this.poDataList = res[0].poData;
        // for (let i = 0; i < this.poDataList.length; i++) {
        //   this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
        // }
        for (var i = 0; i < this.poDataList.length; i++) {
          if (this.poDataList[i]['STATUS'] == 'N') {
            this.poItemCount = this.poItemCount + 1;
          }
          var poFormatDate = this.poDataList[i].DATE;
          poFormatDate.replace(' ', 'T')
          this.poDataList[i].DATE = poFormatDate;
          this.poDataList[i].DATE = this.datepipe.transform(this.poDataList[i].DATE, "dd-MMM-yyyy");
        }
        this.filterpodatalist = res[0].poData;
        this.totalItems = this.poDataList.length
        // res[0].poData.forEach(element => {
        //   // console.log("arraylist", element.STATUS)
        //   this.allPOlist.push(element)
        //   this.searchList.push(element)
        //   if (element.STATUS === 'A') {
        //     this.acceptedPOList.push(element)
        //   }
        //   else if (element.STATUS === 'P') {
        //     this.inProgressPOList.push(element)
        //   }
        //   else if (element.STATUS === 'C') {
        //     this.completedPOList.push(element)
        //   }
        //   else if (element.STATUS === 'S') {
        //     this.shippedPOList.push(element)

        //   }

        // });
        this.loaderservice.hide();
        setTimeout(() => {
          this.loaderservice.show();
          for (var k = 0; k < this.poDataList.length; k++) {
            console.log("this.statusList.length " + this.poReadstatusList);
            if (this.poReadstatusList.length != 0) {
              for (var j = 0; j < this.poReadstatusList.length; j++) {
                if (this.poReadstatusList[j]['STATUS'] == "A" && this.poReadstatusList[j]['PONUMBER'] == this.poDataList[k]['PO_NUMBER']) {

                  $("#msg1ID" + k).addClass('displayBlock');
                  $("#msgID" + k).addClass('displayNone');
                }
                else {
                  //$("#msg1ID" + k).addClass('displayNone');
                  $("#msgID" + k).addClass('displayBlock');
                }
              }
            }
            else {
              $("#msgID" + k).addClass('displayBlock');
            }

          }
          this.loaderservice.hide();
        }, 1000);
      }
    }, err => {
      this.loaderservice.hide();
    })
    // this.loaderservice.hide();
  }

  sendConfirmation(status, message, subject, topic) {
    // if (message == undefined || message == '')
    //   message = "Accepted";
    // console.log("AM I ???",status,message)
    console.log("ponumber", this.uniquePONumber, this.uniqueInvNumber);
    // this.message = '';
    this.validate = true;
    if (this.uniqueInvNumber != null && this.uniqueInvNumber != "") {

      this.purchaseOrderListService.submitInvoiceChat("", this.uniquePONumber, this.uniqueInvNumber, status, message, subject, topic).subscribe(res => {
        // this.purchaseOrderListService.submitConfirmation(this.purchaseOrderListModel.PONumber, this.uniquePONumber,  this.uniqueInvNumber, status, message, subject, topic).subscribe(res => {
        // console.log("what is the response?" , res[0].message)
        if (res[0].message == "Success") {
          //  this.getQuerry(topic,'')
          message = '';
          this.validate = true;
          this.messageList = [];
          this.TrackOrderListService.getInvMessages(this.uniquePONumber, this.uniqueInvNumber).subscribe(res => {
            console.log("resposne", res[0].poQueryList)
            this.topic = topic
            if (res[0].poQueryList[0] != undefined) {
              this.messageList = res[0].poQueryList
            }
            else {
              this.messageList = res[0].message
            }
            console.log(this.messageList)
          })
        }

        // this.dialogBox.popUpOpen2(res[0].message,'success','purchaseorderlist');
        //   this.toastr.success(res[0].message);
        // location.reload();
        // this.getInvMessages
        this.getPurChaseOrderList();
        this.getinvoiceDataList();
      })
    }
    else {

      console.log("POconfirmation", this.uniquePONumber, "inv", this.uniqueInvNumber);

      this.purchaseOrderListService.submitConfirmation(this.uniquePONumber, status, message, subject, topic).subscribe(res => {
        console.log("what is the response?", res[0].message)
        if (res[0].message == "Success") {
          //  this.getQuerry(topic,'')
          message = '';
          this.validate = true;
          this.messageList = [];
          this.purchaseOrderListService.getMessages(this.uniquePONumber).subscribe(res => {
            console.log("resposne", res[0].poQueryList)
            this.topic = topic
            if (res[0].poQueryList[0] != undefined) {
              this.messageList = res[0].poQueryList
            }
            else {
              this.messageList = res[0].message
            }
            console.log(this.messageList)
          })
        }

        // this.dialogBox.popUpOpen2(res[0].message,'success','purchaseorderlist');
        //   this.toastr.success(res[0].message);
        // location.reload();
        this.getPurChaseOrderList();
      })
    }
  }

  getInvMessages(poNumber, invNumber) {

    // this.purchaseOrderListService.submitInvoiceChat("", this.uniquePONumber,  this.uniqueInvNumber, status, message, subject, topic).subscribe(res => {

    // }
    this.messageList = [];
    this.topic = invNumber
    this.TrackOrderListService.getInvMessages(poNumber, invNumber).subscribe(res => {
      console.log("new method", res);
      if (res[0].poQueryList[0] != undefined) {
        this.messageList = res[0].poQueryList
      }

    })

  }
  searchData(searchvalue) {
    this.poDataList = [];
    this.invoiceDataList = [];
    this.loaderservice.show();
    console.log("value", searchvalue);

    if (searchvalue != undefined || searchvalue == "") {
      // for (var i = 0; i < this.searchList.length; i++) {
      //   console.log(this.searchList[i]['PO_NUMBER'], "Serach")
      //   this.searchPO = [];
      //   this.searchPO = this.searchList[i]['PO_NUMBER'];
      //   this.searchINV = this.searchInvList[i]['INVOICENUMBER'];
      //   // if (this.searchPO.includes(searchvalue) == true) {
      //     if (this.searchPO == searchvalue) {
      //     this.poDataList.push(this.searchList[i]);
      //   }
      //   // // if (this.searchINV.includes(searchvalue) == true) {
      //   //   if (this.searchINV == searchvalue) {
      //   //   this.invoiceDataList.push(this.searchInvList[i]);
      //   // }
      // }
      // for (var i = 0; i < this.searchList.length; i++) {
      //   console.log(this.searchList[i]['PO_NUMBER'], "Serach")
      //   this.searchPO = [];
      //   this.searchPO = this.searchList[i]['PO_NUMBER'];
      //   if (this.searchPO.includes(searchvalue) == true) {
      //     this.poDataList.push(this.searchList[i]);
      //   }
      // }
      // for (var i = 0; i < this.searchInvList.length; i++) {
      //     this.searchINV = this.searchInvList[i]['INVOICENUMBER'];
      //     if (this.searchINV.includes(searchvalue) == true) {
      //       this.invoiceDataList.push(this.searchInvList[i]);
      //     }
      // }
      this.purchaseOrderListService.poInvoiceSearch(searchvalue.trim()).subscribe(res => {
        if (res[0].poData.length > 0) {
          this.poDataList = res[0].poData;
        }
        if (res[0].invData.length > 0) {
          this.invoiceDataList = res[0].invData;
        }
      });
      this.loaderservice.hide();
      setTimeout(() => {
        this.loaderservice.show();
        for (var k = 0; k < this.poDataList.length; k++) {
          console.log("this.statusList.length " + this.poReadstatusList);
          if (this.poReadstatusList.length != 0) {
            for (var j = 0; j < this.poReadstatusList.length; j++) {
              if (this.poReadstatusList[j]['STATUS'] == "A" && this.poReadstatusList[j]['PONUMBER'] == this.poDataList[k]['PO_NUMBER']) {

                $("#msg1ID" + k).addClass('displayBlock');
                $("#msgID" + k).addClass('displayNone');
              }
              else {
                //$("#msg1ID" + k).addClass('displayNone');
                $("#msgID" + k).addClass('displayBlock');
              }
            }
          }
          else {
            $("#msgID" + k).addClass('displayBlock');
          }

        }
        this.loaderservice.hide();
      }, 1000);

    } else if (searchvalue == " " || searchvalue == undefined) {
      this.getPurChaseOrderList();
      this.getinvoiceDataList();
    }

  }

  getalldata(searchKey) {
    if (searchKey == "") {
      this.getPurChaseOrderList();
      this.getinvoiceDataList();
    }
  }
  goToLink(poNumber: string) {
    // const fileURL = URL.createObjectURL(url);
    window.open(blobURL + poNumber + '.pdf')

  }

  getInvDetails(invoicenumber, ponumber) {
    this.router.navigate(['./trackInvoiceDetails'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber) } });
  }



  getPoDetails(POnumber, Date, Amount, Query, Status) {
    let obj1 = {
      "DATE": Date,
      "AMOUNT": Amount,
      "QUERY": Query,
      "STATUS1": Status
    }
    console.log("ponumber is here ==>" + POnumber);
    this.purchaseOrderListService.getPODetails(POnumber).subscribe(res => {
      this.poDetail = res[0].poData
      let merged_obj = {
        ...res[0].poData[0],
        ...obj1
      }

      sessionStorage.setItem("PODetails", JSON.stringify(merged_obj))
      // sessionStorage.setItem("PODetails", this.poDetail);

      // this.router.navigateByUrl("/poOrderView", { state:merged_obj})
      this.router.navigate(['/poOrderView'], {
        queryParams: {
          POnumber: btoa(POnumber), Date: btoa(Date), Amount: btoa(Amount),
          Query: btoa(Query), Status: btoa(Status)
        }
      })

      // sessionStorage.setItem("PODetails", JSON.stringify(merged_obj))
      // this.router.navigate(['/poOrderView'])
    })
  }

  getinvoiceDataList() {
    this.loaderservice.show();
    // this.TrackOrderListService.getInvoiceData().subscribe(res => {
    //   // console.log("Data",res[0].poData)
    //   if (res[0].message != "No Data Found for given Vendor Id") {
    //     this.invoiceDataList = res[0].invoiceData;
    //     console.log("Ststsu", this.invoiceDataList);

    //     this.searchInvList = res[0].invoiceData;
    //     this.loaderservice.hide();
    //   }
    //   else {
    //     this.loaderservice.hide();
    //   }
    // }, err => {
    //   this.loaderservice.hide();
    // });
    this.TrackOrderListService.getInvoiceData('1', 'P', 'NA', 'NA', 'NA', 'NA', 'NA').subscribe(res => {
      if (res[0].message == 'Sucessinvlist') {
        this.loaderservice.show();
        // }
        this.invoiceDataList = res[0].invoiceData;

        //used Currency pipe
        // for (let i = 0; i < this.invoiceDataList.length; i++) {
        //   this.invoiceDataList[i].TOTALAMOUNT = Number(this.invoiceDataList[i].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
        // }
        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
        this.searchInvList = res[0].invoiceData;
        console.log("response====>", res)
        console.log("th list ==>" + JSON.stringify(this.processedinvList));
        this.invoiceData1 = res[0].invoiceData;
        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
        console.log("this.invoiceData1.length" + this.invoiceData1.length);
        this.invoiceDataList = [];
        this.getuniqueinvoice(this.invoiceData1);
        if (this.invoiceDataList.length > 0) {
          this.getmessageColor()
        }

        this.loaderservice.hide();
      }
      else {
        this.loaderservice.hide();
      }
    }, err => {
      this.loaderservice.hide();
    });
    // setTimeout(() => {
    // this.loaderservice.show();

    // }, 50); err => {
    // console.log("error here",err);

    this.loaderservice.hide();
    // }
    this.loaderservice.hide();
  }

  getmessageColor() {
    setTimeout(() => {


      if (this.invoiceDataList.length != 0) {
        for (var k = 0; k < 5; k++) {
          console.log("this.statusList.length " + this.statusList.length);
          if (this.statusList.length != 0) {
            for (var j = 0; j < this.statusList.length; j++) {
              if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoiceDataList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoiceDataList[k]['PO_NUMBER']) {

                $("#msg12ID" + k).addClass('displayBlock');
                $("#msgID11" + k).addClass('displayNone');
              }
              else {
                // $("#msg12ID" + k).addClass('displayNone');
                $("#msgID11" + k).addClass('displayBlock');
              }
            }
          }
          else {
            $("#msgID11" + k).addClass('displayBlock');
          }

        }
        this.loaderservice.hide();
      }
      else {
        this.loaderservice.hide();
      }
    }, 500);

  }

  downloadPo(po_number, singlepodownload) {
    this.loaderservice.show();
    console.log(po_number);
    this.DecodedFile = [];
    this.TrackOrderListService.getfile(po_number, singlepodownload)
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
          this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
        }
        // if (result[0].status == "Fail") {
        //   this.dialogBox.popUpOpen2(result[0].message, 'error', 'profiledata');
        // }
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err));


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

  download(savedfilename, singlepodownload, actualfilename) {
    console.log(savedfilename);
    this.DecodedFile = [];
    if (savedfilename == "" || savedfilename == null || actualfilename == "" || actualfilename == null
      || savedfilename == undefined || actualfilename == undefined) {
      this.dialogBox.popUpOpen2("File not present", 'success', 'purchaseorderlist');
      return;
    }
    this.TrackOrderListService.getfile(savedfilename, singlepodownload)
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
            window.navigator.msSaveOrOpenBlob(blob, actualfilename);
          }
          else if (agent.indexOf('firefox') > -1) {
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: "application/octet-stream" });
            saveAs(blob, actualfilename);
          }
          else {
            console.log(data, 'data')
            let FileToDownload = 'data:application/octet-stream;base64,' + data;
            var link = document.createElement("a");
            const filename = actualfilename;
            link.href = FileToDownload;
            link.download = filename;
            // link.click();
            var extensionName = filename.substr(filename.lastIndexOf('.') + 1)
            this.getFileType(extensionName);
            this.trackOrderListService.downloadEncryptedFile(data, this.extensionType);

          }
        }
        else if (result[0].reason != 'none') {
          this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
        }
        // else if (result[0].status == "Fail") {
        // 	this.dialogBox.popUpOpen2(result[0].message ,'success','purchaseorderlist');
        // }
      }, err => {
        console.log(JSON.stringify(err))
      }
      );

  }

  getmessageStatus() {
    this.purchaseOrderListService.getChatStatus().subscribe(res => {
      if (res[0].message != "No Data Found for given Vendor Id") {
        console.log("is Data Coming????", res[0].poQueryList);
        this.statusList = res[0].poQueryList
      }
      else {
        this.statusList = [];
      }

    })
  }

  Check(message) {
    console.log("lenght", message.value.trim().length);

    //  var myVar='A';
    // var myVarAscii = message.value.charCodeAt(0);
    // console.log("Ascii Value :", myVarAscii);

    this.validate = true;
    // message.value.trim();
    if (message.value != "" && message.value != " " && message.value != null && message.value.trim().length != 0) {
      this.validate = false;
    }


  }


  getuniqueinvoice(array) {
    for (var i = 0; i < this.invoiceData1.length; i++) {
      this.equalfound = false;
      var tempo = this.invoiceData1[i].PO_NUMBER;
      var tempinvo = this.invoiceData1[i].INVOICENUMBER;
      if (i + 1 != this.invoiceData1.length) {
        for (var j = i + 1; j < this.invoiceData1.length; j++) {

          if (tempo == this.invoiceData1[j].PO_NUMBER &&
            tempinvo == this.invoiceData1[j].INVOICENUMBER) {
            console.log("innini if");
            this.equalfound = true;
          }
        }

      }
      if (this.equalfound == false) {
        console.log("innini push");
        this.invoiceDataList.push(this.invoiceData1[i])
      }
    }
    return this.invoiceDataList;
  }
  submitInvoicePopup() {
    this.dialogBox.submitInvoicepopUp();
    $("#withPo").prop('checked', false);
    $("#withoutPo").prop('checked', false);
  }


}
