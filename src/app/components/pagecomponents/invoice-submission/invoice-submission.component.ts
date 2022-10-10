import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from 'app/models/delivery';
import * as moment from 'moment/moment';

import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
// import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { CurrencyPipe } from '@angular/common';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
declare var $: any;
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../../commoncomponents/popup/popup.component';
// import { AnyCnameRecord } from 'dns';
// import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-invoice-submission',
  templateUrl: './invoice-submission.component.html',
  styleUrls: ['./invoice-submission.component.css']
})
export class InvoiceSubmissionComponent implements OnInit {
  // @ViewChild('f') societyform: NgForm;
  // @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;

  Lineitem: any = [];
  valueininr: any = [];
  invoice: boolean = true;
  poDetail: any = [];
  ponumber: string = sessionStorage.getItem("poNumber");
  uniquelineitems: any = [];
  toinvoiceuniquelineitems: any = [{
    'GRNMAPPNUMBER': '', 'TOINVOICELINEITEMNUMBER': '', 'TOINVOICELINEITEMTEXT': '',
    'LINEITEMNUMBER': '', 'BALANCE_QTY': '', 'TOINVOICEMATERIAL': '', 'QUANTITY': '', 'TOINVOICEUNITOFMEASURE': '',
    'TOINVOICECONTACTPERSONPHONE': '', 'TOINVOICECOMPANY': '', 'TOINVOICEPLANT': '', 'TOINVOICEDEPARTMENT': '',
    'TOINVOICESTORAGELOCATION': '', 'TOINVOICECOSTCENTRE': '', 'TOINVOICECATEGORY': '', 'SERVICENUMBER': '',
    'DCNUMBER': '', 'GRNQTY': '', 'INVAMOUNT': '', 'SAPUNIQUEREFERENCENO': '', 'SAPLINEITEMNO': '', 'SRCNUMBER': '',
    'TOTALAMOUNT': '', 'TOINVOICERATEPERQTY': ''
  }];
  uniquenewlineitems: any = [];
  orderlineitems: any = [];
  uniquelineitem: any = [];
  orderlistoflineitem: any[];
  lineitemnumber: any = [];
  lineitemnumberset: any = [];
  TotalItemAmount: any;
  calculatedAmount: any = 0;
  editing: boolean = false;
  // invoicesubmissionarray: any;
  invoicesubmissionarray: Array<Delivery> = [];
  vendorid: any;
  irndetail: boolean = false;
  showerror: boolean = false;
  contactpersonemailid: any;
  finalAmount: number;
  viewUploadFile: any = null;
  invoiceconfile: string;
  viewAttachmentName: string = "";
  submitbutton: string = "";
  successmessage: string;
  success: boolean = false;
  error: boolean = false;
  AttachmentValidExtension: string[] = ["PDF"];
  ArrayOfSelectedFile: any[] = [];
  InvalidAttachmentFileError =
    "Selected file is having Invalid extension. Valid file extensions are pdf, jpg & jpeg.";

  delivery = new Delivery();
  fileAttachmentError: string = "";


  public invoiceForm = new FormGroup({
    irnNo: new FormControl(''),
    irnDate: new FormControl(''),
    billofladingdate: new FormControl(''),
    invoiceNo: new FormControl('', Validators.required),
    invoiceDate: new FormControl('', Validators.required),
    // invoiceamount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    // igstvalue: new FormControl(''),
    // cgstvalue: new FormControl(''),
    // sgstvalue: new FormControl(''),
    taxAmount: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),   //new 15 feb
    balanceqty: new FormControl(''),
    orderqty: new FormControl(''),
    description: new FormControl('', Validators.required),
    attachments: new FormControl('', Validators.required),
    // resubmitattachments: new FormControl(''),
    TotalinctaxAmount: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    remarks: new FormControl('', Validators.required),
    overallAmount: new FormControl(0),
    totalOrderQty: new FormControl(0)
    // paymentMethod : new FormControl('',Validators.required),
    // mileStone : new FormControl('',Validators.required),
    // signedBy : new FormControl('',Validators.required)
  })
  errormessage: string
  disable: boolean = false;
  // balQuantity: any = sessionStorage.getItem('balQuantity');
  balQtyList: any = [];
  deliveryList: any = [];
  maxdate: Date;
  podate: string;
  mindate: Date;
  errorqty: number;
  rawinvoicenumber: string;
  rawinvoicedate: string;
  invoicealreadypresent: boolean = false;
  showSingleDelivery: boolean = false;
  temprawinvoicenumber: string;
  actualfilename: any;
  savedfilename: string;
  value: string = "Invoice";
  orderitem: string;
  orderqty: string;
  showSingleSubmit: boolean = false;
  showMultipleSubmit: boolean = false;
  TypeNo: string;
  actualfilename1: any;
  savedfilename1: string;
  multiplactualfilenamearray: any = [];
  multiplsavedfilenamearray: any = [];
  withoutpodetails: any = [];
  actualfilenameofwopo: string;
  savedfilenameofwopo: string;
  invoicefilechanged: boolean = false;
  multiplefilechanged: boolean = false;
  ArrayOfSelectedFiles: any = [];
  individualsavedname: any = [];
  ArrayOfSelectedFilename: any = [];
  filecount: number = 0;
  ArrayOfSelectedSavedFile: any = [];
  individualsavedname1: any = [];
  timestampnow = Date.now().toString();
  freshinvoice: boolean = true;
  part: boolean = false;
  full: boolean = true;
  totalBalQty: number = 0;
  overallAmount: any = 0;
  inputBalanceQuantity: any = 0;
  fullpodate: any = sessionStorage.getItem("fullpoDate");
  lineitemnumberlist: any = [];
  quantitylist: any = [];
  balanceExceeded: boolean = false;
  zeropresent: boolean = false;
  issubmitcheck: boolean = false;
  tobeinvoicelist: any = [];
  grninvoicepresent: boolean = false;
  grntobeinvoicelist: any = [];
  grnuniquelineitems: any = [];
  grnnumber: string;
  invoicedata: any = [];
  poNo: any;
  invNo: any;
  DecodedFile: any;
  resubmit: boolean = false;
  savedfilenameofresubmit: any;
  individualsavednameofresubmit: any = [];
  individualmultipleactualnameofresubmit: any[];
  individualmultiplesavednameofresubmit: any[];
  actualfilenameofresubmit: any;
  actualsavedfilenameofwopo: any;
  actualresubmitfilename: any;
  savedresubmitfilename: any;
  suppindividualactualname: any[];
  checkedList: any = [];
  suppindividualsavedname: any;
  fileupload: string;
  negativeFlag: boolean = false;
  irnNumber: any;
  tobeinvoiced: boolean = false;
  tobelineitems: any;
  ponumbers: any = [];
  backButtonValue: string;
  remainingLinewItems: any = [];
  nullDCN: any=[];
  // descripionlength: number = 160;
  // remarklength: number = 160;
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
    private loaderservice: LoaderService, private activatedRoute: ActivatedRoute, private purchaseOrderListService: PurchaseOrderListService, private cp: CurrencyPipe, public dialog: MatDialog,
    private trackOrderListService: TrackOrderListService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.TypeNo = atob(params.type);
      this.vendorid = atob(params.vd);
      if (this.TypeNo == 'resubmit') {
        this.invNo = atob(params.invNo);
        this.ponumber = atob(params.poNo);
      }

      $("body").on("click", ".inv-wrapper", function () {
        console.log($(this))
        $('.inv-wrapper.active').removeClass('active');
        $(this).addClass('active');
      });
      console.log("what are the ?", params); // { order: "popular" }
      // this.ponumber = atob(params.PN);
      // this.vendorid = atob(params.vd);
      // this.contactpersonemailid = atob(params.cpe);
      // this.orderitem=atob(params.do);
      // this.orderqty=atob(params.dq);
      // this.podate = atob(params.dt)
      // this.rawinvoicenumber = atob(params.in);
      // this.rawinvoicedate = atob(params.id);
      // this.TypeNo = atob(params.type);
      console.log("type=====================>", this.TypeNo);

      // if (this.rawinvoicedate != '') {
      //   this.invoicealreadypresent = true;
      //   this.invoiceForm.controls.invoiceNo.setValue(this.rawinvoicenumber);
      //   this.temprawinvoicenumber = this.rawinvoicenumber;
      //   this.invoiceForm.controls.invoiceDate.setValue(new Date(this.rawinvoicedate));
      // }


      // this.message = params.Query;
      // this.Amount = params.Amount;
      // this.Date = params.Date;
      // this.Status = params.Status
      console.log("this.podate ==>" + this.podate);
    });
    $("body").on("click", ".inv-wrapper", function () {
      console.log($(this))
      $('.inv-wrapper.active').removeClass('active');
      $(this).addClass('active');
    });
    if (this.TypeNo != 'resubmit') {

      // this.invoiceForm.get('resubmitattachments').setValidators(null);
      // this.invoiceForm.get('resubmitattachments').updateValueAndValidity();
      this.purchaseOrderListService.getgrnbasedonpo(this.ponumber).subscribe(res => {
        if (res[0].message == "Success") {
          this.tobeinvoicelist = res[0].grnbasedonpo;
          this.grninvoicepresent = true;
        }
        else {
          this.grninvoicepresent = false;
        }
        // if(this.tobeinvoicelist.length > 0)
        // {
        //   this.disable = false;
        //   this.errormessage = "";
        // }


        console.log(sessionStorage.getItem("invwopodetails"));

        if (sessionStorage.getItem("invwopodetails")) {
          this.freshinvoice = false;
          this.withoutpodetails = JSON.parse(sessionStorage.getItem("invwopodetails"));
          if (this.withoutpodetails[0].INVOICENUMBER != null) {

            console.log("this.withoutpodetails ==> " , this.withoutpodetails);
            for (var x = 0; x < this.withoutpodetails.length; x++) {
              if (this.withoutpodetails[0].IRNNUMBER != null || this.withoutpodetails[0].IRNNUMBER != "") {
                this.invoice = false;
                this.invoiceForm.controls.irnNo.setValue(this.withoutpodetails[x].IRNNUMBER)
                this.invoiceForm.controls.irnDate.setValue(new Date(this.withoutpodetails[x].IRNDATE))
              }
              else {
                this.invoice = true;
                this.invoiceForm.controls.irnNo.setValue(null)
                this.invoiceForm.controls.irnDate.setValue(null)
              }
              this.irnNumber = this.withoutpodetails[0].IRNNUMBER



              this.invoiceForm.controls.invoiceNo.setValue(this.withoutpodetails[x].INVOICENUMBER)
              this.invoiceForm.controls.invoiceDate.setValue(new Date(this.withoutpodetails[x].INVOICEDATE));
              var invoicedate = new Date(this.withoutpodetails[0].INVOICEDATE)
              // if(this.mindate < invoicedate){
              //   if(moment.utc(moment(this.mindate), 'YYYY-MM-DD[T]HH:mm[Z]')
              //   .isAfter(moment.utc(invoicedate, 'YYYY-MM-DD[T]HH:mm[Z]')))
              //   {
              //   this.disable=true;
              //   // this.errormessage = "Invoice Date can't be earlier than PO date"
              // }
              // else{
              //   this.disable=false;
              // }
              if (this.withoutpodetails[0].BILLOFLADINGDATE == undefined || this.withoutpodetails[0].BILLOFLADINGDATE == null) {
                this.invoiceForm.controls.billofladingdate.setValue(null);
              }
              else {
                this.invoiceForm.controls.billofladingdate.setValue(new Date(this.withoutpodetails[x].BILLOFLADINGDATE));
              }
              // if(this.withoutpodetails[0].BILLOFLADINGDATE == null)
              // {
              //   this.invoiceForm.controls.billofladingdate.setValue(null);
              // }
              // else
              // {
              //   this.invoiceForm.controls.billofladingdate.setValue(new Date(this.withoutpodetails[x].BILLOFLADINGDATE));
              // }

              this.invoiceForm.controls.description.setValue(this.withoutpodetails[x].DESCRIPTION);
              console.log("this.withoutpodetails[x].ACTUALFILENAME ",this.withoutpodetails[x].ACTUALFILENAME);
              var a =  this.withoutpodetails[x].ACTUALFILENAME;
              if(a != "")
              {
              this.invoiceForm.get('attachments').setValidators(null);
              this.invoiceForm.get('attachments').updateValueAndValidity();
              }
             
              
              // this.invoiceForm.controls.attachments.setValue(this.withoutpodetails[x].ACTUALFILENAME);
              // console.log("length=======================>", this.withoutpodetails[x].IRNNUMBER);
              if (this.withoutpodetails[x].IRNNUMBER != null) {
                this.invoice = false
                this.invoiceForm.controls.irnNo.setValue(this.withoutpodetails[x].IRNNUMBER);
                this.invoiceForm.controls.irnDate.setValue(new Date(this.withoutpodetails[x].IRNDATE));
              }
              else {
                this.invoice = true
                this.invoiceForm.controls.irnNo.setValue(null);
                this.invoiceForm.controls.irnDate.setValue(null);
              }
              this.viewAttachmentName = this.withoutpodetails[x].ACTUALFILENAME;
              this.actualfilenameofwopo = this.withoutpodetails[x].ACTUALFILENAME;
              this.savedfilenameofwopo = this.withoutpodetails[x].SAVEDFILENAME;

              if (this.withoutpodetails[x].SUPPORTACTFILENAME != null) {
                var array = this.withoutpodetails[x].SUPPORTACTFILENAME.split(',');
                this.individualsavedname = [];
                for (var k = 0; k < array.length; k++) {
                  this.individualsavedname.push(array[k]);
                }
                this.ArrayOfSelectedFile = [];
                this.ArrayOfSelectedFilename = this.individualsavedname;
                this.filecount = this.ArrayOfSelectedFilename.length;
                console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedFilename);
                var array1 = this.withoutpodetails[x].SUPPORTSAVEDFILENAME.split(',');
                this.individualsavedname = [];
                for (var k = 0; k < array1.length; k++) {
                  this.individualsavedname1.push(array1[k]);
                }
                this.ArrayOfSelectedSavedFile = [];
                this.ArrayOfSelectedSavedFile = this.individualsavedname1;

                console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedSavedFile);
              }

              // this.ArrayOfSelectedFile.name = this.individualsavedname[0];

              // this.ArrayOfSelectedFiles = this.withoutpodetails[x].SUPPORTACTFILENAME.split(',');
              // for(var k=0;k<this.ArrayOfSelectedFiles.length;k++)
              // {
              //   this.ArrayOfSelectedFile[k].name = this.ArrayOfSelectedFiles[k];
              // }
              // console.log("File names are here ",this.ArrayOfSelectedFile);
            }
          }
        }

        this.orderlineitems = JSON.parse(sessionStorage.getItem("invsubmissionorderDetails"));
        this.uniquelineitems = JSON.parse(sessionStorage.getItem("invsubmissionDetails"));
        console.log("this.uniquelineitems", this.uniquelineitems);
        // this.getPOitems(this.uniquelineitems[0].PONUMBER)
        // this.podate = sessionStorage.getItem("fullpoDate");
        this.maxdate = new Date();
        this.mindate = new Date(this.podate);
        if (this.TypeNo == 'part') {
          this.part = true;
          this.full = false;
          this.resubmit = true;
        }
        else {
          this.part = false;
          this.full = true;
          this.resubmit = false;

        }
        this.getPOitems(this.ponumber)
      });
    }
    else if (this.TypeNo == "resubmit") {
      this.fileupload = "norefileupload";
      // this.invoiceForm.get('resubmitattachments').setValidators(Validators.required);
      // this.invoiceForm.get('resubmitattachments').updateValueAndValidity();
      // this.invoiceForm.get('attachments').setValidators(null);
      // this.invoiceForm.get('attachments').updateValueAndValidity();
      this.part = true;
      this.full = false;
      this.resubmit = true;
      // this.getPOitems(this.ponumber);
      this.invoicedata = [];
      // if(this.getPOitems(this.ponumber)){
      this.uniquelineitems = [];
      this.uniquelineitem = [];
      sessionStorage.setItem("poNumber", this.ponumber);
      console.log("in here");
      this.purchaseOrderListService.getPODetails(this.ponumber).subscribe(res => {
        this.uniquelineitems = res[0].poData;
        for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {

          this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
          this.uniquelineitems[i].QUANTITY = Number(this.uniquelineitems[i].QUANTITY)

          this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
          this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
          if (this.full) {
            this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
            this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
          }
          this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
          this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
        }
        if (this.totalBalQty == 0 || this.totalBalQty == 0.0) {
          console.log("problem here");
          this.disable = true;
          this.errormessage = "* Can't submit invoice total balance quantity = 0";
        }

        console.log("call form Total Balance Quantity==============>", this.totalBalQty);
        // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
        for (var j = 0; j < this.poDetail.length; j++) {
          if (this.poDetail[j].ORDERNUMBER == null) {
            this.uniquelineitems.push(this.poDetail[j]);
            this.balQtyList.push(this.poDetail[j].BALANCE_QTY)
            console.log("teest", this.poDetail[j].BALANCE_QTY);

          }
        }
        console.log("this.uniquelineitems======>>>", this.uniquelineitems); this.uniquelineitems = this.uniquelineitems.sort((a, b) => {
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
        console.log("Lineitemtext ", this.poDetail)
        for (var i = 0; i < this.poDetail.length; i++) {
          this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
        }
        console.log("this.lineitemnumber. " + this.lineitemnumber);
        var mySet = new Set(this.lineitemnumber);
        mySet.forEach(v => this.lineitemnumberset.push(v));

        this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
        if (this.uniquelineitems.length != 0) {
          this.trackOrderListService.getlistitemsforinvoicenumber(this.invNo, this.ponumber).subscribe(res => {
            if (res[0].message == "Success") {
              this.invoicedata = res[0].poData;
              this.invoicedata = this.invoicedata.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
              for (let m = 0; m < this.uniquelineitems.length; m++) {
                this.invoiceForm.addControl('orderValue' + m, this.fb.control(''))
                for (let i = 0; i < this.invoicedata.length; i++) {
                  if (this.invoicedata[i].GRNNUMBER != null) {
                    this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].ACCEPTEDQTY) * parseFloat(this.invoicedata[i].RATEPERQTY));
                  }
                  if (this.invoicedata[i].GRNNUMBER == null) {
                    this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].QUANTITY) * parseFloat(this.invoicedata[i].RATEPERQTY));
                  }
                  if ((this.uniquelineitems[m].PO_NUMBER == this.invoicedata[i].PO_NUMBER) && (this.uniquelineitems[m].LINEITEMNUMBER == this.invoicedata[i].LINEITEMNUMBER)) {
                    // this.invoiceForm.controls['orderValue' + m].setValue(this.invoicedata[i].QUANTITY);
                    // this.calculate(m, this.uniquelineitems[m].RATEPERQTY);
                    if (this.uniquelineitems[m].FORECLOSESTATUSCHECK != null) {
                      this.invoiceForm.controls['orderValue' + m].setValue(0);
                    }
                    else {
                      this.invoiceForm.controls['orderValue' + m].setValue(this.invoicedata[i].QUANTITY);
                    }
                    this.calculate(m, this.uniquelineitems[m].RATEPERQTY);
                  }

                }
              }
              console.log("this.invoicedata ==>", this.invoicedata);
              if (this.invoicedata[0].IRNNUMBER != null || this.invoicedata[0].IRNNUMBER != "") {
                this.invoice = false;
                this.irnNumber = this.invoicedata[0].IRNNUMBER;
              }
              else {
                this.invoice = true
                this.irnNumber = null;
              }

              var invoicedate = new Date(this.invoicedata[0].INVOICEDATE)
              this.invoiceForm.controls.invoiceNo.setValue(this.invNo);
              this.invoiceForm.controls.invoiceDate.setValue(new Date(this.invoicedata[0].INVOICEDATE));
              if (this.mindate < invoicedate) {
                this.disable = true;
                // this.errormessage = "invoicedate can't be earlier than PO date"
              }
              else {
                this.disable = false;
              }
              // this.invoiceForm.controls.TotalinctaxAmount.setValue(Number(this.invoicedata[0].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ','));
              // this.invoiceForm.controls.taxAmount.setValue(Number(this.invoicedata[0].TAXAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ','));
              this.invoiceForm.controls.description.setValue(this.invoicedata[0].DESCRIPTION);
              // this.invoiceForm.controls.billofladingdate.setValue(new Date(this.invoicedata[0].BILLOFLADINGDATE));
              if (this.invoicedata[0].BILLOFLADINGDATE == null) {
                this.invoiceForm.controls.billofladingdate.setValue(null);
              }
              else {
                this.invoiceForm.controls.billofladingdate.setValue(new Date(this.invoicedata[0].BILLOFLADINGDATE));
              }
              // this.invoiceForm.controls.attachments.setValue(this.invoicedata[0].ACTUALFILENAME);
              if(this.invoicedata[0].ACTUALFILENAME != null || this.invoicedata[0].ACTUALFILENAME !='')
              {
                this.invoiceForm.get('attachments').setValidators(null);
                this.invoiceForm.controls['attachments'].updateValueAndValidity();
              }
              if (this.invoicedata[0].IRNNUMBER != null) {
                this.invoice = false;
                this.invoiceForm.controls.irnNo.setValue(this.invoicedata[0].IRNNUMBER);
                this.invoiceForm.controls.irnDate.setValue(new Date(this.invoicedata[0].IRNDATE));
              }
              else {
                this.invoice = true
                this.invoiceForm.controls.irnNo.setValue(null);
                this.invoiceForm.controls.irnDate.setValue(null);
              }

              this.viewAttachmentName = this.invoicedata[0].ACTUALFILENAME;
              console.log("this.ArrayOfSelectedFilename this.invoicedata[0].TOTALAMOUNT ", this.invoicedata[0].TOTALAMOUNT);
              // this.viewAttachmentName = this.viewAttachmentName.toString();
              // this.invoiceForm.controls.attachments.reset(
              // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);
              this.actualresubmitfilename = this.invoicedata[0].ACTUALFILENAME;
              this.savedresubmitfilename = this.invoicedata[0].SAVEDFILENAME;

              // this.actualfilenameofwopo = this.withoutpodetails[x].MULTIACTUALFILENAME;
              // this.savedfilenameofwopo = this.withoutpodetails[x].MULTISAVEDFILENAME;
              // this.savedfilenameofresubmit = this.invoicedata[0].MULTIACTUALFILENAME;
              if (this.invoicedata[0].MULTIACTUALFILENAME != null) {
                var array = this.invoicedata[0].MULTIACTUALFILENAME.split(',');
                this.suppindividualactualname = [];
                for (var k = 0; k < array.length; k++) {
                  this.suppindividualactualname.push(array[k]);
                }
                this.ArrayOfSelectedFile = [];
                this.ArrayOfSelectedFilename = this.suppindividualactualname;
                this.filecount = this.ArrayOfSelectedFilename.length;
                console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedFilename);
                var array1 = this.invoicedata[0].MULTISAVEDFILENAME.split(',');
                this.suppindividualsavedname = [];
                for (var k = 0; k < array1.length; k++) {
                  this.suppindividualsavedname.push(array1[k]);
                }
                this.ArrayOfSelectedSavedFile = [];
                this.ArrayOfSelectedSavedFile = this.suppindividualsavedname;

                console.log("this.ArrayOfSelectedSavedFile ", this.ArrayOfSelectedSavedFile);
              }
              // var array1 = this.invoicedata[x].SUPPORTSAVEDFILENAME.split(',');
              // this.individualsavedname = [];
              // for (var k = 0; k < array1.length; k++) {
              //   this.individualsavedname1.push(array1[k]);
              // }
              // this.ArrayOfSelectedSavedFile = [];
              // this.ArrayOfSelectedSavedFile = this.individualsavedname1;

              // console.log("this.ArrayOfSelectedFilename ", this.ArrayOfSelectedSavedFile);
              // this.invoiceForm.controls.remarks.setValue(this.invoicedata[0].VENDORREMARKS);
              // For return 
              this.invoiceForm.controls.remarks.setValue(this.invoicedata[0].VENDORREMARKS);

              // this.invoiceForm.controls.attachments.setValue(this.invoicedata[0].ACTUALFILENAME);
              console.log("this.invoiceForm.controls.attachments");
            }
          });
        }
      });

    }
    // }

    // this.getSubmission();
    // if(this.TypeNo == 'resubmit'){

    // }else{

    // }
    console.log("this.vendorid ==> " + this.vendorid);
  }

  getSubmission() {
    let amount = 0;
    let amt;
    if (sessionStorage.getItem("invsubmissionorderDetails")) {
      this.orderlineitems = JSON.parse(sessionStorage.getItem("invsubmissionorderDetails"));
      // for (let i = 0; i < this.orderlineitems.length; i++) {
      //   this.orderlineitems[i].AMOUNT = Number(this.orderlineitems[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
      //   (console.log(this.orderlineitems[i].AMOUNT));
      // }

      this.uniquelineitems = JSON.parse(sessionStorage.getItem("invsubmissionDetails"));
      console.log("this.uniquelineitems ===>", this.uniquelineitems);
      if (this.uniquelineitems.length > 0) {
        this.ponumber = this.uniquelineitems[0].PO_NUMBER;
        this.mindate = new Date(this.uniquelineitems[0].PODATE);
        console.log("this.ponumber =>" + this.ponumber);
        if (this.uniquelineitems[0].lineType == 'LineItemDelivery') {
          this.showSingleDelivery = true;
          for (let i = 0; i < this.orderlineitems.length; i++) {
            amount = amount + Number(Number(this.orderlineitems[i].AMOUNT).toString().replace(/,/g, ''));
            amt = amount.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
            amt = amt.toString();
          }
          // this.invoiceForm.controls['TotalItemAmount'].setValue(parseFloat(this.uniquelineitems[this.uniquelineitems.length - 1].TOTALAMONT).toFixed(2));
          this.invoiceForm.controls['TotalinctaxAmount'].setValue(amt)
        }
        else if (this.uniquelineitems[0].lineType == 'orderItemfordelivery') {
          this.showSingleSubmit = true;
          for (let i = 0; i < this.orderlineitems.length; i++) {
            amount = amount + Number(Number(this.orderlineitems[i].AMOUNT).toString().replace(/,/g, ''));
            amt = amount.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
            amt = amt.toString();
            console.log("this.orderlineitems[i].AMOUNT " + this.orderlineitems[i].AMOUNT);
          }

          this.invoiceForm.controls['TotalinctaxAmount'].setValue(amt)
        }
        else {
          console.log("in multiple");
          this.uniquelineitems = JSON.parse(sessionStorage.getItem("invsubmissionDetails"));
          this.orderlineitems = JSON.parse(sessionStorage.getItem("invallDetails"));
          this.ponumber = this.uniquelineitems[0].PO_NUMBER;
          this.showMultipleSubmit = true;
          for (let i = 0; i < this.orderlineitems.length; i++) {
            amount = amount + Number(Number(this.orderlineitems[i].AMOUNT).toString().replace(/,/g, ''));
            amt = amount.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
            amt = amt.toString();
          }
          this.invoiceForm.controls['TotalinctaxAmount'].setValue(amt)
        }
        for (let i = 0; i < this.uniquelineitems.length; i++) {
          this.uniquelineitems[i].AMOUNT = Number(this.uniquelineitems[i].AMOUNT).toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
          this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
          this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
          this.overallAmount += this.uniquelineitems[i].TOTALAMOUNT
          if (this.part) {
            this.invoiceForm.addControl('orderValue' + i, this.fb.control(''))
          }
          console.log("this.uniquelineitems[i].AMOUNT " + this.uniquelineitems[i].AMOUNT);
        }
      }
    }
  }

  getPOitems(POnumber) {
    this.uniquelineitems = [];
    this.uniquelineitem = [];
    // debugger;
    sessionStorage.setItem("poNumber", POnumber);
    console.log("in here");
    this.purchaseOrderListService.getPODetails(POnumber).subscribe(res => {
      this.uniquelineitems = res[0].poData;
      this.remainingLinewItems = this.uniquelineitems;
      console.log("remainingLinewItems", this.remainingLinewItems);
      for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {
        // console.log("this.uniquelineitems[i].LINEITEMNUMBER "+this.uniquelineitems[i].LINEITEMNUMBER+
        // "this.uniquelineitems[i].BALANCE_QTY "+this.uniquelineitems[i].BALANCE_QTY+" this.uniquelineitems[i] "+this.uniquelineitems[i] +
        // " this.uniquelineitems[i].QUANTITY "+this.uniquelineitems[i].QUANTITY);

        this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
        this.uniquelineitems[i].QUANTITY = Number(this.uniquelineitems[i].QUANTITY)

        this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
        this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
        console.log("this.lineitemnumberlist " + this.lineitemnumberlist);
        console.log(" this.quantitylist " + this.quantitylist);
        if (this.full) {
          this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
          this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
        }
        this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
        this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
      }
      if ((this.totalBalQty == 0 || this.totalBalQty == 0.0) && this.tobeinvoicelist.length == 0) {
        console.log("problem here");
        this.disable = true;
        this.errormessage = "* Can't submit invoice total balance quantity = 0";
      }
      //  this.uniquelineitems.forEach(element => {
      //    this.totalBalQty +=Number(element.BALANCE_QTY)
      //    this.uniquelineitems.TOTALAMOUNT = Number(element.BALANCE_QTY) * Number(element.RATEPERQTY)

      //    console.log("this.uniquelineitems", this.uniquelineitems);

      //  });


      console.log("call form Total Balance Quantity==============>", this.totalBalQty);
      // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
      for (var j = 0; j < this.poDetail.length; j++) {
        if (this.poDetail[j].ORDERNUMBER == null) {
          this.uniquelineitems.push(this.poDetail[j]);
          this.balQtyList.push(this.poDetail[j].BALANCE_QTY)
          console.log("teest", this.poDetail[j].BALANCE_QTY);

        }
      }

      console.log("this.uniquelineitems======>>>", this.uniquelineitems);
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
      return true;
    })
    const removeDuplicates = (array, key) => {
      return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
      }, []);
    };
  }

  // openAccordionTab(event) {
  //   if (!event.target.classList.contains('active')) {
  //     $(".Basicaccordion-btn.active").removeClass("active");
  //     event.target.classList.add("active");
  //   } else {
  //     event.target.classList.remove("active");
  //   }
  //   // console.log(' ****from tr click');
  //   $('.panelrowWrapper').removeClass('active');
  //   var id = event.target.getAttribute('data-accordion');
  //   console.log(id);
  //   $('.Basicaccordion-panel').hide();
  //   $('.Basicaccordion-btn.active + #' + id).addClass('customtblHide');
  //   // $('.panelrowWrapper').removeClass('active');  //close all nested accordion
  //   if (!event.target.classList.contains('active')) {
  //     $('.Basicaccordion-btn.active + #' + id).removeClass('customtblHide');
  //   } else {
  //     $('.Basicaccordion-btn.active + #' + id).show();
  //   }
  // }

  initAccNested(e, option, lineitemnumber, ponumber) {
    this.showerror = false;
    let elem = '.Basicaccordion';
    option = true;
    console.log("Lineitem", this.Lineitem);

    if (true) {
      console.log("Clicked ____________________================================================================================================================")
      // document.addEventListener('click', function (e) {
      const element = e.target as Element;
      // console.log(element.matches(elem+' .atbl-btn'))

      if (!element.matches(elem + ' .Accordionbtnclick')) return;

      else {
        // console.log("else")
        if (!(<HTMLInputElement>e.target).parentElement.parentElement.classList.contains('active')) {
          console.log('*********************** inside 1');
          //  if(option==true){
          //    console.log('*********************** inside 2');
          //      var elementList = document.querySelectorAll(elem+'.Basicaccordion-container');
          //      Array.prototype.forEach.call(elementList, function (e) {
          //          e.classList.remove('active');
          //      });
          //      console.log('*********************** inside 3');
          //  }            
          $(".Basicaccordion-container.active").removeClass("active");
          (<HTMLInputElement>e.target).parentElement.parentElement.classList.add('active');
          console.log('*********************** inside 4');

        } else {
          (<HTMLInputElement>e.target).parentElement.parentElement.classList.remove('active');
          console.log('*********************** inside else ');

        }
      }
    }
    // });
    //  this.initAccNested('.aNestedTblAccordion', true);

    this.Lineitem = [];
    this.valueininr = [];
    console.log("option is here ", option, "++++lineitemnumber+++++", lineitemnumber, "xxxponumberxxxxxxxx", ponumber);
    console.log("this.polist ==> " + this.poDetail);


    // for (var i = 0; i < this.poDetail.length; i++) {
    //   if (this.poDetail[i].LINEITEMNUMBER == lineitemnumber && this.poDetail[i].ORDERNUMBER != null)
    //     this.Lineitem.push(this.poDetail[i]);
    for (var k = 0; k < this.poDetail.length; k++) {
      // }
      if (this.poDetail[k].ORDERNUMBER != null &&
        this.poDetail[k].PO_NUMBER == ponumber &&
        this.poDetail[k].LINEITEMNUMBER == lineitemnumber) {
        this.Lineitem.push(this.poDetail[k]);
      }
    }
    this.Lineitem = this.Lineitem.sort((d, e) => {
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
    console.log("this.Lineitem" + JSON.stringify(this.Lineitem), 'Lineitem**********************');
    console.log("this.Lineitem count" + JSON.stringify(this.Lineitem.length), 'Lineitem.length**********************');
    for (var j = 0; j < this.Lineitem.length; j++) {
      console.log("nub1", Number(this.Lineitem[j].QUANTITY))
      this.valueininr.push(Number(this.Lineitem[j].QUANTITY) * Number(this.Lineitem[j].RATEPERQTY))
    }
    console.log("this.valueininr ==>" + this.valueininr);
    console.log("this.valueininr.length ==>" + this.valueininr.length);
  }

  calculateItemAmount(indexval, DQty, Rate) {
    // this.numberOnly(event)
    // console.log(event.target.value, "event---------------------->");
    this.finalAmount = DQty * Rate;
    let totalAmount = 0
    this.TotalItemAmount = 0;
    let a = 0;
    $('#itemAmount' + indexval).val(this.finalAmount);
    for (var k = 0; k < this.uniquelineitems.length; k++) {
      if ($('#itemAmount' + k).val() > 0) {
        totalAmount = parseFloat(this.TotalItemAmount) + parseFloat($('#itemAmount' + k).val())
      }
      console.log("totalaamount here =>" + totalAmount);

      this.TotalItemAmount = totalAmount
      // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
    }
    if (this.TotalItemAmount == 0) {
      this.invoiceForm.controls['TotalinctaxAmount'].setValue(null);
    }
    else {
      this.invoiceForm.controls['TotalinctaxAmount'].setValue(parseFloat(this.TotalItemAmount).toFixed(2));
    }

  }
  // balanceQuantity(n){
  //   this.createDelivery.controls.BalanceQty.setValue(Number(this.balQuantity)-Number(this.createDelivery.controls.orderquantity.value));
  // }

  submitinvoice() {
    // console.log("compare==========>",this.invNo, this.invoiceForm.controls.invoiceNo.value);

    console.log("why ??", this.invoiceForm.status, this.invoiceForm.value);
    //  console.log("hello============>", this.invoiceForm.controls['totalOrderQty'].value, typeof(this.invoiceForm.controls['totalOrderQty'].value));
    if (this.part) {
      if (this.invoiceForm.controls['totalOrderQty'].value == 0) {
        // this.dialogBox.popUpOpen2('Please enter quantity for atleast one line item', 'success', 'invoicesubmit');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Please enter quantity for atleast one line item',
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
          this.router.navigate(['/trackInvoiceList']);
        });
        return false;
      }

    }
    // return false;
    this.loaderservice.show();
    console.log("values here ==>", this.invoiceForm);
    console.log(this.uniquelineitems.length);
    // this.loaderservice.hide();
    // return false;
    // debugger;
    console.log("this.part " + this.part);
    if (this.part || this.TypeNo == 'resubmit') {
      this.quantitylist = [];
      this.lineitemnumberlist = [];

      for (let a = 0; a <= this.uniquelineitems.length - 1; a++) {
        if (this.invoiceForm.controls['orderValue' + a].value == null || this.invoiceForm.controls['orderValue' + a].value == '') {
          // || this.uniquelineitem[a].FORECLOSESTATUSCHECK == 'X'
          this.invoiceForm.controls['orderValue' + a].setValue(0);
        }

        console.log("this.invoiceForm.controls['orderValue' + a].value", this.invoiceForm.controls['orderValue' + a].value);

        this.quantitylist.push(this.invoiceForm.controls['orderValue' + a].value);
        this.lineitemnumberlist.push(this.uniquelineitems[a].LINEITEMNUMBER);
      }
    }

    console.log("is it updating============>", this.quantitylist);

    this.invoicesubmissionarray = [];

    if ((this.viewUploadFile != null && this.viewAttachmentName != "") ||
      (this.withoutpodetails.length != 0 && this.viewAttachmentName != "") ||
      (this.invoicedata.length != 0 && this.viewAttachmentName != "")) {
      console.log("inininin");
      if (this.TypeNo == 'resubmit') {
        this.trackOrderListService.getVendorReturn(this.ponumber, this.invNo).subscribe(res => {
          if(res[0].message == " Vendor Return done Sucess")
          {
            this.purchaseOrderListService.createcustomdeliveryitems(this.ponumber, this.fullpodate, this.lineitemnumberlist, this.quantitylist).subscribe(res => {

              if (res[0].message == "Success") {
                
                this.loaderservice.show();
                var dcnlist: any = []
                res[0].dcnvalues.forEach(element => {
                  dcnlist.push(element)
                });
      
                this.purchaseOrderListService.setDCNumbers(this.ponumber, dcnlist).subscribe(res1 => {
                  console.log("return========>", res1[0].message, res1[0].orderitems);
      
                  this.orderlineitems = res1[0].orderitems;
                  // res1[0].orderitems.forEach(data => {
                  //   this.orderlineitems.push(data);
                  // });
      
                  for (let s = 0; s < this.orderlineitems.length; s++) {
                    if (this.orderlineitems[s].QUANTITY == 0 || this.orderlineitems[s].QUANTITY == 0.00) {
                      this.nullDCN.push(this.orderlineitems[s].DC)
                    }
                  }
                  console.log(this.uniquelineitems, 'this.uniquelineitems.length');
                  console.log(this.orderlineitems, 'this.orderlineitems.length');
                  for (var k = 0; k < this.uniquelineitems.length; k++) {
                    this.uniquelineitems[k].order = this.orderlineitems[k].DC;
                  }
      
                  // this.loaderservice.hide();
      
      
                  // this.actualfilename = this.viewUploadFile.name;
      
                  // var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
                  // fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
                  // var fileName2 = fileName;
                  // fileName = this.ponumber + "_invoice_" + fileName;
                  // this.savedfilename = fileName;
                  // console.log("FileName here" + fileName);
                  // this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
                  //   console.log(JSON.stringify(res))
                  //   res[0].data = true;
                  //   if (res.length == 0) {
                  //     this.loaderservice.hide();
                  //     return false;
                  //   }
                  // else if (res[0].status == "Success") {
      
                  // return false
                  console.log("this.uniquelineitems >>", this.uniquelineitems);
                  console.log("this.orderlineitems >>", this.orderlineitems);
                  console.log("this.uniquelineitems.length >>" + this.uniquelineitems.length);
                  console.log("this.orderlineitems.length >>" + this.orderlineitems.length);
                  // return;
                  var count = 0;
                  for (var a = 0; a < this.uniquelineitems.length; a++) {
                    console.log("a is here =>" + a);
                    for (var b = 0; b < this.orderlineitems.length; b++) {
                      // debugger
                      console.log(this.uniquelineitems[a].LINEITEMNUMBER, 'this.uniquelineitems.LINEITEMNUMBER')
                      console.log(this.orderlineitems[b].LINEITEMNUMBER, 'this.orderlineitems.LINEITEMNUMBER')
                      if (this.grntobeinvoicelist.length == 0) {
                        if (this.uniquelineitems[a].LINEITEMNUMBER == this.orderlineitems[b].LINEITEMNUMBER) {
      
                          // var quantity = $('#Quantity' + b).val();
                          // var itemAmount = $('#itemAmount' + b).val();
                          // debugger;
                          console.log("this.uniquelineitems[a].LINEITEMNUMBER " + this.uniquelineitems[a].LINEITEMNUMBER +
                            "BALANCE_QTY " + this.uniquelineitems[a].BALANCE_QTY);
      
                          var quantity = this.orderlineitems[b].QUANTITY
                          var itemAmount = this.orderlineitems[b].AMOUNT
                          console.log("quantity " + quantity);
                          if (quantity > 0) {
                            this.delivery = new Delivery();
                            console.log("a is not empty ==>" + a);
                            this.delivery.bid = sessionStorage.getItem("Bid");
                            this.delivery.po_num = this.ponumber;
                            if (this.invoice != true) {
                              console.log("this.invoiceForm.controls['irnNo'].value;", this.invoiceForm.controls['irnNo'].value)
                              this.delivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                              console.log("test date===========>", this.invoiceForm.controls['irnDate'].value);
      
                              this.delivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
      
                            }
                            else {
                              this.delivery.irnNumber = "";
                              if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
                                this.delivery.irnDate = null;
                              }
                            }
                            // this.delivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                            // this.delivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
                            this.delivery.invoiceNumber = this.invoiceForm.controls['invoiceNo'].value.trim();
      
                            this.delivery.invoiceDate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY");
                            console.log("this.delivery.invoiceDate " + this.delivery.invoiceDate);
                            // this.delivery.referenceNumber = ""
                            // this.delivery.grnnumber = ""
                            this.delivery.rateperquantity = this.uniquelineitems[a].RATEPERQTY.replace(/,/g, '');
                            if (this.tobeinvoiced == false) {
                              this.delivery.lineItemNumber = this.uniquelineitems[a].LINEITEMNUMBER;
                              this.delivery.lineitemtext = this.uniquelineitems[a].LINEITEMTEXT;
                            }
                            else {
                              this.delivery.lineItemNumber = this.uniquelineitems[a].TOINVOICELINEITEMNUMBER;
                              this.delivery.lineitemtext = this.uniquelineitems[a].TOINVOICELINEITEMTEXT;
                            }
      
                            this.delivery.orderNumber = this.orderlineitems[b].DC;
                            if (this.TypeNo == 'resubmit') {
                              this.delivery.beforesubmissioninvoicenumber = this.invNo;
                              this.delivery.businessPartnerText = this.invoicedata[0].BUSSINESSPARTNERTEXT;
                              this.delivery.contactPerson = this.invoicedata[0].REQUSITIONER;
                              this.delivery.buyerid = this.invoicedata[0].BUYER;
      
                              console.log("Hello========>", this.invoicedata[0].BUSSINESSPARTNERTEXT, this.invoicedata[0].REQUSITIONER,
                                this.invoicedata[0].BUYER
                              );
      
                            } else {
                              this.delivery.beforesubmissioninvoicenumber = "";
                              this.delivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
                              this.delivery.contactPerson = sessionStorage.getItem("Requisitioner");
                              this.delivery.buyerid = sessionStorage.getItem("Buyer");
                            }
                            // this.delivery.orderNumber = this.orderlineitems[b].DcNo;
                            console.log(this.delivery.orderNumber, 'this.delivery.orderNumber')
                            // this.delivery.quantity = quantity;
                            this.delivery.quantity = this.orderlineitems[b].QUANTITY;
                            console.log(this.delivery.orderNumber, ' this.delivery.orderNumber')
                            console.log(this.delivery.quantity, ' this.delivery.quantity')
                            this.delivery.uOM = this.uniquelineitems[a].UNITOFMEASURE;
      
                            this.delivery.contactPersonPhone = this.uniquelineitems[a].CONTACTPERSONPHONE;
                            // this.delivery.vendorID = this.uniquelineitems[a].vendorId;
                            this.delivery.vendorID = this.vendorid
                            this.delivery.company = this.uniquelineitems[a].COMPANY
                            this.delivery.plant = this.uniquelineitems[a].PLANT
                            this.delivery.department = this.uniquelineitems[a].DEPARTMENT
                            this.delivery.storagelocation = this.uniquelineitems[a].STORAGELOCATION
                            this.delivery.costCentre = this.uniquelineitems[a].COSTCENTRE
                            this.delivery.category = this.uniquelineitems[a].CATEGORY
      
      
                            this.delivery.profileID = ""
                            this.delivery.invoiceDocumentPath = ""
                            this.delivery.iGSTAmount = ""
                            this.delivery.cGSTAmount = ""
                            this.delivery.sgstAmount = ""
                            this.delivery.servicenumber = this.uniquelineitems[a].SERVICENUMBER;
                            // this.delivery.uniquereferencenumber = this.uniquereferencenumber;
                            console.log("============>", this.grntobeinvoicelist);
      
                            if (this.tobeinvoiced == false) {
                              this.delivery.grnnumber = "-";
                              this.delivery.uniquereferencenumber = "-";
                              this.delivery.saplineitemnumber = "-";
                              this.delivery.srcnnumber = "-";
                            }
                            else {
                              this.delivery.servicenumber = this.uniquelineitems[a].SERVICENUMBER;
                              this.delivery.dcnumber = this.uniquelineitems[a].DCNUMBER
                              console.log(" this.delivery.dcnumber======>", this.delivery.dcnumber);
                              if (this.uniquelineitems[a].SRCNUMBER != null) {
                                this.delivery.srcnnumber = this.uniquelineitems[a].SRCNUMBER;
                              }
                              else {
                                this.delivery.srcnnumber = "-";
                              }
      
                              this.delivery.grnnumber = this.uniquelineitems[a].GRNMAPPNUMBER;
                              this.delivery.uniquereferencenumber = this.uniquelineitems[a].SAPUNIQUEREFERENCENO;
                              this.delivery.saplineitemnumber = this.uniquelineitems[a].SAPLINEITEMNO;
                            }
      
                            // this.delivery.totalAmount = itemAmount;
                            this.delivery.totalAmount = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '');
                            this.delivery.description = this.invoiceForm.controls['description'].value;
                            this.delivery.remark = this.invoiceForm.controls['remarks'].value;
                            this.delivery.totalamtinctaxes = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '')
                            this.delivery.taxamount = (this.invoiceForm.controls['taxAmount'].value).toString().replace(/,/g, '')
                            this.delivery.status = "P"
      
      
                            if (this.invoicefilechanged == false) {
      
                              if (this.TypeNo == 'resubmit') {
                                this.delivery.actualfilename = this.actualresubmitfilename;
                                this.delivery.savedfilename = this.savedresubmitfilename;
                              }
                              else {
                                this.delivery.actualfilename = this.actualfilenameofwopo;
                                this.delivery.savedfilename = this.savedfilenameofwopo;
                              }
      
                            }
                            else {
                              this.delivery.actualfilename = this.actualfilename;
                              this.delivery.savedfilename = this.savedfilename;
                            }
      
                            this.delivery.material = this.uniquelineitems[a].MATERIAL;
                            this.delivery.createdby = sessionStorage.getItem("loginUser");
                            this.delivery.managerid = "sachin.kale@timesgroup.com";
                            if (this.invoiceForm.controls['billofladingdate'].value != null) {
                              this.delivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");
      
                            }
                            else {
                              this.delivery.billofladingdate = "Invalid date";
                            }
                            console.log("this.delivery.billofladingdate " + this.delivery.billofladingdate);
                            // return;
                            // this.invoiceForm.controls['billofladingdate'].value;
      
                            this.delivery.balance_qty = Number(this.uniquelineitems[a].BALANCE_QTY);
                            console.log("a is here " + a);
                            console.log("this.uniquelineitems[a].BALANCE_QTY is here " + this.uniquelineitems[a].BALANCE_QTY);
                            if (this.grntobeinvoicelist.length == 0) {
                              if (this.part || this.TypeNo == 'resubmit') {
                                this.delivery.invoiceamount = this.invoiceForm.controls['calRealtime' + a].value;
                              }
                              else if (this.full) {
                                this.delivery.invoiceamount = this.uniquelineitems[a].INVAMOUNT;
                              }
                            }
                            else {
                              this.delivery.invoiceamount = this.uniquelineitems[a].INVAMOUNT;
      
                            }
      
                            this.delivery.multiplesavedfilename = "";
                            this.delivery.multipleactualfilename = "";
      
                            if (this.multiplefilechanged == true) {
                              for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                                this.delivery.multipleactualfilename = this.delivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                              }
                              for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                                this.delivery.multiplesavedfilename = this.delivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                              }
                              this.delivery.multipleactualfilename = this.delivery.multipleactualfilename.slice(0, -1);
                              this.delivery.multiplesavedfilename = this.delivery.multiplesavedfilename.slice(0, -1);
                              console.log("this.delivery.multipleactualfilename ", this.delivery.multipleactualfilename);
                              console.log("this.delivery.multiplesavedfilename ", this.delivery.multiplesavedfilename);
      
                            }
                            else {
                              if (sessionStorage.getItem("invwopodetails")) {
                                this.delivery.multipleactualfilename = this.withoutpodetails[0].SUPPORTACTFILENAME;
                                this.delivery.multiplesavedfilename = this.withoutpodetails[0].SUPPORTSAVEDFILENAME;
      
                              }
                              else if (this.TypeNo == 'resubmit') {
                                this.delivery.multipleactualfilename = this.invoicedata[0].MULTIACTUALFILENAME;
                                this.delivery.multiplesavedfilename = this.invoicedata[0].MULTISAVEDFILENAME;
                              }
                              else {
                                this.delivery.multipleactualfilename = "";
                                this.delivery.multiplesavedfilename = "";
                              }
      
                            }
                            console.log("this.delivery.multipleactualfilename ", this.delivery.multipleactualfilename);
                            console.log("this.delivery.multiplesavedfilename ", this.delivery.multiplesavedfilename);
      
                            // this.delivery.multipleactualfilename=null;
                            // this.delivery.multiplesavedfilename=null;
                            // this.delivery.balance_qty = Number(this.uniquelineitems[a].BALANCE_QTY) - Number(quantity)
                            // this.delivery.modified_by = sessionStorage.getItem("loginUser");
                            // for(var j=0;j<this.uniquelineitem.length;j++)
                            // {
                            //   if(this.uniquelineitem[j].PONUMBER == this.uniquelineitems[a].PO_NUMBER)
                            //   {
                            //     delivery.buyerid = this.uniquelineitem[j].BUYER;
                            //   }
                            // }
                            // delivery.buyerid = "sachin.mehta@timesgroup.com"
      
                            this.delivery.stage = "1"
                            console.log("this.delivery ==>", this.delivery.balance_qty);
                            this.invoicesubmissionarray.push(this.delivery);
                            console.log("this.invoicesubmissionarray ==>", this.invoicesubmissionarray);
                          }
      
                        }
                      }
                      else {
                        console.log("in else" + count);
      
                        if (this.uniquelineitems[a].TOINVOICELINEITEMNUMBER == this.orderlineitems[b].LINEITEMNUMBER
                          && this.uniquelineitems[a].order == this.orderlineitems[b].DC) {
      
      
                          console.log("count is here " + count)
                          var quantity = this.orderlineitems[b].QUANTITY
                          var itemAmount = this.orderlineitems[b].AMOUNT
                          console.log("quantity " + quantity);
                          // if (quantity > 0) {
                          this.delivery = new Delivery();
                          console.log("a is not empty ==>" + a);
                          this.delivery.bid = sessionStorage.getItem("Bid");
                          this.delivery.po_num = this.ponumber;
                          if (this.invoice != true) {
                            console.log("this.invoiceForm.controls['irnNo'].value;", this.invoiceForm.controls['irnNo'].value)
                            this.delivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                            console.log("test date===========>", this.invoiceForm.controls['irnDate'].value);
      
                            this.delivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
      
                          }
                          else {
                            this.delivery.irnNumber = "";
                            if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
                              this.delivery.irnDate = null;
                            }
                          }
                          // this.delivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                          // this.delivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
                          this.delivery.invoiceNumber = this.invoiceForm.controls['invoiceNo'].value.trim();
      
                          this.delivery.invoiceDate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY");
                          console.log("this.delivery.invoiceDate " + this.delivery.invoiceDate);
                          // this.delivery.referenceNumber = ""
                          // this.delivery.grnnumber = ""
                          this.delivery.rateperquantity = this.grnuniquelineitems[a].TOINVOICERATEPERQTY.replace(/,/g, '');
      
                          this.delivery.lineItemNumber = this.grnuniquelineitems[a].TOINVOICELINEITEMNUMBER;
                          this.delivery.lineitemtext = this.grnuniquelineitems[a].TOINVOICELINEITEMTEXT;
                          this.delivery.orderNumber = this.orderlineitems[b].DC;
                          if (this.TypeNo == 'resubmit') {
                            this.delivery.beforesubmissioninvoicenumber = this.invNo;
                            this.delivery.businessPartnerText = this.invoicedata[0].BUSSINESSPARTNERTEXT;
                            this.delivery.contactPerson = this.invoicedata[0].REQUSITIONER;
                            this.delivery.buyerid = this.invoicedata[0].BUYER;
      
                            console.log("Hello========>", this.invoicedata[0].BUSSINESSPARTNERTEXT, this.invoicedata[0].REQUSITIONER,
                              this.invoicedata[0].BUYER
                            );
      
                          } else {
                            this.delivery.beforesubmissioninvoicenumber = "";
                            this.delivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
                            this.delivery.contactPerson = sessionStorage.getItem("Requisitioner");
                            this.delivery.buyerid = sessionStorage.getItem("Buyer");
                          }
                          // this.delivery.orderNumber = this.orderlineitems[b].DcNo;
                          console.log(this.delivery.orderNumber, 'this.delivery.orderNumber')
                          // this.delivery.quantity = quantity;
                          this.delivery.quantity = this.orderlineitems[b].QUANTITY;
                          console.log(this.delivery.orderNumber, ' this.delivery.orderNumber')
                          console.log(this.grnuniquelineitems[a].TOINVOICEUNITOFMEASURE, ' this.grnuniquelineitems[a].TOINVOICEUNITOFMEASURE')
                          this.delivery.uOM = this.grnuniquelineitems[a].TOINVOICEUNITOFMEASURE;
                          this.delivery.contactPersonPhone = this.grnuniquelineitems[a].TOINVOICECONTACTPERSONPHONE;
                          this.delivery.company = this.grnuniquelineitems[a].TOINVOICECOMPANY
                          this.delivery.plant = this.grnuniquelineitems[a].TOINVOICEPLANT
                          this.delivery.department = this.grnuniquelineitems[a].TOINVOICEDEPARTMENT
                          this.delivery.storagelocation = this.grnuniquelineitems[a].TOINVOICESTORAGELOCATION
                          this.delivery.costCentre = this.grnuniquelineitems[a].TOINVOICECOSTCENTRE
                          this.delivery.category = this.grnuniquelineitems[a].TOINVOICECATEGORY
      
                          this.delivery.vendorID = this.vendorid
                          this.delivery.profileID = ""
                          this.delivery.invoiceDocumentPath = ""
                          this.delivery.iGSTAmount = ""
                          this.delivery.cGSTAmount = ""
                          this.delivery.sgstAmount = ""
                          // this.delivery.uniquereferencenumber = this.uniquereferencenumber;
                          console.log("============>", this.grntobeinvoicelist);
      
                          // if (this.tobeinvoiced == false) {
                          //   this.delivery.grnnumber = "-";
                          //   this.delivery.uniquereferencenumber = "-";
                          //   this.delivery.saplineitemnumber = "-";
                          //   this.delivery.srcnnumber = "-";
                          // }
                          // else {
                          this.delivery.servicenumber = this.grnuniquelineitems[a].SERVICENUMBER;
                          this.delivery.dcnumber = this.grnuniquelineitems[a].DCNUMBER
                          console.log(" this.delivery.dcnumber======>", this.delivery.dcnumber);
                          if (this.grnuniquelineitems[a].SRCNUMBER != null) {
                            this.delivery.srcnnumber = this.grnuniquelineitems[a].SRCNUMBER;
                          }
                          else {
                            this.delivery.srcnnumber = "-";
                          }
      
                          this.delivery.grnnumber = this.grnuniquelineitems[a].GRNMAPPNUMBER;
                          this.delivery.uniquereferencenumber = this.grnuniquelineitems[a].SAPUNIQUEREFERENCENO;
                          this.delivery.saplineitemnumber = this.grnuniquelineitems[a].SAPLINEITEMNO;
                          // }
      
                          // this.delivery.totalAmount = itemAmount;
                          this.delivery.totalAmount = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '');
                          this.delivery.description = this.invoiceForm.controls['description'].value;
                          this.delivery.remark = this.invoiceForm.controls['remarks'].value;
                          this.delivery.totalamtinctaxes = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '')
                          this.delivery.taxamount = (this.invoiceForm.controls['taxAmount'].value).toString().replace(/,/g, '')
                          this.delivery.status = "P"
      
      
                          if (this.invoicefilechanged == false) {
      
                            if (this.TypeNo == 'resubmit') {
                              this.delivery.actualfilename = this.actualresubmitfilename;
                              this.delivery.savedfilename = this.savedresubmitfilename;
                            }
                            else {
                              this.delivery.actualfilename = this.actualfilenameofwopo;
                              this.delivery.savedfilename = this.savedfilenameofwopo;
                            }
      
                          }
                          else {
                            this.delivery.actualfilename = this.actualfilename;
                            this.delivery.savedfilename = this.savedfilename;
                          }
      
                          this.delivery.material = this.grnuniquelineitems[a].TOINVOICEMATERIAL;
                          this.delivery.createdby = sessionStorage.getItem("loginUser");
                          this.delivery.managerid = "sachin.kale@timesgroup.com";
                          if (this.invoiceForm.controls['billofladingdate'].value != null) {
                            this.delivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");
      
                          }
                          else {
                            this.delivery.billofladingdate = "Invalid date";
                          }
                          console.log("this.delivery.billofladingdate " + this.delivery.billofladingdate);
                          // return;
                          // this.invoiceForm.controls['billofladingdate'].value;
      
                          this.delivery.balance_qty = Number(this.grnuniquelineitems[a].BALANCE_QTY);
                          this.delivery.invoiceamount = this.grnuniquelineitems[a].TOINVOICETOTALAMOUNT;
      
      
                          this.delivery.multiplesavedfilename = "";
                          this.delivery.multipleactualfilename = "";
      
                          if (this.multiplefilechanged == true) {
                            for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                              this.delivery.multipleactualfilename = this.delivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                            }
                            for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                              this.delivery.multiplesavedfilename = this.delivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                            }
                            this.delivery.multipleactualfilename = this.delivery.multipleactualfilename.slice(0, -1);
                            this.delivery.multiplesavedfilename = this.delivery.multiplesavedfilename.slice(0, -1);
                            console.log("this.delivery.multipleactualfilename ", this.delivery.multipleactualfilename);
                            console.log("this.delivery.multiplesavedfilename ", this.delivery.multiplesavedfilename);
      
                          }
                          else {
                            if (sessionStorage.getItem("invwopodetails")) {
                              this.delivery.multipleactualfilename = this.withoutpodetails[0].SUPPORTACTFILENAME;
                              this.delivery.multiplesavedfilename = this.withoutpodetails[0].SUPPORTSAVEDFILENAME;
      
                            }
                            else if (this.TypeNo == 'resubmit') {
                              this.delivery.multipleactualfilename = this.invoicedata[0].MULTIACTUALFILENAME;
                              this.delivery.multiplesavedfilename = this.invoicedata[0].MULTISAVEDFILENAME;
                            }
                            else {
                              this.delivery.multipleactualfilename = "";
                              this.delivery.multiplesavedfilename = "";
                            }
      
                          }
                          console.log("this.delivery.multipleactualfilename ", this.delivery.multipleactualfilename);
                          console.log("this.delivery.multiplesavedfilename ", this.delivery.multiplesavedfilename);
      
                          // this.delivery.multipleactualfilename=null;
                          // this.delivery.multiplesavedfilename=null;
                          // this.delivery.balance_qty = Number(this.uniquelineitems[a].BALANCE_QTY) - Number(quantity)
                          // this.delivery.modified_by = sessionStorage.getItem("loginUser");
                          // for(var j=0;j<this.uniquelineitem.length;j++)
                          // {
                          //   if(this.uniquelineitem[j].PONUMBER == this.uniquelineitems[a].PO_NUMBER)
                          //   {
                          //     delivery.buyerid = this.uniquelineitem[j].BUYER;
                          //   }
                          // }
                          // delivery.buyerid = "sachin.mehta@timesgroup.com"
      
                          this.delivery.stage = "1"
                          console.log("this.delivery ==>", this.delivery.balance_qty);
                          this.invoicesubmissionarray.push(this.delivery);
                          console.log("this.invoicesubmissionarray ==>", this.invoicesubmissionarray);
                          // }
      
                        }
                        count++;
                      }
      
      
      
      
      
                    }
      
                  }
      
                  // this.loaderservice.hide()
                  // return false
      
                  this.purchaseOrderListService.sendEmaildemo(this.invoicesubmissionarray).subscribe(res => {
                    sessionStorage.removeItem("invwopodetails");
                    if (res[0].message == "Success") {
      
                      this.purchaseOrderListService.removeEmptyDeliveries(this.ponumber, this.nullDCN).subscribe(res => {
                        if (res[0].message == "Success") {
      
      
      
                          this.loaderservice.hide();
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
                            this.router.navigate(['/trackInvoiceList']);
                          });
                        }
                      });
                      // sessionStorage.removeItem("invAllDetails");
                      // sessionStorage.removeItem("invsubmissionorderDetails");
                      // sessionStorage.removeItem("invsubmissionDetails");
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
                      this.loaderservice.hide();
                      // this.dialogBox.popUpOpen2('Invoice Number Already Exist.', 'error', 'invoicesubmit');
                      const dialogConfig = new MatDialogConfig();
                      dialogConfig.data = {
                        message: res[0].Uniquemessage,
                        // message: 'Invoice Number Already Exist.',
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
                      this.successmessage = res[0].Uniquemessage;
                      this.error = true;
                      // this.showPopup();
                    }
                    this.loaderservice.hide();
                  });
                  // this.loaderservice.hide();
                  // }
                })
                // this.loaderservice.hide();
                // console.log("autodc===========>",dcnlist);
              }
            });
          }
        });
      }
      else
      {
      this.purchaseOrderListService.createcustomdeliveryitems(this.ponumber, this.fullpodate, this.lineitemnumberlist, this.quantitylist).subscribe(res => {

        if (res[0].message == "Success") {
          
          this.loaderservice.show();
          var dcnlist: any = []
          res[0].dcnvalues.forEach(element => {
            dcnlist.push(element)
          });

          this.purchaseOrderListService.setDCNumbers(this.ponumber, dcnlist).subscribe(res1 => {
            console.log("return========>", res1[0].message, res1[0].orderitems);

            this.orderlineitems = res1[0].orderitems;
            // res1[0].orderitems.forEach(data => {
            //   this.orderlineitems.push(data);
            // });

            for (let s = 0; s < this.orderlineitems.length; s++) {
              if (this.orderlineitems[s].QUANTITY == 0 || this.orderlineitems[s].QUANTITY == 0.00) {
                this.nullDCN.push(this.orderlineitems[s].DC)
              }
            }
            console.log(this.uniquelineitems, 'this.uniquelineitems.length');
            console.log(this.orderlineitems, 'this.orderlineitems.length');
            for (var k = 0; k < this.uniquelineitems.length; k++) {
              this.uniquelineitems[k].order = this.orderlineitems[k].DC;
            }

            // this.loaderservice.hide();


            // this.actualfilename = this.viewUploadFile.name;

            // var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
            // fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
            // var fileName2 = fileName;
            // fileName = this.ponumber + "_invoice_" + fileName;
            // this.savedfilename = fileName;
            // console.log("FileName here" + fileName);
            // this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
            //   console.log(JSON.stringify(res))
            //   res[0].data = true;
            //   if (res.length == 0) {
            //     this.loaderservice.hide();
            //     return false;
            //   }
            // else if (res[0].status == "Success") {

            // return false
            console.log("this.uniquelineitems >>", this.uniquelineitems);
            console.log("this.orderlineitems >>", this.orderlineitems);
            console.log("this.uniquelineitems.length >>" + this.uniquelineitems.length);
            console.log("this.orderlineitems.length >>" + this.orderlineitems.length);
            // return;
            var count = 0;
            for (var a = 0; a < this.uniquelineitems.length; a++) {
              console.log("a is here =>" + a);
              for (var b = 0; b < this.orderlineitems.length; b++) {
                // debugger
                console.log(this.uniquelineitems[a].LINEITEMNUMBER, 'this.uniquelineitems.LINEITEMNUMBER')
                console.log(this.orderlineitems[b].LINEITEMNUMBER, 'this.orderlineitems.LINEITEMNUMBER')
                if (this.grntobeinvoicelist.length == 0) {
                  if (this.uniquelineitems[a].LINEITEMNUMBER == this.orderlineitems[b].LINEITEMNUMBER) {

                    // var quantity = $('#Quantity' + b).val();
                    // var itemAmount = $('#itemAmount' + b).val();
                    // debugger;
                    console.log("this.uniquelineitems[a].LINEITEMNUMBER " + this.uniquelineitems[a].LINEITEMNUMBER +
                      "BALANCE_QTY " + this.uniquelineitems[a].BALANCE_QTY);

                    var quantity = this.orderlineitems[b].QUANTITY
                    var itemAmount = this.orderlineitems[b].AMOUNT
                    console.log("quantity " + quantity);
                    if (quantity > 0) {
                      this.delivery = new Delivery();
                      console.log("a is not empty ==>" + a);
                      this.delivery.bid = sessionStorage.getItem("Bid");
                      this.delivery.po_num = this.ponumber;
                      if (this.invoice != true) {
                        console.log("this.invoiceForm.controls['irnNo'].value;", this.invoiceForm.controls['irnNo'].value)
                        this.delivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                        console.log("test date===========>", this.invoiceForm.controls['irnDate'].value);

                        this.delivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");

                      }
                      else {
                        this.delivery.irnNumber = "";
                        if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
                          this.delivery.irnDate = null;
                        }
                      }
                      // this.delivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                      // this.delivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
                      this.delivery.invoiceNumber = this.invoiceForm.controls['invoiceNo'].value.trim();

                      this.delivery.invoiceDate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY");
                      console.log("this.delivery.invoiceDate " + this.delivery.invoiceDate);
                      // this.delivery.referenceNumber = ""
                      // this.delivery.grnnumber = ""
                      this.delivery.rateperquantity = this.uniquelineitems[a].RATEPERQTY.replace(/,/g, '');
                      if (this.tobeinvoiced == false) {
                        this.delivery.lineItemNumber = this.uniquelineitems[a].LINEITEMNUMBER;
                        this.delivery.lineitemtext = this.uniquelineitems[a].LINEITEMTEXT;
                      }
                      else {
                        this.delivery.lineItemNumber = this.uniquelineitems[a].TOINVOICELINEITEMNUMBER;
                        this.delivery.lineitemtext = this.uniquelineitems[a].TOINVOICELINEITEMTEXT;
                      }

                      this.delivery.orderNumber = this.orderlineitems[b].DC;
                      if (this.TypeNo == 'resubmit') {
                        this.delivery.beforesubmissioninvoicenumber = this.invNo;
                        this.delivery.businessPartnerText = this.invoicedata[0].BUSSINESSPARTNERTEXT;
                        this.delivery.contactPerson = this.invoicedata[0].REQUSITIONER;
                        this.delivery.buyerid = this.invoicedata[0].BUYER;

                        console.log("Hello========>", this.invoicedata[0].BUSSINESSPARTNERTEXT, this.invoicedata[0].REQUSITIONER,
                          this.invoicedata[0].BUYER
                        );

                      } else {
                        this.delivery.beforesubmissioninvoicenumber = "";
                        this.delivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
                        this.delivery.contactPerson = sessionStorage.getItem("Requisitioner");
                        this.delivery.buyerid = sessionStorage.getItem("Buyer");
                      }
                      // this.delivery.orderNumber = this.orderlineitems[b].DcNo;
                      console.log(this.delivery.orderNumber, 'this.delivery.orderNumber')
                      // this.delivery.quantity = quantity;
                      this.delivery.quantity = this.orderlineitems[b].QUANTITY;
                      console.log(this.delivery.orderNumber, ' this.delivery.orderNumber')
                      console.log(this.delivery.quantity, ' this.delivery.quantity')
                      this.delivery.uOM = this.uniquelineitems[a].UNITOFMEASURE;

                      this.delivery.contactPersonPhone = this.uniquelineitems[a].CONTACTPERSONPHONE;
                      // this.delivery.vendorID = this.uniquelineitems[a].vendorId;
                      this.delivery.vendorID = this.vendorid
                      this.delivery.company = this.uniquelineitems[a].COMPANY
                      this.delivery.plant = this.uniquelineitems[a].PLANT
                      this.delivery.department = this.uniquelineitems[a].DEPARTMENT
                      this.delivery.storagelocation = this.uniquelineitems[a].STORAGELOCATION
                      this.delivery.costCentre = this.uniquelineitems[a].COSTCENTRE
                      this.delivery.category = this.uniquelineitems[a].CATEGORY


                      this.delivery.profileID = ""
                      this.delivery.invoiceDocumentPath = ""
                      this.delivery.iGSTAmount = ""
                      this.delivery.cGSTAmount = ""
                      this.delivery.sgstAmount = ""
                      this.delivery.servicenumber = this.uniquelineitems[a].SERVICENUMBER;
                      // this.delivery.uniquereferencenumber = this.uniquereferencenumber;
                      console.log("============>", this.grntobeinvoicelist);

                      if (this.tobeinvoiced == false) {
                        this.delivery.grnnumber = "-";
                        this.delivery.uniquereferencenumber = "-";
                        this.delivery.saplineitemnumber = "-";
                        this.delivery.srcnnumber = "-";
                      }
                      else {
                        this.delivery.servicenumber = this.uniquelineitems[a].SERVICENUMBER;
                        this.delivery.dcnumber = this.uniquelineitems[a].DCNUMBER
                        console.log(" this.delivery.dcnumber======>", this.delivery.dcnumber);
                        if (this.uniquelineitems[a].SRCNUMBER != null) {
                          this.delivery.srcnnumber = this.uniquelineitems[a].SRCNUMBER;
                        }
                        else {
                          this.delivery.srcnnumber = "-";
                        }

                        this.delivery.grnnumber = this.uniquelineitems[a].GRNMAPPNUMBER;
                        this.delivery.uniquereferencenumber = this.uniquelineitems[a].SAPUNIQUEREFERENCENO;
                        this.delivery.saplineitemnumber = this.uniquelineitems[a].SAPLINEITEMNO;
                      }

                      // this.delivery.totalAmount = itemAmount;
                      this.delivery.totalAmount = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '');
                      this.delivery.description = this.invoiceForm.controls['description'].value;
                      this.delivery.remark = this.invoiceForm.controls['remarks'].value;
                      this.delivery.totalamtinctaxes = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '')
                      this.delivery.taxamount = (this.invoiceForm.controls['taxAmount'].value).toString().replace(/,/g, '')
                      this.delivery.status = "P"


                      if (this.invoicefilechanged == false) {

                        if (this.TypeNo == 'resubmit') {
                          this.delivery.actualfilename = this.actualresubmitfilename;
                          this.delivery.savedfilename = this.savedresubmitfilename;
                        }
                        else {
                          this.delivery.actualfilename = this.actualfilenameofwopo;
                          this.delivery.savedfilename = this.savedfilenameofwopo;
                        }

                      }
                      else {
                        this.delivery.actualfilename = this.actualfilename;
                        this.delivery.savedfilename = this.savedfilename;
                      }

                      this.delivery.material = this.uniquelineitems[a].MATERIAL;
                      this.delivery.createdby = sessionStorage.getItem("loginUser");
                      this.delivery.managerid = "sachin.kale@timesgroup.com";
                      if (this.invoiceForm.controls['billofladingdate'].value != null) {
                        this.delivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");

                      }
                      else {
                        this.delivery.billofladingdate = "Invalid date";
                      }
                      console.log("this.delivery.billofladingdate " + this.delivery.billofladingdate);
                      // return;
                      // this.invoiceForm.controls['billofladingdate'].value;

                      this.delivery.balance_qty = Number(this.uniquelineitems[a].BALANCE_QTY);
                      console.log("a is here " + a);
                      console.log("this.uniquelineitems[a].BALANCE_QTY is here " + this.uniquelineitems[a].BALANCE_QTY);
                      if (this.grntobeinvoicelist.length == 0) {
                        if (this.part || this.TypeNo == 'resubmit') {
                          this.delivery.invoiceamount = this.invoiceForm.controls['calRealtime' + a].value;
                        }
                        else if (this.full) {
                          this.delivery.invoiceamount = this.uniquelineitems[a].INVAMOUNT;
                        }
                      }
                      else {
                        this.delivery.invoiceamount = this.uniquelineitems[a].INVAMOUNT;

                      }

                      this.delivery.multiplesavedfilename = "";
                      this.delivery.multipleactualfilename = "";

                      if (this.multiplefilechanged == true) {
                        for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                          this.delivery.multipleactualfilename = this.delivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                        }
                        for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                          this.delivery.multiplesavedfilename = this.delivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                        }
                        this.delivery.multipleactualfilename = this.delivery.multipleactualfilename.slice(0, -1);
                        this.delivery.multiplesavedfilename = this.delivery.multiplesavedfilename.slice(0, -1);
                        console.log("this.delivery.multipleactualfilename ", this.delivery.multipleactualfilename);
                        console.log("this.delivery.multiplesavedfilename ", this.delivery.multiplesavedfilename);

                      }
                      else {
                        if (sessionStorage.getItem("invwopodetails")) {
                          this.delivery.multipleactualfilename = this.withoutpodetails[0].SUPPORTACTFILENAME;
                          this.delivery.multiplesavedfilename = this.withoutpodetails[0].SUPPORTSAVEDFILENAME;

                        }
                        else if (this.TypeNo == 'resubmit') {
                          this.delivery.multipleactualfilename = this.invoicedata[0].MULTIACTUALFILENAME;
                          this.delivery.multiplesavedfilename = this.invoicedata[0].MULTISAVEDFILENAME;
                        }
                        else {
                          this.delivery.multipleactualfilename = "";
                          this.delivery.multiplesavedfilename = "";
                        }

                      }
                      console.log("this.delivery.multipleactualfilename ", this.delivery.multipleactualfilename);
                      console.log("this.delivery.multiplesavedfilename ", this.delivery.multiplesavedfilename);

                      // this.delivery.multipleactualfilename=null;
                      // this.delivery.multiplesavedfilename=null;
                      // this.delivery.balance_qty = Number(this.uniquelineitems[a].BALANCE_QTY) - Number(quantity)
                      // this.delivery.modified_by = sessionStorage.getItem("loginUser");
                      // for(var j=0;j<this.uniquelineitem.length;j++)
                      // {
                      //   if(this.uniquelineitem[j].PONUMBER == this.uniquelineitems[a].PO_NUMBER)
                      //   {
                      //     delivery.buyerid = this.uniquelineitem[j].BUYER;
                      //   }
                      // }
                      // delivery.buyerid = "sachin.mehta@timesgroup.com"

                      this.delivery.stage = "1"
                      console.log("this.delivery ==>", this.delivery.balance_qty);
                      this.invoicesubmissionarray.push(this.delivery);
                      console.log("this.invoicesubmissionarray ==>", this.invoicesubmissionarray);
                    }

                  }
                }
                else {
                  console.log("in else" + count);

                  if (this.uniquelineitems[a].TOINVOICELINEITEMNUMBER == this.orderlineitems[b].LINEITEMNUMBER
                    && this.uniquelineitems[a].order == this.orderlineitems[b].DC) {


                    console.log("count is here " + count)
                    var quantity = this.orderlineitems[b].QUANTITY
                    var itemAmount = this.orderlineitems[b].AMOUNT
                    console.log("quantity " + quantity);
                    // if (quantity > 0) {
                    this.delivery = new Delivery();
                    console.log("a is not empty ==>" + a);
                    this.delivery.bid = sessionStorage.getItem("Bid");
                    this.delivery.po_num = this.ponumber;
                    if (this.invoice != true) {
                      console.log("this.invoiceForm.controls['irnNo'].value;", this.invoiceForm.controls['irnNo'].value)
                      this.delivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                      console.log("test date===========>", this.invoiceForm.controls['irnDate'].value);

                      this.delivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");

                    }
                    else {
                      this.delivery.irnNumber = "";
                      if (this.invoiceForm.controls['irnDate'].value == null || this.invoiceForm.controls['irnDate'].value == "") {
                        this.delivery.irnDate = null;
                      }
                    }
                    // this.delivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
                    // this.delivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
                    this.delivery.invoiceNumber = this.invoiceForm.controls['invoiceNo'].value.trim();

                    this.delivery.invoiceDate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY");
                    console.log("this.delivery.invoiceDate " + this.delivery.invoiceDate);
                    // this.delivery.referenceNumber = ""
                    // this.delivery.grnnumber = ""
                    this.delivery.rateperquantity = this.grnuniquelineitems[a].TOINVOICERATEPERQTY.replace(/,/g, '');

                    this.delivery.lineItemNumber = this.grnuniquelineitems[a].TOINVOICELINEITEMNUMBER;
                    this.delivery.lineitemtext = this.grnuniquelineitems[a].TOINVOICELINEITEMTEXT;
                    this.delivery.orderNumber = this.orderlineitems[b].DC;
                    if (this.TypeNo == 'resubmit') {
                      this.delivery.beforesubmissioninvoicenumber = this.invNo;
                      this.delivery.businessPartnerText = this.invoicedata[0].BUSSINESSPARTNERTEXT;
                      this.delivery.contactPerson = this.invoicedata[0].REQUSITIONER;
                      this.delivery.buyerid = this.invoicedata[0].BUYER;

                      console.log("Hello========>", this.invoicedata[0].BUSSINESSPARTNERTEXT, this.invoicedata[0].REQUSITIONER,
                        this.invoicedata[0].BUYER
                      );

                    } else {
                      this.delivery.beforesubmissioninvoicenumber = "";
                      this.delivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext");
                      this.delivery.contactPerson = sessionStorage.getItem("Requisitioner");
                      this.delivery.buyerid = sessionStorage.getItem("Buyer");
                    }
                    // this.delivery.orderNumber = this.orderlineitems[b].DcNo;
                    console.log(this.delivery.orderNumber, 'this.delivery.orderNumber')
                    // this.delivery.quantity = quantity;
                    this.delivery.quantity = this.orderlineitems[b].QUANTITY;
                    console.log(this.delivery.orderNumber, ' this.delivery.orderNumber')
                    console.log(this.grnuniquelineitems[a].TOINVOICEUNITOFMEASURE, ' this.grnuniquelineitems[a].TOINVOICEUNITOFMEASURE')
                    this.delivery.uOM = this.grnuniquelineitems[a].TOINVOICEUNITOFMEASURE;
                    this.delivery.contactPersonPhone = this.grnuniquelineitems[a].TOINVOICECONTACTPERSONPHONE;
                    this.delivery.company = this.grnuniquelineitems[a].TOINVOICECOMPANY
                    this.delivery.plant = this.grnuniquelineitems[a].TOINVOICEPLANT
                    this.delivery.department = this.grnuniquelineitems[a].TOINVOICEDEPARTMENT
                    this.delivery.storagelocation = this.grnuniquelineitems[a].TOINVOICESTORAGELOCATION
                    this.delivery.costCentre = this.grnuniquelineitems[a].TOINVOICECOSTCENTRE
                    this.delivery.category = this.grnuniquelineitems[a].TOINVOICECATEGORY

                    this.delivery.vendorID = this.vendorid
                    this.delivery.profileID = ""
                    this.delivery.invoiceDocumentPath = ""
                    this.delivery.iGSTAmount = ""
                    this.delivery.cGSTAmount = ""
                    this.delivery.sgstAmount = ""
                    // this.delivery.uniquereferencenumber = this.uniquereferencenumber;
                    console.log("============>", this.grntobeinvoicelist);

                    // if (this.tobeinvoiced == false) {
                    //   this.delivery.grnnumber = "-";
                    //   this.delivery.uniquereferencenumber = "-";
                    //   this.delivery.saplineitemnumber = "-";
                    //   this.delivery.srcnnumber = "-";
                    // }
                    // else {
                    this.delivery.servicenumber = this.grnuniquelineitems[a].SERVICENUMBER;
                    this.delivery.dcnumber = this.grnuniquelineitems[a].DCNUMBER
                    console.log(" this.delivery.dcnumber======>", this.delivery.dcnumber);
                    if (this.grnuniquelineitems[a].SRCNUMBER != null) {
                      this.delivery.srcnnumber = this.grnuniquelineitems[a].SRCNUMBER;
                    }
                    else {
                      this.delivery.srcnnumber = "-";
                    }

                    this.delivery.grnnumber = this.grnuniquelineitems[a].GRNMAPPNUMBER;
                    this.delivery.uniquereferencenumber = this.grnuniquelineitems[a].SAPUNIQUEREFERENCENO;
                    this.delivery.saplineitemnumber = this.grnuniquelineitems[a].SAPLINEITEMNO;
                    // }

                    // this.delivery.totalAmount = itemAmount;
                    this.delivery.totalAmount = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '');
                    this.delivery.description = this.invoiceForm.controls['description'].value;
                    this.delivery.remark = this.invoiceForm.controls['remarks'].value;
                    this.delivery.totalamtinctaxes = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '')
                    this.delivery.taxamount = (this.invoiceForm.controls['taxAmount'].value).toString().replace(/,/g, '')
                    this.delivery.status = "P"


                    if (this.invoicefilechanged == false) {

                      if (this.TypeNo == 'resubmit') {
                        this.delivery.actualfilename = this.actualresubmitfilename;
                        this.delivery.savedfilename = this.savedresubmitfilename;
                      }
                      else {
                        this.delivery.actualfilename = this.actualfilenameofwopo;
                        this.delivery.savedfilename = this.savedfilenameofwopo;
                      }

                    }
                    else {
                      this.delivery.actualfilename = this.actualfilename;
                      this.delivery.savedfilename = this.savedfilename;
                    }

                    this.delivery.material = this.grnuniquelineitems[a].TOINVOICEMATERIAL;
                    this.delivery.createdby = sessionStorage.getItem("loginUser");
                    this.delivery.managerid = "sachin.kale@timesgroup.com";
                    if (this.invoiceForm.controls['billofladingdate'].value != null) {
                      this.delivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");

                    }
                    else {
                      this.delivery.billofladingdate = "Invalid date";
                    }
                    console.log("this.delivery.billofladingdate " + this.delivery.billofladingdate);
                    // return;
                    // this.invoiceForm.controls['billofladingdate'].value;

                    this.delivery.balance_qty = Number(this.grnuniquelineitems[a].BALANCE_QTY);
                    this.delivery.invoiceamount = this.grnuniquelineitems[a].TOINVOICETOTALAMOUNT;


                    this.delivery.multiplesavedfilename = "";
                    this.delivery.multipleactualfilename = "";

                    if (this.multiplefilechanged == true) {
                      for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
                        this.delivery.multipleactualfilename = this.delivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
                      }
                      for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
                        this.delivery.multiplesavedfilename = this.delivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
                      }
                      this.delivery.multipleactualfilename = this.delivery.multipleactualfilename.slice(0, -1);
                      this.delivery.multiplesavedfilename = this.delivery.multiplesavedfilename.slice(0, -1);
                      console.log("this.delivery.multipleactualfilename ", this.delivery.multipleactualfilename);
                      console.log("this.delivery.multiplesavedfilename ", this.delivery.multiplesavedfilename);

                    }
                    else {
                      if (sessionStorage.getItem("invwopodetails")) {
                        this.delivery.multipleactualfilename = this.withoutpodetails[0].SUPPORTACTFILENAME;
                        this.delivery.multiplesavedfilename = this.withoutpodetails[0].SUPPORTSAVEDFILENAME;

                      }
                      else if (this.TypeNo == 'resubmit') {
                        this.delivery.multipleactualfilename = this.invoicedata[0].MULTIACTUALFILENAME;
                        this.delivery.multiplesavedfilename = this.invoicedata[0].MULTISAVEDFILENAME;
                      }
                      else {
                        this.delivery.multipleactualfilename = "";
                        this.delivery.multiplesavedfilename = "";
                      }

                    }
                    console.log("this.delivery.multipleactualfilename ", this.delivery.multipleactualfilename);
                    console.log("this.delivery.multiplesavedfilename ", this.delivery.multiplesavedfilename);

                    // this.delivery.multipleactualfilename=null;
                    // this.delivery.multiplesavedfilename=null;
                    // this.delivery.balance_qty = Number(this.uniquelineitems[a].BALANCE_QTY) - Number(quantity)
                    // this.delivery.modified_by = sessionStorage.getItem("loginUser");
                    // for(var j=0;j<this.uniquelineitem.length;j++)
                    // {
                    //   if(this.uniquelineitem[j].PONUMBER == this.uniquelineitems[a].PO_NUMBER)
                    //   {
                    //     delivery.buyerid = this.uniquelineitem[j].BUYER;
                    //   }
                    // }
                    // delivery.buyerid = "sachin.mehta@timesgroup.com"

                    this.delivery.stage = "1"
                    console.log("this.delivery ==>", this.delivery.balance_qty);
                    this.invoicesubmissionarray.push(this.delivery);
                    console.log("this.invoicesubmissionarray ==>", this.invoicesubmissionarray);
                    // }

                  }
                  count++;
                }





              }

            }

            // this.loaderservice.hide()
            // return false

            this.purchaseOrderListService.sendEmaildemo(this.invoicesubmissionarray).subscribe(res => {
              sessionStorage.removeItem("invwopodetails");
              if (res[0].message == "Success") {

                this.purchaseOrderListService.removeEmptyDeliveries(this.ponumber, this.nullDCN).subscribe(res => {
                  if (res[0].message == "Success") {



                    this.loaderservice.hide();
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
                      this.router.navigate(['/trackInvoiceList']);
                    });
                  }
                });
                // sessionStorage.removeItem("invAllDetails");
                // sessionStorage.removeItem("invsubmissionorderDetails");
                // sessionStorage.removeItem("invsubmissionDetails");
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
                this.loaderservice.hide();
                // this.dialogBox.popUpOpen2('Invoice Number Already Exist.', 'error', 'invoicesubmit');
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = {
                  message: res[0].Uniquemessage,
                  // message: 'Invoice Number Already Exist.',
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
                this.successmessage = res[0].Uniquemessage;
                this.error = true;
                // this.showPopup();
              }
              this.loaderservice.hide();
            });
            // this.loaderservice.hide();
            // }
          })
          // this.loaderservice.hide();
          // console.log("autodc===========>",dcnlist);
        }


      });
    }
      // else {
      //   // this.toastr.error(res[0].message)
      //   this.dialogBox.popUpOpen2('Invoice Number is Already Exist.', 'error', 'invoicesubmit');
      //   this.successmessage = "Invoice Number is Already Exist.";
      //   this.error = true;
      //   // this.showPopup();
      //   //=-- this.dialogBox.popUpOpen2('Maximum file size (10 MB) exceeded.', 'donate', 'error2');
      //   this.loaderservice.hide();
      //   return false;
      // }

      // });
      // err => {
      //   // this.toastr.error(err)
      //   this.successmessage = err;
      //   this.error = true;
      //   // this.showPopup();
      //   this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'error', 'invoicesubmit');
      //   // =--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
      //   this.loaderservice.hide();
      //   return false;
      // }
    }
    else {
      //=--this.dialogBox.popUpOpen2('Please upload the File', 'leave', 'error2');
      // this.dialogBox.popUpOpen2('Please upload the File', 'error', 'invoicesubmit');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'Please upload the File',
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


      this.loaderservice.hide();
      return false;
    }


  }

  close() {
    this.viewAttachmentName = '';
    this.viewAttachmentName = null;
    this.viewUploadFile = null;
    this.viewUploadFile = '';
    this.fileupload = 'refileupload';
    // this.disable=true;
    if($("#cpEinvoice").is(":checked"))
    {
      this.invoiceForm.controls.irnNo.setValue(null);
      this.invoiceForm.controls.irnDate.setValue(null);
      this.invoiceForm.controls['irnNo'].setValidators([Validators.required]);  
      this.invoiceForm.get('irnNo').updateValueAndValidity();
      this.invoiceForm.controls['irnDate'].setValidators([Validators.required]);  
      this.invoiceForm.get('irnDate').updateValueAndValidity();
    }
    else if($("#cpinvoice").is(":checked"))
    {
      this.invoiceForm.controls['irnNo'].setValidators(null);  
      this.invoiceForm.get('irnNo').updateValueAndValidity();
      this.invoiceForm.controls['irnDate'].setValidators(null);  
      this.invoiceForm.get('irnDate').updateValueAndValidity();
    }
   
    this.invoiceForm.controls['attachments'].setValue("");
    this.invoiceForm.controls['attachments'].setValidators([Validators.required]);  
    this.invoiceForm.get('attachments').updateValueAndValidity();
  }

  checkInvoice(event,) {
    this.value = event.target.value
    console.log("value is here ==>" + this.value, event.target);
    if (this.grnnumber == null) {
      this.invoiceForm.reset();
    }
    // this.invoiceForm.reset();
    $('.exceededMsg').hide();
    this.close();
    if (!this.full) {
      this.overallAmount = 0;
    }
    this.inputBalanceQuantity = 0;
    if (!this.full) {
      this.overallAmount = 0;
    }
    this.balanceExceeded = false;
    this.ArrayOfSelectedFile = [];
    this.ArrayOfSelectedFilename = [];
    if (this.value == "Invoice") {
      this.irnNumber=null;
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

  getExtensionOfFile(name) {
    return name.split(".")[name.split(".").length - 1];
  }

  getTimeStampFileName(fileName, extension) {
    console.log(Date.now().toString());
    return fileName + Date.now().toString() + "." + extension;
  }

  //   onFileSelectEvent(e, type) {
  //     this.viewUploadFile = null;
  //     this.viewAttachmentName = "";
  //     console.log(e.target.files[0]);
  //     if (this.validateFileExtension(e.target.files[0].name)) {
  //       this.fileAttachmentError = "";
  //       this.viewUploadFile = e.target.files[0];
  //       if (type == "invoice") {
  //         this.invoiceconfile = e.target.files[0];
  //         this.viewAttachmentName = this.viewUploadFile.name;
  //         this.invoiceForm.controls['attachments'].setValue(this.viewAttachmentName);
  //       }
  //       console.log("this.invoiceconfile " + this.invoiceconfile);
  //       console.log("this.viewAttachmentName ==> " + this.viewAttachmentName);

  //       this.actualfilename = this.viewUploadFile.name;
  //       console.log("this.invoiceconfile " + this.invoiceconfile);
  //       console.log("this.viewAttachmentName ==> " + this.viewAttachmentName);
  //       var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
  //       fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
  //       var fileName2 = fileName;
  //       fileName = this.ponumber + "_invoice_" + fileName;
  //       this.savedfilename = fileName;
  //       console.log("savedfilename ==>" + this.savedfilename);
  //       this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
  //         console.log(JSON.stringify(res))
  //         res[0].data = true;
  //         if (res.length == 0) {
  //           // this.toastr.error(res[0].message)
  //           // this.successmessage = "Data has been submitted successfully";

  //           //=--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
  //           return false;
  //         }
  //         else if (res[0].status == "Success") {

  //           // this.getIRNNumber();
  //           if(this.value=="Einvoice"){
  //           this.purchaseOrderListService.getIRNNumber(this.actualfilename,this.savedfilename).subscribe(res => {
  //             console.log("response of IrnDAta", res[0].message);

  //             if(res[0].message=="Success"){
  //             var datestring =  res[0].invoiceData[0].IR_DocDt;
  //             var formatdate = moment(datestring, "DD/MM/YYYY")
  //             var dateobj = formatdate.toDate();
  //             console.log("transformed date ===>", new Date(res[0].invoiceData[0].IR_DocDt),dateobj);

  //             this.invoiceForm.controls.irnNo.setValue(res[0].invoiceData[0].IRN_Number);
  //             this.invoiceForm.controls.irnDate.setValue(dateobj);
  //             this.dialogBox.popUpOpen2('E-Invoice has been uploaded successfully', 'success', 'Einvoice');
  //             }
  //             else{
  //               this.dialogBox.popUpOpen2('Error while uploading E-Invoice. Please try again','error','Einvoice')
  //             }
  //           })
  //         }

  //     }
  //     else {
  //       //Assign error message to class.
  //       this.fileAttachmentError = this.InvalidAttachmentFileError;
  //     }

  //     $(".fileSelectBtn").blur();
  //   }
  // }

  onFileSelectEvent(e, type) {
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
      this.viewUploadFile = null;
      this.viewAttachmentName = "";
      console.log(e.target.files[0]);
      if (this.validateFileExtension(e.target.files[0].name)) {
        this.loaderservice.show();
        this.invoicefilechanged = true;
        this.fileAttachmentError = "";
        this.viewUploadFile = e.target.files[0];
        if (type == "invoice") {
          this.invoiceconfile = e.target.files[0];
          this.viewAttachmentName = this.viewUploadFile.name;
          console.log("this.viewAttachmentName " + this.viewAttachmentName);
          // this.invoiceForm.controls.attachments.setValue(this.viewAttachmentName);
          // this.invoiceForm.controls['attachments'].setValue(this.viewAttachmentName);
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
          this.loaderservice.hide();
          if (res.length == 0) {
            // this.toastr.error(res[0].message)
            // this.successmessage = "Data has been submitted successfully";
  
            //=--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
            return false;
          }
          else if (res[0].status == "Success") {
  
            // this.getIRNNumber();
            // if (this.value == "Einvoice") {
              if ($("#cpEinvoice").is(":checked")) {
              this.loaderservice.show();
              this.purchaseOrderListService.getIRNNumber(this.actualfilename, this.savedfilename).subscribe(res => {
                console.log("response of IrnDAta", res[0].message);
                this.loaderservice.hide();
                if (res[0].message == "Success") {
                  var datestring = res[0].invoiceData[0].IR_DocDt;
                  var formatdate = moment(datestring, "DD/MM/YYYY")
                  var dateobj = formatdate.toDate();
                  console.log("transformed date ===>", new Date(res[0].invoiceData[0].IR_DocDt), dateobj);
  
                  this.invoiceForm.controls.irnNo.setValue(res[0].invoiceData[0].IRN_Number);
                  this.invoiceForm.controls.irnDate.setValue(dateobj);
                  console.log("this.invoiceForm.controls['invoiceNo'].value " + this.invoiceForm.controls['invoiceNo'].value);
                  console.log("res[0].invoiceData[0].Invoice_Number " + res[0].invoiceData[0].Invoice_Number);
                  console.log("moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format('DD/MM/YYYY') " + moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY"));
                  console.log("dateobj " + dateobj);
                  if (this.grnnumber != null) {
                    if (this.invoiceForm.controls['invoiceNo'].value != res[0].invoiceData[0].Invoice_Number
                      || moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY") != moment(new Date(dateobj)).format("DD/MM/YYYY")) {
                      this.viewUploadFile = null;
                      this.viewUploadFile = '';
                      this.viewAttachmentName = "";
                      this.invoiceForm.controls['irnNo'].setValue(null);
                      this.invoiceForm.controls['irnDate'].setValue(null);
                      const dialogConfig = new MatDialogConfig();
                      dialogConfig.data = {
                        message: 'Invoice number/Invoice date mismatch. Please upload correct invoice',
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
                      return;
                    }
                    else {
                      this.invoiceForm.controls.invoiceNo.setValue(res[0].invoiceData[0].Invoice_Number);
                      this.invoiceForm.controls.invoiceDate.setValue(dateobj);
                    }
                  }
                  else {
                    this.invoiceForm.controls.invoiceNo.setValue(res[0].invoiceData[0].Invoice_Number);
                    this.invoiceForm.controls.invoiceDate.setValue(dateobj);
                  }
  
                  // moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY")
                  // this.invoiceForm.controls.invoiceNo.setValue(res[0].invoiceData[0].Invoice_Number);
                  // this.invoiceForm.controls.invoiceDate.setValue(dateobj);
  
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
            else if($("#cpinvoice").is(":checked"))
            {
              this.invoiceForm.controls['irnNo'].setValidators(null);  
              this.invoiceForm.get('irnNo').updateValueAndValidity();
              this.invoiceForm.controls['irnDate'].setValidators(null);  
              this.invoiceForm.get('irnDate').updateValueAndValidity();
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






  // balanceQuantity(i) {

  //   this.errorqty = Number(this.uniquelineitems[i].BALANCE_QTY) - Number(this.invoiceForm.controls.orderqty.value);

  //   var quantity = $('#Quantity' + i).val();
  //   // this.finalAmount=e.target.value * rate;

  //   // this.invoiceForm.controls['TotalItemAmount'].setValue(this.finalAmount);

  //   console.log("Bal", this.uniquelineitems[i].BALANCE_QTY, "quantity", quantity);
  //   // this.delivery.balance_qty=this.invoiceForm.controls.balanceqty.value;
  //   this.disable = false;
  //   // if (this.grnnumber == null) {
  //   //   this.invoiceForm.reset();
  //   // }
  //   if (quantity > this.uniquelineitems[i].BALANCE_QTY && this.grnnumber == null) {
  //     $('#quantityErrMsg' + i).show();
  //     this.showerror = true;
  //     this.errormessage = "order quantity is greater than balance quantity"
  //     console.log("this.errormessage", this.errormessage);
  //     this.disable = true;
  //     // this.invoiceForm.controls.BalanceQty.setValue(0)
  //   }
  //   else {
  //     this.showerror = false;
  //     $('#quantityErrMsg' + i).hide();
  //   }

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

            this.filecount = this.filecount - 1;
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
          this.ArrayOfSelectedFilename.push(this.ArrayOfSelectedFile[k].name);
          this.ArrayOfSelectedSavedFile.push(this.ponumber + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[k].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[k].name));

          this.multiplactualfilenamearray.push(this.ArrayOfSelectedFile[k].name);
        }
        this.filecount = this.ArrayOfSelectedFile.length;
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
      this.filecount = this.filecount + array.length;
      if (this.filecount < 11) {
        for (let file of array) {
          this.multiplefilechanged = true;
          for (var t = 0; t < this.ArrayOfSelectedFilename.length; t++) {
            if (this.ArrayOfSelectedFilename[t] == file.name) {
              //   this.dialogBox.popUpOpen2('Duplicate files are not allowed.', 'error', 'invoicesubmit');
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

              // this.filecount -= 1
              this.filecount = this.filecount - 1;
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
    const array = event.target.files;
    if(array.length != 0){
      this.uploadfile();
    }  }

  uploadfile() {
    const formData = new FormData();
    this.loaderservice.show();

    for (var i = 0; i < this.ArrayOfSelectedFile.length; i++) {

      console.log("this.ArrayOfSelectedFile[i].name ==> " + this.ponumber + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
      formData.append("file[]", this.ArrayOfSelectedFile[i], this.ponumber + "_invoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
    }
    this.purchaseOrderListService.multiplefileupload(formData).subscribe(res => {
      console.log(res.toString);
      this.loaderservice.hide();
      if (res[0].status == "Fail") {
        this.ArrayOfSelectedFilename = [];
        // var tempname = this.ArrayOfSelectedFilename[index]
        // this.ArrayOfSelectedFilename.splice(index, 1);
        // this.multiplsavedfilenamearray.splice(index, 1);
        this.ArrayOfSelectedSavedFile = [];
        // this.filecount = this.filecount - 1;
        this.ArrayOfSelectedFile = [];

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
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result1: ${result}`);
        });
      }
    });
  }

  removeitem(index) {
    // delete this.ArrayOfSelectedFilename[index];
    var tempname = this.ArrayOfSelectedFilename[index]
    this.ArrayOfSelectedFilename.splice(index, 1);
    // this.multiplsavedfilenamearray.splice(index, 1);
    this.ArrayOfSelectedSavedFile.splice(index, 1);
    this.filecount = this.filecount - 1;
    for (var k = 0; k < this.ArrayOfSelectedFile.length; k++) {
      if (this.ArrayOfSelectedFile[k].name == tempname) {
        this.ArrayOfSelectedFile.splice(k, 1);
      }
    }
    // if(this.ArrayOfSelectedFile[index]!=undefined ||this.ArrayOfSelectedFile[index].name != undefined )
    // {
    //   this.ArrayOfSelectedFile.splice(index, 1);
    // }
    console.log("this.ArrayOfSelectedFilename" + this.ArrayOfSelectedFilename.length);
  }


  calculate(i, rate) {
    // let inputValue = event.target.value;
    console.log(" Values================>", i, rate);
    this.calculatedAmount = 0;
    this.inputBalanceQuantity = 0;
    if (this.invoiceForm.controls['orderValue' + i].value == 0 || this.invoiceForm.controls['orderValue' + i].value == "") {
      console.log("entered");
      // this.invoiceForm.controls['calRealtime' + i].setValue(0)
      // this.invoiceForm.controls['orderValue' + i].setValue(0)
      this.calculatedAmount = 0 * parseFloat(rate)
    }
    else {
      this.calculatedAmount = parseFloat(this.invoiceForm.controls['orderValue' + i].value) * parseFloat(rate)
    }
    // if (isNaN(this.calculatedAmount)) {
    //   this.calculatedAmount = this.invoiceForm.controls['orderValue' + i].value;
    // }
    this.overallAmount = 0;
    // debugger;
    console.log("total===========>", this.calculatedAmount);
    this.invoiceForm.controls['calRealtime' + i].setValue(Math.round(Number(this.calculatedAmount) * 100) / 100);
    for (let a = 0; a < this.uniquelineitems.length; a++) {
      if (this.invoiceForm.controls['orderValue' + a].value == 0 || this.invoiceForm.controls['orderValue' + a].value == "") {
        console.log("entered");
        // this.invoiceForm.controls['calRealtime' + i].setValue(0)
        // this.invoiceForm.controls['orderValue' + a].setValue(0)
      }
      this.overallAmount += this.invoiceForm.controls['calRealtime' + a].value;
      this.inputBalanceQuantity += Number(this.invoiceForm.controls['orderValue' + a].value);
      console.log("==============>", this.inputBalanceQuantity);

      // debugger;
      console.log(this.overallAmount);
      if (isNaN(this.overallAmount) || isNaN(this.inputBalanceQuantity)) {
        // this.overallAmount = this.invoiceForm.controls['calRealtime' + (a-1)].value;
        // this.inputBalanceQuantity=this.invoiceForm.controls['orderValue' + (a-1)].value;
      }
    }
    this.invoiceForm.controls['overallAmount'].setValue(this.overallAmount);
    this.invoiceForm.controls['totalOrderQty'].setValue(this.inputBalanceQuantity);
  }


  calculateTax() {
    if (this.part) {
      this.invoiceForm.controls['taxAmount'].setValue(0);
      let tax = parseFloat(this.invoiceForm.controls['TotalinctaxAmount'].value) - parseFloat(this.invoiceForm.controls['overallAmount'].value)
      Math.round(tax * 100) / 100
      if (isNaN(tax)) {
        tax = this.invoiceForm.controls['TotalinctaxAmount'].value
      }
      // let taxAmt=tax.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
      let taxAmt = Math.round(tax * 100) / 100
      console.log("taxAmt "+taxAmt);
      if (taxAmt < 0) {
        this.negativeFlag = true;
        this.disable = true
      }
      else {
        this.negativeFlag = false;
        this.disable = false;
      }

      this.invoiceForm.controls.taxAmount.setValue(taxAmt);
    }
    else if (this.full) {
      this.invoiceForm.controls['taxAmount'].setValue(0);
      let tax = parseFloat(this.invoiceForm.controls['TotalinctaxAmount'].value) - parseFloat(this.overallAmount);
      if (isNaN(tax)) {
        tax = this.invoiceForm.controls['TotalinctaxAmount'].value
      }
      tax = Math.round(tax * 100) / 100
      this.invoiceForm.controls.taxAmount.setValue(tax);
    }

  }


  calculateAmount() {
    if (this.part) {
      this.invoiceForm.controls['TotalinctaxAmount'].setValue(0);
      let totalincAmount = parseFloat(this.invoiceForm.controls['taxAmount'].value) + parseFloat(this.invoiceForm.controls['overallAmount'].value)
      Math.round(totalincAmount * 100) / 100;
      if (isNaN(totalincAmount)) {
        totalincAmount = this.invoiceForm.controls['taxAmount'].value
      }
      // let taxAmt=tax.toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
      let taxAmtinc = Math.round(totalincAmount * 100) / 100;
      this.invoiceForm.controls.TotalinctaxAmount.setValue(taxAmtinc);
    }
    else if (this.full) {
      this.invoiceForm.controls['TotalinctaxAmount'].setValue(0);
      let tax = parseFloat(this.invoiceForm.controls['taxAmount'].value) + parseFloat(this.overallAmount);
      if (isNaN(tax)) {
        tax = this.invoiceForm.controls['taxAmount'].value
      }
      tax = Math.round(tax * 100) / 100;
      this.invoiceForm.controls.taxAmount.setValue(tax);
    }

  }

  // submitinvoice1() {

  //   this.loaderservice.show();
  //   console.log("values here ==>", this.invoiceForm);
  //   console.log(this.uniquelineitems.length);
  //   this.loaderservice.hide();
  //   // return false;
  //   this.invoicesubmissionarray = [];


  //   if ((this.viewUploadFile != null && this.viewAttachmentName != "") || this.withoutpodetails.length != 0) {
  //     console.log("inininin");
  //     this.actualfilename = this.viewUploadFile.name;

  //     var fileName = this.getFileNameWOExtention(this.viewUploadFile.name) + "_";
  //     fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewUploadFile.name));
  //     var fileName2 = fileName;
  //     fileName = this.ponumber + "_invoice_" + fileName;
  //     this.savedfilename = fileName;
  //     console.log("FileName here" + fileName);
  //     // this.purchaseOrderListService.fileupload(this.viewUploadFile, fileName).subscribe(res => {
  //     //   console.log(JSON.stringify(res))
  //     //   res[0].data = true;
  //     //   if (res.length == 0) {
  //     //     this.loaderservice.hide();
  //     //     return false;
  //     //   }
  //     // else if (res[0].status == "Success") {
  //     console.log(this.uniquelineitems, 'this.uniquelineitems.length');
  //     console.log(this.orderlineitems, 'this.orderlineitems.length');
  //     for (var a = 0; a < this.uniquelineitems.length; a++) {
  //       console.log("a is here =>" + a);
  //       //  for (var b = 0; b < this.orderlineitems.length; b++) {
  //       console.log(this.uniquelineitems[a].LINEITEMNUMBER, 'this.uniquelineitems.LINEITEMNUMBER')
  //       //  console.log(this.orderlineitems[b].LINEITEMNUMBER, 'this.orderlineitems.LINEITEMNUMBER')
  //       // if (this.uniquelineitems[a].LINEITEMNUMBER == this.orderlineitems[b].LINEITEMNUMBER) 
  //       //   {

  //       // var quantity = $('#Quantity' + b).val();
  //       // var itemAmount = $('#itemAmount' + b).val();
  //       // var quantity = this.orderlineitems[b].QUANTITY
  //       // var itemAmount = this.orderlineitems[b].AMOUNT
  //       // console.log("quantity " + quantity);
  //       // if (quantity > 0) {
  //       this.delivery = new Delivery();
  //       console.log("a is not empty ==>" + a);
  //       this.delivery.bid = sessionStorage.getItem("Bid");
  //       this.delivery.po_num = this.ponumber;
  //       if (this.invoice != true) {
  //         this.delivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
  //         this.delivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");

  //       }
  //       else {
  //         this.delivery.irnNumber = "";
  //         this.delivery.irnDate = "";
  //       }
  //       // this.delivery.irnNumber = this.invoiceForm.controls['irnNo'].value;
  //       // this.delivery.irnDate = moment(new Date(this.invoiceForm.controls['irnDate'].value)).format("DD/MM/YYYY");
  //       this.delivery.invoiceNumber = this.invoiceForm.controls['invoiceNo'].value;

  //       this.delivery.invoiceDate = moment(new Date(this.invoiceForm.controls['invoiceDate'].value)).format("DD/MM/YYYY");
  //       console.log("this.delivery.invoiceDate " + this.delivery.invoiceDate);
  //       this.delivery.referenceNumber = ""
  //       this.delivery.grnnumber = "-"
  //       this.delivery.rateperquantity = this.uniquelineitems[a].RATEPERQTY.replace(/,/g, '');
  //       this.delivery.lineItemNumber = this.uniquelineitems[a].LINEITEMNUMBER;
  //       //    this.delivery.orderNumber = this.orderlineitems[b].DC;

  //       // this.delivery.orderNumber = this.orderlineitems[b].DcNo;
  //       console.log(this.delivery.orderNumber, 'this.delivery.orderNumber')
  //       // this.delivery.quantity = quantity;
  //       //     this.delivery.quantity = this.orderlineitems[b].QUANTITY;
  //       console.log(this.delivery.orderNumber, ' this.delivery.orderNumber')
  //       console.log(this.delivery.quantity, ' this.delivery.quantity')
  //       this.delivery.uOM = this.uniquelineitems[a].UNITOFMEASURE;
  //       this.delivery.contactPerson = sessionStorage.getItem("Requisitioner");
  //       this.delivery.contactPersonPhone = this.uniquelineitems[a].CONTACTPERSONPHONE;
  //       // this.delivery.vendorID = this.uniquelineitems[a].vendorId;
  //       this.delivery.vendorID = this.vendorid;
  //       this.delivery.company = this.uniquelineitems[a].COMPANY
  //       this.delivery.plant = this.uniquelineitems[a].PLANT
  //       this.delivery.department = this.uniquelineitems[a].DEPARTMENT
  //       this.delivery.costCentre = this.uniquelineitems[a].COSTCENTRE
  //       this.delivery.category = this.uniquelineitems[a].CATEGORY
  //       this.delivery.businessPartnerText = sessionStorage.getItem("Bussinesspartnertext")
  //       this.delivery.profileID = ""
  //       this.delivery.invoiceDocumentPath = ""
  //       this.delivery.iGSTAmount = ""
  //       this.delivery.cGSTAmount = ""
  //       this.delivery.sgstAmount = ""
  //       // this.delivery.totalAmount = itemAmount;
  //       this.delivery.totalAmount = (this.invoiceForm.controls['TotalinctaxAmount'].value).toString().replace(/,/g, '');
  //       this.delivery.description = this.invoiceForm.controls['description'].value;
  //       // if(this.part){
  //       // this.delivery.ordervalue= this.invoiceForm.controls['orderValue'+a].value
  //       // }
  //       this.delivery.status = "P"
  //       // this.delivery.invoiceamount = itemAmount;
  //       if (this.invoicefilechanged == false) {

  //         this.delivery.actualfilename = this.actualfilenameofwopo;
  //         this.delivery.savedfilename = this.savedfilenameofwopo;
  //       }
  //       else {
  //         this.delivery.actualfilename = this.actualfilename;
  //         this.delivery.savedfilename = this.savedfilename;
  //       }

  //       this.delivery.material = this.uniquelineitems[a].MATERIAL;
  //       this.delivery.createdby = sessionStorage.getItem("loginUser");
  //       this.delivery.managerid = "sachin.kale@timesgroup.com";
  //       this.delivery.billofladingdate = moment(new Date(this.invoiceForm.controls['billofladingdate'].value)).format("DD/MM/YYYY");
  //       // this.invoiceForm.controls['billofladingdate'].value;
  //       this.delivery.buyerid = sessionStorage.getItem("Buyer");
  //       this.delivery.balance_qty = Number(this.uniquelineitems[a].BALANCE_QTY);
  //       this.delivery.multiplesavedfilename = "";
  //       this.delivery.multipleactualfilename = "";

  //       if (this.multiplefilechanged == true) {
  //         for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
  //           this.delivery.multipleactualfilename = this.delivery.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
  //         }
  //         for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
  //           this.delivery.multiplesavedfilename = this.delivery.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
  //         }
  //         this.delivery.multipleactualfilename = this.delivery.multipleactualfilename.slice(0, -1);
  //         this.delivery.multiplesavedfilename = this.delivery.multiplesavedfilename.slice(0, -1);
  //         console.log("this.delivery.multipleactualfilename ", this.delivery.multipleactualfilename);
  //         console.log("this.delivery.multiplesavedfilename ", this.delivery.multiplesavedfilename);

  //       }
  //       else {
  //         if (sessionStorage.getItem("invwopodetails")) {


  //           this.delivery.multipleactualfilename = this.withoutpodetails[0].SUPPORTACTFILENAME;
  //           this.delivery.multiplesavedfilename = this.withoutpodetails[0].SUPPORTSAVEDFILENAME;


  //         }

  //         else {
  //           this.delivery.multipleactualfilename = "";
  //           this.delivery.multiplesavedfilename = "";
  //         }

  //       }

  //       // this.delivery.multipleactualfilename=null;
  //       // this.delivery.multiplesavedfilename=null;
  //       // this.delivery.balance_qty = Number(this.uniquelineitems[a].BALANCE_QTY) - Number(quantity)
  //       // this.delivery.modified_by = sessionStorage.getItem("loginUser");
  //       // for(var j=0;j<this.uniquelineitem.length;j++)
  //       // {
  //       //   if(this.uniquelineitem[j].PONUMBER == this.uniquelineitems[a].PO_NUMBER)
  //       //   {
  //       //     delivery.buyerid = this.uniquelineitem[j].BUYER;
  //       //   }
  //       // }
  //       // delivery.buyerid = "sachin.mehta@timesgroup.com"
  //       this.delivery.stage = "1"
  //       console.log("this.delivery ==>", this.delivery.balance_qty);
  //       this.invoicesubmissionarray.push(this.delivery);
  //       console.log("this.invoicesubmissionarray ==>", this.invoicesubmissionarray);
  //       //  }

  //       //    }



  //     }

  //   }
  //   // return false;
  //   this.purchaseOrderListService.sendEmaildemo(this.invoicesubmissionarray).subscribe(res => {
  //     sessionStorage.removeItem("invwopodetails");
  //     if (res[0].message == "Success") {
  //       this.dialogBox.popUpOpen2('Invoice has been submitted successfully', 'success', 'invoicesubmit');
  //       // sessionStorage.removeItem("invAllDetails");
  //       // sessionStorage.removeItem("invsubmissionorderDetails");
  //       // sessionStorage.removeItem("invsubmissionDetails");
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
  //       this.dialogBox.popUpOpen2('Invoice Number Already Exist.', 'error', 'invoicesubmit');
  //       // this.toastr.error(res[0].message)
  //       // this.dialogBox.popUpOpen2('Error while submitting. Please try again','error','invoicesubmit');
  //       this.successmessage = "Invoice Number is Already Exist.";
  //       this.error = true;
  //       // this.showPopup();
  //     }
  //   });
  //   this.loaderservice.hide();
  //   // }
  //   // else {
  //   //   // this.toastr.error(res[0].message)
  //   //   this.dialogBox.popUpOpen2('Invoice Number is Already Exist.', 'error', 'invoicesubmit');
  //   //   this.successmessage = "Invoice Number is Already Exist.";
  //   //   this.error = true;
  //   //   // this.showPopup();
  //   //   //=-- this.dialogBox.popUpOpen2('Maximum file size (10 MB) exceeded.', 'donate', 'error2');
  //   //   this.loaderservice.hide();
  //   //   return false;
  //   // }

  //   // });
  //   // err => {
  //   //   // this.toastr.error(err)
  //   //   this.successmessage = err;
  //   //   this.error = true;
  //   //   // this.showPopup();
  //   //   this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'error', 'invoicesubmit');
  //   //   // =--this.dialogBox.popUpOpen2('There was an error while uploading the file. Please try again!', 'donate', 'error2');
  //   //   this.loaderservice.hide();
  //   //   return false;
  //   // }
  // }
  // else {
  //   //=--this.dialogBox.popUpOpen2('Please upload the File', 'leave', 'error2');
  //   this.dialogBox.popUpOpen2('Please upload the File', 'error', 'invoicesubmit');
  //   this.loaderservice.hide();
  //   return false;
  // }


  //}

  // submitwholePO() {
  //   this.lineItemOrderarray = [];
  //   this.poorders = [];
  //   this.orderarray = [];
  //   this.temppodetails = [];

  //   this.purchaseOrderListService.createcustomdeliveryitems(this.fullpoponumber, this.fullpodate, this.lineitemnumberlist, this.quantitylist).subscribe(res => {

  //     if (res[0].message == "Success") {

  //       this.purchaseOrderListService.getorderforfullpo(this.fullpoponumber).subscribe(res2 => {
  //         if (res2[0].message == "Success") {
  //           this.poorders = res2[0].orderitems;
  //           console.log("this.poorders" + this.poorders.length);

  //           for (let c = 0; c < this.poorders.length; c++) {
  //             this.orderdetailsModel = new orderdetailsModel();
  //             this.orderdetailsModel.DC = this.poorders[c].DC;
  //             this.orderdetailsModel.DQty = this.poorders[c].QUANTITY;
  //             this.orderdetailsModel.DcDate = this.poorders[c].DISPATCHDATE
  //             this.orderdetailsModel.AMOUNT = "";

  //             this.orderdetailsModel.LINEITEMNUMBER = this.poorders[c].LINEITEMNUMBER;
  //             this.orderdetailsModel.QUANTITY = this.poorders[c].QUANTITY
  //             this.orderdetailsModel.ORDERNUMBER = this.poorders[c].DC;


  //             this.lineitemorderModel = new LineItemOrderModel()
  //             this.lineitemorderModel.PO_NUMBER = this.poorders[c].PONUMBER;
  //             this.lineitemorderModel.DC = this.poorders[c].DC;
  //             this.lineitemorderModel.LINEITEMNUMBER = this.poorders[c].LINEITEMNUMBER;
  //             this.lineitemorderModel.ORDERNUMBER = this.poorders[c].DC;
  //             this.lineitemorderModel.QUANTITY = this.poorders[c].QUANTITY;
  //             this.orderarray.push(this.orderdetailsModel);
  //             for (let x = 0; x < this.poDetail.length; x++) {
  //               console.log("this.poDetail[x].LINEITEMNUMBER" + this.poDetail[x].LINEITEMNUMBER);
  //               console.log("this.poorders[c].LINEITEMNUMBER " + this.poorders[c].LINEITEMNUMBER);
  //               if (this.poDetail[x].LINEITEMNUMBER == this.poorders[c].LINEITEMNUMBER) {
  //                 this.temppodetails.push(this.poDetail[x]);
  //                 console.log("in here" + this.poorders[c].QUANTITY);
  //                 console.log("in here" + this.poDetail[x].RATEPERQTY.replace(/,/g, ''));
  //                 var a = this.poorders[c].QUANTITY;
  //                 var b = this.poDetail[x].RATEPERQTY.replace(/,/g, '');
  //                 this.temp = parseFloat(this.poorders[c].QUANTITY) * parseFloat(this.poDetail[x].RATEperqty);
  //                 console.log("temp is here " + this.temp);

  //               }
  //               this.lineitemorderModel.DcDate = this.poorders[c].DISPATCHDATE;
  //             }
  //             var total = a * b;
  //             this.lineitemorderModel.AMOUNT = total;
  //             console.log("this.lineitemorderModel.AMOUNT ==> " + this.lineitemorderModel.AMOUNT);
  //             this.lineItemOrderarray.push(this.lineitemorderModel);
  //           }
  //           console.log("this.lineItemOrderarray " + this.lineItemOrderarray.length);

  //           this.selectedorderlineitemdetails = this.temppodetails;
  //           sessionStorage.removeItem("invsubmissionDetails");
  //           sessionStorage.removeItem("invwopodetails");
  //           sessionStorage.setItem("invsubmissionDetails", JSON.stringify(this.selectedorderlineitemdetails));
  //           sessionStorage.removeItem("invallDetails");
  //           sessionStorage.setItem("invallDetails", JSON.stringify(this.lineItemOrderarray));
  //           sessionStorage.removeItem("invsubmissionorderDetails");
  //           sessionStorage.setItem("invsubmissionorderDetails", JSON.stringify(this.orderarray));
  //           console.log("this.invoicenumber " + this.invoicenumber);
  //           // if(this.lineitemorderModel.AMOUNT != NaN)
  //           // {
  //           // setTimeout(() => {
  //           if (this.invoicenumber != undefined) {
  //             this.purchaseOrderListService.getwopodetails(this.invoicenumber).subscribe(res => {
  //               console.log("res is here ", res);
  //               this.wopodata = res[0].data;
  //               if (res[0].message == "Success") {
  //                 console.log("res[0].data ==>", this.wopodata);
  //                 sessionStorage.removeItem("invwopodetails");
  //                 sessionStorage.setItem("invwopodetails", JSON.stringify(this.wopodata));
  //               }
  //               this.router.navigate(["invoicesubmission"]);
  //             });

  //           }
  //           else {
  //             this.router.navigate(["invoicesubmission"]);

  //           }
  //           // }, 1000);
  //           // }


  //           // sessionStorage.setItem("invsubmissionorderDetails", JSON.stringify(this.orderarray));

  //         }



  //       });



  //     }
  //     else {
  //       this.dialogBox.popUpOpen2('Error while creating delievery.' + res[0].message, 'error', 'invoicesubmit');
  //     }
  //   });
  //   $("#popup5").css("visibility", "hidden");
  //   $("#popup5").css("opacity", "0");
  // }
  checked() {
    this.editing = !this.editing
    console.log(this.editing);

  }


  numberOnly(event, i): boolean {
    // this.editing=false;
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
    console.log($('#total').get(0).id, "IDDDDD");

    console.log($('#inputQty' + i).val());

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#inputQty' + i).val().split('.').length === 2) || ($('#total').val().split('.').length === 2) || ($('#taxAmount').val().split('.').length === 2))) {

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

  // isCheck(event,){

  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if((charCode>= 48 && charCode <= 57) || charCode== 46 ||charCode == 0){
  //     if(data.indexOf('.') > -1){
  //      if(charCode== 46)
  //       event.preventDefault();
  //     }
  //     }else
  //     event.preventDefault();
  //     };



  hasDecimalPlace(value, x) {
    var pointIndex = value.indexOf('.');
    return pointIndex >= 0 && pointIndex < value.length - x;
  }

  checkBalanceQty(event, balance, val1) {
    var inputValue = event.target.value;
    console.log(inputValue);
    if (parseFloat(inputValue) > parseFloat(balance)) {
      // this.balanceExceeded = true;
      console.log("in");
      this.disable = true;
      this.zeropresent = false;
      $('#inputQty' + val1).addClass('redborder');
      $('#exceeded' + val1).show();
      $('#zero' + val1).hide();
      // $('#isshowDelivery'+ val1).prop('disabled',true);
      this.issubmitcheck = true
      this.balanceExceeded = true;
    }
    else if (Number(inputValue) < 0) {
      
      this.zeropresent = true;
      this.issubmitcheck = true;
      $('#inputQty' + val1).addClass('redborder');
      $('#zero' + val1).show();
      $('#exceeded' + val1).hide();
    }
    else {
      $('#inputQty' + val1).removeClass('redborder');
      $('#exceeded' + val1).hide();
      $('#zero' + val1).hide();
      // $('#isshowDelivery'+ val1).prop('disabled',false);
      this.issubmitcheck = false
      this.balanceExceeded = false;
      this.disable = false;
      this.zeropresent = false;
    }


  }
  focus() {
    let value = (this.invoiceForm.controls.taxAmount.value)
    value = value.toString().replace(/,/g, '')
    console.log("value==============", value)
    this.invoiceForm.controls.taxAmount.setValue(value)

  }

  focus2() {
    let value = (this.invoiceForm.controls.TotalinctaxAmount.value)
    value = value.toString().replace(/,/g, '')
    console.log("value==============", value)
    this.invoiceForm.controls.TotalinctaxAmount.setValue(value)

  }


  numberOnlytax(event, i): boolean {
    // this.editing=false;
    const charCode = (event.which) ? event.which : event.keyCode;

    console.log($('#total').get(0).id, "IDDDDD");

    console.log($('#inputQty' + i).val());

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

  numberOnlyAmount(event, i): boolean {
    // this.editing=false;
    const charCode = (event.which) ? event.which : event.keyCode;

    console.log($('#total').get(0).id, "IDDDDD");

    console.log($('#inputQty' + i).val());

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#total').val().split('.').length === 2))) {

      console.log("working")

      // this.dotpresent=false;

      return false;

    }


    if (this.hasDecimalPlace(event.target.value, 2)) {
      return false
    }

    console.log(" No working")

    // this.balanceQuantity()

    // this.dotpresent=false;

    return true;
  }
  numberOnlyQuantity(event, i): boolean {
    // this.editing=false;
    const charCode = (event.which) ? event.which : event.keyCode;

    console.log($('#inputQty' + i).val());

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#inputQty' + i).val().split('.').length === 2))) {

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



  // toinvoice(ponum, dcnumber, type) {
  //   if (type == 'special') {
  //     this.tobeinvoiced = true; 
  //     this.lineitemnumberlist = [];
  //     this.quantitylist = [];
  //     // this.toinvoiceuniquelineitems = [];
  //     this.purchaseOrderListService.getgrnonpoandinvoice(ponum, dcnumber).subscribe(res => {
  //       if (res[0].message == "Success") {
  //         console.log(" res[0].grnbasedonpoandinvoice", res[0].grnbasedonpoandinvoice);

  //         this.grntobeinvoicelist = res[0].grnbasedonpoandinvoice;
  //         this.grninvoicepresent = false;
  //         // this.uniquereferencenumber = this.grntobeinvoicelist[0].SAPUNIQUEREFERENCENO; 
  //         // this.invoiceForm.controls.invoiceNo.reset();
  //         // this.invoiceForm.controls.invoiceDate.reset();
  //         // this.invoiceForm.controls.invoiceNo.setValue(this.grntobeinvoicelist[0].INVOICENUMBER)
  //         // this.invoiceForm.controls.invoiceDate.setValue(new Date(this.grntobeinvoicelist[0].INVOICEDATE));
  //         // var datestring=this.grntobeinvoicelist[0].INVOICEDATE
  //         // var formatdate = moment(datestring, "YYYY-DD-MM")
  //         // var dateobj = formatdate.toDate();
  //         // this.invoiceForm.controls.invoiceDate.setValue(new Date(this.grntobeinvoicelist[0].INVOICEDATE));
  //         this.grnuniquelineitems = [];
  //         console.log("this.grntobeinvoicelist[i].LINEITEMNO ", this.grntobeinvoicelist[0].INVOICEDATE);
  //         console.log("this.uniquelineitems[i].LINEITEMNUMBER ", this.uniquelineitems[0].LINEITEMNUMBER);
  //         this.totalBalQty = 0;
  //         this.overallAmount = 0;
  //         this.inputBalanceQuantity = 0;
  //         // this.grnnumber = this.grntobeinvoicelist[0].GRNNUMBER;
  //         let count = 0;
  //         for (let i = 0; i < this.grntobeinvoicelist.length; i++) {
  //           for (let j = 0; j < this.uniquelineitems.length; j++) {

  //             if (this.uniquelineitems[j].LINEITEMNUMBER == String(this.grntobeinvoicelist[i].LINEITEMNO)) {
  //               this.toinvoiceuniquelineitems[0] = [];
  //               this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
  //               this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
  //               // this.uniquelineitems[count].GRNMAPPNUMBER = this.grntobeinvoicelist[i].GRNNUMBER;
  //               // this.uniquelineitems[count].TOINVOICELINEITEMNUMBER = this.grntobeinvoicelist[i].LINEITEMNO;
  //               // this.uniquelineitems[count].TOINVOICELINEITEMTEXT = this.uniquelineitems[j].LINEITEMTEXT;
  //               this.toinvoiceuniquelineitems[0].LINEITEMNUMBER = this.grntobeinvoicelist[i].LINEITEMNO;

  //               this.toinvoiceuniquelineitems[0].GRNMAPPNUMBER = this.grntobeinvoicelist[i].GRNNUMBER;
  //               this.toinvoiceuniquelineitems[0].TOINVOICELINEITEMNUMBER = this.grntobeinvoicelist[i].LINEITEMNO;
  //               this.toinvoiceuniquelineitems[0].TOINVOICELINEITEMTEXT = this.uniquelineitems[j].LINEITEMTEXT;

  //               this.toinvoiceuniquelineitems[0].BALANCE_QTY = this.uniquelineitems[j].BALANCE_QTY;
  //               this.toinvoiceuniquelineitems[0].TOINVOICEMATERIAL = this.uniquelineitems[j].MATERIAL;
  //               this.toinvoiceuniquelineitems[0].QUANTITY = this.uniquelineitems[j].QUANTITY;

  //               // this.delivery.uOM = this.uniquelineitems[a].UNITOFMEASURE;  
  //               //     this.delivery.contactPersonPhone = this.uniquelineitems[a].CONTACTPERSONPHONE;                   
  //               //     this.delivery.company = this.uniquelineitems[a].COMPANY
  //               //     this.delivery.plant = this.uniquelineitems[a].PLANT
  //               //     this.delivery.department = this.uniquelineitems[a].DEPARTMENT
  //               //     this.delivery.storagelocation = this.uniquelineitems[a].STORAGELOCATION
  //               //     this.delivery.costCentre = this.uniquelineitems[a].COSTCENTRE
  //               //     this.delivery.category = this.uniquelineitems[a].CATEGORY
  //               this.toinvoiceuniquelineitems[0].TOINVOICEUNITOFMEASURE = this.uniquelineitems[j].UNITOFMEASURE;
  //               this.toinvoiceuniquelineitems[0].TOINVOICECONTACTPERSONPHONE = this.uniquelineitems[j].CONTACTPERSONPHONE;
  //               this.toinvoiceuniquelineitems[0].TOINVOICECOMPANY = this.uniquelineitems[j].COMPANY;
  //               this.toinvoiceuniquelineitems[0].TOINVOICEPLANT = this.uniquelineitems[j].PLANT;
  //               this.toinvoiceuniquelineitems[0].TOINVOICEDEPARTMENT = this.uniquelineitems[j].DEPARTMENT;
  //               this.toinvoiceuniquelineitems[0].TOINVOICESTORAGELOCATION = this.uniquelineitems[j].STORAGELOCATION;
  //               this.toinvoiceuniquelineitems[0].TOINVOICECOSTCENTRE = this.uniquelineitems[j].COSTCENTRE;
  //               this.toinvoiceuniquelineitems[0].TOINVOICECATEGORY = this.uniquelineitems[j].CATEGORY;

  //               //check before
  //               this.toinvoiceuniquelineitems[0].SERVICENUMBER = this.grntobeinvoicelist[i].SERVICENUMBER;
  //               this.toinvoiceuniquelineitems[0].DCNUMBER = this.grntobeinvoicelist[i].DCNUMBER;
  //               // this.delivery.dcnumber = this.grntobeinvoicelist[i].DCNUMBER
  //               console.log(" this.uniquelineitems[j].GRNQTY======>", this.grntobeinvoicelist[0].GRNQTY);



  //               this.toinvoiceuniquelineitems[0].GRNQTY = this.grntobeinvoicelist[i].GRNQTY;
  //               this.toinvoiceuniquelineitems[0].INVAMOUNT = this.grntobeinvoicelist[i].AMOUNT;
  //               this.toinvoiceuniquelineitems[0].SAPUNIQUEREFERENCENO = this.grntobeinvoicelist[i].SAPUNIQUEREFERENCENO;
  //               this.toinvoiceuniquelineitems[0].SAPLINEITEMNO = this.grntobeinvoicelist[i].SAPLINEITEMNO;
  //               this.toinvoiceuniquelineitems[0].SRCNUMBER = this.grntobeinvoicelist[i].SRCNUMBER;
  //               // this.grnqty = this.grntobeinvoicelist[i].GRNQTY;
  //               this.lineitemnumberlist.push(this.toinvoiceuniquelineitems[0].TOINVOICELINEITEMNUMBER);
  //               this.quantitylist.push(this.toinvoiceuniquelineitems[0].GRNQTY);
  //               this.toinvoiceuniquelineitems[0].TOTALAMOUNT = this.grntobeinvoicelist[i].AMOUNT;
  //               this.toinvoiceuniquelineitems[0].TOINVOICERATEPERQTY = this.grntobeinvoicelist[i].RATEPERQTY;
  //               this.totalBalQty += Number(this.grntobeinvoicelist[i].GRNQTY)
  //               // this.uniquelineitems[i].QUANTITY = Number(this.grntobeinvoicelist[i].GRNQTY)
  //               this.grnuniquelineitems.push(this.toinvoiceuniquelineitems[0]);
  //               console.log("this.grnuniquelineitems ==>", this.grnuniquelineitems);
  //               this.full = true;
  //               this.part = false;
  //               console.log("this.toinvoiceuniquelineitems[0].GRNQTY " + this.toinvoiceuniquelineitems[0].GRNQTY);
  //               this.invoiceForm.controls['calRealtime' + i].setValue(this.toinvoiceuniquelineitems[0].TOTALAMOUNT);
  //               // this.invoiceForm.addControl('calRealtime' + i, this.fb.control(this.uniquelineitems[j].TOTALAMOUNT))
  //               console.log("==> ", this.invoiceForm.get('calRealtime' + i));
  //               this.inputBalanceQuantity += Number(this.invoiceForm.controls['orderValue' + i].value);
  //               this.overallAmount += Number(this.toinvoiceuniquelineitems[0].TOTALAMOUNT);
  //               console.log("==============>", this.overallAmount);
  //               // this.invoiceForm.addControl('orderValue' + i, this.fb.control(this.uniquelineitems[j].GRNQTY))
  //               this.invoiceForm.controls['orderValue' + i].setValue(this.toinvoiceuniquelineitems[0].GRNQTY);
  //               this.invoiceForm.controls['overallAmount'].setValue(this.overallAmount);
  //               this.invoiceForm.controls['totalOrderQty'].setValue(this.totalBalQty);
  //               count++;
  //               break;
  //             }


  //             // this.lineitemnumberlist.push(this.grntobeinvoicelist[i].LINEITEMNO);
  //             // this.quantitylist.push(this.grntobeinvoicelist[i].GRNQTY);
  //             // if (this.full) {
  //             //   this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
  //             //   this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
  //             // }

  //           }
  //         }
  //         console.log("this.quantitylist ", this.quantitylist);
  //         this.uniquelineitems = this.grnuniquelineitems;
  //       }
  //       else if (type == 'usual') {
  //         this.grninvoicepresent = false;
  //       }

  //     });
  //   }
  //   else {
  //     this.grntobeinvoicelist = [];
  //     this.tobeinvoiced = false; 
  //     if (this.totalBalQty == 0 || this.totalBalQty == 0.0) {
  //       this.disable = true;
  //       this.errormessage = "* Can't submit invoice total balance quantity = 0";
  //     }
  //     this.grninvoicepresent = false;
  //   }
  // }


  pos(event) {
    console.log("event.target.value " + event.target.value);
    this.ponumbers.push(event.target.value);
    console.log("this.ponumbers " + this.ponumbers);
  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.checkedList.push(option);
    } else {
      for (var i = 0; i < this.tobeinvoicelist.length; i++) {
        if (this.checkedList[i] == option) {
          this.checkedList.splice(i, 1);
        }
      }
    }
    console.log(this.checkedList);
  }

  toinvoice(ponum, dcnumber, type) {
    this.backButtonValue = type;
    if (type == 'special') {
      this.tobeinvoiced = true;
      this.lineitemnumberlist = [];
      this.grntobeinvoicelist = []
      this.quantitylist = [];
      // this.toinvoiceuniquelineitems = [];
      this.purchaseOrderListService.getgrnonpoandinvoice(ponum, this.checkedList).subscribe(res => {
        if (res[0].message == "Success") {
          console.log(" res[0].grnbasedonpoandinvoice", res[0].grnbasedonpoandinvoice);

          this.grntobeinvoicelist = res[0].grnbasedonpoandinvoice;
          this.grninvoicepresent = false;
          this.grnuniquelineitems = [];
          console.log("this.grntobeinvoicelist[i].LINEITEMNO ", this.grntobeinvoicelist[0].LINEITEMNO);
          console.log("this.uniquelineitems[i].LINEITEMNUMBER ", this.uniquelineitems[0].LINEITEMNUMBER);
          this.totalBalQty = 0;
          this.overallAmount = 0;
          this.inputBalanceQuantity = 0;
          let count = 0;
          for (let i = 0; i < this.grntobeinvoicelist.length; i++) {
            for (let j = 0; j < this.uniquelineitems.length; j++) {

              if (this.uniquelineitems[j].LINEITEMNUMBER == String(this.grntobeinvoicelist[i].LINEITEMNO)) {
                this.toinvoiceuniquelineitems[0] = [];
                this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
                this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
                this.toinvoiceuniquelineitems[0].LINEITEMNUMBER = this.grntobeinvoicelist[i].LINEITEMNO;

                this.toinvoiceuniquelineitems[0].GRNMAPPNUMBER = this.grntobeinvoicelist[i].GRNNUMBER;
                this.toinvoiceuniquelineitems[0].TOINVOICELINEITEMNUMBER = this.grntobeinvoicelist[i].LINEITEMNO;
                this.toinvoiceuniquelineitems[0].TOINVOICELINEITEMTEXT = this.uniquelineitems[j].LINEITEMTEXT;

                this.toinvoiceuniquelineitems[0].BALANCE_QTY = this.uniquelineitems[j].BALANCE_QTY;
                this.toinvoiceuniquelineitems[0].TOINVOICEMATERIAL = this.uniquelineitems[j].MATERIAL;
                this.toinvoiceuniquelineitems[0].QUANTITY = this.uniquelineitems[j].QUANTITY;
                this.toinvoiceuniquelineitems[0].TOINVOICEUNITOFMEASURE = this.uniquelineitems[j].UNITOFMEASURE;
                this.toinvoiceuniquelineitems[0].TOINVOICECONTACTPERSONPHONE = this.uniquelineitems[j].CONTACTPERSONPHONE;
                this.toinvoiceuniquelineitems[0].TOINVOICECOMPANY = this.uniquelineitems[j].COMPANY;
                this.toinvoiceuniquelineitems[0].TOINVOICEPLANT = this.uniquelineitems[j].PLANT;
                this.toinvoiceuniquelineitems[0].TOINVOICEDEPARTMENT = this.uniquelineitems[j].DEPARTMENT;
                this.toinvoiceuniquelineitems[0].TOINVOICESTORAGELOCATION = this.uniquelineitems[j].STORAGELOCATION;
                this.toinvoiceuniquelineitems[0].TOINVOICECOSTCENTRE = this.uniquelineitems[j].COSTCENTRE;
                this.toinvoiceuniquelineitems[0].TOINVOICECATEGORY = this.uniquelineitems[j].CATEGORY;

                //check before
                this.toinvoiceuniquelineitems[0].SERVICENUMBER = this.grntobeinvoicelist[i].SERVICENUMBER;
                this.toinvoiceuniquelineitems[0].DCNUMBER = this.grntobeinvoicelist[i].DCNUMBER;
                console.log(" this.uniquelineitems[j].GRNQTY======>", this.grntobeinvoicelist[i].GRNQTY);



                this.toinvoiceuniquelineitems[0].GRNQTY = this.grntobeinvoicelist[i].GRNQTY;
                this.toinvoiceuniquelineitems[0].INVAMOUNT = this.grntobeinvoicelist[i].AMOUNT;
                this.toinvoiceuniquelineitems[0].SAPUNIQUEREFERENCENO = this.grntobeinvoicelist[i].SAPUNIQUEREFERENCENO;
                this.toinvoiceuniquelineitems[0].SAPLINEITEMNO = this.grntobeinvoicelist[i].SAPLINEITEMNO;
                this.toinvoiceuniquelineitems[0].SRCNUMBER = this.grntobeinvoicelist[i].SRCNUMBER;
                // this.grnqty = this.grntobeinvoicelist[i].GRNQTY;
                this.lineitemnumberlist.push(this.toinvoiceuniquelineitems[0].TOINVOICELINEITEMNUMBER);
                this.quantitylist.push(this.toinvoiceuniquelineitems[0].GRNQTY);
                this.toinvoiceuniquelineitems[0].TOTALAMOUNT = this.grntobeinvoicelist[i].AMOUNT;
                this.toinvoiceuniquelineitems[0].TOINVOICERATEPERQTY = this.grntobeinvoicelist[i].RATEPERQTY;
                this.totalBalQty += Number(this.grntobeinvoicelist[i].GRNQTY)
                // this.uniquelineitems[i].QUANTITY = Number(this.grntobeinvoicelist[i].GRNQTY)
                this.grnuniquelineitems.push(this.toinvoiceuniquelineitems[0]);
                console.log("this.grnuniquelineitems ==>", this.grnuniquelineitems);
                this.full = true;
                this.part = false;
                console.log("this.toinvoiceuniquelineitems[0].GRNQTY " + this.toinvoiceuniquelineitems[0].GRNQTY);
                this.invoiceForm.controls['calRealtime' + i].setValue(this.toinvoiceuniquelineitems[0].TOTALAMOUNT);
                // this.invoiceForm.addControl('calRealtime' + i, this.fb.control(this.uniquelineitems[j].TOTALAMOUNT))
                console.log("==> ", this.invoiceForm.get('calRealtime' + i));
                this.inputBalanceQuantity += Number(this.invoiceForm.controls['orderValue' + i].value);
                this.overallAmount += Number(this.toinvoiceuniquelineitems[0].TOTALAMOUNT);
                console.log("==============>", this.overallAmount);
                // this.invoiceForm.addControl('orderValue' + i, this.fb.control(this.uniquelineitems[j].GRNQTY))
                this.invoiceForm.controls['orderValue' + i].setValue(this.toinvoiceuniquelineitems[0].GRNQTY);
                this.invoiceForm.controls['overallAmount'].setValue(this.overallAmount);
                this.invoiceForm.controls['totalOrderQty'].setValue(this.totalBalQty);
                count++;
                break;
              }
            }
          }
          console.log("this.quantitylist ", this.quantitylist);
          this.uniquelineitems = this.grnuniquelineitems;
        }
        else if (type == 'usual') {
          this.grninvoicepresent = false;
          this.tobeinvoiced = false; 
        }

      });
    }
    else {
      this.invoiceForm.reset();
      this.grntobeinvoicelist = [];
      this.tobeinvoiced = false;
      this.uniquelineitems = [];
      this.quantitylist = [];
     this.lineitemnumber = [];
     this.lineitemnumberlist = [];
     this.balQtyList = [];
     this.overallAmount = 0;
      if (this.totalBalQty == 0 || this.totalBalQty == 0.0) {
        this.disable = true;
        this.errormessage = "* Can't submit invoice total balance quantity = 0";
      }
      this.grninvoicepresent = false;
      this.purchaseOrderListService.getPODetails(ponum).subscribe(res => {
        this.uniquelineitems = res[0].poData;
        this.remainingLinewItems = this.uniquelineitems;
        console.log("remainingLinewItems",this.remainingLinewItems);
        for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {
          // console.log("this.uniquelineitems[i].LINEITEMNUMBER "+this.uniquelineitems[i].LINEITEMNUMBER+
          // "this.uniquelineitems[i].BALANCE_QTY "+this.uniquelineitems[i].BALANCE_QTY+" this.uniquelineitems[i] "+this.uniquelineitems[i] +
          // " this.uniquelineitems[i].QUANTITY "+this.uniquelineitems[i].QUANTITY);
          
          this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
          this.uniquelineitems[i].QUANTITY = Number(this.uniquelineitems[i].QUANTITY)
  
          this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
          this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
          console.log("this.lineitemnumberlist "+this.lineitemnumberlist);
          console.log(" this.quantitylist "+ this.quantitylist);
          if (this.full) {
            this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
            this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
          }
          this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
          this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
        }
        if ((this.totalBalQty == 0 || this.totalBalQty == 0.0) && this.tobeinvoicelist.length == 0) {
          console.log("problem here");
          this.disable = true;
          this.errormessage = "* Can't submit invoice total balance quantity = 0";
        }
        //  this.uniquelineitems.forEach(element => {
        //    this.totalBalQty +=Number(element.BALANCE_QTY)
        //    this.uniquelineitems.TOTALAMOUNT = Number(element.BALANCE_QTY) * Number(element.RATEPERQTY)
  
        //    console.log("this.uniquelineitems", this.uniquelineitems);
  
        //  });
  
        console.log("call form Total Balance Quantity==============>", this.totalBalQty);
        console.log("this.poDetail.length",this.poDetail.length)
        // this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
        // for (var j = 0; j < this.poDetail.length; j++) {
        //   if (this.poDetail[j].ORDERNUMBER == null) {
        //     this.uniquelineitems.push(this.poDetail[j]);
        //     this.balQtyList.push(this.poDetail[j].BALANCE_QTY)
        //     console.log("teest", this.poDetail[j].BALANCE_QTY);
  
        //   }
        // }
  
        console.log("this.uniquelineitems======>>>", this.uniquelineitems);
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
        return true;
      });
      // this.getPOitems(ponum);
    }
    const removeDuplicates = (array, key) => {
      return array.reduce((arr, item) => {
        const removed = arr.filter(i => i[key] !== item[key]);
        return [...removed, item];
      }, []);
    };
  }

  backButtonForPart() {
    this.errormessage = '';
    console.log("this.backButtonValue", this.backButtonValue)
    if (this.backButtonValue == "special" || this.backButtonValue == "usual") {
      $(this).addClass(".submissionForm");
      $(this).removeClass(".partInvWrapper");
      this.grninvoicepresent = true;
      this.checkedList = [];
      this.tobeinvoiced = false;
      this.full=false;
      this.part=true;
      this.uniquelineitems = [];
      this.lineitemnumber = [];
      // this.getPOitems(this.ponumber);
      // this.purchaseOrderListService.getPODetails(this.ponumber).subscribe(res => {
      //   this.uniquelineitems = res[0].poData;
      // });
      this.purchaseOrderListService.getPODetails(this.ponumber).subscribe(res => {
        this.uniquelineitems = res[0].poData;
        for (let i = 0; i <= this.uniquelineitems.length - 1; i++) {
          this.totalBalQty += Number(this.uniquelineitems[i].BALANCE_QTY)
          this.uniquelineitems[i].QUANTITY = Number(this.uniquelineitems[i].QUANTITY)

          this.lineitemnumberlist.push(this.uniquelineitems[i].LINEITEMNUMBER);
          this.quantitylist.push(this.uniquelineitems[i].BALANCE_QTY);
          console.log("this.lineitemnumberlist " + this.lineitemnumberlist);
          console.log(" this.quantitylist " + this.quantitylist);
          if (this.full) {
            this.uniquelineitems[i].TOTALAMOUNT = Number(this.uniquelineitems[i].BALANCE_QTY) * Number(this.uniquelineitems[i].RATEPERQTY)
            this.overallAmount += parseFloat(this.uniquelineitems[i].TOTALAMOUNT)
          }
          this.invoiceForm.addControl('orderValue' + i, this.fb.control(0))
          this.invoiceForm.addControl('calRealtime' + i, this.fb.control(0))
        }
        if ((this.totalBalQty == 0 || this.totalBalQty == 0.0) && this.tobeinvoicelist.length == 0) {
          console.log("problem here");
          this.disable = true;
          this.errormessage = "* Can't submit invoice total balance quantity = 0";
        }
        console.log("call form Total Balance Quantity==============>", this.totalBalQty);
        for (var j = 0; j < this.poDetail.length; j++) {
          if (this.poDetail[j].ORDERNUMBER == null) {
            this.uniquelineitems.push(this.poDetail[j]);
            this.balQtyList.push(this.poDetail[j].BALANCE_QTY)
            console.log("teest", this.poDetail[j].BALANCE_QTY);

          }
        }
        console.log("this.uniquelineitems======>>>", this.uniquelineitems);
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
        console.log("Lineitemtext ", this.poDetail)
        for (var i = 0; i < this.poDetail.length; i++) {
          this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER);
        }
        console.log("this.lineitemnumber. " + this.lineitemnumber);
        var mySet = new Set(this.lineitemnumber);
        mySet.forEach(v => this.lineitemnumberset.push(v));
        this.poDetail = res[0].poData.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
        return true;
      })
    } else {
      this.router.navigate(['/purchaseOrdersList']);
    }
    this.backButtonValue = '';
  }

  // checklength(type)
  // {
  //   if(type =='description')
  //   {
  //     this.descripionlength = 160-this.invoiceForm.controls['description'].value.length; 
  //   }
  //   if(type =='remark')
  //   {
  //     this.remarklength = 160-this.invoiceForm.controls['remarks'].value.length; 
  //   }
  // }

  // checkinputbalance()
  // {
  //   console.log("in here");
  //   if(this.part)
  //   {
  //     for(var k = 0 ; k <this.uniquelineitems.length;k++)
  //     {
  //       if(this.uniquelineitems[k].BALANCE_QTY )
  //     }
  //     // $('#txt_name').val()
  //     this.disable = true;
  //   }
    
  //   // exceeded
  // }
}
