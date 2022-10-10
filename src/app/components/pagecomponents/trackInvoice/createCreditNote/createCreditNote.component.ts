import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from './../../../../services/LoaderService/loader.service';
import{Router,ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { InternalportalserviceService } from 'app/services/internalportal/internalportalservice.service';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import * as moment from 'moment/moment';
declare var $: any;
import { saveAs } from 'file-saver';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import { parse } from 'path';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from 'app/components/commoncomponents/popup/popup.component';


@Component({
  selector: 'app-createCreditNote',
  templateUrl: './createCreditNote.component.html',
  styleUrls: ['./createCreditNote.component.css']
})
export class createCreditNoteComponent implements OnInit {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;

  invoiceNumber:any;
  ponumber:any;
  creditAdviceList : any =[];
  adviceNo:any;
  vendorPortal :boolean = false; 
  viewUploadFile: any = null;
  viewAttachmentName: string = "";
  AttachmentValidExtension: string[] = ["PDF"];
  fileAttachmentError: string = "";
  InvalidAttachmentFileError =
  "Selected file is having Invalid extension. Valid file extensions are pdf, jpg & jpeg.";
  successmessage: string;
  success: boolean = false;
  error: boolean = false;
  actualfilename: any;
  savedfilename: string;
  invoiceconfile: string;
  invoicefilechanged: boolean = false;
  pageName:any;
  totalAmount:any=0;
  creditNoteNo:any;
  saveFileName: any;
  actualFileName:any;
  exceeded:boolean=false;
  extensionType: any;

  public creditNoteList = new FormGroup({
    amount: new FormControl('', Validators.required),
    tax: new FormControl('', Validators.required),
    totalamt: new FormControl('', Validators.required),
    attachments:new FormControl('',Validators.required)
  })
  public creditNoteDetails = new FormGroup({
    amount: new FormControl('', Validators.required),
    tax: new FormControl('', Validators.required),
    totalamt: new FormControl('', Validators.required),
    attachments:new FormControl('',Validators.required)
  })
  DecodedFile: any;
  constructor(private router: Router,private route: ActivatedRoute,private internalportalservice:InternalportalserviceService,
    private purchaseOrderListService: PurchaseOrderListService,private trackOrderListService: TrackOrderListService,private loader: LoaderService,
    public dialog: MatDialog) { }
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.invoiceNumber = atob(params.order);
      this.ponumber = atob(params.po);
      this.adviceNo = atob(params.adviceNo);
      this.pageName = atob(params.showCreditDetails);
      if(params.creditNoteNo != null){
        this.creditNoteNo = atob(params.creditNoteNo);
      }
      console.log("this.creditNoteNo ==> "+this.creditNoteNo);
    });
    console.log("this.creditNoteNo ==> "+this.creditNoteNo);
    if(this.pageName == 'trackInvoice'){
      this.getCreditNoteDetails();
    }
    else
    {
      this.getInternalCreditNoteDetails();
    }
    var type = sessionStorage.getItem("portaltype");
    if(type == 'vendorportal')
        {
          this.vendorPortal = true;
          this.getCreditAdviceDetails();
        }else{
          this.vendorPortal = false;
          this.getinternalcreditadviceDetails();
        }
  }

  getCreditAdviceDetails(){
    this.internalportalservice.getcreditadviceDetails( this.invoiceNumber,this.ponumber).subscribe(res=>{
      this.creditAdviceList = res[0].poData;
      for(let i=0; i<this.creditAdviceList.length; i++){
        this.creditAdviceList[i].SHORTQTY = parseFloat(this.creditAdviceList[i].SHORTQTY )* 1;
        this.creditAdviceList[i].ACCEPTEDQTY = parseFloat(this.creditAdviceList[i].ACCEPTEDQTY )* 1;
        console.log( " this.creditAdviceList[i].SHORTQTY",this.creditAdviceList[i].SHORTQTY)
      }
      this.calculateTotalAmount();

    })
  }
  getinternalcreditadviceDetails(){
    this.internalportalservice.getinternalcreditadviceDetails( this.invoiceNumber,this.ponumber).subscribe(res=>{
      this.creditAdviceList = res[0].poData;
      for(let i=0; i<this.creditAdviceList.length; i++){
        this.creditAdviceList[i].SHORTQTY = parseFloat(this.creditAdviceList[i].SHORTQTY)* 1 ;
        this.creditAdviceList[i].ACCEPTEDQTY = parseFloat(this.creditAdviceList[i].ACCEPTEDQTY )* 1;
        console.log( " this.creditAdviceList[i].SHORTQTY",this.creditAdviceList[i].SHORTQTY)

      }
      this.calculateTotalAmount();

    })
  }

  
  createCreditNote(){
    console.log("value===>", this.creditNoteList.value, "number============>",Number(this.creditNoteList.controls.amount.value));
    
    this.internalportalservice.createcreditNote(sessionStorage.getItem('Bid'),this.adviceNo,this.invoiceNumber,this.ponumber,Number(this.creditNoteList.controls.amount.value),Number(this.creditNoteList.controls.tax.value),Number(this.creditNoteList.controls.totalamt.value), 
    this.viewAttachmentName,this.savedfilename).subscribe(res=>{
      if(res[0].count>0)
      {
        this.dialogBox.popUpOpen2(res[0].message,'success','trackinvoicecreditnote');
      }else
      {
        this.dialogBox.popUpOpen2('Credit Note has been submitted successfully','success','trackinvoicecreditnote');

      }
        
    })
  }
  
  getCreditNoteDetails(){
    this.internalportalservice.getCreditNoteDetails(this.adviceNo,this.invoiceNumber,this.ponumber).subscribe(res=>{
      res[0].poData[0].AMOUNT = Number(res[0].poData[0].AMOUNT).toFixed(2);
      res[0].poData[0].TAX =  Number(res[0].poData[0].TAX).toFixed(2);
      res[0].poData[0].TOTALAMT =Number(res[0].poData[0].TOTALAMT).toFixed(2);

      console.log("Hello",res[0].poData[0].AMOUNT,res[0].poData[0].TAX,res[0].poData[0].TOTALAMT);
      
        this.creditNoteDetails.controls['amount'].setValue(res[0].poData[0].AMOUNT);
        this.creditNoteDetails.controls['tax'].setValue(res[0].poData[0].TAX);
        this.creditNoteDetails.controls['totalamt'].setValue(res[0].poData[0].TOTALAMT);
        this.saveFileName = res[0].poData[0].SAVEDFILENAME;
        this.actualFileName = res[0].poData[0].ACTUALFILENAME;
    })
  }

  getInternalCreditNoteDetails(){
    this.internalportalservice.getInternalCreditNoteDetails(this.adviceNo,this.invoiceNumber,this.ponumber).subscribe(res=>{
      res[0].poData[0].AMOUNT = Number(res[0].poData[0].AMOUNT).toFixed(2);
      res[0].poData[0].TAX =  Number(res[0].poData[0].TAX).toFixed(2);
      res[0].poData[0].TOTALAMT =Number(res[0].poData[0].TOTALAMT).toFixed(2);  
      
      this.creditNoteDetails.controls['amount'].setValue(res[0].poData[0].AMOUNT);
        this.creditNoteDetails.controls['tax'].setValue(res[0].poData[0].TAX);
        this.creditNoteDetails.controls['totalamt'].setValue(res[0].poData[0].TOTALAMT);
        this.saveFileName = res[0].poData[0].SAVEDFILENAME;
        this.actualFileName = res[0].poData[0].ACTUALFILENAME;
    })
  }

  calculateTotalAmount(){
    this.totalAmount = 0
    for(let a=0 ; a<this.creditAdviceList.length ; a++){
      this.totalAmount += Number(this.creditAdviceList[a].SHORTAMOUNT);
      this.totalAmount = Math.round(this.totalAmount*100)/100;
      this.creditNoteList.controls.amount.setValue(Number(this.totalAmount).toFixed(2));

    }
  }

  exceededAmount(){
    if(this.creditNoteList.controls['totalamt'].value != 0){
      if(parseFloat(this.creditNoteList.controls['totalamt'].value) >= parseFloat(this.creditNoteList.controls['amount'].value)){
        this.exceeded = false;
      }else{
        this.exceeded=true;
      }
    }
  }
  onFileSelectEvent(e, type) {
    console.log(e.target.files[0]);
    var specialChars = "<>@!#$%^&*()+[]{}?:;_|'\"\\,/~`-=";
    var checkForSpecialChar = function(string){
     for(var j = 0; j < specialChars.length;j++){
       if(string.indexOf(specialChars[j]) > -1){
           return true
        }
     }
     return false;
    }
    var _validFileExtensions = [".PDF"];
    var ValidateSingleInput = function(string){
      for(var j = 0; j < _validFileExtensions.length;j++){
        if(string.toUpperCase().indexOf(_validFileExtensions[j]) > -1){
            return false
         }
      }
      return true;
     }

    if(checkForSpecialChar(e.target.files[0].name.toUpperCase())){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'Filename can have spaces but no special characters',
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

      // this.filecount -= 1
      // this.filecount = this.filecount - 1;
      return;
    }
    else if(ValidateSingleInput(e.target.files[0].name.toUpperCase())){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'Only pdf file is allowed',
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

      // this.filecount -= 1
      // this.filecount = this.filecount - 1;
      return;
    }
    else{
      this.viewUploadFile = null;
      this.viewAttachmentName = "";
      console.log(e.target.files[0]);
      if (this.validateFileExtension(e.target.files[0].name)) {
        this.invoicefilechanged = true;
        this.fileAttachmentError = "";
        this.viewUploadFile = e.target.files[0];
        if (type == "invoice") {
          this.invoiceconfile = e.target.files[0];
          this.viewAttachmentName = this.viewUploadFile.name;
          console.log("this.viewAttachmentName " + this.viewAttachmentName);
        }
        this.actualfilename = this.viewUploadFile.name;
        console.log("this.invoiceconfile " + this.invoiceconfile);
        console.log("this.viewAttachmentName ==> " + this.viewAttachmentName);
        var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
        fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
        var fileName2 = fileName;
        fileName = this.ponumber + "_invoicecreditnote_" + fileName;
        this.savedfilename = fileName;
        console.log("savedfilename ==>" + this.savedfilename);
        this.loader.show();
        this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
          console.log(JSON.stringify(res))
          this.loader.hide();
          res[0].data = true;
          if (res.length == 0) {
            return false;
          }
          else if (res[0].status == "Success") {
          }
          else {
            // this.toastr.error(res[0].message)
            this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
            this.successmessage = "Error while submitting. Please try again";
            this.error = true;
            this.showPopup();
            //=-- this.dialogBox.popUpOpen2('Maximum file size (10 MB) exceeded.', 'donate', 'error2');
            return false;
          }
  
        });
        err => {
          // this.toastr.error(err)
          this.successmessage = err;
          this.error = true;
          this.showPopup();
          this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'error', 'invoicesubmit');
          // =--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
          return false;
        }
        // console.log(this.viewAttachmentName);
        // this.neftgroup.confile.name=this.viewAttachmentName;
      }
      else {
        //Assign error message to class.
        this.fileAttachmentError = this.InvalidAttachmentFileError;
      }
    }


    $(".fileSelectBtn").blur();
  }
  getFileNameWOExtention(name) {
    // return name.split(".")[0];
    var flName = name.substr(0, name.lastIndexOf(".")).replace(/_/g, "-").replace(/\./g, "-");
    return flName;
  }
  
  getTimeStampFileName(fileName, extension) {
    console.log(Date.now().toString());
    return fileName + Date.now().toString() + "." + extension;
  }
  validateFileExtension(fileName) {
    let fileExtension: string = this.getExtensionOfFile(fileName);
    for (let i = 0; i < this.AttachmentValidExtension.length; i++) {
      if (this.AttachmentValidExtension[i] == fileExtension.toUpperCase())
        return true;
    }
    return false;
  }
  getExtensionOfFile(name) {
    return name.split(".")[name.split(".").length - 1];
  }
  showPopup() {
    // this.purchaseOrderListModel.PONumber = poNumber;
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
  }
  close() {
    this.viewAttachmentName = '';
    this.viewAttachmentName = null;
    this.viewUploadFile = null;
    this.viewUploadFile = '';
    this.creditNoteList.controls['attachments'].reset();

  }

  numberOnlyTotal(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#total').val().split('.').length === 2 )) ) {

      console.log("working")
      return false;
    }
    if (this.hasDecimalPlace(event.target.value, 2)) {
      return false
    }
    console.log(" No working")
    return true;
  }
  numberOnlyTax(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#tax').val().split('.').length === 2 )) ) {

      console.log("working")
      return false;
    }
    if (this.hasDecimalPlace(event.target.value, 2)) {
      return false
    }
    console.log(" No working")
    return true;
  }
  numberOnlyAmount(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#amount').val().split('.').length === 2 )) ) {

      console.log("working")
      return false;
    }
    if (this.hasDecimalPlace(event.target.value, 2)) {
      return false
    }
    console.log(" No working")
    return true;
  }
  hasDecimalPlace(value, x) {
    var pointIndex = value.indexOf('.');
    return pointIndex >= 0 && pointIndex < value.length - x;
  }
  download() {
    var singlepodownload="listdownload";
    console.log("this.saveFileName "+this.saveFileName)
    if(this.saveFileName =="" || this.saveFileName ==null || this.actualFileName =="" || this.actualFileName ==null
    ||this.saveFileName == undefined ||this.actualFileName == undefined)
    {
      this.dialogBox.popUpOpen2("File not present" ,'success','purchaseorderlist');
      return;
    }
    console.log(this.saveFileName);
    this.DecodedFile = [];
    this.trackOrderListService.getfile(this.saveFileName, singlepodownload)
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
            window.navigator.msSaveOrOpenBlob(blob, this.actualFileName);
          }
          else if (agent.indexOf('firefox') > -1) {
            var byteCharacters = atob(data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], { type: "application/octet-stream" });
            saveAs(blob, this.actualFileName);
          }
          else {
            console.log(data, 'data')
            let FileToDownload = 'data:application/octet-stream;base64,' + data;
            var link = document.createElement("a");
            const filename = this.actualFileName;
            link.href = FileToDownload;
            link.download = filename;
// link.click();
var extensionName=filename.substr(filename.lastIndexOf('.') + 1)
this.getFileType(extensionName);
this.trackOrderListService.downloadEncryptedFile(data,this.extensionType);          }

        }
        else if(result[0].reason != 'none')
        {
          this.dialogBox.popUpOpen2(result[0].reason ,'success','purchaseorderlist');
        }
        // else if (result[0].status == "Fail") {
				// 	this.dialogBox.popUpOpen2(result[0].message ,'success','purchaseorderlist');
				// }
      }, err => {
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
  calculateTax(){
    this.creditNoteList.controls['tax'].setValue(0);
      let tax = parseFloat(this.creditNoteList.controls['totalamt'].value) - parseFloat(this.creditNoteList.controls['amount'].value);
      if (isNaN(tax)) {
        tax = this.creditNoteList.controls['totalamt'].value
      }
      tax= Math.round(tax *100)/100
      this.creditNoteList.controls.tax.setValue(tax);
  }

  numberOnlytax(event, i): boolean {
    // this.editing=false;
    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#taxAmount').val().split('.').length === 2))) {

      console.log("working")

      // this.dotpresent=false;

      return false;

    }


    if (this.hasDecimalPlace(event.target.value, 2)) {
      return false
    }

    console.log(" No working")

    return true;
  }
}