import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import { InternalportalserviceService } from '../../../../services/internalportal/internalportalservice.service';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
@Component({
  selector: 'app-internaltrackinvoicedetails',
  templateUrl: './internaltrackinvoicedetails.component.html',
  styleUrls: ['./internaltrackinvoicedetails.component.css']
})
export class InternaltrackinvoicedetailsComponent implements OnInit {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;

  
  data: string;
  ponumber: any;
  invoicedata: any = [];
  trackinvoicelistdata: any = [];
  invoicenumber: string;
  ponumberfortrack: any;
  status: any;
  invoiceamount: any;
  invoicedate: any;
  paidamount: any;
  user: any;
  totalamount: any;
  description: any;
  actualfilename: any;
  savedfilename: any;
  bussinesspartneroid: any;
  submitteddate: string;
  pending: boolean = false;
  mpending: boolean = false;
  pendingtime: any;
  mpendingtime: any;
  acceptedtime: any;
  accepted: boolean = false;
  rejected: boolean = false;
  rejectedtime: any;
  pendingstatus: any;
  mpendingstatus: any;
  acceptedstatus: any;
  rejectedstatus: any;
  trackInv: boolean = true;
  DecodedFile: any;
  processed: boolean;
  processedstatus: any;
  processedtime: any;
  partialpaid: boolean;
  partialpaidstatus: any;
  partialpaidtime: any;
  paid: boolean;
  paidstatus: any;
  paidtime: any;
  paymentamount: any;
  multipleactualfilename: any;
  multiplesavedfilename: any;
  individualsavedname: any = [];
  billofladingdate: any;
  actionBy: any;

  multipleactualendfilename: any;
  multiplesavedendfilename: any;
  individualsavedendname: any = [];
  taxAmount: any;
  amtexcltax: any;
  vendorremarks: any;
  enduserremarks: any;
  grnnumber: any;
  scrnNumber: any;
  resubmit: boolean = false;
  resubmitstatus: any;
  resubmittime: any;
  returnstatus: any;
  returntime: any;
  return: boolean = false;
  previoustoresubmitinvoicenumber: any;
  irnNumber: any;
  irnDate: any;
  reversed: boolean;
  reversedstatus: any;
  reversedtime: any;
  showcustomManagerList: boolean = false;
  showmanagerlist: boolean = false;
  customManagerList: any = [];
  searchColleagues;
  colleaguesList;
  //colleaguesNameList = [];
  queryString;
  colleaguesDataList: Array<colleaguesList> = [];
  statuschatmessage: any = [];
  enduserid: string;
  bussinesspartnertext: any;
  requisitioner: any;
  extensionType: any;
  original: string = "";
  property: any;
  constructor(private router: Router, private route: ActivatedRoute,
    private internalportalservice: InternalportalserviceService,
    private trackOrderListService: TrackOrderListService,
    private loaderservice: LoaderService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params); // { order: "popular" }

      this.data = atob(params.order);
      this.ponumber = atob(params.po);
      this.original = atob(params.origin);
      console.log(this.data); // popular
    }
    );
    this.invoicedata = [];
    this.internalportalservice.getlistitemsforinvoicenumbers(this.data, this.ponumber).subscribe(res => {
      this.actionBy = res[0].ACTIONBY;
      if (res[0].message == "Success") {
        this.invoicedata = res[0].poData;
        // for (let i = 0; i < this.invoicedata.length; i++) {
        //   this.invoicedata[i].INVOICEAMOUNT = Number(this.invoicedata[i].INVOICEAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
        //   this.invoicedata[i].RATEPERQTY = Number(this.invoicedata[i].RATEPERQTY).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
        // }
        for (let i = 0; i < this.invoicedata.length; i++) {
          if (this.invoicedata[i].ACCEPTEDQTY == null) {
            this.invoicedata[i].ACCEPTEDQTY = 0.00;
          }
          if (this.invoicedata[i].GRNNUMBER != null) {
            this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].ACCEPTEDQTY) * parseFloat(this.invoicedata[i].RATEPERQTY));
          }
          if (this.invoicedata[i].GRNNUMBER == null) {
            this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].QUANTITY) * parseFloat(this.invoicedata[i].RATEPERQTY));
          }
        }
        console.log("this.invoicedata ==>", this.invoicedata);
        this.invoicenumber = this.data;
        this.ponumberfortrack = this.ponumber;
        this.taxAmount = this.invoicedata[0].TAXAMOUNT;
        this.amtexcltax = this.invoicedata[0].INVOICEAMOUNT;
        this.status = this.invoicedata[0].OVERALLSTATUS;
        this.invoicedate = this.invoicedata[0].INVOICEDATE;
        this.invoiceamount = this.invoicedata[0].INVOICEAMOUNT;
        this.bussinesspartneroid = this.invoicedata[0].BUSINESSPARTNEROID
        this.paidamount = Number(this.invoicedata[0].PAYMENTAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');;
        this.user = sessionStorage.getItem("Requisitioner");
        this.totalamount = Number(this.invoicedata[0].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');;
        this.description = this.invoicedata[0].DESCRIPTION;
        this.vendorremarks = this.invoicedata[0].VENDORREMARKS;
        this.enduserremarks = this.invoicedata[0].USERREMARK;
        this.billofladingdate = this.invoicedata[0].BILLOFLADINGDATE;
        this.actualfilename = this.invoicedata[0].ACTUALFILENAME;
        this.savedfilename = this.invoicedata[0].SAVEDFILENAME;
        this.grnnumber = this.invoicedata[0].GRNNUMBER;
        this.scrnNumber = this.invoicedata[0].SCRNNUMBER;
        this.irnNumber = this.invoicedata[0].IRNNUMBER;
        this.irnDate = this.invoicedata[0].IRNDATE;
        this.bussinesspartnertext = this.invoicedata[0].BUSSINESSPARTNERTEXT;
        this.requisitioner = this.invoicedata[0].REQUSITIONER;

        if (this.invoicedata[0].MULTIACTUALFILENAME != null) {
          this.multipleactualfilename = this.invoicedata[0].MULTIACTUALFILENAME;
          console.log("this.multipleactualfilename" + this.multipleactualfilename);
          this.multiplesavedfilename = this.invoicedata[0].MULTISAVEDFILENAME;
          console.log("this.multiplesavedfilename " + this.multiplesavedfilename);
          var array = this.multiplesavedfilename.split(',');
          console.log("array " + array[0]);
          this.individualsavedname = [];
          for (var k = 0; k < array.length; k++) {
            this.individualsavedname.push(array[k]);
          }
        }
        if (this.invoicedata[0].ENDUSERSUPPACTUALFILE != null) {
          this.multipleactualendfilename = this.invoicedata[0].ENDUSERSUPPACTUALFILE;
          console.log("this.multipleactualfilename" + this.multipleactualfilename);
          this.multiplesavedendfilename = this.invoicedata[0].ENDUSERSUPPSAVEDFILE;
          console.log("this.multiplesavedfilename " + this.multiplesavedendfilename);
          var array = this.multiplesavedendfilename.split(',');
          console.log("array " + array[0]);
          this.individualsavedendname = [];
          for (var k = 0; k < array.length; k++) {
            this.individualsavedendname.push(array[k]);
          }
        }
        this.paymentamount = this.invoicedata[0].PAYMENTAMOUNT;
        this.submitteddate = this.invoicedata[0].INVOICEDATE;
        console.log("this.invoicenumber ==>" + this.invoicenumber);
        console.log("this.ponumber ==>" + this.ponumber);
        this.internalportalservice.trackinvoicestatusforinternal(this.invoicenumber, this.ponumber,
        ).subscribe(res => {

          if (res[0].message == "Success") {
            this.trackinvoicelistdata = res[0].trackstatusListdata;
            for (var z = 0; z < this.trackinvoicelistdata.length; z++) {
              console.log(this.trackinvoicelistdata[z].PENDINGMODIFIEDTIME);
              if (this.trackinvoicelistdata[z].PENDINGSTATUS) {
                this.pending = true;
                this.pendingstatus = this.trackinvoicelistdata[z].PENDINGSTATUS;
                this.pendingtime = this.trackinvoicelistdata[z].PENDINGMODIFIEDTIME;
              }
              else if (this.trackinvoicelistdata[z].RESUBMITSTATUS) {
                console.log("inini");
                this.resubmit = true;
                this.resubmitstatus = this.trackinvoicelistdata[z].RESUBMITSTATUS;
                this.resubmittime = this.trackinvoicelistdata[z].RESUBMITMODIFIEDTIME;
                this.previoustoresubmitinvoicenumber = this.trackinvoicelistdata[z].RESUBMITTEDINVOICENO;

              }
              else if (this.trackinvoicelistdata[z].RETURNSTATUS) {
                console.log("inini");
                this.return = true;
                this.returnstatus = this.trackinvoicelistdata[z].RETURNSTATUS;
                this.returntime = this.trackinvoicelistdata[z].RETURNMODIFIEDTIME;
              }

              else if (this.trackinvoicelistdata[z].MPENDINGSTATUS) {
                console.log("inini");
                this.mpending = true;
                this.mpendingstatus = this.trackinvoicelistdata[z].MPENDINGSTATUS;
                this.mpendingtime = this.trackinvoicelistdata[z].MPENDINGMODIFIEDTIME;
              }
              else if (this.trackinvoicelistdata[z].ACCEPTEDSTATUS) {
                this.accepted = true;
                this.acceptedstatus = this.trackinvoicelistdata[z].ACCEPTEDSTATUS;
                this.acceptedtime = this.trackinvoicelistdata[z].ACCEPTEDMODIFIEDTIME;
              }
              else if (this.trackinvoicelistdata[z].REJECTEDSTATUS) {
                this.rejected = true;
                this.rejectedstatus = this.trackinvoicelistdata[z].REJECTEDSTATUS;
                this.rejectedtime = this.trackinvoicelistdata[z].REJECTEDMODIFIEDTIME;
              }
              else if (this.trackinvoicelistdata[z].PROCESSEDSTATUS) {
                this.processed = true;
                this.processedstatus = this.trackinvoicelistdata[z].PROCESSEDSTATUS;
                this.processedtime = this.trackinvoicelistdata[z].PROCESSEDMODIFIEDTIME;
              }
              else if (this.trackinvoicelistdata[z].PARTIALLYPAIDSTATUS) {
                this.partialpaid = true;
                this.partialpaidstatus = this.trackinvoicelistdata[z].PARTIALLYPAIDSTATUS;
                this.partialpaidtime = this.trackinvoicelistdata[z].PARTIALLYPAIDMODIFIEDTIME;
              }
              else if (this.trackinvoicelistdata[z].FULLYPAIDSTATUS) {
                this.paid = true;
                this.paidstatus = this.trackinvoicelistdata[z].FULLYPAIDSTATUS;
                this.paidtime = this.trackinvoicelistdata[z].FULLYPAIDSTATUSMODIFIEDTIME;
              }
              else if (this.trackinvoicelistdata[z].REVERSEDSAPSTATUS) {
                this.reversed = true;
                this.reversedstatus = this.trackinvoicelistdata[z].REVERSEDSAPSTATUS;
                this.reversedtime = this.trackinvoicelistdata[z].REVERSEDSAPMODIFIEDTIME;
              }

            }

          }
        });

      }

    });

    this.getmanagercount(this.data, this.ponumber);
    this.getstatuschatmessages(this.data, this.ponumber);
    this.getCustomManager(this.data, this.ponumber);
  }


  trackInvoice() {
    this.trackInv = !this.trackInv
  }


  getstatuschatmessages(invnum, ponum) {
    this.internalportalservice.getstatuschatmessages(invnum, ponum).subscribe(res => {
      console.log(res[0], "res[0]-----------------------------")
      if (res[0].message == "Success") {
        this.statuschatmessage = res[0].poQueryList;
      }
      console.log(this.statuschatmessage, '==============customManagerListNames==============',);
    });
  }
  // downloadfile() {
  //   // this.loaderservice.show();
  //   console.log(this.savedfilename);
  //   this.DecodedFile = [];
  //   this.trackOrderListService.getinternalfile(this.savedfilename, 'listdownload')
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
  //       // this.loaderservice.hide();
  //     }, err => {
  //       // this.loaderservice.hide();
  //       console.log(JSON.stringify(err))
  //     }
  //     );

  // }

  downloadfile(savedfilename, actualfilename, type) {
    if (savedfilename == "" || savedfilename == null || actualfilename == "" || actualfilename == null
      || savedfilename == undefined || actualfilename == undefined) {
      this.dialogBox.popUpOpen2("File not present", 'success', 'purchaseorderlist');
      return;
    }
    this.loaderservice.show();
    this.trackOrderListService.getfile(savedfilename, type)
      .subscribe(result => {
        console.log(result);
        console.log("filename===>" + actualfilename);
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
            if (type == 'listdownload') {
              window.navigator.msSaveOrOpenBlob(blob, actualfilename);
            }
            else if (type == 'multiplefiledownload') {
              window.navigator.msSaveOrOpenBlob(blob, "Supporting_Invoice_Document.zip");
            }

          }
          else if (agent.indexOf('firefox') > -1) {
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: "application/octet-stream" });
            if (type == 'listdownload') {
              saveAs(blob, actualfilename);
            }
            else if (type == 'multiplefiledownload') {
              saveAs(blob, "Supporting_Invoice_Document.zip");

            }
          }
          else {
            console.log(data, 'data')
            let FileToDownload = 'data:application/octet-stream;base64,' + data;
            var link = document.createElement("a");
            if (type == 'listdownload') {
              const filename = actualfilename;
              link.href = FileToDownload;
              link.download = filename;
 // link.click();
 var extensionName=filename.substr(filename.lastIndexOf('.') + 1)
 this.getFileType(extensionName);
 this.trackOrderListService.downloadEncryptedFile(data,this.extensionType);            }
            else if (type == 'multiplefiledownload') {
              const filename = "Supporting_Invoice_Document.zip";
              link.href = FileToDownload;
              link.download = filename;
              link.click();
            }
          }
          this.loaderservice.hide();
        }
        else if (result[0].reason != 'none') {
          this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
        }
        // else if (result[0].status == "Fail") {
        // 	this.dialogBox.popUpOpen2(result[0].message ,'success','purchaseorderlist');
        // }
        // this.loaderservice.hide();
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
  getmanagercount(inv_num, po_num) {
    this.internalportalservice.getmanagercountdetails(inv_num, po_num).subscribe(res => {
      if (res[0].managerlist[0] != null) {
        console.log(res[0].managerlist[0], "response")
        this.showmanagerlist = false;
        this.showcustomManagerList = true;
      }
      else {
        this.showmanagerlist = true;
        this.showcustomManagerList = false;
      }
    });
  }
  getCustomManager(inv_num, po_num) {
    // debugger;
    this.internalportalservice.getMultipleManagerList(inv_num, po_num).subscribe(res => {
      if (res[0].invoiceData.length > 0) {
        this.customManagerList = res[0].invoiceData;
        this.enduserid = this.customManagerList[0].ENDUSEID;
        this.property=this.customManagerList[0].ENDUSERSTATUS;

        if (this.customManagerList[0].EUMANAGER != null) {
          console.log("EUMANAGER=========>", this.customManagerList[0].ENDUSEID, this.customManagerList[0].ENDUSERSTATUS);
          this.customManagerList.unshift({
            BUYERID: this.customManagerList[0].BUYERID,
            ENDUSEID: this.customManagerList[0].ENDUSEID,
            ENDUSERSTATUS: this.customManagerList[0].ENDUSERSTATUS,
            EUMANAGER: this.customManagerList[0].ENDUSEID,
            INVOICEDATE: this.customManagerList[0].INVOICEDATE,
            INVOICENUMBER: this.customManagerList[0].INVOICENUMBER,
            MODIFIEDDATE: this.customManagerList[0].MODIFIEDDATE,
            PO_NUMBER: this.customManagerList[0].PO_NUMBER,
            STAGE: this.customManagerList[0].STAGE,
            STATUS: this.customManagerList[0].ENDUSERSTATUS,
            TOTALAMOUNT: this.customManagerList[0].TOTALAMOUNT,
            VENDORID: this.customManagerList[0].VENDORID,
          })
        }
        console.log(this.customManagerList, '==============getMultipleManagerList==============',);
        for (let loop = 0; loop <= this.customManagerList.length - 1; loop++) {
          if (this.customManagerList[loop].EUMANAGER != null) {
            var name = this.customManagerList[loop].EUMANAGER.match(/^([^.]*)./)[1];
            this.getColleaguesData(name);
            console.log("is output========>", name);
            // this.property=this.customManagerList[0].ENDUSERSTATUS;
            // console.log("oooooooooooooo",this.property);
            
          }
        }
      }
      console.log(this.customManagerList, '==============getMultipleManagerList==============',);
    });
  }
  getColleaguesData(searchString) {
    this.colleaguesDataList = [];
    this.internalportalservice.searchPeople(searchString,true.valueOf,'NA','NA').subscribe(res => {
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
            tempColleages.name = element['NAME'];
            tempColleages.designation = element['DESIGNATION']
            this.colleaguesDataList.push(tempColleages);
            if (this.queryString != null && this.queryString != undefined && this.queryString != "") {
            }
          });
          console.log("this.colleaguesDataList", this.colleaguesDataList);
          this.colleaguesList = this.colleaguesDataList;
          $("#search").focus();
        }
        else {
        }
      }
    }, err => {
    });
  }

  openapproval(n) {
    console.log(n);
    let approvalBox = document.getElementById("approvalBox" + n);
    let closeArrow = document.getElementById("closeArrow" + n);
    let openArrow = document.getElementById("openArrow" + n);
    if (approvalBox.style.display === "none") {
      approvalBox.style.display = "block";
      closeArrow.style.display = "block";
      openArrow.style.display = "none";
    } else {
      approvalBox.style.display = "none";
      openArrow.style.display = "block";
      closeArrow.style.display = "none";
    }
  }

  routetooriginal()
  {
    if(this.original == 'trackinvoice')
    {
      this.router.navigate(['./internalinvoicelist']);
    }
    else if(this.original == 'internaldashboard')
    {
      this.router.navigate(['./internalportal']);
      this.router.navigate(['/internalportal'], { queryParams: { productid: true } })
    }
    

  }

  toggle(index){
    // $('.messagescrollMore').hide();
    // const findthis = $(this).closest(".chatmessageWrapper").find('.messagescrollMore').toggle();
    // console.log(findthis);
    // $('.prevChar').toggle();
    // $('#showId' + index).removeClass('prevChar')
    if ($('#showId' + index).hasClass('showNothing')){
      $('#showId' + index).removeClass('showNothing');
    }else{
      $('#showId' + index).addClass('showNothing');
    }
    if ($('#messagescrollMore' + index).hasClass('showNothing')){
      $('#messagescrollMore' + index).removeClass('showNothing');
      $('#messagescrollMore' + index).addClass('showMore');
      $('#messagescrollMore' + index).toggleClass('showMore');
    }else{
      $('#messagescrollMore' + index).removeClass('showMore');
      $('#messagescrollMore' + index).addClass('showNothing');
    }
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