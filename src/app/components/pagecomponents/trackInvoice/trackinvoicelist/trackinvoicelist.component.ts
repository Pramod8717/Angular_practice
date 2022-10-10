import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import { saveAs } from 'file-saver';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import * as moment from 'moment/moment';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';
declare var $: any;
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../../../commoncomponents/popup/popup.component';
@Component({
  selector: 'app-trackinvoicelist',
  templateUrl: './trackinvoicelist.component.html',
  styleUrls: ['./trackinvoicelist.component.css']
})
export class TrackInvoiceListComponent implements OnInit {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  public invoiceList = new FormGroup({
    POrealNumber: new FormControl(''),
    InvoiceNumber: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    POOrderNumber: new FormControl(''),
    POlineitemNumber: new FormControl(''),
    Plant: new FormControl(''),
    withoutpo: new FormControl(false)
    // searchtype: new FormControl('')
    // paymentMethod: new FormControl('', Validators.required),
    // paymentStatus: new FormControl('', Validators.required),
    // Topicker: new FormControl('', Validators.required)
  })
  confirmationNoAction: boolean;
  invoiceData: any = [];
  invoiceDatawopo: any = [];
  messageList: any = [];
  mPageNo: number = 1;
  pageSize: number = 50;
  totalItems: any;
  DecodedFile: any;
  topic: any;
  recipientEmail: any;
  validate: boolean = true;
  message: string;
  submittedinvList: any = [];
  partiallypaidinvList: any = [];
  processedinvList: any = [];
  paidinvList: any = [];
  onholdinvList: any = [];
  acceptedinvList: any = [];
  allinvlist: any[];
  filteredlist: any = [];
  invDataList: any = [];
  pendinginvList: any = [];
  rejectedinvList: any = [];
  shortQuantityList: any = [];
  returnedinvList: any = [];
  grninvList: any = [];
  managerpendinginvList: any = [];
  responseList: any = [];
  searchList: any = [];
  statusList: any = [];
  invoicenumber: any = [];
  mindate: any;
  maxdate: any;
  disable: boolean = false;
  disableprevious: boolean = false;
  disablenext: boolean = false;
  todateerror: boolean = false;
  fromdateerror: boolean = false;
  invoicenumberpresent: boolean = false;
  ponumberpresent: boolean = false;
  fromtodatepresent: boolean = false;
  filteredinvoiceData: any = [];
  filteredponumberData: any = [];
  filtereddate: any = [];
  pgNolist: any[];
  filteredlineitemnumber: any[];
  filteredordernumber: any[];
  ordernumberpresent: boolean = false;
  lineitempresent: boolean = false;
  fullinvoiceData: any = [];
  fullinvoiceData1: any = [];
  type: string;

  actualpo: string;
  actualline: string;
  actualorder: string;
  urlparamsvalues: boolean;
  approximatecheck: boolean = false;
  // disablepage: boolean = true;
  paginationpagenumber:number =1;
  temp: boolean = false;
  disableoff: boolean = false;
  withoutpotableshow: boolean = false;
  uniquePONumber: any;
  uniqueInvNumber: any;
  filterwithoutpolist: any = [];
  invoiceData1: any = [];
  invoiceDataset: any = [];
  equalfound: boolean = false;
  withoutpo: boolean = false;
  headdisableoff: boolean = false;
  ponumber: any = [];
  mintodate: Date;
  slice: number;
  pageNo: number;
  Mpage: number;
  test: any = [];
  pageName: any;
  histinvoicedetails: any = [];
  historic: string = 'false';
  currstatus: any = 'P';
  innum: string = 'NA';
  ponum: string = 'NA';
  fd: string = 'NA';
  td: string = 'NA';
  checkboxvalue: string;
  endpagenumber: number = 1;
  PlantList: any = [];
  tempPlantList: any = [];
  plantpresent: boolean = false;
  plant: any = "NA";
  extensionType: string;
  invoiceCountAsPerStatus:any=[];
  pendingPo :any = 0;

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private purchaseOrderListService: PurchaseOrderListService,
    private trackOrderListService: TrackOrderListService, private toastr: ToastrService,
    private loaderservice: LoaderService) { }

  // public hasError = (controlName: string, errorName: string) => {
  //   return this.paymentList.controls[controlName].hasError(errorName);
  // }

  ngOnInit(): void {
    this.disableoff = false;
    this.allinvlist = [];
    $("body").on("click", ".status-link", function () {
      $('.inv-wrapper.active').removeClass('active');
      $(this).parent().addClass('active');
    });



    // this.getInvoiceData();
    // this.getfullInvoiceData();
    this.getmessageStatus();
    // this.purchaseOrderListService.getReadStatus().subscribe(res => { console.log("response", res) })
    if (this.route.snapshot.queryParamMap.get('t')) {
      this.urlparamsvalues = true;
      this.route.queryParams.subscribe(params => {
        console.log(params); // { order: "popular" }

        this.type = atob(params.t);
        this.actualpo = atob(params.p);
        this.actualline = atob(params.l);
        this.actualorder = atob(params.o);
        console.log(this.actualorder);
      });
      var searchponumber = "";
      var searchlineitemnumber = "";
      var searchordernumber = "";
      searchponumber = this.actualpo;
      searchlineitemnumber = this.actualline;
      searchordernumber = this.actualorder;
      // if (this.type == 'poitem') {
      //   searchponumber = this.actualpo;
      //   searchlineitemnumber = this.actualline;
      //   searchordernumber = this.actualorder;
      // }
      // else if (this.type == 'lineitem') {
      //   searchlineitemnumber = this.value;
      // }
      // else if (this.type == 'orderitem') {
      //   searchordernumber = this.value;
      // }
      this.trackPayment(searchponumber, searchlineitemnumber, searchordernumber);
    }
    else {
      this.urlparamsvalues = false;
      console.log(" in innininnin hererere");
      this.getInvoiceData(this.paginationpagenumber);
    }
  }

  getInvoiceData(pageno) {
    // this.loaderservice.show();
    this.disableprevious = true;
    this.onholdinvList = [];
    this.submittedinvList = [];
    this.partiallypaidinvList = [];
    this.pendinginvList = [];
    this.grninvList = [];
    this.rejectedinvList = [];
    this.shortQuantityList = [];
    this.managerpendinginvList = [];
    // this.invList = [];
    this.paidinvList = [];
    this.invoiceData1 = [];
    this.invoiceData = [];
    this.processedinvList = [];
    this.acceptedinvList = [];
    this.returnedinvList = [];
    this.trackOrderListService.getInvoiceData(pageno, this.currstatus, 'NA', 'NA', 'NA', 'NA',this.plant).subscribe(res => {
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
      if (res[0].message == 'Sucessinvlist') {
        // this.loaderservice.show();
        // }
        this.invoiceData1 = res[0].invoiceData;
        // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
        // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.M;
        // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.P;
        // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = 0;
        // }else{
        //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
        // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
        console.log("this.invoiceData1.length", this.invoiceData1);
        for (var n = 0; n < this.invoiceData1.length; n++) {
          if (this.invoiceData1[n].INVOICENUMBER == "hello") {
            this.test.push(this.invoiceData1[n]);
          }
        }
        console.log("this.invoiceData1[n] ==> ", this.test);
        this.getuniqueinvoice(this.invoiceData1);


        console.log("this.invoiceData.length" + this.invoiceData.length);
        this.searchList = res[0].invoiceData;
        console.log("response====>", res)
        console.log("this.invoiceData ==>", this.invoiceData);
        // for (let i = 0; i < this.invoiceData.length; i++) {
        // this.invoiceData[i].TOTALAMOUNT = parseFloat(this.invoiceData[i].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
        // }
        // for (let i = 0; i < this.invoiceData.length; i++) {
        //   this.invoiceData[i].TOTALAMOUNT = Number(this.invoiceData[i].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
        //   if(this.invoiceData[i].PAYMENTAMOUNT !=null)
        //   {
        //     this.invoiceData[i].PAYMENTAMOUNT = Number(this.invoiceData[i].PAYMENTAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')

        //   }

        // }
        // this.totalItems = this.invoiceData.length;
        // console.log("PODEtails in details", this.poDetail)
        sessionStorage.setItem("InvoiceData", JSON.stringify(this.invoiceData));
        this.allinvlist = this.invoiceData;
        for (var j = 0; j < this.invoiceData.length; j++) {
          // console.log("this.invoiceData[j].STATUS" + this.invoiceData[j].STATUS);
          if (this.invoiceData[j].STATUS == 'O') {
            this.onholdinvList.push(this.invoiceData[j]);
          }
          //         else if (this.invoiceData[j].STATUS == 'A') {
          // this.acceptedinvList = this.invoiceData[j];
          //         }
          else if (this.invoiceData[j].STATUS == 'S') {
            this.submittedinvList.push(this.invoiceData[j]);
          }
          else if (this.invoiceData[j].STATUS == 'PP') {
            this.partiallypaidinvList.push(this.invoiceData[j]);
          }
          else if (this.invoiceData[j].STATUS == 'PD') {
            this.paidinvList.push(this.invoiceData[j]);
          }
          else if (this.invoiceData[j].STATUS == 'PRO') {
            this.processedinvList.push(this.invoiceData[j]);
          }
          else if (this.invoiceData[j].STATUS == 'P' || this.invoiceData[j].STATUS == 'M') {
            this.pendinginvList.push(this.invoiceData[j]);
          }
          else if (this.invoiceData[j].STATUS == 'A') {
            this.acceptedinvList.push(this.invoiceData[j]);
          }
          else if (this.invoiceData[j].STATUS == 'G') {
            this.grninvList.push(this.invoiceData[j]);
          }
          // else if (this.invoiceData[j].STATUS == 'M') {
          //   this.managerpendinginvList.push(this.invoiceData[j]);
          // }
          else if (this.invoiceData[j].STATUS == 'R') {
            this.rejectedinvList.push(this.invoiceData[j]);
          }
          else if (this.invoiceData[j].STATUS == 'V') {
            this.returnedinvList.push(this.invoiceData[j]);
          }
          else if (this.invoiceData[j].CREDITADVICENO != null) {
            this.shortQuantityList.push(this.invoiceData[j]);
          }
        }
        this.invoiceData = this.pendinginvList;
        console.log("th list ==>" + JSON.stringify(this.invoiceData));

        // this.totalItems = this.invoiceData.length;
        this.totalItems = res[0].invoicelistpages;
        // if(Number(res[0].invoicelistpages)/this.pageSize < 1)
        this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages)/this.pageSize))
        if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
        {
          this.disablenext = true;
        }
        else
        {
          this.disablenext = false;
        }
        this.loaderservice.hide();
      }
      // if (res[0].message1 =='Sucessinvlist1') {
      //   this.invoiceDatawopo = res[0].invoiceDataWOPO;
      //   for (let i = 0; i < this.invoiceDatawopo.length; i++) {
      //     this.invoiceDatawopo[i].TOTALAMOUNT = Number(this.invoiceDatawopo[i].TOTALAMOUNT)
      //     // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
      //     this.invoiceDatawopo[i].STATUS="WP";
      //   }
      //   // this.totalItems = res[0].pagesofwopo;
      // }
      if (this.invoiceData.length > 0) {
        setTimeout(() => {
          this.getmessageColor();
        }, 250);

      }
      if (res[0].message != 'Sucessinvlist') {
        // this.dialogBox.popUpOpen2( res[0].message ,'error','purchaseorderlist');
        // const dialogConfig = new MatDialogConfig();
        // dialogConfig.data = {
        //   message: res[0].message,
        //   condition: 'error',
        //   page: 'purchaseorderlist'
        // };
        // const mydata = dialogConfig.data;
        // console.log("PopupComponent", mydata);

        // const dialogRef = this.dialog.open(PopupComponent, {
        //   panelClass: 'custom-modalbox',

        //   width: '400px',
        //   data: { datakey: dialogConfig.data }

        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log(`Dialog result1: ${result}`);
        // });
      }
    });
    // this.loaderservice.show();

    // this.loaderservice.hide();
    // this.invoiceList.reset();
  }


  getRefresh() {
    console.log("mpageno========>", this.mPageNo);
    $('.inv-wrapper').removeClass('active');
    $('#stManagerpending').addClass('active');
    // if(action == 'PREV')
    // {
    //   if(this.paginationpagenumber !=1)
    //   {
    //     this.paginationpagenumber = this.paginationpagenumber -1;
    //   }
    //   else{
    //     return;
    //   }
      
    // }
    // else if(action == 'NEXT')
    // {
    //   this.paginationpagenumber = this.paginationpagenumber +1;
    // }
    
    this.currstatus = 'P';
    // if (this.mPageNo == 1) {
    //   this.getInvoiceData(this.paginationpagenumber);
    // }
    // else {
    //   this.refresh();
    // }
    this.refresh();
  }
  refresh() {
    this.invoiceData1 = [];
    this.invoiceData = [];
    this.paginationpagenumber = 1;
    this.disableprevious = true;
    this.trackOrderListService.getInvoiceData(this.paginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA',this.plant).subscribe(res => {
      if (this.disableoff == true) {
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
        if (res[0].message1 == "Sucessinvlist1") {
          this.invoiceData = res[0].invoiceDataWOPO;
          // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
          // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
          //   this.pendingPo = this.invoiceCountAsPerStatus.M;
          // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
          //   this.pendingPo = this.invoiceCountAsPerStatus.P;
          // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
          //   this.pendingPo = 0;
          // }else{
          //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
          // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
          this.totalItems = res[0].invoicewopopages;
          this.endpagenumber = Math.ceil((Number(res[0].invoicewopopages)/this.pageSize))
          if(Number(res[0].invoicewopopages)/this.paginationpagenumber <= this.pageSize)
          {
            this.disablenext = true;
          }
          else
          {
            this.disablenext = false;
          }
          setTimeout(() => {
            // this.loaderservice.show();
            // debugger;
            console.log("page no :  ", this.pageNo + "mpage:", this.Mpage + "mpage no ", this.mPageNo);
            console.log("this.statusList.length " + this.statusList.length);
            console.log("this.invoiceData.length " + this.invoiceData.length);
            var difference = this.Mpage - this.pageNo;
            let count = 0;
            for (var k = this.pageNo; k < this.Mpage; k++) {
              console.log("this.statusList.length " + this.statusList.length);
              if (this.statusList.length != 0) {
                for (var j = 0; j < this.statusList.length; j++) {
                  // if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.invoiceData[k]['INVOICENUMBER']) {
                  if (this.statusList[j]['STATUS'] == "A" &&
                    this.statusList[j]['INVOICENUMBER'] == this.invoiceData[k]['INVOICENUMBER'] &&
                    this.statusList[j]['PONUMBER'] == this.invoiceData[k]['PO_NUMBER']) {
  
                    $("#green" + (count)).addClass('displayBlock');
                    $("#white" + (count)).addClass('displayNone');
                    // $("#green" + (k-difference)).addClass('displayBlock');
                    // $("#white" + (k-difference)).addClass('displayNone');
                  }
                  else {
                    //$("#green" + k).addClass('displayNone');
                    $("#white" + (count)).addClass('displayBlock');
                  }
                }
              }
              else {
                $("#white" + (count)).addClass('displayBlock');
              }
              count++;
            }
            this.loaderservice.hide();
          }, 100);
        }
        else {
          this.invoiceData = [];
          this.totalItems = 0;
        }
      }
      else {
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
        if (res[0].message == "Sucessinvlist") {
          this.invoiceData = res[0].invoiceData;
          // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
          // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
          //   this.pendingPo = this.invoiceCountAsPerStatus.M;
          // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
          //   this.pendingPo = this.invoiceCountAsPerStatus.P;
          // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
          //   this.pendingPo = 0;
          // }else{
          //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
          // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
          this.totalItems = res[0].invoicelistpages;
          this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages)/this.pageSize))
          if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
          {
            this.disablenext = true;
          }
          else
          {
            this.disablenext = false;
          }
          setTimeout(() => {
            // this.loaderservice.show();
            // debugger;
            console.log("page no :  ", this.pageNo + "mpage:", this.Mpage + "mpage no ", this.mPageNo);
            console.log("this.statusList.length " + this.statusList.length);
            console.log("this.invoiceData.length " + this.invoiceData.length);
            var difference = this.Mpage - this.pageNo;
            let count = 0;
            for (var k = this.pageNo; k < this.Mpage; k++) {
              console.log("this.statusList.length " + this.statusList.length);
              if (this.statusList.length != 0) {
                for (var j = 0; j < this.statusList.length; j++) {
                  // if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.invoiceData[k]['INVOICENUMBER']) {
                  if (this.statusList[j]['STATUS'] == "A" &&
                    this.statusList[j]['INVOICENUMBER'] == this.invoiceData[k]['INVOICENUMBER'] &&
                    this.statusList[j]['PONUMBER'] == this.invoiceData[k]['PO_NUMBER']) {
  
                    $("#green" + (count)).addClass('displayBlock');
                    $("#white" + (count)).addClass('displayNone');
                    // $("#green" + (k-difference)).addClass('displayBlock');
                    // $("#white" + (k-difference)).addClass('displayNone');
                  }
                  else {
                    //$("#green" + k).addClass('displayNone');
                    $("#white" + (count)).addClass('displayBlock');
                  }
                }
              }
              else {
                $("#white" + (count)).addClass('displayBlock');
              }
              count++;
            }
            this.loaderservice.hide();
          }, 100);
        }
        else {
          this.invoiceData = [];
          this.totalItems = 0;
        }
      }
     
    });
  }


  getmessageColor() {
    setTimeout(() => {
      // this.loaderservice.show();
      for (var k = 0; k < this.invoiceData.length; k++) {
        console.log("this.statusList.length " + this.statusList.length);
        if (this.statusList.length != 0) {
          for (var j = 0; j < this.statusList.length; j++) {
            // if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.invoiceData[k]['INVOICENUMBER']) {
            if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoiceData[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoiceData[k]['PO_NUMBER']) {
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
    }, 100);
    //  err => {
    //   alert(err);

    //   this.loaderservice.hide();
    // }
  }
  // getfullInvoiceData() {

  //   this.onholdinvList = [];
  //   this.submittedinvList = [];
  //   this.partiallypaidinvList = [];
  //   this.paidinvList = [];
  //   this.processedinvList = [];
  //   this.acceptedinvList = [];
  //   this.trackOrderListService.getfullInvoiceData().subscribe(res => {
  //     if (!res[0].message) {
  //       this.loaderservice.show();
  //       // }
  //       this.fullinvoiceData = res[0].invoiceData;


  //       console.log("th list ==>" + JSON.stringify(this.processedinvList));
  //       this.loaderservice.hide();
  //     }
  //   });


  //   this.invoiceList.reset();
  // }


  formatDate(date) {
    var dt = new Date(date),
      // dformat = [ d.getFullYear(),
      //   d.getMonth()+1,
      //   d.getDate()
      //  ].join('-')+' '+
      //  [d.getHours(),
      //   d.getMinutes(),
      //   d.getSeconds()].join(':') +'.0';
      dformat = `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}.0`

    return dformat
  }
  trackPayment(searchponumber, searchlineitemnumber, searchordernumber) {
    this.historic = "false";
    this.paginationpagenumber = 1;
    this.disableprevious = true;
    // this.mPageNo = 1;
   
    if(this.checkboxvalue == "ASWP"){
      this.currstatus = 'ASWP';
      this.disableoff = true;

    }else if(this.checkboxvalue == "ASSQ"){
      this.disableoff = false;
      this.currstatus = 'ASSQ';
    }else{
      this.currstatus = 'AS';
    }
   

    this.invoiceData = [];
    this.approximatecheck = true;
    console.log("this.searchordernumber ==>" + searchordernumber);
    // this.loaderservice.show();
    this.invoiceData = [];
    this.filteredinvoiceData = [];
    this.filteredponumberData = [];
    this.filtereddate = [];
    this.filteredlineitemnumber = [];
    this.filteredordernumber = [];
    this.invoicenumberpresent = false;
    this.plantpresent = false;
    this.ponumberpresent = false;
    this.fromtodatepresent = false;
    console.log(searchponumber, 'searchponumber');
    if (searchponumber != '') {
      this.invoiceList.controls.POrealNumber.setValue(searchponumber);
    }
    if (searchlineitemnumber != '') {
      this.invoiceList.controls.POlineitemNumber.setValue(searchlineitemnumber);
    }
    if (searchordernumber != '') {
      this.invoiceList.controls.POOrderNumber.setValue(searchordernumber);
    }
    
    if (this.invoiceList.controls['Plant'].value) {
      console.log("this.invoiceList.controls['Plant'].value "+this.invoiceList.controls['Plant'].value);
      for(var b =0;b<this.tempPlantList.length;b++)
    {
      console.log("this.tempPlantList[b].PLANTNAME "+this.tempPlantList[b].PLANTNAME);
      if(this.tempPlantList[b].PLANTNAME == this.invoiceList.controls['Plant'].value.trim())
      {
        this.plant = this.tempPlantList[b].PLANTCODE;
      }
    }
      this.plantpresent = true;
      // this.plant = this.invoiceList.controls['Plant'].value.trim();
    }
    else {
      this.plant = 'NA';
    }
    if (this.invoiceList.controls['InvoiceNumber'].value) {
      this.invoicenumberpresent = true;
      this.innum = this.invoiceList.controls['InvoiceNumber'].value.trim();
    }
    else {
      this.innum = 'NA';
    }
    if (this.invoiceList.controls['POrealNumber'].value) {
      this.ponumberpresent = true;
      this.ponum = this.invoiceList.controls['POrealNumber'].value.trim();
    }
    else {
      this.ponum = 'NA';
    }
    if (this.invoiceList.controls['fromDate'].value) {
      this.fromtodatepresent = true;
      this.fd = moment(new Date(this.invoiceList.controls['fromDate'].value)).format("DD/MM/YYYY").trim();
      this.td = moment(new Date(this.invoiceList.controls['toDate'].value)).format("DD/MM/YYYY").trim();
    }
    else {
      this.fd = 'NA';
      this.td = 'NA';
    }

    this.trackOrderListService.getInvoiceData(this.paginationpagenumber, this.currstatus, 
      this.innum,this.ponum, this.fd, this.td,this.plant).subscribe(res => {
        let advanceSearcBox = document.getElementById("advanceSearcBox");
        let closeArrow = document.getElementById("closeArrow");
        let openArrow = document.getElementById("openArrow");
        advanceSearcBox.style.display = "none";
        openArrow.style.display = "block";
        closeArrow.style.display = "none";
        // this.invoiceList.reset();
        if (this.disableoff == true) {
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
          if (res[0].message1 == "Sucessinvlist1") {
            this.invoiceData = res[0].invoiceDataWOPO;
            // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.M;
            // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.P;
            // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = 0;
            // }else{
            //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
            this.totalItems = res[0].invoicewopopages;
            this.endpagenumber = Math.ceil((Number(res[0].invoicewopopages)/this.pageSize))
            if(Number(res[0].invoicewopopages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
          }
          else {
            this.invoiceData = [];
            this.totalItems = 0;
          }
        }
        else {
          if (res[0].message == "Sucessinvlist") {
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
            this.invoiceData = res[0].invoiceData;
            // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.M;
            // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.P;
            // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = 0;
            // }else{
            //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
            this.totalItems = res[0].invoicelistpages;
            this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages)/this.pageSize))
            if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
          }
          else {
            this.invoiceData = [];
            this.totalItems = 0;
          }
        }
       
      });
   
  }

 

  showSubmitBox(ev) {
    this.confirmationNoAction = true;
  }
 

  ShowpopupMessage(ev) {
    $("#popupMessage").css("visibility", "visible");
    $("#popupMessage").css("opacity", "1");
    (<any>$("#popupComment").modal('show'));
    //     setTimeout(() => {
    //   $(".messageChatWrapper").stop().animate({ scrollTop: $(".messageChatWrapper")[0].scrollHeight}, 10);
    // },500);
  }
  ClosepopupMessage(ev) {
    $("#popupMessage").css("visibility", "hidden");
    $("#popupMessage").css("opacity", "0");
    this.getmessageStatus();
    // this.getInvoiceData();
  }

  changesearch(event) {

  }

  getInvDetails(invoicenumber, ponumber, creditnote) {
    this.router.navigate(['./trackInvoiceDetails'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), credit: btoa(creditnote) } });
  }
  createCreditNote(invoicenumber, ponumber, creditAdviceNo) {
    this.pageName = 'trackInvoice';
    this.router.navigate(['./createCreditNote'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), adviceNo: btoa(creditAdviceNo), showCreditDetails: btoa(this.pageName) } });
  }
  getCreditNoteDetails(invoicenumber, ponumber, creditAdviceNo, creditNoteNo) {
    this.pageName = 'trackInvoice';
    this.router.navigate(['./createCreditNote'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), adviceNo: btoa(creditAdviceNo), showCreditDetails: btoa(this.pageName), creditNoteNo: btoa(creditNoteNo) } });
  }
  downloadinvoicelist() {
    this.invoicenumber = [];
    this.ponumber = [];
    // this.loaderservice.show();
    console.log("this.invoiceData.length" + this.invoiceData.length);
    for (var k = 0; k < this.invoiceData.length; k++) {
      this.invoicenumber.push(this.invoiceData[k].INVOICENUMBER);
      this.ponumber.push(this.invoiceData[k].PO_NUMBER);
    }
    // this.trackOrderListService.downloadInvoiceData(this.invoicenumber, this.ponumber).subscribe(res => {
      this.trackOrderListService.downloadInvoiceData(this.currstatus,this.ponum,this.innum,this.fd,this.td).subscribe(res => {

      // this.purchaseOrderListService.getpolistfile(this.downloaddatalist).subscribe(res => {
      // console.log(res[0].message)

      if (res[0].message == "Success") {
        // if (this.profileModel != undefined && this.profileModel != null) {
        // this.toastr.success("Sucess!!")
        // this.router.navigate(['/dashboard'])
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
      else {
        this.loaderservice.hide();
        // this.dialogBox.popUpOpen2('Failed to download !!', 'error', 'trackinvoicelist');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Failed to download !!',
          condition: 'error',
          page: 'trackinvoicelist'
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
        // this.toastr.error("Failed to download !!")
      }
      // });

    })
  }

  getInvoiceQuerry(ponumber, invoicenumber, contactpersonemailid) {
    console.log("inside", invoicenumber);

    this.recipientEmail = contactpersonemailid;
    sessionStorage.setItem("receiverMail", contactpersonemailid)
    // this.purchaseOrderListService.getMessages(invoicenumber).subscribe(res => {
    this.trackOrderListService.getInvMessages(ponumber, invoicenumber).subscribe(res => {
      console.log("resposne", res[0].message)
      this.messageList = [];
      this.topic = invoicenumber
      if (res[0].poQueryList[0] != undefined) {
        this.messageList = res[0].poQueryList
      }
      // else {
      //   this.messageList = res[0].message
      // }
      console.log(this.messageList)
    })
  }

  sendConfirmation(status, message, subject, topic) {
    // if (message == undefined || message == '')
    //   message = "Accepted";
    // console.log("AM I ???",status,message)
    // $(".messageChatWrapper").stop().animate({ scrollTop: $(".messageChatWrapper")[0].scrollHeight}, 1000);


    this.purchaseOrderListService.submitInvoiceChat("", this.uniquePONumber, this.uniqueInvNumber, status, message, subject, topic).subscribe(res => {
      // this.purchaseOrderListService.submitConfirmation("", status, message, subject, this.topic).subscribe(res => {
      // console.log("what is the response?" , res[0].message)
      if (res[0].message == "Success") {
        //  this.getQuerry(topic,'')
        // this.message = ' ';
        this.messageList = [];
        this.validate = true;
        this.message = "";
        this.trackOrderListService.getInvMessages(this.uniquePONumber, this.uniqueInvNumber).subscribe(res => {
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
      // this.dialogBox.popUpOpen2(res[0].message,'success','trackinvoicelist');
      // this.toastr.success(res[0].message);
      // location.reload();
    })
  }

  Check(message) {
    this.validate = true
    if (message.value != "" && message.value != " " && message.value != null && message.value.trim().length != 0) {
      this.validate = false;
    }


  }

checkbox(){
    var story = '';
    var negstory = '';
    $(".chb").change(function() {
      var status = $(this).prop("checked");
      var negstatus = $(this).prop("unchecked");
     
      $(".chb").prop('checked', false);
      $(this).prop('checked', true);
      if (status === false) {
        $(this).prop('checked', false);
        // this.headdisableoff = true;
      } 
      else{
        // this.headdisableoff = false;
      }
     
      story = $('input[type=checkbox]:checked').val();
      negstory =$("input:checkbox:not(:checked)").val()
      // negstory = $('input[type=checkbox]:checked').val();
      console.log("checked value",story) ;
      console.log("Unchecked value",negstory) ;
      console.log("status is here ==> "+status);
      console.log("status is here uncheck ==> "+negstatus);
     });  
      
     setTimeout(() => {
      this.checkboxvalue = story;
      console.log("checked value..........",this.checkboxvalue) ;
       if(this.checkboxvalue == "ASWP"){
         this.currstatus = "ASWP";
      this.headdisableoff = true;

    }else if(this.checkboxvalue == "ASSQ" || negstory == 'ASWP'){
      this.headdisableoff = false;
      this.currstatus = "ASSQ";
    }
     }, 50);
     
     
    

    }

  gettrackInvList(action) {
    this.loaderservice.show();
    this.invoiceData = [];
     if(action == 'PREV')
    {
      if(this.paginationpagenumber !=1)
      {
        this.paginationpagenumber = this.paginationpagenumber -1;
        if(this.paginationpagenumber == 1)
        {
          this.disableprevious = true;
        }
        else
        {
          this.disableprevious = false;
        }
      }
      else{
        return;
      }
      
    }
    else if(action == 'NEXT')
    {
      this.paginationpagenumber = this.paginationpagenumber +1;
      this.disableprevious = false;
      
    }
      else if(action == 'HOME')
      {
        this.paginationpagenumber = 1;
        this.disableprevious = true;

      }
      else if(action == 'END')
      {

      this.paginationpagenumber = this.endpagenumber;
      if(this.paginationpagenumber == 1)
      {
        this.disableprevious = true;
      }
      else
      {
        this.disableprevious = false;
      }
      }
    console.log("this.disableoff " + this.disableoff);
    console.log("this.ponum " + this.ponum);
    console.log("this.innum " + this.innum);
    if (this.currstatus == "AS") {
      this.trackOrderListService.getInvoiceData(this.paginationpagenumber, this.currstatus, this.innum, this.ponum, this.fd, this.td,this.plant).subscribe(res => {

       
        if (this.disableoff == true) {
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
          if (res[0].message1 == 'Sucessinvlist1') {
            this.invoiceData = res[0].invoiceDataWOPO;
            // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.M;
            // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.P;
            // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = 0;
            // }else{
            //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
            if (this.invoiceData.length > 0) {
              for (let i = 0; i < this.invoiceData.length; i++) {
                this.invoiceData[i].TOTALAMOUNT = Number(this.invoiceData[i].TOTALAMOUNT)
                // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
                this.invoiceData[i].STATUS = "WP";
              }
              this.totalItems = res[0].invoicewopopages;
              if(Number(res[0].invoicewopopages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
              // this.loaderservice.hide();
            }
            else {
              // this.loaderservice.hide();
              this.invoiceData = [];
              this.totalItems = 0;
            }

          }
        }
        else {
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
          if (res[0].message == 'Sucessinvlist') {

            this.invoiceData = res[0].invoiceData;
            // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.M;
            // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.P;
            // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = 0;
            // }else{
            //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
            console.log("th list ==>" + JSON.stringify(this.invoiceData));
            // this.totalItems = this.invoiceData.length;
            this.totalItems = res[0].invoicelistpages;
            // this.loaderservice.hide();
            console.log("res[0].invoicelistpages "+res[0].invoicelistpages);
            console.log("this.paginationpagenumber "+this.paginationpagenumber);
            console.log("this.pageSize "+this.pageSize);
            if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
          }
          else {
            // this.loaderservice.hide();
            this.invoiceData = [];
            this.totalItems = 0;
          }

        }
        this.loaderservice.hide();
      });

    }
    else {
      this.trackOrderListService.getInvoiceData(this.paginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA',this.plant).subscribe(res => {
        if (this.disableoff == true) {
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
          if (res[0].message1 == 'Sucessinvlist1') {
            this.invoiceData = res[0].invoiceDataWOPO;
            // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.M;
            // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.P;
            // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = 0;
            // }else{
            //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
            if (this.invoiceData.length > 0) {
              for (let i = 0; i < this.invoiceData.length; i++) {
                this.invoiceData[i].TOTALAMOUNT = Number(this.invoiceData[i].TOTALAMOUNT)
                // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
                this.invoiceData[i].STATUS = "WP";
              }
              this.totalItems = res[0].invoicewopopages;
              if(Number(res[0].invoicewopopages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
              this.loaderservice.hide();
            }
            else {
              this.invoiceData = [];
              this.totalItems = 0;
              this.loaderservice.hide();
            }

          }

        }
        else {
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
          if (res[0].message == 'Sucessinvlist') {

            this.invoiceData = res[0].invoiceData;
            // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
            // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.M;
            // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = this.invoiceCountAsPerStatus.P;
            // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
            //   this.pendingPo = 0;
            // }else{
            //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
            // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
            console.log("th list ==>" + JSON.stringify(this.invoiceData));
            // this.totalItems = this.invoiceData.length;
            this.totalItems = res[0].invoicelistpages;
            // this.loaderservice.hide();
            if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
          }
          else {
            // this.loaderservice.hide();
            this.invoiceData = [];
            this.totalItems = 0;
          }

        }
        this.loaderservice.hide();
      });

    }
  }

  sortdata(status) {
    this.headdisableoff = false;
    console.log("hello");
    this.paginationpagenumber = 1;
    this.disableprevious = true;
    this.invoiceList.controls.POlineitemNumber.setValue(null);
    this.invoiceList.controls.POOrderNumber.setValue(null);
    this.invoiceList.controls.POrealNumber.setValue(null);
    this.invoiceList.controls.InvoiceNumber.setValue(null);
    this.ponum = 'NA';
    this.innum = 'NA';
    this.fd = 'NA';
    this.td = 'NA';
    this.plant = 'NA';
    this.invoiceList.patchValue({ withoutpo: false });
    // $('#myCheckbox').prop('checked', false);
    this.withoutpo = false;
    this.disableoff = false;
    this.invoiceData = [];
    this.filterwithoutpolist = [];
    // this.getInvoiceData();
    console.log("in here" + status)
    this.currstatus = status;
    if (status != 'H') {
      this.historic = 'false';
    }
    else {
      this.historic = 'true';
    }
    this.trackOrderListService.getInvoiceData(this.paginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA',this.plant).subscribe(res => {
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
      if (res[0].message == "Sucessinvlist") {
        // this.mPageNo = 1;
        // this.loaderservice.show();
        // }
        this.invoiceData = res[0].invoiceData;
        // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
        // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.M;
        // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.P;
        // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = 0;
        // }else{
        //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
        // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
        this.searchList = res[0].invoiceData;
        console.log("response====>", res)
        console.log("this.invoiceData ==>", this.invoiceData);
        // this.totalItems = this.invoiceData.length
        this.totalItems = res[0].invoicelistpages;
        this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages)/this.pageSize))
        if(Number(res[0].invoicelistpages)/this.paginationpagenumber <= this.pageSize)
        {
          this.disablenext = true;
        }
        else
        {
          this.disablenext = false;
        }
        this.loaderservice.hide();
        setTimeout(() => {
          console.log("this.invoiceData=============>", this.invoiceData)
          console.log("this.statusList=============>", this.statusList)
          for (var k = 0; k < this.invoiceData.length; k++) {
            for (var j = 0; j < this.statusList.length; j++) {
              if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoiceData[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoiceData[k]['PO_NUMBER']) {

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
    });
    
  }


 

  getmessageStatus() {
    // getReadStatus()
    this.purchaseOrderListService.getChatStatus().subscribe(res => {
      if (res[0].message != "No Data Found for given Vendor Id") {
        console.log("is Data Coming??", res[0].poQueryList);
        this.statusList = res[0].poQueryList
        this.loaderservice.hide();
      }
      else {
        this.statusList = [];
      }

    })
  }

  getStatusUpdate(poNumber, invNumber, index) {
    this.uniquePONumber = poNumber;
    this.uniqueInvNumber = invNumber;
    console.log("@@@@@@@@@@@@@", this.uniquePONumber, this.uniqueInvNumber, index);

    this.purchaseOrderListService.getChatStatusUpdate(poNumber, invNumber).subscribe(res => {
      // this.purchaseOrderListService.getReadStatusUpdate(poNumber).subscribe(res => {
      console.log("is it Updating ??", res);

      if (res[0].message == "Success") {
        $("#green" + index).addClass('displayNone');
        $("#green" + index).removeClass('displayBlock');
        $("#white" + index).addClass('displayBlock');
        $("#white" + index).removeClass('displayNone');
      }
    }); err => { }
  }

  onDateChange() {
    if (this.invoiceList.controls['fromDate'].value) {
      if (this.invoiceList.controls['toDate'].value) {
        this.disable = false;
        this.fromdateerror = false;
        this.todateerror = false;
      }
      else {
        this.todateerror = true;
        this.fromdateerror = false;
        this.disable = true;
      }
      this.mintodate = new Date(this.invoiceList.controls['fromDate'].value);
    }
    else if (this.invoiceList.controls['toDate'].value) {
      if (this.invoiceList.controls['fromDate'].value) {
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
    this.maxdate = new Date(this.invoiceList.controls['toDate'].value);

  }

  sortWithoutPO() {
    this.paginationpagenumber = 1;
    this.disableprevious = true;
    this.currstatus = 'WOPO';
    this.historic = 'false';
    this.invoiceData = [];
    this.invoiceList.controls.POlineitemNumber.setValue(null);
    this.invoiceList.controls.POOrderNumber.setValue(null);
    this.invoiceList.controls.POrealNumber.setValue(null);
    this.invoiceList.controls.InvoiceNumber.setValue(null);
    // this.invoiceList.controls.POlineitemNumber.disable();
    // this.invoiceList.controls.POOrderNumber.disable();
    // this.invoiceList.controls.POrealNumber.disable({ onlySelf: true });
    this.trackOrderListService.getInvoiceData(this.paginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA',this.plant).subscribe(res => {
      console.log("res ", res[0]);
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
      if (res[0].message1 == 'Sucessinvlist1') {
        this.mPageNo = 1;
        this.invoiceData = res[0].invoiceDataWOPO;
        // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
        // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.M;
        // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.P;
        // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = 0;
        // }else{
        //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
        // }        // this.invoiceDatawopo = res[0].invoiceDataWOPO;
        this.totalItems = res[0].invoicewopopages;
        if(Number(res[0].invoicewopopages)/this.paginationpagenumber <= this.pageSize)
            {
              this.disablenext = true;
            }
            else
            {
              this.disablenext = false;
            }
      }
    });

    // this.invoiceData = this.invoiceDatawopo; 
    // this.totalItems = this.invoiceData.length;
    this.disableoff = true;


  }
  searchtype(event, type) {
    console.log("event here  ==>" + event.checked);
    if (type == "search") {
      if (event.checked) {
        this.approximatecheck = true;
        this.temp = true;
      }
      else {
        this.approximatecheck = false;
        this.temp = false;
      }
    }
    else if (type == 'wpo') {
      if (event.checked) {
        this.invoiceList.controls.POlineitemNumber.setValue(null);
        this.invoiceList.controls.POOrderNumber.setValue(null);
        this.invoiceList.controls.POrealNumber.setValue(null);
        // this.invoiceList.controls.POlineitemNumber.disable();
        // this.invoiceList.controls.POOrderNumber.disable();
        // this.invoiceList.controls.POrealNumber.disable({ onlySelf: true });
        this.invoiceData = this.invoiceDatawopo;
        this.disableoff = true;
      }
      else {
        this.invoiceData = this.searchList;
        this.disableoff = false;
      }
      this.totalItems = this.invoiceData.length;

    }
    // console.log("this.invoiceList.controls.searchtype.value "+this.invoiceList.controls.searchtype.);
  }
  // typedletters()
  // {
  //   console.log("letters typed");
  //   this.urlparamsvalues = false;
  // }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  // keyPressAlphanumeric(n) {
  //   //var regex = new RegExp("^[a-zA-Z0-9 ]+$");
  //   // var regex = new RegExp("^[0-9A-Za-z\s\-]+$");
  //   // var str = String.fromCharCode(!n.charCode ? n.which : n.charCode);
  //   // if (regex.test(str)) {
  //   //   return true;
  //   // if(n.keyCode==191 || n.keyCode==173 || n.keyCode==220)
  //   // n.preventDefault();
  //   // return false;


  // }
  keyPressAlphanumeric(event): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
      || (charCode >= 48 && charCode <= 57) || charCode == 32 ||
      charCode == 45 || charCode == 47 || charCode == 92) {
      return true;
    }
    return false;
  }

  gettoposubmitinvoicepage(invoicnumber, invoicedate) {
    console.log("invoicnumber" + invoicnumber);
    console.log("invoicedate" + invoicedate);
    localStorage.setItem('INVOICENUMBER', invoicnumber);
    localStorage.setItem('INVOICEDATE', invoicedate);
    this.router.navigate(['./purchaseOrdersList'], { queryParams: { in: btoa(invoicnumber), id: btoa(invoicedate) } });

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
            break;
          }
        }

      }
      if (this.equalfound == false) {
        console.log("innini push");
        this.invoiceData.push(this.invoiceData1[i])
      }
    }
    return this.invoiceData;
  }

  download(savedfilename, singlepodownload, actualfilename) {
    if (savedfilename == "" || savedfilename == null || actualfilename == "" || actualfilename == null
      || savedfilename == undefined || actualfilename == undefined) {
      this.loaderservice.hide();
      // this.dialogBox.popUpOpen2("File not present" ,'success','purchaseorderlist');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'File not present',
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
      this.loaderservice.hide();
      return;
    }
    this.loaderservice.show();
    console.log(savedfilename);
    this.DecodedFile = [];
    this.trackOrderListService.getfile(savedfilename, singlepodownload)
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
var extensionName=filename.substr(filename.lastIndexOf('.') + 1)
this.getFileType(extensionName);
this.trackOrderListService.downloadEncryptedFile(data,this.extensionType);          }
          this.loaderservice.hide();

        }
        else if (result[0].reason != 'none') {
          // this.dialogBox.popUpOpen2(result[0].reason ,'success','purchaseorderlist');
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
          });
        }
        // else if (result[0].status == "Fail") {
        // 	this.dialogBox.popUpOpen2(result[0].message ,'success','purchaseorderlist');
        // }
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );

  }
  getFileType(extensionName) {
    console.log("extensionName" +extensionName);
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
  downloadPo(po_number, singlepodownload) {
    this.loaderservice.show();
    console.log(po_number);
    this.DecodedFile = [];
    this.trackOrderListService.getfile(po_number, singlepodownload)
      .subscribe(result => {
        this.loaderservice.hide();
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
var extensionName=filename.substr(filename.lastIndexOf('.') + 1)
this.getFileType(extensionName);
this.trackOrderListService.downloadEncryptedFile(data,this.extensionType);

          }
          this.loaderservice.hide();
        }
        else if (result[0].reason != 'none') {
          // this.dialogBox.popUpOpen2(result[0].reason ,'success','purchaseorderlist');
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
          });
        }
        // if (result[0].status == "Fail") {
        // 	this.dialogBox.popUpOpen2(result[0].message ,'error','profiledata');
        // }
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );

  }
  resubmitInvoice(invNo, poNo, vendorid, type) {
    if (this.invoicenumber != undefined) {
      this.purchaseOrderListService.getwopodetails(this.invoicenumber).subscribe(res => {
        console.log("res is here ", res);
        // this.wopodata = res[0].data;
        // if (res[0].message == "Success") {
        //   console.log("res[0].data ==>", this.wopodata);
        //   sessionStorage.removeItem("invwopodetails");
        //   sessionStorage.setItem("invwopodetails", JSON.stringify(this.wopodata));
        // }
        this.router.navigate(["invoicesubmission"]
          , {
            queryParams: {
              type: btoa(type),
              vd: btoa(vendorid),
              invNo: btoa(invNo),
              poNo: btoa(poNo)
            }
          })
      });

    }
    else {
      this.router.navigate(["invoicesubmission"]
        , {
          queryParams: {
            type: btoa(type),
            vd: btoa(vendorid),
            invNo: btoa(invNo),
            poNo: btoa(poNo)
          }
        })

    }

  }

  getPlantData(e) {
    this.PlantList = [];

    this.trackOrderListService.getPlanCode(e.target.value.toUpperCase()).subscribe(res => {
      this.tempPlantList = res[0].grnbasedonpo;
      // for (var i = 0; i < this.tempPlantList.length; i++) {
      //   // var plantdata = this.tempPlantList[i].PLANTCODE + ' - ' + this.tempPlantList[i].PLANTNAME
      //   var plantdata = this.tempPlantList[i].PLANTCODE;
      //   this.PlantList.push(plantdata);
        
      // }
      console.log(this.PlantList, 'PlantList')
    });
  }
}
