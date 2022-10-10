import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import * as moment from 'moment/moment';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
// import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
declare var $: any;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
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
  RevisedbalQuantity: any;
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
  rateperqty: any;
  //file upload
  viewUploadFile: any = null;
  invoiceconfile: string;
  viewAttachmentName: string = "";
  submitbutton: string = "";
  maxdate: Date;
  podate: string;
  mindate: Date;
  AttachmentValidExtension: string[] = ["PDF"];

  fileAttachmentError: string = "";
  success: boolean = false;
  error: boolean = false;
  //fileAttachmentError = [];
  InvalidAttachmentFileError =
    "Selected file is having Invalid extension. Valid file extensions are pdf, jpg & jpeg.";

  public invoiceForm = new FormGroup({
    irnNo: new FormControl(''),
    irnDate: new FormControl(''),
    invoiceNo: new FormControl('', Validators.required),
    invoiceDate: new FormControl('', Validators.required),
    invoiceamount: new FormControl(''), //, [Validators.required, Validators.pattern("^[0-9]*$")]
    igstvalue: new FormControl(''),
    cgstvalue: new FormControl(''),
    sgstvalue: new FormControl(''),
    totalamount: new FormControl(''),
    description: new FormControl('', Validators.required),
    attachments: new FormControl('', Validators.required),
    Quantity: new FormControl('', Validators.required),
    BalanceQty: new FormControl('')
    // paymentMethod : new FormControl('',Validators.required),
    // mileStone : new FormControl('',Validators.required),
    // signedBy : new FormControl('',Validators.required)
  })

  public hasError = (controlName: string, errorName: string) => {
    return this.invoiceForm.controls[controlName].hasError(errorName);
  }
  nonediatble: boolean = false;
  balQuantity: any;
  poDetail: any;
  lineitemnumbers: any;
  lineitemnumberset: any;
  uniquelineitems: any;
  uniquelineitem: any[];
  errormessage: string;
  totQuantity: string;
  balQuantity1: number;
  rawinvoicenumber: string;
  rawinvoicedate: string;
  invoicealreadypresent: boolean = false;
  useremail: string;
  temprawinvoicenumber: string;
  value: any ="Invoice";
  actualfilename: any;
  savedfilename: string;
  // maxdate: Date;
  // podate: string;
  // mindate: Date;


  constructor(private purchaseOrderListService: PurchaseOrderListService,
    private route: ActivatedRoute, private router: Router, private toastr: ToastrService,
    private loaderservice: LoaderService) {

    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //         this.data = this.router.getCurrentNavigation().extras.state.clickthrough;
    //         console.log('this.data ==>'+this.data);
    //       }
    //     });
  }

  ngOnInit(): void {

    var dateString = "10/23/2015"; // Oct 23

var dateObject = new Date(dateString);

console.log(this.value,"+++++++++++++++++++++++++");

    // this.getIRNNumber()
    // this.rawinvoicenumber = localStorage.getItem('INVOICENUMBER');
    // this.rawinvoicedate = localStorage.getItem('INVOICEDATE');
    // this.useremail = localStorage.getItem('EMAILIDUSER');
    // if(this.rawinvoicedate != '')
    // {
    //   this.invoicealreadypresent = true;
    //   this.invoiceForm.controls.invoiceNo.setValue(this.rawinvoicenumber);
    //   this.invoiceForm.controls.invoiceDate.setValue(new Date(this.rawinvoicedate));
    // }
    this.route.queryParams.subscribe(params => {
      console.log(params); // { order: "popular" }

      this.data = atob(params.order);
      this.vendor = atob(params.vendorId);
      this.contactemail = atob(params.contactpersonemailid);
      this.podate = atob(params.dt)

      this.rawinvoicenumber = atob(params.in);
      this.rawinvoicedate = atob(params.id);
      if (this.rawinvoicedate != '') {
        this.invoicealreadypresent = true;
        this.invoiceForm.controls.invoiceNo.setValue(this.rawinvoicenumber);
        this.temprawinvoicenumber = this.rawinvoicenumber;
        this.invoiceForm.controls.invoiceDate.setValue(new Date(this.rawinvoicedate));
      }
      console.log("this.contactemail ==>" + params.contactpersonemailid);
      console.log("this.contactemail ==>" + this.contactemail);
    }
    );
    this.maxdate = new Date();
    this.mindate = new Date(this.podate);
    // this.podetail = JSON.parse(sessionStorage.getItem("PODetails"));
    var podetails = JSON.parse(sessionStorage.getItem("PODetails"));
    console.log("this.podetail is here ==> ", this.podetail);
    for (var i = 0; i < podetails.length; i++) {

      console.log(podetails[i]);
      this.ponumber = podetails[i].PO_NUMBER;
      this.bussinesspartnertext = podetails[i].BUSINESSPARTNERTEXT;
      this.category = podetails[i].CATEGORY;
      this.costcenter = podetails[i].COSTCENTRE;
      this.lineitemnumber = podetails[i].LINEITEMNUMBER;
      this.lineitemtext = podetails[i].LINEITEMTEXT;
      this.quantity = podetails[i].QUANTITY;
      if (this.data == 'orderitem') {
        this.invoiceForm.controls.Quantity.setValue(this.quantity);
      }
      this.balQuantity = podetails[i].BALANCE_QTY
      this.invoiceForm.controls.BalanceQty.setValue(this.balQuantity)
      this.unitofmeasure = podetails[i].UNITOFMEASURE;
      this.contactpersonemailid = podetails[i].CONTACTPERSONEMAILID;
      this.contactpersonphone = podetails[i].CONTACTPERSONPHONE;
      this.company = podetails[i].COMPANY;
      this.plant = podetails[i].PLANT;
      this.department = podetails[i].DEPARTMENT;
      this.ordernumber = podetails[i].ORDERNUMBER;
      this.rateperqty = podetails[i].RATEPERQTY

    }
    if (this.data == 'lineitem' || this.data == 'orderitem') {
      this.nonediatble = true;
      this.invoiceForm.controls.invoiceamount.setValue(Number(this.rateperqty) * Number(this.quantity))
      this.totQuantity = sessionStorage.getItem("totQuantity");

    }
    this.gstvalue();
  }


  getPOitems(POnumber) {
    this.uniquelineitems = [];
    this.uniquelineitem = [];
    sessionStorage.setItem("poNumber", POnumber);
    console.log("in here");
    this.purchaseOrderListService.getPODetails(POnumber).subscribe(res => {
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
        this.lineitemnumbers.push(this.poDetail[i].LINEITEMNUMBER);
      }
      console.log("this.lineitemnumber. " + this.lineitemnumbers);
      var mySet = new Set(this.lineitemnumbers);
      mySet.forEach(v => this.lineitemnumberset.push(v));
      console.log("Set items this.lineitemnumberset ==>" + this.lineitemnumberset);

      console.log(removeDuplicates(res[0].poData, 'LINEITEMNUMBER'));

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

  checkIGST(event) {
    let value = event.target.value
    // this.invoiceForm.controls['totalamount'].setValue(this.invoiceForm.controls['invoiceamount'].value);
    // const phoneControl = this.invoiceForm.get('phone');
    // console.log("value is here " + value);
    if (value == "IGST") {
      //   this.invoiceForm.controls['igstvalue'].setValue(null);
      this.IGST = true;
      //   this.invoiceForm.get('igstvalue').setValidators(Validators.required);
      //   this.invoiceForm.get('cgstvalue').clearValidators();
      //   this.invoiceForm.get('sgstvalue').clearValidators();
      //   this.invoiceForm.get('cgstvalue').reset;
      //   this.invoiceForm.get('sgstvalue').reset;
    }
    else {
      //   this.invoiceForm.controls['sgstvalue'].setValue(null);
      //   this.invoiceForm.controls['cgstvalue'].setValue(null);
      //   this.invoiceForm.get('igstvalue').clearValidators();
      //   this.invoiceForm.get('igstvalue').reset;
      //   this.invoiceForm.get('cgstvalue').setValidators(Validators.required);
      //   this.invoiceForm.get('sgstvalue').setValidators(Validators.required);
      this.IGST = false;
    }
  }

  // checkInvoice(event) {
  //   let value = event.target.value
  //   if (value == "Invoice") {
  //     this.invoiceForm.get('irnNo').setValidators(null);
  //     this.invoiceForm.get('irnDate').setValidators(null);
  //     this.irndetail = false;
  //     this.invoice = true;
  //   }
  //   else {
  //     this.invoiceForm.get('irnNo').setValidators(Validators.required);
  //     this.invoiceForm.get('irnDate').setValidators(Validators.required);
  //     this.irndetail = true;
  //     this.invoice = false;
  //   }
  // }


  checkInvoice(event) {
    this.value = event.target.value
    console.log("value is here ==>" + this.value);
    if (this.value == "Invoice") {
      // this.invoiceForm.get('irnNo').setValidators(null);
      // this.invoiceForm.get('irnDate').setValidators(null);
      this.invoiceForm.get('irnDate').clearValidators();
      this.invoiceForm.get('irnNo').clearValidators();
      this.invoiceForm.get('irnNo').updateValueAndValidity();
      this.invoiceForm.get('irnDate').updateValueAndValidity();
      this.irndetail = false;
      this.invoice = true;
    }
    else {
      this.invoiceForm.get('irnNo').setValidators(Validators.required);
      this.invoiceForm.get('irnDate').setValidators(Validators.required);
      this.invoiceForm.get('irnNo').updateValueAndValidity();
      this.invoiceForm.get('irnDate').updateValueAndValidity();
      this.irndetail = true;
      this.invoice = false;
    }
  }

  submitinvoicedetail() {
    console.log("is valid??", this.invoiceForm);


    this.loaderservice.show();
    var ponumber = this.ponumber;
    var irnnumber = "";
    var irndate = "";
    if (this.invoice != true) {
      irnnumber = this.invoiceForm.controls['irnNo'].value;
      irndate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");

    }

    var invoiceNumber = this.invoiceForm.controls['invoiceNo'].value;

    // var invoicedate = this.POOrderList.controls['InvDate'].value;
    var invoicedate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY")
    var refno = "ref1234";
    var grnnumber = "";
    if (this.data == "poitem") {
      var lineitemnumber = "-";
      var ordernumber = "-";
    }
    else if (this.data == "lineitem") {
      var lineitemnumber = this.lineitemnumber;
      var ordernumber = "-";
    }
    else if (this.data == "orderitem") {
      var lineitemnumber = this.lineitemnumber;
      var ordernumber = this.ordernumber;
    }

    var quantity = this.invoiceForm.controls.Quantity.value;
    var uoM = this.unitofmeasure;
    var contactPerson = sessionStorage.getItem("Requisitioner");
    var contactPersonPhone = this.contactpersonphone;
    var vendorid = this.vendor;
    var company = this.company;
    var plant = this.plant;
    var department = this.department;
    var costcenter = this.costcenter;
    var category = this.category;
    // var businessPartnerText = this.bussinesspartnertext;
    var businessPartnerText = sessionStorage.getItem("Bussinesspartnertext")
    var profileid = "";
    var invoiceDocumentPath = "";
    var invoiceamount = this.invoiceForm.controls['invoiceamount'].value;
    var igstamount = "";
    var cgstamount = "";
    var sgstamount = "";
    if (this.IGST == true) {
      igstamount = this.invoiceForm.controls['igstvalue'].value;
    }
    else {
      cgstamount = this.invoiceForm.controls['cgstvalue'].value;
      sgstamount = this.invoiceForm.controls['sgstvalue'].value;
    }


    var totalamount = this.invoiceForm.controls['totalamount'].value;
    var description = this.invoiceForm.controls['description'].value;
    var status = "P";

    var rawinvno = this.temprawinvoicenumber;

    
    this.RevisedbalQuantity = Number(this.balQuantity) - Number(this.invoiceForm.controls.Quantity.value);
    // console.log("Quantity revise ",this.RevisedbalQuantity,"balance", this.balQuantity,"total", this.totQuantity, "input" );

    totalamount = this.invoiceForm.controls['invoiceamount'].value;
    this.purchaseOrderListService.invoicesubmission(irnnumber, irndate, ponumber, invoiceNumber, invoicedate,
      refno, grnnumber, lineitemnumber, ordernumber, quantity, uoM, contactPerson, contactPersonPhone,
      vendorid, company, plant, department, costcenter, category, businessPartnerText, profileid, invoiceDocumentPath,
      invoiceamount, igstamount, cgstamount, sgstamount, totalamount, description, status, this.actualfilename, this.savedfilename, this.balQuantity    //this.RevisedbalQuantity
      , rawinvno).subscribe(res => {

        if (res[0].message == "Success") {
          this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
          // this.dialogBox.popUpOpen2('Invoice has been submitted successfully','success','invoicesubmit');
          // this.toastr.success("Invoice Has Been Submitted Successfully")
          console.log("Inin");
          this.invoiceForm.reset();
          // this.invoiceconfile = null;
          this.viewAttachmentName = "";
          this.successmessage = "Invoice Has Been Submitted Successfully";
          this.success = true;
          // this.showPopup();
        }
        else {
          this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
          // this.toastr.error(res[0].message)
          // this.dialogBox.popUpOpen2('Error while submitting. Please try again','error','invoicesubmit');
          this.successmessage = "Error while submitting. Please try again";
          this.error = true;
          // this.showPopup();
        }
      })
    // if (this.viewUploadFile != null && this.viewAttachmentName != "") {
    //   console.log("inininin");
    //   var actualfilename = this.viewUploadFile.name;

    //   var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
    //   fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
    //   var fileName2 = fileName;
    //   fileName = ponumber + "_invoice_" + fileName;
    //   var savedfilename = fileName;
    //   console.log("FileName here" + fileName);
    //   this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
    //     console.log(JSON.stringify(res))
    //     res[0].data = true;
    //     if (res.length == 0) {
    //       this.toastr.error(res[0].message)
    //       // this.successmessage = "Data has been submitted successfully";

    //       //=--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
    //       return false;
    //     }
    //     else if (res[0].status == "Success") {


    //       this.RevisedbalQuantity = Number(this.balQuantity) - Number(this.invoiceForm.controls.Quantity.value);
    //       // console.log("Quantity revise ",this.RevisedbalQuantity,"balance", this.balQuantity,"total", this.totQuantity, "input" );

    //       totalamount = this.invoiceForm.controls['invoiceamount'].value;
    //       this.purchaseOrderListService.invoicesubmission(irnnumber, irndate, ponumber, invoiceNumber, invoicedate,
    //         refno, grnnumber, lineitemnumber, ordernumber, quantity, uoM, contactPerson, contactPersonPhone,
    //         vendorid, company, plant, department, costcenter, category, businessPartnerText, profileid, invoiceDocumentPath,
    //         invoiceamount, igstamount, cgstamount, sgstamount, totalamount, description, status, actualfilename, savedfilename, this.RevisedbalQuantity
    //         , rawinvno).subscribe(res => {

    //           if (res[0].message == "Success") {
    //             this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
    //             // this.dialogBox.popUpOpen2('Invoice has been submitted successfully','success','invoicesubmit');
    //             // this.toastr.success("Invoice Has Been Submitted Successfully")
    //             console.log("Inin");
    //             this.invoiceForm.reset();
    //             // this.invoiceconfile = null;
    //             this.viewAttachmentName = "";
    //             this.successmessage = "Invoice Has Been Submitted Successfully";
    //             this.success = true;
    //             // this.showPopup();
    //           }
    //           else {
    //             this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
    //             // this.toastr.error(res[0].message)
    //             // this.dialogBox.popUpOpen2('Error while submitting. Please try again','error','invoicesubmit');
    //             this.successmessage = "Error while submitting. Please try again";
    //             this.error = true;
    //             // this.showPopup();
    //           }
    //         })
    //     }
    //     else {
    //       // this.toastr.error(res[0].message)
    //       this.dialogBox.popUpOpen2('Error while submitting. Please try again', 'error', 'invoicesubmit');
    //       this.successmessage = "Error while submitting. Please try again";
    //       this.error = true;
    //       this.showPopup();
    //       //=-- this.dialogBox.popUpOpen2('Maximum file size (10 MB) exceeded.', 'donate', 'error2');
    //       return false;
    //     }

    //   });
    //   err => {
    //     // this.toastr.error(err)
    //     this.successmessage = err;
    //     this.error = true;
    //     this.showPopup();
    //     this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'error', 'invoicesubmit');
    //     // =--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
    //     return false;
    //   }
    // }
    // else {
    //   //=--this.dialogBox.popUpOpen2('Please upload the File', 'leave', 'error2');
    //   this.dialogBox.popUpOpen2('Please upload the File', 'error', 'invoicesubmit');
    //   return false;
    // }
    this.loaderservice.hide();

  }

  totalingfunction(n, type) {
    var tempigstvalue = 0;
    var tempcgstvalue = 0;
    var tempsgstvalue = 0;
    var tempinvoiceamount = 0;
    if (type == "cgst") {
      this.specificsgst = true;
      this.invoiceForm.controls['sgstvalue'].setValue(this.invoiceForm.controls['cgstvalue'].value);
    }
    else if (type == "sgst") {
      this.specificcgst = true;
      this.invoiceForm.controls['cgstvalue'].setValue(this.invoiceForm.controls['sgstvalue'].value)
    }
    this.disable = false;
    console.log("this.invoiceForm.controls['igstvalue'].value" + this.invoiceForm.controls['igstvalue'].value);
    console.log("this.invoiceForm.controls['invoiceamount'].value" + this.invoiceForm.controls['invoiceamount'].value);

    tempigstvalue = this.parsefloatvalue(this.invoiceForm.controls['igstvalue'].value ? this.invoiceForm.controls['igstvalue'].value : 0);
    tempcgstvalue = this.parsefloatvalue(this.invoiceForm.controls['cgstvalue'].value ? this.invoiceForm.controls['cgstvalue'].value : 0);
    tempsgstvalue = this.parsefloatvalue(this.invoiceForm.controls['sgstvalue'].value ? this.invoiceForm.controls['sgstvalue'].value : 0);
    tempinvoiceamount = this.parsefloatvalue(this.invoiceForm.controls['invoiceamount'].value ? this.invoiceForm.controls['invoiceamount'].value : 0);


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
      this.invoiceForm.controls['totalamount'].setValue(
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
        this.invoiceForm.controls['totalamount'].setValue(
          this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
            + ((this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempcgstvalue) / 100)))));
      }
      else if (type == "sgst") {
        this.invoiceForm.controls['totalamount'].setValue(
          this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
            + ((this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempsgstvalue) / 100)))));
      }

      // this.invoiceForm.controls['totalamount'].setValue(
      //   this.parsefloatvalue(this.parsefloatvalue(tempinvoiceamount)
      //     + ((this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempcgstvalue) / 100)) +
      //       (this.parsefloatvalue(tempinvoiceamount) * (this.parsefloatvalue(tempsgstvalue) / 100)))));

    }
    console.log("n is here" + n);
    console.log(this.invoiceForm.controls['invoiceamount'].value);

  }

  parseIntvalue(val) {
    if (val == null) {
      return 0;
    }
    else {
      return parseInt(val);
    }
  }
  parsefloatvalue(val) {
    if (val == null) {
      return 0;
    }
    else {
      return parseFloat(val);
    }
  }
  showPopup() {
    // this.purchaseOrderListModel.PONumber = poNumber;
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
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

  changedateformat() {
    console.log("in here");
    console.log(this.invoiceForm.controls['invoiceDate'].value);
    this.invoiceForm.controls['invoiceDate'].setValue(formatDate(this.invoiceForm.controls['invoiceDate'].value, 'DD-MMM-YYYY', 'en'));
    // picker.close();
    // return true;
  }

  getFileNameWOExtention(name) {
    // return name.split(".")[0];
    var flName = name.substr(0, name.lastIndexOf(".")).replace(/_/g, "-").replace(/\./g, "-");
    return flName;
  }

  validateFileExtension(fileName) {
    let fileExtension: string = this.getExtensionOfFile(fileName);
    console.log("fileExtension " + fileExtension);
    for (let i = 0; i < this.AttachmentValidExtension.length; i++) {
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
        this.invoiceForm.controls['attachments'].setValue(this.viewAttachmentName);
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
            
            this.invoiceForm.controls.irnNo.setValue(res[0].invoiceData[0].IRN_Number);
            this.invoiceForm.controls.irnDate.setValue(dateobj);
            this.invoiceForm.controls.invoiceNo.setValue(res[0].invoiceData[0].Invoice_Number);
            this.invoiceForm.controls.invoiceDate.setValue(dateobj);

            this.dialogBox.popUpOpen2('E-Invoice has been uploaded successfully', 'success', 'Einvoice');
            }
            else{
              this.dialogBox.popUpOpen2('QR code not readable. Please upload original E-Invoice.','error','Einvoice')
            }
          })
        }

          this.RevisedbalQuantity = Number(this.balQuantity) - Number(this.invoiceForm.controls.Quantity.value);
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

  closePopup(ev) {
    $("#popup2").css("visibility", "hidden");
    $("#popup2").css("opacity", "0");
    // location.reload();
    this.invoiceForm.reset();
    // this.invoiceconfile = null;
    this.viewAttachmentName = "";
  }

  showSubmitBox(n) {
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");
  }

  numberOnly(event): boolean {

    if (this.invoiceForm.controls.Quantity.value.length == 0 && event.which == 48) {
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

  balanceQuantity() {
    // this.invoiceForm.controls.BalanceQty.setValue(Number(this.balQuantity) - Number(this.invoiceForm.controls.Quantity.value));
    this.balQuantity1 = Number(this.balQuantity) - Number(this.invoiceForm.controls.Quantity.value);

    this.disable = false;
    console.log("BALANCE UPDAte", this.balQuantity1)
    this.invoiceForm.controls.invoiceamount.setValue(Number(this.rateperqty) * Number(this.invoiceForm.controls.Quantity.value))
    if (this.balQuantity1 < 0) {
      this.errormessage = "order quantity is greater than balance quantity"
      console.log(this.errormessage);
      this.disable = true;
      // this.createDelivery.controls.BalanceQty.setValue(0)

    }
  }


  getIRNNumber() {
    // // this.purchaseOrderListService.getIRNNumber().subscribe(res => {
    // //   console.log("response of IrnDAta", res);

    // })
  }
  
  close(){
    this.viewAttachmentName='';
    this.invoiceForm.controls.irnNo.setValue(null);
    this.invoiceForm.controls.irnDate.setValue(null)
    this.invoiceForm.controls.invoiceDate.setValue(null);
    this.invoiceForm.controls.invoiceNo.setValue(null);
    this.invoiceForm.controls['attachments'].reset();

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
}
