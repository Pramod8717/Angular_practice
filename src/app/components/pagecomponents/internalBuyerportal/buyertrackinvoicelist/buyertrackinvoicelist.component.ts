import { Component, OnInit, ViewChild } from '@angular/core';
import { InternalportalserviceService } from '../../../../services/internalportal/internalportalservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment/moment';
declare var $: any;
import { saveAs } from 'file-saver';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import { LoginService } from 'app/services/login/login.service';
import { AuthService } from 'app/services/auth/auth.service';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../../../commoncomponents/popup/popup.component';
@Component({
  selector: 'app-buyertrackinvoicelist',
  templateUrl: './buyertrackinvoicelist.component.html',
  styleUrls: ['./buyertrackinvoicelist.component.css']
})
export class BuyertrackinvoicelistComponent implements OnInit {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  totalItems: any;
  mPageNo: number = 1;
  pageSize = 50;
  emailid: any;
  invoiceDataList = [];
  confirmationNoAction: boolean = false;
  mindate: any;
  maxdate: any;
  disable: boolean = false;
  todateerror: boolean = false;
  uniquePONumber: any;
  recipientEmail: any;
  messageList: any[];
  // invoiceDataList = [];
  searchList: any = [];
  invoicedetailsList: any = [];
  filteredinvoiceData: any = [];
  filteredponumberData: any = [];
  filtereddate: any = [];
  invoicenumberpresent: boolean = false;
  ponumberpresent: boolean = false;
  lineitempresent: boolean = false;
  fromtodatepresent: boolean = false;
  ENDUSERStatus = [];
  ManagerStatus = [];
  specificemailid: string;
  withoutpo: boolean = false;
  disableoff: boolean = false;
  invoiceData: any = [];
  filterwithoutpolist: any = [];
  allinvlist: any[];
  invoiceDatawopo: any = [];
  submittedinvList: any = [];
  partiallypaidinvList: any = [];
  processedinvList: any = [];
  paidinvList: any = [];
  onholdinvList: any = [];
  validate: boolean = true;
  acceptedinvList: any = [];
  shortQuantityList: any = [];
  returnedList: any = [];
  pendinginvList: any = [];
  rejectedinvList: any = [];
  grninvList: any = [];
  managerpendinginvList: any = [];
  mintodate: Date;
  fromdateerror: boolean = false;
  disableprevious: boolean = false;
  disablenext: boolean = false;
  topic: any;
  uniqueInvNumber: any;
  statusList: any;
  uniqueBid: any;
  invoicenumber: any[];
  ponumber: any[];
  DecodedFile: any;
  message: any;
  forinternal: any;
  username: any;
  isbuyer: boolean;
  innerbuyerportal: boolean;
  isenduser: boolean;
  vendorPortal: boolean;
  innerportal: boolean;
  ispayee: boolean;
  internalbcclportal: boolean = false;
  urlparamsvalues: boolean;
  paginationpagenumber: number = 1;
  type: string;
  actualpo: string;
  actualline: string;
  actualorder: string;
  pgNolist: any[];
  pageName: any;
  currstatus: any = 'P';
  innum: string = "NA";
  ponum: string = "NA";
  fd: string = "NA";
  td: string = "NA";
  checkboxvalue: string;
  endpagenumber: number = 1;
  PlantList: any = [];
  tempPlantList: any = [];
  vendorList: any = [];
  plant: string = 'NA';
  plantpresent: boolean = false;
  vendor: string = 'NA';
  vendorpresent: boolean = false;
  extensionType: any;
  invoiceCountAsPerStatus:any=[];
  pendingPo :number = 0;
  pCount :number = 0;
  mCount:number = 0;

  constructor(private internalportalservice: InternalportalserviceService,
    private trackOrderListService: TrackOrderListService, private router: Router, private loginService: LoginService,
    private route: ActivatedRoute, private loaderservice: LoaderService, private authService: AuthService, public dialog: MatDialog) { }

  public invoiceList = new FormGroup({
    POrealNumber: new FormControl(''),
    InvoiceNumber: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    POOrderNumber: new FormControl(''),
    POlineitemNumber: new FormControl(''),
    Plant: new FormControl(''),
    Vendor: new FormControl('')
    // paymentMethod: new FormControl('', Validators.required),
    // paymentStatus: new FormControl('', Validators.required),
    // Topicker: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    $("body").on("click", ".status-link", function () {
      $('.inv-wrapper.active').removeClass('active');
      $(this).parent().addClass('active');
    });
    this.route.queryParams.subscribe(params => {

 var data  =  atob(params.key)
var data1 = JSON.parse(data)
      // console.log("Params=======> ", data1); // { order: "popular" }
  

if(data1.emailId !=null && data1.emailId !="" && data1.page=="viewinvoices")
{
  this.loaderservice.show();
  this.navigatetointernalportal(data1.emailId)
}


      this.message = params.order;
      console.log("message===========>", this.message); // popular
    });

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
      this.getmessageStatus();
    }

  }

  showSubmitBox(ev) {
    this.confirmationNoAction = true;
  }
  showPopup(ev) {
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
  }
  closePopup(ev) {
    $("#popup2").css("visibility", "hidden");
    $("#popup2").css("opacity", "0");
  }

  ShowpopupMessage(ev) {
    $("#popupMessage").css("visibility", "visible");
    $("#popupMessage").css("opacity", "1");
    (<any>$("#popupComment").modal('show'));
  }
  ClosepopupMessage(ev) {
    $("#popupMessage").css("visibility", "hidden");
    $("#popupMessage").css("opacity", "0");
  }


  getInvoiceData(pageno) {
    // $('.inv-wrapper').removeClass('active');
    // $('#stManagerpending').addClass('active');
    this.emailid = sessionStorage.getItem("username");
    this.pendinginvList = [];
    this.invoiceDataList = [];
    this.disableprevious = true;
    this.statusList = [];
    this.internalportalservice.getInvoicesbasedonUserType(this.emailid, pageno, this.currstatus, 'NA', 'NA', 'NA', 'NA', 'NA', 'NA').subscribe(res => {
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
      if (res[0].message ==  "Success") {
        this.invoiceDataList = res[0].invoiceData;
        
        console.log("count",this.pendingPo)
        // for (let i = 0; i < this.invoiceDataList.length; i++) {
        //   this.invoiceDataList[i].AMOUNT = Number(this.invoiceDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
        //   if (this.invoiceDataList[i].OVERALLSTATUS == 'M' || this.invoiceDataList[i].OVERALLSTATUS == 'P') {
        //     this.pendinginvList.push(this.invoiceDataList[i]);
        //   }
        // }
        // this.invoiceDataList = this.pendinginvList;
        // this.totalItems = this.invoiceDataList.length;
        console.log(this.invoiceDataList, 'invoiceDataList');
        this.totalItems = res[0].invoicelistpages;
        // if(Number(res[0].invoicelistpages)/this.pageSize < 1)
        this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages) / this.pageSize))
        if (Number(res[0].invoicelistpages) / this.paginationpagenumber <= this.pageSize) {
          this.disablenext = true;
        }
        else {
          this.disablenext = false;
        }
        this.loaderservice.hide();
      }

      setTimeout(() => {

        for (var k = 0; k < this.invoiceDataList.length; k++) {
          // console.log("this.statusList.length " + this.statusList.length);
          if (this.statusList.length != 0) {

            for (var j = 0; j < this.statusList.length; j++) {
              // if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.invoiceData[k]['INVOICENUMBER']) {
              if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoiceDataList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoiceDataList[k]['PONUMBER']) {
                console.log("insise A--------------------------==============", this.invoiceDataList[k]['INVOICENUMBER'])
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
      }, 200);
    });

  }


  trackPayment(searchponumber, searchlineitemnumber, searchordernumber) {
    var emailid = sessionStorage.getItem("username");
    this.paginationpagenumber = 1;
    this.disableprevious = true;
    if (this.checkboxvalue == "ASWP") {
      this.currstatus = 'ASWP';
      this.disableoff = true;

    } else if (this.checkboxvalue == "ASSQ") {
      this.disableoff = false;
      this.currstatus = 'ASSQ';
    }else if(this.currstatus == 'C'){
      this.currstatus = 'C'
    }else {
      this.currstatus = 'AS';
    }
    // this.approximatecheck = true;
    this.invoiceData = [];
    console.log("this.searchordernumber ==>" + searchordernumber);
    // this.loaderservice.show();
    this.invoiceData = [];
    this.filteredinvoiceData = [];
    this.filteredponumberData = [];
    this.filtereddate = [];
    this.invoicenumberpresent = false;
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

    if (this.invoiceList.controls['InvoiceNumber'].value) {
      this.invoicenumberpresent = true;
      this.innum = this.invoiceList.controls['InvoiceNumber'].value.trim();
    }
    else {
      this.innum = 'NA';
    }
    if (this.invoiceList.controls['Plant'].value) {
      for(var b =0;b<this.tempPlantList.length;b++)
    {
      console.log("this.tempPlantList[b].PLANTNAME "+this.tempPlantList[b].PLANTNAME);
      if(this.tempPlantList[b].PLANTNAME == this.invoiceList.controls['Plant'].value.trim())
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
    if (this.invoiceList.controls['Vendor'].value) {
    //   for(var b =0;b<this.vendorList.length;b++)
    // {
    //   console.log("this.tempPlantList[b].PLANTNAME "+this.invoiceList.controls['Vendor'].value);
    //   if(this.vendorList[b].BUSINESSPARTNERTEXT == this.invoiceList.controls['Vendor'].value.trim())
    //   {
    //     this.vendor = this.vendorList[b].VENDORID;
    //   }
    // }
      this.vendorpresent = true;
      this.vendor = this.invoiceList.controls['Vendor'].value.trim();
    }
    else {
      this.vendor = 'NA';
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

    this.internalportalservice.getInvoicesbasedonUserType(emailid, this.paginationpagenumber, 
      this.currstatus, this.innum,
      this.ponum, this.fd, this.td,this.plant,this.vendor).subscribe(res => {
        let advanceSearcBox = document.getElementById("advanceSearcBox");
        let closeArrow = document.getElementById("closeArrow");
        let openArrow = document.getElementById("openArrow");
        advanceSearcBox.style.display = "none";
        openArrow.style.display = "block";
        closeArrow.style.display = "none";
        // this.invoiceList.reset();
        if (res[0].message == 'Success') {  
          // this.invoiceData = res[0].invoiceData;
          // this.invoicedetailsList = res[0].invoicedetails
          console.log("this.result-------------- ", res);
          this.searchList = res[0].invoiceData;
          console.log("this.result-------------- ", this.searchList);
          this.totalItems = this.searchList.length;
          this.invoiceDataList = res[0].invoiceData;
          this.totalItems = res[0].invoicelistpages;
          this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages) / this.pageSize))
          if (Number(res[0].invoicelistpages) / this.paginationpagenumber <= this.pageSize) {
            this.disablenext = true;
          }
          else {
            this.disablenext = false;
          }
          this.loaderservice.hide();


          setTimeout(() => {
            for (var k = 0; k < this.invoiceDataList.length; k++) {
              for (var j = 0; j < this.statusList.length; j++) {
                if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoiceDataList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoiceDataList[k]['PONUMBER']) {
                  $("#green" + k).addClass('displayBlock');
                  $("#white" + k).addClass('displayNone');
                  $("#white" + k).removeClass('displayBlock');
                }
                else {
                  //$("#msg1ID" + k).addClass('displayNone');
                  $("#white" + k).addClass('displayBlock');
                }
              }
            }
          }, 500);


          // }
          // });
        }
        else {
          this.invoiceDataList = [];
          this.totalItems = 0;
        }
      });


  }
  getInvDetails(invoicenumber, ponumber) {
    this.router.navigate(['./internaltrackinvoicedetails'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber),origin:btoa('trackinvoice') } });
  }


  getInvoiceQuerry(ponumber, invoicenumber, contactpersonemailid) {
    console.log("inside", invoicenumber);
    this.uniquePONumber = ponumber;
    this.uniqueInvNumber = invoicenumber;

    this.recipientEmail = contactpersonemailid;
    sessionStorage.setItem("receiverMail", contactpersonemailid)
    // this.purchaseOrderListService.getMessages(invoicenumber).subscribe(res => {
    this.internalportalservice.getInternalInvMessages(ponumber, invoicenumber).subscribe(res => {
      console.log("resposne", res[0].message)
      this.messageList = [];
      this.topic = this.uniqueInvNumber
      if (res[0].poQueryList[0] != undefined) {
        this.messageList = res[0].poQueryList
      }
      // else {
      //   this.messageList = res[0].message
      // }
      console.log(this.messageList)


    })
  }

  Check(message) {
    this.validate = true
    if (message.value != "" && message.value != " " && message.value != null && message.value.trim().length != 0) {
      this.validate = false;
    }
  }

  sendConfirmation(status, message, subject, topic) {
    // if (message == undefined || message == '')
    //   message = "Accepted";
    // console.log("AM I ???",status,message)
    // $(".messageChatWrapper").stop().animate({ scrollTop: $(".messageChatWrapper")[0].scrollHeight}, 1000);


    this.internalportalservice.submitInternalInvoiceChat("", this.uniquePONumber, this.uniqueInvNumber, status, message, subject, topic).subscribe(res => {
      // this.purchaseOrderListService.submitConfirmation("", status, message, subject, this.topic).subscribe(res => {
      // console.log("what is the response?" , res[0].message)
      if (res[0].message == "Success") {
        //  this.getQuerry(topic,'')
        message = '';
        this.validate = false;
        this.messageList = [];
        this.internalportalservice.getInternalInvMessages(this.uniquePONumber, this.uniqueInvNumber).subscribe(res => {
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

  download(savedfilename, singlepodownload, actualfilename) {
    if (savedfilename == "" || savedfilename == null || actualfilename == "" || actualfilename == null
      || savedfilename == undefined || actualfilename == undefined) {
      //this.dialogBox.popUpOpen2("File not present" ,'success','purchaseorderlist');
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
    this.trackOrderListService.getinternalfile(savedfilename, 'listdownload')
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
          //this.dialogBox.popUpOpen2(result[0].reason ,'success','purchaseorderlist');
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
        // if (result[0].status == "Fail") {
        //   this.dialogBox.popUpOpen2(result[0].message, 'error', 'profiledata');
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
          //this.dialogBox.popUpOpen2(result[0].reason ,'success','purchaseorderlist');
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

        // if (result[0].status == "Fail") {
        //   this.dialogBox.popUpOpen2(result[0].message ,'error','profiledata');
        //  }
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );

  }

  downloadinvoicelist() {
    this.invoicenumber = [];
    this.ponumber = [];
    this.loaderservice.show();
    console.log("this.invoiceDataList.length", this.invoiceDataList);
    for (var k = 0; k < this.invoiceDataList.length; k++) {
      this.invoicenumber.push(this.invoiceDataList[k].INVOICENUMBER);
      this.ponumber.push(this.invoiceDataList[k].PONUMBER);
    }
    
    this.trackOrderListService.downloadinternalInvoiceData(this.emailid, this.paginationpagenumber, 
      this.currstatus, this.innum,
      this.ponum, this.fd, this.td,this.plant,this.vendor).subscribe(res => {

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
        //this.loaderservice.hide();
        // this.dialogBox.popUpOpen2('Failed to download !!', 'error', 'trackinvoicelist');
        // this.toastr.error("Failed to download !!")
      }
      // });

    }, err => {
      this.loaderservice.hide();
      console.log(JSON.stringify(err))
    })
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
      // this.loaderservice.hide()

    }); err => {

      // this.loaderservice.hide();
    }
  } convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  // keyPressAlphanumeric(n) {
  //   //var regex = new RegExp("^[a-zA-Z0-9 ]+$");
  //   var regex = new RegExp("^[0-9A-Za-z\s\-]+$");
  //   var str = String.fromCharCode(!n.charCode ? n.which : n.charCode);
  //   if (regex.test(str)) {
  //     return true;
  //   }


  //  }

  keyPressAlphanumeric(event): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
      || (charCode >= 48 && charCode <= 57) || charCode == 32 ||
      charCode == 45 || charCode == 47 || charCode == 92) {
      return true;
    }
    return false;
  }

  getStatusUpdate(bid, poNumber, invNumber, index) {
    this.uniqueBid = bid
    this.uniquePONumber = poNumber;
    this.uniqueInvNumber = invNumber;
    this.internalportalservice.getChatStatusUpdate(bid, poNumber, invNumber).subscribe(res => {
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


  sortdata(status) {
    console.log("hello");
    this.invoiceList.patchValue({ withoutpo: false });
    // $('#myCheckbox').prop('checked', false);

    this.withoutpo = false;
    this.disableoff = false;
    this.invoiceDataList = [];
    this.filterwithoutpolist = [];
    this.submittedinvList = [];
    this.partiallypaidinvList = [];
    this.paidinvList = [];
    this.processedinvList = [];
    this.managerpendinginvList = [];
    this.acceptedinvList = [];
    this.shortQuantityList = [];
    this.grninvList = [];
    this.pendinginvList = [];
    this.rejectedinvList = [];
    this.onholdinvList = [];
    this.returnedList = [];
    // this.getInvoiceData();
    console.log("in here" + status)
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
    this.vendor = 'NA';
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
    var emailid = sessionStorage.getItem("username");
    this.internalportalservice.getInvoicesbasedonUserType(emailid, this.paginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA', 'NA', 'NA').subscribe(res => {
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
      if (res[0].message == "Success") {
        // this.loaderservice.show();
        // }
        this.invoiceDataList = res[0].invoiceData;
        // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
        // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.M;
        // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.P;
        // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = 0;
        // }else{
        //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
        // }
        console.log("count",this.pendingPo)
        console.log("response====>", res)
        console.log("this.invoiceDataList ==>", this.invoiceDataList);
        this.totalItems = res[0].invoicelistpages;
        // console.log("PODEtails in details", this.poDetail)
        sessionStorage.setItem("InvoiceData", JSON.stringify(this.invoiceDataList));
        this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages) / this.pageSize))
        if (Number(res[0].invoicelistpages) / this.paginationpagenumber <= this.pageSize) {
          this.disablenext = true;
        }
        else {
          this.disablenext = false;
        }
        setTimeout(() => {

          for (var k = 0; k < this.invoiceDataList.length; k++) {
            // console.log("this.statusList.length " + this.statusList.length);
            if (this.statusList.length != 0) {
  
              for (var j = 0; j < this.statusList.length; j++) {
                // if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.invoiceData[k]['INVOICENUMBER']) {
                if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoiceDataList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoiceDataList[k]['PONUMBER']) {
                  console.log("insise A--------------------------==============", this.invoiceDataList[k]['INVOICENUMBER'])
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
        }, 200);

      }
      else {
        this.invoiceDataList = [];
        this.totalItems = this.invoiceData.length;
      }
    });

    // }



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
          this.authService.login();

          this.loaderservice.show();
          this.getPortalTypebasedonemail(this.username);
          // setTimeout(() => {
          //     this.router.navigate(['/internaltrackInvoiceList'], { queryParams: { email: this.forinternal } }).then(() => {
          //       sessionStorage.setItem("portaltype","innerportal"); 
          //       window.location.reload();
          //     });
          // }, 50);
          this.loaderservice.hide();
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
            this.router.navigate(['/internalinvoicelist']).then(() => {
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
              this.router.navigate(['/internalinvoicelist']).then(() => {
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
            this.router.navigate(['/internalinvoicelist']).then(() => {
              // , { queryParams: { orderNo: this.forinternal } }
                window.location.reload();
            });
        }, 50);

        }

      }
    });
    this.loaderservice.hide();
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

  sortWithoutPO() {
    this.invoiceList.controls.POlineitemNumber.setValue(null);
    this.invoiceList.controls.POOrderNumber.setValue(null);
    this.invoiceList.controls.POrealNumber.setValue(null);
    // this.invoiceList.controls.POlineitemNumber.disable();
    // this.invoiceList.controls.POOrderNumber.disable();
    // this.invoiceList.controls.POrealNumber.disable({ onlySelf: true });
    this.invoiceDataList = this.invoiceDatawopo;
    this.disableoff = true;
    this.totalItems = this.invoiceDataList.length;

  }

  gettrackInvList(action) {
    this.loaderservice.show();
    this.invoiceData = [];
    this.invoiceDataList = [];
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
    if (this.currstatus == "AS")
    {
      this.internalportalservice.getInvoicesbasedonUserType(this.emailid, this.paginationpagenumber, this.currstatus, this.innum, this.ponum, this.fd, this.td,this.plant,this.vendor).subscribe(res => {
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
        if (res[0].message == "Success") {
          this.invoiceDataList = res[0].invoiceData;
        //   this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
        // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.M;
        // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.P;
        // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = 0;
        // }else{
        //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
        // }
        console.log("count",this.pendingPo)
          // for (let i = 0; i < this.invoiceDataList.length; i++) {
          //   this.invoiceDataList[i].AMOUNT = Number(this.invoiceDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          //   if (this.invoiceDataList[i].OVERALLSTATUS == 'M' || this.invoiceDataList[i].OVERALLSTATUS == 'P') {
          //     this.pendinginvList.push(this.invoiceDataList[i]);
          //   }
          // }
          // this.invoiceDataList = this.pendinginvList;
          // this.totalItems = this.invoiceDataList.length;
          console.log(this.invoiceDataList, 'invoiceDataList');
          this.totalItems = res[0].invoicelistpages;
          // if(Number(res[0].invoicelistpages)/this.pageSize < 1)
          this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages) / this.pageSize))
          if (Number(res[0].invoicelistpages) / this.paginationpagenumber <= this.pageSize) {
            this.disablenext = true;
          }
          else {
            this.disablenext = false;
          }
          this.loaderservice.hide();
        }
  
        setTimeout(() => {
  
          for (var k = 0; k < this.invoiceDataList.length; k++) {
            console.log("this.statusList.length " + this.statusList.length);
            if (this.statusList.length != 0) {
  
              for (var j = 0; j < this.statusList.length; j++) {
                // if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.invoiceData[k]['INVOICENUMBER']) {
                if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoiceDataList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoiceDataList[k]['PONUMBER']) {
                  console.log("insise A--------------------------==============", this.invoiceDataList[k]['INVOICENUMBER'])
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
        }, 200);
      });
    }
    else
    {
      this.internalportalservice.getInvoicesbasedonUserType(this.emailid, this.paginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA','NA','NA').subscribe(res => {
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
        if (res[0].message== "Success") {
          this.invoiceDataList = res[0].invoiceData;
        //   this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
        // if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.M;
        // }else if(this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = this.invoiceCountAsPerStatus.P;
        // }else if(this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null){
        //   this.pendingPo = 0;
        // }else{
        //   this.pendingPo =  Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
        // }
        console.log("count",this.pendingPo)
          // for (let i = 0; i < this.invoiceDataList.length; i++) {
          //   this.invoiceDataList[i].AMOUNT = Number(this.invoiceDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          //   if (this.invoiceDataList[i].OVERALLSTATUS == 'M' || this.invoiceDataList[i].OVERALLSTATUS == 'P') {
          //     this.pendinginvList.push(this.invoiceDataList[i]);
          //   }
          // }
          // this.invoiceDataList = this.pendinginvList;
          // this.totalItems = this.invoiceDataList.length;
          console.log(this.invoiceDataList, 'invoiceDataList');
          this.totalItems = res[0].invoicelistpages;
          // if(Number(res[0].invoicelistpages)/this.pageSize < 1)
          this.endpagenumber = Math.ceil((Number(res[0].invoicelistpages) / this.pageSize))
          if (Number(res[0].invoicelistpages) / this.paginationpagenumber <= this.pageSize) {
            this.disablenext = true;
          }
          else {
            this.disablenext = false;
          }
          this.loaderservice.hide();
        }
  
        setTimeout(() => {
  
          for (var k = 0; k < this.invoiceDataList.length; k++) {
            console.log("this.statusList.length " + this.statusList.length);
            if (this.statusList.length != 0) {
  
              for (var j = 0; j < this.statusList.length; j++) {
                // if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.invoiceData[k]['INVOICENUMBER']) {
                if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoiceDataList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoiceDataList[k]['PONUMBER']) {
                  console.log("insise A--------------------------==============", this.invoiceDataList[k]['INVOICENUMBER'])
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
        }, 200);
      });
    }
    setTimeout(() => {
      this.pgNolist = [];
      // if (event > 1) {
       
        this.pgNolist = this.invoiceDataList;
        console.log("this.invoiceData for pagination", this.pgNolist);
        for (var k = 0; k < this.pgNolist.length; k++) {

          console.log("what is happening ??", this.pgNolist[k]['INVOICENUMBER']);

          for (var j = 0; j < this.statusList.length; j++) {
            if (this.statusList.length != 0) {
              if (this.pgNolist[k]['INVOICENUMBER'] == this.statusList[j]['INVOICENUMBER'] && this.statusList[j]['STATUS'] == "A") {
                console.log("inside green", this.pgNolist[k]['INVOICENUMBER']);


                $("#green" + k).addClass('displayBlock');
                $("#white" + k).addClass('displayNone');
              }
              else
              //  if(this.pgNolist[k]['INVOICENUMBER']!=this.statusList[j]['TOPIC'] && this.statusList[j]['READ_STATUS'] !="A" )
              {
                $("#white" + k).addClass('displayBlock');
              }
            }
            else {
              $("#white" + k).addClass('displayBlock');
            }
          }
          this.loaderservice.hide();
        }
    }, 100);

  }
  createCreditNote(invoicenumber, ponumber, creditAdviceNo) {
    this.pageName = 'ViewInvoice';
    this.router.navigate(['./createCreditNote'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), adviceNo: btoa(creditAdviceNo), showCreditDetails: btoa(this.pageName) } });
  }
  getCreditNoteDetails(invoicenumber, ponumber, creditAdviceNo) {
    // debugger
    this.pageName = 'ViewInvoice';
    this.router.navigate(['./createCreditNote'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), adviceNo: btoa(creditAdviceNo), showCreditDetails: btoa(this.pageName) } });
  }
  searchType(event,type){
    if (event.target.checked) {
      this.currstatus=type;
    }
    else {
      this.currstatus = 'ALL';
    }
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
}