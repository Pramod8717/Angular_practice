import { createDeliveryModel } from './../../../../models/createdelivery.model';
import { PurchaseOrderListService }from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { CreateDeliveryService } from './../../../../services/create-delivery.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';

@Component({
  selector: 'app-createdelivery',
  templateUrl: './createdelivery.component.html',
  styleUrls: ['./createdelivery.component.css']
})
export class CreateDeliveryComponent implements OnInit {
  @ViewChild (DialogModelComponent) dialogBox: DialogModelComponent;
  IGST: boolean = true;
  invoice: boolean = true;
  viewAttachmentName: string = "";
  InvalidAttachmentFileError =
  "Selected file is having Invalid extension. Valid file extensions are pdf, jpg & jpeg.";
  disable: boolean = false;

  createDeliverymodel = new createDeliveryModel();
  createDeliveryModel: createDeliveryModel[];
  public createDelivery = new FormGroup({
    PONumber: new FormControl(sessionStorage.getItem("poNumber"),Validators.required),
    lineItem: new FormControl(sessionStorage.getItem("lineItemData"),Validators.required),
    linItemText: new FormControl(sessionStorage.getItem("text"),Validators.required),
    ordernum: new FormControl('',Validators.required),
    orderquantity: new FormControl('',Validators.required),
    delDate: new FormControl('',Validators.required),
    emailId: new FormControl('',Validators.required),
    dispatchAddress: new FormControl('',Validators.required),
    Remark: new FormControl('',Validators.required),
    InvNumber: new FormControl(''),
    InvDate: new FormControl(''),
    InvAmount: new FormControl(''),
    InvIGST: new FormControl(''),
    InvCGST: new FormControl(''),
    InvSGST: new FormControl(''),
    TotAmount:new FormControl(''),
    description: new FormControl('',Validators.required),
    irnDate: new FormControl(''),
    irnNo: new FormControl(''),
    Totquantity:new FormControl(sessionStorage.getItem('totQuantity')),
    BalanceQty:new FormControl(sessionStorage.getItem('balQuantity')),
    attachments: new FormControl(''),
  })
  // get f() { return this.createDelivery.controls };

  public hasError = (controlName: string, errorName: string) => {
    return this.createDelivery.controls[controlName].hasError(errorName);
  }
  WithoutPO: boolean =false;
  cgstandsgstlist: { id: string; value: string; }[];
  igstlist: { id: string; value: string; }[];
  bignumbercgst: boolean;
  bignumbersgst: boolean;
  // disable: boolean;
  bignumber: boolean;
  specificsgst: boolean;
  specificcgst: boolean;
  successmessage: string;
  error: boolean;
  viewUploadFile: any = null;
  invoiceconfile: string;
  // viewAttachmentName: string = "";
  submitbutton: string = "";
  AttachmentValidExtension: string[] = ["PDF"];
  fileAttachmentError: string = "";
  irndetail: boolean = false;
  unitofmeasure: string;
  contactemail: any;
  vendor: any;
  company: any;
  plant: any;
  department: any;
  contactpersonphone: any;
  costcenter: any;
  category: any;
  bussinesspartnertext: any;
  success: boolean =false;
  data: any;
  ponumber: any;
  lineitemnumber: any;
  lineitemtext: any;
  quantity: any;
  contactpersonemailid: any;
  ordernumber: any;
  podetail: string;
  city: any;
  state: any;
  country: any;
  pincode: any;
  materialType: any;
  rateperQty: any;
  keepvalue=[]
  ordernum: any;
  orderQty: any;
  DelDate: any;
  remark: any;
  dispatchAddress: any;
  filepresent: boolean = false;
  balQuantity:any= sessionStorage.getItem("balQuantity");
  errormessage: string;
  balQuantity1: number;
  balQuantitys: number;
  errormsg: string;
  savedfilename: string;
  actualfilename: any;
  value: string="Invoice";
  
 

  constructor(private createdeliveryService: CreateDeliveryService ,public datepipe: DatePipe, private router: Router,private toastr: ToastrService, private purchaseOrderListService : PurchaseOrderListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.WithoutPO=false;
    this.disable=true;
   this.gstvalue();
   this.route.queryParams.subscribe(params => {
    console.log("is it working ???",params); // { order: "popular" }

    this.data = params.order;
    this.vendor = params.vendorId;
    this.contactemail = params.contactpersonemailid;
    console.log("this.contactemail ==>" + params.contactpersonemailid);
    console.log("this.contactemail ==>" + this.contactemail);
  }
  );
   console.log(this.createDelivery.controls['Totquantity'].value);
   var podetails = JSON.parse(sessionStorage.getItem("PODetails"));
    console.log("this.podetail is here ==> ", podetails);
    for (var i = 0; i < podetails.length; i++) {
      console.log(podetails[i]);
      this.ponumber = podetails[i].PO_NUMBER;
      this.bussinesspartnertext = podetails[i].BUSINESSPARTNERTEXT;
      this.category = podetails[i].CATEGORY;
      this.costcenter = podetails[i].COSTCENTRE;
      this.lineitemnumber = podetails[i].LINEITEMNUMBER;
      this.lineitemtext = podetails[i].LINEITEMTEXT;
      this.quantity = podetails[i].QUANTITY;
      this.unitofmeasure = podetails[i].UNITOFMEASURE;
      this.contactpersonemailid = podetails[i].CONTACTPERSONEMAILID;
      this.contactpersonphone = podetails[i].CONTACTPERSONPHONE;
      this.company = podetails[i].COMPANY;
      this.plant = podetails[i].PLANT;
      this.department = podetails[i].DEPARTMENT;
      this.ordernumber = podetails[i].ORDERNUMBER;
      this.city = podetails[i].CITY;
      this.state=podetails[i].STATE;
      this.country=podetails[i].COUNTRY;
      this.pincode=podetails[i].PINCODE;
      this.materialType=podetails[i].MATERIAL;
      this.rateperQty = podetails[i].RATEPERQTY;
    }
    console.log("RateperQty", this.rateperQty);
    
  }
  


  changeEvent(event) {
    let value = event.target.value
    
console.log("is value ???",this.keepvalue)
    if (value == "WithoutPO") {
      this.filepresent=true;
      console.log("in if");
      this.WithoutPO = true;
      this.disable=false;
      this.ordernum = this.createDelivery.controls.ordernum.value
      this.orderQty = this.createDelivery.controls.orderquantity.value
      this.DelDate = this.createDelivery.controls.delDate.value
      this.contactpersonemailid=this.createDelivery.controls.emailId.value
      this.dispatchAddress=this.createDelivery.controls.dispatchAddress.value
     this.remark=this.createDelivery.controls.Remark.value
     
      
      // this.createDelivery.get('irnNo').clearValidators();
      // this.createDelivery.get('irnDate').clearValidators();
      this.createDelivery.get('description').setValidators(null);
      this.createDelivery.get('TotAmount').setValidators(null);      
      this.createDelivery.get('InvSGST').setValidators(null);
      this.createDelivery.get('InvCGST').clearValidators();
      this.createDelivery.get('InvIGST').setValidators(null);
      this.createDelivery.get('InvAmount').setValidators(null);      
      this.createDelivery.get('InvDate').setValidators(null);      
      this.createDelivery.get('InvNumber').setValidators(null);      
      this.createDelivery.get('attachments').setValidators(null);
      this.createDelivery.get('irnDate').setValidators(null);
      this.createDelivery.get('irnNo').setValidators(null);

      this.createDelivery.reset();
      this.viewAttachmentName=null;
this.createDelivery.controls.BalanceQty.patchValue(sessionStorage.getItem("balQuantity"))
      this.createDelivery.controls.PONumber.patchValue(sessionStorage.getItem("poNumber"));
       this.createDelivery.controls.lineItem.patchValue(sessionStorage.getItem("lineItemData"));
       this.createDelivery.controls.linItemText.patchValue(sessionStorage.getItem("text"));
       this.createDelivery.controls.Totquantity.patchValue(sessionStorage.getItem("totQuantity"));
       this.createDelivery.controls.ordernum.patchValue(this.ordernum);
       this.createDelivery.controls.orderquantity.patchValue(this.orderQty);
       this.createDelivery.controls.delDate.patchValue(this.DelDate);
       this.createDelivery.controls.emailId.patchValue(this.contactpersonemailid)
       this.createDelivery.controls.dispatchAddress.patchValue(this.dispatchAddress)
      this.createDelivery.controls.Remark.patchValue(this.remark)
       console.log("this.createDelivery",this.createDelivery);

    }
    else {
      this.filepresent = false;
      console.log("in else");
      this.WithoutPO = false
      this.disable=false;
      this.createDelivery.get('description').setValidators(Validators.required);
      this.createDelivery.get('TotAmount').setValidators(Validators.required);      
      this.createDelivery.get('InvSGST').setValidators(Validators.required);
      this.createDelivery.get('InvCGST').setValidators(Validators.required);
      this.createDelivery.get('InvIGST').setValidators(Validators.required);
      this.createDelivery.get('InvAmount').setValidators(Validators.required);      
      this.createDelivery.get('InvDate').setValidators(Validators.required);      
      this.createDelivery.get('InvNumber').setValidators(Validators.required);      
      this.createDelivery.get('attachments').setValidators(Validators.required);

    }
  }

  checkIGST(event){
    let value = event.target.value
    this.createDelivery.controls['TotAmount'].setValue(this.createDelivery.controls['InvAmount'].value);
    if(value=="IGST"){
      this.IGST =true;
    }
    else{
      this.IGST = false;
    }
  }

  // checkInvoice(event) {
  //   let value = event.target.value
  //   if (value == "Invoice") {
  //     this.createDelivery.get('irnNo').setValidators(null);
  //     this.createDelivery.get('irnDate').setValidators(null);
  //     this.irndetail = false;
  //     this.invoice = true;
  //   }
  //   else {
  //     this.createDelivery.get('irnNo').setValidators(Validators.required);
  //     this.createDelivery.get('irnDate').setValidators(Validators.required);
  //     this.irndetail = true;
  //     this.invoice = false;
  //   }
  // }


  checkInvoice(event) {
    this.value = event.target.value
    if (this.value == "Invoice") {
      this.createDelivery.get('irnNo').clearValidators();
      this.createDelivery.get('irnDate').clearValidators();
      this.createDelivery.get('irnNo').updateValueAndValidity();
      this.createDelivery.get('irnDate').updateValueAndValidity();
      this.irndetail = false;
      this.invoice = true;
    }
    else {
      this.createDelivery.get('irnNo').setValidators(Validators.required);
      this.createDelivery.get('irnDate').setValidators(Validators.required);
      this.createDelivery.get('irnDate').updateValueAndValidity();
      this.createDelivery.get('irnNo').updateValueAndValidity();
      this.irndetail = true;
      this.invoice = false;
    }
  }
  submitInvoice(){
    var invoiceNumber = this.createDelivery.controls.InvNumber.value;
    var irnnumber= "";
    var irndate= "";
    var ponumber= this.createDelivery.controls.PONumber.value
    // var invoicedate= this.createDelivery.controls.InvDate.value
    var refno = "ref1234";
    var grnnumber = "";

    console.log("testing",this.createDelivery.controls.delDate.value)
var date = this.datepipe.transform(this.createDelivery.controls.delDate.value, 'yyyy-MM-dd');

console.log("date transform", date)
console.log("transform", this.createDelivery.value);
console.log("Formstatus", this.createDelivery.status);
this.createDeliverymodel = new createDeliveryModel();
this.createDeliverymodel.bid = sessionStorage.getItem("Bid");
this.createDeliverymodel.po_num = sessionStorage.getItem("poNumber");
this.createDeliverymodel.lineItemNumber = sessionStorage.getItem("lineItemData");
this.createDeliverymodel.lineItemText = sessionStorage.getItem("text");
this.createDeliverymodel.orderNumber =this.createDelivery.controls.ordernum.value;
this.createDeliverymodel.quantity = this.createDelivery.controls.orderquantity.value;
this.createDeliverymodel.deliveryDate=date;
this.createDeliverymodel.contactPersonEmailID = this.createDelivery.controls.emailId.value;
this.createDeliverymodel.deliveryAddress=this.createDelivery.controls.dispatchAddress.value;
this.createDeliverymodel.Remark=this.createDelivery.controls.Remark.value;
this.createDeliverymodel.businessPartnerText = this.bussinesspartnertext;
this.createDeliverymodel.category = this.category;
this.createDeliverymodel.costCentre = this.costcenter;
this.createDeliverymodel.unitOfMeasure=this.unitofmeasure;
this.createDeliverymodel.contactPersonPhone=this.contactpersonphone;
this.createDeliverymodel.company=this.company;
this.createDeliverymodel.plant=this.plant;
this.createDeliverymodel.department=this.department;
this.createDeliverymodel.city=this.city;
this.createDeliverymodel.state=this.state;
this.createDeliverymodel.country=this.country;
this.createDeliverymodel.pinCode=this.pincode;
this.createDeliverymodel.materialType=this.materialType;
this.createDeliverymodel.rateperqty= this.rateperQty;
// this.createDeliverymodel.Balance_qty=this.balQuantity

// this.createDelivery.controls.InvNumber.value;
// this.createDelivery.controls.InvDate.value;
// this.createDelivery.controls.InvAmount.value;
// this.createDelivery.controls.InvIGST.value;
// this.createDelivery.controls.InvCGST.value;
// this.createDelivery.controls.TotAmount.value;
// this.createDelivery.controls.description.value;
// this.createDelivery.controls.irnDate.value;
// this.createDelivery.controls.irnNo.value;
// this.createDelivery.controls.Totquantity.value;
// this.createDelivery.controls.BalanceQty.value;
// this.createDelivery.controls.attachments.value;

console.log("Data?????????", this.createDeliverymodel);

this.createDelivery.patchValue({'delDate':date});
// (<Control>this.form.controls['dept']).updateValue(selected.id)
if( this.WithoutPO==true || this.WithoutPO == false ){
  console.log("what is ??", this.WithoutPO);
  console.log("Formstatus222", this.createDelivery.status);
  this.balQuantity=Number(this.balQuantity)-Number(this.createDelivery.controls.orderquantity.value);
  this.createDeliverymodel.Balance_qty=this.balQuantity
  console.log("BalanceQuantity",this.balQuantity);
  
  sessionStorage.setItem("balQuantity", this.balQuantity);
  this.createDelivery.controls.BalanceQty.patchValue(this.balQuantity)
  
this.createdeliveryService.submitDelivery(this.createDelivery.value,this.lineitemtext,
  this.bussinesspartnertext,this.category,this.costcenter,this.unitofmeasure,this.contactpersonphone,
  this.company,this.plant,this.department,this.city,this.state,this.country,this.pincode,
  this.materialType,this.rateperQty,this.balQuantity,this.createDeliverymodel).subscribe(res =>{
  console.log("response",res);
  if(res[0].message=="Success"){
        // this.toastr.success("Delievery item created successfully")
       
       var resp= this.dialogBox.popUpOpen2('Delievery item created successfully','success','createdelivery');
       console.log("Angaj", resp);
       
       
       this.createDelivery.reset();
        // setTimeout(() => {
        //   this.router.navigate(['/purchaseOrdersList'])
        // }, 5000);
        this.createDelivery.controls.BalanceQty.patchValue(sessionStorage.getItem("balQuantity"))
       this.createDelivery.controls.PONumber.patchValue(sessionStorage.getItem("poNumber"));
       this.createDelivery.controls.lineItem.patchValue(sessionStorage.getItem("lineItemData"));
       this.createDelivery.controls.linItemText.patchValue(sessionStorage.getItem("text"));
       this.createDelivery.controls.Totquantity.patchValue(sessionStorage.getItem("totQuantity"));
      }
  else{
        this.dialogBox.popUpOpen2('Failed to save','error','createdelivery');
        // this.toastr.error("Failed to save")
  }
})

if(this.WithoutPO == false){
  if(this.data == 'lineitem'){
    var lineitemnumber = this.createDelivery.controls.lineItem.value;
    var ordernumber = this.createDelivery.controls.ordernum.value;
  }
    // var lineitemnumber = this.createDelivery.controls.lineItem.value
    // var ordernumber = this.createDelivery.controls.ordernum.value
    var quantity = this.createDelivery.controls.orderquantity.value
    var uoM = this.unitofmeasure;  //this
    var contactPerson =this.contactemail; // done 
    var contactPersonPhone = this.contactpersonphone; //done 
    var vendorid = this.vendor; // done 
    var company = this.company;
    var plant = this.plant;
    var department = this.department;
    var costcenter = this.costcenter;
    var category = this.category;
    var businessPartnerText = this.bussinesspartnertext;
    var profileid = "";
    var invoiceDocumentPath = "";
    var invoiceamount = this.createDelivery.controls['InvAmount'].value;
    var igstamount = "";
    var cgstamount = "";
    var sgstamount = "";
    var status = "A";
    var rawinvno = "";

    if (this.IGST == true) {
      igstamount = this.createDelivery.controls.InvIGST.value;
    }
    else {
      cgstamount = this.createDelivery.controls.InvCGST.value;
      sgstamount = this.createDelivery.controls.InvSGST.value;
    }
    var description = this.createDelivery.controls.description.value
    var totalamount = this.createDelivery.controls.TotAmount.value
    if (this.invoice != true) {
      irnnumber = this.createDelivery.controls['irnNo'].value;
      irndate = moment(new Date(this.createDelivery.controls['irnDate'].value)).format("DD/MM/YYYY");

    }


if (this.viewUploadFile != null && this.viewAttachmentName != "") {
  console.log("inininin");
  this.actualfilename = this.viewUploadFile.name;

  var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
  fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
  var fileName2 = fileName;
  fileName = ponumber + "_createdelivery_" + fileName;
  var savedfilename = fileName;
  console.log("FileName here" + fileName);
  this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
    console.log(JSON.stringify(res))
    res[0].data = true;
    if (res.length == 0) {
      this.toastr.error(res[0].message)
      // this.successmessage = "Data has been submitted successfully";

      //=--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
      return false;
    } 
    
    
    else if (res[0].status == "Success") {
      // var invoicedate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY")
      var invoicedate = moment(new Date(this.createDelivery.controls['InvDate'].value)).format("DD/MM/YYYY")
      this.purchaseOrderListService.invoicesubmission(irnnumber, irndate, ponumber, invoiceNumber, invoicedate,
        refno, grnnumber, lineitemnumber, ordernumber, quantity, uoM, contactPerson, contactPersonPhone,
        vendorid, company, plant, department, costcenter, category, businessPartnerText, profileid, invoiceDocumentPath,
        invoiceamount, igstamount, cgstamount, sgstamount, totalamount, description, status, this.actualfilename, savedfilename, this.balQuantity,rawinvno).subscribe(res => {
          if (res[0].message == "Success") {
            this.dialogBox.popUpOpen2('Data has been submitted successfully','success','createdelivery');
            // this.toastr.success("Invoice Has Been Submitted Successfully")
            console.log("Inin");
            this.successmessage = "Invoice Has Been Submitted Successfully";
            this.success = true;
            // this.showPopup();
            this.createDelivery.reset();
            this.viewAttachmentName=null;
          }
          else {
            // this.toastr.error(res[0].message)
            // this.dialogBox.popUpOpen2('Error while submitting. Please try again','error','invoicesubmit');
            this.successmessage = "Error while submitting. Please try again";
            this.error = true;
            // this.showPopup();
          }
        })
    }
    
    


    else {
      // this.toastr.error(res[0].message)
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
    // =--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
    return false;
  }
}
else {
  //=--this.dialogBox.popUpOpen2('Please upload the File', 'leave', 'error2');
  return false;
}
}
  
}

    
 

    // this.purchaseOrderListService.invoicesubmission(irnnumber, irndate, ponumber, invoiceNumber, invoicedate,
    //   refno, grnnumber, lineitemnumber, ordernumber, quantity, uoM, contactPerson, contactPersonPhone,
    //   vendorid, company, plant, department, costcenter, category, businessPartnerText, profileid, invoiceDocumentPath,
    //   invoiceamount, igstamount, cgstamount, sgstamount, totalamount, description, status, actualfilename, savedfilename).subscribe(res => {
    //     if (res[0].message == "Success") {
    //       // this.toastr.success("Invoice Has Been Submitted Successfully")
    //       console.log("Inin");
    //       this.successmessage = "Invoice Has Been Submitted Successfully";
    //       this.success = true;
    //       this.showPopup();
    //     }
    //     else {
    //       // this.toastr.error(res[0].message)
    //       this.successmessage = "Error while submitting. Please try again";
    //       this.error = true;
    //       this.showPopup();
    //     }
    //   })
  }

  getFileNameWOExtention(name) {
    // return name.split(".")[0];
    var flName = name.substr(0, name.lastIndexOf(".")).replace(/_/g, "-").replace(/\./g, "-");
    return flName;
  }
  validateFileExtension(fileName) {
    let fileExtension: string = this.getExtensionOfFile(fileName);
    for (let i = 0; i < this.AttachmentValidExtension.length; i++) {
      if (this.AttachmentValidExtension[i] == fileExtension.toUpperCase())
        return true;
    }
    return false;
  }

  showPopup() {
    // this.purchaseOrderListModel.PONumber = poNumber;
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
  }
  getExtensionOfFile(name) {
    return name.split(".")[name.split(".").length - 1];
  }

  getTimeStampFileName(fileName, extension) {
    console.log(Date.now().toString());
    return fileName + Date.now().toString() + "." + extension;
  }

  onFileSelectEvent(e, type) {
    this.filepresent = true;
    this.viewUploadFile = null;
    this.viewAttachmentName = "";
    console.log(e.target.files[0]);
    if (this.validateFileExtension(e.target.files[0].name)) {
      this.fileAttachmentError = "";
      this.viewUploadFile = e.target.files[0];
      if (type == "createdelivery") {
        this.invoiceconfile = e.target.files[0];
        this.viewAttachmentName = this.viewUploadFile.name;
        this.createDelivery.controls['attachments'].setValue(this.viewAttachmentName);
      }
      this.actualfilename = this.viewUploadFile.name;
      console.log("this.invoiceconfile " + this.invoiceconfile);
      console.log("this.viewAttachmentName ==> " + this.viewAttachmentName);
      var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
      fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
      var fileName2 = fileName;
      fileName = this.ponumber + "_invoice_" + fileName;
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
        else if (res[0].status == "Success") {

          // this.getIRNNumber();
          if(this.value=="Einvoice"){
          this.purchaseOrderListService.getIRNNumber(this.actualfilename,this.savedfilename).subscribe(res => {
            console.log("response of IrnDAta", res[0].message);

            if(res[0].message=="Success"){
            var datestring =  res[0].invoiceData[0].IR_DocDt;
            var formatdate = moment(datestring, "DD/MM/YYYY")
            var dateobj = formatdate.toDate();
            console.log("transformed date ===>", new Date(res[0].invoiceData[0].IR_DocDt),dateobj);
            
            this.createDelivery.controls.irnNo.setValue(res[0].invoiceData[0].IRN_Number);
            this.createDelivery.controls.irnDate.setValue(dateobj);
            this.dialogBox.popUpOpen2('E-Invoice has been uploaded successfully', 'success', 'Einvoice');
            }
            else{
              this.dialogBox.popUpOpen2('QR code not readable. Please upload original E-Invoice.','error','Einvoice')
            }
          })
        }

          // this.RevisedbalQuantity = Number(this.balQuantity) - Number(this.invoiceForm.controls.Quantity.value);
          // console.log("Quantity revise ",this.RevisedbalQuantity,"balance", this.balQuantity,"total", this.totQuantity, "input" );

          // totalamount = this.invoiceForm.controls['invoiceamount'].value;
          // this.purchaseOrderListService.invoicesubmission(irnnumber, irndate, ponumber, invoiceNumber, invoicedate,
          //   refno, grnnumber, lineitemnumber, ordernumber, quantity, uoM, contactPerson, contactPersonPhone,
          //   vendorid, company, plant, department, costcenter, category, businessPartnerText, profileid, invoiceDocumentPath,
          //   invoiceamount, igstamount, cgstamount, sgstamount, totalamount, description, status, actualfilename, savedfilename, this.RevisedbalQuantity
          //   ,rawinvno).subscribe(res => {

          //     if (res[0].message == "Success") {
          //       this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
          //       // this.dialogBox.popUpOpen2('Invoice has been submitted successfully','success','invoicesubmit');
          //       // this.toastr.success("Invoice Has Been Submitted Successfully")
          //       console.log("Inin");
          //       this.invoiceForm.reset();
          //       // this.invoiceconfile = null;
          //       this.viewAttachmentName = "";
          //       this.successmessage = "Invoice Has Been Submitted Successfully";
          //       this.success = true;
          //       // this.showPopup();
          //     }
          //     else {
          //       this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
          //       // this.toastr.error(res[0].message)
          //       // this.dialogBox.popUpOpen2('Error while submitting. Please try again','error','invoicesubmit');
          //       this.successmessage = "Error while submitting. Please try again";
          //       this.error = true;
          //       // this.showPopup();
          //     }
          //   })
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

    $(".fileSelectBtn").blur();
  }

  numberOnly(event): boolean {
   
    if (this.createDelivery.controls.orderquantity.value.length == 0 && event.which == 48 ){
      return false;
   }
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log("working")
      return false;
    }
    console.log(" No working")
    // this.balanceQuantity()
    return true;
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

  totalingfunction(n, type) {
    console.log("calling....");
    
   var tempigstvalue = 0;
   var tempcgstvalue = 0;
   var tempsgstvalue = 0;
   var tempinvoiceamount = 0;
   if (type == "cgst") {
     this.specificsgst = true;
     this.createDelivery.controls['InvSGST'].setValue(this.createDelivery.controls['InvCGST'].value);
   }
   else if (type == "sgst") {
     this.specificcgst = true;
     this.createDelivery.controls['InvCGST'].setValue(this.createDelivery.controls['InvSGST'].value)
   }
   this.disable = false;
   console.log("this.createDelivery.controls['InvIGST'].value" ,this.createDelivery.controls['InvIGST'].value);
   console.log("this.createDelivery.controls['TotAmount'].value" , this.createDelivery.controls['TotAmount'].value);

   tempigstvalue = this.parsefloatvalue(this.createDelivery.controls['InvIGST'].value ? this.createDelivery.controls['InvIGST'].value : 0);
   tempcgstvalue = this.parsefloatvalue(this.createDelivery.controls['InvCGST'].value ? this.createDelivery.controls['InvCGST'].value : 0);
   tempsgstvalue = this.parsefloatvalue(this.createDelivery.controls['InvSGST'].value ? this.createDelivery.controls['InvSGST'].value : 0);
   tempinvoiceamount = this.parsefloatvalue(this.createDelivery.controls['InvAmount'].value ? this.createDelivery.controls['InvAmount'].value : 0);


   if (this.IGST) {
     if (this.parsefloatvalue(tempigstvalue) > 100) {
       console.log("inin");
       this.bignumber = true;
       this.disable = true;
       return false;
     }
     else {
       this.bignumber = false;
       this.disable = false;
     }
     console.log("tempigstvalue" + tempigstvalue);
     console.log("tempinvoiceamount" + tempinvoiceamount);
     if (this.parsefloatvalue(tempigstvalue) > 100) {
       console.log("inin");
       this.bignumber = true;
       this.disable = true;
       return false;
     }
     else {
       this.bignumber = false;
       this.disable = false;
     }
     console.log("n is here" + n);
     this.createDelivery.controls['TotAmount'].setValue(
       this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
         + (this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempigstvalue) / 100))));
   }
   else {

     if (this.parsefloatvalue(tempcgstvalue) > 100) {
       console.log("inin");
       this.bignumbercgst = true;
       this.bignumbersgst = false;
       this.disable = true;
       return false;
     }
     else if (this.parsefloatvalue(tempsgstvalue) > 100) {
       console.log("inin");
       this.bignumbercgst = false;
       this.bignumbersgst = true;
       this.disable = true;
       return false;

     }
     else {
       this.bignumbercgst = false;
       this.bignumbersgst = false;
       this.disable = false;
     }
     console.log("n is here" + n);
     if (type == "cgst") {
       this.createDelivery.controls['TotAmount'].setValue(
         this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
           + ((this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempcgstvalue) / 100)))));
     }
     else if (type == "sgst") {
       this.createDelivery.controls['TotAmount'].setValue(
         this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
           + ((this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempsgstvalue) / 100)))));
     }

     // this.createDelivery.controls['totalamount'].setValue(
     //   this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
     //     + ((this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempcgstvalue) / 100)) +
     //       (this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempsgstvalue) / 100)))));

   }
   console.log("n is here" + n);
   console.log(this.createDelivery.controls['TotAmount'].value);

 }

  parsefloatvalue(val) {
    if (val == null) {
      return 0;
    }
    else {
      return parseFloat(val);
    }
  }

  keyPressAlphanumeric(event): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) 
      || (charCode >= 48 && charCode <= 57) || charCode == 32 ||
     charCode == 45 || charCode == 47 || charCode == 92)
    {
      return true;
    }
    return false;
  }


  //  keyPressAlphanumeric(n)
  // {
  //   var regex = new RegExp("^[a-zA-Z0-9 ]+$");
  //   var str = String.fromCharCode(!n.charCode ? n.which : n.charCode);
  //   if (regex.test(str)) {
  //       return true;
  //   }
  //   n.preventDefault();
  //   return false;
  // }

  balanceQuantity(){
    // this.createDelivery.controls.BalanceQty.setValue(Number(this.balQuantity)-Number(this.createDelivery.controls.orderquantity.value));
    this.balQuantitys=  Number(this.balQuantity)-Number(this.createDelivery.controls.orderquantity.value)
   this.disable=false;
console.log("balqty", this.balQuantitys);
// if(this.createDelivery.controls.orderquantity.value.value.startsWith(0)){ this.errormessage="can't start with zero"}

   this.createDelivery.controls.InvAmount.setValue(Number(this.rateperQty) * Number(this.createDelivery.controls.orderquantity.value));
   this.createDelivery.controls.TotAmount.setValue(Number(this.rateperQty) * Number(this.createDelivery.controls.orderquantity.value)); 
   if(this.balQuantitys<1){
      this.errormessage="order quantity is greater than balance quantity"
      console.log(this.errormessage);
      this.disable=true;
      // this.createDelivery.controls.BalanceQty.setValue(0)

    }

  }

  ValidateEmail(event) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
      this.disable = false;
      return (true)
    }
    this.disable = true;
    // alert("You have entered an invalid email address!")
    this.errormsg="* please enter a valid mail id"
    return (false)
  }

  close(){
    this.viewAttachmentName='';
    this.createDelivery.controls.irnNo.setValue(null);
    this.createDelivery.controls.irnDate.setValue(null)
  }

}
