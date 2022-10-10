import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import * as bootstrap from 'bootstrap';
import * as jquery from 'jquery';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from 'app/components/commoncomponents/popup/popup.component';
declare var $: any;
@Component({
  selector: 'app-dialog-model',
  templateUrl: './dialog-model.component.html',
  styleUrls: ['./dialog-model.component.css']
})
export class DialogModelComponent implements OnInit {
  @Output() datasharingFunction = new EventEmitter();
  message: string = '';
  condition = '';
  page = '';
  grnNumber = '';
  invoiceNumber = ';'

  confirmationNoAction: boolean = false
  Remarks: any;
  value: string;
  invoiceStatus: string = "";
  validate: boolean = true;
  flag: string;
  // viewAttachmentName: string;
  successmessage: any;
  error: boolean;
  savedfilename: string;
  errorlist: any = [];
  CSVFile: any;
  AttachmentValidExtension: string[] = ["CSV"];
  AttachmentValidExtension1: string[] = ["PDF"];
  AttachmentValidExtensionofsupport: string[] = ["PDF","CSV","JPEG","JPG","PNG","DOC","DOCX","XLS","XLSX"];
  fileAttachmentError: string;
  invoiceconfile: any;
  csvupload: boolean = false;
  filecount: number = 0;
  ArrayOfSelectedbulkpdfFile: any = [];
  ArrayOfSelectedbulkpdfFilename: any = [];
  ArrayOfSelectedbulkpdfSavedFile: any = [];
  ArrayOfSelectedbulkpdfActualFile: any = [];
  bid: string;
  timestampnow = Date.now().toString();
  // this.timestampnow = ;
  // actualfilename: any;
  csvfilename: string;
  username: string;
  insertcount: string;
  errorcount: string;
  submitted: boolean =false;
  CSVFileName: any;
  ArrayOfSelectedsupportbulkpdfFile: any=[];
  ArrayOfSelectedsupportbulkpdfSavedFile: any = [];
  ArrayOfSelectedsupportbulkpdfFilename: any = [];
  filecountofsupp: number = 0;
  ArrayOfSelectedsupportbulkpdfActualFile: any = [];
  suppdone:boolean = false;
  supportenabled: boolean = false;
  selection=null;
  myInput3: any;
  myInput2: string;
  myInput: string;
  ext: string = "";
  // invoicefilesloaded:boolean = false;



  constructor(private loaderService: LoaderService, private router: Router,
    public dialog: MatDialog, private purchaseOrderListService: PurchaseOrderListService) { }

  ngOnInit(): void {
    this.selection=null;
  }


  popUpOpenServiceError(message, condition) {
    this.loaderService.show();
    this.message = message;
    this.condition = condition;

    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        setTimeout(() => {
          this.loaderService.hide();
          $("#myModal").modal("show");
          $("#btnOk").click(function () {
            window.location.reload();
          });
        }, 100);
        resolve();
      }, 300);
    });
    return promise;
  }


  popUpOpen2(message, condition, page) {
    console.log("message ==> " + message);

    console.log("page ==> " + page);
    console.log("condition ==> " + condition);
    this.loaderService.show();
    this.message = message;
    this.condition = condition;
    this.page = page;
    $("#myModal").css("visibility", "visible");
    $("#myModal").css("opacity", "1");
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        setTimeout(() => {
          this.loaderService.hide();
          console.log("in heres");
          $("#myModal").modal("show");
          console.log("in heres out");
        }, 1000);
        resolve();
      }, 300);
    });
    return promise;
  }
  grnAdvicePopUp(condition, page, grn, invoiceNumber) {
    console.log("page ==> " + page);
    console.log("condition ==> " + condition);
    this.loaderService.show();
    this.condition = condition;
    this.page = page;
    this.grnNumber = grn;
    this.invoiceNumber = invoiceNumber;
    $("#grnAdviceModal").css("visibility", "visible");
    $("#grnAdviceModal").css("opacity", "1");
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        setTimeout(() => {
          this.loaderService.hide();
          console.log("in heres");
          $("#grnAdviceModal").modal("show");
          console.log("in heres out");
        }, 1000);
        resolve();
      }, 300);
    });
    return promise;
  }


  dismissModal() {
    this.loaderService.show();
    $(".modal-backdrop").hide();
    $("#myModal").css("visibility", "hidden");
    $("#myModal").css("opacity", "0");
    // if(this.page == "grndoneofapproval")
    // {
    //   this.router.navigate(['/internaltrackInvoiceList'])
    // }

    console.log("this.message ==> " + this.message);
    console.log("this.page ==> " + this.page);
    if (this.message == "Delievery item created successfully" || this.message == "Invoice has been submitted successfully"
      || this.message == "Error while submitting. Please try again" || this.message == "Failed to save") {
      this.router.navigate(['/purchaseOrdersList']);
    }
    else if (((this.message == "Invoice updated successfully") || (this.message == "Invoice returned successfully")) && this.page == "approval") {
      this.router.navigate(['/internaltrackInvoiceList'])
    }
    else if (this.message == "Invoice is already present. Cannot create invoice." && this.page == "invoicesubmit") {
      this.router.navigate(['/purchaseOrdersList'])
    }
    else if (this.message == "Invoice updated successfully and email has been sent successfully" && this.page == "approval") {
      this.router.navigate(['/internaltrackInvoiceList'])
    }
    else if (this.message == "Invoice updated successfully but email has not been sent" && this.page == "approval") {
      this.router.navigate(['/internaltrackInvoiceList'])
    }

    else if (this.message == "Successfully Done" && this.page == "profiledata") {
      this.router.navigate(['/dashboard'])
    }
    else if (this.message == "Do you want to update your invoice status to  continue ?" && this.page == "approval") {
      this.router.navigate(['/internaltrackInvoiceList'])
    }
    else if ((this.message == "Credit Note has been submitted successfully") && (this.page == "trackinvoicecreditnote")) {
      console.log("in");
      this.router.navigate(['/trackInvoiceList'])
    }

    this.loaderService.hide();
  }


  popUpOpen_callback_confirm(message, page, condition, cb) {
    //$("#confirmationNoAction").hide();
    // $("#confirmationNoAction").prop("display","none")
    //    this.loaderService.show();
    this.message = message;
    this.condition = condition;
    this.page = page;

    var value = true;
    setTimeout(() => {
      setTimeout(() => {
        if (this.message.includes("Rejected") || this.message.includes("On Hold") || this.message.includes("Approved") || this.message.includes("return")) {
          this.loaderService.hide();
          // $("#myModal1").modal("show");
          $("#myModal1").css("visibility", "visible");
          $("#myModal1").css("opacity", "1");
          $("#btnConfirmOk").click(function () {
            // cb(true);
            // $("#confirmationNoAction").prop("display","block")
            $("#confirmationNoAction").show();
            // this.confirmationNoAction= true;
            $("#submitButton").click(function () {
              setTimeout(() => {
                this.remarks = $("#remarks").val();
                console.log("==============================####################", this.remarks + " AB")
                cb(true)
              }, 300);

            })
          });
        }
        else {
          // $("#confirmationNoAction").prop("display","none")
          this.confirmationNoAction = false;
          $("#confirmationNoAction").hide();
          $("#myModal1").css("visibility", "visible");
          $("#myModal1").css("opacity", "1");
          $("#btnConfirmOk").click(function () {
            cb(true);
            //    $("#confirmationNoAction").prop("display","block")
            //    $("#confirmationNoAction").show();
            // this.confirmationNoAction= true;
          });

        }
        $("#btnConfirmBack").click(function () {
          // $("#confirmationNoAction").prop("display","none");
          $("#confirmationNoAction").hide();
          this.confirmationNoAction = false;
          cb(false);
        })
      }, 1000);
    }, 1000);
  }

  closePopup() {
    this.ArrayOfSelectedsupportbulkpdfFilename =[];
    this.ArrayOfSelectedbulkpdfFilename=[];
    // $("#confirmationNoAction").prop("display","none");
    $("#confirmationNoAction").hide();
    console.log("in here");
    this.confirmationNoAction = false;
    $("#myModal1").css("visibility", "hidden");
    $("#myModal1").css("opacity", "0");
    $('#bulkupload').modal('hide');
    this.ArrayOfSelectedbulkpdfFile = [];
    this.errorlist = [];
    this.flag = "";
    this.insertcount = "";
    this.errorcount = "";
  }

  sendRemark(message) {
    this.Remarks = message;
    console.log("Remarks==========================================>", this.Remarks);
    this.datasharingFunction.emit(this.Remarks)
  }
  submitInvoicepopUp() {
    this.ArrayOfSelectedsupportbulkpdfFilename =[];
    this.ArrayOfSelectedbulkpdfFilename=[];
    this.ArrayOfSelectedbulkpdfFile = [];
    this.ArrayOfSelectedsupportbulkpdfFile=[];
    this.suppdone=false;
    this.csvupload=false;
    this.supportenabled=false;
    this.myInput3='';
    this.myInput2='';
    this.myInput='';
    $("#invoicePopup").css("visibility", "visible");
    $("#invoicePopup").css("opacity", "1");
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        setTimeout(() => {
          // this.loaderService.hide();
          console.log("in heres");
          $("#invoicePopup").css("visibility", "visible");
          $("#invoicePopup").css("opacity", "1");
          console.log("in heres out");
        }, 1000);
        resolve();
      }, 300);
    });
    return promise;
  }
  closeSubmitInvoicePopUp() {
    $("#invoicePopup").css("visibility", "hidden");
    $("#invoicePopup").css("opacity", "0");
    this.invoiceStatus = '';
    this.selection=null;
    $(this).prop('checked', false);
    // $("#bulkinvoice").addClass("bulkinvoiceClear")
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
    }
  }
  submit() {
    if (this.invoiceStatus != "") {
      if (this.invoiceStatus == "withPo") {
        this.router.navigate(['/purchaseOrdersList']);
      }
      else if (this.invoiceStatus == "withoutPo") {
        this.router.navigate(['/submitInvoice']);
      }
      else if (this.invoiceStatus == "bulkinvoice") {
        console.log("this.invoiceStatus " + this.invoiceStatus)
        this.ShowpopupMessage();
      }
    }
    this.closeSubmitInvoicePopUp();
  }

  Check(message) {
    this.validate = true
    if (message.value != "" && message.value != " " && message.value != null && message.value.trim().length != 0) {
      this.validate = false;
    }


  }

  ShowpopupMessage() {
    console.log("in");
    setTimeout(() => {
      this.flag = "false";
      this.CSVFileName = "";
      (<any>$("#bulkupload").modal('show'));
    }, 300);
  }

  onFileSelectEvent(e, type) {
    this.errorlist = [];
    this.flag = "false";
    this.CSVFile = null;
    this.CSVFileName = "";
    this.submitted = false;
    console.log(e.target.files[0]);
    if (this.validateFileExtension(e.target.files[0].name)) {
      this.fileAttachmentError = "";
      this.CSVFile = e.target.files[0];
      this.CSVFileName = this.CSVFile.name;
      // this.actualfilename = this.CSVFile.name;
      console.log("this.invoiceconfile " + this.invoiceconfile);
      console.log("this.CSVFileName ==> " + this.CSVFileName);


      var fileName = this.getFileNameWOExtention(this.CSVFile.name) + "_";
      fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.CSVFile.name));
      var fileName2 = fileName;
      // fileName = this.ponumber + "_invoice_" + fileName;
      // this.savedfilename = fileName;
      console.log("savedfilename ==>" + this.savedfilename);
      fileName = "bulkupload_" + this.bid + "_" + fileName;
      this.savedfilename = fileName;
      this.csvfilename = fileName;
      console.log("savedfilename ==>" + this.savedfilename);
      // this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
      //   console.log(JSON.stringify(res))
      //   res[0].data = true;
      //   if (res.length == 0) {
      //     // this.toastr.error(res[0].message)
      //     // this.successmessage = "Data has been submitted successfully";

      //     //=--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
      //     return false;
      //   }
      //   else if (res[0].status == "Success" && res[0].data == true) {

      //     // this.getIRNNumber();


      //   }
      //   else {
      //     // this.toastr.error(res[0].message)
      //     this.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
      //     this.successmessage = "Error while submitting. Please try again";
      //     this.viewAttachmentName = '';
      //     this.error = true;
      //     // this.showPopup();
      //     //=-- this.dialogBox.popUpOpen2('Maximum file size (10 MB) exceeded.', 'donate', 'error2');
      //     return false;
      //   }

      // });
      // err => {
      //   // this.toastr.error(err)
      //   this.successmessage = err;
      //   this.error = true;
      //   // this.showPopup();
      //   this.popUpOpen2('There was an error while uploading the file. Please try again!', 'error', 'invoicesubmit');
      //   // =--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
      //   return false;
      // }
    }
    else {
      //Assign error message to class.
      // this.fileAttachmentError = this.InvalidAttachmentFileError;
      this.closePopup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: '.'+this.ext+' not allowed. Please try again',
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
      // this.successmessage = "Error while submitting. Please try again";
      // this.error = true;
      // this.showPopup();
    }


    // $(".fileSelectBtn").blur();
  }

  showPopup() {
    // this.purchaseOrderListModel.PONumber = poNumber;
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
  }

  getFileNameWOExtention(name) {
    // return name.split(".")[0];
    var flName = name.substr(0, name.lastIndexOf(".")).replace(/_/g, "-").replace(/\./g, "-");
    return flName;
  }

  validateFileExtension(fileName) {
    this.ext = "";
    let fileExtension: string = this.getExtensionOfFile(fileName);
    for (let i = 0; i < this.AttachmentValidExtension.length; i++) {
      if (this.AttachmentValidExtension[i] == fileExtension.toUpperCase())
        return true;
    }
    this.ext = fileExtension.toUpperCase();
    return false;
  }

  validateFileExtension2(fileName) {
    this.ext = "";
    let fileExtension: string = this.getExtensionOfFile(fileName);
    for (let i = 0; i < this.AttachmentValidExtension1.length; i++) {
      if (this.AttachmentValidExtension1[i] == fileExtension.toUpperCase())
        return true;
    }
    this.ext = fileExtension.toUpperCase();
    return false;
  }

  validateFileExtension3(filename)
  {
    this.ext ="";
    let fileExtension: string = this.getExtensionOfFile(filename);
    for (let i = 0; i < this.AttachmentValidExtensionofsupport.length; i++) {
      if (this.AttachmentValidExtensionofsupport[i] == fileExtension.toUpperCase())
        return true;
    }
    this.ext = fileExtension.toUpperCase();
    return false;
  }
  getExtensionOfFile(name) {
    return name.split(".")[name.split(".").length - 1];
  }
  getTimeStampFileName(fileName, extension) {
    console.log(Date.now().toString());
    return fileName + this.timestampnow + "." + extension;
  }

  onFileChangedBulk(event: any,type) {
    console.log("type is here ==> "+type);
if(type == 'invoice')
{
  console.log("this.filecount " + this.filecount);
  if (this.filecount == 0) {
    // this.multiplefilechanged = true;
    this.ArrayOfSelectedbulkpdfFile = Array.from(event.target.files);
    // if (this.ArrayOfSelectedFile.length < 11) {

    for (var k = 0; k < this.ArrayOfSelectedbulkpdfFile.length; k++) {
      if(this.validateFileExtension2(event.target.files[k].name)){
      this.ArrayOfSelectedbulkpdfFilename.push(this.ArrayOfSelectedbulkpdfFile[k].name);
      // this.ArrayOfSelectedSavedFile.push(this.ponumber + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[k].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[k].name));

      this.ArrayOfSelectedbulkpdfActualFile.push(this.ArrayOfSelectedbulkpdfFile[k].name);
      }
      else{
        this.ArrayOfSelectedbulkpdfFile=[]
        this.closePopup();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: '.'+this.ext+' not allowed. Please try again',
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
        // this.successmessage = "Error while submitting. Please try again";
        // this.error = true;
        // this.showPopup();
      
        break;
      }
    }
    this.filecount = this.ArrayOfSelectedbulkpdfFile.length;
    console.log("ArrayOfSelectedbulkpdfFilename "+this.ArrayOfSelectedbulkpdfFilename);
  }
  else {
    const array = event.target.files;
    console.log("array length Angaj" + array.length);
    this.filecount = this.filecount + array.length;
    // if (this.filecount < 11) {
    for (let file of array) {
      if(this.validateFileExtension2(file.name)){
      if (this.ArrayOfSelectedbulkpdfFile.includes(file) === false) {
        this.ArrayOfSelectedbulkpdfFile.push(file);
        this.ArrayOfSelectedbulkpdfFilename.push(file.name);
        // this.ArrayOfSelectedSavedFile.push(this.ponumber + "_invoice_" + this.getFileNameWOExtention(file.name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(file.name));

        // this.multiplactualfilenamearray.push(file.name);
        this.filecount = this.ArrayOfSelectedbulkpdfFilename.length;
      }
      else {
        console.log("duplicate =================");

      }
    }
    else{
      this.ArrayOfSelectedbulkpdfFile=[]
      this.closePopup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: '.'+this.ext+' not allowed. Please try again',
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
      // this.successmessage = "Error while submitting. Please try again";
      // this.error = true;
      // this.showPopup();
    
      break;
    }
      
      console.log("ArrayOfSelectedbulkpdfFilename "+this.ArrayOfSelectedbulkpdfFilename);
    }
    // }

  }
  console.log(this.ArrayOfSelectedbulkpdfFile);
  console.log("this.filecount >>" + this.filecount)
}
   else if(type == 'support') 
   {
    console.log("this.filecountofsupp " + this.filecountofsupp);
    if (this.filecountofsupp == 0) {
      // this.multiplefilechanged = true;
      this.ArrayOfSelectedsupportbulkpdfFile = Array.from(event.target.files);
      // if (this.ArrayOfSelectedFile.length < 11) {
  
      for (var k = 0; k < this.ArrayOfSelectedsupportbulkpdfFile.length; k++) {
        if(this.validateFileExtension3(event.target.files[k].name)){
        this.ArrayOfSelectedsupportbulkpdfFilename.push(this.ArrayOfSelectedsupportbulkpdfFile[k].name);
        // this.ArrayOfSelectedSavedFile.push(this.ponumber + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[k].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[k].name));
  
        // this.ArrayOfSelectedsupportbulkpdfActualFile.push(this.ArrayOfSelectedsupportbulkpdfFile[k].name);
        }
        else{
          this.closePopup();
          this.ArrayOfSelectedsupportbulkpdfFilename = [];
          this.ArrayOfSelectedsupportbulkpdfFile = []
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: '.'+this.ext +' is not allowed. Please try again',
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
          // this.successmessage = "Error while submitting. Please try again";
          // this.error = true;
          // this.showPopup();
        
          break;
        }
        }
      this.filecount = this.ArrayOfSelectedsupportbulkpdfFilename.length;
      console.log("ArrayOfSelectedsupportbulkpdfFilename "+this.ArrayOfSelectedsupportbulkpdfFilename);
    }
    else {
      const array = event.target.files;
      console.log("array length" + array.length);
      this.filecountofsupp = this.filecountofsupp + array.length;
      // if (this.filecount < 11) {
      for (let file of array) {
        if(this.validateFileExtension3(file.name)){
        if (this.ArrayOfSelectedsupportbulkpdfFile.includes(file) === false) {
          this.ArrayOfSelectedsupportbulkpdfFile.push(file);
          this.ArrayOfSelectedsupportbulkpdfFilename.push(file.name);
          // this.ArrayOfSelectedSavedFile.push(this.ponumber + "_invoice_" + this.getFileNameWOExtention(file.name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(file.name));
  
          // this.multiplactualfilenamearray.push(file.name);
          this.filecountofsupp = this.ArrayOfSelectedsupportbulkpdfFilename.length;
        }
        else {
          console.log("duplicate =================");
  
        }
      }
      else{
        this.ArrayOfSelectedsupportbulkpdfFile=[];
        this.ArrayOfSelectedsupportbulkpdfFilename = "";
        this.closePopup();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: '.'+this.ext+' is not allowed. Please try again',
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
        // this.successmessage = "Error while submitting. Please try again";
        // this.error = true;
        // this.showPopup();
      
        break;
      }
        console.log("ArrayOfSelectedsupportbulkpdfFilename "+this.ArrayOfSelectedsupportbulkpdfFilename);
      }
      // }
  
    }
    console.log(this.ArrayOfSelectedsupportbulkpdfFile);
    console.log("this.filecountofsupp >>" + this.filecountofsupp)
   }
    // this.uploadfile();
  }

  uploadfile(ev,type) {

  //  console.log( "ev.target.files.name",ev.target.files.name);
  this.loaderService.show();
    if(type=='invoice')
    {
      const formData = new FormData();

      this.bid = sessionStorage.getItem('Bid');
     
      for (var i = 0; i < this.ArrayOfSelectedbulkpdfFile.length; i++) {
        // if(this.validateFileExtension2(ev.target.files[0].name)){
        //   this.fileAttachmentError = "";
        
  
        console.log("this.ArrayOfSelectedFile[i].name ==> " + "bulkupload_" + this.bid + this.getFileNameWOExtention(this.ArrayOfSelectedbulkpdfFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedbulkpdfFile[i].name));
        formData.append("file[]", this.ArrayOfSelectedbulkpdfFile[i], "bulkupload_" + this.bid + "_" + this.getFileNameWOExtention(this.ArrayOfSelectedbulkpdfFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedbulkpdfFile[i].name));
      //  }
      //  else{
      //   alert("error");
      //   break;
         
      //  } 
      }
      // multipleinvoicefileuploadforbulk
      this.purchaseOrderListService.multiplefileupload(formData).subscribe(res => {
        console.log(res.toString);
        this.csvupload = true;
        this.supportenabled = true;
        this.loaderService.hide();
      });
    }
    else if(type == 'support')
    {
      this.suppdone = true;
      const formData = new FormData();
  
      this.bid = sessionStorage.getItem('Bid');
      for (var i = 0; i < this.ArrayOfSelectedsupportbulkpdfFile.length; i++) {
        // if(this.validateFileExtension2(ev.target.files[i].name)){
        //   this.fileAttachmentError = "";
        console.log("this.ArrayOfSelectedFile[i].name ==> " + "bulkupload_" + this.bid + this.getFileNameWOExtention(this.ArrayOfSelectedsupportbulkpdfFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedsupportbulkpdfFile[i].name));
        formData.append("file[]", this.ArrayOfSelectedsupportbulkpdfFile[i], "bulkupload_" + this.bid + "_" + this.getFileNameWOExtention(this.ArrayOfSelectedsupportbulkpdfFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedsupportbulkpdfFile[i].name));
        // }
        // else{
        //   alert()
        //   break;

        // }
      }
      // multipleinvoicefileuploadforbulk
      this.purchaseOrderListService.multiplefileupload(formData).subscribe(res => {
        console.log(res.toString);
        if(res[0].status == "Success")
        {
          this.csvupload = true;
          this.loaderService.hide();
        } 
        else if(res[0].status == "Fail")
        {
          this.closePopup();
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: res[0].message,
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
          this.loaderService.hide();
          return false;
        }
        
      });
    }
   

  }

  uploadcsvfile(ev) {
    this.loaderService.show();
    this.submitted = true;
    this.purchaseOrderListService.fileupload(this.CSVFile, this.csvfilename).subscribe(res => {
      console.log(JSON.stringify(res))
      res[0].data = true;
      if (res[0].status == "Success") {
        console.log("res[0].status " + res[0].status);
        // this.actualfilename = null;
        // this.actualfilename = "";
        // this.closePopup();
        // call bulk upload method.
        this.username = sessionStorage.getItem("loginUser");
        this.purchaseOrderListService.readandinsertbulkuploadfile(this.csvfilename, this.username).subscribe(res1 => {
          console.log(JSON.stringify(res1))
          // res1[0].data = true;
          if (res1[0].flag == "success") {
            this.loaderService.hide();
            this.errorlist = res1[0].errorrecords;
            this.flag = res1[0].flag;
            this.insertcount = res1[0].correctrecordscount;
            this.errorcount = res1[0].errorrecordscount;
            // this.closePopup();
            
          }
          else if (res1[0].flag == "fail") {
            this.loaderService.hide();
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: res1[0].message,
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
      }

    });
   

  }

  removeitem(index,removetype) {
    // delete this.ArrayOfSelectedFilename[index];
    if(removetype == 'invoice')
    {
      var tempname = this.ArrayOfSelectedbulkpdfFilename[index]
      console.log("this.ArrayOfSelectedbulkpdfFile "+this.ArrayOfSelectedbulkpdfFile);
      console.log("tempname "+tempname);
          this.ArrayOfSelectedbulkpdfFilename.splice(index, 1);
          // this.multiplsavedfilenamearray.splice(index, 1);
          this.ArrayOfSelectedbulkpdfSavedFile.splice(index, 1);
          this.filecount = this.filecount - 1;
          for (var k = 0; k < this.ArrayOfSelectedbulkpdfFile.length; k++) {
            if (this.ArrayOfSelectedbulkpdfFile[k].name == tempname) {
              this.ArrayOfSelectedbulkpdfFile.splice(k, 1);
            }
          }
          // if(this.ArrayOfSelectedFile[index]!=undefined ||this.ArrayOfSelectedFile[index].name != undefined )
          // {
          //   this.ArrayOfSelectedFile.splice(index, 1);
          // }
          console.log("this.ArrayOfSelectedFilename" + this.ArrayOfSelectedbulkpdfFilename.length);
    }
    else if(removetype == 'support')
    {
      var tempname = this.ArrayOfSelectedsupportbulkpdfFilename[index]
      console.log("this.ArrayOfSelectedsupportbulkpdfFile "+this.ArrayOfSelectedsupportbulkpdfFile);
      console.log("tempname "+tempname);
          this.ArrayOfSelectedsupportbulkpdfFilename.splice(index, 1);
          // this.multiplsavedfilenamearray.splice(index, 1);
          this.ArrayOfSelectedsupportbulkpdfSavedFile.splice(index, 1);
          this.filecountofsupp = this.filecountofsupp - 1;
          for (var k = 0; k < this.ArrayOfSelectedsupportbulkpdfFile.length; k++) {
            if (this.ArrayOfSelectedsupportbulkpdfFile[k].name == tempname) {
              this.ArrayOfSelectedsupportbulkpdfFile.splice(k, 1);
            }
          }
          // if(this.ArrayOfSelectedFile[index]!=undefined ||this.ArrayOfSelectedFile[index].name != undefined )
          // {
          //   this.ArrayOfSelectedFile.splice(index, 1);
          // }
          console.log("this.ArrayOfSelectedFilename" + this.ArrayOfSelectedsupportbulkpdfFile.length);
    }
  }

  close() {
    this.CSVFileName = '';
    this.CSVFileName = null;
    this.CSVFile = null;
    this.CSVFile = '';
    // this.fileupload = 'refileupload';
    // this.disable=true;

  }

  removesuppanddisablebutton()
  {
    this.ArrayOfSelectedsupportbulkpdfActualFile = [];
    this.ArrayOfSelectedsupportbulkpdfFile = [];
    this.ArrayOfSelectedsupportbulkpdfFilename = [];
    this.suppdone = true;
    this.csvupload = true;
  }

}


