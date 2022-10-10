import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { InternalportalserviceService } from 'app/services/internalportal/internalportalservice.service';
import { controlContainerFactory } from '../../profiledata/profiledata.component';
import * as moment from 'moment/moment';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import { timeStamp } from 'console';
import { nextTick } from 'process';
import { saveAs } from 'file-saver';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { LoginService } from 'app/services/login/login.service';
import { AuthService } from 'app/services/auth/auth.service';
import { colleaguesList } from '../trackinvoice-with-po/trackinvoice-with-po.component';
import { ComponentsModule } from 'app/components/commoncomponents/components.module';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../../../commoncomponents/popup/popup.component';
import * as configData from 'assets/configdata/appconfig.json';
import { enduserReturnModel } from 'app/models/enduserReturn';

declare var $: any;
@Component({
  selector: 'app-internalportaltrackinvoicelist',
  templateUrl: './internalportaltrackinvoicelist.component.html',
  styleUrls: ['./internalportaltrackinvoicelist.component.css']
})
export class InternalportaltrackinvoicelistComponent implements OnInit {

  public paymentList = new FormGroup({
    PONumber: new FormControl(''),
    InvoiceNumber: new FormControl(''),
    paymentMethod: new FormControl(''),
    paymentStatus: new FormControl(''),
    Topicker: new FormControl('')
  })
  confirmationNoAction: boolean;
  invoicedetailsList: any = [];
  specificemailid: string;
  typeID: string;
  enduserstatus: string;
  ENDUSERStatus = [];
  ManagerStatus = [];
  enduserstatuslist: { id: string; status: string; value: string; }[];
  managerstatuslist: { status: string; value: string; }[];
  endUserStatusVal: any;
  managerStatusVal: any;
  invoiceNumberVal: any;
  previousEndUserStatus: any;
  previousManagerStatus: any;
  ponumberVal: any;
  confirmationValue: boolean = false;
  selectedStatusVal: string
  selectedIndex: string
  disable: boolean = false;
  todateerror: boolean = false;
  fromdateerror: boolean = false;
  statusList: any = [];
  invoicenumber: any = [];
  searchList: any = [];
  totalItems: any;
  invoicenumberpresent: boolean = false;
  ponumberpresent: boolean = false;
  fromtodatepresent: boolean = false;
  filteredinvoiceData: any = [];
  filteredponumberData: any = [];
  filtereddate: any = [];
  pgNolist: any = [];
  mPageNo: number = 1;
  pageSize = 50;
  selectedPage: any;
  message: string;
  track: boolean = false;
  endUserStage: any;
  disableEndUser: boolean = false;
  disableManger: boolean = false;
  submittedinvList: any[];
  partiallypaidinvList: any[];
  paidinvList: any[];
  processedinvList: any[];
  pendinginvList: any[];
  acceptedinvList: any[];
  showQuantityList: any[];
  returnedList: any[];
  grninvList: any[];
  managerpendinginvList: any[];
  rejectedinvList: any[];
  allinvlist: any[];
  onholdinvList: any[];
  filterwithoutpolist: any[];
  customManagerList: any = [];
  emailid: string;
  managercount: number;
  displayView: boolean = false;
  Viewdetail: any;
  recipientEmail: any;
  messageList: any[];
  topic: any;
  disableoff: boolean = false;
  DecodedFile: any;
  forinternal: any;
  username: any;
  uniquePONumber: any;
  uniqueInvNumber: any;
  uniqueBid: any;
  msgOnButtonClick: any;
  ponumber: any[];
  maxdate: Date;
  mindate: Date;
  mintodate: Date;
  isenduser: boolean;
  isbuyer: boolean;
  innerbuyerportal: boolean;
  vendorPortal: boolean;
  ispayee: boolean;
  innerportal: boolean;
  internalbcclportal: boolean = false;
  storekeeper: boolean = false;
  reassigninvoicenumber: string;
  queryString: string;
  email: any;
  colleaguesDataList: any = [];
  delteindexes: any = []
  searchColleagues: any = [];
  colleaguesList: any = [];
  reassignponumber: any;
  reassignspecificemailid: any;
  reassignmanagerstatus: any;
  reassignenduserstatus: any;
  Mpage: number;
  pageNo: number;
  validate: boolean = true;
  usertype: string;
  pageName: any;
  enduserReturnmodel;
  proxyusers: any[];
  innum: string = 'NA';
  ponum: string = 'NA';
  fd: string = 'NA';
  td: string = 'NA';
  currstatus: string = 'P';
  internalpaginationpagenumber: number = 1;
  disableprevious: boolean = false;
  disablenext: boolean = false;
  endpagenumber: number = 1;
  filecount: number = 0;
  multiplefilechanged: boolean;
  ArrayOfSelectedFiles: any = [];
  ArrayOfSelectedFile: any = [];
  ArrayOfSelectedFilename: any = [];
  ArrayOfSelectedSavedFile: any = [];
  multiplactualfilenamearray: any = [];
  InvoiceNumber: any;
  PONUMBER: any;
  INVOICEDATE: any;
  INVAMT: any;
  timestampnow = Date.now().toString();
  multiplsavedfilenamearray: any;
  multipleactualendfilename: any;
  multiplesavedendfilename: any;
  individualsavedendname: any = [];
  multipleactualfilename: any;
  man: boolean = false;
  PlantList: any = [];
  tempPlantList: any = [];
  vendorList: any = [];
  plantpresent: boolean = false;
  plant: string = 'NA';
  vendorpresent: boolean = false;
  vendor: string = 'NA';
  statusTemplate: string = '';
  extensionType: any;
  invoiceCountAsPerStatus: any = [];
  pendingPo: number = 0;
  spliceCount: number = 0;
  enduserReturnArray: any = [];
  invoicedataofinvoice: any = [];
  constructor(private router: Router, private internalportalservice: InternalportalserviceService, private loginService: LoginService,
    private authService: AuthService,
    private trackOrderListService: TrackOrderListService,
    public dialog: MatDialog,
    private loaderservice: LoaderService, private purchaseOrderListService: PurchaseOrderListService, private route: ActivatedRoute) { }
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  public invoiceList = new FormGroup({
    POrealNumber: new FormControl(''),
    InvoiceNumber: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    Plant: new FormControl(''),
    Vendor: new FormControl('')
    // paymentMethod: new FormControl('', Validators.required),
    // paymentStatus: new FormControl('', Validators.required),
    // Topicker: new FormControl('', Validators.required)
  })
  public hasError = (controlName: string, errorName: string) => {
    return this.paymentList.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
    this.disableoff = false;
    // this.ENDUSERStatus="P";
    // this.ManagerStatus="M";
    this.getmessageStatus();
    this.route.queryParams.subscribe(params => {
      var data = atob(params.key)
      var data1 = JSON.parse(data)
      // console.log("Params=======> ", data1); // { order: "popular" }
      if (data1.emailId != null && data1.emailId != "" && data1.page == "invoice") {
        this.loaderservice.show();

        this.navigatetointernalportal(data1.emailId)
      }

      this.message = params.order;
      console.log("message===========>", this.message); // popular
    });


    $("body").on("click", ".status-link", function () {
      $('.inv-wrapper.active').removeClass('active');
      $(this).parent().addClass('active');
    });
    // this.pgNolist.length=0;
    this.getstatus();
    this.getinvoicedetailsbasedonemailid('1')

  }

  // trackPayment(){
  //   if(this.paymentList.status == 'VALID'){
  //   this.router.navigate(['/track-payment']);
  //   }
  // }

  // showSubmitBox(ev) {
  //   this.confirmationNoAction = true;
  // }
  // showPopup(ev) {
  //   $("#popup2").css("visibility", "visible");
  //   $("#popup2").css("opacity", "1");
  // }
  // closePopup(ev) {
  //   $("#popup2").css("visibility", "hidden");
  //   $("#popup2").css("opacity", "0");
  // }

  // ShowpopupMessage(ev) {
  //   $("#popupMessage").css("visibility", "visible");
  //   $("#popupMessage").css("opacity", "1");
  // //  (<any> $("#popupComment").modal('show'));
  // }
  // ClosepopupMessage(ev) {
  //   $("#popupMessage").css("visibility", "hidden");
  //   $("#popupMessage").css("opacity", "0");
  // }

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


  receivedMessageHandler(p) {
    this.msgOnButtonClick = p;
    console.log("uyguyggyygugyj", this.msgOnButtonClick);
  }

  getinvoicedetailsbasedonemailid(pageno) {
    // this.loaderservice.show();
    this.delteindexes = [];
    this.emailid = sessionStorage.getItem("username");
    this.specificemailid = this.emailid;
    this.disableprevious = true;
    this.internalportalservice.getinvoicedetailsbasedonemailid(this.emailid, pageno, this.currstatus, 'NA', 'NA', 'NA', 'NA', 'NA', 'NA').subscribe(res => {
      //console.log("res is here ==>"+res[0].message);
      if (res[0].storekeeper == 'true') {
        this.storekeeper = true;
        sessionStorage.setItem('storekeeper', "true");
      } else {
        sessionStorage.setItem('storekeeper', "false");
        this.storekeeper = false;
      }
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
        //  if(this.pgNolist.length==0)
        //  {
          
        this.statusTemplate = 'This is line one  &#13;&#10; This is line 2\r\nAnd here is 3';

        this.pendinginvList = [];
        this.invoicedetailsList = res[0].invoicedetails;
        // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
        // if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null) {
        //   this.pendingPo = this.invoiceCountAsPerStatus.M;
        // } else if (this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null) {
        //   this.pendingPo = this.invoiceCountAsPerStatus.P;
        // } else if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null) {
        //   this.pendingPo = 0;
        // } else {
        //   this.pendingPo = Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
        // }
        console.log(this.invoicedetailsList, ' this.invoicedetailsList')

        // for (let b = 0; b < this.invoicedetailsList.length; b++) {
        //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
        //     if (this.invoicedetailsList[b].STATUS == 'M') {
        //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
        //         // this.invoicedetailsList.splice(b, 1);
        //         this.delteindexes.push(b);
        //         this.spliceCount = this.spliceCount + 1;
        //       }
        //     }
        //   }
        // }
        // for (let o = 0; o < this.delteindexes.length; o++) {
        //   this.invoicedetailsList.splice(this.delteindexes[o], 1);

        // }
        // for (let b = 0; b < this.invoicedetailsList.length; b++) {
        //   console.log("this.invoicedetailsList 1"+this.invoicedetailsList[b].INVOICENUMBER);
        //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
        //     if (this.invoicedetailsList[b].STATUS == 'M') {
        //       if(this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')){
        //         this.invoicedetailsList.splice(b, 1);
        //         this.spliceCount = this.spliceCount + 1;
        //         console.log("this.invoicedetailsList  2"+this.invoicedetailsList[b].INVOICENUMBER);
        //       }
        //     }
        //   }
        //   console.log("this.invoicedetailsList 3"+this.invoicedetailsList[b].INVOICENUMBER);
        // }
        this.pendingPo = this.pendingPo - this.spliceCount;
        for (let i = 0; i < this.invoicedetailsList.length; i++) {
          this.invoicedetailsList[i].TOTALAMOUNT = Number(this.invoicedetailsList[i].TOTALAMOUNT)
          // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          if (this.invoicedetailsList[i].PAYMENTAMOUNT != null) {
            this.invoicedetailsList[i].PAYMENTAMOUNT = Number(this.invoicedetailsList[i].PAYMENTAMOUNT)
          }
          if (this.invoicedetailsList[i].OVERALLSTATUS == 'P' || this.invoicedetailsList[i].OVERALLSTATUS == 'M') {
            if (this.invoicedetailsList[i].STATUS == 'CM') {
              this.ENDUSERStatus[i] = 'P';
            } else if (this.invoicedetailsList[i].STATUS == 'CO') {
              this.ENDUSERStatus[i] = 'O';
            } else if (this.invoicedetailsList[i].STATUS == 'CA') {
              this.ENDUSERStatus[i] = 'A';
            }
            else {
              this.ENDUSERStatus[i] = this.invoicedetailsList[i].ENDUSERSTATUS;
            }
            if (this.invoicedetailsList[i].ENDUSERSTATUS == 'A') {
              if (this.invoicedetailsList[i].OVERALLSTATUS == 'PRO' ||
                this.invoicedetailsList[i].OVERALLSTATUS == 'PP' ||
                this.invoicedetailsList[i].OVERALLSTATUS == 'PD') {
                this.ManagerStatus[i] = 'A';

              }
              else {
                //  this.ManagerStatus[i] = this.invoicedetailsList[i].STATUS;
                // if (this.invoicedetailsList[i].STATUS == 'CA') {
                //   this.ManagerStatus[i] = this.invoicedetailsList[i].OVERALLSTATUS;
                // }
                // else if (this.invoicedetailsList[i].STATUS == 'CO' || this.invoicedetailsList[i].STATUS == 'CM') {
                //   this.ManagerStatus[i] = 'P';
                // }
                // else {
                //   this.ManagerStatus[i] = this.invoicedetailsList[i].STATUS;
                // }
                if (this.invoicedetailsList[i].STATUS == 'CA') {
                  if (this.invoicedetailsList[i].OVERALLSTATUS == 'M' || this.invoicedetailsList[i].OVERALLSTATUS == 'O') {
                    this.ManagerStatus[i] = 'P';
                  } else {
                    this.ManagerStatus[i] = this.invoicedetailsList[i].OVERALLSTATUS;
                  }
                }
                else if (this.invoicedetailsList[i].STATUS == 'CO' || this.invoicedetailsList[i].STATUS == 'CM') {
                  this.ManagerStatus[i] = 'P';
                } else if (this.invoicedetailsList[i].STATUS == 'M' || (this.invoicedetailsList[i].STATUS == 'O'
                  && sessionStorage.getItem('username') == this.invoicedetailsList[i].ENDUSERID)) {
                  this.ManagerStatus[i] = 'P';
                }
                else {
                  this.ManagerStatus[i] = this.invoicedetailsList[i].STATUS;
                }
                console.log("this.ManagerStatus[i]---", [i], this.ManagerStatus[i])

              }

            }
          }

        }
        this.totalItems = res[0].invoicedetailsrecords
        this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
        if (Number(res[0].invoicedetailsrecords) / this.internalpaginationpagenumber <= this.pageSize) {
          this.disablenext = true;
          // invoicelistpages
        }
        else {
          this.disablenext = false;
        }

        this.getUserData()

        this.invoiceList.reset();
        this.loaderservice.hide();
      }
      else {
        this.loaderservice.hide();
      }
    }); err => {
      this.loaderservice.hide();
    }
  }

  getUserData() {
    console.log(" this.invoicedetailsList ==>", this.invoicedetailsList);

    setTimeout(() => {
      for (let a = 0; a < this.invoicedetailsList.length; a++) {
        // this.internalportalservice.getemailidsbasedonmaterial(this.invoicedetailsList[a].MATERIAL, this.invoicedetailsList[a].PLANT).subscribe(res => {
        // console.log(res[0].emailids, 'emailids--------------')
        // console.log(this.invoicedetailsList[a].MATERIAL, 'MATERIAL')
        // console.log(this.invoicedetailsList[a].PLANT, 'PLANT');

        // this.proxyusers = res[0].emailids;
        // console.log(this.proxyusers)
        if (this.invoicedetailsList[a].USERID != "") {
          var splitted = this.invoicedetailsList[a].USERID.split('_');
        }
        if (this.invoicedetailsList[a].EUMANAGER != "") {
          var splittedmanager = this.invoicedetailsList[a].EUMANAGER.split('_');
        }

        console.log("this.invoicedetailsList[a] ", this.invoicedetailsList[a]);
        console.log("splitted ", splitted);
        if (this.invoicedetailsList[a].STATUS == 'CM') {
          this.ENDUSERStatus[a] = 'P';
        } else if (this.invoicedetailsList[a].STATUS == 'CO') {
          this.ENDUSERStatus[a] = 'O';
        } else if (this.invoicedetailsList[a].STATUS == 'CA') {
          this.ENDUSERStatus[a] = 'A';
        }
        else {
          this.ENDUSERStatus[a] = this.invoicedetailsList[a].ENDUSERSTATUS;
        }
        // if (this.invoicedetailsList[a].STATUS == 'CA') {
        //   this.ManagerStatus[a] = 'A'
        // }
        // else if (this.invoicedetailsList[a].STATUS == 'CO') {
        //   this.ManagerStatus[a] = 'O'
        // }
        // else {
        //   this.ManagerStatus[a] = this.invoicedetailsList[a].STATUS;
        // }

        if (this.invoicedetailsList[a].STATUS == 'CA') {
          if (this.invoicedetailsList[a].OVERALLSTATUS == 'M' || this.invoicedetailsList[a].OVERALLSTATUS == 'O') {
            this.ManagerStatus[a] = 'P';
          } else {
            this.ManagerStatus[a] = this.invoicedetailsList[a].OVERALLSTATUS;
          }
        }
        else if (this.invoicedetailsList[a].STATUS == 'CO' || this.invoicedetailsList[a].STATUS == 'CM') {
          this.ManagerStatus[a] = 'P';
        } else if (this.invoicedetailsList[a].STATUS == 'M' || (this.invoicedetailsList[a].STATUS == 'O'
          && sessionStorage.getItem('username') == this.invoicedetailsList[a].ENDUSERID)) {
          this.ManagerStatus[a] = 'P';
        }
        else {
          this.ManagerStatus[a] = this.invoicedetailsList[a].STATUS;
        }
        console.log("this.ManagerStatus[i]", this.ManagerStatus[a])


        if ((this.invoicedetailsList[a].GRNNUMBER != null && this.invoicedetailsList[a].CREDITADVICENO == null) ||
          (this.invoicedetailsList[a].GRNNUMBER != null && this.invoicedetailsList[a].CREDITADVICENO != null
            && this.invoicedetailsList[a].CREDITNOTENO != null)) {
          // var b = JSON.parse(this.invoicedetailsList[a].EUMANAGER);
          // console.log("this.invoicedetailsList[a].EUMANAGER"+b[0]);

          if (this.invoicedetailsList[a].ENDUSERID == this.specificemailid) {
            $('#SelManager' + a).attr('disabled', true);
            if (this.invoicedetailsList[a].OVERALLSTATUS != 'P' && this.invoicedetailsList[a].ENDUSERSTATUS != 'A') {
              $('#Seluser' + a).attr('disabled', true);
            }
          }
          else if (this.invoicedetailsList[a].EUMANAGER != "") {

            for (let b = 0; b < splittedmanager.length; b++) {
              if (this.specificemailid == splittedmanager[b]) {
                $('#Seluser' + a).attr('disabled', true);
              }
            }
            if (this.invoicedetailsList[a].ENDUSERSTATUS != 'A') {
              $('#SelManager' + a).attr('disabled', true);
            }
          }

          // else if (this.invoicedetailsList[a].EUMANAGER == this.specificemailid) {
          //   $('#Seluser' + a).attr('disabled', true);
          //   if (this.invoicedetailsList[a].ENDUSERSTATUS != 'A') {
          //     $('#SelManager' + a).attr('disabled', true);
          //   }
          // }
          else if (this.invoicedetailsList[a].ENDUSERID != this.specificemailid && this.invoicedetailsList[a].PROXY == 'X') {
            for (let b = 0; b < splitted.length; b++) {
              console.log(this.specificemailid, 'specificemailid')
              //console.log(this.proxyusers[b].Userid, 'this.proxyusers')
              if (this.specificemailid == splitted[b]) {
                $('#SelManager' + a).attr('disabled', true);
                if (this.invoicedetailsList[a].OVERALLSTATUS != 'P'
                  && this.invoicedetailsList[a].ENDUSERSTATUS != 'A') {
                  $('#Seluser' + a).attr('disabled', true);
                }
              }
            }
          }
          if (this.invoicedetailsList[a].ENDUSERSTATUS == 'A' || this.invoicedetailsList[a].ENDUSERSTATUS == 'R') {
            if (this.invoicedetailsList[a].STATUS == 'CM' || this.invoicedetailsList[a].STATUS == 'CO') {
              $('#Seluser' + a).attr('disabled', false);
              // $('#SelManager' + a).attr('disabled', true);

            } else {
              $('#Seluser' + a).attr('disabled', true);
            }
            // $('#showinvoice' +a).hide();
            // $('#showinvoiced' +a).hide();
          }
          if (this.invoicedetailsList[a].STATUS == 'A' || this.invoicedetailsList[a].OVERALLSTATUS == 'R'
            || this.invoicedetailsList[a].STATUS == 'CA') {
            $('#SelManager' + a).attr('disabled', true);
          }
        }
        else {
          if (this.invoicedetailsList[a].ENDUSERSTATUS == 'A') {
            if (this.invoicedetailsList[a].STATUS == 'CM' || this.invoicedetailsList[a].STATUS == 'CO') {
              $('#Seluser' + a).attr('disabled', false);
              // $('#SelManager' + a).attr('disabled', true);
            } else {
              $('#Seluser' + a).attr('disabled', true);
            }
          }
          $('#SelManager' + a).attr('disabled', true);
          // $('#Seluser' + a).attr('disabled', true);
        }
        // });



        // if(this.invoicedetailsList[a].STAGE =='3')
        // {
        //   $('#SelManager'+ a).attr('disabled', true);
        //   $('#Seluser'+ a).attr('disabled', true);
        // }

        this.loaderservice.hide();
      }


    }, 100);

    setTimeout(() => {

      for (var k = 0; k < this.invoicedetailsList.length; k++) {
        console.log("this.statusList.length " + this.statusList.length);
        if (this.statusList.length != 0) {

          for (var j = 0; j < this.statusList.length; j++) {
            // if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.invoiceData[k]['INVOICENUMBER']) {
            if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoicedetailsList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoicedetailsList[k]['PONUMBER']) {
              console.log("insise A--------------------------==============", this.invoicedetailsList[k]['INVOICENUMBER'])
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
    }, 500);




  }


  getinvoiceOverallStatus(indexVal) {
    this.internalportalservice.getoverallstatus(this.invoicedetailsList[indexVal].INVOICENUMBER).subscribe(res => {
      if (res[0].poData[0].STATUS == 'G' || res[0].poData[0].STATUS == 'R' || res[0].poData[0].OVERALLSTATUS == 'R') {
        $('#SelManager' + indexVal).attr('disabled', true);
        $('#Seluser' + indexVal).attr('disabled', true);
      }
      else if (res[0].poData[0].STATUS == 'O' || res[0].poData[0].STATUS == 'P') {
        $('#SelManager' + indexVal).attr('disabled', false);
      }
    });
  }

  updatestatus(event, type) {
    console.log(event.target.value);
    if (event.target.value == 'A') {
      this.enduserstatus = "Approved";
    }
    else if (event.target.value == 'P') {
      this.enduserstatus = "Pending";
    }
    else if (event.target.value == 'S') {
      this.enduserstatus = "Submitted";
    }
    else if (event.target.value == 'R') {
      this.enduserstatus = "Rejected";
    }
    // this.enduserstatus = "accepted";
    const dialogConfig1 = new MatDialogConfig();
    dialogConfig1.data = {
      message: 'Do you want to update your invoice status to ' + this.enduserstatus + ' ?',
      condition: this.enduserstatus,
      page: 'invoicesubmit',
    };
    const mydata1 = dialogConfig1.data;
    console.log("PopupComponent", mydata1);

    const dialogRef = this.dialog.open(PopupComponent, {
      panelClass: 'custom-modalbox',

      width: '400px',
      data: { datakey: dialogConfig1.data }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result2: ${result}`);
      let value1 = result;

      console.log('test value', value1);

      this.confirmationValue = result.return;
      // this.dialogBox.popUpOpen_callback_confirm('Are you sure you want to update the status to ' + this.enduserstatus, 'internalinvoicetracklist', 'success',
      //   (value) => {
      //     console.log("value is here ==>" + value);


    });
  }

  getstatus() {
    this.enduserstatuslist = [
      { id: 'P', status: 'Pending', value: 'P' },
      { id: 'A', status: 'Approved', value: 'A' },
      { id: 'O', status: 'On Hold', value: 'O' },
      // { id: 'V', status: 'Return To Vendor ', value: 'V' },
      // { id: 'R', status: 'Rejected', value: 'R' }

    ]
    this.managerstatuslist = [
      { status: 'Pending', value: 'P' },
      { status: 'Approved', value: 'A' },
      { status: 'On Hold', value: 'O' },
      // { status: 'Rejected', value: 'R' }

    ]
  }

  returnInvoice(inv, po, boid) {
    console.log("inv " + inv + "po " + po + "boid " + boid)
    this.enduserReturnArray = [];
    this.internalportalservice.getlistitemsforinvoicenumbers(inv, po).subscribe(res => {
      if (res[0].message == "Success") {

        this.invoicedataofinvoice = res[0].poData;
        for (let i = 0; i < this.invoicedataofinvoice.length; i++) {
          if (inv == this.invoicedataofinvoice[i].INVOICENUMBER
            && po == this.invoicedataofinvoice[i].PO_NUMBER
            && boid == this.invoicedataofinvoice[i].BUSINESSPARTNEROID) {

            this.enduserReturnmodel = new enduserReturnModel();
            this.enduserReturnmodel.bid = this.invoicedataofinvoice[i].BUSINESSPARTNEROID;
            this.enduserReturnmodel.invoicenumber = this.invoicedataofinvoice[i].INVOICENUMBER;
            this.enduserReturnmodel.lineitemnumber = this.invoicedataofinvoice[i].LINEITEMNUMBER;
            this.enduserReturnmodel.ponumber = this.invoicedataofinvoice[i].PO_NUMBER;
            this.enduserReturnmodel.quantity = this.invoicedataofinvoice[i].QUANTITY;
            this.enduserReturnmodel.status = "N"

            this.enduserReturnArray.push(this.enduserReturnmodel);
            break;
          }
        }
        console.log('this.enduserReturnArray', this.enduserReturnArray);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Do you want to return this invoice to vendor?',
          condition: 'return',
          page: 'internalinvoicetracklist'
        };
        const mydata = dialogConfig.data;
        console.log("PopupComponent", mydata);

        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: 'custom-modalbox',

          width: '400px',
          data: { datakey: dialogConfig.data }

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result2: ${result}`);
          let value1 = result;

          console.log('test value', value1);
          this.msgOnButtonClick = value1.messageString

          this.confirmationValue = result.return;
          if (this.confirmationValue == true) {

            this.internalportalservice.getEndUserReturn(this.enduserReturnArray).subscribe(res => {
              console.log(res);
              if (res[0].message == "Invoice returned successfully")
                this.sendConfirmation('N', "Invoice Returned - " + this.msgOnButtonClick, 'SubmitQuery', inv)
              // this.dialogBox.popUpOpen2('Invoice returned successfully', 'success', 'approval');
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: res[0].message,
                condition: 'success',
                page: 'information2'
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
                // this.router.navigate(['/internaltrackInvoiceList']);
                this.invoicedetailsList = [];
                this.ngOnInit();
              });
            })

          }
        })
      }
    });




  }

  enduserstatuslistcall(indexval, listarrayvalue, type, event, invNumber, ponum, boid) {
    console.log("listarrayvalue " + listarrayvalue);
    console.log("Seluser " + $("#Seluser" + indexval).val());
    if (listarrayvalue == 'V') {
      this.returnInvoice(invNumber, ponum, boid);
    }
    else {

      var index;
      this.uniquePONumber = ponum;
      this.uniqueInvNumber = invNumber;
      this.invoicedetailsList.findIndex(function (entry, i) {
        if (entry.INVOICENUMBER == invNumber && entry.PONUMBER == ponum) {

          index = i;
          return true;
        }
      });
      console.log(index, "----------index-----------")
      console.log("this.invoicedetails", this.invoicedetailsList)
      //indexVal=index;

      this.selectedIndex = index;
      if (listarrayvalue == 'R') {
        this.selectedStatusVal = "Rejected"
      }
      else if (listarrayvalue == 'A') {

        this.selectedStatusVal = "Approved"
      }
      else if (listarrayvalue == 'P') {
        this.selectedStatusVal = "Pending"
      }
      else if (listarrayvalue == 'O') {
        this.selectedStatusVal = "On Hold"
        console.log("type ==> " + type);
        if (type == 'user') {
          if (this.invoicedetailsList[index].STATUS == 'CM') {
            $("#Seluser" + index).val('O')
          } else {
            $("#Seluser" + index).val(this.invoicedetailsList[index].ENDUSERSTATUS)
            return;
          }
        }

      }
      else if (listarrayvalue == 'M') {
        this.selectedStatusVal = "Pending"
      }
      if (type == 'user') {

        //   this.internalportalservice.getMultipleManagerList(invNumber, ponum).subscribe(res => {
        //     if (res[0].invoiceData.length > 0) {
        //       this.customManagerList = res[0].invoiceData;
        // }
        // })
        console.log(event.target.value, "target Value");
        console.log("index user" + index);
        console.log("listarrayvalue" + listarrayvalue);
        this.ENDUSERStatus[index] = listarrayvalue;
        console.log("this.invoicedetailsList[index].EUMANAGER " + this.invoicedetailsList[index].EUMANAGER);
        if ((this.invoicedetailsList[index].EUMANAGER == null || this.invoicedetailsList[index].EUMANAGER == ''
          || this.invoicedetailsList[index].EUMANAGER == '[null]' || this.invoicedetailsList[index].EUMANAGER == 'null')
          && listarrayvalue == 'A') {
          // this.dialogBox.popUpOpen2('Please select Approver', 'success', 'invoicesubmit')
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'Please select Approver',
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
          // $("#Seluser" + index).val(this.invoicedetailsList[index].ENDUSERSTATUS)
          if (this.invoicedetailsList[index].STATUS == 'CA') {
            if (this.invoicedetailsList[index].OVERALLSTATUS == 'M' || this.invoicedetailsList[index].OVERALLSTATUS == 'O') {
              $("#SelManager" + index).val('P')

            } else {
              $("#SelManager" + index).val(this.invoicedetailsList[index].OVERALLSTATUS)
            }
          }
          else if (this.invoicedetailsList[index].STATUS == 'CO' || this.invoicedetailsList[index].STATUS == 'CM') {
            $("#SelManager" + index).val('P')
          }
          else if (this.invoicedetailsList[index].STATUS == 'M' || (this.invoicedetailsList[index].STATUS == 'O'
            && sessionStorage.getItem('username') == this.invoicedetailsList[index].ENDUSERID)) {
            $("#SelManager" + index).val('P')
          }
          else {
            $("#SelManager" + index).val(this.invoicedetailsList[index].STATUS)
          }
          // $("#SelManager" + index).val(this.invoicedetailsList[index].STATUS)
          return false;
        }


        const dialogConfig1 = new MatDialogConfig();
        dialogConfig1.data = {
          message: 'Do you want to update your invoice status to ' + this.selectedStatusVal + ' ?',
          condition: this.selectedStatusVal,
          page: 'invoicesubmit',
        };
        const mydata1 = dialogConfig1.data;
        console.log("PopupComponent", mydata1);

        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: 'custom-modalbox',

          width: '400px',
          data: { datakey: dialogConfig1.data }

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result2: ${result}`);
          let value1 = result;

          console.log('test value', value1);
          this.msgOnButtonClick = value1.messageString
          this.confirmationValue = result.return;
          if (this.confirmationValue == true) {
            // debugger;
            this.updateUserStatus(event.target.value, index)

            if (this.selectedStatusVal == "On Hold" || this.selectedStatusVal == "Rejected" || this.selectedStatusVal == "Approved") {

              this.internalInvoiceStatusSubmit('N', this.selectedStatusVal + " - " + this.msgOnButtonClick, 'SubmitQuery', invNumber)
            }
          }
          else {
            $("#Seluser" + index).val('P')
            console.log("this.invoicedetailsList[index].STATUS--------", this.invoicedetailsList[index].STATUS)
            if (this.invoicedetailsList[index].STATUS == 'CA') {
              if (this.invoicedetailsList[index].OVERALLSTATUS == 'M' || this.invoicedetailsList[index].OVERALLSTATUS == 'O') {
                $("#SelManager" + index).val('P')
              } else {
                $("#SelManager" + index).val(this.invoicedetailsList[index].OVERALLSTATUS)
              }
            }
            else if (this.invoicedetailsList[index].STATUS == 'CO' || this.invoicedetailsList[index].STATUS == 'CM') {
              $("#SelManager" + index).val('P')
            } else if (this.invoicedetailsList[index].STATUS == 'M' || (this.invoicedetailsList[index].STATUS == 'O'
              && sessionStorage.getItem('username') == this.invoicedetailsList[index].ENDUSERID)) {
              $("#SelManager" + index).val('P')
            }
            else {
              $("#SelManager" + index).val(this.invoicedetailsList[index].STATUS)
            }
          }
        });


      }
      else if (type == 'manager') {
        console.log("index manager" + index);
        console.log("listarrayvalue" + listarrayvalue);
        this.ManagerStatus[index] = listarrayvalue;

        const dialogConfig1 = new MatDialogConfig();
        dialogConfig1.data = {
          message: 'Do you want to update your invoice status to ' + this.selectedStatusVal + ' ?',
          condition: this.selectedStatusVal,
          page: 'invoicesubmit',
        };
        const mydata1 = dialogConfig1.data;
        console.log("PopupComponent", mydata1);

        const dialogRef = this.dialog.open(PopupComponent, {
          panelClass: 'custom-modalbox',

          width: '400px',
          data: { datakey: dialogConfig1.data }

        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result2: ${result}`);
          let value1 = result;

          console.log('test value', value1);
          this.msgOnButtonClick = value1.messageString
          this.confirmationValue = result.return;
          // this.dialogBox.popUpOpen_callback_confirm('Do you want to update your invoice status to ' + this.selectedStatusVal + ' ?', '1', 'confirm',
          //   (value) => {
          //     this.confirmationValue = value;
          //     console.log("value is here ==>" + value);
          if (this.confirmationValue == true) {
            this.updateManagerStatus(event.target.value, index);
            if (this.selectedStatusVal == "On Hold" || this.selectedStatusVal == "Rejected" || this.selectedStatusVal == "Approved") {
              // commented on 9-march-22
              this.internalInvoiceStatusSubmit('N', this.selectedStatusVal + " - " + this.msgOnButtonClick, 'SubmitQuery', invNumber)
            }
          }
          else {

            $("#Seluser" + index).val(this.invoicedetailsList[index].ENDUSERSTATUS)
            console.log("this.invoicedetailsList[index].STATUS--------", this.invoicedetailsList[index].STATUS)
            if (this.invoicedetailsList[index].STATUS == 'CA') {
              if (this.invoicedetailsList[index].OVERALLSTATUS == 'M' || this.invoicedetailsList[index].OVERALLSTATUS == 'O') {
                $("#SelManager" + index).val('P')
              } else {
                $("#SelManager" + index).val(this.invoicedetailsList[index].OVERALLSTATUS)
              }
            }
            else if (this.invoicedetailsList[index].STATUS == 'CO' || this.invoicedetailsList[index].STATUS == 'CM') {
              $("#SelManager" + index).val('P')
            } else if (this.invoicedetailsList[index].STATUS == 'M' || (this.invoicedetailsList[index].STATUS == 'O'
              && sessionStorage.getItem('username') == this.invoicedetailsList[index].ENDUSERID)) {
              $("#SelManager" + index).val('P')
            }
            else {
              $("#SelManager" + index).val(this.invoicedetailsList[index].STATUS)
            }
            // $("#SelManager" + index).val(this.invoicedetailsList[index].STATUS)
          }
        });
      }

    }

  }

  // keyPressAlphanumeric(n) {
  //   //var regex = new RegExp("^[a-zA-Z0-9 ]+$");
  //   var regex = new RegExp("^[0-9A-Za-z\s\-]+$");
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
        this.maxdate = new Date(this.invoiceList.controls['toDate'].value);
      }
    }
    // this.maxdate = new Date(this.invoiceList.controls['toDate'].value);

  }

  updateUserStatus(targetvalue, indexValue) {
    if (targetvalue != 'A') {
      this.endUserStage = 1
    }
    else {
      this.endUserStage = 2;

    }

    this.internalportalservice.updateEndUserApprovalStatus(this.invoicedetailsList[indexValue].INVOICENUMBER,
      this.invoicedetailsList[indexValue].PONUMBER, targetvalue, this.invoicedetailsList[indexValue].ENDUSERID, this.endUserStage, sessionStorage.getItem('storekeeper')).subscribe(res => {
        // ----------------- for uat start ----------------------------------------
        if (configData.headerDisplay == "prod") {
          if (res[0].message == "Success" && res[0].emailstatus == true) {
            // this.dialogBox.popUpOpen2('Invoice updated successfully', 'success', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Invoice updated successfully',
              condition: 'success',
              page: 'approval'
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

            ///('Status Updated Sucessfully')
            //this.getinvoicedetailsbasedonemailid()
            if (this.selectedPage != undefined)
              this.getinvoiceByPage(this.selectedPage)
            else
              this.getinvoiceByPage(1)
          }
          else if (res[0].message == "Success" && res[0].emailstatus == false) {
            // this.dialogBox.popUpOpen2('Invoice updated successfully', 'success', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Invoice updated successfully',
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

            ///('Status Updated Sucessfully')
            //this.getinvoicedetailsbasedonemailid()
            if (this.selectedPage != undefined)
              this.getinvoiceByPage(this.selectedPage)
            else
              this.getinvoiceByPage(1)
          }

          // ----------------- for uat end ----------------------------------------
        }
        // ----------------- for dev start ----------------------------------------
        if (configData.headerDisplay == "dev") {
          if (res[0].message == "Success" && res[0].emailstatus == true) {
            // this.dialogBox.popUpOpen2('Invoice updated successfully and email has been sent successfully', 'success', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Transaction updated successfully and email has been sent successfully',
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
              // this.router.navigate(['/internaltrackInvoiceList']);
            });

            if (this.selectedPage != undefined)
              this.getinvoiceByPage(this.selectedPage)
            else
              this.getinvoiceByPage(1)
          }
          else if (res[0].message == "Success" && res[0].emailstatus == false) {
            // this.dialogBox.popUpOpen2('Invoice updated successfully but email has not been sent', 'success', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Transaction updated successfully but email has not been sent.',
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
              // this.router.navigate(['/internaltrackInvoiceList']);
            });

            if (this.selectedPage != undefined)
              this.getinvoiceByPage(this.selectedPage)
            else
              this.getinvoiceByPage(1)
          }

          // ----------------- for dev end ----------------------------------------
        }
      });
  }

  getinvoiceByPage(event) {
    this.invoicedetailsList = [];
    this.delteindexes = [];
    this.internalportalservice.getinvoicedetailsbasedonemailid(this.emailid, event, this.currstatus, 'NA', 'NA', 'NA', 'NA', 'NA', 'NA').subscribe(res => {
      //console.log("res is here ==>"+res[0].message);
      this.invoicedetailsList = res[0].invoicedetails
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
      console.log(this.invoicedetailsList, ' this.invoicedetailsList')
      // for (let b = 0; b < this.invoicedetailsList.length; b++) {
      //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
      //     if (this.invoicedetailsList[b].STATUS == 'M') {
      //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
      //         this.invoicedetailsList.splice(b, 1);
      //         this.spliceCount = this.spliceCount + 1;
      //       }
      //     }
      //   }
      // }
      // for (let b = 0; b < this.invoicedetailsList.length; b++) {
      //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
      //     if (this.invoicedetailsList[b].STATUS == 'M') {
      //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
      //         //this.invoicedetailsList.splice(b, 1);
      //         this.delteindexes.push(b);
      //         this.spliceCount = this.spliceCount + 1;
      //       }
      //     }
      //   }
      // }
      // for (let o = 0; o < this.delteindexes.length; o++) {
      //   this.invoicedetailsList.splice(this.delteindexes[o], 1);

      // }
      console.log(" this.invoicedetailsList ==>", this.invoicedetailsList);
      this.totalItems = this.invoicedetailsList.length
      let pageNo = (event - 1) * this.pageSize;
      let Mpage = event * this.pageSize - 1;
      this.pgNolist = [];

      // if (event > 1) {

      for (var m = pageNo; m <= Mpage; m++) {
        this.pgNolist.push(this.invoicedetailsList[m]);
      }
      console.log(pageNo, "pageNo")
      console.log(Mpage, "Mpage")
      console.log("what is data here ??", this.pgNolist)
      let n = -1;
      setTimeout(() => {
        for (var a = pageNo; a <= Mpage; a++) {
          n++
          if (this.invoicedetailsList[a].STATUS == 'CM') {
            this.ENDUSERStatus[a] = 'P';
          } else if (this.invoicedetailsList[a].STATUS == 'CO') {
            this.ENDUSERStatus[a] = 'O';
          } else if (this.invoicedetailsList[a].STATUS == 'CA') {
            this.ENDUSERStatus[a] = 'A';
          }
          else {
            this.ENDUSERStatus[a] = this.invoicedetailsList[a].ENDUSERSTATUS;
          }
          // this.ENDUSERStatus[a] = this.invoicedetailsList[a].ENDUSERSTATUS;
          if (this.invoicedetailsList[a].STATUS == 'CA') {
            if (this.invoicedetailsList[a].OVERALLSTATUS == 'M' || this.invoicedetailsList[a].OVERALLSTATUS == 'O') {
              this.ManagerStatus[a] = 'P';
            } else {
              this.ManagerStatus[a] = this.invoicedetailsList[a].OVERALLSTATUS;
            }
          }
          else if (this.invoicedetailsList[a].STATUS == 'CO' || this.invoicedetailsList[a].STATUS == 'CM') {
            this.ManagerStatus[a] = 'P';
          } else if (this.invoicedetailsList[a].STATUS == 'M' || (this.invoicedetailsList[a].STATUS == 'O'
            && sessionStorage.getItem('username') == this.invoicedetailsList[a].ENDUSERID)) {
            this.ManagerStatus[a] = 'P';
          }
          else {
            this.ManagerStatus[a] = this.invoicedetailsList[a].STATUS;
          }

          // this.ManagerStatus[a] = this.invoicedetailsList[a].STATUS;
          $("#Seluser" + n).val(this.invoicedetailsList[a].ENDUSERSTATUS)
          if (this.invoicedetailsList[a].STATUS == 'CA') {
            if (this.invoicedetailsList[a].OVERALLSTATUS == 'M' || this.invoicedetailsList[a].OVERALLSTATUS == 'O') {
              $("#SelManager" + n).val("P")
            } else {
              $("#SelManager" + n).val(this.invoicedetailsList[a].OVERALLSTATUS)
            }

          }
          else if (this.invoicedetailsList[a].STATUS == 'CO' || this.invoicedetailsList[a].STATUS == 'CM') {
            // this.ManagerStatus[a] = 'P';
            $("#SelManager" + n).val("P")

          } else if (this.invoicedetailsList[a].STATUS == 'M' || (this.invoicedetailsList[a].STATUS == 'O'
            && sessionStorage.getItem('username') == this.invoicedetailsList[a].ENDUSERID)) {
            // this.ManagerStatus[a] = 'P';
            $("#SelManager" + n).val("P")
          }
          else {
            $("#SelManager" + n).val(this.invoicedetailsList[a].STATUS)
          }
          console.log("EnduserID", this.invoicedetailsList[a].ENDUSERID);
          if ((this.invoicedetailsList[a].GRNNUMBER != null && this.invoicedetailsList[a].CREDITADVICENO == null) ||
            (this.invoicedetailsList[a].GRNNUMBER != null && this.invoicedetailsList[a].CREDITADVICENO != null
              && this.invoicedetailsList[a].CREDITNOTENO != null)) {
            if (this.invoicedetailsList[a].EUMANAGER != "") {
              var splittedmanager = this.invoicedetailsList[a].EUMANAGER.split('_');
            }
            if (this.invoicedetailsList[a].ENDUSERID == this.specificemailid) {
              $('#SelManager' + n).attr('disabled', true);
              // if (this.invoicedetailsList[a].STATUS != 'M') {
              if (this.invoicedetailsList[a].OVERALLSTATUS != 'P' && this.invoicedetailsList[a].ENDUSERSTATUS != 'A') {
                $('#Seluser' + n).attr('disabled', true);
              }
            }

            else if (this.invoicedetailsList[a].EUMANAGER != "") {

              for (let b = 0; b < splittedmanager.length; b++) {
                if (this.specificemailid == splittedmanager[b]) {
                  $('#Seluser' + a).attr('disabled', true);
                }
              }
              if (this.invoicedetailsList[a].ENDUSERSTATUS != 'A') {
                $('#Seluser' + n).attr('disabled', true);
                $('#SelManager' + a).attr('disabled', true);
              }
            }

            // else if (this.invoicedetailsList[a].EUMANAGER == this.specificemailid) {
            //   console.log("a is here in else" + a);
            //   $('#Seluser' + n).attr('disabled', true);
            //   if (this.invoicedetailsList[a].ENDUSERSTATUS != 'A') {
            //     $('#Seluser' + n).attr('disabled', true);
            //     $('#SelManager' + n).attr('disabled', true);
            //   }
            // }
            if (this.invoicedetailsList[a].ENDUSERSTATUS == 'A' || this.invoicedetailsList[a].ENDUSERSTATUS == 'R') {
              $('#Seluser' + n).attr('disabled', true);
            }
            if (this.invoicedetailsList[a].STATUS == 'A' || this.invoicedetailsList[a].OVERALLSTATUS == 'R'
              || this.invoicedetailsList[a].STATUS == 'CA' || this.invoicedetailsList[a].STATUS == 'CM'
              || this.invoicedetailsList[a].STATUS == 'CO') {
              $('#SelManager' + n).attr('disabled', true);
            }
          }
          else {
            $('#SelManager' + n).attr('disabled', true);
            $('#Seluser' + n).attr('disabled', true);
          }

        }
      }, 1000);

    }, err => {
      this.loaderservice.hide();
    })

  }

  updateManagerStatus(targetvalue, indexValue) {
    this.internalportalservice.updateManagerApprovalStatus(this.invoicedetailsList[indexValue].INVOICENUMBER,
      this.invoicedetailsList[indexValue].PONUMBER, targetvalue, this.invoicedetailsList[indexValue].EUMANAGER, 2).subscribe(res => {
        if (configData.headerDisplay == "prod") {
          //  ---------------------------------for uat start --------------------------------------------

          if (res[0].message == "Success" && res[0].emailstatus == false) {
            // this.dialogBox.popUpOpen2('Invoice updated successfully', 'success', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Invoice updated successfully',
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
              this.router.navigate(['/internaltrackInvoiceList']);
            });

            if (this.selectedPage != undefined)
              this.getinvoiceByPage(this.selectedPage)
            else
              this.getinvoiceByPage(1)
            this.getinvoiceOverallStatus(indexValue);
          }
          else if (res[0].message == "Success" && res[0].emailstatus == true) {
            // this.dialogBox.popUpOpen2('Invoice updated successfully', 'success', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Invoice updated successfully',
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
              this.router.navigate(['/internaltrackInvoiceList']);
            });

            if (this.selectedPage != undefined)
              this.getinvoiceByPage(this.selectedPage)
            else
              this.getinvoiceByPage(1)
            this.getinvoiceOverallStatus(indexValue);
          }
          //  ---------------------------------for uat end --------------------------------------------
        }
        // ----------------------------------------for dev start ------------------------------------------
        if (configData.headerDisplay == "dev") {
          if (res[0].message == "Success" && res[0].emailstatus == false) {
            // this.dialogBox.popUpOpen2('Invoice updated successfully but email has not been sent.', 'success', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Transaction updated successfully but email has not been sent.',
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
              // this.router.navigate(['/internaltrackInvoiceList']);
            });

            if (this.selectedPage != undefined)
              this.getinvoiceByPage(this.selectedPage)
            else
              this.getinvoiceByPage(1)
            this.getinvoiceOverallStatus(indexValue);
          }
          else if (res[0].message == "Success" && res[0].emailstatus == true) {
            // this.dialogBox.popUpOpen2('Invoice updated successfully and email has been sent successfully.', 'success', 'invoicesubmit');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Transaction updated successfully and email has been sent successfully',
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
              // this.router.navigate(['/internaltrackInvoiceList']);
            });

            if (this.selectedPage != undefined)
              this.getinvoiceByPage(this.selectedPage)
            else
              this.getinvoiceByPage(1)
            this.getinvoiceOverallStatus(indexValue);
          }
          // -----------------------------------------for dev end -------------------------------------------
        }
      });
  }
  searchType(event, type) {
    if (event.target.checked) {
      this.currstatus = type;
    }
    else {
      this.currstatus = 'ALL';
    }
  }

  trackPayment(searchponumber, searchlineitemnumber, searchordernumber) {
    this.loaderservice.show();
    var emailid = sessionStorage.getItem("username");
    this.internalpaginationpagenumber = 1;
    if (this.currstatus == 'C') {
      this.currstatus = 'C'
    } else {
      this.currstatus = 'AS';
    }
    this.disableprevious = true;
    this.invoicenumberpresent = false;
    this.ponumberpresent = false;
    this.fromtodatepresent = false;
    if (this.invoiceList.controls['InvoiceNumber'].value) {
      this.invoicenumberpresent = true;
      this.innum = this.invoiceList.controls['InvoiceNumber'].value;
    }
    else {
      this.innum = 'NA';
    }
    if (this.invoiceList.controls['Plant'].value) {
      for (var b = 0; b < this.tempPlantList.length; b++) {
        console.log("this.tempPlantList[b].PLANTNAME " + this.tempPlantList[b].PLANTNAME);
        if (this.tempPlantList[b].PLANTNAME == this.invoiceList.controls['Plant'].value.trim()) {
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

      this.vendorpresent = true;
      this.vendor = this.invoiceList.controls['Vendor'].value.trim();
    }
    else {
      this.vendor = 'NA';
    }
    if (this.invoiceList.controls['POrealNumber'].value) {
      this.ponumberpresent = true;
      this.ponum = this.invoiceList.controls['POrealNumber'].value;
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
    if (this.innum == 'NA' && this.ponum == 'NA' && this.fd == 'NA' && this.td == 'NA' && this.plant == 'NA' && this.vendor == 'NA' && this.currstatus != 'C') {
      this.currstatus = 'P'
    } else if (this.currstatus == 'C') {
      this.currstatus = 'C'
    }
    this.delteindexes = [];
    console.log("this.searchList.length " + this.searchList.length);
    this.internalportalservice.getinvoicedetailsbasedonemailid(this.emailid, this.internalpaginationpagenumber, this.currstatus, this.innum,
      this.ponum, this.fd, this.td, this.plant, this.vendor).subscribe(res => {
        let advanceSearcBox = document.getElementById("advanceSearcBox");
        let closeArrow = document.getElementById("closeArrow");
        let openArrow = document.getElementById("openArrow");
        advanceSearcBox.style.display = "none";
        openArrow.style.display = "block";
        closeArrow.style.display = "none";
        // this.invoiceList.reset();
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
          this.invoicedetailsList = res[0].invoicedetails;
          // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
          // if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null) {
          //   this.pendingPo = this.invoiceCountAsPerStatus.M;
          // } else if (this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null) {
          //   this.pendingPo = this.invoiceCountAsPerStatus.P;
          // } else if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null) {
          //   this.pendingPo = 0;
          // } else {
          //   this.pendingPo = Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
          // }
          console.log(this.invoicedetailsList, ' this.invoicedetailsList')
          // for (let b = 0; b < this.invoicedetailsList.length; b++) {
          //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
          //     if (this.invoicedetailsList[b].STATUS == 'M') {
          //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
          //         this.invoicedetailsList.splice(b, 1);
          //         this.spliceCount = this.spliceCount + 1;
          //       }
          //     }
          //   }
          // }
          // for (let b = 0; b < this.invoicedetailsList.length; b++) {
          //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
          //     if (this.invoicedetailsList[b].STATUS == 'M') {
          //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
          //         // this.invoicedetailsList.splice(b, 1);
          //         this.delteindexes.push(b);
          //         this.spliceCount = this.spliceCount + 1;
          //       }
          //     }
          //   }
          // }
          // for (let o = 0; o < this.delteindexes.length; o++) {
          //   this.invoicedetailsList.splice(this.delteindexes[o], 1);
  
          // }
          this.totalItems = res[0].invoicedetailsrecords;
          if (Number(res[0].invoicedetailsrecords) / this.internalpaginationpagenumber <= this.pageSize) {
            this.disablenext = true;
          }
          else {
            this.disablenext = false;
          }
        }
        else {
          this.invoicedetailsList = [];
          this.totalItems = 0;
        }
        setTimeout(() => {
          for (var b = 0; b < this.invoicedetailsList.length; b++) {
            if (this.invoicedetailsList[b].STATUS == 'CM') {
              this.ENDUSERStatus[b] = 'P';
            } else if (this.invoicedetailsList[b].STATUS == 'CO') {
              this.ENDUSERStatus[b] = 'O';
            } else if (this.invoicedetailsList[b].STATUS == 'CA') {
              this.ENDUSERStatus[b] = 'A';
            }
            else {
              this.ENDUSERStatus[b] = this.invoicedetailsList[b].ENDUSERSTATUS;
            }
            // this.ENDUSERStatus[b] = this.invoicedetailsList[b].ENDUSERSTATUS;
            // this.ManagerStatus[b] = this.invoicedetailsList[b].STATUS;
            // if (this.invoicedetailsList[b].STATUS == 'CA') {
            //   this.ManagerStatus[b] = 'A';
            // }
            // else if (this.invoicedetailsList[b].STATUS == 'CO') {
            //   this.ManagerStatus[b] = 'O';
            // }
            // else {
            //   this.ManagerStatus[b] = this.invoicedetailsList[b].STATUS;
            // }
            if (this.invoicedetailsList[b].STATUS == 'CA') {
              if (this.invoicedetailsList[b].OVERALLSTATUS == 'M' || this.invoicedetailsList[b].OVERALLSTATUS == 'O') {
                this.ManagerStatus[b] = 'P';
              } else {
                this.ManagerStatus[b] = this.invoicedetailsList[b].OVERALLSTATUS;
              }
            }
            else if (this.invoicedetailsList[b].STATUS == 'CO' || this.invoicedetailsList[b].STATUS == 'CM') {
              this.ManagerStatus[b] = 'P';
            } else if (this.invoicedetailsList[b].STATUS == 'M' || (this.invoicedetailsList[b].STATUS == 'O'
              && sessionStorage.getItem('username') == this.invoicedetailsList[b].ENDUSERID)) {
              this.ManagerStatus[b] = 'P';
            }
            else {
              this.ManagerStatus[b] = this.invoicedetailsList[b].STATUS;
            }

            if ((this.invoicedetailsList[b].GRNNUMBER != null && this.invoicedetailsList[b].CREDITADVICENO == null) ||
              (this.invoicedetailsList[b].GRNNUMBER != null && this.invoicedetailsList[b].CREDITADVICENO != null
                && this.invoicedetailsList[b].CREDITNOTENO != null)) {
              if (this.invoicedetailsList[b].EUMANAGER != "") {
                var splittedmanager = this.invoicedetailsList[b].EUMANAGER.split('_');
              }

              if (this.invoicedetailsList[b].ENDUSERID == this.specificemailid) {
                $('#SelManager' + b).attr('disabled', true);
                // if (this.invoicedetailsList[b].STATUS != 'M') {
                if (this.invoicedetailsList[b].OVERALLSTATUS != 'P' && this.invoicedetailsList[b].ENDUSERSTATUS != 'A') {
                  $('#Seluser' + b).attr('disabled', true);
                }
              }
              else if (this.invoicedetailsList[b].EUMANAGER != "") {

                for (let b = 0; b < splittedmanager.length; b++) {
                  if (this.specificemailid == splittedmanager[b]) {
                    $('#Seluser' + b).attr('disabled', true);
                  }
                }
                if (this.invoicedetailsList[b].ENDUSERSTATUS != 'A') {
                  $('#SelManager' + b).attr('disabled', true);
                }
              }
              // else if (this.invoicedetailsList[b].EUMANAGER == this.specificemailid) {
              //   console.log("a is here in else" + b);
              //   $('#Seluser' + b).attr('disabled', true);
              //   if (this.invoicedetailsList[b].ENDUSERSTATUS != 'A') {
              //     $('#SelManager' + b).attr('disabled', true);
              //   }
              // }
              if (this.invoicedetailsList[b].ENDUSERSTATUS == 'A' || this.invoicedetailsList[b].ENDUSERSTATUS == 'R') {
                $('#Seluser' + b).attr('disabled', true);
              }
              // debugger;
              if (this.invoicedetailsList[b].STATUS == 'A' || this.invoicedetailsList[b].OVERALLSTATUS == 'R'
                || this.invoicedetailsList[b].STATUS == 'CA' || this.invoicedetailsList[b].STATUS == 'CM'
                || this.invoicedetailsList[b].STATUS == 'CO') {
                $('#SelManager' + b).attr('disabled', true);
              }
            }
            else {
              $('#Seluser' + b).attr('disabled', true);
              $('#SelManager' + b).attr('disabled', true);
            }
          }
        }, 1000);

        setTimeout(() => {
          for (var k = 0; k < this.invoicedetailsList.length; k++) {
            for (var j = 0; j < this.statusList.length; j++) {
              if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoicedetailsList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoicedetailsList[k]['PONUMBER']) {

                $("#green" + k).addClass('displayBlock');
                $("#white" + k).addClass('displayNone');
              }
              else {
                $("#white" + k).addClass('displayBlock');
              }
            }
          }
        }, 300);
        this.loaderservice.hide();
      });



  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
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
      this.loaderservice.hide()

    }); err => {

      this.loaderservice.hide();
    }
  }
  // gettrackInvList(event) {
  //   this.loaderservice.show();
  //   // setTimeout(() => {
  //     // this.getInvoiceData();
  //     // this.getmessageStatus();
  //     // let pageNo=(event-1) *this.pageSize ;
  //     let pageNo = this.pageSize;
  //     let Mpage = event * this.pageSize - 1;
  //     this.pgNolist = [];
  //     if (event > 1) {
  //       for (var m = pageNo; m <= Mpage; m++) {
  //         this.pgNolist.push(this.invoicedetailsList[m]);
  //       }
  //       console.log(this.pgNolist,"this.pgNolist")
  //       // for (var k = 0; k < this.pgNolist.length; k++) {
  //       //   for (var j = 0; j < this.statusList.length; j++) {
  //       //     if (this.statusList.length != 0) {
  //       //       if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.pgNolist[k]['INVOICENUMBER']) {

  //       //         $("#green" + k).addClass('displayBlock');
  //       //         $("#white" + k).addClass('displayNone');
  //       //       }
  //       //       else {
  //       //         //$("#green" + k).addClass('displayNone');
  //       //         $("#white" + k).addClass('displayBlock');
  //       //       }
  //       //     }
  //       //     else {
  //       //       $("#white" + k).addClass('displayBlock');
  //       //     }
  //       //   }
  //       //   this.loaderservice.hide();
  //       // }
  //       this.getinvoicedetailsbasedonemailid()

  //       this.loaderservice.hide();
  //     }
  //     else if (event == 1) {
  //       // if (this.urlparamsvalues == true) {
  //         // console.log("in if ");
  //         // if(this.track)
  //         // {
  //         //   this.trackPayment();
  //         // }
  //         // this.trackPayment();
  //       // }
  //       // else {
  //       //   console.log("in else ");
  //       //   // this.getInvoiceData();
  //       // }
  //       this.getinvoicedetailsbasedonemailid()
  //       this.loaderservice.hide();
  //     }
  //   // }, 1000);

  // }

  gettrackInvList(action) {
    // this.loaderservice.show();
    this.selectedPage = event;
    console.log(event);
    if (action == 'PREV') {
      if (this.internalpaginationpagenumber != 1) {
        this.internalpaginationpagenumber = this.internalpaginationpagenumber - 1;
        if (this.internalpaginationpagenumber == 1) {
          this.disableprevious = true;
        }
        else {
          this.disableprevious = false;
        }
      }
      else {
        return;
      }

    }
    else if (action == 'NEXT') {
      this.internalpaginationpagenumber = this.internalpaginationpagenumber + 1;
      this.disableprevious = false;

    }
    else if (action == 'HOME') {
      this.internalpaginationpagenumber = 1;
      this.disableprevious = true;

    }
    else if (action == 'END') {

      this.internalpaginationpagenumber = this.endpagenumber;
      if (this.internalpaginationpagenumber == 1) {
        this.disableprevious = true;
      }
      else {
        this.disableprevious = false;
      }
    }
    if (this.currstatus == "AS") {
      this.internalportalservice.getinvoicedetailsbasedonemailid(this.emailid, this.internalpaginationpagenumber, this.currstatus, this.innum, this.ponum, this.fd, this.td, this.plant, this.vendor).subscribe(res => {
        //console.log("res is here ==>"+res[0].message);
        if (res[0].storekeeper == 'true') {
          this.storekeeper = true;
          sessionStorage.setItem('storekeeper', "true");
        } else {
          sessionStorage.setItem('storekeeper', "false");
          this.storekeeper = false;
        }
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
          //  if(this.pgNolist.length==0)
          //  {
          this.pendinginvList = [];
          this.delteindexes = [];
          this.invoicedetailsList = res[0].invoicedetails;
          // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
          // if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null) {
          //   this.pendingPo = this.invoiceCountAsPerStatus.M;
          // } else if (this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null) {
          //   this.pendingPo = this.invoiceCountAsPerStatus.P;
          // } else if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null) {
          //   this.pendingPo = 0;
          // } else {
          //   this.pendingPo = Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
          // }
          console.log(this.invoicedetailsList, ' this.invoicedetailsList')
          // for (let b = 0; b < this.invoicedetailsList.length; b++) {
          //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
          //     if (this.invoicedetailsList[b].STATUS == 'M') {
          //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
          //         this.invoicedetailsList.splice(b, 1);
          //         this.spliceCount = this.spliceCount + 1;
          //       }
          //     }
          //   }
          // }
          // for (let b = 0; b < this.invoicedetailsList.length; b++) {
          //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
          //     if (this.invoicedetailsList[b].STATUS == 'M') {
          //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
          //         // this.invoicedetailsList.splice(b, 1);
          //         this.delteindexes.push(b);
          //         this.spliceCount = this.spliceCount + 1;
          //       }
          //     }
          //   }
          // }
          // for (let o = 0; o < this.delteindexes.length; o++) {
          //   this.invoicedetailsList.splice(this.delteindexes[o], 1);
  
          // }
          console.log(this.invoicedetailsList, ' this.invoicedetailsList')
          for (let i = 0; i < this.invoicedetailsList.length; i++) {
            this.invoicedetailsList[i].TOTALAMOUNT = Number(this.invoicedetailsList[i].TOTALAMOUNT)
            // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
            if (this.invoicedetailsList[i].PAYMENTAMOUNT != null) {
              this.invoicedetailsList[i].PAYMENTAMOUNT = Number(this.invoicedetailsList[i].PAYMENTAMOUNT)
            }
            if (this.invoicedetailsList[i].OVERALLSTATUS == 'P' || this.invoicedetailsList[i].OVERALLSTATUS == 'M') {
              if (this.invoicedetailsList[i].STATUS == 'CM') {
                this.ENDUSERStatus[i] = 'P';
              } else if (this.invoicedetailsList[i].STATUS == 'CO') {
                this.ENDUSERStatus[i] = 'O';
              } else if (this.invoicedetailsList[i].STATUS == 'CA') {
                this.ENDUSERStatus[i] = 'A';
              }
              else {
                this.ENDUSERStatus[i] = this.invoicedetailsList[i].ENDUSERSTATUS;
              }
              // this.ENDUSERStatus[i] = this.invoicedetailsList[i].ENDUSERSTATUS;
              if (this.invoicedetailsList[i].ENDUSERSTATUS == 'A') {
                if (this.invoicedetailsList[i].OVERALLSTATUS == 'PRO' || this.invoicedetailsList[i].OVERALLSTATUS == 'PP' || this.invoicedetailsList[i].OVERALLSTATUS == 'PD') {
                  this.ManagerStatus[i] = 'A';

                }
                else {
                  //  this.ManagerStatus[i] = this.invoicedetailsList[i].STATUS;
                  // if (this.invoicedetailsList[i].STATUS == 'CA') {
                  //   this.ManagerStatus[i] = 'A';
                  // }
                  // else if (this.invoicedetailsList[i].STATUS == 'CO') {
                  //   this.ManagerStatus[i] = 'O';
                  // }
                  // else {
                  //   this.ManagerStatus[i] = this.invoicedetailsList[i].STATUS;
                  // }
                  if (this.invoicedetailsList[i].STATUS == 'CA') {
                    if (this.invoicedetailsList[i].OVERALLSTATUS == 'M' || this.invoicedetailsList[i].OVERALLSTATUS == 'O') {
                      this.ManagerStatus[i] = 'P';
                    } else {
                      this.ManagerStatus[i] = this.invoicedetailsList[i].OVERALLSTATUS;
                    }
                  }
                  else if (this.invoicedetailsList[i].STATUS == 'CO' || this.invoicedetailsList[i].STATUS == 'CM') {
                    this.ManagerStatus[i] = 'P';
                  } else if (this.invoicedetailsList[i].STATUS == 'M' || (this.invoicedetailsList[i].STATUS == 'O'
                    && sessionStorage.getItem('username') == this.invoicedetailsList[i].ENDUSERID)) {
                    this.ManagerStatus[i] = 'P';
                  }
                  else {
                    this.ManagerStatus[i] = this.invoicedetailsList[i].STATUS;
                  }

                }

              }

            }

          }
          this.totalItems = res[0].invoicedetailsrecords
          this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
          if (Number(res[0].invoicedetailsrecords) / this.internalpaginationpagenumber <= this.pageSize) {
            this.disablenext = true;
          }
          else {
            this.disablenext = false;
          }

          this.getUserData()

          this.invoiceList.reset();
          this.loaderservice.hide();
        }
        else {
          this.loaderservice.hide();
        }
      }); err => {
        this.loaderservice.hide();
      }

    }
    else {
      this.internalportalservice.getinvoicedetailsbasedonemailid(this.emailid, this.internalpaginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA', 'NA', 'NA').subscribe(res => {
        //console.log("res is here ==>"+res[0].message);
        if (res[0].storekeeper == 'true') {
          this.storekeeper = true;
          sessionStorage.setItem('storekeeper', "true");
        } else {
          sessionStorage.setItem('storekeeper', "false");
          this.storekeeper = false;
        }
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
          //  if(this.pgNolist.length==0)
          //  {
          this.pendinginvList = [];
          this.delteindexes = [];
          this.invoicedetailsList = res[0].invoicedetails;
          // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
          // if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null) {
          //   this.pendingPo = this.invoiceCountAsPerStatus.M;
          // } else if (this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null) {
          //   this.pendingPo = this.invoiceCountAsPerStatus.P;
          // } else if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null) {
          //   this.pendingPo = 0;
          // } else {
          //   this.pendingPo = Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
          // }
          console.log(this.invoicedetailsList, ' this.invoicedetailsList')
          // for (let b = 0; b < this.invoicedetailsList.length; b++) {
          //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
          //     if (this.invoicedetailsList[b].STATUS == 'M') {
          //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
          //         this.invoicedetailsList.splice(b, 1);
          //         this.spliceCount = this.spliceCount + 1;
          //       }
          //     }
          //   }
          // }
          // for (let b = 0; b < this.invoicedetailsList.length; b++) {
          //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
          //     if (this.invoicedetailsList[b].STATUS == 'M') {
          //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
          //         // this.invoicedetailsList.splice(b, 1);
          //         this.delteindexes.push(b);
          //         this.spliceCount = this.spliceCount + 1;
          //       }
          //     }
          //   }
          // }
          // for (let o = 0; o < this.delteindexes.length; o++) {
          //   this.invoicedetailsList.splice(this.delteindexes[o], 1);
  
          // }
          console.log(this.invoicedetailsList, ' this.invoicedetailsList')
          for (let i = 0; i < this.invoicedetailsList.length; i++) {
            this.invoicedetailsList[i].TOTALAMOUNT = Number(this.invoicedetailsList[i].TOTALAMOUNT)
            // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
            if (this.invoicedetailsList[i].PAYMENTAMOUNT != null) {
              this.invoicedetailsList[i].PAYMENTAMOUNT = Number(this.invoicedetailsList[i].PAYMENTAMOUNT)
            }
            if (this.invoicedetailsList[i].OVERALLSTATUS == 'P' || this.invoicedetailsList[i].OVERALLSTATUS == 'M') {
              if (this.invoicedetailsList[i].STATUS == 'CM') {
                this.ENDUSERStatus[i] = 'P';
              } else if (this.invoicedetailsList[i].STATUS == 'CO') {
                this.ENDUSERStatus[i] = 'O';
              } else if (this.invoicedetailsList[i].STATUS == 'CA') {
                this.ENDUSERStatus[i] = 'A';
              }
              else {
                this.ENDUSERStatus[i] = this.invoicedetailsList[i].ENDUSERSTATUS;
              }
              // this.ENDUSERStatus[i] = this.invoicedetailsList[i].ENDUSERSTATUS;
              if (this.invoicedetailsList[i].ENDUSERSTATUS == 'A' || this.invoicedetailsList[i].ENDUSERSTATUS == 'PP' || this.invoicedetailsList[i].ENDUSERSTATUS == 'PRO' || this.invoicedetailsList[i].ENDUSERSTATUS == 'PD') {
                // if (this.invoicedetailsList[i].STATUS == 'CA') {
                //   this.ManagerStatus[i] = 'A';
                // }
                // else if (this.invoicedetailsList[i].STATUS == 'CO') {
                //   this.ManagerStatus[i] = 'O';
                // }
                // else {
                //   this.ManagerStatus[i] = this.invoicedetailsList[i].STATUS;
                // }
                if (this.invoicedetailsList[i].STATUS == 'CA') {
                  if (this.invoicedetailsList[i].OVERALLSTATUS == 'M' || this.invoicedetailsList[i].OVERALLSTATUS == 'O') {
                    this.ManagerStatus[i] = 'P';
                  } else {
                    this.ManagerStatus[i] = this.invoicedetailsList[i].OVERALLSTATUS;
                  }
                }
                else if (this.invoicedetailsList[i].STATUS == 'CO' || this.invoicedetailsList[i].STATUS == 'CM') {
                  this.ManagerStatus[i] = 'P';
                } else if (this.invoicedetailsList[i].STATUS == 'M' || (this.invoicedetailsList[i].STATUS == 'O'
                  && sessionStorage.getItem('username') == this.invoicedetailsList[i].ENDUSERID)) {
                  this.ManagerStatus[i] = 'P';
                }
                else {
                  this.ManagerStatus[i] = this.invoicedetailsList[i].STATUS;
                }

              }

            }

          }
          this.totalItems = res[0].invoicedetailsrecords
          this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
          if (Number(res[0].invoicedetailsrecords) / this.internalpaginationpagenumber <= this.pageSize) {
            this.disablenext = true;
          }
          else {
            this.disablenext = false;
          }

          this.getUserData()

          this.invoiceList.reset();
          this.loaderservice.hide();
        }
        else {
          this.loaderservice.hide();
        }
      }); err => {
        this.loaderservice.hide();
      }
    }

    setTimeout(() => {
      // this.getInvoiceData();
      this.getmessageStatus();
      console.log(this.pageSize, 'pageSize')
      this.pgNolist = [];
      this.pgNolist = this.invoicedetailsList;
      console.log("what is data here ??", this.pgNolist)

      for (var a = 0; a < this.pgNolist.length; a++) {
        // this.getFilteredData(this.pgNolist[a].MATERIAL, this.pgNolist[a].PLANT, a)
        var splitted = this.pgNolist[a].USERID.split();
        if (this.invoicedetailsList[a].STATUS == 'CM') {
          this.ENDUSERStatus[a] = 'P';
        } else if (this.invoicedetailsList[a].STATUS == 'CO') {
          this.ENDUSERStatus[a] = 'O';
        } else if (this.invoicedetailsList[a].STATUS == 'CA') {
          this.ENDUSERStatus[a] = 'A';
        }
        else {
          this.ENDUSERStatus[a] = this.pgNolist[a].ENDUSERSTATUS;
        }
        // this.ENDUSERStatus[a] = this.pgNolist[a].ENDUSERSTATUS;
        if (this.pgNolist[a].ENDUSERSTATUS == 'A' || this.pgNolist[a].ENDUSERSTATUS == 'PD' || this.pgNolist[a].ENDUSERSTATUS == 'PRO' || this.pgNolist[a].ENDUSERSTATUS == 'PP') {
          // this.ManagerStatus[a] = this.pgNolist[a].STATUS;
          // if (this.pgNolist[a].STATUS == 'CA') {
          //   this.ManagerStatus[a] = 'A';
          // }
          // else if (this.pgNolist[a].STATUS == 'CO') {
          //   this.ManagerStatus[a] = 'O';
          // }
          // else {
          //   this.ManagerStatus[a] = this.pgNolist[a].STATUS;
          // }
          // if (this.pgNolist[a].STATUS == 'CA') {
          //   this.ManagerStatus[a] = this.pgNolist[a].OVERALLSTATUS;
          // }
          // else if (this.pgNolist[a].STATUS == 'CO' || this.pgNolist[a].STATUS == 'CM') {
          //   this.ManagerStatus[a] = 'P';
          // }else if (this.pgNolist[a].STATUS == 'M'){
          //   this.pgNolist[a].STATUS = 'P';
          // }
          // else {
          //   this.ManagerStatus[a] = this.pgNolist[a].STATUS;
          // }
          if (this.pgNolist[a].STATUS == 'CA') {
            if (this.pgNolist[a].OVERALLSTATUS == 'M' || this.pgNolist[a].OVERALLSTATUS == 'O') {
              this.ManagerStatus[a] = 'P';
            } else {
              this.ManagerStatus[a] = this.pgNolist[a].OVERALLSTATUS;
            }

          }
          else if (this.pgNolist[a].STATUS == 'CO' || this.pgNolist[a].STATUS == 'CM') {
            this.ManagerStatus[a] = 'P';
          } else if (this.pgNolist[a].STATUS == 'M' || (this.pgNolist[a].STATUS == 'O'
            && sessionStorage.getItem('username') == this.pgNolist[a].ENDUSERID)) {
            this.ManagerStatus[a] = 'P';
          }
          else {
            this.ManagerStatus[a] = this.pgNolist[a].STATUS;
          }

        }
        console.log("EnduserID", this.pgNolist[a].ENDUSERID);
        if ((this.pgNolist[a].GRNNUMBER != null && this.pgNolist[a].CREDITADVICENO == null) ||
          (this.pgNolist[a].GRNNUMBER != null && this.pgNolist[a].CREDITADVICENO != null
            && this.pgNolist[a].CREDITNOTENO != null)) {
          if (this.pgNolist[a].EUMANAGER != "") {
            var splittedmanager = this.pgNolist[a].EUMANAGER.split('_');
          }
          if (this.pgNolist[a].ENDUSERID == this.specificemailid) {
            $('#SelManager' + a).attr('disabled', true);
            // if (this.pgNolist[a].STATUS != 'M') {
            if (this.pgNolist[a].OVERALLSTATUS != 'P' && this.pgNolist[a].ENDUSERSTATUS != 'A') {
              $('#Seluser' + a).attr('disabled', true);
            }
          }
          // else if (this.pgNolist[a].EUMANAGER == this.specificemailid) {
          //   console.log("a is here in else" + a);
          //   $('#Seluser' + a).attr('disabled', true);
          //   if (this.pgNolist[a].ENDUSERSTATUS != 'A') {
          //     $('#SelManager' + a).attr('disabled', true);
          //   }
          // }
          else if (this.pgNolist[a].EUMANAGER != "") {

            for (let b = 0; b < splittedmanager.length; b++) {
              if (this.specificemailid == splittedmanager[b]) {
                $('#Seluser' + b).attr('disabled', true);
              }
            }
            if (this.pgNolist[a].ENDUSERSTATUS != 'A') {
              $('#SelManager' + a).attr('disabled', true);
            }
          }
          else if (this.invoicedetailsList[a].ENDUSERID != this.specificemailid && this.invoicedetailsList[a].PROXY == 'X') {

            for (let c = 0; c < splitted.length; c++) {
              console.log(this.specificemailid, 'specificemailid')
              // console.log(this.proxyusers[c].Userid, 'this.proxyusers')
              if (this.specificemailid == splitted[c]) {
                $('#SelManager' + a).attr('disabled', true);
                if (this.invoicedetailsList[a].STATUS != 'M') {
                  $('#Seluser' + a).attr('disabled', true);
                }
              }
            }
          }
          if (this.pgNolist[a].ENDUSERSTATUS == 'A' || this.pgNolist[a].ENDUSERSTATUS == 'R') {
            $('#Seluser' + a).attr('disabled', true);
          }
          if (this.pgNolist[a].STATUS == 'A' || this.pgNolist[a].OVERALLSTATUS == 'R'
            || this.pgNolist[a].STATUS == 'CA' || this.pgNolist[a].STATUS == 'CM'
            || this.pgNolist[a].STATUS == 'CO') {
            $('#SelManager' + a).attr('disabled', true);
          }
        }
        else {
          $('#Seluser' + a).attr('disabled', true);
          $('#SelManager' + a).attr('disabled', true);
        }



        for (var j = 0; j < this.statusList.length; j++) {
          if (this.statusList.length != 0) {
            if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.pgNolist[a]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.pgNolist[a]['PONUMBER']) {
              // console.log("green",);

              $("#green" + a).addClass('displayBlock');
              $("#white" + a).addClass('displayNone');
            }
            else {
              //$("#green" + k).addClass('displayNone');
              $("#white" + a).addClass('displayBlock');
            }
          }
          else {
            $("#white" + a).addClass('displayBlock');
          }
        }
        this.loaderservice.hide();
      }
      this.loaderservice.hide();


    }, 300);

  }

  getFilteredData(material, plant, a) {
    // this.internalportalservice.getemailidsbasedonmaterial(material, plant).subscribe(res => {

    //   console.log(res[0].emailids, 'emailids--------------')
    //   console.log(this.invoicedetailsList, 'invoice list ')
    //   // console.log(this.invoicedetailsList[b].MATERIAL,'MATERIAL')
    //   // console.log(this.invoicedetailsList[b].PLANT,'PLANT');

    //   this.proxyusers = res[0].emailids;
    //   console.log(this.proxyusers, 'proxy from paginate')

    // });
  }

  viewDetails(indexVal, invNumber, poNum, mailID, ACTIONBY) {
    // Write JavaScript code here
    var index;

    this.invoicedetailsList.findIndex(function (entry, i) {
      if (entry.INVOICENUMBER == invNumber && entry.PONUMBER == poNum) {
        index = i;
        return true;
      }
    });
    console.log(index, "----------index-----------")
    console.log("this.invoicedetails", this.invoicedetailsList)

    indexVal = index;
    for (var a = 0; a < this.invoicedetailsList.length; a++) {
      if (invNumber == this.invoicedetailsList[a].INVOICENUMBER
        && poNum == this.invoicedetailsList[a].PONUMBER) {
        var email = sessionStorage.getItem('username')
        if (this.invoicedetailsList[a].EUMANAGER != "") {
          var splittedmanager = this.invoicedetailsList[a].EUMANAGER.split('_');
        }
        this.man = false;
        for (let b = 0; b < splittedmanager.length; b++) {
          if (email == splittedmanager[b]) {
            this.usertype = "manager";
            this.man = true;
            break;
          }
        }
        if (this.man == false) {
          if (email == this.invoicedetailsList[a].ENDUSERID) {
            this.usertype = "enduser";
            break;
          }
          else {
            this.usertype = "storekeeper";
          }
        }


      }
    }
    if (this.invoicedetailsList[indexVal].ENDUSERID == mailID || this.invoicedetailsList[indexVal].PROXY == "X") {
      if (this.invoicedetailsList[indexVal].ENDUSERSTATUS == "A" || this.invoicedetailsList[indexVal].ENDUSERSTATUS == "R") {
        this.disableEndUser = true;
      }
      else if (this.invoicedetailsList[indexVal].ENDUSERSTATUS == "P" || this.invoicedetailsList[indexVal].ENDUSERSTATUS == "O") {
        this.disableEndUser = false;
      }
      this.typeID = "enduser"
    }
    if (this.invoicedetailsList[indexVal].EUMANAGER != "") {
      var splittedmanager = this.invoicedetailsList[indexVal].EUMANAGER.split('_');
    }
    for (let b = 0; b < splittedmanager.length; b++) {
      if (splittedmanager[b] == mailID) {
        this.disableEndUser = true;
        if (this.invoicedetailsList[indexVal].STATUS == "A" || this.invoicedetailsList[indexVal].STATUS == "R") {
          this.disableManger = true;
        }
        else if (this.invoicedetailsList[indexVal].STATUS == "A" || this.invoicedetailsList[indexVal].STATUS == "R" && this.invoicedetailsList[indexVal].STATUS == "M" || this.invoicedetailsList[indexVal].STATUS == "O") {
          this.disableManger = false;
        }
        else if (this.invoicedetailsList[indexVal].STATUS == "M" || this.invoicedetailsList[indexVal].ENDUSERSTATUS == "P") {
          this.disableManger = true;
        }
        this.typeID = "manager"
      }
    }

    console.log(ACTIONBY);
    // if (ACTIONBY == "ST") {
    //   ACTIONBY = "true"
    // } else {
    //   ACTIONBY = "false"
    // }
    console.log("this.invoicedetailsList[indexVal]", this.invoicedetailsList[indexVal])
    this.router.navigate(['/internaltrackinvoicewithPO'], {
      queryParams: {
        POnumber: btoa(poNum), INVNumber: btoa(invNumber),
        typeOfuser: btoa(this.typeID), disableEndUser: btoa(this.disableEndUser.toString()), disableManger: btoa(this.disableManger.toString()),
        enduserStatus: btoa(this.invoicedetailsList[indexVal].ENDUSERSTATUS), managerStatus: btoa(this.invoicedetailsList[indexVal].STATUS),
        overAllStatus: btoa(this.invoicedetailsList[indexVal].OVERALLSTATUS),
        managerID: btoa(this.invoicedetailsList[indexVal].EUMANAGER), stage: btoa(this.invoicedetailsList[indexVal].STAGE),
        storekeeper: btoa(ACTIONBY), plant: btoa(this.invoicedetailsList[indexVal].PLANT),
        usertype: btoa(this.usertype)
      }
    })

    this.trackOrderListService.getlistitemsforinvoicenumberininternal(invNumber, poNum).subscribe(res => {
      //console.log(res[0],'---------------------------------')
      if (res[0].message == "Success") {
      }
    });
  }


  sortdata(status) {
    // this.invoiceList.controls.POlineitemNumber.setValue(null);
    // this.invoiceList.controls.POOrderNumber.setValue(null);
    this.internalpaginationpagenumber = 1;
    this.disableprevious = true;
    this.invoiceList.controls.POrealNumber.setValue(null);
    this.invoiceList.controls.InvoiceNumber.setValue(null);
    this.ponum = 'NA';
    this.innum = 'NA';
    this.fd = 'NA';
    this.td = 'NA';
    this.plant = 'NA';
    this.vendor = 'NA';
    this.ENDUSERStatus = [];
    this.invoicedetailsList = [];
    this.filterwithoutpolist = [];
    this.onholdinvList = [];
    this.pendinginvList = [];
    this.managerpendinginvList = [];
    this.submittedinvList = []
    this.partiallypaidinvList = []
    this.acceptedinvList = []
    this.grninvList = []
    this.rejectedinvList = []
    this.allinvlist = []
    this.onholdinvList = []
    this.processedinvList = []
    this.paidinvList = [];
    this.returnedList = [];
    this.delteindexes = [];
    this.currstatus = status;
    // this.getInvoiceData();
    console.log("in here" + status)
    this.internalportalservice.getinvoicedetailsbasedonemailid(this.emailid, this.internalpaginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA', 'NA', 'NA').subscribe(res => {
      console.log("res is here ==>" + res[0].message);
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
        this.invoicedetailsList = res[0].invoicedetails;
        // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
        // if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null) {
        //   this.pendingPo = this.invoiceCountAsPerStatus.M;
        // } else if (this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null) {
        //   this.pendingPo = this.invoiceCountAsPerStatus.P;
        // } else if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null) {
        //   this.pendingPo = 0;
        // } else {
        //   this.pendingPo = Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
        // }
        console.log(this.invoicedetailsList, ' this.invoicedetailsList')
        // for (let b = 0; b < this.invoicedetailsList.length; b++) {
        //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
        //     if (this.invoicedetailsList[b].STATUS == 'M') {
        //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
        //         this.invoicedetailsList.splice(b, 1);
        //         this.spliceCount = this.spliceCount + 1;
        //       }
        //     }
        //   }
        // }
        // for (let b = 0; b < this.invoicedetailsList.length; b++) {
        //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
        //     if (this.invoicedetailsList[b].STATUS == 'M') {
        //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
        //         // this.invoicedetailsList.splice(b, 1);
        //         this.delteindexes.push(b);
        //         this.spliceCount = this.spliceCount + 1;
        //       }
        //     }
        //   }
        // }
        // for (let o = 0; o < this.delteindexes.length; o++) {
        //   this.invoicedetailsList.splice(this.delteindexes[o], 1);

        // }
        // this.searchList = res[0].invoicedetails;
        console.log("response====>", res)
        console.log("this.invoiceData ==>", this.invoicedetailsList);
        // this.totalItems = this.invoicedetailsList.length
        this.totalItems = res[0].invoicedetailsrecords;
        // console.log("PODEtails in details", this.poDetail)
        sessionStorage.setItem("InvoiceData", JSON.stringify(this.invoicedetailsList));

        for (var j = 0; j < this.invoicedetailsList.length; j++) {

          // this.ENDUSERStatus[j] = this.invoicedetailsList[j].ENDUSERSTATUS;
          if (this.invoicedetailsList[j].ENDUSERSTATUS == 'A') {
            if (this.invoicedetailsList[j].OVERALLSTATUS == 'PRO' ||
              this.invoicedetailsList[j].OVERALLSTATUS == 'PP' ||
              this.invoicedetailsList[j].OVERALLSTATUS == 'PD') {
              this.ManagerStatus[j] = 'A';

            }
            else {

              if (this.invoicedetailsList[j].STATUS == 'CA') {
                if (this.invoicedetailsList[j].OVERALLSTATUS == 'M' || this.invoicedetailsList[j].OVERALLSTATUS == 'O') {
                  this.ManagerStatus[j] = 'P';
                } else {
                  this.ManagerStatus[j] = this.invoicedetailsList[j].OVERALLSTATUS;
                }
              }
              else if (this.invoicedetailsList[j].STATUS == 'CO' || this.invoicedetailsList[j].STATUS == 'CM') {
                this.ManagerStatus[j] = 'P';
              } else if (this.invoicedetailsList[j].STATUS == 'M' || (this.invoicedetailsList[j].STATUS == 'O'
                && sessionStorage.getItem('username') == this.invoicedetailsList[j].ENDUSERID)) {
                this.ManagerStatus[j] = 'P';
              }
              else {
                this.ManagerStatus[j] = this.invoicedetailsList[j].STATUS;
              }

            }

          }
          else {
            console.log("in inini");
            this.ManagerStatus[j] = 'P';
          }
        }

        this.ENDUSERStatus = [];
        this.ManagerStatus = [];
        console.log(this.invoicedetailsList, 'this.invoicedetailsList=========')
        setTimeout(() => {
          for (var m = 0; m < this.invoicedetailsList.length; m++) {
            // this.getSortedData(this.invoicedetailsList[m].MATERIAL, this.invoicedetailsList[m].PLANT, m)
            var splitted = this.invoicedetailsList[m].USERID.split('_');

            if (this.invoicedetailsList[m].STATUS == 'CM') {
              this.ENDUSERStatus[m] = 'P';
            } else if (this.invoicedetailsList[m].STATUS == 'CO') {
              this.ENDUSERStatus[m] = 'O';
            } else if (this.invoicedetailsList[m].STATUS == 'CA') {
              this.ENDUSERStatus[m] = 'A';
            }
            else {
              this.ENDUSERStatus[m] = this.invoicedetailsList[m].ENDUSERSTATUS;
            }
            // this.ENDUSERStatus[m] = this.invoicedetailsList[m].ENDUSERSTATUS;
            if (this.invoicedetailsList[m].ENDUSERSTATUS == 'A') {
              if (this.invoicedetailsList[m].OVERALLSTATUS == 'PRO'
                || this.invoicedetailsList[m].OVERALLSTATUS == 'PP'
                || this.invoicedetailsList[m].OVERALLSTATUS == 'PD') {
                this.ManagerStatus[m] = 'A';

              }
              else {
                //  this.ManagerStatus[m] = this.invoicedetailsList[m].STATUS;
                // if (this.invoicedetailsList[m].STATUS == 'CA') {
                //   this.ManagerStatus[m] = this.invoicedetailsList[m].OVERALLSTATUS;
                // }
                // else if (this.invoicedetailsList[m].STATUS == 'CO'  || this.invoicedetailsList[m].STATUS == 'CM') {
                //   this.ManagerStatus[m] = 'P';
                // }
                // else {
                //   this.ManagerStatus[m] = this.invoicedetailsList[m].STATUS;
                // }
                if (this.invoicedetailsList[m].STATUS == 'CA') {
                  if (this.invoicedetailsList[m].OVERALLSTATUS == 'M' || this.invoicedetailsList[m].OVERALLSTATUS == 'O') {
                    this.ManagerStatus[m] = 'P';
                  } else {
                    this.ManagerStatus[m] = this.invoicedetailsList[m].OVERALLSTATUS;
                  }
                }
                else if (this.invoicedetailsList[m].STATUS == 'CO' || this.invoicedetailsList[m].STATUS == 'CM') {
                  this.ManagerStatus[m] = 'P';
                } else if (this.invoicedetailsList[m].STATUS == 'M' || (this.invoicedetailsList[m].STATUS == 'O'
                  && sessionStorage.getItem('username') == this.invoicedetailsList[m].ENDUSERID)) {
                  this.ManagerStatus[m] = 'P';
                }
                else {
                  this.ManagerStatus[m] = this.invoicedetailsList[m].STATUS;
                }

              }

            }
            else {
              // console.log("in inini");
              this.ManagerStatus[m] = 'P';
            }


            if ((this.invoicedetailsList[m].GRNNUMBER != null && this.invoicedetailsList[m].CREDITADVICENO == null) ||
              (this.invoicedetailsList[m].GRNNUMBER != null && this.invoicedetailsList[m].CREDITADVICENO != null
                && this.invoicedetailsList[m].CREDITNOTENO != null)) {
              if (this.invoicedetailsList[m].EUMANAGER != "") {
                var splitedmanager = this.invoicedetailsList[m].EUMANAGER.split('_');
              }
              if (this.invoicedetailsList[m].ENDUSERID == this.specificemailid) {
                $('#SelManager' + m).attr('disabled', true);
                //if (this.invoicedetailsList[m].STATUS != 'M') {

                if (this.invoicedetailsList[m].OVERALLSTATUS != 'P'
                  && this.invoicedetailsList[m].ENDUSERSTATUS != 'A'
                  && this.invoicedetailsList[m].ENDUSERSTATUS != 'O') {
                  $('#Seluser' + m).attr('disabled', true);
                }
              }
              if (this.invoicedetailsList[m].EUMANAGER != "") {
                for (var o = 0; o < splitedmanager.length; o++) {
                  if (splitedmanager[o] == this.specificemailid) {
                    console.log("a is here in else" + m);
                    $('#Seluser' + m).attr('disabled', true);
                    if (this.invoicedetailsList[m].ENDUSERSTATUS != 'A') {
                      $('#SelManager' + m).attr('disabled', true);
                    }
                  }
                }
              }

              if (this.invoicedetailsList[m].ENDUSERID != this.specificemailid && this.invoicedetailsList[m].PROXY == 'X') {

                for (let c = 0; c < splitted.length; c++) {
                  console.log(this.specificemailid, 'specificemailid')
                  //console.log(this.proxyusers[c].Userid, 'this.proxyusers')
                  if (this.specificemailid == splitted[c]) {
                    $('#SelManager' + m).attr('disabled', true);
                    if (this.invoicedetailsList[m].STATUS != 'M') {
                      $('#Seluser' + m).attr('disabled', true);
                    }
                  }
                }
              }
              if (this.invoicedetailsList[m].ENDUSERSTATUS == 'A' || this.invoicedetailsList[m].ENDUSERSTATUS == 'R') {
                if (this.invoicedetailsList[m].STATUS == 'CM' || this.invoicedetailsList[m].STATUS == 'CO') {
                  $('#Seluser' + m).attr('disabled', false);
                } else {
                  $('#Seluser' + m).attr('disabled', true);
                }
                // $('#Seluser' + m).attr('disabled', true);
              }
              if (this.invoicedetailsList[m].STATUS == 'A' || this.invoicedetailsList[m].STATUS == 'R' ||
                this.invoicedetailsList[m].OVERALLSTATUS == 'R'
                || this.invoicedetailsList[m].OVERALLSTATUS == 'V'
                || this.invoicedetailsList[m].STATUS == 'CA' || this.invoicedetailsList[m].STATUS == 'CM'
                || this.invoicedetailsList[m].STATUS == 'CO'
              ) {
                $('#SelManager' + m).attr('disabled', true);
              }
            }
            else {
              if (this.invoicedetailsList[m].ENDUSERSTATUS == 'A') {
                if (this.invoicedetailsList[m].STATUS == 'CM' || this.invoicedetailsList[m].STATUS == 'CO') {
                  $('#Seluser' + m).attr('disabled', false);
                } else {
                  $('#Seluser' + m).attr('disabled', true);
                }
              }

              $('#SelManager' + m).attr('disabled', true);
              // $('#SelManager' + m).attr('disabled', true);
              // $('#Seluser' + m).attr('disabled', true);
            }

          }
        }, 300);
        this.totalItems = res[0].invoicedetailsrecords;
        this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
        if (Number(res[0].invoicedetailsrecords) / this.internalpaginationpagenumber <= this.pageSize) {
          this.disablenext = true;
        }
        else {
          this.disablenext = false;
        }
        setTimeout(() => {
          console.log("this.invoicedetailsList.length  " + this.invoicedetailsList.length);
          console.log("this.statusList.length ", this.statusList);
          for (var k = 0; k < this.invoicedetailsList.length; k++) {
            for (var j = 0; j < this.statusList.length; j++) {
              if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoicedetailsList[k]['INVOICENUMBER']) {

                $("#green" + k).addClass('displayBlock');
                $("#white" + k).addClass('displayNone');
              }
              else {
                //$("#green" + k).addClass('displayNone');
                $("#white" + k).addClass('displayBlock');
              }
            }
          }
        }, 1000);

      }
      this.loaderservice.hide();
    });

    // }
    // else {
    //   this.invoicedetailsList = this.invoiceData;
    //   this.totalItems = this.invoiceData.length;
    // }
  }

  getSortedData(material, plant, m) {
    // this.internalportalservice.getemailidsbasedonmaterial(material, plant).subscribe(res => {

    //   console.log(res[0].emailids, 'emailids--------------')
    //   console.log(this.invoicedetailsList, 'invoice list ')
    //   // console.log(this.invoicedetailsList[b].MATERIAL,'MATERIAL')
    //   // console.log(this.invoicedetailsList[b].PLANT,'PLANT');

    //   this.proxyusers = res[0].emailids;
    //   console.log(this.proxyusers, 'proxy from sort')



    // });
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
      this.topic = invoicenumber
      if (res[0].poQueryList[0] != undefined) {
        this.messageList = res[0].poQueryList
      }
      // else {
      //   this.messageList = res[0].message
      // }
      console.log(this.messageList)
    })
  }

  download(savedfilename, singlepodownload, actualfilename) {
    if (savedfilename == "" || savedfilename == null || actualfilename == "" || actualfilename == null
      || savedfilename == undefined || actualfilename == undefined) {
      // this.dialogBox.popUpOpen2("File not present", 'success', 'purchaseorderlist');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'File not present',
        condition: 'success',
        page: 'purchaseoerderlist'
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
        this.router.navigate(['/internaltrackInvoiceList']);
      });
      return;
    }
    this.loaderservice.show();
    console.log(savedfilename);
    this.DecodedFile = [];
    this.trackOrderListService.getinternalfile(savedfilename, singlepodownload)
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
            var extensionName = filename.substr(filename.lastIndexOf('.') + 1)
            this.getFileType(extensionName);
            this.trackOrderListService.downloadEncryptedFile(data, this.extensionType);

          }
          this.loaderservice.hide();
        }
        else if (result[0].reason != 'none') {
          // this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
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
            this.router.navigate(['/internaltrackInvoiceList']);
          });
        }
        // else if (result[0].status == "Fail") {
        // 	this.dialogBox.popUpOpen2(result[0].message ,'success','purchaseorderlist');
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

  sendConfirmation(status, message, subject, topic) {
    // submitInternalInvoiceChat
    this.internalportalservice.submitInternalInvoiceChat("", this.uniquePONumber, this.uniqueInvNumber, status, message, subject, topic).subscribe(res => {
      // internalInvoiceStatusSubmit
      if (res[0].message == "Success") {
        //  this.getQuerry(topic,'')
        this.message = '';
        this.validate = true;
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

    })
  }


  internalInvoiceStatusSubmit(status, message, subject, topic) {
    this.internalportalservice.internalInvoiceStatusSubmit("", this.uniquePONumber, this.uniqueInvNumber, status, message, subject, topic).subscribe(res => {

      if (res[0].message == "Success") {
        //  this.getQuerry(topic,'')
        this.message = '';
        this.validate = true;
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

    })
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


  downloadinvoicelist() {
    this.invoicenumber = [];
    this.ponumber = [];
    this.loaderservice.show();

    this.trackOrderListService.downloadapprovalData(this.currstatus, this.ponum, this.innum, this.fd, this.td).subscribe(res => {

      // this.purchaseOrderListService.getpolistfile(this.downloaddatalist).subscribe(res => {
      // console.log(res[0].message)

      if (res[0].message == "Success") {
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
      else {
        this.loaderservice.hide();
        // this.dialogBox.popUpOpen2('Failed to download !!', 'error', 'trackinvoicelist');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Failed to download !!',
          condition: 'error',
          page: 'trackinvoicelist'
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
          // this.router.navigate(['/internaltrackInvoiceList']);
        });
        // this.toastr.error("Failed to download !!")
      }
      // });

    })
  }

  getPortalTypebasedonemail(userName) {
    this.loaderservice.show();
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
            this.router.navigate(['/internaltrackInvoiceList']).then(() => {
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
            // debugger;
            if ((res.body[0].mode == 'enduser')) {
              this.router.navigate(['/internaltrackInvoiceList']).then(() => {
                // , { queryParams: { orderNo: this.forinternal } }
                window.location.reload();
              });
            }
            else if (res.body[0].mode == 'internalbcclportal') {
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
            this.router.navigate(['/internaltrackInvoiceList']).then(() => {
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

  downloadPo(po_number, singlepodownload) {
    // this.loaderservice.show();
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
            var extensionName = filename.substr(filename.lastIndexOf('.') + 1)
            this.getFileType(extensionName);
            this.trackOrderListService.downloadEncryptedFile(data, this.extensionType);
          }
          this.loaderservice.hide();
        }
        else if (result[0].reason != 'none') {
          // this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: result[0].reason,
            condition: 'success',
            page: 'purchseorderlist'
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
            this.router.navigate(['/internaltrackInvoiceList']);
          });
        }
        // this.loaderservice.hide();
        // if (result[0].status == "Fail") {
        //   this.dialogBox.popUpOpen2(result[0].message ,'error','profiledata');
        //  }
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );

  }


  callDynamicData() {

    if (this.queryString != null && this.queryString != undefined && this.queryString != "") {
      //if(this.queryString.length > 3)
      //{
      this.getColleaguesData(this.queryString);

      //}
    }
  }

  getColleaguesData(searchString) {
    // $("#searchLoading").show();
    this.colleaguesDataList = [];
    this.internalportalservice.searchPeople(searchString,true,'NA','NA').subscribe(res => {
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
            this.colleaguesList[i].DESIGNATION = found[0].DESIGNATION;

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
            // console.log("tempColleages.email",tempColleages.email);
            //split the response which is format in email and seperate the . with space.
            //comment this line to show email directly.
            //var nameFromEmail = element.split('@')[0].replace('.', " ");
            //tempColleages.name = nameFromEmail;

            tempColleages.name = element['NAME'];
            tempColleages.designation = element['DESIGNATION']
            //assign name and email to colleagues model
            this.colleaguesDataList.push(tempColleages);
            if (this.queryString != null && this.queryString != undefined && this.queryString != "") {
              // this.onSearchKeyUp();
            }
          });
          console.log("this.colleaguesDataList", this.colleaguesDataList);
          this.colleaguesList = this.colleaguesDataList;
          $("#search").focus();
        }
        else {

          //   console.log('error in fetch data.');
        }

        // $("#searchLoading").hide();
      }
    }, err => {
      // $("#searchLoading").hide();
    });
  }


  addColleaguesToSuggestionList(e, item) {
    this.queryString = "";
    $(".addbtn").hide();
    console.log("item.email " + item.email);
    this.email = item.email;
    // if (this.selectedColleaguesList.length < 2) {
    //   this.selectedColleaguesList.push(item);
    //   console.log("selectedColleaguesList===============>", this.selectedColleaguesList)
    //   //to not delete if item is newly added.
    //   if (this.colleaguesDataList.indexOf(item) >= 0)
    //     this.colleaguesDataList.splice(this.colleaguesDataList.indexOf(item), 1);

    //   //clear the search list after adding fileds.
    //   this.colleaguesList = null;
    // }
    // else {
    //   //TODO: Open modal here for not more than 5 element.
    //   this.clearSearchData();
    //   this.dialogBox.popUpOpen2("You can not add more than five colleagues", 'leave', 'information2');

    // }
  }
  removeColleaguesFromSuggestionList() {
    // item.checked = true;
    this.email = null;
    // this.colleaguesDataList.push(item);
    // this.selectedColleaguesList.splice(this.selectedColleaguesList.indexOf(item), 1);
  }

  clearSearchData() {
    setTimeout(() => {
      this.colleaguesList = null;
    }, 200);

  }

  reassign(k, INVOICENUMBER,
    PONUMBER, specificemailid, ENDUSERStatus, ManagerStatus) {
    this.reassigninvoicenumber = INVOICENUMBER;
    this.reassignponumber = PONUMBER;
    this.reassignspecificemailid = specificemailid;
    this.reassignenduserstatus = ENDUSERStatus;
    this.reassignmanagerstatus = ManagerStatus;
    $("#popup2").css("visibility", "visible");
    $("#popup2").css("opacity", "1");

  }

  reassigninvoice() {
    console.log("this.reassigninvoicenumber" + this.reassigninvoicenumber)
    console.log(this.reassignponumber)
    // console.log(this.reassignspecificemailid)
    this.internalportalservice.reassignenduser(this.reassigninvoicenumber, this.reassignponumber, this.email)
      .subscribe(result => {
        console.log(result);
        if (result[0].message == "Success") {
          // this.dialogBox.popUpOpen2("Invoice has been reassigned from " + sessionStorage.getItem('username') + " to " + this.email, 'success', 'purchaseorderlist');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: "Invoice has been reassigned from " + sessionStorage.getItem('username') + " to " + this.email,
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
            this.router.navigate(['/internaltrackInvoiceList']);
          });
          this.email = null;
          this.getinvoicedetailsbasedonemailid(1);
          this.getmessageStatus();
        }
        $("#popup2").css("visibility", "hidden");
        $("#popup2").css("opacity", "0");
      });
  }
  getRefresh() {
    $('.inv-wrapper').removeClass('active');
    $('#stManagerpending').addClass('active');
    // if (this.mPageNo == 1) {
    //   this.getinvoicedetailsbasedonemailid(1);
    // }
    // else {
    //   this.refresh();
    // }
    this.refresh();
  }

  refresh() {
    this.internalpaginationpagenumber = 1;
    console.log("page no :  ", this.pageNo + "mpage:", this.Mpage + "mpage no ", this.mPageNo);
    this.emailid = sessionStorage.getItem("username");
    this.specificemailid = this.emailid;
    this.delteindexes = [];
    this.internalportalservice.getinvoicedetailsbasedonemailid(this.emailid, this.internalpaginationpagenumber, this.currstatus, 'NA', 'NA', 'NA', 'NA', 'NA', 'NA').subscribe(res => {
      //console.log("res is here ==>"+res[0].message);
      if (res[0].storekeeper == 'true') {
        this.storekeeper = true;
        sessionStorage.removeItem('storekeeper');
        sessionStorage.setItem('storekeeper', "true");
      } else {
        sessionStorage.removeItem('storekeeper');
        sessionStorage.setItem('storekeeper', "false");
        this.storekeeper = false;
      }
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
        // this.invoicedetailsList = res[0].invoicedetails;
        // this.invoiceCountAsPerStatus = res[0].invoiceCountAsPerStatus;
        // if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M != null) {
        //   this.pendingPo = this.invoiceCountAsPerStatus.M;
        // } else if (this.invoiceCountAsPerStatus?.P != null && this.invoiceCountAsPerStatus?.M == null) {
        //   this.pendingPo = this.invoiceCountAsPerStatus.P;
        // } else if (this.invoiceCountAsPerStatus?.P == null && this.invoiceCountAsPerStatus?.M == null) {
        //   this.pendingPo = 0;
        // } else {
        //   this.pendingPo = Number(this.invoiceCountAsPerStatus.P) + Number(this.invoiceCountAsPerStatus.M);
        // }
        console.log(this.invoicedetailsList, ' this.invoicedetailsList')
        // for (let b = 0; b < this.invoicedetailsList.length; b++) {
        //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
        //     if (this.invoicedetailsList[b].STATUS == 'M') {
        //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
        //         this.invoicedetailsList.splice(b, 1);
        //         this.spliceCount = this.spliceCount + 1;
        //       }
        //     }
        //   }
        // }
        // for (let b = 0; b < this.invoicedetailsList.length; b++) {
        //   if (this.invoicedetailsList[b].GRNNUMBER == null) {
        //     if (this.invoicedetailsList[b].STATUS == 'M') {
        //       if (this.invoicedetailsList[b].ENDUSERID != sessionStorage.getItem('username')) {
        //         // this.invoicedetailsList.splice(b, 1);
        //         this.delteindexes.push(b);
        //         this.spliceCount = this.spliceCount + 1;
        //       }
        //     }
        //   }
        // }
        // for (let o = 0; o < this.delteindexes.length; o++) {
        //   this.invoicedetailsList.splice(this.delteindexes[o], 1);

        // }
        console.log(" this.invoicedetailsList ==>", this.invoicedetailsList);
        // this.totalItems = this.invoicedetailsList.length
        this.totalItems = res[0].invoicedetailsrecords;
        this.endpagenumber = Math.ceil((Number(res[0].invoicedetailsrecords) / this.pageSize))
        if (Number(res[0].invoicedetailsrecords) / this.internalpaginationpagenumber <= this.pageSize) {
          this.disablenext = true;
        }
        else {
          this.disablenext = false;
        }
        setTimeout(() => {
          for (var a = 0; a < this.invoicedetailsList.length; a++) {
            if (this.invoicedetailsList[a].STATUS == 'CM') {
              this.ENDUSERStatus[a] = 'P';
            } else if (this.invoicedetailsList[a].STATUS == 'CO') {
              this.ENDUSERStatus[a] = 'O';
            } else if (this.invoicedetailsList[a].STATUS == 'CA') {
              this.ENDUSERStatus[a] = 'A';
            }
            else {
              this.ENDUSERStatus[a] = this.invoicedetailsList[a].ENDUSERSTATUS;
            }
            // this.ENDUSERStatus[a] = this.invoicedetailsList[a].ENDUSERSTATUS;
            if (this.invoicedetailsList[a].ENDUSERSTATUS == 'A' || this.invoicedetailsList[a].ENDUSERSTATUS == 'PP' || this.invoicedetailsList[a].ENDUSERSTATUS == 'PRO' || this.invoicedetailsList[a].ENDUSERSTATUS == 'PD') {
              // this.ManagerStatus[a] = this.invoicedetailsList[a].STATUS;
              // if (this.invoicedetailsList[a].STATUS == 'CA') {
              //   this.ManagerStatus[a] = this.invoicedetailsList[a].OVERALLSTATUS;
              // }
              // else if (this.invoicedetailsList[a].STATUS == 'CO'  || this.invoicedetailsList[a].STATUS == 'CM') {
              //   this.ManagerStatus[a] = 'P';
              // }
              // else {
              //   this.ManagerStatus[a] = this.invoicedetailsList[a].STATUS;
              // }
              if (this.invoicedetailsList[a].STATUS == 'CA') {
                if (this.invoicedetailsList[a].OVERALLSTATUS == 'M' || this.invoicedetailsList[a].OVERALLSTATUS == 'O') {
                  this.ManagerStatus[a] = 'P';
                } else {
                  this.ManagerStatus[a] = this.invoicedetailsList[a].OVERALLSTATUS;
                }

              }
              else if (this.invoicedetailsList[a].STATUS == 'CO' || this.invoicedetailsList[a].STATUS == 'CM') {
                this.ManagerStatus[a] = 'P';
              } else if (this.invoicedetailsList[a].STATUS == 'M' || (this.invoicedetailsList[a].STATUS == 'O'
                && sessionStorage.getItem('username') == this.invoicedetailsList[a].ENDUSERID)) {
                this.ManagerStatus[a] = 'P';
              }
              else {
                this.ManagerStatus[a] = this.invoicedetailsList[a].STATUS;
              }

            }

            if ((this.invoicedetailsList[a].GRNNUMBER != null && this.invoicedetailsList[a].CREDITADVICENO == null) ||
              (this.invoicedetailsList[a].GRNNUMBER != null && this.invoicedetailsList[a].CREDITADVICENO != null
                && this.invoicedetailsList[a].CREDITNOTENO != null)) {
              if (this.invoicedetailsList[a].EUMANAGER != "") {
                var splitedmanager = this.invoicedetailsList[a].EUMANAGER.split('_');
              }
              if (this.invoicedetailsList[a].ENDUSERID == this.specificemailid) {
                // console.log("in here");
                // console.log("a is here in if"+a);
                $('#SelManager' + a).attr('disabled', true);
                // if (this.invoicedetailsList[a].STATUS != 'M') {
                if (this.invoicedetailsList[a].OVERALLSTATUS != 'P' && this.invoicedetailsList[a].ENDUSERSTATUS != 'A') {
                  $('#Seluser' + a).attr('disabled', true);
                }
              }
              if (this.invoicedetailsList[a].EUMANAGER != "") {
                for (var o = 0; o < splitedmanager.length; o++) {
                  if (splitedmanager[o] == this.specificemailid) {
                    console.log("a is here in else" + a);
                    $('#Seluser' + a).attr('disabled', true);
                    if (this.invoicedetailsList[a].ENDUSERSTATUS != 'A') {
                      $('#SelManager' + a).attr('disabled', true);
                    }
                  }
                }
              }
              // else if (this.invoicedetailsList[a].EUMANAGER == this.specificemailid) {
              //   // console.log("a is here in else"+a);
              //   $('#Seluser  ' + a).attr('disabled', true);
              //   if (this.invoicedetailsList[a].ENDUSERSTATUS != 'A') {
              //     $('#SelManager' + a).attr('disabled', true);
              //   }
              // }
              if (this.invoicedetailsList[a].ENDUSERSTATUS == 'A' || this.invoicedetailsList[a].ENDUSERSTATUS == 'R') {
                $('#Seluser' + a).attr('disabled', true);
                // $('#showinvoice' +a).hide();
                // $('#showinvoiced' +a).hide();
              }
              if (this.invoicedetailsList[a].STATUS == 'A' || this.invoicedetailsList[a].STATUS == 'R'
                || this.invoicedetailsList[a].OVERALLSTATUS == 'R'
                || this.invoicedetailsList[a].STATUS == 'CA' || this.invoicedetailsList[a].STATUS == 'CM'
                || this.invoicedetailsList[a].STATUS == 'CO') {
                $('#SelManager' + a).attr('disabled', true);
              }
            }
            else {
              $('#Seluser' + a).attr('disabled', true);
              $('#SelManager' + a).attr('disabled', true);

            }
            this.loaderservice.hide();
          }


        }, 100);

        setTimeout(() => {

          console.log("page no :  ", this.pageNo + "mpage:", this.Mpage + "mpage no ", this.mPageNo);
          let count = 0;
          for (var k = this.pageNo; k <= this.Mpage; k++) {
            console.log("this.statusList.length " + this.statusList.length);
            if (this.statusList.length != 0) {

              for (var j = 0; j < this.statusList.length; j++) {
                // if (this.statusList[j]['READ_STATUS'] == "A" && this.statusList[j]['TOPIC'] == this.invoiceData[k]['INVOICENUMBER']) {
                if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['INVOICENUMBER'] == this.invoicedetailsList[k]['INVOICENUMBER'] && this.statusList[j]['PONUMBER'] == this.invoicedetailsList[k]['PONUMBER']) {
                  console.log("insise A--------------------------==============", this.invoicedetailsList[k]['INVOICENUMBER'])
                  $("#green" + count).addClass('displayBlock');
                  $("#white" + count).addClass('displayNone');
                  $("#white" + count).removeClass('displayBlock');

                }
                else {
                  //$("#green" + count).addClass('displayNone');
                  $("#white" + count).addClass('displayBlock');
                }
              }
            }
            else {
              $("#white" + count).addClass('displayBlock');
            }
            count++;
          }
        }, 100);
        //console.log(this.invoicedetailsList,'this.invoicedetailsList');
        this.invoiceList.reset();
        this.loaderservice.hide();
      }
      else {
        this.loaderservice.hide();
      }
    }); err => {
      this.loaderservice.hide();
    }

  }


  Check(message) {
    this.validate = true
    if (message.value != "" && message.value != " " && message.value != null && message.value.trim().length != 0) {
      this.validate = false;
    }
  }

  changetoindian(number) {
    console.log(number);
    return Number(number).toLocaleString('en-IN')
  }
  createCreditNote(invoicenumber, ponumber, creditAdviceNo) {
    this.pageName = 'ApproveInvoice';
    this.router.navigate(['./createCreditNote'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), adviceNo: btoa(creditAdviceNo), showCreditDetails: btoa(this.pageName) } });
  }
  getCreditNoteDetails(invoicenumber, ponumber, creditAdviceNo, creditNoteNo) {
    this.pageName = 'ApproveInvoice';
    console.log("creditAdviceNo " + creditAdviceNo);
    this.router.navigate(['./createCreditNote'], { queryParams: { order: btoa(invoicenumber), po: btoa(ponumber), adviceNo: btoa(creditAdviceNo), showCreditDetails: btoa(this.pageName), creditNoteNo: btoa(creditNoteNo) } });
  }
  onFileChanged(event: any) {
    console.log("this.filecount " + this.filecount);
    var specialChars = "<>@!#$%^&*()+[]{}?:;_|'\"\\,/~`-=";
    var checkForSpecialChar = function (string) {
      for (var j = 0; j < specialChars.length; j++) {
        if (string.indexOf(specialChars[j]) > -1) {
          return true
        }
      }
      return false;
    }
    var _validFileExtensions = [".JPEG", ".JPG", ".PNG", ".DOC", ".DOCX", ".XLS", ".XLSX", ".CSV", ".PDF"];
    var ValidateSingleInput = function (string) {
      for (var j = 0; j < _validFileExtensions.length; j++) {
        if (string.toUpperCase().indexOf(_validFileExtensions[j]) > -1) {
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
              // this.router.navigate(['/internaltrackInvoiceList']);
            });

            return;
          }
        }
        for (var m = 0; m < this.ArrayOfSelectedFile.length; m++) {
          if (checkForSpecialChar(this.ArrayOfSelectedFile[m].name)) {
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
        for (var m = 0; m < this.ArrayOfSelectedFile.length; m++) {
          if (ValidateSingleInput(this.ArrayOfSelectedFile[m].name.toUpperCase())) {
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
          this.ArrayOfSelectedSavedFile.push(this.ponumber + "_enduserinvoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[k].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[k].name));

          this.multiplactualfilenamearray.push(this.ArrayOfSelectedFile[k].name);
        }
        this.filecount = this.ArrayOfSelectedFile.length;
        this.multiplsavedfilenamearray = this.ArrayOfSelectedFilename.length;
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
          // this.router.navigate(['/internaltrackInvoiceList']);
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
                // this.router.navigate(['/internaltrackInvoiceList']);
              });

              this.filecount -= 1
              return;
            }
          }
          for (var m = 0; m < this.ArrayOfSelectedFilename.length; m++) {
            console.log("this.ArrayOfSelectedFilename[m].name", file.name);
            if (checkForSpecialChar(file.name)) {
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
            } else if (ValidateSingleInput(file.name.toUpperCase())) {
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
            this.ArrayOfSelectedSavedFile.push(this.ponumber + "_enduserinvoice_" + this.getFileNameWOExtention(file.name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(file.name));

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
        // this.dialogBox.popUpOpen2('Maximum 11 files allowed.', 'error', 'invoicesubmit');
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
          // this.router.navigate(['/internaltrackInvoiceList']);
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
    if (array.length != 0) {
      this.uploadfile();
    }
  }

  getFileNameWOExtention(name) {
    // return name.split(".")[0];
    var flName = name.substr(0, name.lastIndexOf(".")).replace(/_/g, "-").replace(/\./g, "-");
    return flName;
  }


  uploadfile() {
    const formData = new FormData();
    this.loaderservice.show();

    for (var i = 0; i < this.ArrayOfSelectedFile.length; i++) {

      console.log("this.ArrayOfSelectedFile[i].name ==> " + this.PONUMBER + "_enduserinvoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
      if (this.multipleactualendfilename == null) {

        formData.append("file[]", this.ArrayOfSelectedFile[i], this.PONUMBER + "_enduserinvoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));

      }
      else {
        console.log(this.individualsavedendname[0]);
        var words = this.individualsavedendname[0].split("_");
        var timestamp = words[words.length - 1].substr(0, words[words.length - 1].indexOf('.'));
        console.log("timestamp" + timestamp);
        formData.append("file[]", this.ArrayOfSelectedFile[i], this.PONUMBER + "_enduserinvoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + timestamp + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
      }
    }
    this.internalportalservice.multiplefileupload(formData).subscribe(res => {
      console.log(res.toString);
      this.loaderservice.hide();
      if (res[0].status == "Fail") {
        this.ArrayOfSelectedFilename = [];
        // var tempname = this.ArrayOfSelectedFilename[index]
        // this.ArrayOfSelectedFilename.splice(index, 1);
        // this.multiplsavedfilenamearray.splice(index, 1);
        this.ArrayOfSelectedSavedFile = [];
        // this.filecount = 0;
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
        return;
      }
      this.loaderservice.hide();
    }, err => {
      this.loaderservice.hide();
      console.log(JSON.stringify(err))

    });
  }
  showFilePopup(invNumber, poNum) {
    $("#popupAttach").css("visibility", "visible");
    $("#popupAttach").css("opacity", "1");
    this.trackOrderListService.getlistitemsforinvoicenumberininternal(invNumber, poNum).subscribe(res => {
      if (res[0].message == "Success") {
        this.InvoiceNumber = res[0].poData[0].INVOICENUMBER;
        this.PONUMBER = res[0].poData[0].PO_NUMBER;
        this.INVOICEDATE = res[0].poData[0].INVOICEDATE;
        this.INVAMT = res[0].poData[0].TOTALAMTINCTAXES;
        if (res[0].poData[0].ENDUSERSUPPACTUALFILE != null) {
          this.multipleactualendfilename = res[0].poData[0].ENDUSERSUPPACTUALFILE;
          console.log("this.multipleactualfilename", this.multipleactualendfilename);
          this.multiplesavedendfilename = res[0].poData[0].ENDUSERSUPPSAVEDFILE;
          console.log("this.multiplesavedfilename " + this.multiplesavedendfilename);
          var array = this.multiplesavedendfilename.split(',');
          console.log("array " + array[0]);
          this.individualsavedendname = [];
          for (var k = 0; k < array.length; k++) {
            this.individualsavedendname.push(array[k]);
          }
        }
      }
    });
    this.ArrayOfSelectedFilename.length = 0;
  }
  closeAttachPopup(ev) {
    $("#popupAttach").css("visibility", "hidden");
    $("#popupAttach").css("opacity", "0");
  }

  getExtensionOfFile(name) {
    return name.split(".")[name.split(".").length - 1];
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
    console.log("this.ArrayOfSelectedFilename" + this.ArrayOfSelectedFilename);
  }

  submitAttachments() {
    console.log("ArrayOfSelectedFilename " + this.ArrayOfSelectedFilename);
    console.log("po " + this.PONUMBER);
    console.log("InvoiceNumber " + this.InvoiceNumber);
    console.log("timestampnow " + this.timestampnow);

    this.trackOrderListService.updatefiles(this.InvoiceNumber, this.PONUMBER, this.timestampnow, this.ArrayOfSelectedFilename).subscribe(res => {
      if (res[0].message == "Success") {
        $("#popupAttach").css("visibility", "hidden");
        $("#popupAttach").css("opacity", "0");

        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Files attached successfully',
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

      }
      else {
        $("#popupAttach").css("visibility", "hidden");
        $("#popupAttach").css("opacity", "0");
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Error while updating',
          condition: 'error',
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

      }

    });
  }


  downloadfile(savedfilename, actualfilename, type) {
    if (savedfilename == "" || savedfilename == null || actualfilename == "" || actualfilename == null
      || savedfilename == undefined || actualfilename == undefined) {
      //this.dialogBox.popUpOpen2("File not present", 'success', 'purchaseorderlist');
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
              link.click();
            }
            else if (type == 'multiplefiledownload') {
              const filename = "Supporting_Invoice_Document.zip";
              link.href = FileToDownload;
              link.download = filename;
              link.click();
            }
          }
        }
        else if (result[0].reason != 'none') {
          // this.dialogBox.popUpOpen2(result[0].reason, 'success', 'purchaseorderlist');
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
        }
        this.loaderservice.hide();

      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );
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
