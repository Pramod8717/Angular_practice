import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from './../../../../services/LoaderService/loader.service';
import { element } from 'protractor';
import { PurchaseOrderListService } from '../../../../services/purchaseOrderList/purchaseorderlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { purchaseOrderListModel } from '../../../../models/purchaseorderlist.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { blobURL } from 'assets/configdata/baseURL';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import * as moment from 'moment/moment';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { InternalportalserviceService } from 'app/services/internalportal/internalportalservice.service';
import { AuthService } from 'app/services/auth/auth.service';
import { LoginService } from 'app/services/login/login.service';
// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';
declare var $: any;


@Component({
  selector: 'app-internalportal-track-po',
  templateUrl: './internalportal-track-po.component.html',
  styleUrls: ['./internalportal-track-po.component.css']
})
export class InternalportalTrackPOComponent implements OnInit {

  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  Openpdf = "./"

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
  mPageNo: number = 1;
  pageSize = 50;
  message: string;

  public POOrderList = new FormGroup({
    PONumber: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    Plant: new FormControl('', Validators.required),
    Vendor: new FormControl('', Validators.required)
  })

  purchaseOrderListModel = new purchaseOrderListModel();
  searchList: any = [];
  confirmationNoAction: boolean = false;
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
  fromdateofduration: any ="NA";
  todateofduration: any = "NA";
  fromdateofpo: string = "NA";
  todateofpo: string = "NA";
  ponum: any ="NA";
  popaginationnumber = 1;
  maxdate: any;
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
  emailid: string;
  forinternal: any;
  username: any;
  uniqueBid: any;
  orderlistoflineitemmp: any[];
  orderlistwithinvoice: any[];
  isenduser: boolean;
  isbuyer: boolean;
  innerbuyerportal: boolean;
  vendorPortal: boolean;
  ispayee: boolean;
  internalbcclportal: boolean = false;
  endpagenumber: number = 1;
  disablenext: boolean =true;
  currstatus: string;
  disableprevious: boolean = true;
  plant: string = 'NA';
  vendor: string = 'NA';
  tempPlantList: any = [];
  plantpresent: boolean = false;
  vendorList: any = [];
  vendorpresent: boolean = false;
  PlantList: any = [];
  poCountAsPerStatus:any = [];
  extensionType: any;

  

  get fromDate() { return this.POOrderList.get('fromDate').value; }
  get toDate() { return this.POOrderList.get('toDate').value; }
  public hasError = (controlName: string, errorName: string) => {
    return this.POOrderList.controls[controlName].hasError(errorName);
  }

  constructor(private route: ActivatedRoute, private purchaseOrderListService: PurchaseOrderListService, private loginService: LoginService,
    private authService: AuthService,
    private toastr: ToastrService, private loaderservice: LoaderService, private router: Router, private trackOrderListService: TrackOrderListService,
    private internalportalserviceService: InternalportalserviceService) { }
  // @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.route.queryParams.subscribe(params => {
      var data  =  atob(params.key)
      var data1 = JSON.parse(data)
            // console.log("Params=======> ", data1.emailId, data1.page); 
      // console.log("Params=======> ",params); // { order: "popular" }
if(data1.emailId !=null && data1.emailId !="" && data1.page=="po")
{
  this.loaderservice.show();
  this.navigatetointernalportal(data1.emailId)
}

      this.message = params.order;
      console.log("message===========>", this.message); // popular
    });


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
    this.getPurChaseOrderList();
    // this.initAccNested('.aNestedTblAccordion', true);



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
    // this.getPurChaseOrderList();
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

  getPurChaseOrderList() {
    $('.inv-wrapper').removeClass('active');
    $('#allPO').addClass('active');
    this.loaderservice.show();
    this.popaginationnumber = 1;
    this.disableprevious = true;
    this.poDataList = [];
    this.allPOlist = [];
    this.acceptedPOList = [];
    this.inProgressPOList = [];
    this.completedPOList = [];
    this.shippedPOList = [];
    this.newPOList = [];
    this.searchList = [];
    this.getmessageStatus();

    // this.purchaseOrderListService.getPO().subscribe(res => {
    //   if (!res[0].message) {
    this.emailid = sessionStorage.getItem("username");
    // this.mode = sessionStorage.getItem('mode')
    this.popaginationnumber = 1;
    this.currstatus = "ALL";
    this.internalportalserviceService.getInternalPoData(this.emailid,'ALL',
    this.popaginationnumber,this.ponum, this.fromdateofduration,this.todateofduration,
    this.fromdateofpo,this.todateofpo,this.plant,this.vendor ).subscribe(res => {
      this.poCountAsPerStatus = res[0].poCountAsPerStatus;
      if(res[0].message == "Success")
      {
        
      this.poDataList = res[0].poData;
      // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
      for (let i = 0; i < this.poDataList.length; i++) {
        this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
      }
      console.log("Data PO POLIST API", this.poDataList);
      console.log("data from read status API", this.statusList);

      // this.poDataList = [];
      this.filterpodatalist = res[0].poData;
      
      this.totalItems = res[0].popages;
      this.endpagenumber = Math.ceil((Number(res[0].popages)/this.pageSize))
      if(Number(res[0].popages)/this.popaginationnumber <= this.pageSize)
      {
        this.disablenext = true;
      }
      else
      {
        this.disablenext = false;
      } 
      }
      
    
      this.loaderservice.hide();
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
        // this.loaderservice.hide();
      }, 500);
      //   }
      // }, err => {
      //   this.loaderservice.hide();
      // })
    })
  }

  getPurOrderList(action) {
    // this.loaderservice.show();
    // this.popaginationnumber = event;
    if(action == 'PREV')
    {
      if(this.popaginationnumber !=1)
      {
        this.popaginationnumber = this.popaginationnumber -1;
        if(this.popaginationnumber == 1)
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
      this.popaginationnumber = this.popaginationnumber +1;
      this.disableprevious = false;
      
    }
    else if(action == 'HOME')
    {
      this.popaginationnumber = 1;
      this.disableprevious = true;

    }
    else if(action == 'END')
    {

    this.popaginationnumber = this.endpagenumber;
    if(this.popaginationnumber == 1)
    {
      this.disableprevious = true;
    }
    else
    {
      this.disableprevious = false;
    }
    }
    // $('.inv-wrapper').removeClass('active');
    // $('#allPO').addClass('active');
    // debugger;
    // this.deliverycreated = false;
    this.loaderservice.show();
    // this.showSubmitInvoice = true;
    // this.showCreateDelivery = true;
    this.poDataList = [];
    this.allPOlist = [];
    this.acceptedPOList = [];
    this.inProgressPOList = [];
    this.completedPOList = [];
    this.shippedPOList = [];
    this.searchList = [];
    this.newPOList = [];
    // this.servicePOList = [];
    this.getmessageStatus();
      
    this.internalportalserviceService.getInternalPoData(this.emailid,this.currstatus,this.popaginationnumber,
      this.ponum, this.fromdateofduration,this.todateofduration,this.fromdateofpo,this.todateofpo,this.plant,this.vendor ).subscribe(res => {

      console.log("response====>", res);
      this.poCountAsPerStatus = res[0].poCountAsPerStatus;
     if(res[0].message == "Success")
     {
      this.poDataList = res[0].poData;
      // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
      for (let i = 0; i < this.poDataList.length; i++) {
        this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
      }
      console.log("Data PO POLIST API", this.poDataList);
      console.log("data from read status API", this.statusList);

      // this.poDataList = [];
      this.filterpodatalist = res[0].poData;
     
      this.totalItems = res[0].popages;
      this.endpagenumber = Math.ceil((Number(res[0].popages)/this.pageSize))
      if(Number(res[0].popages)/this.popaginationnumber <= this.pageSize)
      {
        this.disablenext = true;
      }
      else
      {
        this.disablenext = false;
      } 
     }



    
      // this.loaderservice.hide();
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
        // this.loaderservice.hide();
      }, 500);
      //   }
      // }, err => {
      //   this.loaderservice.hide();
      // })
    })
   
    
  }

  // getPurOrderList(event) {
  //   // this.loaderservice.show();

  //   // setTimeout(() => {
  //   //   let pageNo = this.pageSize;
  //   //   let Mpage = event * this.pageSize - 1;
  //   //   this.pgNolist = [];
  //   //   if (event > 1) {
  //   //     for (var m = pageNo; m <= Mpage; m++) {
  //   //       this.pgNolist.push(this.poDataList[m]);
  //   //     }
  //   //     console.log("this.pgNolist" + this.pgNolist);
  //   //     for (var k = 0; k < this.pgNolist.length; k++) {
  //   //       for (var j = 0; j < this.statusList.length; j++) {
  //   //         if (this.statusList.length != 0) {
  //   //           if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['PONUMBER'] == this.pgNolist[k]['PO_NUMBER']) {

  //   //             $("#green" + k).addClass('displayBlock');
  //   //             $("#white" + k).addClass('displayNone');
  //   //           }
  //   //           else {
  //   //             //$("#green" + k).addClass('displayNone');
  //   //             $("#white" + k).addClass('displayBlock');
  //   //           }
  //   //         }
  //   //         else {
  //   //           $("#white" + k).addClass('displayBlock');
  //   //         }
  //   //       }
  //   //       this.loaderservice.hide();
  //   //     }
  //   //   }
  //   //   else if (event == 1) {
  //   //     // this.getPurChaseOrderList();
  //   //     this.loaderservice.hide();
  //   //   }
  //   // }, 500);err => {
  //   //   this.loaderservice.hide();
  //   // }

  //   setTimeout(() => {
  //     // console.log("Slice", slice);
  //     let slice = (this.mPageNo - 1) * this.pageSize // (this.mPageNo-1) * this.pageSize + this.pageSize

  //     console.log("slice", slice);

  //     this.pgNolist = [];

  //     // this.getmessageStatus();


  //     // this.getInvoiceData();
  //     // this.getmessageStatus();
  //     let pageNo = (event - 1) * this.pageSize;
  //     console.log("pageNO", pageNo);

  //     let Mpage = event * this.pageSize - 1;
  //     console.log("Mpage", Mpage);

  //     this.pgNolist = [];
  //     if (event > 1) {
  //       for (var m = pageNo; m <= Mpage; m++) {
  //         this.pgNolist.push(this.poDataList[m]);
  //       }
  //       console.log("this.invoiceData for pagination", this.pgNolist);
  //       for (var k = 0; k < this.pgNolist.length; k++) {

  //         console.log("what is happening ??", this.pgNolist[k]['PO_NUMBER']);

  //         for (var j = 0; j < this.statusList.length; j++) {
  //           if (this.statusList.length != 0) {
  //             if (this.pgNolist[k]['PO_NUMBER'] == this.statusList[j]['PONUMBER'] && this.statusList[j]['STATUS'] == "A") {
  //               console.log("inside green", this.pgNolist[k]['PO_NUMBER']);


  //               $("#green" + k).addClass('displayBlock');
  //               $("#white" + k).addClass('displayNone');
  //             }
  //             else
  //             //  if(this.pgNolist[k]['INVOICENUMBER']!=this.statusList[j]['TOPIC'] && this.statusList[j]['READ_STATUS'] !="A" )
  //             {
  //               // console.log("inside grey",this.pgNolist[k]['INVOICENUMBER']);

  //               // $("#green" + k).addClass('displayNone');
  //               $("#white" + k).addClass('displayBlock');
  //             }
  //           }
  //           else {
  //             $("#white" + k).addClass('displayBlock');
  //           }
  //         }
  //         // this.loaderservice.hide();
  //       }
  //     }
  //     else if (event == 1) {
  //       // if (this.urlparamsvalues == true) {
  //       //   console.log("in if ");
  //       //   this.trackPayment(this.invoiceList.controls.POrealNumber.value,
  //       //     this.invoiceList.controls.POlineitemNumber.value, this.invoiceList.controls.POOrderNumber.value);
  //       // }
  //       // else {
  //       //   console.log("in else ");
  //       this.getPurChaseOrderList();
  //       // }
  //       // this.loaderservice.hide();
  //     }
  //   }, 100);
  // }


  // sortData(status: string) {
  //   if (status == 'A') {
  //     this.poDataList = this.acceptedPOList;
  //     this.totalItems = this.poDataList.length;
  //   }
  //   else if (status == 'N') {
  //     this.poDataList = this.newPOList;
  //     this.totalItems = this.poDataList.length;
  //   }
  //   else if (status == 'S') {
  //     this.poDataList = this.shippedPOList;
  //     this.totalItems = this.poDataList.length;
  //   }
  //   else if (status == 'C') {
  //     this.poDataList = this.completedPOList;
  //     this.totalItems = this.poDataList.length;
  //   }
  //   else if (status == 'P') {
  //     this.poDataList = this.inProgressPOList;
  //     this.totalItems = this.poDataList.length;
  //   }
  //   else if (status == "ALL") {
  //     this.poDataList = this.allPOlist;
  //     this.totalItems = this.poDataList.length;
  //   }
  //   setTimeout(() => {
  //     for (var k = 0; k < this.poDataList.length; k++) {
  //       for (var j = 0; j < this.statusList.length; j++) {
  //         if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['PONUMBER'] == this.poDataList[k]['PO_NUMBER']) {

  //           $("#green" + k).addClass('displayBlock');
  //           $("#white" + k).addClass('displayNone');
  //         }
  //         else {
  //           //$("#green" + k).addClass('displayNone');
  //           $("#white" + k).addClass('displayBlock');
  //         }
  //       }
  //     }
  //   }, 500);

  // }

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
  //     }, 50);
  //   });
  //   // console.log("ponumber",this.POOrderList.controls.PONumber.value),
  //   // console.log("status",this.POOrderList.controls.Status.value),
  //   // console.log("Fromdate",this.POOrderList.controls.fromDate.value),
  //   // console.log("todate",this.POOrderList.controls.toDate.value)

  // }

  sortData(status: string) {
    this.loaderservice.show();
        this.currstatus = status;
        this.poDataList = [];
        this.popaginationnumber = 1;
        // this.POOrderList.controls['duration'].value);
        // console.log("this.POOrderList.controls['fromDate'].value ==>" + this.POOrderList.controls['fromDate'].value);
        // console.log("this.POOrderList.controls['toDate'].value ==>" + this.POOrderList.controls['toDate'].value);
        this.POOrderList.controls.duration.setValue("ALL");
        this.POOrderList.controls.PONumber.setValue(null);
        this.POOrderList.controls.fromDate.setValue(null);
        this.POOrderList.controls.toDate.setValue(null);
        this.ponum="NA";
        this.fromdateofduration = "NA";
        this.todateofduration = "NA";
        this.fromdateofpo = "NA";
        this.todateofpo = "NA";
        this.plant = 'NA'
        this.vendor = 'NA';
        this.internalportalserviceService.getInternalPoData(this.emailid,this.currstatus,
        this.popaginationnumber,this.ponum, this.fromdateofduration,this.todateofduration,
        this.fromdateofpo,this.todateofpo,this.plant,this.vendor ).subscribe(res => {
        // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
        if(res[0].message == "Success")
        {

          this.poDataList = res[0].poData;
          // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
          for (let i = 0; i < this.poDataList.length; i++) {
            this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          }
          console.log("Data PO POLIST API", this.poDataList);
          console.log("data from read status API", this.statusList);
    
          // this.poDataList = [];
          this.filterpodatalist = res[0].poData;
         
          this.totalItems = res[0].popages;
          this.endpagenumber = Math.ceil((Number(res[0].popages)/this.pageSize))
          if(Number(res[0].popages)/this.popaginationnumber <= this.pageSize)
          {
            this.disablenext = true;
          }
          else
          {
            this.disablenext = false;
          } 
        }
       
          this.loaderservice.hide();
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
          }, 500);
          //   }
          // }, err => {
          //   this.loaderservice.hide();
          // })
        })
    
       
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

  searchData() {
  this.currstatus = "AS";
    this.popaginationnumber = 1
    this.disableprevious = true;
    console.log("this.POOrderList.controls['PONumber'].value ==>" + this.POOrderList.controls['duration'].value);
    console.log("this.POOrderList.controls['fromDate'].value ==>" + this.POOrderList.controls['fromDate'].value);
    console.log("this.POOrderList.controls['toDate'].value ==>" + this.POOrderList.controls['toDate'].value);
    this.durationpresent = false;
    this.ponumberpresent = false;
    this.fromtodatepresent = false;
    this.filteredponumberData = [];
    this.filtereddurationData = [];
    this.poDataList = [];
    this.filtereddate = [];
    this.durationfromdate = "";
    this.durationtodate = "";
    var today = new Date();
    var today = new Date();
    var lastyear = today.getFullYear() - 1 + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + '00:00:00.0';
    var halfyear = today.getFullYear() + '-' + (today.getMonth() - 5) + '-' + today.getDate() + ' ' + '00:00:00.0';
    if (today.getMonth() - 5 <= 0) {
      var a1 = this.addMonths(new Date(), -6);
      halfyear = a1.getFullYear() + '-' + (a1.getMonth() + 1) + '-' + a1.getDate();

    }
    var quarter = today.getFullYear() + '-' + (today.getMonth() - 2) + '-' + today.getDate() + ' ' + '00:00:00.0';
    if (today.getMonth() - 2 <= 0) {
      var a1 = this.addMonths(new Date(), -3);
      quarter = a1.getFullYear() + '-' + (a1.getMonth() + 1) + '-' + a1.getDate();

    }
    var month = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate() + ' ' + '00:00:00.0';
    var threeMonthsAgo = moment().subtract(3, 'months');
    var oneMonthsAgo = moment().subtract(1, 'months');
    var sixMonthsAgo = moment().subtract(6, 'months');
    var oneyearago = moment().subtract(12, 'months');

    if (today.getMonth() <= 0) {
      var a1 = this.addMonths(new Date(), -1);
      month = a1.getFullYear() + '-' + (a1.getMonth() + 1) + '-' + a1.getDate();
      console.log(month, 'month------------------');
    }
    // this.responseList.length = 0
    console.log("Month", month, "Quarter", quarter, "HalfYear", halfyear, "Lastyear", lastyear, "Tday", today);
    this.fromdateofduration = "";
    this.todateofduration = "";
    if (this.POOrderList.controls['Plant'].value) {
      for(var b =0;b<this.tempPlantList.length;b++)
    {
      console.log("this.tempPlantList[b].PLANTNAME "+this.tempPlantList[b].PLANTNAME);
      if(this.tempPlantList[b].PLANTNAME == this.POOrderList.controls['Plant'].value.trim())
      {
        this.plant = this.tempPlantList[b].PLANTCODE;
      }
    }
      this.plantpresent = true;
      // this.plant = this.invoiceList.controls['Plant'].value;
    }
    else {
      this.plant = 'NA';
    }
    if (this.POOrderList.controls['Vendor'].value) {
    //   for(var b =0;b<this.vendorList.length;b++)
    // {
    //   console.log("this.tempPlantList[b].PLANTNAME "+this.POOrderList.controls['Vendor'].value);
    //   if(this.vendorList[b].BUSINESSPARTNERTEXT == this.POOrderList.controls['Vendor'].value.trim())
    //   {
    //     this.vendor = this.vendorList[b].VENDORID;
    //   }
    // }
      this.vendorpresent = true;
      this.vendor = this.POOrderList.controls['Vendor'].value.trim();
    }
    else {
      this.vendor = 'NA';
    }
    if (this.POOrderList.controls['PONumber'].value) {
      this.ponumberpresent = true;
       this.ponum = this.POOrderList.controls['PONumber'].value.trim();
    }
    else
    {
    this.ponum = "NA";
    }
    
    if (this.POOrderList.controls['duration'].value == 'ALL') {
      this.maxdate = "";
      this.mindate = "";
      this.mintodate = "";
      this.fromdateofduration = "NA";
      this.todateofduration = "NA";
    }
    else if (this.POOrderList.controls['duration'].value == '3M') {
      this.fromdateofduration = threeMonthsAgo.format("DD/MM/YYYY");
      this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
      this.durationpresent = true;
    }
    else if (this.POOrderList.controls['duration'].value == '6M') {
       this.fromdateofduration = sixMonthsAgo.format("DD/MM/YYYY");
      this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
      this.durationpresent = true;
    }
    else if (this.POOrderList.controls['duration'].value == '1Y') {
       this.fromdateofduration = oneyearago.format("DD/MM/YYYY");
      this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
      this.durationpresent = true;
    }
    else if (this.POOrderList.controls['duration'].value == '1M') {
      this.fromdateofduration = oneMonthsAgo.format("DD/MM/YYYY");
      this.todateofduration =  moment(new Date()).format("DD/MM/YYYY");
      this.durationpresent = true;
    }
    console.log("this.fromdateofduration ==>" + this.fromdateofduration);
    console.log("this.todateofduration ==>" + this.todateofduration);

    if (this.POOrderList.controls['fromDate'].value) {
      this.fromtodatepresent = true;
      this.fromdateofpo = moment(new Date(this.POOrderList.controls['fromDate'].value)).format("DD/MM/YYYY");
      this.todateofpo = moment(new Date(this.POOrderList.controls['toDate'].value)).format("DD/MM/YYYY");
    }
    else
    {
      this.fromdateofpo = "NA";
      this.todateofpo = "NA";
    }

     this.internalportalserviceService.getInternalPoData(this.emailid,this.currstatus,
        this.popaginationnumber,this.ponum, this.fromdateofduration,this.todateofduration,
        this.fromdateofpo,this.todateofpo,this.plant,this.vendor ).subscribe(res => {
          let advanceSearcBox = document.getElementById("advanceSearcBox");
          let closeArrow = document.getElementById("closeArrow");
          let openArrow = document.getElementById("openArrow");
          advanceSearcBox.style.display = "none";
          openArrow.style.display = "block";
          closeArrow.style.display = "none";
          // this.POOrderList.reset();
          this.poCountAsPerStatus = res[0].poCountAsPerStatus;
        if(res[0].message == "Success")
        {
          this.poDataList = res[0].poData;
          // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
          for (let i = 0; i < this.poDataList.length; i++) {
            this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          }
          console.log("Data PO POLIST API", this.poDataList);
          console.log("data from read status API", this.statusList);
    
          // this.poDataList = [];
          this.filterpodatalist = res[0].poData;
         
          this.totalItems = res[0].popages;
          this.endpagenumber = Math.ceil((Number(res[0].popages)/this.pageSize))
          if(Number(res[0].popages)/this.popaginationnumber <= this.pageSize)
          {
            this.disablenext = true;
          }
          else
          {
            this.disablenext = false;
          } 
        }
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
    }, 300);
        });
    
  }


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

  sendMessage(status, message, subject, topic) {
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
    this.internalportalserviceService.sendInternalMessage(this.purchaseOrderListModel.PONumber, status, message, subject, topic).subscribe(res => {
      console.log("what is the response?", res[0].message)

      if (res[0].message == "Success") {
        // this.dialogBox.popUpOpen2('Message submited successfully.','success','purchaseorderlist');
        // this.ngOnInit(); 
        //     $("#popup2").css("visibility", "hidden");
        // $("#popup2").css("opacity", "0");
        // location.reload();
        this.confirmationNoAction = false;
        // this.getPurChaseOrderList();
        // this.getmessageStatus();       //  this.getQuerry(topic,'')
        this.message = '';
        this.validate = true;
        this.messageList = [];
        this.internalportalserviceService.getInternalPOMessages(topic).subscribe(res => {
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
        this.internalportalserviceService.getInternalPOMessages(topic).subscribe(res => {
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
    this.internalportalserviceService.getInternalLineItems(POnumber).subscribe(res => {
      // console.log("PODetails",res[0].poData[0] )
      // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      this.poDetail = res[0].poData
      console.log("sorted list", this.poDetail)
      this.merged_obj = {
        ...res[0].poData[0],
        ...obj1
      }
      // console.log("orginal Data",this.poDetail)
      // console.log("merged Data", this.merged_obj)
      sessionStorage.setItem("PODetails", JSON.stringify(this.merged_obj))
      // sessionStorage.setItem("PODetails", this.poDetail);

      // this.router.navigateByUrl("/poOrderView", { state:merged_obj})
      this.router.navigate(['/internalViewPO'], {
        queryParams: {
          POnumber: btoa(POnumber), Date: btoa(Date), Amount: btoa(Amount),
          Query: btoa(Query), Status: btoa(Status)
        }
      })
    })
  }

  getPOitems(POnumber, BUYER, REQUSITIONER) {
    this.uniquelineitems = [];
    this.uniquelineitem = [];
    console.log("Hey I am here", BUYER)
    sessionStorage.setItem("poNumber", POnumber);
    sessionStorage.setItem("Buyer", BUYER)
    sessionStorage.setItem("Requisitioner", REQUSITIONER)
    console.log("in here");
    this.internalportalserviceService.getInternalLineItems(POnumber).subscribe(res => {
      this.poDetail = res[0].poData
      // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      for (var j = 0; j < this.poDetail.length; j++) {
        if (this.poDetail[j].ORDERNUMBER == null) {
          this.uniquelineitems.push(this.poDetail[j]);
        }
      }
      console.log("this.uniquelineitems======>>>", JSON.stringify(this.uniquelineitems));
      // this.uniquelineitems = this.uniquelineitem.sort((a, b) => a.LINEITEMNUMBER - b.LINEITEMNUMBER);
      this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
        if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
          return 1;
        }

        if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
          return -1;
        }

        return 0;
      });
      console.log("this.poDetail isisis ==>" + JSON.stringify(this.uniquelineitems))
      sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
      // console.log("Number(a.LINEITEMNUMBER)"+Number(a.LINEITEMNUMBER));
      // this.uniquelineitems = this.uniquelineitem.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      // let lengthofArray = (res[0].poData).length-1

      // console.log("PODATA", lengthofArray)
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

      // this.poDetail = removeDuplicates(res[0].poData, 'LINEITEMNUMBER')
      // for(let i =0 ; i<=lengthofArray; i++){
      //   for(let j=i+1 ; j<=lengthofArray ; j++){
      //     console.log("PO DATA", res[0].poData[i], res[0].poData[j])
      //     // if(res[0].poData[i] == res[0].poData[j] ){
      //     //   console.log("PO DATA", res[0].poData[i], res[0].poData[j])
      //     // }

      //   }
      // }
      // var mySet = new Set(this.poDetail);

      // var Data=Array.from(new Set(res[0].poData.map((itemInArray) => itemInArray.LINEITEMNUMBER)))
      // console.log("ArrayList", Data)
      // mySet.forEach(v => this.poDetail1.push(v));
      // this.poDetail = [];
      this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      // // this.poDetail = res[0].poData
      // console.log("PODEtails", this.poDetail)

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
  openAccordioninnerTab(event, i, j) {
    console.log("event ==>" + event.target.value);
    $(".customtbl-accordion-head-inner .plusminusArrow").removeClass("fa-minus");
    $(".customtbl-accordion-head-inner .plusminusArrow").addClass("fa-plus");
    console.log($("#lineitem" + i + j));

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
  }


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
  //   }, 50);

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

  openAccordionNestedTab(event, lineitemnumber, ponumber) {
    // this.loaderservice.show();
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
        // this.loaderservice.hide();
        return 1;
      }

      if (d.ORDERNUMBER < e.ORDERNUMBER) {
        // this.loaderservice.hide();
        return -1;
      }
      // this.loaderservice.hide();
      return 0;
    });
    console.log("this.orderlist" + JSON.stringify(this.orderlist), 'orderlist**********************');
    if (!event.target.parentElement.classList.contains('active')) {
      $(".atbl-container.active").removeClass("active");
      event.target.parentElement.classList.add("active");
    } else {
      event.target.parentElement.classList.remove("active");
    }
    // this.loaderservice.hide();
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
    this.internalportalserviceService.getInternalPOMessages(poNumber).subscribe(res => {
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
    this.router.navigate(['./internalinvoicelist'], {
      queryParams: {
        t: btoa(type), p: btoa(actualpo),
        l: btoa(actualline), o: btoa(actualorder)
      }
    });
  }

  downloadlist() {
    this.loaderservice.show();
    this.downloaddatalist = [];
    console.log("this.poDataList to be downloaded ==>" + this.poDataList);
    for (var i = 0; i < this.poDataList.length; i++) {
      console.log("this.poDataList[i][31]" + this.poDataList[i]['PO_NUMBER']);
      this.downloaddatalist.push(this.poDataList[i]['PO_NUMBER']);
    }
    this.purchaseOrderListService.getinternalpolistfile(this.emailid,this.currstatus,
      this.popaginationnumber,this.ponum, this.fromdateofduration,this.todateofduration,
      this.fromdateofpo,this.todateofpo,this.plant,this.vendor).subscribe(res => {
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
            var extensionName=filename.substr(filename.lastIndexOf('.') + 1)
            this.getFileType(extensionName);
            this.trackOrderListService.downloadEncryptedFile(data,this.extensionType);


          }
          this.loaderservice.hide();

        }
        else if (result[0].reason != 'none') {
          this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
        }
        // if (result[0].status == "Fail") {
        //   this.dialogBox.popUpOpen2(result[0].message ,'error','profiledata');
        //  }
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
  getmessageStatus() {
    // this.loaderservice.show();
    this.internalportalserviceService.getInternalPOReadStatus().subscribe(res => {
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

      // this.loaderservice.hide();  
    }
  }

  getStatusUpdate(bid, poNumber, invNumber, index) {
    this.uniqueBid = bid
    this.uniquePONumber = poNumber;
    this.uniqueInvNumber = invNumber;
    this.internalportalserviceService.getChatStatusUpdate(bid, poNumber, invNumber).subscribe(res => {
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
    console.log("this.POOrderList.controls['PONumber'].value ==>" + this.POOrderList.controls['duration'].value);
    console.log("this.POOrderList.controls['fromDate'].value ==>" + this.POOrderList.controls['fromDate'].value);
    console.log("this.POOrderList.controls['toDate'].value ==>" + this.POOrderList.controls['toDate'].value);
    this.durationpresent = false;
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
    var quarter = today.getFullYear() + '-' + (today.getMonth() - 2) + '-' + today.getDate() + ' ' + '00:00:00.0';
    var month = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate() + ' ' + '00:00:00.0';
    // this.responseList.length = 0
    console.log("Month", month, "Quarter", quarter, "HalfYear", halfyear, "Lastyear", lastyear, "Tday", today);
    this.fromdateofduration = "";
    this.todateofduration = "";
    if (this.POOrderList.controls['PONumber'].value) {
      this.ponumberpresent = true;
    }
    // if (this.POOrderList.controls['duration'].value == 'ALL') {
    //   this.durationpresent = false;
    //   this.maxdate = new Date();
    //   this.mindate = "";
    //   // this.maxtodate = "";
    //   this.mintodate = "";
    // }
    // else if(this.POOrderList.controls['duration'].value == '3M')
    // {
    //   this.durationpresent = true;
    //   this.maxdate = new Date().toString();
    //   this.mindate = "";
    //   this.mintodate = ""; //date to be added
    // }
    // else if(this.POOrderList.controls['duration'].value == '6M')
    // {
    //   this.durationpresent = true;
    //   this.maxdate = "";
    //   this.mindate = "";
    //   this.mintodate = ""; //date to be added
    // }
    // else if(this.POOrderList.controls['duration'].value == '1Y')
    // {
    //   this.durationpresent = true;
    //   this.maxdate = "";
    //   this.mindate = "";
    //   this.mintodate = ""; //date to be added
    // }

    // if (this.POOrderList.controls['duration'].value == 'ALL') {
    //   this.durationpresent = false;
    // }
    if (this.POOrderList.controls['duration'].value == 'ALL') {
      // this.durationpresent = false;
      this.maxdate = "";
      this.mindate = "";
      // this.maxtodate = "";
      this.mintodate = "";
    }
    else if (this.POOrderList.controls['duration'].value == '3M') {
      this.fromdateofduration = new Date(quarter);
      this.todateofduration = new Date();
      // this.durationpresent = true;
      // this.maxdate = new Date().toString();
      // this.mindate = "";
      // this.mintodate = ""; //date to be added
    }
    else if (this.POOrderList.controls['duration'].value == '6M') {
      this.fromdateofduration = new Date(halfyear);
      this.todateofduration = new Date();
      // this.durationpresent = true;
      // this.maxdate = "";
      // this.mindate = "";
      // this.mintodate = ""; //date to be added
    }
    else if (this.POOrderList.controls['duration'].value == '1Y') {
      this.fromdateofduration = new Date(lastyear);
      this.todateofduration = new Date();
      // this.durationpresent = true;
      // this.maxdate = "";
      // this.mindate = "";
      // this.mintodate = ""; //date to be added
    }
    else if (this.POOrderList.controls['duration'].value == '1M') {
      this.fromdateofduration = new Date(month);
      this.todateofduration = new Date();
      // this.durationpresent = true;
      // this.maxdate = "";
      // this.mindate = "";
      // this.mintodate = ""; //date to be added
    }
    console.log("this.fromdateofduration ==>" + this.fromdateofduration);
    console.log("this.todateofduration ==>" + this.todateofduration);

    if (this.POOrderList.controls['fromDate'].value) {
      this.fromtodatepresent = true;
    }

    if (this.filterpodatalist.length != 0) {
      for (var i = 0; i < this.filterpodatalist.length; i++) {
        if (this.ponumberpresent) {
          if (this.filterpodatalist[i].PO_NUMBER.includes(this.POOrderList.controls['PONumber'].value)) {
            this.filteredponumberData.push(this.filterpodatalist[i]);
          }
        }
        else {
          this.filteredponumberData.push(this.filterpodatalist[i]);
        }
      }
      console.log("this.filteredponumberData.length" + this.filteredponumberData.length);
      if (this.filteredponumberData.length != 0) {
        for (var i = 0; i < this.filteredponumberData.length; i++) {
          if (this.fromdateofduration != '') {
            if ((moment.utc(moment(this.filteredponumberData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
              .isAfter(moment.utc(moment(this.convert(new Date(this.fromdateofduration))).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]'))
              || moment.utc(moment(this.filteredponumberData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
                .isSame(moment.utc(moment(this.convert(new Date(this.fromdateofduration))).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')))
              && (moment.utc(moment(this.filteredponumberData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
                .isBefore(moment.utc(moment(this.convert(new Date(this.todateofduration))).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]'))
                || moment.utc(moment(this.filteredponumberData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
                  .isSame(moment.utc(moment(this.convert(new Date(this.todateofduration))).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')))) {
              this.filtereddurationData.push(this.filteredponumberData[i]);
            }
          }
          else {
            this.filtereddurationData.push(this.filteredponumberData[i]);
          }
        }
        console.log("this.filtereddurationData.length" + this.filtereddurationData.length);
        if (this.filtereddurationData.length != 0) {
          for (var i = 0; i < this.filtereddurationData.length; i++) {
            if (this.fromtodatepresent) {
              // console.log("this.invoiceList.controls['fromDate'].value"+this.convert(this.invoiceList.controls['fromDate'].value));
              // console.log("");
              // console.log("moment(this.filteredponumberData[i].CREATEDON).format('YYYY-MM-DD')"+moment(this.filteredponumberData[i].INVOICEDATE).format("YYYY-MM-DD"));
              // console.log("moment(this.invoiceList.controls['fromDate'].value).format('MM/DD/YYYY')"+moment(this.convert(this.invoiceList.controls['fromDate'].value)).format("MM/DD/YYYY"));

              if ((moment.utc(moment(this.filtereddurationData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
                .isAfter(moment.utc(moment(this.convert(this.POOrderList.controls['fromDate'].value)).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]'))
                || moment.utc(moment(this.filtereddurationData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
                  .isSame(moment.utc(moment(this.convert(this.POOrderList.controls['fromDate'].value)).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')))
                && (moment.utc(moment(this.filtereddurationData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
                  .isBefore(moment.utc(moment(this.convert(this.POOrderList.controls['toDate'].value)).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]'))
                  || moment.utc(moment(this.filtereddurationData[i].DATE).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')
                    .isSame(moment.utc(moment(this.convert(this.POOrderList.controls['toDate'].value)).format("YYYY-MM-DD"), 'YYYY-MM-DD[T]HH:mm[Z]')))) {
                this.filtereddate.push(this.filtereddurationData[i]);
              }
            }
            else {
              this.filtereddate.push(this.filtereddurationData[i]);
            }
          }
          console.log("this.filtereddate.length" + this.filtereddate.length);
          this.poDataList = this.filtereddate;
          this.totalItems = this.poDataList.length;
        }
        else {
          this.poDataList = [];
          this.totalItems = this.poDataList.length;
        }
        // this.poDataList = this.filtereddurationData;
        // this.totalItems = this.poDataList.length;

      }
      else {
        this.poDataList = [];
        this.totalItems = this.poDataList.length;
      }
      // this.poDataList = this.filteredponumberData;
    }
    else {
      this.poDataList = [];
      this.totalItems = this.poDataList.length;
    }
    setTimeout(() => {
      // this.loaderservice.show();
      for (var k = 0; k < this.poDataList.length; k++) {
        console.log("this.statusList.length " + this.statusList.length);
        if (this.statusList.length != 0) {
          for (var j = 0; j < this.statusList.length; j++) {
            if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['PONUMBER'] == this.poDataList[k]['PO_NUMBER']) {

              $("#green" + k).addClass('displayBlock');
              $("#white" + k).addClass('displayNone');
              $("#white" + k).removeClass('displayNone');
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
      // this.loaderservice.hide();
    }, 500); err => {
      // this.loaderservice.hide();
    }
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

  navigatetointernalportal(emailId) {
    this.loaderservice.show();
    console.log("Calling Data=================");

    // this.loginService.logout().subscribe(res => {
    //     console.log("response is here ==> " + res);
    // if (res[0].data == 'true') {
    //         this.authService.logout();
    this.loginService.checkemailforinternalportal(emailId).subscribe(res => {
      if (res.body[0].status == "Success") {

        const accessKey = res.headers.get('Authorizationkey');
        const profileAccesKey = res.headers.get('Authorization');

        console.log("this.loginForm.controls['Email'].value" + emailId);
        this.forinternal = emailId
        this.username = emailId
        if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
          sessionStorage.setItem('ACCESS_TOKEN', accessKey);
          sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);
          sessionStorage.setItem('username', this.username);
          this.authService.login()

          this.loaderservice.show()
          this.getPortalTypebasedonemail(this.username);
          this.loaderservice.show()
          // setTimeout(() => {
          //     this.router.navigate(['/internalTrackPO'], { queryParams: { email: this.forinternal } }).then(() => {
          //       sessionStorage.setItem("portaltype","innerportal"); 
          //       window.location.reload();
          //     });
          // }, 10);
          // this.loaderservice.hide();
        }


      }

    });

    // }

    // });




  }

  getPortalTypebasedonemail(userName) {
    console.log('clicked--------------response print')
    this.loginService.getportalType(userName).subscribe(res => {
      console.log(res, '--------------response print')
      if (res.body.length > 0) {

        if (res.body[0].mode == 'buyer') {
          // setTimeout(() => {
          //     this.router.navigate(['/internalBuyerportal'], { queryParams: { orderNo: userName } }).then(() => {
          //         window.location.reload();
          //     });
          // }, 50);
          this.isbuyer = true;
          this.isenduser = true;
          sessionStorage.setItem("portaltype", "innerbuyerportal");
          this.innerbuyerportal = true;
          this.vendorPortal = false;
          this.innerportal = false;
          this.ispayee = false
          setTimeout(() => {
                this.router.navigate(['/internalTrackPO']).then(() => {
                  // , { queryParams: { orderNo: this.forinternal } }
                    window.location.reload();
                });
            }, 50);
          // this.router.navigate(['/internalportal']);
          console.log(this.innerbuyerportal, 'this.innerbuyerportal isbuyer')
          console.log(this.vendorPortal, 'this.vendorPortal isbuyer')
          console.log(this.innerportal, 'this.innerportal isbuyer')
        }
        else if ((res.body[0].mode == 'enduser') || res.body[0].mode == 'internalbcclportal') {

          if (res.body[0].mode == 'internalbcclportal') {
            this.internalbcclportal = true;
            sessionStorage.setItem("portaltype", "internalbcclportal");
          }
          else {
            this.internalbcclportal = false
            sessionStorage.setItem("portaltype", "innerportal");
          }

          this.isenduser = false;
          // sessionStorage.setItem("portaltype","innerportal");
          this.innerportal = true;
          this.vendorPortal = false;
          this.innerbuyerportal = false;
          this.ispayee = false
           setTimeout(() => {
              if((res.body[0].mode == 'enduser'))
              {
                  this.router.navigate(['/internalTrackPO']).then(() => {
                    // , { queryParams: { orderNo: this.forinternal } }
                      window.location.reload();
                  });
              }
              else if(res.body[0].mode == 'internalbcclportal'){
                  this.router.navigate(['/internaltrackInvoiceList']).then(() => {
                    // , { queryParams: { orderNo: this.forinternal } }
                      window.location.reload();
                  });
              }
             ;
            }, 50);
          // this.router.navigate(['/internalBuyerportal']);
          console.log(this.innerbuyerportal, 'this.innerbuyerportal isenduser')
          console.log(this.vendorPortal, 'this.vendorPortal isenduser')
          console.log(this.innerportal, 'this.innerportal isenduser')
        }
        else if (res.body[0].mode == 'payer') {
          sessionStorage.setItem("portaltype", "payerportal");
          this.isenduser = false;
          this.innerportal = false;
          this.vendorPortal = false;
          this.ispayee = true;
          setTimeout(() => {
                this.router.navigate(['/internalTrackPO']).then(() => {
                  // , { queryParams: { orderNo: this.forinternal } }
                    window.location.reload();
                });
            }, 50);

        }

      }
    });
    // this.loaderservice.hide();
  }


  addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }
  getorderitems(lineitemnumber, ponumber) {
    this.orderlistoflineitemmp = [];
    this.orderlist = [];
    this.orderlistwithinvoice = [];
    this.internalportalserviceService.getinternalorderitems(lineitemnumber, ponumber).subscribe(res => {
      console.log("delivery response", res);
      if (res[0].message = "Success") {
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

  // downloadPOpdf(po_number, singlepodownload) {
  //   // this.loaderservice.show();
  //   console.log(po_number);
  //   this.DecodedFile = [];
  //   this.trackOrderListService.getfile(po_number, singlepodownload)
  //     .subscribe(result => {
  //       console.log(result);
  //       console.log("filename===>" + result[0].filename);
  //       this.DecodedFile = result[0].data;
  //       if (this.DecodedFile) {
  //         var data = this.DecodedFile;
  //         const agent = window.navigator.userAgent.toLowerCase()
  //         if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
  //           var byteCharacters = atob(data);
  //           var byteNumbers = new Array(byteCharacters.length);
  //           for (var i = 0; i < byteCharacters.length; i++) {
  //             byteNumbers[i] = byteCharacters.charCodeAt(i);
  //           }
  //           var byteArray = new Uint8Array(byteNumbers);
  //           var blob = new Blob([byteArray], { type: 'application/octet-stream' });
  //           window.navigator.msSaveOrOpenBlob(blob, result[0].filename);
  //         }
  //         else if (agent.indexOf('firefox') > -1) {
  //           var byteCharacters = atob(data);
  //           var byteNumbers = new Array(byteCharacters.length);
  //           for (var i = 0; i < byteCharacters.length; i++) {
  //             byteNumbers[i] = byteCharacters.charCodeAt(i);
  //           }
  //           var byteArray = new Uint8Array(byteNumbers);
  //           var blob = new Blob([byteArray], { type: "application/octet-stream" });
  //           saveAs(blob, result[0].filename);
  //         }
  //         else {
  //           console.log(data, 'data')
  //           let FileToDownload = 'data:application/octet-stream;base64,' + data;
  //           var link = document.createElement("a");
  //           const filename = result[0].filename;
  //           link.href = FileToDownload;
  //           link.download = filename;
  //           link.click();


  //         }
  //       }
  //       this.loaderservice.hide();
  //     }, err => {
  //       this.loaderservice.hide();
  //       console.log(JSON.stringify(err))
  //     }
  //     );

  // }

  getPlantData(e) {
    this.PlantList = [];
    this.internalportalserviceService.getPlanCode(e.target.value.toUpperCase()).subscribe(res => {
      this.tempPlantList = res[0].grnbasedonpo;
      console.log(this.PlantList, 'PlantList')
    });
  }

  
  getVendorData(e) {
    this.vendorList = [];
    this.internalportalserviceService.getVendorData(e.target.value.toUpperCase()).subscribe(res => {
      this.vendorList = res[0].vendordetail;
      console.log(this.vendorList, 'vendorList')
    });
  }

}



