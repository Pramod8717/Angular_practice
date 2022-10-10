import { LoaderService } from './../../../../services/LoaderService/loader.service';
import { element } from 'protractor';
import { PurchaseOrderListService } from '../../../../services/purchaseOrderList/purchaseorderlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { purchaseOrderListModel } from '../../../../models/purchaseorderlist.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { blobURL } from 'assets/configdata/baseURL';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { LoginService } from 'app/services/login/login.service';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import * as moment from 'moment/moment';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../../../commoncomponents/popup/popup.component';
import {
  createDeliveryModel, createDeliverySubmissionsModel, createDeliveryInvoiceSubmissionsModel
  , deliveryDetails, orderdetailsModel, LineItemOrderModel
} from 'app/models/createdelivery.model';
// import { Delivery } from 'app/models/delivery';
import { CreateDeliveryService } from 'app/services/create-delivery.service';
import { ConstantPool } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { debug } from 'console';
// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';

declare var $: any;

@Component({
  selector: 'app-purchaseorderslist',
  templateUrl: './purchaseorderslist.component.html',
  styleUrls: ['./purchaseorderslist.component.css']
})
export class PurchaseOrdersListComponent implements OnInit {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  Openpdf = "./"

  // createSubmission =new Delivery();
  dateDisplay: any;
  poDataList: any = [];
  acceptedPOList: any = [];
  inProgressPOList: any = [];
  shippedPOList: any = [];
  newPOList: any = [];
  completedPOList: any = [];
  allPOlist: any = [];
  downloaddatalist: any = [];
  lineitemnumber: any = [];
  lineitemnumberset: any = [];
  DecodedFile: any;
  // Duration = ['--Select---','Last 1 Month', 'Last 3 Months', 'Last 6 Months', 'Last 1 Year']
  Duration = [];
  dataSource = new MatTableDataSource<Element>(this.poDataList);
  pipe: DatePipe;
  totalItems: any;
  // mPageNo: number = 1;
  pageSize = 50;
  popaginationnumber = 1;
  message: string;
  createDeliveryarray: Array<createDeliverySubmissionsModel> = [];
  deliveryarray: Array<deliveryDetails> = [];
  orderarray: Array<orderdetailsModel> = [];
  invoicesubmissionarray: Array<createDeliveryInvoiceSubmissionsModel> = [];
  lineItemOrderarray: Array<LineItemOrderModel> = [];
  public POOrderList = new FormGroup({
    PONumber: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    Plant: new FormControl('', Validators.required)
  })

  purchaseOrderListModel = new purchaseOrderListModel();
  createDeliverySubmissionsModel = new createDeliverySubmissionsModel();
  createSubmissionsModel = new createDeliveryInvoiceSubmissionsModel();
  lineitemorderModel = new LineItemOrderModel();
  deliverydetailsModel = new deliveryDetails();
  orderdetailsModel = new orderdetailsModel();
  searchList: any = [];
  confirmationNoAction: boolean = false;
  balanceExceeded: boolean = false;
  showpopup2: boolean = false;
  Accepted: boolean = false;
  WIP: boolean = false;
  shipped: boolean = false;
  complete: boolean = false;
  poDetail: any = [];
  poDetail1: any = [];
  viewPODetails: any = [];
  option: boolean = true;
  responseList: any = [];
  sortYearList: any = [];
  validate: boolean = true;
  messageList: any = [];
  orderlist: any = [];
  topic: any;
  recipientEmail: any;
  merged_obj: any;
  statusList: any = [];
  pgNolist: any[];
  uniquelineitems: any = [];
  selectedorderlineitemdetails: any = [];
  selectedorderdata: any = [];
  uniquedeliveryitems: any = [];
  uniquelineitem: any = [];
  orderlistoflineitem: any[];
  disable: boolean = false;
  todateerror: boolean = false;
  fromdateerror: boolean = false;
  ponumberpresent: boolean = false;
  durationpresent: boolean = false;
  fromtodatepresent: boolean = false;
  filteredponumberData: any = [];
  selected: string;
  fromdateofduration: string = "NA";
  todateofduration: string = "NA";
  maxdate: any;
  maxPOdate: any;
  minPOdate: any;
  mindate: any;
  mintodate: any;
  durationfromdate: any;
  durationtodate: any;
  filtereddurationData: any = [];
  filtereddate: any[];
  filterpodatalist: any = [];
  balQty: string;
  POlist: any;
  uniquePONumber: any;
  uniqueInvNumber: any;
  innerportal: boolean;
  invoicenumber: string;
  invoicedate: string;
  deliveryVal: any
  deliveryVal1: any
  lineItemNo: any
  deliveryPoNum: any
  count: any = -1;
  selectedLineItem: any = [];
  orderselectedList: any = [];
  isdelieverycheck: boolean = false;
  selecteddeliveryVal: any;
  submitval: any;
  submitval1: any;
  issubmitcheck: boolean = false;
  submitval0: any;
  counter = 0;
  orderlistoflineitemmp: any = [];
  orderlistwithinvoice: any = [];
  isinvChecked: boolean = false;
  checkboxisselected: boolean = false;
  selectedcheckbox: any = [];
  lineitemvalue: any;
  dispatchdate: any;
  powithnodeliveries: any = [];
  lineitemnumberlist: any = [];
  quantitylist: any = [];
  fullpoponumber: any;
  fullpodate: any;
  poorders: any = [];
  dotpresent: boolean = false;
  showCreateDelivery: boolean = true;
  showSubmitInvoice: boolean = true;
  deliverycreated: boolean = false;
  isselected: boolean = false;
  counter1: number = 0;
  wopodetails: any = [];
  wopodata: any = [];
  poAmount: number;
  temp = 0.00;
  poDate = [];
  zeropresent: boolean = false;
  temppodetails: any = [];
  showfullInvoice: boolean = true;
  isdelivery: any;
  servicePOList: any;
  vendorid: any;
  msgOnButtonClick: any;
  confirmationValue: any;
  boolean: boolean = false;
  currstatus: string = 'ALL';
  fromdateofpo: string = "NA";
  todateofpo: string = "NA";
  ponum: string = "NA";
  disableprevious: boolean = true;
  disablenext: boolean = true;
  endpagenumber: number = 1;
  PlantList: any = [];
  tempPlantList: any = [];
  plantpresent: boolean = false;
  plant: string = 'NA';
  extensionType: string;
  poCountAsPerStatus: any = [];
  // LoginService: any;
  email: any;
  mobile: any;
  age: any;
  gst: any;
  poData: any;
  pagenumber: any;
  ponumber: any;

  get fromDate() { return this.POOrderList.get('fromDate').value; }
  get toDate() { return this.POOrderList.get('toDate').value; }
  public hasError = (controlName: string, errorName: string) => {
  return this.POOrderList.controls[controlName].hasError(errorName);
  }

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private purchaseOrderListService: PurchaseOrderListService,
    private toastr: ToastrService,
    private loaderservice: LoaderService,
    private router: Router,
    private loginService: LoginService,
    private trackOrderListService: TrackOrderListService,
    private createDeliveryService: CreateDeliveryService) { }
  // @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    // this.selectedcheckbox = [];
    var type = sessionStorage.getItem("portaltype");


    this.route.queryParams.subscribe(params => {
  
      console.log("what are the ?", params); // { order: "popular" }
      this.invoicenumber = atob(params.in);
      this.invoicedate = atob(params.id);
      console.log("this.invoicenumber" + this.invoicenumber);
      console.log("this.invoicedate" + this.invoicedate);

    });
    console.log("this.invoicenumber", this.invoicenumber);


    console.log("type is here " + type);

    if (type == 'innerportal') {
      console.log("in if");
      this.innerportal = true;

    }
    else {
      console.log("in else");
      this.innerportal = false;
    }

    // this.getQuerry(2300148631);
    this.getmessageStatus();

    $("body").on("click", ".status-link", function () {
      $('.inv-wrapper.active').removeClass('active');
      $(this).parent().addClass('active');
    });

    // $("body").on("click", ".plusminusArrow", function () { 
    //   if ($(this).closest(".customtbl-accordion-head-inner.active").length>0) { 
    //     console.log('true');
    //     $(this).closest(".customtbl-accordion-head-inner").removeClass('active');
    //    } 
    //    else {
    //        console.log('false');
    //        $(".customtbl-accordion-head-inner.active").removeClass("active");
    //        $(this).closest(".customtbl-accordion-head-inner").addClass('active');
    //    }
    //  });

    this.durationlist();
    if (this.invoicenumber == undefined) {

      this.getPurChaseOrderList();
    }
    else {
      this.getPurChaseOrderListwithoutPO();
    }

    if (type == 'innerportal') {
      console.log("in if");
      this.innerportal = true;

    }
    else {
      console.log("in else");
      this.innerportal = false;
    }



    //    parent table accordion 
    // $('.customtbl-accordion-head').click(function(){
    //   // var id = $(this).data('accordion');
    //   var id = $(this).attr('data-accordion');
    //   console.log(id);
    //   $('.tbl-accordion-content').hide();
    //   $(this).toggleClass('active').siblings().removeClass('active');;
    //   $('.customtbl-accordion-head.active + #'+id).addClass('customtblHide');
    //   // $('.atbl-container').removeClass('active');  //close all nested accordion
    //   if( !$(this).hasClass('active')) {
    //       $('.customtbl-accordion-head.active + #'+id).removeClass('customtblHide');
    //   } else {
    //       $('.customtbl-accordion-head.active + #'+id).show();
    //   }      
    // });
    // $('body').click(function() {
    //   console.log('from body click');
    // });

    // $("body").on("click", ".customtbl-accordion-head", function () {



    //   if (!$(this).hasClass('active')) {
    //     $(".customtbl-accordion-head.active").removeClass("active");
    //     $(this).addClass("active");
    //   } else {
    //     $(this).removeClass("active");
    //   }

    //   // console.log(' ****from tr click');
    //   $('.atbl-container').removeClass('active');
    //   // var id = $(this).data('accordion');
    //   var id = $(this).attr('data-accordion');
    //   console.log(id);
    //   $('.tbl-accordion-content').hide();
    //   // $('.customtbl-accordion-head').removeClass('active');



    //   // $(this).toggleClass('active');
    //   $('.customtbl-accordion-head.active + #' + id).addClass('customtblHide');
    //   // $('.atbl-container').removeClass('active');  //close all nested accordion
    //   if (!$(this).hasClass('active')) {
    //     $('.customtbl-accordion-head.active + #' + id).removeClass('customtblHide');
    //   } else {
    //     $('.customtbl-accordion-head.active + #' + id).show();
    //   }

    // });


    // $("body").on("click", ".atbl-btn", function (e) {

    //   if (!$(this).parent().hasClass('active')) {
    //     $(".atbl-container.active").removeClass("active");
    //     $(this).parent().addClass("active");
    //   } else {
    //     $(this).parent().removeClass("active");
    //   }

    // $('.atbl-container').removeClass('active');
    // $(this).toggleClass('active');
    // if (!e.target.matches('.atbl-container  .atbl-btn')) return;
    // else{
    //   if(!e.target.parentElement.classList.contains('active')){
    //       if(this.option==true){
    //           var elementList = document.querySelectorAll('.atbl-container  .atbl-container');
    //           Array.prototype.forEach.call(elementList, function (e) {
    //               e.classList.remove('active');
    //           });
    //       }            
    //       e.target.parentElement.classList.add('active');
    //   }else{
    //      $('.atbl-container').removeClass('active');
    //   }

    // });




  }



  // openAccordion(ev) {
  //   let elm = ev.target.closest('.tbl-accordion-header');
  //   if (ev.target.tagName == 'TR' || ev.target.tagName == 'TD') {
  //     if (elm) {
  //       elm.classList.toggle("accordion-close");
  //       elm.nextSibling.classList.toggle("accordion-show-hide");
  //     }
  //   }
  // }

  showSubmitBox(ev) {
    this.confirmationNoAction = true;
  }
  hideSubmitBox(ev) {
    this.confirmationNoAction = false;
  }
  showPopup(ev, poNumber) {
    console.log("is it ??", poNumber)
    this.purchaseOrderListModel.PONumber = poNumber;
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
  }
  closePopup(ev) {
    console.log("in here");
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
    // setTimeout(() => {
    //   $(".messageChatWrapper").stop().animate({ scrollTop: $(".messageChatWrapper")[0].scrollHeight}, 10);
    // },500);
  }
  ClosepopupMessage(ev) {
    $("#popupMessage").css("visibility", "hidden");
    $("#popupMessage").css("opacity", "0");
    // this.getPurChaseOrderList();
    this.getmessageStatus();
  }


  //    parent table accordion 
  openTableAccordion() {
    //  console.log("clicked", event.targe)
    //  document.addEventListener('click', function (e) {
    //   console.log(e.target)
    //   const element = e.target as Element;

    //   // if (!element.matches(elem+' .atbl-btn'))
    //   console.log(e.target)

    //   $('.customtbl-accordion-head')
    // var id = $(this).data('accordion');
    // console.log('***********'+id);

    // $('.tbl-accordion-content').hide();
    // $(this).toggleClass('active').siblings().removeClass('active');;
    // $('.customtbl-accordion-head.active + #'+id).addClass('customtblHide');
    // // $('.atbl-container').removeClass('active');  //close all nested accordion
    // if( !$(this).hasClass('active')) {
    //     $('.customtbl-accordion-head.active + #'+id).removeClass('customtblHide');
    // } else {
    //     $('.customtbl-accordion-head.active + #'+id).show();
    // }  

    // });




  }

  toggleAccordian(event, index) {
    const element = event.target;

    // console.log("element", element)
    element.classList.toggle("active");
    if (this.poDataList[index].isActive) {
      this.poDataList[index].isActive = false;
    } else {
      this.poDataList[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }




  // show bootstrap modal 
  // ShowpopupMessage(event) {
  //   event.stopPropagation();
  //   $("#popupComment").modal('show');
  // }


  getPO() {
    if (this.POOrderList.status == 'VALID') {
      this.router.navigate(['/purchaseOrdersList']);
    }
  }

  getPurChaseOrderListwithoutPO() {
    this.loaderservice.show();
    this.popaginationnumber = 1;
    this.disableprevious = true;
    this.poDataList = [];
    this.allPOlist = [];
    this.acceptedPOList = [];
    this.inProgressPOList = [];
    this.completedPOList = [];
    this.shippedPOList = [];
    this.searchList = [];
    this.newPOList = [];
    this.servicePOList = [];
    this.getmessageStatus();

    this.purchaseOrderListService.getWOPO(this.popaginationnumber, 'ALL', this.ponum, this.fromdateofduration, this.todateofduration,
      this.fromdateofpo, this.todateofpo).subscribe(res => {

        if (res[0].message == 'Success') {
          console.log("res[0].poData ", res[0].poData);
          this.powithnodeliveries = res[0].poData;
          this.poDataList = res[0].poData;
          console.log("Data PO POLIST API", this.poDataList);
          console.log("data from read status API", this.statusList);
          console.log("powodeloveriees ANgaj ===========>", this.powithnodeliveries);

          this.poDataList = res[0].poData;
          for (let i = 0; i < this.poDataList.length; i++) {
            this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          }
          // this.poDataList = [];
          this.filterpodatalist = res[0].poData;
          this.totalItems = res[0].popages
          this.endpagenumber = Math.ceil((Number(res[0].popages) / this.pageSize))
          if (Number(res[0].popages) / this.popaginationnumber <= this.pageSize) {
            this.disablenext = true;
          }
          else {
            this.disablenext = false;
          }
          // this.loaderservice.hide();
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
      }, err => {
        this.loaderservice.hide();
      })

  }

  getPurChaseOrderList() {
    $('.inv-wrapper').removeClass('active');
    $('#allPO').addClass('active');
    this.popaginationnumber = 1;
    this.disableprevious = true;
    this.deliverycreated = false;
    this.loaderservice.show();
    this.showSubmitInvoice = true;
    this.showCreateDelivery = true;
    this.poDataList = [];
    this.allPOlist = [];
    this.acceptedPOList = [];
    this.inProgressPOList = [];
    this.completedPOList = [];
    this.shippedPOList = [];
    this.searchList = [];
    this.newPOList = [];
    this.servicePOList = [];
    this.getmessageStatus();
    this.popaginationnumber = 1;
    this.purchaseOrderListService.getPO(this.popaginationnumber, 'ALL', this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo, this.plant).subscribe(res => {

      this.poCountAsPerStatus = res[0].poCountAsPerStatus;
      if (!res[0].message) {


        this.purchaseOrderListService.getWOPO(this.popaginationnumber, 'ALL', this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo).subscribe(res1 => {
          if (res1[0].message != 'No Data Found for given Vendor Id') {

            this.powithnodeliveries = res1[0].poData;



            // console.log("Angajfrom getpurchaseorderlist ========>", this.powithnodeliveries[0].PO_NUMBER);
          }
          this.poDataList = res[0].poData;
          // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
          for (let i = 0; i < this.poDataList.length; i++) {
            this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          }
          console.log("updatelist", this.poDataList);

          console.log("Data PO POLIST API", this.poDataList);
          console.log("data from read status API", this.statusList);

          

          // this.purchaseOrderListService.getPO(this.pagenumber,
          //   this.statusList,
          //   this.ponumber,
          //   this.fromdateofduration,
          //   this.todateofduration,
          //   this.fromdateofpo,
          //   this.todateofpo,
          //   this.plant).subscribe(res =>{
          //   console.warn(res[0]);
          //   // this.poDataList = res[0].poData;
           
          // })

         
         

          // this.poDataList = [];
          this.filterpodatalist = res[0].poData;
          this.totalItems = res[0].popages;
          this.endpagenumber = Math.ceil((Number(res[0].popages) / this.pageSize))
          if (Number(res[0].popages) / this.popaginationnumber <= this.pageSize) {
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
          }, 500); err => {
            this.loaderservice.hide();
          }
        });
      }
    }, err => {
      this.loaderservice.hide();
    })


  }

  getPurOrderList(action) {
    // this.loaderservice.show();
    // this.popaginationnumber = event;
    if (action == 'PREV') {
      if (this.popaginationnumber != 1) {
        this.popaginationnumber = this.popaginationnumber - 1;
        if (this.popaginationnumber == 1) {
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
      this.popaginationnumber = this.popaginationnumber + 1;
      this.disableprevious = false;

    }
    else if (action == 'HOME') {
      this.popaginationnumber = 1;
      this.disableprevious = true;

    }
    else if (action == 'END') {

      this.popaginationnumber = this.endpagenumber;
      if (this.popaginationnumber == 1) {
        this.disableprevious = true;
      }
      else {
        this.disableprevious = false;
      }
    }
    // $('.inv-wrapper').removeClass('active');
    // $('#allPO').addClass('active');
    // debugger;
    this.deliverycreated = false;
    this.loaderservice.show();
    this.showSubmitInvoice = true;
    this.showCreateDelivery = true;
    this.poDataList = [];
    this.allPOlist = [];
    this.acceptedPOList = [];
    this.inProgressPOList = [];
    this.completedPOList = [];
    this.shippedPOList = [];
    this.searchList = [];
    this.newPOList = [];
    this.servicePOList = [];
    this.getmessageStatus();

    this.purchaseOrderListService.getPO(this.popaginationnumber, this.currstatus, this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo, this.plant).subscribe(res => {
      this.poCountAsPerStatus = res[0].poCountAsPerStatus;
      if (!res[0].message) {


        this.purchaseOrderListService.getWOPO(this.popaginationnumber, this.currstatus, this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo).subscribe(res1 => {
          if (res1[0].message != 'No Data Found for given Vendor Id') {

            this.powithnodeliveries = res1[0].poData;
            // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
            console.log("this.invoicenumber" + this.invoicenumber);
            if (this.invoicenumber != undefined) {
              console.log("in if");
              this.poDataList = res1[0].poData;
              this.endpagenumber = Math.ceil((Number(res[0].popages) / this.pageSize))
              if (Number(res[0].popages) / this.popaginationnumber <= this.pageSize) {
                this.disablenext = true;
              }
              else {
                this.disablenext = false;
              }
            } else {
              console.log("in else");
              this.poDataList = res[0].poData;
              this.endpagenumber = Math.ceil((Number(res[0].popages) / this.pageSize))
              if (Number(res[0].popages) / this.popaginationnumber <= this.pageSize) {
                this.disablenext = true;
              }
              else {
                this.disablenext = false;
              }
            }
            for (let i = 0; i < this.poDataList.length; i++) {
              this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
            }

            this.totalItems = res[0].popages;
            // console.log("Angajfrom getpurchaseorderlist ========>", this.powithnodeliveries[0].PO_NUMBER);
            // setTimeout(() => {
            //   this.pgNolist = [];
            //   if (this.popaginationnumber > 1) {
            //     this.pgNolist = this.poDataList;
            //     console.log("this.pgNolist" , this.pgNolist);
            //     console.log("this.statusList" , this.statusList);
            //     for (var k = 0; k < this.pgNolist.length; k++) {
            //       for (var j = 0; j < this.statusList.length; j++) {
            //         if (this.statusList.length != 0) {
            //           if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.pgNolist[k]['PO_NUMBER']) {

            //             $("#green" + k).addClass('displayBlock');
            //             $("#white" + k).addClass('displayNone');
            //           }
            //           else {
            //             //$("#green" + k).addClass('displayNone');
            //             $("#white" + k).addClass('displayBlock');
            //           }
            //         }
            //         else {
            //           $("#white" + k).addClass('displayBlock');
            //         }
            //       }
            //       this.loaderservice.hide();
            //     }
            //   }
            //   else if (this.popaginationnumber == 1) {
            //     this.getPurChaseOrderList();
            //     this.loaderservice.hide();
            //   }
            // }, 1000); err => {
            //   this.loaderservice.hide();
            // }
          }



        });
        setTimeout(() => {
          this.pgNolist = [];
          if (this.popaginationnumber > 1) {
            this.pgNolist = this.poDataList;
            console.log("this.pgNolist", this.pgNolist);
            console.log("this.statusList", this.statusList);
            for (var k = 0; k < this.pgNolist.length; k++) {
              for (var j = 0; j < this.statusList.length; j++) {
                if (this.statusList.length != 0) {
                  if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['PONUMBER'] == this.pgNolist[k]['PO_NUMBER']) {

                    $("#green" + k).addClass('displayBlock');
                    $("#white" + k).addClass('displayNone');
                  }
                  else {
                    //$("#green" + k).addClass('displayNone');
                    $("#white" + k).addClass('displayBlock');
                  }
                }
                else {
                  $("#white" + k).addClass('displayBlock');
                }
              }
              this.loaderservice.hide();
            }
          }
          else if (this.popaginationnumber == 1) {
            this.getPurChaseOrderList();
            this.loaderservice.hide();
          }
        }, 1000); err => {
          this.loaderservice.hide();
        }
      }

    }, err => {
      this.loaderservice.hide();
    })

  }


  sortData(status: string) {

    this.currstatus = status;
    this.popaginationnumber = 1;
    // this.POOrderList.controls['duration'].value);
    // console.log("this.POOrderList.controls['fromDate'].value ==>" + this.POOrderList.controls['fromDate'].value);
    // console.log("this.POOrderList.controls['toDate'].value ==>" + this.POOrderList.controls['toDate'].value);
    this.POOrderList.controls.duration.setValue("ALL");
    this.POOrderList.controls.PONumber.setValue(null);
    this.POOrderList.controls.fromDate.setValue(null);
    this.POOrderList.controls.toDate.setValue(null);
    this.ponum = "NA";
    this.fromdateofduration = "NA";
    this.todateofduration = "NA";
    this.fromdateofpo = "NA";
    this.todateofpo = "NA";
    this.plant = "NA";
    this.purchaseOrderListService.getPO(this.popaginationnumber, this.currstatus, this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo, this.plant).subscribe(res => {
      if (!res[0].message) {


        this.purchaseOrderListService.getWOPO('1', this.currstatus, this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo).subscribe(res1 => {
          debugger;
          if (res1[0].message != 'No Data Found for given Vendor Id') {

            this.powithnodeliveries = res1[0].poData;
          }
          else {
            this.powithnodeliveries = [];
          }
          this.poCountAsPerStatus = res[0].poCountAsPerStatus;
          if (this.invoicenumber == undefined) {
            this.poDataList = res[0].poData;
            // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
            for (let i = 0; i < this.poDataList.length; i++) {
              this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
            }
          }
          else {
            this.poDataList = res1[0].poData;
            for (let i = 0; i < this.poDataList.length; i++) {
              this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
            }
          }

          console.log("updatelist", this.poDataList);

          console.log("Data PO POLIST API", this.poDataList);
          console.log("data from read status API", this.statusList);

          // this.poDataList = [];
          // this.filterpodatalist = res[0].poData;
          this.totalItems = res[0].popages;


        });
      }
      else {
        this.poDataList = [];
        this.totalItems = 0;
      }
    }, err => {
      this.loaderservice.hide();
    })
    setTimeout(() => {
      this.pgNolist = [];
      // for (var m = pageNo; m <= Mpage; m++) {
      //   this.pgNolist.push(this.poDataList[m]);
      // }
      this.pgNolist = this.poDataList;
      console.log("this.statuslist", this.statusList);
      console.log("this.pgNolist" + this.pgNolist);
      for (var k = 0; k < this.poDataList.length; k++) {
        for (var j = 0; j < this.statusList.length; j++) {
          if (this.statusList.length != 0) {
            if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['PONUMBER'] == this.poDataList[k]['PO_NUMBER']) {

              $("#green" + k).addClass('displayBlock');
              $("#white" + k).addClass('displayNone');
            }
            else {
              //$("#green" + k).addClass('displayNone');
              $("#white" + k).addClass('displayBlock');
            }
          }
          else {
            $("#white" + k).addClass('displayBlock');
          }
        }
        this.loaderservice.hide();
      }

    }, 1000); err => {
      this.loaderservice.hide();
    }

    // setTimeout(() => {
    //   for (var k = 0; k < this.poDataList.length; k++) {
    //     if (this.statusList.length != 0) {
    //       for (var j = 0; j < this.statusList.length; j++) {
    //         if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.poDataList[k]['PO_NUMBER']) {

    //           $("#green" + k).addClass('displayBlock');
    //           $("#white" + k).addClass('displayNone');
    //         }
    //         else {
    //           //$("#green" + k).addClass('displayNone');
    //           $("#white" + k).addClass('displayBlock');
    //         }
    //       }
    //     }
    //     else {
    //       $("#white" + k).addClass('displayBlock');
    //     }
    //   }
    // }, 300);

  }

  ServicePO() {
    this.currstatus = 'SP';
    this.popaginationnumber = 1;
    console.log("============>", this.servicePOList);

    this.purchaseOrderListService.getPO(this.popaginationnumber, this.currstatus, this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo, this.plant).subscribe(res => {
      if (!res[0].message) {


        this.purchaseOrderListService.getWOPO(this.popaginationnumber, this.currstatus, this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo).subscribe(res1 => {
          if (res1[0].message != 'No Data Found for given Vendor Id') {

            this.powithnodeliveries = res1[0].poData;
          }
          else {
            this.powithnodeliveries = [];
          }
          this.poCountAsPerStatus = res[0].poCountAsPerStatus;
          if (this.invoicenumber == undefined) {
            this.poDataList = res[0].poData;
            // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
            for (let i = 0; i < this.poDataList.length; i++) {
              this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
            }
          }
          else {
            this.poDataList = res1[0].poData;
            for (let i = 0; i < this.poDataList.length; i++) {
              this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
            }
          }

          console.log("updatelist", this.poDataList);

          console.log("Data PO POLIST API", this.poDataList);
          console.log("data from read status API", this.statusList);

          // this.poDataList = [];
          // this.filterpodatalist = res[0].poData;
          this.totalItems = res[0].popages;


        });
      }
      else {
        this.poDataList = [];
        this.totalItems = 0;
      }
    }, err => {
      this.loaderservice.hide();
    })

    // this.poDataList = this.servicePOList;
    // this.totalItems = this.poDataList.length;

    setTimeout(() => {
      for (var k = 0; k < this.poDataList.length; k++) {
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
    }, 500);
  }

  // searchData() {
  //   this.poDataList = [];
  //   this.responseList = [];
  //   var today = new Date();
  //   var lastyear = today.getFullYear() - 1 + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + '00:00:00.0';
  //   var halfyear = today.getFullYear() + '-' + (today.getMonth() - 5) + '-' + today.getDate() + ' ' + '00:00:00.0';
  //   var quarter = today.getFullYear() + '-' + (today.getMonth() - 2) + '-' + today.getDate() + ' ' + '00:00:00.0';
  //   var month = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate() + ' ' + '00:00:00.0';
  //   // this.responseList.length = 0
  //   console.log("Month", month, "Quarter", quarter, "HalfYear", halfyear, "Lastyear", lastyear, "Tday", today);

  //   this.responseList = [];
  //   this.searchList.forEach(element => {
  //     // today=new Date( )
  //     // console.log("searchdata", this.formatDate(halfyear))
  //     if (this.POOrderList.controls.PONumber.value && !this.POOrderList.controls.fromDate.value && !this.POOrderList.controls.toDate.value) {
  //       // if (element.PO_NUMBER === this.POOrderList.controls.PONumber.value)
  //       if (element.PO_NUMBER.includes(this.POOrderList.controls.PONumber.value) == true) {
  //         //  this.responseList=[];
  //         this.responseList.push(element);
  //         this.poDataList = this.responseList

  //         // console.log("Found",this.formatDate(this.POOrderList.controls.fromDate.value))
  //       }
  //     }
  //     if (this.POOrderList.controls.fromDate.value && this.POOrderList.controls.toDate.value) {
  //       if (element.DATE >= this.formatDate(this.POOrderList.controls.fromDate.value) && element.DATE <= this.formatDate(this.POOrderList.controls.toDate.value)) {
  //         // console.log("dateFilter",element.DATE)
  //         // this.responseList=[];
  //         this.responseList.push(element);
  //         this.poDataList = this.responseList;
  //       }
  //     }
  //     if (this.POOrderList.controls.Status.value) {
  //       if (
  //         (element.DATE >= this.formatDate(lastyear) && this.POOrderList.controls.Status.value == this.Duration[4])
  //         || (element.DATE >= this.formatDate(halfyear) && this.POOrderList.controls.Status.value == this.Duration[3])
  //         || (element.DATE >= this.formatDate(quarter) && this.POOrderList.controls.Status.value == this.Duration[2])
  //         || (element.DATE >= this.formatDate(month) && this.POOrderList.controls.Status.value == this.Duration[1])
  //       ) {
  //         // this.responseList=[];
  //         this.responseList.push(element);
  //         this.poDataList = this.responseList;
  //       }
  //     }
  //     else {
  //       // console.log("not found", element.PO_NUMBER);
  //       // this.poDataList=[];

  //     }
  //     setTimeout(() => {
  //       this.totalItems = this.poDataList.length
  //       for (var k = 0; k < this.poDataList.length; k++) {
  //         for (var j = 0; j < this.statusList.length; j++) {
  //           if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.poDataList[k]['PO_NUMBER']) {

  //             $("#green" + k).addClass('displayBlock');
  //             $("#white" + k).addClass('displayNone');
  //           }
  //           else {
  //             //$("#green" + k).addClass('displayNone');
  //             $("#white" + k).addClass('displayBlock');
  //           }
  //         }
  //       }
  //     }, 200);
  //   });
  //   // console.log("ponumber",this.POOrderList.controls.PONumber.value),
  //   // console.log("status",this.POOrderList.controls.Status.value),
  //   // console.log("Fromdate",this.POOrderList.controls.fromDate.value),
  //   // console.log("todate",this.POOrderList.controls.toDate.value)

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
  // sendConfirmation(status, message, subject, topic) {
  //   if ((message == undefined && subject != 'SubmitQuery') || (message == '' && subject != 'SubmitQuery')) {
  //     message = "PO Accepted";
  //   }
  //   else if (subject != 'SubmitQuery') {
  //     message = "PO Rejected -" + message
  //   }
  //   console.log("AM I ???", status, message)

  //   this.purchaseOrderListService.submitConfirmation(this.purchaseOrderListModel.PONumber, status, message, subject, topic).subscribe(res => {
  //     // console.log("what is the response?" , res[0].message)
  //     if (res[0].message == "Success") {
  //       // this.dialogBox.popUpOpen2('Message submited successfully.','success','purchaseorderlist');
  //       // this.ngOnInit(); 
  //       $("#popup2").css("visibility", "hidden");
  //       $("#popup2").css("opacity", "0");
  //       // location.reload();
  //       this.confirmationNoAction = false;
  //       this.getPurChaseOrderList();
  //       this.getmessageStatus();       //  this.getQuerry(topic,'')
  //       this.message = ' ';
  //       this.messageList = [];
  //       // this.purchaseOrderListService.getMessages(topic).subscribe(res => {
  //       //   console.log("resposne", res[0].poQueryList)
  //       //   this.topic = topic
  //       //   if (res[0].poQueryList[0] != undefined) {
  //       //     this.messageList = res[0].poQueryList
  //       //   }
  //       //   else {
  //       //     this.messageList = res[0].message
  //       //   }
  //       //   console.log(this.messageList)
  //       // })
  //     }
  //     else {
  //       this.purchaseOrderListService.getMessages(topic).subscribe(res => {
  //         console.log("resposne", res[0].poQueryList)
  //         this.topic = topic
  //         if (res[0].poQueryList[0] != undefined) {
  //           this.messageList = res[0].poQueryList
  //         }
  //         else {
  //           this.messageList = res[0].message
  //         }
  //         console.log(this.messageList)
  //       })
  //       this.dialogBox.popUpOpen2('Error while submitting message', 'error', 'purchaseorderlist');
  //     }
  //     // this.dialogBox.popUpOpen2(res[0].message,'success','purchaseorderlist');

  //     //   this.toastr.success(res[0].message);
  //     // location.reload();
  //     this.getPurChaseOrderList();
  //   })
  // }

  confirmPO() {
    const dialogConfig1 = new MatDialogConfig();
    dialogConfig1.data = {
      message: 'Kindly confirm you want to proceed with this Purchase Order ?',
      condition: 'Confirmation',
      page: 'invoicesubmit',
    };
    const mydata1 = dialogConfig1.data;
    console.log("PopupComponent", mydata1);

    const dialogRef = this.dialog.open(PopupComponent, {
      panelClass: 'custom-modalbox',

      width: '400px',
      data: { datakey: dialogConfig1.data }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result2: ${result}`);
      let value1 = result;

      console.log('test value', value1);
      this.msgOnButtonClick = value1.messageString
      this.confirmationValue = result.return;

      if (this.confirmationValue == true) {
        this.sendConfirmation('Y', '', 'POconfirmation', '');
      }
      else if (this.confirmationValue == false) {
        this.sendConfirmation('N', this.msgOnButtonClick, 'POconfirmation', '')

      }
    })
  }

  sendConfirmation(status, message, subject, topic) {
    // $(".messageChatWrapper").stop().animate({ scrollTop: $(".messageChatWrapper")[0].scrollHeight}, 500);


    if ((message == undefined && subject != 'SubmitQuery') || (message == '' && subject != 'SubmitQuery')) {
      message = "PO Accepted";
    }
    else if (subject != 'SubmitQuery') {
      message = "PO Rejected -" + message
    }
    console.log("AM I ???", status, message);
    console.log(this.uniquePONumber, this.purchaseOrderListModel.PONumber);
    // this.purchaseOrderListService.submitConfirmation(this.purchaseOrderListModel.PONumber, this.uniquePONumber,  this.uniqueInvNumber, status, message, subject, topic).subscribe(res => {
    this.purchaseOrderListService.submitConfirmation(this.purchaseOrderListModel.PONumber, status, message, subject, topic).subscribe(res => {
      console.log("what is the response?", res[0].message)

      if (res[0].message == "Success") {
        this.validate = true;
        this.message = "";
        // this.dialogBox.popUpOpen2('Message submited successfully.','success','purchaseorderlist');
        // this.ngOnInit(); 
        //     $("#popup2").css("visibility", "hidden");
        // $("#popup2").css("opacity", "0");
        // location.reload();
        this.confirmationNoAction = false;
        // this.getPurChaseOrderList();
        // this.getmessageStatus();       //  this.getQuerry(topic,'')
        // this.message = ' ';
        this.messageList = [];
        this.purchaseOrderListService.getMessages(topic).subscribe(res => {
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
      else {
        this.purchaseOrderListService.getMessages(topic).subscribe(res => {
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



  getPoDetails(POnumber, Date, Amount, Query, Status) {
    // console.log("number", POnumber,Date, Amount, Query)
    let obj1 = {
      // "POnumber":POnumber,
      "DATE": Date,
      "AMOUNT": Amount,
      "QUERY": Query,
      "STATUS1": Status
    }


    // this.router.navigate(['/poOrderView']);
    this.purchaseOrderListService.getPODetails(POnumber).subscribe(res => {
      // console.log("PODetails",res[0].poData[0] )
      // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      this.poDetail = res[0].poData
      this.isdelivery = res[0].deliveryitem
      console.log("sorted list", this.poDetail, this.isdelivery)
      this.merged_obj = {
        ...res[0].poData[0],
        ...obj1
      }
      // console.log("orginal Data",this.poDetail)
      // console.log("merged Data", this.merged_obj)
      sessionStorage.setItem("PODetails", JSON.stringify(this.merged_obj))
      // sessionStorage.setItem("PODetails", this.poDetail);

      // this.router.navigateByUrl("/poOrderView", { state:merged_obj})
      this.router.navigate(['/poOrderView'], {
        queryParams: {
          POnumber: btoa(POnumber), Date: btoa(Date), Amount: btoa(Amount),
          Query: btoa(Query), Status: btoa(Status)
        }
      })
    })
  }



  getPOitems(POnumber, BUYER, REQUSITIONER, PODATE) {
    this.boolean = false
    this.loaderservice.show();
    this.uniquelineitems = [];
    this.uniquelineitem = [];
    this.poDate = [];
    console.log("Hey I am here", BUYER)
    sessionStorage.setItem("poNumber", POnumber);
    sessionStorage.setItem("Buyer", BUYER)
    sessionStorage.setItem("Requisitioner", REQUSITIONER)
    this.fullpodate = PODATE;
    sessionStorage.setItem("fullpoDate", this.fullpodate)
    console.log("in here");
    this.purchaseOrderListService.getPODetails(POnumber).subscribe(res => {
      if (res[0].poData && (!res[0].message)) {
        this.boolean = true;
        this.poDetail = res[0].poData;
        this.isdelivery = res[0].deliveryitem
        console.log("sorted list dc ", this.isdelivery)

        console.log("podatadetails", res[0].poData);

        // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
        for (var j = 0; j < this.poDetail.length; j++) {
          this.maxPOdate = new Date();
          this.minPOdate = new Date(PODATE);

          if (this.poDetail[j].BALANCE_QTY == this.poDetail[j].QUANTITY) {
            this.showfullInvoice = true;
            console.log(this.showfullInvoice);

          }
          else {
            this.showfullInvoice = false;
          }
          this.uniquelineitems.push(this.poDetail[j]);
        }
        for (let i = 0; i < this.uniquelineitems.length; i++) {
          this.uniquelineitems[i].RATEperqty = this.uniquelineitems[i].RATEPERQTY;
          this.uniquelineitems[i].RATEPERQTY = Number(this.uniquelineitems[i].RATEPERQTY).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
        }
        console.log("this.uniquelineitems======>>>", JSON.stringify(this.uniquelineitems)); this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
          if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
            return 1;
          }

          if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
            return -1;
          }

          return 0;
        });
        sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
        console.log("Lineitemtext ", this.poDetail)
        for (var i = 0; i < this.poDetail.length; i++) {
          this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
        }
        console.log("this.lineitemnumber. " + this.lineitemnumber);
        var mySet = new Set(this.lineitemnumber);
        mySet.forEach(v => this.lineitemnumberset.push(v));
        console.log("Set items this.lineitemnumberset ==>" + this.lineitemnumberset);
        console.log(removeDuplicates(res[0].poData, 'LINEITEMNUMBER'));
        this.POlist = removeDuplicates(res[0].poData, 'LINEITEMNUMBER')
        // sessionStorage.setItem("balQuantity",this.POlist[0].BALANCE_QTY)
        console.log("Balance Quantity", this.POlist[0].BALANCE_QTY);
        this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
        // // this.poDetail = res[0].poData
        // console.log("PODEtails", this.poDetail)
        this.loaderservice.hide();
      }
      else {
        this.dialogBox.popUpOpen2('PO line item details not present', 'error', 'puchaseorderlist');
        this.loaderservice.hide();
      }
    })
    const removeDuplicates = (array, key) => {
      return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
      }, []);
    };

  }


  goToLink(poNumber: string) {
    // const fileURL = URL.createObjectURL(url);
    window.open(blobURL + poNumber + '.pdf')

  }

  openAccordionTab(event) {
    if (!event.target.classList.contains('active')) {
      $(".customtbl-accordion-head.active").removeClass("active");
      event.target.classList.add("active");
    } else {
      event.target.classList.remove("active");
    }
    // console.log(' ****from tr click');
    $('.atbl-container').removeClass('active');
    var id = event.target.getAttribute('data-accordion');
    console.log(id);
    $('.tbl-accordion-content').hide();
    $('.customtbl-accordion-head.active + #' + id).addClass('customtblHide');
    // $('.atbl-container').removeClass('active');  //close all nested accordion
    if (!event.target.classList.contains('active')) {
      $('.customtbl-accordion-head.active + #' + id).removeClass('customtblHide');
    } else {
      $('.customtbl-accordion-head.active + #' + id).show();
    }
  }
  openAccordionTab1(event) {
    if (!event.target.classList.contains('active')) {
      $(".customtbl-accordion-head-delivery.active").removeClass("active");
      event.target.classList.add("active");
    } else {
      event.target.classList.remove("active");
    }
    // console.log(' ****from tr click');
    $('.atbl-container-delivery').removeClass('active');
    var id = event.target.getAttribute('data-accordion');
    console.log(id);
    $('.tbl-accordion-content').hide();
    $('.customtbl-accordion-head-delivery.active + #' + id).addClass('customtblHide');
    // $('.atbl-container').removeClass('active');  //close all nested accordion
    if (!event.target.classList.contains('active')) {
      $('.customtbl-accordion-head-delivery.active + #' + id).removeClass('customtblHide');
    } else {
      $('.customtbl-accordion-head-delivery.active + #' + id).show();
    }
  }
  openAccordioninnerTab(event, i, j) {

    console.log("****************************************************************event ==>" + event.target.value);


    console.log($("#lineitem" + i + j));

    // expand and shrink and keep track of other-==========================================
    $(".customtbl-accordion-head-inner .plusminusArrow").removeClass("fa-minus");
    $(".customtbl-accordion-head-inner .plusminusArrow").addClass("fa-plus");
    if ($("#lineitem" + i + j).hasClass("active")) {
      console.log('true');
      $("#lineitem" + i + j).removeClass('active');


    }
    else {
      console.log('false');
      $(".customtbl-accordion-head-inner.active").removeClass("active");
      console.log($("#lineitem" + i + j));
      $("#lineitem" + i + j).addClass('active');
      $(".customtbl-accordion-head-inner.active .plusminusArrow").addClass("fa-minus");
      $(".customtbl-accordion-head-inner.active .plusminusArrow").removeClass("fa-plus");
    }

    // expand and shrink and do not keep track of other-==========================================
    //   if ($("#lineitem" + i + j).hasClass("active")) {
    //      $("#lineitem" + i + j).removeClass('active');
    //  }
    // $(".customtbl-accordion-head-inner.active").removeClass("active");
    //   console.log($("#lineitem" + i + j));
    //  // $(".customtbl-accordion-head-inner .plusminusArrow").toggleClass("fa-minus", "fa-plus");
    //   $(".customtbl-accordion-head-inner .plusminusArrow").removeClass("fa-minus");
    //  $(".customtbl-accordion-head-inner .plusminusArrow").addClass("fa-plus");
    //   $("#lineitem" + i + j).toggleClass("active");
    //  // $("#lineitem" + i + j).addClass('active');
    //   $(".customtbl-accordion-head-inner.active .plusminusArrow").addClass("fa-minus");
    //  $(".customtbl-accordion-head-inner.active .plusminusArrow").removeClass("fa-plus");



  }

  openAccordionNestedTab(event, lineitemnumber, ponumber) {

    this.loaderservice.show();
    this.orderlist = [];
    console.log("lineitemnumber is here " + lineitemnumber);
    console.log("this.polist ==> " + this.poDetail);
    // for (var i = 0; i < this.poDetail.length; i++) {
    //   if (this.poDetail[i].LINEITEMNUMBER == lineitemnumber && this.poDetail[i].ORDERNUMBER != null)
    //     this.orderlist.push(this.poDetail[i]);
    for (var k = 0; k < this.poDetail.length; k++) {
      // }
      if (this.poDetail[k].ORDERNUMBER != null && this.poDetail[k].PO_NUMBER == ponumber && this.poDetail[k].LINEITEMNUMBER == lineitemnumber) {
        this.orderlist.push(this.poDetail[k]);
      }
    }
    this.orderlist = this.orderlist.sort((d, e) => {
      if (d.ORDERNUMBER > e.ORDERNUMBER) {
        this.loaderservice.hide();
        return 1;
      }

      if (d.ORDERNUMBER < e.ORDERNUMBER) {
        this.loaderservice.hide();
        return -1;
      }
      this.loaderservice.hide();
      return 0;
    });
    // console.log("this.orderlist" + JSON.stringify(this.orderlist), 'orderlist**********************');
    if (!event.target.parentElement.classList.contains('active')) {
      console.log("===================================")
      $(".atbl-container.active").removeClass("active");
      event.target.parentElement.classList.add("active");
      setTimeout(() => {
        for (var i = 0; i < this.selectedcheckbox.length; i++) {
          var checkname = this.selectedcheckbox[i]
          $('#' + checkname).prop('checked', true)
        }
      }, 1000);

    }
    else {
      event.target.parentElement.classList.remove("active");
      setTimeout(() => {
        for (var i = 0; i < this.selectedcheckbox.length; i++) {
          var checkname = this.selectedcheckbox[i]
          $('#' + checkname).prop('checked', true)
        }
      }, 1000);
    }
    this.loaderservice.hide();
    console.log();
  }


  // openAccordioninnerTab1(event, i, j) {
  //   console.log("event ==>" + event.target.value);
  //   $(".customtbl-accordion-head-delivery-inner .plusminusArrow").removeClass("fa-minus");
  //   $(".customtbl-accordion-head-delivery-inner .plusminusArrow").addClass("fa-plus");
  //   console.log($("#lineitems" + i + j));

  //   if ($("#lineitems" + i + j).hasClass("active")) {
  //     console.log('true');
  //     $("#lineitems" + i + j).removeClass('active');


  //   }
  //   else {
  //     console.log('false');
  //     $(".customtbl-accordion-head-delivery-inner.active").removeClass("active");
  //     console.log($("#lineitems" + i + j));
  //     $("#lineitems" + i + j).addClass('active');
  //     $(".customtbl-accordion-head-delivery-inner.active .plusminusArrow").addClass("fa-minus");
  //     $(".customtbl-accordion-head-delivery-inner.active .plusminusArrow").removeClass("fa-plus");
  //   }
  // }


  // openAccordioninnerTab(event,i) { 
  //   console.log("event ==>"+event.target.value);
  //   // $( ".customtbl-accordion-head-inner .plusminusArrow").removeClass("fa-plus");
  //   // $( ".customtbl-accordion-head-inner .plusminusArrow").addClass("fa-minus");

  //   setTimeout(() => {
  //   // $( "#poaccInner"+i ).hasClass("active")
  //   if ($( ".customtbl-accordion-head-inner .plusminusArrow" ).hasClass("fa-plus")) { 
  //     console.log('true');
  //     if($( "#poaccInner"+i ).hasClass(".tbl-accordion-content-inner")){
  //       console.log("yes!!");
  //       $( " .tbl-accordion-content-inner" ).addClass('tblRow');

  //     }
  //     // $( "#poaccInner"+i ).removeClass('active');
  //     $( ".customtbl-accordion-head-inner .plusminusArrow").addClass("fa-minus");
  //     $( ".customtbl-accordion-head-inner .plusminusArrow").removeClass("fa-plus");
  //     $( " .tbl-accordion-content-inner" ).addClass('tblRow');
  //    } 
  //    else {
  //        console.log('false');
  //        $(".customtbl-accordion-head-inner.active").removeClass("active");
  //       //  $( "#poaccInner"+i ).addClass('active');
  //       $( "#poaccInner"+i ).css('display','none');

  //        $( ".customtbl-accordion-head-inner.active .plusminusArrow").removeClass("fa-minus");
  //        $( ".customtbl-accordion-head-inner.active .plusminusArrow").addClass("fa-plus");
  //    }
  //   }, 200);

  //   // if( $( ".customtbl-accordion-head-inner.active").hasClass( "active" ).toString().length>0)
  //   // {
  //   //  console.log($( ".customtbl-accordion-head-inner" ).hasClass( "active" ).toString().length);
  //   // }

  //   // if( $( "#lineitem"+i ).hasClass( "active" ).toString().length>0)
  //   // {
  //   //  console.log($( ".customtbl-accordion-head-inner" ).hasClass( "active" ).toString().length);
  //   // }


  // //  if( $( ".customtbl-accordion-head-inner"+i ).hasClass( "active" ).toString().length>0)
  // //   {
  // //    console.log($( ".customtbl-accordion-head-inner" ).hasClass( "active" ).toString().length);
  // //   }

  //   // if ($(this).closest(".customtbl-accordion-head-inner. ").length>0) { 
  //   //   console.log('true');
  //   //   $(this).closest(".customtbl-accordion-head-inner").removeClass('active');
  //   //  } 
  //   //  else {
  //   //    console.log($(this).closest(".customtbl-accordion-head-inner.active").length);
  //   //      console.log('false');
  //   //      $(".customtbl-accordion-head-inner.active").removeClass("active");
  //   //      $(this).closest(".customtbl-accordion-head-inner").addClass('active');
  //   //  }

  // }
  // openAccordioninnerTab(event) {
  //   if (!event.target.classList.contains('active')) {
  //     $(".customtbl-accordion-head-inner.active").removeClass("active");
  //     event.target.classList.add("active");
  //   } else {
  //     event.target.classList.remove("active");
  //   }

  //   var id = event.target.getAttribute('data-accordion');
  //   console.log(id);
  //   $('.tbl-accordion-content').hide();
  //   $('.customtbl-accordion-head-inner.active + #' + id).addClass('customtblHide-inner');

  //   if (!event.target.classList.contains('active')) {
  //     $('.customtbl-accordion-head-inner.active + #' + id).removeClass('customtblHide-inner');
  //   } else {
  //     $('.customtbl-accordion-head-inner.active + #' + id).show();
  //   }
  // }

  //  openAccordioninnerTab(event) {

  //   $('.plusminusArrow').click(function(event){ 
  //     if (event.target.closest(".customtbl-accordion-head-inner.active").length>0) { 
  //      console.log('true');
  //      event.target.closest(".customtbl-accordion-head-inner").removeClass('active');
  //     } 
  //     else {
  //         console.log('false');
  //         $(".customtbl-accordion-head-inner.active").removeClass("active");
  //         event.target.closest(".customtbl-accordion-head-inner").addClass('active');
  //     }
  //  });

  // if (!event.target.closest('.customtbl-accordion-head-inner').contains('active')) {
  //   $(".customtbl-accordion-head-inner.active").removeClass("active");
  //   event.target.closest('.customtbl-accordion-head-inner').add("active");
  // } else {
  //   event.target.closest('.customtbl-accordion-head-inner').remove("active");
  // }
  // if (!event.target.parentElement.classList.contains('active')) {
  //   $(".atbl-container.active").removeClass("active");
  //   event.target.parentElement.classList.add("active");
  // } else {
  //   event.target.parentElement.classList.remove("active");
  // }
  // }


  // openAccordionNestedTab(event)
  // {
  //   if (!event.target.parentElement.classList.contains('active')) {
  //     $(".atbl-container.active").removeClass("active");
  //     event.target.parentElement.classList.add("active");
  //   } else {
  //     event.target.parentElement.classList.remove("active");
  //   }
  // } 

  checkBalanceQty(event, balance, val1, val2) {
    var inputValue = event.target.value;
    console.log(inputValue);
    if (parseFloat(inputValue) > parseFloat(balance)) {
      this.balanceExceeded = true;
      this.zeropresent = false;
      $('#DeliveryQtyId' + val1 + val2).addClass('redborder');
      $('#exceeded' + val1 + val2).show();
      $('#zero' + val1 + val2).hide();
      // $('#isshowDelivery'+ val1).prop('disabled',true);
      this.issubmitcheck = true
    }
    else if (Number(inputValue) == 0) {
      this.zeropresent = true;
      this.issubmitcheck = true;
      $('#DeliveryQtyId' + val1 + val2).addClass('redborder');
      $('#zero' + val1 + val2).show();
      $('#exceeded' + val1 + val2).hide();
    }
    else {
      $('#DeliveryQtyId' + val1 + val2).removeClass('redborder');
      $('#exceeded' + val1 + val2).hide();
      $('#zero' + val1 + val2).hide();
      // $('#isshowDelivery'+ val1).prop('disabled',false);
      this.issubmitcheck = false
      this.balanceExceeded = false;
      this.zeropresent = false;
    }
  }

  getDeliveries(event, lineitemnumber, ponumber) {
    if (event.target.checked == true) {
      var getIsDirty = document.getElementById("#getDeliveries");
    }
    for (var k = 0; k < this.poDetail.length; k++) {
      // }
      if (this.poDetail[k].ORDERNUMBER != null && this.poDetail[k].PO_NUMBER == ponumber && this.poDetail[k].LINEITEMNUMBER == lineitemnumber) {
        this.orderlist.push(this.poDetail[k]);
      }
    }
    this.orderlist = this.orderlist.sort((d, e) => {
      if (d.ORDERNUMBER > e.ORDERNUMBER) {
        this.loaderservice.hide();
        return 1;
      }

      if (d.ORDERNUMBER < e.ORDERNUMBER) {
        this.loaderservice.hide();
        return -1;
      }
      this.loaderservice.hide();
      return 0;
    });

    $("#showDeliveries").addClass('displayBlock')
  }


  openAccordionNestedTabs(event, lineitemnumber, ponumber) {
    this.loaderservice.show();
    this.orderlist = [];
    console.log("lineitemnumber is here " + lineitemnumber);
    console.log("this.polist ==> " + this.poDetail);
    // for (var i = 0; i < this.poDetail.length; i++) {
    //   if (this.poDetail[i].LINEITEMNUMBER == lineitemnumber && this.poDetail[i].ORDERNUMBER != null)
    //     this.orderlist.push(this.poDetail[i]);
    for (var k = 0; k < this.poDetail.length; k++) {
      // }
      if (this.poDetail[k].ORDERNUMBER != null && this.poDetail[k].PO_NUMBER == ponumber && this.poDetail[k].LINEITEMNUMBER == lineitemnumber) {
        this.orderlist.push(this.poDetail[k]);
      }
    }
    this.orderlist = this.orderlist.sort((d, e) => {
      if (d.ORDERNUMBER > e.ORDERNUMBER) {
        this.loaderservice.hide();
        return 1;
      }

      if (d.ORDERNUMBER < e.ORDERNUMBER) {
        this.loaderservice.hide();
        return -1;
      }
      this.loaderservice.hide();
      return 0;
    });
    console.log("this.orderlist" + JSON.stringify(this.orderlist), 'orderlist**********************');
    if (!event.target.parentElement.classList.contains('active')) {
      $(".atbl-container-delivery.active").removeClass("active");
      event.target.parentElement.classList.add("active");
    } else {
      event.target.parentElement.classList.remove("active");
    }
    this.loaderservice.hide();
    console.log();
  }


  Check(message) {
    this.validate = true
    if (message.value != "" && message.value != " " && message.value != null && message.value.trim().length != 0) {
      this.validate = false;
    }
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

  navigate(clickthrough, PO_NUMBER, vendorid, contactpersonemail, orderitem, qty, date) {
    console.log("orderitem", this.orderlist);

    if (clickthrough == 'orderitem' || clickthrough == 'lineitem') {
      var orderitemlist = [];
      orderitemlist.push(orderitem)
      sessionStorage.setItem('PODetails', JSON.stringify(orderitemlist))
      sessionStorage.setItem("totQuantity", qty);
      console.log("this.invoicenumber" + this.invoicenumber);
      if (this.invoicenumber == undefined) {
        this.router.navigate(['./submitInvoiceFromList'], { queryParams: { order: btoa(clickthrough), vendorId: btoa(vendorid), contactpersonemailid: btoa(contactpersonemail), dt: btoa(date) } });

      }
      else {
        this.router.navigate(['./submitInvoiceFromList'], { queryParams: { order: btoa(clickthrough), vendorId: btoa(vendorid), contactpersonemailid: btoa(contactpersonemail), dt: btoa(date), in: btoa(this.invoicenumber), id: btoa(this.invoicedate) } });

      }
      console.log("clickthrough is heree  ", clickthrough, orderitemlist);
    }
    else {
      sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
      if (this.invoicenumber == undefined) {
        this.router.navigate(["invoicesubmission"], { queryParams: { o: btoa(clickthrough), PN: btoa(PO_NUMBER), vd: btoa(vendorid), cpe: btoa(contactpersonemail), dt: btoa(date) } });
      }
      else {
        this.router.navigate(["invoicesubmission"], { queryParams: { o: btoa(clickthrough), PN: btoa(PO_NUMBER), vd: btoa(vendorid), cpe: btoa(contactpersonemail), dt: btoa(date), in: btoa(this.invoicenumber), id: btoa(this.invoicedate) } });

      }
      console.log("POdetails", this.poDetail)
    }
    // PODetails
    // this.router.navigate["submitInvoiceFromList"];
    // 
    // btoa(clickthrough);
    console.log("inhererere");

  }

  navigate2(type, clickthrough, text, qty, vendorid, contactpersonemail, balQty) {
    console.log("clickthrough is heree  ", type, clickthrough, qty, balQty);

    console.log("total quantity", qty);

    // this.router.navigate["submitInvoiceFromList"];
    // [routerLink]="['/createDelivery']"
    sessionStorage.setItem("lineItemData", clickthrough);
    sessionStorage.setItem("text", text);
    sessionStorage.setItem("totQuantity", qty);
    sessionStorage.setItem("balQuantity", balQty);
    console.log("balance Quantity", balQty);


    this.router.navigate(['./createDelivery'], { queryParams: { order: clickthrough, vendorId: vendorid, contactpersonemailid: contactpersonemail, balqty: balQty } });
  }

  gettotrackinvoicepage(type, actualpo, actualline, actualorder) {
    this.router.navigate(['./trackInvoiceList'], {
      queryParams: {
        t: btoa(type), p: btoa(actualpo),
        l: btoa(actualline), o: btoa(actualorder)
      }
    });
  }

  downloadlist() {
    // this.loaderservice.show();
    this.downloaddatalist = [];
    console.log("this.poDataList to be downloaded ==>" + this.poDataList);
    for (var i = 0; i < this.poDataList.length; i++) {
      console.log("this.poDataList[i][31]" + this.poDataList[i]['PO_NUMBER']);
      this.downloaddatalist.push(this.poDataList[i]['PO_NUMBER']);
    }
    this.purchaseOrderListService.getpolistfile(this.currstatus, this.ponum,
      this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo).subscribe(res => {
        // console.log(res[0].message)

        if (res[0].message == "Success") {
          // if (this.profileModel != undefined && this.profileModel != null) {
          // this.toastr.success("Sucess!!")
          // this.router.navigate(['/dashboard'])
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
              // link.click();
              var extensionName = filename.substr(filename.lastIndexOf('.') + 1)
              this.getFileType(extensionName);
              this.trackOrderListService.downloadEncryptedFile(data, this.extensionType);

            }
          }
          // this.loaderservice.hide();
        }
        else {
          // this.loaderservice.hide();
          // this.dialogBox.popUpOpen2('Failed to download !!', 'error', 'puchaseorderlist');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'Failed to download !!',
            condition: 'error',
            page: 'puchaseorderlist'
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
      });
    // this.downloaddatalist = this.poDataList;
    // for (var i = 0; i < this.downloaddatalist.length; i++) {
    //   delete this.downloaddatalist[i].PLANT;
    //   delete this.downloaddatalist[i].BUSINESSPARTNEROID;
    //   delete this.downloaddatalist[i].BUYER;
    //   delete this.downloaddatalist[i].CATEGORY;
    //   delete this.downloaddatalist[i].CGSTAMOUNT;
    //   delete this.downloaddatalist[i].CITY;
    //   delete this.downloaddatalist[i].COMPANY;
    //   delete this.downloaddatalist[i].CONTACTPERSONEMAILID;
    //   delete this.downloaddatalist[i].CONTACTPERSONPHONE;
    //   delete this.downloaddatalist[i].COSTCENTRE;
    //   delete this.downloaddatalist[i].COUNTRY;
    //   delete this.downloaddatalist[i].CREATEDDATE;
    //   delete this.downloaddatalist[i].VENDORID;
    //   delete this.downloaddatalist[i].DELIVERYADDRESS1;
    //   delete this.downloaddatalist[i].DELIVERYADDRESS2;
    //   delete this.downloaddatalist[i].DELIVERYADDRESS3;
    //   delete this.downloaddatalist[i].LINEITEMNUMBER;
    //   delete this.downloaddatalist[i].LINEITEMTEXT;
    //   delete this.downloaddatalist[i].PINCODE;
    //   delete this.downloaddatalist[i].PLANT;
    //   // delete this.downloaddatalist[i].QUERY;
    //   delete this.downloaddatalist[i].Quantity;
    //   delete this.downloaddatalist[i].REQUSITIONER;
    //   delete this.downloaddatalist[i].SGSTAMOUNT;
    //   delete this.downloaddatalist[i].STARTDATE;
    //   delete this.downloaddatalist[i].STATE;
    //   delete this.downloaddatalist[i].UNITOFMEASURE;
    //   delete this.downloaddatalist[i].IGSTAMOUNT;
    //   delete this.downloaddatalist[i].ENDDATE;
    //   delete this.downloaddatalist[i].DEPARTMENT;

    //   // keyDescOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    //   //   return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);

    //   if (this.downloaddatalist[i].STATUS == "C") {
    //     console.log("in here");
    //     this.downloaddatalist[i].STATUS = "Complete";
    //   }
    //   if (this.downloaddatalist[i].STATUS == "S") {
    //     console.log("in here");
    //     this.downloaddatalist[i].STATUS = "Shipped";
    //   }
    //   if (this.downloaddatalist[i].STATUS == "P") {
    //     console.log("in here");
    //     this.downloaddatalist[i].STATUS = "Work In Progress";
    //   }
    //   if (this.downloaddatalist[i].STATUS == "A") {
    //     console.log("in here");
    //     this.downloaddatalist[i].STATUS = "Accepted";
    //   }
    //   if (this.downloaddatalist[i].STATUS == "N") {
    //     console.log("in here");
    //     this.downloaddatalist[i].STATUS = "New PO";
    //   }
    // }
    // this.excelDownloadService.exportAsExcelFile(this.downloaddatalist, 'Purchase_Orders_Data');
    // this.getPurChaseOrderList();
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
  downloadPo(po_number, singlepodownload) {
    this.loaderservice.show();
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
          this.loaderservice.hide();
        }


        // this.loaderservice.hide();
        // if (result[0].status == "Fail") {
        //   this.dialogBox.popUpOpen2(result[0].message, 'error', 'profiledata');
        // }
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );

  }

  getmessageStatus() {
    this.loaderservice.show();
    this.purchaseOrderListService.getReadStatus().subscribe(res => {
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
  getStatusUpdate(poNumber, invNumber, index) {
    this.uniquePONumber = poNumber;
    this.uniqueInvNumber = invNumber;
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

  // getPodata() {
  //   if (this.POOrderList.controls.PONumber.value == "") {
  //     this.getPurChaseOrderList();
  //   }
  // }

  orderDetails(orderNo, Date, Quantity, message, lineItemNumber, lineItemText, email, poNumber, address)
  // orderDetails(orderdetails)
  {
    console.log("data ???", orderNo, Date, Quantity, message, lineItemNumber, lineItemText, email, poNumber)
    // console.log("orderdetails", orderdetails);


    this.router.navigate(['/poOrderDispatched'], { queryParams: { orderNo: orderNo, Date: Date, Quantity: Quantity, message: message, lineItemNumber: lineItemNumber, lineItemText: lineItemText, email: email, poNumber: poNumber, address: address } })
  }
  Changemaxminoffromandto(n) {
    // if(type == 'duration')
    // {
    this.POOrderList.controls['fromDate'].setValue(null);
    this.POOrderList.controls['toDate'].setValue(null);
    var today = new Date();
    var lastyear = today.getFullYear() - 1 + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + '00:00:00.0';
    var halfyear = today.getFullYear() + '-' + (today.getMonth() - 5) + '-' + today.getDate() + ' ' + '00:00:00.0';
    var quarter = today.getFullYear() + '-' + (today.getMonth() - 2) + '-' + today.getDate() + ' ' + '00:00:00.0';
    var month = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate() + ' ' + '00:00:00.0';

    console.log("Value is here" + n.value);
    this.maxdate = new Date();
    if (n.value == 'ALL') {
      this.maxdate = "";
      this.mindate = "";
      // this.maxtodate = "";
      this.mintodate = "";
    }
    else if (n.value == '3M') {
      this.mindate = new Date(quarter);
      this.mintodate = new Date(quarter); //date to be added
    }
    else if (n.value == '6M') {
      this.mindate = new Date(halfyear);
      this.mintodate = new Date(halfyear); //date to be added
    }
    else if (n.value == '1Y') {
      this.mindate = new Date(lastyear);
      this.mintodate = new Date(lastyear); //date to be added
    }
    else if (n.value == '1M') {
      this.mindate = new Date(month);
      this.mintodate = ""; //date to be added
    }
    // }
  }
  searchorders() {
    this.currstatus = "AS";
    this.popaginationnumber = 1
    this.disableprevious = true;
    console.log("this.POOrderList.controls['PONumber'].value ==>" + this.POOrderList.controls['duration'].value);
    console.log("this.POOrderList.controls['fromDate'].value ==>" + this.POOrderList.controls['fromDate'].value);
    console.log("this.POOrderList.controls['toDate'].value ==>" + this.POOrderList.controls['toDate'].value);
    this.durationpresent = false;
    this.plantpresent = false;
    this.ponumberpresent = false;
    this.fromtodatepresent = false;
    this.filteredponumberData = [];
    this.filtereddurationData = [];
    this.poDataList = [];
    this.filtereddate = [];
    this.durationfromdate = "";
    this.durationtodate = "";
    var today = new Date();

    var lastyear = today.getFullYear() - 1 + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + '00:00:00.0';
    var halfyear = today.getFullYear() + '-' + (today.getMonth() - 5) + '-' + today.getDate() + ' ' + '00:00:00.0';
    // var quarter = today.getFullYear() + '-' + (today.getMonth() - 2) + '-' + today.getDate() + ' ' + '00:00:00.0';
    var month = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate() + ' ' + '00:00:00.0';

    var threeMonthsAgo = moment().subtract(3, 'months');
    var oneMonthsAgo = moment().subtract(1, 'months');
    var sixMonthsAgo = moment().subtract(6, 'months');
    var oneyearago = moment().subtract(12, 'months');
    // this.responseList.length = 0
    console.log("Month", oneMonthsAgo, "Quarter", threeMonthsAgo, "HalfYear", sixMonthsAgo, "Lastyear", oneyearago, "Tday", today);
    this.fromdateofduration = "";
    this.todateofduration = "";
    if (this.POOrderList.controls['PONumber'].value) {
      this.ponumberpresent = true;
      this.ponum = this.POOrderList.controls['PONumber'].value.trim();
    }
    else {
      this.ponum = "NA";
    }
    if (this.POOrderList.controls['Plant'].value) {
      for (var b = 0; b < this.tempPlantList.length; b++) {
        if (this.tempPlantList[b].PLANTNAME == this.POOrderList.controls['Plant'].value.trim()) {
          this.plant = this.tempPlantList[b].PLANTCODE;
        }
      }
      this.plantpresent = true;
      // this.plant = this.POOrderList.controls['Plant'].value.trim();
    }
    else {
      this.plant = "NA";
    }

    if (this.POOrderList.controls['duration'].value == 'ALL') {
      // this.durationpresent = false;
      this.maxdate = "";
      this.mindate = "";
      // this.maxtodate = "";
      this.mintodate = "";
      this.fromdateofduration = "NA";
      this.todateofduration = "NA";
    }
    else if (this.POOrderList.controls['duration'].value == '3M') {

      console.log("in" + threeMonthsAgo.format("DD/MM/YYYY"));
      // console.log("moment ==>"+moment.utc(moment(this.convert(new Date(this.todateofduration))).format("YYYY-MM-DD"), "DD/MM/YYYY"));
      // this.fromdateofduration = moment(new Date(quarter)).format("DD/MM/YYYY");
      this.fromdateofduration = threeMonthsAgo.format("DD/MM/YYYY");
      this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
      this.durationpresent = true;
      // this.maxdate = new Date().toString();
      // this.mindate = "";
      // this.mintodate = ""; //date to be added
    }
    else if (this.POOrderList.controls['duration'].value == '6M') {
      // this.fromdateofduration = moment(new Date(halfyear)).format("DD/MM/YYYY");
      this.fromdateofduration = sixMonthsAgo.format("DD/MM/YYYY");
      this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
      this.durationpresent = true;
      // this.maxdate = "";
      // this.mindate = "";
      // this.mintodate = ""; //date to be added
    }
    else if (this.POOrderList.controls['duration'].value == '1Y') {

      // this.fromdateofduration = moment(new Date(lastyear)).format("DD/MM/YYYY")
      this.fromdateofduration = oneyearago.format("DD/MM/YYYY");
      this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
      this.durationpresent = true;
      // this.maxdate = "";
      // this.mindate = "";
      // this.mintodate = ""; //date to be added
    }
    else if (this.POOrderList.controls['duration'].value == '1M') {
      // this.fromdateofduration = moment(new Date(month)).format("DD/MM/YYYY");
      this.fromdateofduration = oneMonthsAgo.format("DD/MM/YYYY");
      this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
      this.durationpresent = true;
      // this.maxdate = "";
      // this.mindate = "";
      // this.mintodate = ""; //date to be added
    }
    console.log("this.fromdateofduration ==>" + this.fromdateofduration);
    console.log("this.todateofduration ==>" + this.todateofduration);

    if (this.POOrderList.controls['fromDate'].value) {
      this.fromtodatepresent = true;
      this.fromdateofpo = moment(new Date(this.POOrderList.controls['fromDate'].value)).format("DD/MM/YYYY");
      this.todateofpo = moment(new Date(this.POOrderList.controls['toDate'].value)).format("DD/MM/YYYY");
    }
    else {
      this.fromdateofpo = "NA";
      this.todateofpo = "NA";
    }
    if (this.invoicenumber == undefined) {
      // getpo call
      this.purchaseOrderListService.getPO(this.popaginationnumber, this.currstatus, this.ponum,
        this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo, this.plant).subscribe(res => {
          let advanceSearcBox = document.getElementById("advanceSearcBox");
          let closeArrow = document.getElementById("closeArrow");
          let openArrow = document.getElementById("openArrow");
          advanceSearcBox.style.display = "none";
          openArrow.style.display = "block";
          closeArrow.style.display = "none";
          // this.POOrderList.reset();
          this.poCountAsPerStatus = res[0].poCountAsPerStatus;
          if (!res[0].message) {
            this.poDataList = res[0].poData;
            // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
            this.totalItems = res[0].popages;
            this.endpagenumber = Math.ceil((Number(res[0].popages) / this.pageSize))
            if (Number(res[0].popages) / this.popaginationnumber <= this.pageSize) {
              this.disablenext = true;
            }
            else {
              this.disablenext = false;
            }
          }
        });
      setTimeout(() => {
        // this.loaderservice.show();
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
      }, 500); err => {
        this.loaderservice.hide();
      }
    }
    else {
      // getwopo call
      this.purchaseOrderListService.getWOPO(this.popaginationnumber, this.currstatus, this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo).subscribe(res1 => {
        if (res1[0].message != 'No Data Found for given Vendor Id') {
          this.poDataList = res1[0].poData;
          this.totalItems = res1[0].popages;
          this.endpagenumber = Math.ceil((Number(res1[0].popages) / this.pageSize))
          if (Number(res1[0].popages) / this.popaginationnumber <= this.pageSize) {
            this.disablenext = true;
          }
          else {
            this.disablenext = false;
          }
        }
      });
      setTimeout(() => {
        // this.loaderservice.show();
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
      }, 500); err => {
        this.loaderservice.hide();
      }
    }
    // if (this.filterpodatalist.length != 0) {
    //   for (var i = 0; i < this.filterpodatalist.length; i++) {
    //     if (this.ponumberpresent) {
    //       if (this.filterpodatalist[i].PO_NUMBER.includes(this.POOrderList.controls['PONumber'].value)) {
    //         this.filteredponumberData.push(this.filterpodatalist[i]);
    //       }
    //     }
    //     else {
    //       this.filteredponumberData.push(this.filterpodatalist[i]);
    //     }
    //   }
    //   console.log("this.filteredponumberData.length" + this.filteredponumberData.length);
    //   if (this.filteredponumberData.length != 0) {
    //     for (var i = 0; i < this.filteredponumberData.length; i++) {
    //       if (this.fromdateofduration != '') {
    //         if ((moment.utc(moment(this.filteredponumberData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
    //           .isAfter(moment.utc(moment(this.convert(new Date(this.fromdateofduration))).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]'))
    //           || moment.utc(moment(this.filteredponumberData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
    //             .isSame(moment.utc(moment(this.convert(new Date(this.fromdateofduration))).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')))
    //           && (moment.utc(moment(this.filteredponumberData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
    //             .isBefore(moment.utc(moment(this.convert(new Date(this.todateofduration))).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]'))
    //             || moment.utc(moment(this.filteredponumberData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
    //               .isSame(moment.utc(moment(this.convert(new Date(this.todateofduration))).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')))) {
    //           this.filtereddurationData.push(this.filteredponumberData[i]);
    //         }
    //       }
    //       else {
    //         this.filtereddurationData.push(this.filteredponumberData[i]);
    //       }
    //     }
    //     console.log("this.filtereddurationData.length" + this.filtereddurationData.length);
    //     if (this.filtereddurationData.length != 0) {
    //       for (var i = 0; i < this.filtereddurationData.length; i++) {
    //         if (this.fromtodatepresent) {
    //           // console.log("this.invoiceList.controls['fromDate'].value"+this.convert(this.invoiceList.controls['fromDate'].value));
    //           // console.log("");
    //           // console.log("moment(this.filteredponumberData[i].CREATEDON).format('YYYY-MM-DD')"+moment(this.filteredponumberData[i].INVOICEDATE).format("YYYY-MM-DD"));
    //           // console.log("moment(this.invoiceList.controls['fromDate'].value).format('MM/DD/YYYY')"+moment(this.convert(this.invoiceList.controls['fromDate'].value)).format("MM/DD/YYYY"));

    //           if ((moment.utc(moment(this.filtereddurationData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
    //             .isAfter(moment.utc(moment(this.convert(this.POOrderList.controls['fromDate'].value)).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]'))
    //             || moment.utc(moment(this.filtereddurationData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
    //               .isSame(moment.utc(moment(this.convert(this.POOrderList.controls['fromDate'].value)).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')))
    //             && (moment.utc(moment(this.filtereddurationData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
    //               .isBefore(moment.utc(moment(this.convert(this.POOrderList.controls['toDate'].value)).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]'))
    //               || moment.utc(moment(this.filtereddurationData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
    //                 .isSame(moment.utc(moment(this.convert(this.POOrderList.controls['toDate'].value)).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')))) {
    //             this.filtereddate.push(this.filtereddurationData[i]);
    //           }
    //         }
    //         else {
    //           this.filtereddate.push(this.filtereddurationData[i]);
    //         }
    //       }
    //       console.log("this.filtereddate.length" + this.filtereddate.length);
    //       this.poDataList = this.filtereddate;
    //       this.totalItems = this.poDataList.length;
    //     }
    //     else {
    //       this.poDataList = [];
    //       this.totalItems = this.poDataList.length;
    //     }
    //     // this.poDataList = this.filtereddurationData;
    //     // this.totalItems = this.poDataList.length;

    //   }
    //   else {
    //     this.poDataList = [];
    //     this.totalItems = this.poDataList.length;
    //   }
    //   // this.poDataList = this.filteredponumberData;
    // }
    // else {
    //   this.poDataList = [];
    //   this.totalItems = this.poDataList.length;
    // }

  }

  onDateChange() {
    if (this.POOrderList.controls['fromDate'].value) {
      // var test = this.convert(moment(this.POOrderList.controls['fromDate'].value).format("MM/DD/YYYY"));
      // console.log("test i shere"+test);
      // this.POOrderList.controls['fromDate'].setValue(test);
      if (this.POOrderList.controls['toDate'].value) {
        this.disable = false;
        this.fromdateerror = false;
        this.todateerror = false;
      }
      else {
        this.todateerror = true;
        this.fromdateerror = false;
        this.disable = true;
      }
      this.mintodate = new Date(this.POOrderList.controls['fromDate'].value);

    }
    else if (this.POOrderList.controls['toDate'].value) {
      if (this.POOrderList.controls['fromDate'].value) {
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


  }

  durationlist() {
    // this.selected = 'ALL';
    this.POOrderList.controls['duration'].setValue('ALL');
    console.log("in here");
    this.Duration =
      [
        { id: 'ALL', value: '--Select---' },
        { id: '1M', value: 'Last 1 Month' },
        { id: '3M', value: 'Last 3 Months' },
        { id: '6M', value: 'Last 6 Months' },
        { id: '1Y', value: 'Last 1 Year' }
      ]



  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  isChallanDelivery(val, val1, event, lineItemNo, poNum) {
    this.deliveryVal = val;
    this.deliveryVal1 = val1;
    this.lineItemNo = lineItemNo;
    this.deliveryPoNum = poNum;
    if (event.target.checked == true) {
      this.selectedLineItem.push(lineItemNo)
      this.isdelieverycheck = true;
      $("#isshowDelivery" + val).show();
      $("#isshowCreateDelivery" + val).show()
      $("#isshowSubmit" + val).hide();
      $("#isshow" + val).hide();
      $("#isChallan" + val + val1).removeClass('displayNone');

    }
    else {
      // $("#DcForm").trigger("reset");
      event.stopPropagation();
      this.isdelieverycheck = false;
      const index = this.selectedLineItem.indexOf(lineItemNo);
      if (index > -1) {
        this.selectedLineItem.splice(index, 1);
      }
      $("#isshowSubmit" + val).show();
      $("#DcId" + val + val1).val("");
      $("#DeliveryQtyId" + val + val1).val("");
      $("#DCDateID" + val + val1).val('');
      $("#dateCalendar" + val + val1).val('');
      $("#isChallan" + val + val1).addClass('displayNone');
      $("#isChallan" + val + val1).removeClass('displayBlock');
      this.poDate[val1] = null;

    }
    this.isselected = false;
    for (var i = 0; i < this.uniquelineitems.length; i++) {
      if ($('#deliveryCheck' + val + i).prop('checked') == true) {
        this.isselected = true;
      }
    }
    if (this.isselected == false) {
      this.showSubmitInvoice = true;
    } else {
      this.showSubmitInvoice = false;
    }
  }

  issubmitInvoice(val, event) {
    if (event.target.checked == true) {
      $("#isshowDelivery" + val).hide();
      $("#isshowCreateDelivery" + val).hide();
      $("#isshowSubmit" + val).show();
      $("#isshow" + val).show();
    }

  }
  CreateAllDeliveries(val, val1, event, ponumValue, poDate, vendorid) {
    this.isdelieverycheck = false
    this.deliverycreated = false;
    for (var i = 0; i < this.uniquelineitems.length; i++) {
      if ($('#deliveryCheck' + val + i).prop('checked') == true) {
        this.isdelieverycheck = true;
        // for(var x=0;x<this.selectedLineItem.length;x++)
        // {
        //   if(this.selectedLineItem[x] == this.uniquelineitems[i].LINEITEMNUMBER)
        //   {
        //     var temp = $('#DeliveryQtyId' + this.selecteddeliveryVal + i).val()
        //     console.log("temp is here"+temp);
        //     if(this.uniquelineitems[i].BALANCE_QTY<=temp)
        //     {
        //       this.dialogBox.popUpOpen2('Delivery Quantity cannot be greater than Balance Quantity','success','purchaseorderlist');
        //       return

        //     }
        //   }
        // }
      }
    }
    if (this.isdelieverycheck == false) {
      // this.dialogBox.popUpOpen2('Please select item(s) to create delivery.', 'success', 'purchaseorderlist');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'Please select item(s) to create delivery.',
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
      return
    }

    this.uniquedeliveryitems = [];
    this.deliveryarray = [];
    this.orderarray = []
    this.selecteddeliveryVal = val;
    let amt = 0

    console.log(this.lineItemNo, 'lineItemNo');
    for (var i = 0; i < this.uniquelineitems.length; i++) {
      if ($('#deliveryCheck' + this.selecteddeliveryVal + i).prop('checked') == true) {
        if ($('#DcId' + this.selecteddeliveryVal + i).val() == "" || $('#DeliveryQtyId' + this.selecteddeliveryVal + i).val() == ""
          || $('#DCDateID' + this.selecteddeliveryVal + i).val() == "") {
          // this.dialogBox.popUpOpen2('Please select mandatory fields.', 'success', 'purchaseorderlist');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'Please select mandatory fields.',
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
          return;
        }
      }
    }
    // this.purchaseOrderListService.getPODetails(ponumValue).subscribe(res => {
    //   this.poDetail = res[0].poData
    // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
    for (var i = 0; i < this.selectedLineItem.length; i++) {
      for (var j = 0; j < this.poDetail.length; j++) {
        if (this.poDetail[j].LINEITEMNUMBER == this.selectedLineItem[i]) {
          this.uniquedeliveryitems.push(this.poDetail[j]);
          break;
        }
      }
    }

    for (var i = 0; i < this.uniquelineitems.length; i++) {
      if ($('#deliveryCheck' + this.selecteddeliveryVal + i).prop('checked') == true) {
        let deliveryQty = 0;
        this.deliverydetailsModel = new deliveryDetails();
        this.orderdetailsModel = new orderdetailsModel();
        this.deliverydetailsModel.DC = $('#DcId' + this.selecteddeliveryVal + i).val();
        if (this.deliveryarray.length > 0) {
          if (this.deliveryarray[this.deliveryarray.length - 1].DC == this.deliverydetailsModel.DC) {
            // this.dialogBox.popUpOpen2('Duplicate Deliveries are not allowed.', 'success', 'purchaseorderlist');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Duplicate Deliveries are not allowed.',
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
            return;
          }
        }
        this.deliverydetailsModel.DQty = $('#DeliveryQtyId' + this.selecteddeliveryVal + i).val();
        this.deliverydetailsModel.DcDate = $('#DCDateID' + this.selecteddeliveryVal + i).val();
        // this.uniquelineitems[i].RATEPERQTY = this.uniquelineitems[i].RATEPERQTY.replace(/,/g, '');
        this.deliverydetailsModel.AMOUNT = parseFloat(this.uniquelineitems[i].RATEPERQTY.replace(/,/g, '')) * parseFloat(this.deliverydetailsModel.DQty);

        this.orderdetailsModel.DC = $('#DcId' + this.selecteddeliveryVal + i).val();
        this.orderdetailsModel.DQty = $('#DeliveryQtyId' + this.selecteddeliveryVal + i).val();
        this.orderdetailsModel.DcDate = $('#DCDateID' + this.selecteddeliveryVal + i).val();
        this.orderdetailsModel.AMOUNT = parseFloat(this.uniquelineitems[i].RATEPERQTY.replace(/,/g, '')) * parseFloat(this.orderdetailsModel.DQty)

        this.orderdetailsModel.LINEITEMNUMBER = this.uniquelineitems[i].LINEITEMNUMBER;
        this.orderdetailsModel.QUANTITY = this.orderdetailsModel.DQty;
        this.orderdetailsModel.ORDERNUMBER = this.orderdetailsModel.DC;


        this.deliverydetailsModel.PO_NUMBER = ponumValue;
        this.deliverydetailsModel.PODATE = poDate;
        this.deliverydetailsModel.LINEITEMNUMBER = this.uniquelineitems[i].LINEITEMNUMBER;
        this.deliverydetailsModel.lineType = 'LineItemDelivery';
        this.deliverydetailsModel.LINEITEMTEXT = this.uniquelineitems[i].LINEITEMTEXT;
        this.deliverydetailsModel.UNITOFMEASURE = this.uniquelineitems[i].UNITOFMEASURE;
        this.deliverydetailsModel.Per = 1;
        this.deliverydetailsModel.vendorId = vendorid;
        console.log("this.uniquelineitems[i]", this.uniquelineitems[i]);
        this.deliverydetailsModel.QUANTITY = this.uniquelineitems[i].QUANTITY;
        this.deliverydetailsModel.CURRENCY = this.uniquelineitems[i].CURRENCY;
        this.deliverydetailsModel.RATEPERQTY = this.uniquelineitems[i].RATEPERQTY;
        this.deliverydetailsModel.BALANCE_QTY = this.uniquelineitems[i].BALANCE_QTY;
        this.deliverydetailsModel.MATERIAL = this.uniquelineitems[i].MATERIAL;
        this.deliverydetailsModel.PLANT = this.uniquelineitems[i].PLANT;
        console.log("this.uniquelineitems[i].RATEPERQTY" + this.uniquelineitems[i].RATEPERQTY);
        this.deliverydetailsModel.AMOUNT = parseFloat(this.uniquelineitems[i].RATEPERQTY.replace(/,/g, '')) * parseFloat(this.deliverydetailsModel.DQty)
        amt = amt + Number(this.deliverydetailsModel.AMOUNT);
        this.deliverydetailsModel.TOTALAMONT = amt;
        console.log(this.deliverydetailsModel.TOTALAMONT, 'this.deliverydetailsModel.TOTALAMONT');

        deliveryQty = deliveryQty + Number(this.deliverydetailsModel.DQty);
        console.log("deliveryQty is here " + deliveryQty);
        console.log("this.uniquelineitems[a].BALANCE_QTY is here " + this.uniquelineitems[i].BALANCE_QTY);

        // if(deliveryQty > this.uniquelineitems[i].BALANCE_QTY)
        // {
        //   this.dialogBox.popUpOpen2('Delivery Quantity cannot be greater than Balance Quantity','success','purchaseorderlist');
        //   return
        // }
        this.deliveryarray.push(this.deliverydetailsModel);
        this.orderarray.push(this.orderdetailsModel);
      }
    }
    sessionStorage.removeItem("invsubmissionDetails");
    sessionStorage.setItem("invsubmissionDetails", JSON.stringify(this.deliveryarray));
    sessionStorage.removeItem("invsubmissionorderDetails");
    sessionStorage.setItem("invsubmissionorderDetails", JSON.stringify(this.orderarray));
    console.log(this.deliveryarray, 'this.deliveryarray');
    console.log("this.uniquedeliveryitems create deliver======>>>", JSON.stringify(this.uniquedeliveryitems));

    $("#yesId").removeClass('button-primary-inverse')
    $("#yesId").prop("disable", "false");
    $("#showText").hide();
    $("#popup3").css("visibility", "visible");
    $("#popup3").css("opacity", "1");
    // });
  }

  CreateAllDeliveries1(val, val1, event, ponumValue, vendorid, poDate) {

    this.uniquedeliveryitems = [];
    this.deliveryarray = [];
    this.orderarray = [];
    this.selectedorderlineitemdetails = [];
    for (var i = 0; i < this.orderlist.length; i++) {
      if ($('#deliverydetail' + val + this.lineitemvalue + i).prop('checked') == true) {
        this.checkboxisselected = true
      }
    }
    if (this.checkboxisselected == false) {
      // this.dialogBox.popUpOpen2('Please select delivery challan to submit invoice.', 'success', 'purchaseorderlist');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'Please select delivery challan to submit invoice.',
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
      return;
    }
    if (this.selectedLineItem.length == 1) {
      let amount = 0;

      console.log(this.lineItemNo, 'lineItemNo');
      // this.purchaseOrderListService.getPODetails(ponumValue).subscribe(res => {
      //   this.poDetail = res[0].poData
      // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      for (var i = 0; i < this.selectedLineItem.length; i++) {
        for (var j = 0; j < this.poDetail.length; j++) {
          // if (this.poDetail[j].LINEITEMNUMBER == this.lineItemNo) {
          if (this.poDetail[j].LINEITEMNUMBER == this.selectedLineItem[i]) {
            this.uniquedeliveryitems.push(this.poDetail[j]);
            break;
          }
        }
      }
      console.log("this.uniquedeliveryitems create deliver1======>>>", JSON.stringify(this.uniquedeliveryitems));
      console.log(this.orderselectedList, 'orderselectedList=============================>')
      for (var i = 0; i < this.uniquedeliveryitems.length; i++) {
        // for (var b = 0; b < this.orderselectedList.length; b++) {
        // for (var c = 0; c < this.orderlist.length; c++) {
        for (var c = 0; c < this.lineItemOrderarray.length; c++) {
          // if (this.orderlist[c].DC == this.orderselectedList[b]) {
          // if (this.lineItemOrderarray[c].DC == this.lineItemOrderarray[c]) {
          // if ($('#deliverydetail' + this.submitval0 + this.submitval + c).prop('checked') == true) {
          this.deliverydetailsModel = new deliveryDetails();
          this.orderdetailsModel = new orderdetailsModel();
          // this.deliverydetailsModel.DcNo=$('#DcId'+this.selecteddeliveryVal+i).val();
          // this.deliverydetailsModel.DQty=$('#DeliveryQtyId'+this.selecteddeliveryVal+i).val();
          // this.deliverydetailsModel.DcDate=$('#DCDateID'+this.selecteddeliveryVal+i).val();
          console.log("this.orderlist[c].vendorid" + this.orderlist[c].vendorId);
          // this.orderdetailsModel.DC = this.orderlist[c].DC;
          // this.orderdetailsModel.DQty = this.orderlist[c].QUANTITY;
          // this.orderdetailsModel.DcDate = this.orderlist[c].DISPATCHDATE;

          this.orderdetailsModel.DC = this.lineItemOrderarray[c].DC;
          console.log("this.lineItemOrderarray[c].QUANTITY " + this.lineItemOrderarray[c].QUANTITY);
          this.orderdetailsModel.DQty = this.lineItemOrderarray[c].QUANTITY;
          this.orderdetailsModel.DcDate = this.lineItemOrderarray[c].DISPATCHDATE;

          // moment(new Date(this.orderlist[c].DISPATCHDATE)).format("DD/MM/YYYY");
          this.orderdetailsModel.LINEITEMNUMBER = this.uniquedeliveryitems[i].LINEITEMNUMBER;
          this.orderdetailsModel.QUANTITY = this.orderdetailsModel.DQty;
          this.orderdetailsModel.ORDERNUMBER = this.orderdetailsModel.DC;
          this.orderdetailsModel.vendorID = vendorid;
          this.orderdetailsModel.AMOUNT =
            parseFloat(this.uniquedeliveryitems[i].RATEPERQTY.replace(/,/g, '')) * parseFloat(this.orderdetailsModel.DQty)
          this.deliverydetailsModel.PO_NUMBER = ponumValue;
          this.deliverydetailsModel.PODATE = poDate;
          // this.deliverydetailsModel.LINEITEMNUMBER=this.uniquelineitems[i].LINEITEMNUMBER;
          this.deliverydetailsModel.LINEITEMNUMBER = this.uniquedeliveryitems[i].LINEITEMNUMBER;
          this.deliverydetailsModel.lineType = 'orderItemfordelivery';
          this.deliverydetailsModel.LINEITEMTEXT = this.uniquedeliveryitems[i].LINEITEMTEXT;
          this.deliverydetailsModel.UNITOFMEASURE = this.uniquedeliveryitems[i].UNITOFMEASURE;
          this.deliverydetailsModel.Per = 1;
          console.log("this.uniquedeliveryitems[i] ==>" + this.uniquedeliveryitems[i]);
          this.deliverydetailsModel.vendorId = vendorid;
          this.deliverydetailsModel.QUANTITY = this.uniquedeliveryitems[i].QUANTITY;
          this.deliverydetailsModel.CURRENCY = this.uniquedeliveryitems[i].CURRENCY;
          this.deliverydetailsModel.RATEPERQTY = this.uniquedeliveryitems[i].RATEPERQTY;
          this.deliverydetailsModel.BALANCE_QTY = this.uniquedeliveryitems[i].BALANCE_QTY;
          this.deliverydetailsModel.MATERIAL = this.uniquedeliveryitems[i].MATERIAL;
          this.deliverydetailsModel.PLANT = this.uniquedeliveryitems[i].PLANT;
          this.deliverydetailsModel.AMOUNT = parseFloat(this.uniquedeliveryitems[i].RATEPERQTY.replace(/,/g, '')) * parseFloat(this.orderdetailsModel.DQty)
          amount = amount + Number(this.orderdetailsModel.AMOUNT);
          this.deliverydetailsModel.TOTALAMONT = amount;
          console.log(this.deliverydetailsModel.TOTALAMONT, 'this.deliverydetailsModel.TOTALAMONT');
          this.orderarray.push(this.orderdetailsModel);
          if (this.deliveryarray.length == 0) {
            this.deliveryarray.push(this.deliverydetailsModel);
          }
          else if (this.deliveryarray[c] == this.deliverydetailsModel.LINEITEMNUMBER) {

          }
          // }
          // break
          // }
          // }
        }
      }
      sessionStorage.removeItem("invwopodetails");
      sessionStorage.removeItem("invsubmissionDetails");
      sessionStorage.setItem("invsubmissionDetails", JSON.stringify(this.deliveryarray));
      sessionStorage.removeItem("invsubmissionorderDetails");
      sessionStorage.setItem("invsubmissionorderDetails", JSON.stringify(this.orderarray));
      this.router.navigate(["invoicesubmission"]);
      //console.log("this.uniquelineitems create deliver1======>>>", JSON.stringify(this.uniquelineitems));
    }
    else {
      this.selectedorderlineitemdetails = [];
      console.log(this.lineItemOrderarray, "================lineItemOrderarray=======================")
      for (var m = 0; m < this.selectedLineItem.length; m++) {
        // for(var k=0;k<this.orderlist.length;k++)
        // {

        // }
        for (var j = 0; j < this.poDetail.length; j++) {
          if (this.poDetail[j].LINEITEMNUMBER == this.selectedLineItem[m]) {
            // this.poDetail[j].CREATEDON = this.orderlist[c].DISPATCHDATE
            this.selectedorderlineitemdetails.push(this.poDetail[j]);
            break;
          }

        }
        console.log("this.poDetail =>", this.poDetail);
        console.log("this.selectedorderlineitemdetails =>", this.selectedorderlineitemdetails);
        // }
        //         this.orderdetailsModel = new  orderdetailsModel();
        //                 // this.deliverydetailsModel.DcNo=$('#DcId'+this.selecteddeliveryVal+i).val();
        //                 // this.deliverydetailsModel.DQty=$('#DeliveryQtyId'+this.selecteddeliveryVal+i).val();
        //                 // this.deliverydetailsModel.DcDate=$('#DCDateID'+this.selecteddeliveryVal+i).val();
        // console.log("this.orderlist[c].vendorid"+this.orderlist[c].vendorId);
        //                 this.orderdetailsModel.DcNo=this.orderlist[c].DC;
        //                 this.orderdetailsModel.DQty=this.orderlist[c].QUANTITY;
        //                 this.orderdetailsModel.DcDate=this.orderlist[c].DISPATCHDATE;
        //                 // moment(new Date(this.orderlist[c].DISPATCHDATE)).format("DD/MM/YYYY");
        //                 this.orderdetailsModel.LINEITEMNUMBER=this.uniquedeliveryitems[i].LINEITEMNUMBER;
        //                 this.orderdetailsModel.QUANTITY=this.orderdetailsModel.DQty;
        //                 this.orderdetailsModel.ORDERNUMBER=this.orderdetailsModel.DcNo;
        //                 this.orderdetailsModel.vendorID=vendorid;
        //                 this.orderdetailsModel.AMOUNT=
        //                 Number(this.uniquedeliveryitems[i].RATEPERQTY) * Number(this.orderdetailsModel.DQty);
        //                 this.orderarray.push(this.orderdetailsModel);
      }
      sessionStorage.removeItem("invwopodetails");
      sessionStorage.removeItem("invsubmissionDetails");
      sessionStorage.setItem("invsubmissionDetails", JSON.stringify(this.selectedorderlineitemdetails));
      sessionStorage.removeItem("invallDetails");
      sessionStorage.setItem("invallDetails", JSON.stringify(this.lineItemOrderarray));
      // sessionStorage.setItem("invsubmissionorderDetails", JSON.stringify(this.orderarray));
      this.router.navigate(["invoicesubmission"]);

    }
  }



  acceptdelivery() {
    // $("#yesId").addClass('redClass')
    $("#showText").removeClass('displayNone');
    $("#showText").show();
  }
  close() {
    this.deliverycreated = true;
    $("#popup3").css("visibility", "hidden");
    $("#popup3").css("opacity", "0");
    $("#popup5").css("visibility", "hidden");
    $("#popup5").css("opacity", "0");
    sessionStorage.removeItem("invsubmissionorderDetails");
    this.showSubmitInvoice = true;
    this.showCreateDelivery = true;
  }

  createnewDelivery() {
    this.deliverycreated = true;
    this.loaderservice.show();
    $("#yesId").addClass('button-primary-inverse')
    $("#yesId").prop("disable", "true");
    // $("#popup3").css("visibility", "hidden");
    // $("#popup3").css("opacity", "0");

    this.createDeliveryarray = [];
    // for(var i=0;i<this.selectedLineItem.length;i++)

    //if($('#deliverycheck'+this.selecteddeliveryVal+).prop('checked') == true)
    for (var a = 0; a < this.uniquelineitems.length; a++) {
      let deliveryQty = 0;
      this.createDeliverySubmissionsModel = new createDeliverySubmissionsModel()
      this.createDeliverySubmissionsModel.businesspartneroid = sessionStorage.getItem("Bid")
      this.createDeliverySubmissionsModel.ponumber = this.uniquelineitems[a].PO_NUMBER
      this.createDeliverySubmissionsModel.lineitemnumber = this.uniquelineitems[a].LINEITEMNUMBER;
      this.createDeliverySubmissionsModel.lineitemtext = this.uniquelineitems[a].LINEITEMTEXT;

      if (this.isdelieverycheck = true) {
        this.createDeliverySubmissionsModel.ordernumber = $("#DcId" + this.selecteddeliveryVal + a).val();
        this.createDeliverySubmissionsModel.quantity = $("#DeliveryQtyId" + this.selecteddeliveryVal + a).val();
        this.createDeliverySubmissionsModel.deliverydate = $("#DCDateID" + this.selecteddeliveryVal + a).val();
        console.log(this.createDeliverySubmissionsModel.ordernumber, "  this.createDeliverySubmissionsModel.ordernumber")
        console.log(this.createDeliverySubmissionsModel.quantity, "  this.createDeliverySubmissionsModel.quantity")
        console.log(this.createDeliverySubmissionsModel.deliverydate, "  this.createDeliverySubmissionsModel.deliverydate")
      }
      else {
        this.createDeliverySubmissionsModel.ordernumber = $("#DcId" + this.selecteddeliveryVal + this.deliveryVal1).val();
        this.createDeliverySubmissionsModel.quantity = $("#DeliveryQtyId" + this.selecteddeliveryVal + this.deliveryVal1).val();
        this.createDeliverySubmissionsModel.deliverydate = $("#DCDateID" + this.selecteddeliveryVal + this.deliveryVal1).val();
      }


      this.createDeliverySubmissionsModel.balance_qty = this.uniquelineitems[a].BALANCE_QTY;
      this.createDeliverySubmissionsModel.businesspartnertext = this.uniquelineitems[a].BUSINESSPARTNERTEXT;
      this.createDeliverySubmissionsModel.deliveryaddress1 = this.uniquelineitems[a].DELIVERYADDRESS1;
      this.createDeliverySubmissionsModel.department = this.uniquelineitems[a].DEPARTMENT
      this.createDeliverySubmissionsModel.igstamount = ""
      this.createDeliverySubmissionsModel.sgstamount = ""
      this.createDeliverySubmissionsModel.material_type = this.uniquelineitems[a].MATERIAL
      this.createDeliverySubmissionsModel.pincode = this.uniquelineitems[a].PINCODE
      this.createDeliverySubmissionsModel.plant = this.uniquelineitems[a].PLANT
      this.createDeliverySubmissionsModel.rateperqty = this.uniquelineitems[a].RATEPERQTY
      this.createDeliverySubmissionsModel.state = this.uniquelineitems[a].STATE
      this.createDeliverySubmissionsModel.unitofmeasure = this.uniquelineitems[a].UNITOFMEASURE;
      this.createDeliverySubmissionsModel.remark = this.uniquelineitems[a].REMARK;
      this.createDeliverySubmissionsModel.contactpersonemailid = sessionStorage.getItem("Requisitioner");
      this.createDeliverySubmissionsModel.contactpersonphone = this.uniquelineitems[a].CONTACTPERSONPHONE;
      this.createDeliverySubmissionsModel.costcentre = this.uniquelineitems[a].COSTCENTRE;
      this.createDeliverySubmissionsModel.category = this.uniquelineitems[a].CATEGORY;
      this.createDeliverySubmissionsModel.status = 'A';
      if (this.createDeliverySubmissionsModel.ordernumber != "" || this.createDeliverySubmissionsModel.quantity != ""
        || this.createDeliverySubmissionsModel.deliverydate != "")
        this.createDeliveryarray.push(this.createDeliverySubmissionsModel);
      deliveryQty = deliveryQty + Number(this.deliverydetailsModel.DQty);
      console.log("deliveryQty is here " + deliveryQty);
      console.log("this.uniquelineitems[a].BALANCE_QTY is here " + this.uniquelineitems[a].BALANCE_QTY);
      // if(deliveryQty > this.uniquelineitems[a].BALANCE_QTY)
      // {
      //   this.dialogBox.popUpOpen2('Delivery Quantity cannot be greater than Balance Quantity','success','purchaseorderlist');
      //   return
      // }

    }


    this.createDeliveryService.newCreateDelivery(this.createDeliveryarray).subscribe(res => {
      console.log("delivery response", res);
      if (res[0].message == "Fail") {
        this.acceptdelivery();
        $("#popup3").css("visibility", "hidden");
        $("#popup3").css("opacity", "0");
        // this.dialogBox.popUpOpen2(res[0].Uniquemessage, 'error', 'list');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: res[0].Uniquemessage,
          condition: 'error',
          page: 'list'
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


      }
      else if (res[0].message = "Success") {
        // this.dialogBox.popUpOpen3('Delivery created successfully.','success','purchaseorderlist');
        $("#popup4").css("visibility", "visible");
        $("#popup4").css("opacity", "1");
        $("#showText").removeClass('displayNone');
        $("#showText").show();
        // this.poDataList=[]
        // this.getPurChaseOrderList()
        this.loaderservice.hide();
      }
    });
    err => {
      this.loaderservice.hide();
    }
  }

  closePopUp() {
    $("#popup4").css("visibility", "hidden");
    $("#popup4").css("opacity", "0");
  }

  getOrderDEtails(value0, value1, val, event, orderNum, quantity, lineitem, CREATEDON, Rate, ponum) {
    this.lineitemvalue = value1;
    var temp = "deliverydetail" + value0 + value1 + val;
    // this.selectedcheckbox.push(temp);
    this.lineitemorderModel = new LineItemOrderModel()
    // this.selectedLineItem=[];
    this.submitval0 = value0;
    this.submitval = value1;
    this.lineItemNo = lineitem;
    //console.log(this.lineItemNo,'lineitem')
    if (this.selectedcheckbox.length == 0) {
      this.selectedcheckbox.push(temp);
      console.log(this.selectedcheckbox);
    }
    // }
    //console.log(this.lineItemNo,'lineitem')
    if (event.target.checked == true) {
      if (this.lineItemOrderarray.length > 0) {
        if (this.lineItemOrderarray[this.lineItemOrderarray.length - 1].PO_NUMBER != ponum) {
          this.lineItemOrderarray.length = 0;
          this.selectedLineItem.length = 0;
        }
      }
      //console.log(this.lineItemNo,'lineitem')
      if (event.target.checked == true) {
        if (this.lineItemOrderarray.length > 0) {
          if (this.lineItemOrderarray[this.lineItemOrderarray.length - 1].PO_NUMBER != ponum) {
            this.lineItemOrderarray.length = 0;
            this.selectedLineItem.length = 0;
          }
        }
        this.isinvChecked = true;
        // $('#deliverydetail'+ value0 + value1,val ).attr( 'checked', true )
        this.issubmitcheck = true
        $('#isshowDelivery' + value1).prop('disabled', true);
        $('#isshowCreateDelivery' + value1).prop('disabled', true);
        // $("#isshowDelivery" + value1 ).hide();
        // $('#isshowCreateDelivery' + value1).prop('disabled', true);
        // $("#isshowCreateDelivery" + value1 ).hide();

        // $("#isshowDelivery" + val0).off('click')
        this.count++;
        if (this.selectedLineItem.length == 0) {
          this.selectedLineItem.push(lineitem)
          this.orderselectedList.push(orderNum);
          this.lineitemorderModel.PO_NUMBER = ponum
          this.lineitemorderModel.DC = orderNum;
          this.lineitemorderModel.LINEITEMNUMBER = lineitem;
          this.lineitemorderModel.ORDERNUMBER = orderNum;
          this.lineitemorderModel.QUANTITY = quantity;
          this.lineitemorderModel.AMOUNT = quantity * Rate
          // this.lineitemorderModel.DcDate = moment(new Date(CREATEDON)).format("DD/MM/YYYY");
          this.lineitemorderModel.DcDate = CREATEDON;
          this.lineItemOrderarray.push(this.lineitemorderModel)
        }
        else if (this.selectedLineItem[this.selectedLineItem.length - 1] == lineitem) {

          this.selectedLineItem.push(lineitem)
          this.orderselectedList.push(orderNum);
          this.lineitemorderModel.PO_NUMBER = ponum
          this.lineitemorderModel.DC = orderNum;
          this.lineitemorderModel.LINEITEMNUMBER = lineitem;
          this.lineitemorderModel.ORDERNUMBER = orderNum;
          this.lineitemorderModel.QUANTITY = quantity;
          this.lineitemorderModel.AMOUNT = quantity * Rate
          // this.lineitemorderModel.DcDate = moment(new Date(CREATEDON)).format("DD/MM/YYYY");
          this.lineitemorderModel.DcDate = CREATEDON
          this.lineItemOrderarray.push(this.lineitemorderModel)
        }
        else if (this.selectedLineItem[this.selectedLineItem.length - 1] != lineitem) {
          this.selectedLineItem.push(lineitem)
          this.orderselectedList.push(orderNum);
          this.lineitemorderModel.PO_NUMBER = ponum
          this.lineitemorderModel.DC = orderNum;
          this.lineitemorderModel.LINEITEMNUMBER = lineitem;
          this.lineitemorderModel.ORDERNUMBER = orderNum;
          this.lineitemorderModel.QUANTITY = quantity;
          this.lineitemorderModel.AMOUNT = quantity * Rate
          // this.lineitemorderModel.DcDate = moment(new Date(CREATEDON)).format("DD/MM/YYYY");
          this.lineitemorderModel.DcDate = CREATEDON
          this.lineItemOrderarray.push(this.lineitemorderModel)

        }
        //   this.selectedLineItem.push(lineitem)
        //  this.lineitemorderModel.LINEITEMNUMBER=lineitem
        //  this.lineitemorderModel.ORDERNUMBER=orderNum;
        //  this.lineItemOrderarray.push(this.lineitemorderModel)
        //  console.log(this.lineItemOrderarray,'lineItemOrderarray')
      }
      else {
        // $("#isshowDelivery" + value1 ).show();
        // $("#isshowCreateDelivery" + value1 ).show();
        this.count--;
        this.selectedcheckbox.splice(this.selectedcheckbox.indexOf(temp), 1);
        console.log(this.selectedcheckbox);
        if (this.selectedcheckbox.length == 0) {
          this.issubmitcheck = false;
        }
        if (this.count < 0) {
          const index = this.selectedLineItem.indexOf(lineitem);
          if (index > -1) {
            this.selectedLineItem.splice(index, 1);
          }
        }
        const index1 = this.orderselectedList.indexOf(orderNum);
        if (index1 > -1) {
          this.orderselectedList.splice(index1, 1);
        }
        for (var j = 0; j < this.lineItemOrderarray.length; j++) {
          if (this.lineItemOrderarray[j].ORDERNUMBER == orderNum) {
            this.lineItemOrderarray.splice(j, 1);
          }
        }

      }
      this.getduplicates(this.selectedLineItem, lineitem);

    }
    this.checkboxisselected = false;
    for (var i = 0; i < this.orderlist.length; i++) {
      if ($('#deliverydetail' + value0 + this.lineitemvalue + i).prop('checked') == true) {
        this.checkboxisselected = true
      }
    }
    if (this.checkboxisselected == false) {
      this.showCreateDelivery = true;
    } else {
      this.showCreateDelivery = false;
    }
  }

  // getduplicates(selectedLineItem)
  // {
  //   return selectedLineItem.filter((value,index) => this.selectedLineItem.indexOf(value) != index);

  // }

  getduplicates(selectedLineItem, lineitems) {
    let lines = lineitems;
    let uniqueChars = [];
    for (var i = 0; i < selectedLineItem.length; i++) {
      this.selectedLineItem.forEach((lines) => {
        if (!uniqueChars.includes(lines)) {
          uniqueChars.push(lines);
        }
      });
    }
    this.selectedLineItem = uniqueChars;
    console.log(this.selectedLineItem, ' this.selectedLineItem')
  }

  // CreateSubmission()
  // {
  //   this.invoicesubmissionarray=[];
  //   console.log(this.orderlist.length,".orderlist.length")
  //   // for(var b=0; b< this.orderlist.length;b++)
  //   // {
  //   //   $('#deliverydetail').prop('checked')
  //   //   if($('#deliverydetail'+b).prop('checked') == true)
  //   //   {
  //   //     console.log("true")
  //   //   }
  //   // }
  //   for(var c=0; c< this.orderlist.length;c++){
  //     for (var a = 0; a < this.uniquedeliveryitems.length; a++) {
  //       this.createSubmissionsModel = new createDeliveryInvoiceSubmissionsModel()
  //       this.createSubmissionsModel.bid = sessionStorage.getItem("Bid");
  //       this.createSubmissionsModel.po_num = this.uniquedeliveryitems[a].PO_NUMBER
  //       this.createSubmissionsModel.lineItemNumber = this.uniquedeliveryitems[a].LINEITEMNUMBER;
  //       if($('#deliverydetail'+ this.submitval+ c).prop('checked') == true)
  //       {
  //         this.createSubmissionsModel.orderNumber=this.orderlist[c].DC;
  //         this.createSubmissionsModel.quantity =this.orderlist[c].QUANTITY;
  //         this.createSubmissionsModel.invoiceDate= moment(new Date(this.orderlist[c].DISPATCHDATE)).format("DD/MM/YYYY");
  //       }
  //       //this.createSubmissionsModel.orderNumber = this.uniquedeliveryitems[a].ORDERNUMBER;

  //       this.createSubmissionsModel.uOM = this.uniquedeliveryitems[a].UNITOFMEASURE;
  //       this.createSubmissionsModel.contactPerson = sessionStorage.getItem("Requisitioner");
  //       this.createSubmissionsModel.contactPersonPhone = this.uniquedeliveryitems[a].CONTACTPERSONPHONE;
  //      //this.createSubmissionsModel.vendorID = this.vendorid
  //       this.createSubmissionsModel.company = this.uniquedeliveryitems[a].COMPANY
  //       this.createSubmissionsModel.plant = this.uniquedeliveryitems[a].PLANT
  //       this.createSubmissionsModel.department = this.uniquedeliveryitems[a].DEPARTMENT
  //       this.createSubmissionsModel.costCentre = this.uniquedeliveryitems[a].COSTCENTRE
  //       this.createSubmissionsModel.category = this.uniquedeliveryitems[a].CATEGORY
  //       this.createSubmissionsModel.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext")
  //       this.createSubmissionsModel.profileID = ""
  //       this.createSubmissionsModel.vendorID = ""
  //       this.createSubmissionsModel.invoiceDocumentPath = ""
  //       this.createSubmissionsModel.iGSTAmount = ""
  //       this.createSubmissionsModel.cGSTAmount = ""
  //       this.createSubmissionsModel.sgstAmount = ""
  //       // this.createSubmissionsModel.totalAmount = itemAmount;
  //       // this.createSubmissionsModel.totalAmount = this.invoiceForm.controls['TotalItemAmount'].value;
  //       // this.createSubmissionsModel.description = this.invoiceForm.controls['description'].value;
  //       this.createSubmissionsModel.status = "P"
  //       // this.createSubmissionsModel.invoiceamount = itemAmount;
  //       // this.createSubmissionsModel.actualfilename = this.actualfilename;
  //       // this.createSubmissionsModel.savedfilename = this.savedfilename;
  //       this.createSubmissionsModel.createdby = sessionStorage.getItem("loginUser");
  //       this.createSubmissionsModel.managerid = sessionStorage.getItem("Requisitioner");
  //       this.createSubmissionsModel.buyerid = sessionStorage.getItem("Buyer");
  //       this.createSubmissionsModel.invoiceNumber=this.createSubmissionsModel.orderNumber;
  //       this.createSubmissionsModel.irnDate=  this.createSubmissionsModel.invoiceDate;
  //       this.createSubmissionsModel.status='P';
  //       //this.createSubmissionsModel.balance_qty = Number(this.uniquelineitems[a].BALANCE_QTY) - Number(quantity)
  //       // this.createSubmissionsModel.orderNumber=$("#DcId" + this.deliveryVal + this.deliveryVal1).val();
  //       // this.createSubmissionsModel.quantity=$("#DeliveryQtyId" + this.deliveryVal  + this.deliveryVal1).val();
  //       // this.createSubmissionsModel.irnDate=$("#DCDateID" + this.deliveryVal  + this.deliveryVal1).val();
  //       if(this.createSubmissionsModel.orderNumber!=undefined)
  //       this.invoicesubmissionarray.push(this.createSubmissionsModel);
  //       break;
  //     }
  //   }


  //   this.purchaseOrderListService.sendEmaildemo(this.invoicesubmissionarray).subscribe(res => {
  //     console.log("delivery response", res);
  //     if(res[0].message="Success")
  //     {
  //       this.dialogBox.popUpOpen2('Invoice Submitted successfully.','success','purchaseorderlist');
  //       this.poDataList=[]
  //       this.getPurChaseOrderList()
  //     }

  //   });
  // }

  getorderitems(lineitemnumber, ponumber) {
    this.orderlistoflineitemmp = [];
    this.orderlist = [];
    this.orderlistwithinvoice = [];
    this.purchaseOrderListService.getorderitems(lineitemnumber, ponumber).subscribe(res => {
      console.log("delivery response", res);
      if (res[0].message = "Success" && res[0].orderitems.length > 0) {
        this.orderlistoflineitemmp = res[0].orderitems;

        for (var a = 0; a < this.orderlistoflineitemmp.length; a++) {
          if (this.orderlistoflineitemmp[a].INVOICENUMBER == null) {
            this.orderlist.push(this.orderlistoflineitemmp[a]);
          }
          else {
            this.orderlistwithinvoice.push(this.orderlistoflineitemmp[a]);
          }
        }
      }

    });
  }

  // navigatetoURL()
  // {
  //   this.router.navigate(["invoicesubmission"], { queryParams: { o: btoa(clickthrough), PN: btoa(PO_NUMBER), vd: btoa(vendorid), cpe: btoa(contactpersonemail), dt: btoa(date) } });
  // }

  navigatetoURL() {
    sessionStorage.removeItem("invwopodetails");
    if (this.invoicenumber != undefined) {
      this.purchaseOrderListService.getwopodetails(this.invoicenumber).subscribe(res => {
        console.log("res is here ", res);
        this.wopodata = res[0].data;
        if (res[0].message == "Success") {
          console.log("res[0].data ==>", this.wopodata);
          sessionStorage.removeItem("invwopodetails");
          sessionStorage.setItem("invwopodetails", JSON.stringify(this.wopodata));
        }
        this.router.navigate(["invoicesubmission"]);
      });

    } else {
      this.router.navigate(["invoicesubmission"]);
    }
    // this.router.navigate(["invoicesubmission"]);
  }

  navigatetoURL2(ponumber, podate, vendorid) {
    this.vendorid = vendorid
    this.fullpoponumber = ponumber;
    this.fullpodate = podate;
    sessionStorage.setItem("fullpoDate", this.fullpodate)
    this.lineitemnumberlist = [];
    this.quantitylist = [];
    this.purchaseOrderListService.getPODetails(this.fullpoponumber).subscribe(res => {
      this.poDetail = res[0].poData;

      console.log("ponumber ==>" + ponumber);
      console.log("podate ==>" + podate);
      for (var b = 0; b < this.poDetail.length; b++) {
        console.log(this.poDetail[b].BALANCE_QTY);
        console.log(parseFloat(this.poDetail[b].BALANCE_QTY));
        if (parseFloat(this.poDetail[b].BALANCE_QTY) > 0.0) {
          this.lineitemnumberlist.push(this.poDetail[b].LINEITEMNUMBER);
          this.quantitylist.push(this.poDetail[b].BALANCE_QTY);
        }
        console.log("==================Angaj==============>", this.lineitemnumberlist);

      }
      this.submitwholePOTest()
      // $("#popup5").css("visibility", "visible");
      // $("#popup5").css("opacity", "1");
    })





    // PONUMBER, LINEITEMNUMBER,QUANTITY,BID
  }


  submitwholePOTest() {

    console.log("Am I getring ===========>", sessionStorage.getItem("poNumber"));
    if (this.invoicenumber != undefined) {
      this.purchaseOrderListService.getwopodetails(this.invoicenumber).subscribe(res => {
        console.log("res is here ", res);
        this.wopodata = res[0].data;
        if (res[0].message == "Success") {
          console.log("res[0].data ==>", this.wopodata);
          sessionStorage.removeItem("invwopodetails");
          sessionStorage.setItem("invwopodetails", JSON.stringify(this.wopodata));
        }
        this.router.navigate(["invoicesubmission"], {
          queryParams: {
            // type: btoa(type),
            vd: btoa(this.vendorid)
          }
        });


      });

    }
    else {
      this.router.navigate(["invoicesubmission"], {
        queryParams: {
          vd: btoa(this.vendorid)
        }
      });

    }
    // this.router.navigate(["invoicesubmission"]);

  }

  partInvoice(ponumber, date, vendorid, type) {
    console.log('type ' + type);
    if (type == 'simpo') {
      sessionStorage.removeItem("invwopodetails");
      this.router.navigate(["multipopurchaseorderlist"], {
        queryParams: {
          type: btoa(type),
          vd: btoa(vendorid),
          po: btoa(ponumber)
        }
      })
    }
    else {
      if (this.invoicenumber != undefined) {
        this.purchaseOrderListService.getwopodetails(this.invoicenumber).subscribe(res => {
          console.log("res is here ", res);

          if (res[0].message == "Success") {
            this.wopodata = res[0].poData;
            console.log("res[0].data ==>", this.wopodata);
            sessionStorage.removeItem("invwopodetails");
            sessionStorage.setItem("invwopodetails", JSON.stringify(this.wopodata));
          }
          this.router.navigate(["invoicesubmission"]
            , {
              queryParams: {
                type: btoa(type),
                vd: btoa(vendorid)
              }
            })
        });

      }
      else {
        sessionStorage.removeItem("invwopodetails");
        this.router.navigate(["invoicesubmission"]
          , {
            queryParams: {
              type: btoa(type),
              vd: btoa(vendorid)
            }
          })

      }
    }
  }


  submitwholePO() {
    this.lineItemOrderarray = [];
    this.poorders = [];
    this.orderarray = [];
    this.temppodetails = [];

    this.purchaseOrderListService.createcustomdeliveryitems(this.fullpoponumber, this.fullpodate, this.lineitemnumberlist, this.quantitylist).subscribe(res => {

      if (res[0].message == "Success") {

        this.purchaseOrderListService.getorderforfullpo(this.fullpoponumber).subscribe(res2 => {
          if (res2[0].message == "Success") {
            this.poorders = res2[0].orderitems;
            console.log("this.poorders" + this.poorders.length);

            for (let c = 0; c < this.poorders.length; c++) {
              this.orderdetailsModel = new orderdetailsModel();
              this.orderdetailsModel.DC = this.poorders[c].DC;
              this.orderdetailsModel.DQty = this.poorders[c].QUANTITY;
              this.orderdetailsModel.DcDate = this.poorders[c].DISPATCHDATE
              this.orderdetailsModel.AMOUNT = "";

              this.orderdetailsModel.LINEITEMNUMBER = this.poorders[c].LINEITEMNUMBER;
              this.orderdetailsModel.QUANTITY = this.poorders[c].QUANTITY
              this.orderdetailsModel.ORDERNUMBER = this.poorders[c].DC;


              this.lineitemorderModel = new LineItemOrderModel()
              this.lineitemorderModel.PO_NUMBER = this.poorders[c].PONUMBER;
              this.lineitemorderModel.DC = this.poorders[c].DC;
              this.lineitemorderModel.LINEITEMNUMBER = this.poorders[c].LINEITEMNUMBER;
              this.lineitemorderModel.ORDERNUMBER = this.poorders[c].DC;
              this.lineitemorderModel.QUANTITY = this.poorders[c].QUANTITY;
              this.orderarray.push(this.orderdetailsModel);
              for (let x = 0; x < this.poDetail.length; x++) {
                console.log("this.poDetail[x].LINEITEMNUMBER" + this.poDetail[x].LINEITEMNUMBER);
                console.log("this.poorders[c].LINEITEMNUMBER " + this.poorders[c].LINEITEMNUMBER);
                if (this.poDetail[x].LINEITEMNUMBER == this.poorders[c].LINEITEMNUMBER) {
                  this.temppodetails.push(this.poDetail[x]);
                  console.log("in here" + this.poorders[c].QUANTITY);
                  console.log("in here" + this.poDetail[x].RATEPERQTY.replace(/,/g, ''));
                  var a = this.poorders[c].QUANTITY;
                  var b = this.poDetail[x].RATEPERQTY.replace(/,/g, '');
                  this.temp = parseFloat(this.poorders[c].QUANTITY) * parseFloat(this.poDetail[x].RATEperqty);
                  console.log("temp is here " + this.temp);

                }
                this.lineitemorderModel.DcDate = this.poorders[c].DISPATCHDATE;
              }
              var total = a * b;
              this.lineitemorderModel.AMOUNT = total;
              console.log("this.lineitemorderModel.AMOUNT ==> " + this.lineitemorderModel.AMOUNT);
              this.lineItemOrderarray.push(this.lineitemorderModel);
            }
            console.log("this.lineItemOrderarray " + this.lineItemOrderarray.length);

            this.selectedorderlineitemdetails = this.temppodetails;
            sessionStorage.removeItem("invsubmissionDetails");
            sessionStorage.removeItem("invwopodetails");
            sessionStorage.setItem("invsubmissionDetails", JSON.stringify(this.selectedorderlineitemdetails));
            sessionStorage.removeItem("invallDetails");
            sessionStorage.setItem("invallDetails", JSON.stringify(this.lineItemOrderarray));
            sessionStorage.removeItem("invsubmissionorderDetails");
            sessionStorage.setItem("invsubmissionorderDetails", JSON.stringify(this.orderarray));
            console.log("this.invoicenumber " + this.invoicenumber);
            // if(this.lineitemorderModel.AMOUNT != NaN)
            // {
            // setTimeout(() => {
            if (this.invoicenumber != undefined) {
              this.purchaseOrderListService.getwopodetails(this.invoicenumber).subscribe(res => {
                console.log("res is here ", res);
                this.wopodata = res[0].data;
                if (res[0].message == "Success") {
                  console.log("res[0].data ==>", this.wopodata);
                  sessionStorage.removeItem("invwopodetails");
                  sessionStorage.setItem("invwopodetails", JSON.stringify(this.wopodata));
                }
                this.router.navigate(["invoicesubmission"]);
              });

            }
            else {
              this.router.navigate(["invoicesubmission"]);

            }
            // }, 1000);
            // }


            // sessionStorage.setItem("invsubmissionorderDetails", JSON.stringify(this.orderarray));

          }

        });
      }
      else {
        // this.dialogBox.popUpOpen2('Error while creating delievery.' + res[0].message, 'error', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Error while creating delievery.' + res[0].message,
          condition: 'error',
          page: 'invoicesubmit'
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
    });
    $("#popup5").css("visibility", "hidden");
    $("#popup5").css("opacity", "0");
  }

  closeSubmission() {
    $("#popup3").css("visibility", "hidden");
    $("#popup3").css("opacity", "0");
    this.poDataList = []
    sessionStorage.removeItem("invsubmissionDetails");
    sessionStorage.removeItem("invsubmissionorderDetails");
    sessionStorage.removeItem("invallDetails");
    this.getPurChaseOrderList();
    this.showCreateDelivery = true;
    this.showSubmitInvoice = true;
  }

  numberOnly(event, i, j): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    // adding decimal dated 19-01-2022
    //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //     console.log("working")
    //     return false;
    //   }
    //   else if(charCode == 46){
    //   console.log(" No working")
    //   // this.balanceQuantity()
    //   return true;
    // }
    // else{
    //   return true;
    // }

    console.log($('#DeliveryQtyId' + i + j).val());

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#DeliveryQtyId' + i + j).val().split('.').length === 2))) {

      console.log("working")

      // this.dotpresent=false;

      return false;

    }
    if (this.hasDecimalPlace(event.target.value, 3)) {
      return false
    }

    console.log(" No working")

    // this.balanceQuantity()

    // this.dotpresent=false;

    return true;
  }

  hasDecimalPlace(value, x) {
    var pointIndex = value.indexOf('.');
    return pointIndex >= 0 && pointIndex < value.length - x;
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
  clearDate(event, i, j) {
    event.stopPropagation();
    // this.dateDisplay + i + j = null;
    $("#DCDateID" + i + j).val(null);
    $("#dateCalendar" + i + j).val(null);
    $("#dateCalendartog" + i + j).val(null);
  }


  showmodal(ponumber) {
    console.log(ponumber);

    this.dialogBox.popUpOpen2('Coming Soon', 'success', 'purchaseorderlist');
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

