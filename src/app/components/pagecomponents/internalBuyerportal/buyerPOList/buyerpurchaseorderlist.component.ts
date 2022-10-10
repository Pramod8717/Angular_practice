import { Component, OnInit } from '@angular/core';
import { purchaseOrderListModel } from 'app/models/purchaseorderlist.model';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { InternalportalserviceService } from '../../../../services/internalportal/internalportalservice.service';
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buyerpurchaseorderlist',
  templateUrl: './buyerpurchaseorderlist.component.html',
  styleUrls: ['./buyerpurchaseorderlist.component.css']
})
export class BuyerpurchaseorderlistComponent implements OnInit {

  purchaseOrderListModel = new purchaseOrderListModel();
  emailid: any;
  poDataList: any = [];
  totalItems: any;
  mPageNo: number = 1;
  pageSize = 50;
  pgNolist: any[];
  uniqueBid: any;
  uniquePONumber: any;
  statusList: any[];
  recipientEmail: any;
  messageList: any[];
  topic: any;
  validate:any;
  confirmationNoAction: boolean;
  DecodedFile: any;
  downloaddatalist: any[];
  constructor(private internalportalservice:InternalportalserviceService,private router: Router,
    private purchaseOrderListService: PurchaseOrderListService,private loaderservice: LoaderService) { }

  ngOnInit(): void {
    this.getpurchaseorderlist();
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

  showPopup(ev, poNumber) {
    console.log("is it ??", poNumber)
    this.purchaseOrderListModel.PONumber = poNumber;
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
  }
  getpurchaseorderlist()
  {
    this.emailid = sessionStorage.getItem("username");
    this.internalportalservice.getInternalPoData(this.emailid,'ALL','NA','NA', 'NA','NA','NA','NA','NA','NA').subscribe(res => {
      console.log(res,'Response-----------------------')
      this.poDataList = res[0].poData;
      this.totalItems = this.poDataList.length

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
    });
  }
      
   
  getPurOrderList(event) {
    // this.loaderservice.show();
    setTimeout(() => {
      let pageNo = this.pageSize;
      let Mpage = event * this.pageSize - 1;
      this.pgNolist = [];
      if (event > 1) {
        for (var m = pageNo; m <= Mpage; m++) {
          this.pgNolist.push(this.poDataList[m]);
        }
        console.log("this.pgNolist" + this.pgNolist);
      }
      else if (event == 1) {
        this.getpurchaseorderlist();
        // this.loaderservice.hide();
      }
    }, 500);err => {
      // this.loaderservice.hide();
    }
  }
   
  getmessageStatus() {
    // this.loaderservice.show();
    this.internalportalservice.getInternalPOReadStatus().subscribe(res => { console.log("response", res[0].poQueryList)
    // this.purchaseOrderListService.getChatStatus().subscribe(res => {
      if (res[0].message != "No Data Found for given Vendor Id") {
        console.log("is Data Coming??", res[0].poQueryList);
        this.statusList = res[0].poQueryList
      }
      else {
        this.statusList = [];
      }
      this.loaderservice.hide()

    });err=>{

  this.loaderservice.hide();  }
  }
  
  getStatusUpdate(bid, poNumber,invNumber, index) {
    this.uniqueBid=bid
    this.uniquePONumber =  poNumber;
this.uniquePONumber = invNumber;
this.internalportalservice.getChatStatusUpdate(bid, poNumber,invNumber).subscribe(res => {
    // this.purchaseOrderListService.getReadStatusUpdate(poNumber).subscribe(res => {
      console.log("is it Updating ??", res);

      if(res[0].message=="Success"){
        $("#green" + index).addClass('displayNone');
        $("#green" + index).removeClass('displayBlock');
        $("#white" + index).addClass('displayBlock');
        $("#white" + index).removeClass('displayNone');
    }
    }); err => { }
  }

  getQuerry(poNumber, contactPersonMail) {
    this.recipientEmail = contactPersonMail;
    sessionStorage.setItem("receiverMail", contactPersonMail)
    this.internalportalservice.getInternalPOMessages(poNumber).subscribe(res => {
      console.log("resposne", res[0].message)
      this.messageList = [];
      this.topic = poNumber
      if (res[0].poQueryList[0] != undefined) {
        for(let i=0 ; i<(res[0].poQueryList).length; i++){
          console.log(res[0].poQueryList[i].INVOICENUMBER,"inv number");
          
        if(res[0].poQueryList[i].INVOICENUMBER==null)
        this.messageList.push(res[0].poQueryList[i])
        }

      }
      // else {
      //   this.messageList = res[0].message
      // }
      console.log(this.messageList)
    })
  }

  sendMessage(status, message, subject, topic) {
    // $(".messageChatWrapper").stop().animate({ scrollTop: $(".messageChatWrapper")[0].scrollHeight}, 500);

    
    if ((message == undefined && subject != 'SubmitQuery') || (message == ''  && subject != 'SubmitQuery')) 
   {
      message = "PO Accepted";
    }
      else if( subject != 'SubmitQuery'){
      message="PO Rejected -"+ message   
      }
    console.log("AM I ???",status,message);
    console.log(this.uniquePONumber,this.purchaseOrderListModel.PONumber);
    // this.purchaseOrderListService.submitConfirmation(this.purchaseOrderListModel.PONumber, this.uniquePONumber,  this.uniqueInvNumber, status, message, subject, topic).subscribe(res => {
    this.internalportalservice.sendInternalMessage(this.purchaseOrderListModel.PONumber, status, message, subject, topic).subscribe(res => {
      console.log("what is the response?" , res[0].message)

      if (res[0].message == "Success") {
        // this.dialogBox.popUpOpen2('Message submited successfully.','success','purchaseorderlist');
        // this.ngOnInit(); 
    //     $("#popup2").css("visibility", "hidden");
    // $("#popup2").css("opacity", "0");
    // location.reload();
    // this.validate=true;
    this.confirmationNoAction=false;
    // this.getPurChaseOrderList();
    // this.getmessageStatus();       //  this.getQuerry(topic,'')
        // this.message = ' ';
        this.messageList = [];
        this.internalportalservice.getInternalPOMessages(topic).subscribe(res => {
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
      else
      {
        this.internalportalservice.getInternalPOMessages(topic).subscribe(res => {
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
  sortData(value)
  {
    console.log(value)
  }
 
  downloadlist() {
    // this.loaderservice.show();
    this.downloaddatalist = [];
    console.log("this.poDataList to be downloaded ==>" + this.poDataList);
    for (var i = 0; i < this.poDataList.length; i++) {
      console.log("this.poDataList[i][31]" + this.poDataList[i]['PO_NUMBER']);
      this.downloaddatalist.push(this.poDataList[i]['PO_NUMBER']);
    }
    this.purchaseOrderListService.getinternalpolistfile(this.emailid,'',
      '','', '','',
      '','','','').subscribe(res => {
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
            link.click();


          }
        }
        this.loaderservice.hide();
      }
      else {
        this.loaderservice.hide();
        // this.dialogBox.popUpOpen2('Failed to download !!', 'error', 'puchaseorderlist');
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

}
