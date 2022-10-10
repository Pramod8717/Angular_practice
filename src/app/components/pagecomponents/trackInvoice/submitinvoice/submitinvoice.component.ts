import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { LoaderService } from 'app/services/LoaderService/loader.service';
// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
// import moment = require('moment');
import * as moment from 'moment/moment';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../../../commoncomponents/popup/popup.component';

declare var $: any;

@Component({
  selector: 'app-submitinvoice',
  templateUrl: './submitinvoice.component.html',
  styleUrls: ['./submitinvoice.component.css']
})
export class SubmitInvoiceComponent implements OnInit {
  IGST: boolean = true;
  invoice: boolean = true;
  irndetail: boolean = false;
  bignumber: boolean = false;
  bignumbercgst: boolean = false;
  bignumbersgst: boolean = false;
  isReadOnly: boolean = false;
  specificcgst: boolean = false;
  specificsgst: boolean = false;
  disable: boolean = false;
  successmessage: string;
  podetail = [];
  igstlist = [];
  cgstandsgstlist = [];
  // invoiceDate : any;
  ponumber: string;
  bussinesspartnertext: string;
  category: string;
  costcenter: string;
  lineitemnumber: string;
  lineitemtext: string;
  quantity: string;
  unitofmeasure: string;
  contactpersonemailid: string;
  contactpersonphone: string;
  company: string;
  plant: string;
  department: string;
  data: string;
  vendor: string;
  contactemail: string;
  ordernumber: string;
  //file upload
  viewUploadFile: any = null;
  multiplefilechanged: boolean = false;
  invoiceconfile: string;
  viewAttachmentName: string = "";
  submitbutton: string = "";
  AttachmentValidExtension: string[] = ["CSV"];
  AttachmentValidExtensionForInvoice: string[] = ["PDF"];
  isUpload: boolean;
  
  ArrayOfSelectedFile: any[] = [];
  fileAttachmentError: string = "";
  success: boolean = false;
  error: boolean = false;
  maxdate: Date;
  mindate:Date;
  confirmationNoAction: boolean = false;
  invoiceStatus: string = "";
  timestampnow = Date.now().toString();
  //fileAttachmentError = [];
  InvalidAttachmentFileError =
    "Selected file is having Invalid extension. Valid file extensions are pdf, jpg & jpeg.";


  public InvoiceForm = new FormGroup({
    IRNNo: new FormControl(''),
    IRNDate: new FormControl(''),
    Useremail: new FormControl('', Validators.required),
    Invnumber: new FormControl('', Validators.required),
    attachments: new FormControl('', Validators.required),
    InvDate: new FormControl('', Validators.required),
    Invamount: new FormControl('', Validators.required),
    billofladingdate: new FormControl(''),
    // IGSTValue: new FormControl('', ),
    // CGSTValue: new FormControl('', ),
    // SGSTValue: new FormControl('', ),
    // TotalValue: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    // attachments: new FormControl('', Validators.required),

    // PONumber: new FormControl('', Validators.required),
    // Status: new FormControl('', Validators.required),
    // selectPO: new FormControl('', Validators.required),
    // lastYear: new FormControl('', Validators.required),
    // from: new FormControl('', Validators.required),
    // to: new FormControl('', Validators.required),
    // invDate: new FormControl('', Validators.required),
    // PODate: new FormControl('', Validators.required),
    // POValue: new FormControl('', Validators.required)
  })

  public hasError = (controlName: string, errorName: string) => {
    return this.InvoiceForm.controls[controlName].hasError(errorName);
  }
  WithoutPO: boolean = false;
  actualfilename: any;
  savedfilename: string;
  value: string;
  RevisedbalQuantity: number;
  errorlist: any = [];
  errorcount: any;
  insertcount: any;
  flag: any;
  multiplactualfilenamearray: any = [];
  multiplsavedfilenamearray: any = [];
  filecount: number = 0;
  ArrayOfSelectedFilename: any = [];
  ArrayOfSelectedSavedFile: any = [];
  ArrayOfSelectedFiles: any = [];
  bulkinvoice: string;




  constructor(public dialog: MatDialog ,private purchaseOrderListService: PurchaseOrderListService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private loaderservice: LoaderService) { }
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log("what are the ?", params); // { order: "popular" }
      this.bulkinvoice = atob(params.bulk);
      console.log("this.invoicenumber" + this.bulkinvoice);

    });
   
    if (this.bulkinvoice == 'bulkinvoice') {
      this.ShowpopupMessage();
    }else
    {
      this.gstvalue();
      // this.openPopup();
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
      this.maxdate = new Date();
    }
    
    $("body").on("click", ".inv-wrapper", function () {
      console.log($(this))
      $('.inv-wrapper.active').removeClass('active');
      $(this).addClass('active');
    });
  }

  openPopup() {
    $("#invoicePopup").css("visibility", "visible");
    $("#invoicePopup").css("opacity", "1");
  }

  closePopUp() {
    $("#invoicePopup").css("visibility", "hidden");
    $("#invoicePopup").css("opacity", "0");
  }

  changeEvent(event) {
    let value = event.target.value

    if (value == "WithoutPO") {
      this.WithoutPO = true;
      this.InvoiceForm.get('Useremail').setValidators(Validators.required);
    }
    else {
      this.WithoutPO = false
      this.InvoiceForm.get('Useremail').setValidators(null);
    }
  }

  checkIGST(event) {
    let value = event.target.value
    this.InvoiceForm.controls['TotalValue'].setValue(this.InvoiceForm.controls['Invamount'].value);
    if (value == "IGST") {
      this.IGST = true;
    }
    else {
      this.IGST = false;
    }
  }



  // checkInvoice(event) {
  //   this.value = event.target.value
  //   console.log("value is here ==>" + this.value);
  //   if (this.value == "Invoice") {
  //     // this.invoiceForm.get('irnNo').setValidators(null);
  //     // this.invoiceForm.get('irnDate').setValidators(null);
  //     this.invoiceForm.get('irnDate').clearValidators();
  //     this.invoiceForm.get('irnNo').clearValidators();
  //     this.invoiceForm.get('irnNo').updateValueAndValidity();
  //     this.invoiceForm.get('irnDate').updateValueAndValidity();
  //     this.irndetail = false;
  //     this.invoice = true;
  //   }
  //   else {
  //     this.invoiceForm.get('irnNo').setValidators(Validators.required);
  //     this.invoiceForm.get('irnDate').setValidators(Validators.required);
  //     this.invoiceForm.get('irnNo').updateValueAndValidity();
  //     this.invoiceForm.get('irnDate').updateValueAndValidity();
  //     this.irndetail = true;
  //     this.invoice = false;
  //   }
  // }

  checkInvoice(event) {
    let value = event.target.value
    this.InvoiceForm.reset();
    this.ArrayOfSelectedFile = [];
    this.ArrayOfSelectedFilename = [];
    this.viewAttachmentName="";
    if (value == "Invoice") {

      this.irndetail = false;
      this.invoice = true;
      // this.InvoiceForm.controls['IRNNo'].clearValidators();
      // this.InvoiceForm.controls['IRNDate'].clearValidators();
      this.InvoiceForm.get('IRNDate').clearValidators();
      this.InvoiceForm.get('IRNNo').clearValidators();
      this.InvoiceForm.get('IRNNo').updateValueAndValidity();
      this.InvoiceForm.get('IRNDate').updateValueAndValidity();
    }
    else {
      // this.InvoiceForm.get['IRNNo'].setValidators()

      this.irndetail = true;
      this.invoice = false;
      // this.InvoiceForm.controls['IRNNo'].setValidators([Validators.required]);
      // this.InvoiceForm.controls['IRNDate'].setValidators([Validators.required]);
      this.InvoiceForm.get('IRNDate').setValidators([Validators.required]);
      this.InvoiceForm.get('IRNNo').setValidators([Validators.required]);
    }
  }

  submitinvoicedetail() {
    console.log("is valid??", this.InvoiceForm);


    this.loaderservice.show();
    // var ponumber = this.ponumber;
    var irnnumber = "";
    var irndate = "";
    // if (this.invoice != true) {
    //   irnnumber = this.InvoiceForm.controls['IRNNo'].value;
    //   irndate = moment(new Date(this.InvoiceForm.controls['IRNDate'].value)).format("DD/MM/YYYY");

    // }
    var useremail = this.InvoiceForm.controls['Useremail'].value;
    var invoiceNumber = this.InvoiceForm.controls['Invnumber'].value;

    // var invoicedate = this.InvoiceForm.controls['InvDate'].value;
    var invoicedate = moment(new Date(this.InvoiceForm.controls['InvDate'].value)).format("DD/MM/YYYY");

    var billofladingadte = ""
    // moment(new Date(this.InvoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");
    if (this.InvoiceForm.controls['billofladingdate'].value != null) {
      billofladingadte = moment(new Date(this.InvoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");

    }
    else {
      billofladingadte = "Invalid date";
    }
    console.log("this.delivery.billofladingdate " + billofladingadte);
    var actualfilename1 = this.actualfilename;
    var savedfilename1 = this.savedfilename;
    var multipleactualfilename = "";
    var multiplesavedfilename = "";
    //   for(var a=0;a<this.multiplactualfilenamearray.length;a++)
    //   {
    //     multipleactualfilename = multipleactualfilename+this.multiplactualfilenamearray[a]+",";
    //   }
    //   for(var a=0;a<this.multiplsavedfilenamearray.length;a++)
    //   {
    //     multiplesavedfilename = multiplesavedfilename+this.multiplsavedfilenamearray[a]+",";
    //   }
    //   multipleactualfilename =  multipleactualfilename.slice(0, -1);
    //  multiplesavedfilename = multiplesavedfilename.slice(0, -1);

    for (var a = 0; a < this.ArrayOfSelectedFilename.length; a++) {
      multipleactualfilename = multipleactualfilename + this.ArrayOfSelectedFilename[a] + ",";
    }
    for (var a = 0; a < this.ArrayOfSelectedSavedFile.length; a++) {
      multiplesavedfilename = multiplesavedfilename + this.ArrayOfSelectedSavedFile[a] + ",";
    }
    multipleactualfilename = multipleactualfilename.slice(0, -1);
    multiplesavedfilename = multiplesavedfilename.slice(0, -1);
    console.log("multipleactualfilename ", multipleactualfilename);
    console.log("multiplesavedfilename ", multiplesavedfilename);


    // var refno = "ref1234";
    // var grnnumber = "";
    // if (this.data == "poitem") {
    //   var lineitemnumber = "-";
    //   var ordernumber = "-";
    // }
    // else if (this.data == "lineitem") {
    //   var lineitemnumber = this.lineitemnumber;
    //   var ordernumber = "-";
    // }
    // else if (this.data == "orderitem") {
    //   var lineitemnumber = this.lineitemnumber;
    //   var ordernumber = this.ordernumber;
    // }
    // var lineitemnumber = "";
    //     var ordernumber = "null";
    // var quantity = this.quantity;
    // var uoM = this.unitofmeasure;
    // var contactPerson = this.contactemail;
    // var contactPersonPhone = this.contactpersonphone;
    // var vendorid = this.vendor;
    // var company = this.company;
    // var plant = this.plant;
    // var department = this.department;
    // var costcenter = this.costcenter;
    // var category = this.category;
    // var businessPartnerText = this.bussinesspartnertext;
    // var profileid = "";
    // var invoiceDocumentPath = "";
    var invoiceamount = this.InvoiceForm.controls['Invamount'].value;
    // var igstamount = "";
    // var cgstamount = "";
    // var sgstamount = "";


    /*----------------------------Temporarily Commented ----------------------*/

    // if (this.IGST == true) {
    //   igstamount = this.InvoiceForm.controls['igstvalue'].value;
    // }
    // else {
    //   cgstamount = this.InvoiceForm.controls['cgstvalue'].value;
    //   sgstamount = this.InvoiceForm.controls['sgstvalue'].value;
    // }

    /*----------------------------Temporarily Commented End ----------------------*/


    var totalamount = this.InvoiceForm.controls['Invamount'].value;
    var description = this.InvoiceForm.controls['Description'].value;
    var status = "P";
    if(!this.invoice){
      var irnNumber = this.InvoiceForm.controls['IRNNo'].value;
      var irnDate =moment(new Date(this.InvoiceForm.controls['IRNDate'].value)).format("DD/MM/YYYY");
    }
    else{
      irnNumber="";
      irnDate="";
    }



    this.purchaseOrderListService.invoicesubmissionwithoutpo(irnNumber, irnDate, invoiceNumber, invoicedate, invoiceamount,
      totalamount, description, status, useremail, billofladingadte, actualfilename1,
      savedfilename1, multipleactualfilename, multiplesavedfilename).subscribe(res => {
        if (res[0].message == "Success") {
          // this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'Invoice has been submitted successfully',
            condition: 'success',
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
            this.router.navigate(['/purchaseOrdersList'])
          });
          // this.dialogBox.popUpOpen2('Invoice has been submitted successfully','success','invoicesubmit');
          // this.toastr.success("Invoice Has Been Submitted Successfully")
          console.log("Inin");
          this.InvoiceForm.reset();
          // this.invoiceconfile = null;
          this.viewAttachmentName = "";
          this.successmessage = "Invoice Has Been Submitted Successfully";
          this.success = true;
          // this.showPopup();
        }
        else {
          // this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: res[0].err,
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
          // this.toastr.error(res[0].message)
          // this.dialogBox.popUpOpen2('Error while submitting. Please try again','error','invoicesubmit');
          this.successmessage = "Error while submitting. Please try again";
          this.error = true;
          // this.showPopup();
        }
      })

    this.loaderservice.hide();

  }


  // totalingfunction(n, type) {
  //   console.log("calling....");

  //   var tempigstvalue = 0;
  //   var tempcgstvalue = 0;
  //   var tempsgstvalue = 0;
  //   var tempinvoiceamount = 0;
  //   if (type == "cgst") {
  //     this.specificsgst = true;
  //     this.InvoiceForm.controls['SGSTValue'].setValue(this.InvoiceForm.controls['CGSTValue'].value);
  //   }
  //   else if (type == "sgst") {
  //     this.specificcgst = true;
  //     this.InvoiceForm.controls['CGSTValue'].setValue(this.InvoiceForm.controls['SGSTValue'].value)
  //   }
  //   this.disable = false;
  //   console.log("this.InvoiceForm.controls['IGSTValue'].value" + this.InvoiceForm.controls['IGSTValue'].value);
  //   console.log("this.InvoiceForm.controls['TotalValue'].value" + this.InvoiceForm.controls['TotalValue'].value);

  //   tempigstvalue = this.parsefloatvalue(this.InvoiceForm.controls['IGSTValue'].value ? this.InvoiceForm.controls['IGSTValue'].value : 0);
  //   tempcgstvalue = this.parsefloatvalue(this.InvoiceForm.controls['CGSTValue'].value ? this.InvoiceForm.controls['CGSTValue'].value : 0);
  //   tempsgstvalue = this.parsefloatvalue(this.InvoiceForm.controls['SGSTValue'].value ? this.InvoiceForm.controls['SGSTValue'].value : 0);
  //   tempinvoiceamount = this.parsefloatvalue(this.InvoiceForm.controls['Invamount'].value ? this.InvoiceForm.controls['Invamount'].value : 0);


  //   if (this.IGST) {
  //     if (this.parsefloatvalue(tempigstvalue) > 100) {
  //       console.log("inin");
  //       this.bignumber = true;
  //       this.disable = true;
  //       return false;
  //     }
  //     else {
  //       this.bignumber = false;
  //       this.disable = false;
  //     }
  //     console.log("tempigstvalue" + tempigstvalue);
  //     console.log("tempinvoiceamount" + tempinvoiceamount);
  //     if (this.parsefloatvalue(tempigstvalue) > 100) {
  //       console.log("inin");
  //       this.bignumber = true;
  //       this.disable = true;
  //       return false;
  //     }
  //     else {
  //       this.bignumber = false;
  //       this.disable = false;
  //     }
  //     console.log("n is here" + n);
  //     this.InvoiceForm.controls['TotalValue'].setValue(
  //       this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
  //         + (this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempigstvalue) / 100))));
  //   }
  //   else {

  //     if (this.parsefloatvalue(tempcgstvalue) > 100) {
  //       console.log("inin");
  //       this.bignumbercgst = true;
  //       this.bignumbersgst = false;
  //       this.disable = true;
  //       return false;
  //     }
  //     else if (this.parsefloatvalue(tempsgstvalue) > 100) {
  //       console.log("inin");
  //       this.bignumbercgst = false;
  //       this.bignumbersgst = true;
  //       this.disable = true;
  //       return false;

  //     }
  //     else {
  //       this.bignumbercgst = false;
  //       this.bignumbersgst = false;
  //       this.disable = false;
  //     }
  //     console.log("n is here" + n);
  //     if (type == "cgst") {
  //       this.InvoiceForm.controls['TotalValue'].setValue(
  //         this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
  //           + ((this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempcgstvalue) / 100)))));
  //     }
  //     else if (type == "sgst") {
  //       this.InvoiceForm.controls['TotalValue'].setValue(
  //         this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
  //           + ((this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempsgstvalue) / 100)))));
  //     }

  //     // this.InvoiceForm.controls['totalamount'].setValue(
  //     //   this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
  //     //     + ((this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempcgstvalue) / 100)) +
  //     //       (this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempsgstvalue) / 100)))));

  //   }
  //   console.log("n is here" + n);
  //   console.log(this.InvoiceForm.controls['Invamount'].value);

  // }

  onFileChanged(event: any) {
    console.log("this.filecount " + this.filecount);
    var specialChars = "<>@!#$%^&*()+[]{}?:;_|'\"\\,/~`-=";
    var checkForSpecialChar = function(string){
     for(var j = 0; j < specialChars.length;j++){
       if(string.indexOf(specialChars[j]) > -1){
           return true
        }
     }
     return false;
    }
    var _validFileExtensions = [".JPEG",".JPG",".PNG",".DOC",".DOCX",".XLS",".XLSX",".CSV",".PDF"];
    var ValidateSingleInput = function(string){
      for(var j = 0; j < _validFileExtensions.length;j++){
        if(string.toUpperCase().indexOf(_validFileExtensions[j]) > -1){
            return false
         }
      }
      return true;
     }
    if (this.filecount == 0) {
      this.multiplefilechanged = true;
      this.ArrayOfSelectedFile = Array.from(event.target.files);
      if (this.ArrayOfSelectedFile.length < 11) {
        for (var t = 0; t < this.ArrayOfSelectedFilename.length; t++) {
          if (this.ArrayOfSelectedFilename[t] == this.ArrayOfSelectedFile[k].name) {
             // this.dialogBox.popUpOpen2('Duplicate files are not allowed.', 'error', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Duplicate files are not allowed.',
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
	     this.filecount-=1
            return;
          }
        }
        for (var m = 0; m < this.ArrayOfSelectedFile.length; m++) {
          if(checkForSpecialChar(this.ArrayOfSelectedFile[m].name)){
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
        this.filecount = this.filecount - 1;
        return;
          }
        }
        for(var m = 0; m < this.ArrayOfSelectedFile.length; m++){
          if(ValidateSingleInput(this.ArrayOfSelectedFile[m].name.toUpperCase())){
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Only jpeg,jpg,png,doc,docx,xls,xlsx,csv,pdf files are allowed',
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
        }
        for (var k = 0; k < this.ArrayOfSelectedFile.length; k++) {
          console.log("this.ArrayOfSelectedFile", this.ArrayOfSelectedFile);

          this.ArrayOfSelectedFilename.push(this.ArrayOfSelectedFile[k].name);
          this.ArrayOfSelectedSavedFile.push(this.ponumber + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[k].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[k].name));

          this.multiplactualfilenamearray.push(this.ArrayOfSelectedFile[k].name);
        }
        this.filecount = this.ArrayOfSelectedFile.length;
        console.log("this.ArrayOfSelectedFile", this.ArrayOfSelectedFile);

      }
      else {
        this.ArrayOfSelectedFile = [];

        // this.dialogBox.popUpOpen2('Maximum 10 files allowed.', 'error', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Maximum 10 files allowed.',
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
        return;

      }
      console.log("in");
    }
    else {
      const array = event.target.files;
      console.log("array length" + array.length);
      console.log("this.filecount else", this.filecount);

      this.filecount = this.filecount + array.length;
      if (this.filecount < 11) {
        for (let file of array) {
          this.multiplefilechanged = true;
          for (var t = 0; t < this.ArrayOfSelectedFilename.length; t++) {
            if (this.ArrayOfSelectedFilename[t] == file.name) {
              // this.dialogBox.popUpOpen2('Duplicate files are not allowed.', 'error', 'invoicesubmit');
   // this.dialogBox.popUpOpen2('Duplicate files are not allowed.', 'error', 'invoicesubmit');
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: 'Duplicate files are not allowed.',
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
              this.filecount-=1
              return;
            }
          }
          for (var m = 0; m < this.ArrayOfSelectedFilename.length; m++) {
            console.log("this.ArrayOfSelectedFilename[m].name",file.name);
            if(checkForSpecialChar(file.name)){
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
          this.filecount = this.filecount - 1;
          return;
            }
            else if(ValidateSingleInput(file.name.toUpperCase())){
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: 'Only jpeg,jpg,png,doc,docx,xls,xlsx,csv,pdf files are allowed',
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
          }
          if (this.ArrayOfSelectedFile.includes(file) === false) {
            this.ArrayOfSelectedFile.push(file);
            this.ArrayOfSelectedFilename.push(file.name);
            this.ArrayOfSelectedSavedFile.push(this.ponumber + "_invoice_" + this.getFileNameWOExtention(file.name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(file.name));

            this.multiplactualfilenamearray.push(file.name);
            this.filecount = this.ArrayOfSelectedFilename.length;
          }
          else {
            console.log("duplicate =================");

          }
        }
      }
      else {
        this.filecount = this.filecount - array.length;
        // this.dialogBox.popUpOpen2('Maximum 10 files allowed.', 'error', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Maximum 10 files allowed.',
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
        return;

      }
    }
    // if (this.ArrayOfSelectedFile.length == 0) {

    // }
    // else {


    // }
    // this.ArrayOfSelectedFile = Array.from(event.target.files);
    console.log(this.ArrayOfSelectedFile);
    console.log("this.filecount >>" + this.filecount)
    // this.uploadfile();
  }


  uploadfileofsupportingdocs() {
    const formData = new FormData();


    for (var i = 0; i < this.ArrayOfSelectedFile.length; i++) {

      console.log("this.ArrayOfSelectedFile[i].name ==> " + "invoicewithoutpo" + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
      formData.append("file[]", this.ArrayOfSelectedFile[i], "invoicewithoutpo" + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
    }
    this.purchaseOrderListService.multiplefileupload(formData).subscribe(res => {
      console.log(res.toString);
    });
  }

  // onFileChanged(event : any) {

  //   if(this.ArrayOfSelectedFile.length == 0) {
  //     this.ArrayOfSelectedFile = Array.from(event.target.files);
  //     for(var k=0;k<this.ArrayOfSelectedFile.length;k++)
  //     {
  //       this.multiplactualfilenamearray.push(this.ArrayOfSelectedFile[k].name);
  //     }
  // console.log("in");
  //   }
  //   else {
  //     console.log("in");
  //       const array = event.target.files;

  //       for (let file of array) {
  //         if (this.ArrayOfSelectedFile.includes(file) === false) {
  //           console.log("not duplicate ================");
  //           this.ArrayOfSelectedFile.push(file);
  //           this.multiplactualfilenamearray.push(file.name);
  //         }
  //         else {
  //           console.log("duplicate =================");

  //         }
  //       }
  //   }
  //   // this.ArrayOfSelectedFile = Array.from(event.target.files);
  //   console.log(this.ArrayOfSelectedFile);
  //   this.uploadfileofsupportingdocs();
  // }

  //   uploadfileofsupportingdocs(){
  //     const formData =  new  FormData();

  //       var timestampnow=Date.now().toString();
  //   for  (var i =  0; i <  this.ArrayOfSelectedFile.length; i++)  {  

  //     console.log("this.ArrayOfSelectedFile[i].name ==> "+"invoicewithoutpo" + "_invoice_"+this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_"+timestampnow+"."+this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
  //       formData.append("file[]",  this.ArrayOfSelectedFile[i],"invoicewithoutpo" + "_invoice_"+this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_"+timestampnow+"."+this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
  //       this.multiplsavedfilenamearray.push("invoicewithoutpo" + "_invoice_"+this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_"+timestampnow+"."+this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
  //     }
  //   this.purchaseOrderListService.multiplefileupload(formData).subscribe(res => {
  // console.log(res.toString);
  //   });
  //   }

  showPopup() {
    // this.purchaseOrderListModel.PONumber = poNumber;
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
  }
  parsefloatvalue(val) {
    if (val == null) {
      return 0;
    }
    else {
      return parseFloat(val);
    }
  }


  // keyPressAlphanumeric(n) {
  //   var regex = new RegExp("^[a-zA-Z0-9-]+$");
  //   var str = String.fromCharCode(!n.charCode ? n.which : n.charCode);
  //   if (regex.test(str)) {
  //     return true;
  //   }

  //   n.preventDefault();
  //   return false;
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

  gstvalue() {
    this.igstlist =
      [
        { id: '0.25', value: '0.25 %' },
        { id: '0.5', value: '0.5 %' },
        { id: '12', value: '12 %' },
        { id: '18', value: '18 %' },
        { id: '28', value: '28 %' }
      ]

    this.cgstandsgstlist =
      [
        { id: '0.25', value: '0.25 %' },
        { id: '0.5', value: '0.5 %' },
        { id: '12', value: '12 %' },
        { id: '18', value: '18 %' },
        { id: '28', value: '28 %' }
      ]
  }

  getFileNameWOExtention(name) {
    // return name.split(".")[0];
    var flName = name.substr(0, name.lastIndexOf(".")).replace(/_/g, "-").replace(/\./g, "-");
    return flName;
  }

  validateFileExtension(fileName) {
    let fileExtension: string = this.getExtensionOfFile(fileName);
    for (let i = 0; i < this.AttachmentValidExtensionForInvoice.length; i++) {
      if (this.AttachmentValidExtensionForInvoice[i] == fileExtension.toUpperCase())
        return true;
    }
    return false;
  }

  validateFileExtensionforinvoice(fileName) {
    let fileExtension: string = this.getExtensionOfFile(fileName);
    for (let i = 0; i < this.AttachmentValidExtensionForInvoice.length; i++) {
      if (this.AttachmentValidExtension[i] == fileExtension.toUpperCase())
        return true;
    }
    return false;
  }
  getExtensionOfFile(name) {
    return name.split(".")[name.split(".").length - 1];
  }
  getTimeStampFileName(fileName, extension) {
    console.log(Date.now().toString());
    return fileName + Date.now().toString() + "." + extension;
  }


  onFileSelectEvent(e, type) {
    this.errorlist = [];
    this.flag = "false";
    this.viewUploadFile = null;
    this.viewAttachmentName = "";
    console.log(e.target.files[0]);
    if (this.validateFileExtension(e.target.files[0].name)) {
      this.fileAttachmentError = "";
      this.viewUploadFile = e.target.files[0];
      if (type == "invoice") {
        this.invoiceconfile = e.target.files[0];
        this.viewAttachmentName = this.viewUploadFile.name;
        console.log("this.viewAttachmentName " + this.viewAttachmentName);
        // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);

        this.InvoiceForm.controls['attachments'].setValue(this.viewAttachmentName);
      }
      this.actualfilename = this.viewUploadFile.name;
      console.log("this.invoiceconfile " + this.invoiceconfile);
      console.log("this.viewAttachmentName ==> " + this.viewAttachmentName);

      // console.log(this.viewAttachmentName);
      // this.neftgroup.confile.name=this.viewAttachmentName;
      var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
      fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
      var fileName2 = fileName;
      fileName = "bulkupload" + "_invoice_" + fileName;
      this.savedfilename = fileName;
      console.log("savedfilename ==>" + this.savedfilename);
      this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
        console.log(JSON.stringify(res))
        res[0].data = true;
        if (res.length == 0) {
          this.toastr.error(res[0].message)
          // this.successmessage = "Data has been submitted successfully";

          //=--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
          return false;
        }
        else if (res[0].status == "Success" && res[0].data == true) {

          // this.getIRNNumber();


        }
        else {
          // this.toastr.error(res[0].message)
          // this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'Error while submitting. Please try again',
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
          this.successmessage = "Error while submitting. Please try again";
          this.viewAttachmentName = '';
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
        // this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'error', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'There was an error while uploading the file. Please try again!',
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
        // =--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
        return false;
      }
    }
    else {
      //Assign error message to class.
      this.fileAttachmentError = this.InvalidAttachmentFileError;
    }


    // $(".fileSelectBtn").blur();
  }

  onFileSelectEventforinvoiceupload(e, type) {
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
    console.log(e.target.files[0]);
    if(checkForSpecialChar(e.target.files[0].name)){
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
      this.errorlist = [];
      this.flag = "false";
      this.viewUploadFile = null;
      this.viewAttachmentName = "";
      console.log(e.target.files[0]);
      if (this.validateFileExtension(e.target.files[0].name)) {
        this.loaderservice.show();
        this.fileAttachmentError = "";
        this.viewUploadFile = e.target.files[0];
        if (type == "invoice") {
          this.invoiceconfile = e.target.files[0];
          this.viewAttachmentName = this.viewUploadFile.name;
          console.log("this.viewAttachmentName " + this.viewAttachmentName);
          // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);
          console.log("in here");
          // this.InvoiceForm.controls['attachments'].setValue(this.viewAttachmentName);
        }
        this.actualfilename = this.viewUploadFile.name;
        console.log("this.invoiceconfile " + this.invoiceconfile);
        console.log("this.viewAttachmentName ==> " + this.viewAttachmentName);
  
        // console.log(this.viewAttachmentName);
        // this.neftgroup.confile.name=this.viewAttachmentName;
        var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
        fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
        var fileName2 = fileName;
        fileName = "invoicewithoutpo" + "_invoice_" + fileName;
        this.savedfilename = fileName;
        console.log("savedfilename ==>" + this.savedfilename);
        this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
          console.log(JSON.stringify(res))
          this.loaderservice.hide();
          res[0].data = true;
          if (res.length == 0) {
            this.toastr.error(res[0].message)
            // this.successmessage = "Data has been submitted successfully";
  
            //=--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
            return false;
          }
          else if (res[0].status == "Success") {
  
            if (!this.invoice) {
              this.purchaseOrderListService.getIRNNumber(this.actualfilename, this.savedfilename).subscribe(res => {
                console.log("response of IrnDAta", res[0].message);
  
                if (res[0].message == "Success") {
                  var datestring = res[0].invoiceData[0].IR_DocDt;
                  var formatdate = moment(datestring, "DD/MM/YYYY")
                  var dateobj = formatdate.toDate();
                  console.log("transformed date ===>", new Date(res[0].invoiceData[0].IR_DocDt), dateobj);
  
                  this.InvoiceForm.controls.IRNNo.setValue(res[0].invoiceData[0].IRN_Number);
                  this.InvoiceForm.controls.IRNDate.setValue(dateobj);
                  this.InvoiceForm.controls.Invnumber.setValue(res[0].invoiceData[0].Invoice_Number);
                  this.InvoiceForm.controls.InvDate.setValue(dateobj);
  
                  // this.dialogBox.popUpOpen2('E-Invoice has been uploaded successfully', 'success', 'Einvoice');
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    message: 'E-Invoice has been uploaded successfully.',
                    condition: 'success',
                    page: 'Einvoice'
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
                else {
                  // this.dialogBox.popUpOpen2('Unable to find IRN number and Date', 'error', 'Einvoice')
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    message: 'Unable to find IRN number and Date',
                    condition: 'error',
                    page: 'Einvoice'
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
              })
            }
  
          }
          else {
            // this.toastr.error(res[0].message)
            // this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Error while submitting. Please try again',
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
            this.successmessage = "Error while submitting. Please try again";
            this.viewAttachmentName = '';
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
          // this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'error', 'invoicesubmit');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'There was an error while uploading the file. Please try again!',
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
          // =--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
          return false;
        }
      }
      else {
        //Assign error message to class.
        this.fileAttachmentError = this.InvalidAttachmentFileError;
      }
    }



    // $(".fileSelectBtn").blur();
  }



  ShowpopupMessage() {
    // $("#popupMessage").css("visibility", "visible");
    // $("#popupMessage").css("opacity", "1");
    // this.errorlist = [];
    
    setTimeout(() => {
      this.flag = "false";
    this.viewAttachmentName = "";
    (<any>$("#popupComment").modal('show'));
    }, 300);
  }
  closePopup(ev) {
    $("#popup2").css("visibility", "hidden");
    $("#popup2").css("opacity", "0");
    // location.reload();
    this.confirmationNoAction = false;
  }
  uploadfile(event: any): void {

    if (this.viewUploadFile != null && this.viewAttachmentName != "") {
      // var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
      // fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
      // var fileName2 = fileName;
      // fileName = "bulkupload" + "_invoice_" + fileName;
      // this.savedfilename = fileName;
      // console.log("savedfilename ==>" + this.savedfilename);
      this.purchaseOrderListService.readbulkuploadfile(this.savedfilename).subscribe(res => {
        if (res[0].flag == 'success') {
          this.flag = res[0].flag;
          console.log("this.flag " + this.flag);
          this.isUpload = false;
          this.viewAttachmentName = '';
          this.errorlist = res[0].errorrecords;
          this.errorcount = res[0].errorrecordscount;
          this.insertcount = res[0].correctrecordscount
          if (this.parsefloatvalue(this.errorcount) == 0) {
            // this.dialogBox.popUpOpen2('Invoice has been uploaded successfully', 'success', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Invoice has been uploaded successfully',
              condition: 'success',
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

          // else if(this.parsefloatvalue(this.insertcount) == 0)
          // {
          //   this.dialogBox.popUpOpen2('Error in file. Please upload proper file', 'success', 'invoicesubmit');

          // }
          else if (this.parsefloatvalue(this.errorcount) > 0 || this.parsefloatvalue(this.insertcount) == 0) {
            // this.dialogBox.popUpOpen2('Some invoice have been uploaded successfully', 'success', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Some invoice have been uploaded successfully',
              condition: 'success',
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
          // $("#popupMessage").css("visibility", "visible");
          // $("#popupMessage").css("opacity", "1");
        }
      })

      // this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
      //   console.log(JSON.stringify(res))
      //   res[0].data = true;
      //   if (res.length == 0) {
      //     this.toastr.error(res[0].message)
      //     // this.successmessage = "Data has been submitted successfully";

      //     //=--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
      //     return false;
      //   }
      //   else if (res[0].status == "Success" && res[0].data == true) {

      //     // this.getIRNNumber();

      //     this.dialogBox.popUpOpen2('Invoice has been Uploaded successfully', 'success', 'invoicesubmit');
      //     this.isUpload = true;
      //     this.viewAttachmentName = '';

      //   }
      //   else {
      //     // this.toastr.error(res[0].message)
      //     this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
      //     this.successmessage = "Error while submitting. Please try again";
      //     this.viewAttachmentName = '';
      //     this.error = true;
      //     this.showPopup();
      //     //=-- this.dialogBox.popUpOpen2('Maximum file size (10 MB) exceeded.', 'donate', 'error2');
      //     return false;
      //   }

      // });


    }
  }


  submitInvoice(event) {
    this.value = event.target.value;
    if (this.value == "withPo") {
      this.invoiceStatus = "withPo";
    }
    else if (this.value == "withoutPo") {
      this.invoiceStatus = "withoutPo";
    }
    else if (this.value == "bulkinvoice") {
      this.invoiceStatus = "bulkinvoice";
      // this.ShowpopupMessage(event);
    }
  }



  submit() {
    if (this.invoiceStatus != "") {
      if (this.invoiceStatus == "withPo") {
        this.router.navigate(['/purchaseOrdersList'])
      }
      else if (this.invoiceStatus == "withoutPo") {
        this.closePopUp();
      }
    }
  }
  close() {
    this.viewAttachmentName = '';
    this.isUpload = false;
    this.InvoiceForm.controls['attachments'].reset();
  }

  removeitem(index) {
    // delete this.ArrayOfSelectedFilename[index];
    var tempname = this.ArrayOfSelectedFilename[index]
    this.ArrayOfSelectedFilename.splice(index, 1);
    this.multiplsavedfilenamearray.splice(index, 1);
    this.ArrayOfSelectedSavedFile.splice(index, 1);
    this.filecount = this.filecount - 1;
    for (var k = 0; k < this.ArrayOfSelectedFile.length; k++) {
      if (this.ArrayOfSelectedFile[k].name == tempname) {
        this.ArrayOfSelectedFile.splice(k, 1);
      }
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (this.hasDecimalPlace(event.target.value, 3)) {
      return false
    }
    return true;
  }
  hasDecimalPlace(value, x) {
    var pointIndex = value.indexOf('.');
    return pointIndex >= 0 && pointIndex < value.length - x;
  }
  lisitData: any =
    [
      { id: '0.25', value: '0.25 %' },
      { id: '0.5', value: '0.5 %' },
      { id: '12', value: '12 %' },
      { id: '18', value: '18 %' },
      { id: '28', value: '28 %' }
    ];

}
