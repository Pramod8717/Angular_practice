import { enduserReturnModel } from './../../../../models/enduserReturn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InternalportalserviceService } from 'app/services/internalportal/internalportalservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackOrderListService } from 'app/services/trackOrderList/trackorderlist';
import * as moment from 'moment/moment';
import { approvalList } from 'app/models/manager-list';
import { saveAs } from 'file-saver';
import * as configData from 'assets/configdata/appconfig.json'
// import * as $ from 'jquery'; // I faced issue in using jquery's popover
declare var $: any;
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import { createDeliveryInvoiceSubmissionsModel } from 'app/models/createdelivery.model';
import { createCreditAdviceModel } from 'app/models/createCreditAdviceModel';
import { parse } from 'path';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../../../commoncomponents/popup/popup.component';


@Component({
  selector: 'app-trackinvoice-with-po',
  templateUrl: './trackinvoice-with-po.component.html',
  styleUrls: ['./trackinvoice-with-po.component.css']
})
export class TrackinvoiceWithPOComponent implements OnInit {
  addcount: number = 1;
  invoicedata: any = [];
  addCountList: any = [];
  managerList: any = [];
  optionsadded: any = [];
  managernameList: any = [];
  count: number = -1;
  removecount: number;
  poNumber: any;
  inVNumber: any;
  typeid: any;
  invoideDetailData: any = [];
  bankDetailData: any = [];
  invoicenumber: string;
  filecount: number = 0;
  ponumber: any;
  vendorName: any;
  status: any;
  ponumberfortrack: any;
  invoiceamount: any;
  bussinesspartneroid: any;
  invoicedate: any;
  paidamount: number;
  user: any;
  totalamount: any;
  description: any;
  actualfilename: any;
  savedfilename: any;
  submitteddate
  accountnumber: any;
  accountType: any;
  EndUserStatus: any;
  buyerID: any;
  DecodedFile: any;
  showmanagerlist: boolean = false;
  submitdone: boolean = false;
  showcustomManagerList: boolean = false;
  confirmationValue: boolean = false;
  disableEndUser: string;
  disableManger: string;
  enduserStatusDisplay: string;
  managerStatusDisplay: string;
  timestampnow = Date.now().toString();
  managerApprovalistArray: Array<approvalList> = [];
  managerID: string;
  approvalList = new approvalList();
  endUserStage: any;
  enduserstatusval: any;
  managerstatusval: any;
  customManagerList: any = [];
  custManagerList: any = [];
  customManagerListNames: any = [];
  searchColleagues;
  colleaguesList;
  //colleaguesNameList = [];
  queryString;
  queryString1;
  colleaguesDataList: Array<colleaguesList> = [];
  invoicesubmissionarray = [];
  selectedColleaguesList: Array<colleaguesList> = [];
  emailid: string;
  pending: any;
  trackinvoicelistdata: any = [];
  pendingstatus: any;
  pendingtime: any;
  mpending: boolean;
  mpendingstatus: any;
  mpendingtime: any;
  accepted: boolean;
  acceptedstatus: any;
  acceptedtime: any;
  rejected: boolean;
  rejectedstatus: any;
  rejectedtime: any;
  endUserStatus: string;
  managerStatus: string;
  endUserStatuss: string;
  endUserStatusofAprroval: string;
  stage: string;
  vendorID: any;
  msgOnButtonClick: any;
  uniquePONumber: any;
  uniqueInvNumber: any;
  processed: boolean;
  processedstatus: any;
  processedtime: any;
  partialpaid: boolean;
  partialpaidstatus: any;
  partialpaidtime: any;
  paid: boolean;
  paidstatus: any;
  paidtime: any;
  multipleactualfilename: any;
  multiplesavedfilename: any;
  individualsavedname: any = [];
  storekeeper: any;
  comparator: any = [];
  billofladingdate: any;
  createSubmissionsModel: createDeliveryInvoiceSubmissionsModel;
  // enduserReturnmodel =  new enduserReturnModel();
  enduserReturnmodel;
  plant: string;
  locationlist: any = [];
  storagelist: { storagelocation: string; locationdesc: string; }[];
  grnpresent: boolean = false;
  actiontaken: boolean = false;
  acceptedqty: boolean = true;
  usertype: string;

  ArrayOfSelectedFiles: any = [];
  multiplefilechanged: boolean = false;
  ArrayOfSelectedFile: any = [];
  multiplactualfilenamearray: any = [];
  ArrayOfSelectedFilename: any = [];
  ArrayOfSelectedSavedFile: any = [];
  purchaseOrderListService: any = [];
  multiplsavedfilenamearray: any;
  multipleactualendfilename: any;
  multiplesavedendfilename: any;
  individualsavedendname: any = [];
  enduserremarkspresent: any;
  actionBy: any;
  taxAmount: string;
  amtexcltax: string;
  grnnumber: string = "";
  creditAdviceArray: Array<createCreditAdviceModel> = [];
  CreateCreditAdviceModel = new createCreditAdviceModel();
  shortpresent: boolean = false;
  nullacceptedvalue: boolean = false;
  seletedValue: any = [];
  sortqty: any = 0;
  creditnote: any;
  creditadvice: any;
  pageName: string;
  grnnumberlistcommaseperated: any;
  scrnnumberlistcommaseperated: any;
  calculatedAmount: any = 0;
  scrnNumber: any;
  vendorremarks: any;
  enduserremarks: any;
  enduserReturnArray: any = [];
  hide: boolean = true;
  return: boolean = false;
  returnstatus: any;
  returntime: any;
  resubmit: boolean = false;
  resubmitstatus: any;
  resubmittime: any;
  previoustoresubmitinvoicenumber: any;
  irnNumber: any;
  irnDate: any;
  reversed: boolean;
  reversedstatus: any;
  reversedtime: any;
  statuschatmessage: any = [];
  self: boolean = false;
  behalf: boolean = false;
  confirmatoryList: any = [];
  selectedConfirmatoryList: any = [];
  quantitiesaccepted: boolean = false;
  confirmer: boolean = false;
  confirmerlist: any = [];
  managerConfirmerlistArray: any = [];
  enduserid: string;
  extensionType: any;
  selectedConfirmatoryListcheck: any = [];
  selectedColleaguesListcheck: any = [];
  confirmatoryemaillist: any = [];
  cmPresent: boolean = false;
  managerlistwithstatus: any = [];
  overAllStatus: string;
  plantname: string;
  materialname: string;
  customMangerlistname: StringConstructor;
  constructor(private internalportalservice: InternalportalserviceService, public dialog: MatDialog,
    private loaderservice: LoaderService, private route: ActivatedRoute, private trackOrderListService: TrackOrderListService, private router: Router) {

  }
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;

  ngOnInit(): void {















































    this.route.queryParams.subscribe(params => {
      console.log("what are the ?", params); // { order: "popular" }
      this.poNumber = atob(params.POnumber);
      this.inVNumber = atob(params.INVNumber);
      this.typeid = atob(params.typeOfuser);
      this.disableEndUser = atob(params.disableEndUser);
      this.disableManger = atob(params.disableManger);
      this.enduserStatusDisplay = atob(params.enduserStatus);
      // console.log("this.enduserStatusDisplay ==>" + this.enduserStatusDisplay);
      this.managerStatusDisplay = atob(params.managerStatus);
      this.overAllStatus = atob(params.overAllStatus);
      console.log("this.managerStatusDisplay " + this.managerStatusDisplay);
      // this.managerStatusDisplay = "A";
      this.managerID = atob(params.managerID);
      console.log("this.managerID " + this.managerID);
      this.stage = atob(params.stage);
      this.storekeeper = atob(params.storekeeper);
      this.plant = atob(params.plant);
      this.usertype = atob(params.usertype);
      console.log("this.usertype ==> " + this.usertype);
    });


    this.getCustomManager(this.inVNumber, this.poNumber)
    this.getInvoiceDetails(this.poNumber, this.inVNumber)
    this.addCountList.push(1);
    this.getManagerList();
    this.getmanagercount(this.inVNumber, this.poNumber)
    this.getstatuschatmessages(this.inVNumber, this.poNumber);
    this.getcustomManagerList();
    this.getlineitemdetails();
    // this.getstoragelocation(this.plant);
  }

  addManager() {
    //     this.count++;
    //     $("#more-Manager").append(`<div class='form-group'><label for=''>Manager Approval</label><input class='form-control' id='managerID${this.count}' placeholder='Enter Manager' type='text' (onkeyup)='enterManager()' /><div class='wizard-form-error'></div></div></div></div>`); 
    //     $('input').on('keyup', function(event) {
    //     console.log(event.target.value,'------------Adding')
    //     this.internalportalservice.searchPeople(event.target.value).subscribe(res => {
    //       console.log(res[0],'received-----------')
    //     });
    //  });



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

    this.internalportalservice.searchPeople(searchString, sessionStorage.getItem('storekeeper'), this.plantname, this.materialname).subscribe(res => {
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
  addApprover(e) {
    this.customMangerlistname = e.target.value;
    console.log("selectedColleaguesListcheck", this.selectedConfirmatoryList)
    for (var c = 0; c < this.selectedConfirmatoryList.length; c++) {
      if (this.selectedConfirmatoryList[c].email.includes(e.target.value)) {
        this.queryString1 = "";
        $("#custommanagerselectedID").val(0)
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'You cannot add same email id as enduser and as approver',
          condition: 'note',
          page: 'information2',
          specific: 'note'
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
    }

  }

  addColleaguesToSuggestionList(e, item) {
    this.selectedConfirmatoryListcheck = [];
    for (var c = 0; c < this.selectedConfirmatoryList.length; c++) {
      this.selectedConfirmatoryListcheck.push(this.selectedConfirmatoryList[c].email)
    }
    if (item.email == sessionStorage.getItem('username')) {
      this.queryString = "";
      this.clearSearchData();
      //  this.dialogBox.popUpOpen2("You can not add more than five colleagues", 'leave', 'information2');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'You cannot add yourself as approver',
        condition: 'note',
        page: 'information2',
        specific: 'note'
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
    else if (this.selectedConfirmatoryListcheck.length != 0) {

      if (this.selectedConfirmatoryListcheck.includes(item.email)) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'You cannot add same email id as enduser and as approver',
          condition: 'note',
          page: 'information2',
          specific: 'note'
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
        this.queryString = "";
        $(".addbtn").hide();
        this.clearSearchData();
        this.selectedColleaguesList.push(item);
        console.log("selectedColleaguesList===============>", this.selectedColleaguesList)
        //to not delete if item is newly added.
        if (this.colleaguesDataList.indexOf(item) >= 0)
          this.colleaguesDataList.splice(this.colleaguesDataList.indexOf(item), 1);

        //clear the search list after adding fileds.
        this.colleaguesList = null;
      }
    }
    else {
      this.queryString = "";
      $(".addbtn").hide();
      // if (this.selectedColleaguesList.length < 5) {
      this.selectedColleaguesList.push(item);
      console.log("selectedColleaguesList===============>", this.selectedColleaguesList)
      //to not delete if item is newly added.
      if (this.colleaguesDataList.indexOf(item) >= 0)
        this.colleaguesDataList.splice(this.colleaguesDataList.indexOf(item), 1);

      //clear the search list after adding fileds.
      this.colleaguesList = null;
      // }
      // else {
      //   //TODO: Open modal here for not more than 5 element.
      //   this.clearSearchData();
      //   //  this.dialogBox.popUpOpen2("You can not add more than five colleagues", 'leave', 'information2');
      //   const dialogConfig = new MatDialogConfig();
      //   dialogConfig.data = {
      //     message: 'You can not add more than five colleagues',
      //     condition: 'leave',
      //     page: 'information2'
      //   };
      //   const mydata = dialogConfig.data;
      //   console.log("PopupComponent", mydata);

      //   const dialogRef = this.dialog.open(PopupComponent, {
      //     panelClass: 'custom-modalbox',

      //     width: '400px',
      //     data: { datakey: dialogConfig.data }

      //   });
      //   dialogRef.afterClosed().subscribe(result => {
      //     console.log(`Dialog result1: ${result}`);
      //   });

      // }
    }

  }
  removeColleaguesFromSuggestionList(e, item) {
    item.checked = true;
    this.colleaguesDataList.push(item);
    this.selectedColleaguesList.splice(this.selectedColleaguesList.indexOf(item), 1);
  }


  clearSearchData() {
    setTimeout(() => {
      this.colleaguesList = null;
    }, 200);

  }


  callConfirmatoryDynamicData() {

    if (this.queryString1 != null && this.queryString1 != undefined && this.queryString1 != "") {
      //if(this.queryString.length > 3)
      //{
      this.getConfirmatoryColleaguesData(this.queryString1);

      //}
    }
  }

  getConfirmatoryColleaguesData(searchString) {
    // $("#searchLoading").show();
    this.colleaguesDataList = [];
    this.internalportalservice.searchPeople(searchString, true, 'NA', 'NA').subscribe(res => {
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
            // console.log("tempColleages.email",tempColleages.email);
            //split the response which is format in email and seperate the . with space.
            //comment this line to show email directly.
            //var nameFromEmail = element.split('@')[0].replace('.', " ");
            //tempColleages.name = nameFromEmail;

            tempColleages.name = element['NAME'];
            tempColleages.designation = element['DESIGNATION']
            //assign name and email to colleagues model
            this.colleaguesDataList.push(tempColleages);
            if (this.queryString1 != null && this.queryString1 != undefined && this.queryString1 != "") {
              // this.onSearchKeyUp();
            }
          });
          console.log("this.colleaguesDataList", this.colleaguesDataList);
          this.confirmatoryList = this.colleaguesDataList;
          $("#search1").focus();
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


  addConfirmatoriesToSuggestionList(e, item) {
    this.selectedColleaguesListcheck = [];
    this.confirmatoryemaillist = [];
    for (var c = 0; c < this.selectedColleaguesList.length; c++) {
      this.selectedColleaguesListcheck.push(this.selectedColleaguesList[c].email)
    }
    for (var a = 0; a < this.selectedConfirmatoryList.length; a++) {
      this.confirmatoryemaillist.push(this.selectedConfirmatoryList[a].email);
    }
    console.log("this.confirmatoryemaillist ", this.confirmatoryemaillist);
    if (item.email == sessionStorage.getItem('username')) {
      this.queryString1 = "";
      this.clearConfirmationSearchData();
      //  this.dialogBox.popUpOpen2("You can not add more than five colleagues", 'leave', 'information2');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        message: 'You cannot add yourself as end user',
        condition: 'note',
        page: 'information2',
        specific: 'note'
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
    // var approverID = $("#custommanagerselectedID option:selected").val()
    // if (item.email == approverID) {
    //   this.queryString1 = "";
    //   this.clearConfirmationSearchData();
    //   //  this.dialogBox.popUpOpen2("You can not add more than five colleagues", 'leave', 'information2');
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.data = {
    //     message: 'You cannot add same email id as enduser and as approver',
    //     condition: 'note',
    //     page: 'information2',
    //     specific: 'note'
    //   };
    //   const mydata = dialogConfig.data;
    //   console.log("PopupComponent", mydata);

    //   const dialogRef = this.dialog.open(PopupComponent, {
    //     panelClass: 'custom-modalbox',

    //     width: '400px',
    //     data: { datakey: dialogConfig.data }

    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log(`Dialog result1: ${result}`);
    //   });
    // }

    else if (this.selectedColleaguesListcheck.length != 0) {
      if (this.selectedColleaguesListcheck.includes(item.email) || item.email == this.customMangerlistname) {
        this.queryString1 = "";
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'You cannot add same email id as enduser and as approver',
          condition: 'note',
          page: 'information2',
          specific: 'note'
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
        if (this.selectedConfirmatoryList.length < 3) {
          if (this.confirmatoryemaillist.includes(item.email)) {

            this.clearConfirmationSearchData();
            //  this.dialogBox.popUpOpen2("You can not add more than five colleagues", 'leave', 'information2');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Duplicate end users are not allowed to add',
              condition: 'note',
              page: 'information2',
              specific: 'note'
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
            this.selectedConfirmatoryList.push(item);
            console.log("selectedConfirmatoryList===============>", this.selectedConfirmatoryList)
            //to not delete if item is newly added.
            if (this.colleaguesDataList.indexOf(item) >= 0)
              this.colleaguesDataList.splice(this.colleaguesDataList.indexOf(item), 1);

            //clear the search list after adding fileds.
            this.confirmatoryList = null;
          }

        }

        else {
          //TODO: Open modal here for not more than 5 element.
          this.clearConfirmationSearchData();
          //  this.dialogBox.popUpOpen2("You can not add more than five colleagues", 'leave', 'information2');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'You cannot add more than 3 endusers',
            condition: 'note',
            page: 'information2',
            specific: 'note'
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
      }

    }
    else if(item.email == this.customMangerlistname)
    {
      this.queryString1 = "";
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'You cannot add same email id as enduser and as approver',
          condition: 'note',
          page: 'information2',
          specific: 'note'
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
      this.queryString1 = "";
      $(".addbtn").hide();
      if (this.selectedConfirmatoryList.length < 3) {
        if (this.confirmatoryemaillist.includes(item.email)) {

          this.clearConfirmationSearchData();
          //  this.dialogBox.popUpOpen2("You can not add more than five colleagues", 'leave', 'information2');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: 'Duplicate end users are not allowed to add',
            condition: 'note',
            page: 'information2',
            specific: 'note'
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
          this.selectedConfirmatoryList.push(item);
          console.log("selectedConfirmatoryList===============>", this.selectedConfirmatoryList)
          //to not delete if item is newly added.
          if (this.colleaguesDataList.indexOf(item) >= 0)
            this.colleaguesDataList.splice(this.colleaguesDataList.indexOf(item), 1);

          //clear the search list after adding fileds.
          this.confirmatoryList = null;
        }

      }
      else {
        //TODO: Open modal here for not more than 5 element.
        this.clearConfirmationSearchData();
        //  this.dialogBox.popUpOpen2("You can not add more than five colleagues", 'leave', 'information2');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'You cannot add more than 3 endusers',
          condition: 'note',
          page: 'information2',
          specific: 'note'
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
    }

  }
  removeConfirmatoryFromSuggestionList(e, item) {
    item.checked = true;
    this.colleaguesDataList.push(item);
    this.selectedConfirmatoryList.splice(this.selectedConfirmatoryList.indexOf(item), 1);
  }

  clearConfirmationSearchData() {

    setTimeout(() => {
      this.confirmatoryList = null;
    }, 200);

  }





  removeManager() {
    this.count--;
    $("#more-Manager").children().last().remove();
  }

  enterManager(value) {
    console.log(value, '-------event fired ------------------')
  }


  displayTypeBasis(type) {

    setTimeout(() => {
      console.log("this.managerStatusDisplay " + this.managerStatusDisplay);
      console.log("this.enduserStatusDisplay " + this.enduserStatusDisplay);
      if (this.managerStatusDisplay == 'A')
        $("#selectuser").val('A');
      if (this.managerStatusDisplay == 'R')
        $("#selectuser").val('R')
      if (this.managerStatusDisplay == 'P')
        $("#selectuser").val('P');
      if (this.managerStatusDisplay == 'M')
        $("#selectuser").val('P')
      if (this.managerStatusDisplay == 'O' &&
        sessionStorage.getItem('username') == this.customManagerList[0].ENDUSEID) {
        $("#selectuser").val('P')
      }
      else if (this.managerStatusDisplay == 'O' &&
        sessionStorage.getItem('username') != this.customManagerList[0].ENDUSEID) {
        $("#selectuser").val('O')
      }

      if (this.managerStatusDisplay == 'PRO')
        $("#selectuser").val('A')
      if (this.managerStatusDisplay == 'PP')
        $("#selectuser").val('A')
      if (this.managerStatusDisplay == 'PD')
        $("#selectuser").val('A')
      if (this.managerStatusDisplay == 'CO')
        $("#selectuser").val('P')
      if (this.managerStatusDisplay == 'CM')
        $("#selectuser").val('P')
      if (this.managerStatusDisplay == 'CA')
        $("#selectuser").val('A')

      if (this.enduserStatusDisplay == 'A') {

        $("#selectManager").val('A');
        this.submitdone = false;
      }

      if (this.enduserStatusDisplay == 'R') {

        $("#selectManager").val('R')
        this.submitdone = true;
      }

      if (this.enduserStatusDisplay == 'P') {

        $("#selectManager").val('P');
        this.submitdone = true;
      }

      if (this.enduserStatusDisplay == 'O') {

        $("#selectManager").val('O')
        this.submitdone = true;
      }

      this.enduserstatusval = $("#selectManager option:selected").val()
      console.log(this.enduserstatusval, 'this.enduserstatusval');

      if (this.disableEndUser == 'true' && type == "enduser") {
        $("#selectManager").prop('disabled', true);
        console.log(this.enduserStatusDisplay, "this.enduserStatusDisplay")
        if (this.enduserStatusDisplay == 'A')
          $("#selectManager").val('A');
        if (this.enduserStatusDisplay == 'R')
          $("#selectManager").val('R')

      }
      if (this.disableEndUser == 'false' && type == "enduser") {
        $("#selectManager").prop('disabled', false);
      }
      if (type == "enduser" && (this.enduserStatusDisplay == 'A' || this.enduserStatusDisplay == 'R')) {
        this.showmanagerlist = false;
        $("#UpdateInvoiceID").hide();
        $("#selectuser").prop('disabled', true);
      }

      if (type == "manager" && this.enduserStatusDisplay == 'A' || this.status == 'R') {
        $("#selectManager").prop('disabled', true);
        $("#selectuser").prop('disabled', false);
        this.showmanagerlist = false;
      }
      if (type == "manager" && this.enduserStatusDisplay != 'A' || this.status == 'R') {
        $("#selectManager").prop('disabled', true);
        $("#selectuser").prop('disabled', true);
        this.showmanagerlist = false;
      }

      if (this.disableManger == 'true' && type == "manager" && this.enduserstatusval == 'A') {
        $("#selectuser").prop('disabled', false);
        this.showmanagerlist = false;
      }
      else if (this.disableManger == 'false' && type == "manager" && this.enduserstatusval == 'A') {
        $("#selectuser").prop('disabled', false);
        this.showmanagerlist = false;
      }
      this.managerstatusval = $("#selectuser option:selected").val()

      if (this.managerstatusval == 'A' || this.managerstatusval == 'R' || this.status == 'R') {
        $("#selectuser").prop('disabled', true);
      }

      if (this.enduserstatusval == 'R') {
        this.showmanagerlist = false;
      }
      if (this.managerstatusval == 'R' && this.enduserStatusDisplay == 'R'
        || this.managerstatusval == 'A' && this.managerstatusval == 'A'
        || this.enduserStatusDisplay == 'A' && this.managerStatusDisplay == 'R') {
        $("#UpdateInvoiceID").hide();
      }
      if (this.behalf) {
        console.log("this.status " + this.status);
        if (type == "manager" && (this.managerStatusDisplay == 'M' || this.managerStatusDisplay == 'A' || this.managerStatusDisplay == 'O')) {
          this.managerlistwithstatus
          for (var z = 0; z < this.managerlistwithstatus.length; z++) {
            if (this.managerlistwithstatus[z].STATUS == 'CM') {
              this.showmanagerlist = false;
              $("#UpdateInvoiceID").hide();
              $("#selectuser").prop('disabled', true);
              $("#selectManager").prop('disabled', true);
              break;
            }
          }

        }
        if (type == "manager" && (this.managerStatusDisplay == 'CM' || this.managerStatusDisplay == 'CO')) {
          $("#selectuser").prop('disabled', true);
          $("#selectManager").prop('disabled', false);
          $("#selectuser").val('P')
          if (this.behalf) {
            if (this.managerStatusDisplay == 'CM') { $("#selectManager").val('P') }
            else if (this.managerStatusDisplay == 'CO') { $("#selectManager").val('O') }

          }

        }
        // if(this.managerStatusDisplay == 'CM'){
        //   $("#selectuser").val('P')
        // }else if(this.managerStatusDisplay == 'CO'){
        //   $("#selectuser").val('O')
        // }else if(this.managerStatusDisplay == 'CA'){
        //   for (let loop = 0; loop <= this.customManagerList.length - 1; loop++) {
        //     if (this.customManagerList[loop].STATUS == 'CM' || this.customManagerList[loop].STATUS == 'P' || this.customManagerList[loop].STATUS == 'M'
        //     ) {
        //       $("#selectuser").val('P')
        //       break;
        //     }else if(this.customManagerList[loop].STATUS == 'CO') {
        //       $("#selectuser").val('O')
        //     } 
        //   }
        // }else{
        //   $("#selectuser").val('A')
        // }
        console.log("this.overAllStatus", this.overAllStatus)
        if (this.managerStatusDisplay == 'CA') {
          if (this.overAllStatus == 'M' || this.overAllStatus == 'O') {
            $("#selectuser").val('P')
          } else {
            $("#selectuser").val(this.overAllStatus)
          }
        } else if (this.overAllStatus == 'M' || this.overAllStatus == 'O') {
          this.overAllStatus = 'P';
        }
        else if (this.managerStatusDisplay == 'CO') {
          $("#selectuser").val('P')
        } else if (this.managerStatusDisplay == 'CM') {
          $("#selectuser").val('P')
        } else if (this.managerStatusDisplay == 'M' || (this.managerStatusDisplay == '0'
          && sessionStorage.getItem('username') == this.custManagerList[0].ENDUSERID)) {
          this.managerStatusDisplay = 'P';
        }
        else {
          $("#selectuser").val(this.managerStatusDisplay)
        }
      }
    }, 1000);
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

  getcustomManagerList() {
    //var email = sessionStorage.getItem("loginUser");
    this.emailid = sessionStorage.getItem("username");
    this.internalportalservice.getcustomManagerList(this.emailid, this.plantname, this.materialname).subscribe(res => {
      console.log(res[0], "res[0]-----------------------------")
      if (res[0].message == "Success") {
        this.custManagerList = res[0].managerdetails;
        for (let m = 0; m < this.custManagerList.length; m++) {
          this.customManagerListNames.push(this.custManagerList[m].MANAGEREMAILID);
        }
      }
      console.log(this.customManagerListNames, '==============customManagerListNames==============',);
    });
  }

  getCustomManager(inv_num, po_num) {
    this.internalportalservice.getMultipleManagerList(inv_num, po_num).subscribe(res => {
      if (res[0].invoiceData.length > 0) {
        this.customManagerList = res[0].invoiceData;
        this.managerlistwithstatus = res[0].invoiceData;
        this.enduserid = this.customManagerList[0].ENDUSEID;
        if (sessionStorage.getItem('username') == this.enduserid) {
          console.log("storekeeper changed to enduser");
          this.usertype = 'enduser';
        }
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
        // this.comparator.push(res[0].invoiceData[0])


        for (let loop = 0; loop <= this.customManagerList.length - 1; loop++) {
          if (this.emailid == this.customManagerList[loop].EUMANAGER &&
            (this.customManagerList[loop].STATUS == 'CM' || this.customManagerList[loop].STATUS == 'CO')) {
            this.confirmer = true;
          }
          if (this.customManagerList[loop].EUMANAGER != null) {
            var name = this.customManagerList[loop].EUMANAGER.match(/^([^.]*)./)[1];
            this.getColleaguesData(name);
            console.log("is output========>", name);
          }
          if (this.customManagerList[loop].STATUS == 'CM') {
            this.cmPresent = true;
          }
        }
      }
      console.log(this.customManagerList, '==============getMultipleManagerList==============',);
    });
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
  getInvoiceDetails(ponum, invno) {
    this.trackOrderListService.getlistitemsforinvoicenumberininternal(invno, ponum).subscribe(res => {
      console.log(res[0].poData[0], '---------------------------------')
      this.actionBy = res[0].ACTIONBY;
      if (res[0].message == "Success") {
        this.invoideDetailData = res[0].poData;
        this.plantname = this.invoideDetailData[0].PLANT;
        this.materialname = this.invoideDetailData[0].MATERIAL;
        console.log("this.invoideDetailData[0].ACCEPTEDQTY " + this.invoideDetailData[0].ACCEPTEDQTY);
        if (this.invoideDetailData[0].ACCEPTEDQTY == null || this.invoideDetailData[0].ACCEPTEDQTY == 0) {
          this.quantitiesaccepted = false;
          console.log("in if");
        }
        else {
          console.log("in else");

          this.quantitiesaccepted = true;
        }
        if (this.invoideDetailData[0].ACCEPTTYPE == 'B') {
          this.behalf = true;

        }
        else {
          this.self = true;
        }
        console.log(this.invoideDetailData, '---------------------------------')
        console.log("this.invoideDetailData[0].GRNNUMBER " + this.invoideDetailData[0].GRNNUMBER);
        this.creditnote = this.invoideDetailData[0].CREDITNOTENO;
        this.creditadvice = this.invoideDetailData[0].CREDITADVICENO;
        this.grnnumber = this.invoideDetailData[0].GRNNUMBER;
        this.scrnNumber = this.invoideDetailData[0].SCRNNUMBER;
        if (this.creditadvice != null && this.creditnote == null) {
          this.actiontaken = true;
        }
        if (this.invoideDetailData[0].GRNNUMBER == null) {
          this.grnpresent = false;
        }
        else if ((this.invoideDetailData[0].CREDITNOTENO == null && this.invoideDetailData[0].CREDITADVICENO == null)
          || (this.invoideDetailData[0].CREDITNOTENO != null && this.invoideDetailData[0].CREDITADVICENO != null)) {

          this.grnpresent = true;
        }
        else {
          this.grnpresent = false;
        }

        this.invoicenumber = this.invoideDetailData[0].INVOICENUMBER;
        this.vendorName = this.invoideDetailData[0].BUSSINESSPARTNERTEXT;
        this.vendorID = this.invoideDetailData[0].VENDORID
        this.ponumber = this.invoideDetailData[0].PO_NUMBER;
        this.status = this.invoideDetailData[0].OVERALLSTATUS;
        this.invoicedate = this.invoideDetailData[0].INVOICEDATE;

        this.invoiceamount = this.invoideDetailData[0].INVOICEAMOUNT;
        this.paidamount = 0;
        this.pending = this.invoideDetailData[0].CREATEDON
        this.user = this.invoideDetailData[0].CONTACTPERSON;
        this.totalamount = Number(this.invoideDetailData[0].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
        this.description = this.invoideDetailData[0].DESCRIPTION;
        this.actualfilename = this.invoideDetailData[0].ACTUALFILENAME;
        this.vendorremarks = this.invoideDetailData[0].VENDORREMARKS;
        this.enduserremarks = this.invoideDetailData[0].USERREMARK;
        this.irnNumber = this.invoideDetailData[0].IRNNUMBER;
        this.irnDate = this.parseDate(this.invoideDetailData[0].IRNDATE);
        // console.log("Abe--------------->",this.parseDate(this.invoideDetailData[0].IRNDATE),this.invoideDetailData[0].IRNDATE); 
        // var d = new Date(this.invoideDetailData[0].IRNDATE)
        // let date =  d.toISOString();
        //         var datestring =  this.invoideDetailData[0].IRNDATE;
        //                     var formatdate = moment(datestring)
        //                     var dateobj = formatdate.toDate();
        //                     console.log("transformed date ===>",date,dateobj);
        //                     this.irnDate=dateobj;
        this.savedfilename = this.invoideDetailData[0].SAVEDFILENAME;
        this.buyerID = this.invoideDetailData[0].BUYERID;
        if (this.invoideDetailData[0].MULTIACTUALFILENAME != null) {
          this.multipleactualfilename = this.invoideDetailData[0].MULTIACTUALFILENAME;
          console.log("this.multipleactualfilename" + this.multipleactualfilename);
          this.multiplesavedfilename = this.invoideDetailData[0].MULTISAVEDFILENAME;
          console.log("this.multiplesavedfilename " + this.multiplesavedfilename);
          var array = this.multiplesavedfilename.split(',');
          console.log("array " + array[0]);
          this.individualsavedname = [];
          for (var k = 0; k < array.length; k++) {
            this.individualsavedname.push(array[k]);
          }
        }
        if (this.invoideDetailData[0].ENDUSERSUPPACTUALFILE != null) {
          this.multipleactualendfilename = this.invoideDetailData[0].ENDUSERSUPPACTUALFILE;
          console.log("this.multipleactualfilename" + this.multipleactualfilename);
          this.multiplesavedendfilename = this.invoideDetailData[0].ENDUSERSUPPSAVEDFILE;
          console.log("this.multiplesavedfilename " + this.multiplesavedendfilename);
          var array = this.multiplesavedendfilename.split(',');
          console.log("array " + array[0]);
          this.individualsavedendname = [];
          for (var k = 0; k < array.length; k++) {
            this.individualsavedendname.push(array[k]);
          }
        }
        this.buyerID = this.invoideDetailData[0].BUYERID;
        this.internalportalservice.trackinvoicestatusforinternal(this.invoicenumber, this.ponumber).
          subscribe(res => {

            if (res[0].message == "Success") {
              this.trackinvoicelistdata = res[0].trackstatusListdata;
              for (var z = 0; z < this.trackinvoicelistdata.length; z++) {
                console.log(this.trackinvoicelistdata[z].PENDINGMODIFIEDTIME);
                if (this.trackinvoicelistdata[z].PENDINGSTATUS) {
                  console.log("PENDINGSTATUS");
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
                  console.log("MPENDINGSTATUS");
                  this.mpending = true;
                  this.mpendingstatus = this.trackinvoicelistdata[z].MPENDINGSTATUS;
                  this.mpendingtime = this.trackinvoicelistdata[z].MPENDINGMODIFIEDTIME;
                }
                else if (this.trackinvoicelistdata[z].ACCEPTEDSTATUS) {
                  console.log("ACCEPTEDSTATUS ==>");
                  this.accepted = true;
                  this.acceptedstatus = this.trackinvoicelistdata[z].ACCEPTEDSTATUS;
                  this.acceptedtime = this.trackinvoicelistdata[z].ACCEPTEDMODIFIEDTIME;
                }
                else if (this.trackinvoicelistdata[z].REJECTEDSTATUS) {
                  console.log("REJECTEDSTATUS ==>");
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
        // this.getaccountDetails(this.vendorID)
        this.displayTypeBasis(this.typeid)
      }
    });
  }
  parseDate
    (s) {
    if (s != null && s != undefined) {
      var months = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
      };
      var p = s.split('-');
      return new Date(Number(p[2]) + 2000, months[p[1].toLowerCase()], p[0]);
    }
    else {
      return false;
    }
  }


  // getaccountDetails(vendor) {
  //   this.internalportalservice.invoiceBankDetails(vendor).subscribe(res => {
  //     // if (res[0].message == "Success") {
  //     this.bankDetailData = res[0].poData;
  //     this.accountnumber = this.bankDetailData[0].ACCOUNTNUMBER;
  //     this.accountType = this.bankDetailData[0].ACCOUNTTYPE;
  //     // }
  //   });
  // }

  getManagerList() {
    this.managerList = [];
    console.log(this.managerID, "this.managerID Angaj")
    this.internalportalservice.getManagerList().subscribe(res => {
      this.managerList = res[0];
      console.log(this.managerList.length, "this.this.managerList.length")
      for (let n = 0; n < this.managerList.length; n++) {
        var index = this.managerList.indexOf(this.managerID)
        this.managerList.splice(index, 1);



        break;
      }
    });
  }



  trackInvoice() {
    this.loaderservice.show();
    this.submitdone = true;
    this.invoicesubmissionarray = [];
    console.log(this.colleaguesList, 'this.colleaguesList')
    console.log(this.selectedColleaguesList, 'this.selectedColleaguesList')
    this.managernameList = [];
    this.managerApprovalistArray = [];
    var ManagerStatus = $("#selectManager").val();


    var manageID = $("#custommanagerselectedID option:selected").val()
    if (manageID != undefined && manageID != 0 && manageID != "0") {
      this.managernameList.push(manageID);
    }
    // var manageID=$('#custommanagerselectedID').val();

    console.log(this.managernameList, 'this.managernameList');
    console.log("this.customManagerList ", this.customManagerList);
    var totaladdedmanagers = $('#lstBox2 option').length;
    var selectedmanagers = $('#lstBox2');





    console.log("Status", $("#selectManager").val());
    console.log(this.colleaguesList, 'this.colleaguesList')
    // console.log(this.selectedColleaguesList[0].email,'this.selectedColleaguesList')

    console.log("selectedmanagerss", selectedmanagers[0], "totaladdedmanagers", totaladdedmanagers);


    if ((this.managernameList.length != 0 || this.selectedColleaguesList.length != 0) && ManagerStatus != 'R') {
      //amruta comment


      //this.typeid="enduser";
      if (this.typeid == "enduser") {
        for (let i = 0; i < this.selectedColleaguesList.length; i++) {
          if (this.managernameList.length == 0) {
            this.managernameList.push(this.selectedColleaguesList[i]['email'])
          }
          else if (this.managernameList.length > 0) {
            //if (this.selectedColleaguesList[i]['email'] in this.managernameList[i] : some_list.remove(thing)

            if (this.managernameList.includes(this.selectedColleaguesList[i]['email']) == true) {
              this.loaderservice.hide();
              // this.dialogBox.popUpOpen2('Duplicate Manager not allowed', 'success', 'invoicesubmit');
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: 'Duplicate approver not allowed',
                condition: 'note',
                page: 'information2',
                specific: 'note'
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
              this.filecount -= 1
              this.submitdone = false;
              return
            }
            else {
              this.managernameList.push(this.selectedColleaguesList[i]['email'])
            }
          }
        }
        if ($("#selectManager").val() == 'A' && this.managernameList.length == 0) {
          this.loaderservice.hide();
          // this.dialogBox.popUpOpen2('Please select Approver', 'success', 'invoicesubmit');
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
          this.submitdone = false;
          return
        }
        // }
        console.log(this.managernameList, 'this.managernameList')
        console.log("this.storekeeper ==>" + this.storekeeper);
        for (let m = 0; m < this.managernameList.length; m++) {
          this.approvalList = new approvalList();
          this.approvalList.vendorid = this.vendorID;
          this.approvalList.invoicenumber = this.invoicenumber;

          this.approvalList.invoicedate = this.invoicedate;
          this.approvalList.ponumber = this.poNumber;
          //this.approvalList.buyerid=null;
          this.approvalList.totalamount = this.totalamount.replace(/,/g, '');
          this.approvalList.enduserid = sessionStorage.getItem("username");
          this.approvalList.enduserstatus = $("#selectManager").val();
          this.approvalList.eumanager = this.managernameList[m];
          this.approvalList.status = 'M';

          /* it was commented by Amruta , Angaj Uncommented it*/
          if (this.approvalList.enduserstatus == "A") {
            this.approvalList.stage = "2"
            this.approvalList.status = 'M';
          }
          else if (this.approvalList.enduserstatus == "O" || this.approvalList.enduserstatus == "P" || this.approvalList.enduserstatus == "R") {
            // debugger;
            this.approvalList.stage = "1"
            this.approvalList.status = 'M';
          }
          /* it was commented by Amruta , Angaj Uncommented it end*/
          this.approvalList.managercount = JSON.stringify(this.managernameList.length);
          // added by tejas to know whether storekeeper changed the status or enduser start 
          this.approvalList.storekeeperaction = this.storekeeper;
          // if(this.storekeeper =="ST")
          // {
          //   this.approvalList.storekeeperaction = "true";
          // }
          // else
          // {
          //   this.approvalList.storekeeperaction = "false";
          // }

          // added by tejas to know whether storekeeper changed the status or enduser end
          this.managerApprovalistArray.push(this.approvalList);
        }
        console.log(this.managerApprovalistArray, '============================')

        this.addMultiManagers();
      }
    }
    else if (this.typeid == "enduser") {
      console.log("is is coming >>>>", this.customManagerList);

      if ($("#selectManager").val() == 'A' && this.customManagerList[0].EUMANAGER == null) {
        this.loaderservice.hide();
        //this.dialogBox.popUpOpen2('Please select Approver', 'success', 'invoicesubmit');
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
        this.submitdone = false;
        return
      }
      console.log("Escape");
      let endUserStatus = $("#selectManager").val();
      if (endUserStatus != 'A' && this.typeid == "enduser") {
        this.endUserStage = 1
      }
      else {
        this.endUserStage = 2;
      }
      if (endUserStatus == "P") {
        this.endUserStatus = "Pending"
      } else
        if (endUserStatus == "O") {
          this.endUserStatus = "On Hold"
        } else if (endUserStatus == "R") {
          this.endUserStatus = "Rejected"
        } else if (endUserStatus == "A") {
          this.endUserStatus = "Approved"
        }

      if (endUserStatus != this.enduserStatusDisplay) {
        this.loaderservice.hide();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
          message: 'Are you sure you want to update the status to ' + this.endUserStatus + ' ?',
          condition: this.endUserStatus,
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

          //  });
          // this.dialogBox.popUpOpen_callback_confirm('Do you want to update your invoice status to ' + this.endUserStatus + '?', '1', 'confirm',

          //   (value) => {
          //     this.confirmationValue = value;
          //     console.log("value is here ==>" + value);

          // this.dialogBox.popUpOpen2

          if (this.confirmationValue == true) {
            this.loaderservice.show();
            this.internalportalservice.updateEndUserApprovalStatus(this.inVNumber,
              this.poNumber, endUserStatus, this.user, this.endUserStage, sessionStorage.getItem('storekeeper')).subscribe(res => {
                this.loaderservice.hide();
                if (configData.headerDisplay == "prod") {
                  // ------------------------------------for uat start -------------------------------------


                  if (res[0].message == "Success" && res[0].emailstatus == true) {

                    if (this.endUserStatus == "On Hold" || this.endUserStatus == "Rejected" || this.endUserStatus == "Approved") {

                      this.internalInvoiceStatusSubmit('N', this.endUserStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                    }
                    console.log("in here");
                    this.loaderservice.hide();
                    // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.data = {
                      message: 'Transaction updated successfully ',
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
                      this.router.navigate(['/internaltrackInvoiceList']);
                    });



                  }
                  else if (res[0].message == "Success" && res[0].emailstatus == false) {

                    if (this.endUserStatus == "On Hold" || this.endUserStatus == "Rejected" || this.endUserStatus == "Approved") {
                      this.internalInvoiceStatusSubmit('N', this.endUserStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                    }
                    // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
                    this.loaderservice.hide();
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.data = {
                      message: 'Transaction updated successfully ',
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
                      this.router.navigate(['/internaltrackInvoiceList']);
                    });



                  }
                  // ------------------------------------for uat end -------------------------------------
                }
                else if (configData.headerDisplay == "dev") {
                  // ------------------------------------for dev start -------------------------------------
                  if (res[0].message == "Success" && res[0].emailstatus == true) {

                    if (this.endUserStatus == "On Hold" || this.endUserStatus == "Rejected" || this.endUserStatus == "Approved") {
                      this.internalInvoiceStatusSubmit('N', this.endUserStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                    }
                    console.log("in here");
                    this.loaderservice.hide();
                    // this.dialogBox.popUpOpen2('Transaction updated successfully  and email has been sent successfully', 'success', 'approval');
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.data = {
                      message: 'Transaction updated successfully  and email has been sent successfully',
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
                      this.router.navigate(['/internaltrackInvoiceList']);
                    });
                  }
                  else if (res[0].message == "Success" && res[0].emailstatus == false) {

                    if (this.endUserStatus == "On Hold" || this.endUserStatus == "Rejected" || this.endUserStatus == "Approved") {
                      this.internalInvoiceStatusSubmit('N', this.endUserStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                    }
                    this.loaderservice.hide();
                    // this.dialogBox.popUpOpen2('Transaction updated successfully  but email has not been sent', 'success', 'approval');
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.data = {
                      message: 'Transaction updated successfully  but email has not been sent',
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
                      this.router.navigate(['/internaltrackInvoiceList']);
                    });
                  }

                  // ------------------------------------for dev end -------------------------------------
                }
              });

          }
          else {
            console.log("in");
            $("#selectManager").val(this.enduserStatusDisplay);
            $("#selectuser").val(this.managerStatusDisplay);
            this.submitdone = true;
          }
        });
      }

      else {
        const dialogConfig1 = new MatDialogConfig();
        this.loaderservice.hide();
        dialogConfig1.data = {
          message: 'Do you wish to continue ?',
          condition: "Continue",
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

          // this.dialogBox.popUpOpen_callback_confirm('Do you wish to continue ?', '1', 'confirm',
          //   (value) => {
          //     this.confirmationValue = value;
          // console.log("value is here ==>" + value);

          // this.dialogBox.popUpOpen2
          if (this.confirmationValue == true) {

            if ((this.managernameList.length != 0 || this.selectedColleaguesList.length != 0)) {
              this.internalportalservice.addMultipleManager(this.managerApprovalistArray).subscribe(res => {
                console.log(res[0], '============================');
                if (res[0].message == "Success") {
                  // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
                  if (this.endUserStatus == "On Hold" || this.endUserStatus == "Rejected" || this.endUserStatus == "Approved") {
                    this.internalInvoiceStatusSubmit('N', this.endUserStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                  }
                  // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
                  this.loaderservice.hide();
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    message: 'Transaction updated successfully ',
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
                    this.router.navigate(['/internaltrackInvoiceList']);
                  });
                }
              });

              //  this.internalportalservice.updateEndUserApprovalStatus(this.inVNumber,
              //    this.poNumber,endUserStatus,this.user,this.endUserStage).subscribe(res => {
              //      if (res[0].message == "Success") {
              //  this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');       
              this.router.navigate(['/internaltrackInvoiceList']);
              //      }
              //  });
            }
            else {
              this.loaderservice.hide();
              // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: 'Transaction updated successfully ',
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
                this.router.navigate(['/internaltrackInvoiceList']);
              });
            }
          }
          else {
            $("#selectManager").val(this.enduserStatusDisplay);
            $("#selectuser").val(this.managerStatusDisplay);
            this.submitdone = false;
          }
        });
      }


    }
    else if (this.typeid = "manager") {
      let managerStatus = "";



      if (this.confirmer == true) {
        managerStatus = $("#selectManager").val();
        if (managerStatus == 'P' || managerStatus == 'M') {
          managerStatus == 'M'
        }
      }
      else {
        managerStatus = $("#selectuser").val();
      }

      let manstat = $("#selectManager").val();
      if (manstat == 'V') {
        this.loaderservice.hide();
        this.returnInvoice();

      }
      else {
        //new
        // this.managerStatus = $("#selectManager").val();
        console.log("this.managerStatus " + this.managerStatus);
        // return;
        if (managerStatus != 'A' && this.typeid == "manger") {
          this.endUserStage = 1
        }
        else {
          this.endUserStage = 2;
        }
        if (managerStatus == "M") {
          this.managerStatus = "Pending"
        } else if (managerStatus == "O") {
          this.managerStatus = "On Hold"
        } else if (managerStatus == "R") {
          this.managerStatus = "Rejected"
        } else if (managerStatus == "A") {
          this.managerStatus = "Approved"
        } else if (managerStatus == "P") {
          this.managerStatus = "Pending"
        }
        if (managerStatus != this.managerStatusDisplay) {
          this.loaderservice.hide();
          const dialogConfig1 = new MatDialogConfig();
          dialogConfig1.data = {
            message: 'Do you want to update your GRN/Invoice approval status to ' + this.managerStatus + ' ?',
            condition: this.managerStatus,
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
            this.msgOnButtonClick = value1.messageString;
            this.confirmationValue = result.return;

            if (this.confirmationValue == true) {

              this.loaderservice.show();


              if (this.confirmer == true) {
                console.log("managerStatus " + managerStatus);
                this.internalportalservice.updateManagerConfirmerStatus(this.inVNumber,
                  this.poNumber, managerStatus, this.managerID, 2).subscribe(res => {


                    // ----------------------------------for uat start --------------------------------
                    if (configData.headerDisplay == "prod") {
                      if (res[0].pendingcount == "1" && res[0].message == "Success") {
                        if (res[0].message == "Success") {
                          if (this.managerStatus == "On Hold" || this.managerStatus == "Rejected" || this.managerStatus == "Approved") {
                            this.internalInvoiceStatusSubmit('N', this.managerStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                          }
                          if (res[0].grn) {
                            this.grnnumber = res[0].grn;
                          }
                          else if (res[0].grnlist) {
                            this.grnnumber = res[0].grnlist;
                            this.scrnNumber = res[0].scrnlist;
                          }

                          // this.dialogBox.popUpOpen2('Transaction updated successfully  but email has not been sent', 'success', 'approval');
                          this.loaderservice.hide();
                          const dialogConfig = new MatDialogConfig();
                          if (this.grnnumber != null && this.grnnumber != "" && this.grnnumber != undefined
                            && (this.scrnNumber == null || this.scrnNumber == "" || this.scrnNumber == undefined)) {
                              if(res[0].warningMessage != "")
                              {
                                var showmessage ='Transaction updated successfully. GRN No.' + res[0].grn + ' created for Invoice No. ' + this.inVNumber+'. WARNING: '+res[0].warningMessage;
                              }
                              else
                              {
                                var showmessage =  'Transaction updated successfully. GRN No.' + res[0].grn + ' created for Invoice No. ' + this.inVNumber;
                              }
                            dialogConfig.data = {

                              message: showmessage,
                              condition: 'success',
                              page: 'approval'
                            };
                          }
                          else if (this.grnnumber != null && this.grnnumber != "" && this.grnnumber != undefined
                            && this.scrnNumber != null && this.scrnNumber != "" && this.scrnNumber != undefined) {
                              if(res[0].warningMessage != "")
                              {
                                var showmessage ='Transaction updated successfully. GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.inVNumber+'. WARNING: '+res[0].warningMessage;
                              }
                              else
                              {
                                var showmessage =  'Transaction updated successfully. GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.inVNumber
                              }
                            dialogConfig.data = {

                              message: showmessage,
                              condition: 'success',
                              page: 'approval'
                            };
                          }
                          else {
                            dialogConfig.data = {

                              message: 'Transaction updated successfully ',
                              condition: 'success',
                              page: 'approval'
                            };
                          }

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

                      }
                      else if (res[0].pendingcount != "1" && res[0].message == "Success") {
                        if (this.managerStatus == "On Hold" || this.managerStatus == "Rejected" || this.managerStatus == "Approved") {
                          this.internalInvoiceStatusSubmit('N', this.managerStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                        }
                        this.loaderservice.hide();
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.data = {
                          message: 'Transaction updated successfully',
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
                          this.router.navigate(['/internaltrackInvoiceList']);
                        });

                      }
                      else if (res[0].message != "Success") {
                        this.loaderservice.hide();
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.data = {

                          message: res[0].message,
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
                          this.router.navigate(['/internaltrackInvoiceList']);
                        });
                      }
                    }
                    // ----------------------------------for uat end --------------------------------
                    // ----------------------------------for dev start --------------------------------
                    if (configData.headerDisplay == "dev") {

                      if (res[0].pendingcount == "1" && res[0].message == "Success") {
                        if (res[0].message == "Success") {
                          if (this.managerStatus == "On Hold" || this.managerStatus == "Rejected" || this.managerStatus == "Approved") {
                            this.internalInvoiceStatusSubmit('N', this.managerStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                          }
                          // this.dialogBox.popUpOpen2('Transaction updated successfully  but email has not been sent', 'success', 'approval');
                          if (res[0].grn) {
                            this.grnnumber = res[0].grn;
                          }
                          else if (res[0].grnlist) {
                            this.grnnumber = res[0].grnlist;
                            this.scrnNumber = res[0].scrnlist;
                          }
                          this.loaderservice.hide();
                          // this.dialogBox.popUpOpen2('Transaction updated successfully  but email has not been sent', 'success', 'approval');
                          const dialogConfig = new MatDialogConfig();
                          if (this.grnnumber != null && this.grnnumber != "" && this.grnnumber != undefined
                            && (this.scrnNumber == null || this.scrnNumber == "" || this.scrnNumber == undefined)) {
                            dialogConfig.data = {

                              message: 'Transaction updated successfully. GRN No.' + res[0].grn + ' created for Invoice No. ' + this.inVNumber,
                              condition: 'success',
                              page: 'approval'
                            };
                          }
                          else if (this.grnnumber != null && this.grnnumber != "" && this.grnnumber != undefined
                            && this.scrnNumber != null && this.scrnNumber != "" && this.scrnNumber != undefined) {
                            dialogConfig.data = {

                              message: 'Transaction updated successfully. GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.inVNumber,
                              condition: 'success',
                              page: 'approval'
                            };
                          }
                          else {
                            dialogConfig.data = {

                              message: 'Transaction updated successfully ',
                              condition: 'success',
                              page: 'approval'
                            };
                          }

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

                      }
                      else if (res[0].pendingcount != "1" && res[0].message == "Success") {
                        if (this.managerStatus == "On Hold" || this.managerStatus == "Rejected" || this.managerStatus == "Approved") {
                          this.internalInvoiceStatusSubmit('N', this.managerStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                        }
                        this.loaderservice.hide();
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.data = {
                          message: 'Transaction updated successfully',
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
                          this.router.navigate(['/internaltrackInvoiceList']);
                        });

                      }
                      // ----------------------------------for dev end --------------------------------
                    }
                  });
              }
              else {
                this.internalportalservice.updateManagerApprovalStatus(this.inVNumber,
                  this.poNumber, managerStatus, this.managerID, 2).subscribe(res => {






                    // ----------------------------------for uat start --------------------------------
                    if (configData.headerDisplay == "prod") {

                      if (res[0].message == "Success" && res[0].emailstatus == false) {
                        if (this.managerStatus == "On Hold" || this.managerStatus == "Rejected" || this.managerStatus == "Approved") {
                          this.internalInvoiceStatusSubmit('N', this.managerStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                        }
                        this.loaderservice.hide();
                        // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.data = {
                          message: 'Transaction updated successfully ',
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
                          this.router.navigate(['/internaltrackInvoiceList']);
                        });

                      }
                      else if (res[0].message == "Success" && res[0].emailstatus == true) {
                        if (this.managerStatus == "On Hold" || this.managerStatus == "Rejected" || this.managerStatus == "Approved") {
                          this.internalInvoiceStatusSubmit('N', this.managerStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                        }
                        this.loaderservice.hide();
                        // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.data = {
                          message: 'Transaction updated successfully ',
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
                          this.router.navigate(['/internaltrackInvoiceList']);
                        });


                      }
                    }
                    // ----------------------------------for uat end --------------------------------













                    // ----------------------------------for dev start --------------------------------
                    if (configData.headerDisplay == "dev") {
                      if (res[0].message == "Success" && res[0].emailstatus == false) {
                        if (this.managerStatus == "On Hold" || this.managerStatus == "Rejected" || this.managerStatus == "Approved") {
                          this.internalInvoiceStatusSubmit('N', this.managerStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                        }
                        this.loaderservice.hide();
                        // this.dialogBox.popUpOpen2('Transaction updated successfully  but email has not been sent', 'success', 'approval');
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.data = {
                          message: 'Transaction updated successfully  but email has not been sent',
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
                          this.router.navigate(['/internaltrackInvoiceList']);
                        });
                      }
                      else if (res[0].message == "Success" && res[0].emailstatus == true) {
                        if (this.managerStatus == "On Hold" || this.managerStatus == "Rejected" || this.managerStatus == "Approved") {
                          this.internalInvoiceStatusSubmit('N', this.managerStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                        }
                        // this.dialogBox.popUpOpen2('Transaction updated successfully  and email has been sent successfully', 'success', 'approval');
                        this.loaderservice.hide();
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.data = {
                          message: 'Transaction updated successfully  and email has been sent successfully',
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
                          this.router.navigate(['/internaltrackInvoiceList']);
                        });
                      }

                      // ----------------------------------for dev end --------------------------------
                    }
                  });
              }

            }
            else {
              $("#selectManager").val(this.enduserStatusDisplay);
              $("#selectuser").val(this.managerStatusDisplay);
              this.submitdone = false;
            }
          });
        }
        else {





          this.loaderservice.hide();
          const dialogConfig1 = new MatDialogConfig();
          dialogConfig1.data = {
            message: 'Do you wish to continue ?',
            condition: "Continue",
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
            this.msgOnButtonClick = value1.messageString;

            this.confirmationValue = result.return;

            // this.dialogBox.popUpOpen_callback_confirm('Do you wish to continue ?', '1', 'confirm',
            //   (value) => {
            //     this.confirmationValue = value;
            if (this.confirmationValue == true) {
              // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
              this.loaderservice.hide();
              const dialogConfig = new MatDialogConfig();
              dialogConfig.data = {
                message: 'Transaction updated successfully ',
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
                this.router.navigate(['/internaltrackInvoiceList']);
              });
            }
            else {
              $("#selectManager").val(this.enduserStatusDisplay);
              $("#selectuser").val(this.managerStatusDisplay);
              this.submitdone = false;
            }
          });
          this.submitdone = false;
        }
      }

    }

    // });
  }

  addMultiManagers() {
    //new
    this.confirmerlist = [];
    this.managerConfirmerlistArray = [];
    let endUserStatus = $("#selectManager").val();
    if (this.typeid == "enduser") {
      this.endUserStage = 1
    }
    else {
      this.endUserStage = 2;
    }
    if (endUserStatus == "P") {
      this.endUserStatus = "Pending"
    } else
      if (endUserStatus == "O") {
        this.endUserStatus = "On Hold"
      } else if (endUserStatus == "R") {
        this.endUserStatus = "Rejected"
      } else if (endUserStatus == "A") {
        this.endUserStatus = "Approved"
      }
    console.log("name------")
    if (endUserStatus != this.enduserStatusDisplay) {
      this.loaderservice.hide();
      const dialogConfig1 = new MatDialogConfig();
      dialogConfig1.data = {
        message: 'Do you want to update your GRN/Invoice approval status to ' + this.endUserStatus + ' ?',
        condition: this.endUserStatus,
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
        this.msgOnButtonClick = value1.messageString;
        this.confirmationValue = result.return;

        // this.dialogBox.popUpOpen_callback_confirm('Do you want to update your invoice status to ' + this.endUserStatus + '?', '1', 'confirm',
        //   (value) => {
        //     this.confirmationValue = value;
        //     console.log("value is here ==>" + value);

        // this.dialogBox.popUpOpen2
        if (this.confirmationValue == true) {

          this.loaderservice.show();
          if (this.self) {
            this.internalportalservice.addMultipleManager(this.managerApprovalistArray).subscribe(res => {
              console.log(res[0], '============================');
              this.loaderservice.hide();
              if (res[0].message == "Success") {

                // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
                if (this.endUserStatus == "On Hold" || this.endUserStatus == "Rejected" || this.endUserStatus == "Approved") {
                  this.internalInvoiceStatusSubmit('N', this.endUserStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                }
                // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');

                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = {
                  message: 'Transaction updated successfully ',
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
                  this.router.navigate(['/internaltrackInvoiceList']);
                });

              }
            });
          }
          else if (this.behalf) {
            var data = "";
            for (var i = 0; i < this.managerApprovalistArray.length; i++) {


              data = this.managerApprovalistArray[i].enduserid + "," + this.managerApprovalistArray[i].enduserstatus
                + "," + this.managerApprovalistArray[i].eumanager + "," + this.managerApprovalistArray[i].invoicedate
                + "," + this.managerApprovalistArray[i].invoicenumber + "," + this.managerApprovalistArray[i].managercount
                + "," + this.managerApprovalistArray[i].ponumber + "," + this.managerApprovalistArray[i].stage
                + "," + this.managerApprovalistArray[i].status + "," + this.managerApprovalistArray[i].storekeeperaction
                + "," + this.managerApprovalistArray[i].totalamount + "," + this.managerApprovalistArray[i].vendorid;

              this.managerConfirmerlistArray.push(data);
            }
            console.log(this.managerConfirmerlistArray, " this.managerConfirmerlistArray");
            for (var k = 0; k < this.selectedConfirmatoryList.length; k++) {
              this.confirmerlist.push(this.selectedConfirmatoryList[k].email)
            }
            console.log("this.selectedConfirmatoryList " + this.selectedConfirmatoryList);

            this.internalportalservice.addMultipleManagerandConfirmers(this.managerConfirmerlistArray, this.confirmerlist).subscribe(res => {
              console.log(res[0], '============================');
              this.loaderservice.hide();
              if (res[0].message == "Success") {
                // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
                if (this.endUserStatus == "On Hold" || this.endUserStatus == "Rejected" || this.endUserStatus == "Approved") {
                  this.internalInvoiceStatusSubmit('N', this.endUserStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                }
                // this.loaderservice.hide();
                // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
                const dialogConfig = new MatDialogConfig();
                dialogConfig.data = {
                  message: 'Transaction updated successfully ',
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
                  this.router.navigate(['/internaltrackInvoiceList']);
                });

              }
            });
          }
          // old

        }
        else {
          $("#selectManager").val(this.enduserStatusDisplay);
          $("#selectuser").val(this.managerStatusDisplay);
          this.submitdone = true;
        }
      });
    }
    else {
      const dialogConfig1 = new MatDialogConfig();

      dialogConfig1.data = {
        message: 'Do you wish to continue ?',
        condition: "Continue",
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
        this.msgOnButtonClick = value1.messageString;
        this.confirmationValue = result.return;

        // this.dialogBox.popUpOpen_callback_confirm('Do you wish to continue ?', '1', 'confirm',
        //   (value) => {
        //     this.confirmationValue = value;
        // console.log("value is here ==>" + value);

        // this.dialogBox.popUpOpen2
        if (this.confirmationValue == true) {
          this.loaderservice.show();
          if ((this.managernameList.length != 0 || this.selectedColleaguesList.length != 0
            || this.selectedConfirmatoryList != 0)) {

            if (this.self) {
              this.internalportalservice.addMultipleManager(this.managerApprovalistArray).subscribe(res => {
                console.log(res[0], '============================');
                this.loaderservice.hide();
                if (res[0].message == "Success") {
                  if (this.endUserStatus == "On Hold" || this.endUserStatus == "Rejected" || this.endUserStatus == "Approved") {
                    this.internalInvoiceStatusSubmit('N', this.endUserStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                  }

                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    message: 'Transaction updated successfully ',
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
                    this.router.navigate(['/internaltrackInvoiceList']);
                  });

                }
              });
            }
            else if (this.behalf) {

              var data = "";

              for (var i = 0; i < this.managerApprovalistArray.length; i++) {
                data = this.managerApprovalistArray[i].enduserid + "," + this.managerApprovalistArray[i].enduserstatus
                  + "," + this.managerApprovalistArray[i].eumanager + "," + this.managerApprovalistArray[i].invoicedate
                  + "," + this.managerApprovalistArray[i].invoicenumber + "," + this.managerApprovalistArray[i].managercount
                  + "," + this.managerApprovalistArray[i].ponumber + "," + this.managerApprovalistArray[i].stage
                  + "," + this.managerApprovalistArray[i].status + "," + this.managerApprovalistArray[i].storekeeperaction
                  + "," + this.managerApprovalistArray[i].totalamount + "," + this.managerApprovalistArray[i].vendorid;

                this.managerConfirmerlistArray.push(data);
              }
              console.log("this.selectedConfirmatoryList " + this.selectedConfirmatoryList);
              for (var k = 0; k < this.selectedConfirmatoryList.length; k++) {
                this.confirmerlist.push(this.selectedConfirmatoryList[k].email)
              }
              this.internalportalservice.addMultipleManagerandConfirmers(this.managerConfirmerlistArray, this.confirmerlist).subscribe(res => {
                console.log(res[0], '============================');
                this.loaderservice.hide();
                if (res[0].message == "Success") {
                  if (this.endUserStatus == "On Hold" || this.endUserStatus == "Rejected" || this.endUserStatus == "Approved") {
                    this.internalInvoiceStatusSubmit('N', this.endUserStatus + " - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
                  }

                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.data = {
                    message: 'Transaction updated successfully ',
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
                    this.router.navigate(['/internaltrackInvoiceList']);
                  });

                }
              });
            }


          }
          else {
            // this.dialogBox.popUpOpen2('Transaction updated successfully ', 'success', 'approval');
            this.loaderservice.hide();
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = {
              message: 'Transaction updated successfully ',
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
              this.router.navigate(['/internaltrackInvoiceList']);
            });
          }
        }
        else {
          $("#selectManager").val(this.enduserStatusDisplay);
          $("#selectuser").val(this.managerStatusDisplay);
          this.submitdone = false;
        }
      });
    }


  }


  // downloadfile() {
  //   this.loaderservice.show();
  //   console.log(this.savedfilename);
  //   this.trackOrderListService.getfile(this.savedfilename,'listdownload')
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
  //           window.navigator.msSaveOrOpenBlob(blob, this.actualfilename);
  //         }
  //         else if (agent.indexOf('firefox') > -1) {
  //           var byteCharacters = atob(data);
  //           var byteNumbers = new Array(byteCharacters.length);
  //           for (var i = 0; i < byteCharacters.length; i++) {
  //             byteNumbers[i] = byteCharacters.charCodeAt(i);
  //           }
  //           var byteArray = new Uint8Array(byteNumbers);
  //           var blob = new Blob([byteArray], { type: "application/octet-stream" });
  //           saveAs(blob, this.actualfilename);
  //         }
  //         else {
  //           console.log(data, 'data')
  //           let FileToDownload = 'data:application/octet-stream;base64,' + data;
  //           var link = document.createElement("a");
  //           const filename = this.actualfilename;
  //           link.href = FileToDownload;
  //           link.download = filename;
  //           link.click();


  //         }
  //         this.loaderservice.hide();
  //       }
  //     }, err => {
  //       this.loaderservice.hide();
  //       console.log(JSON.stringify(err))
  //     }
  //     );
  // }

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
              // link.click();
              var extensionName = filename.substr(filename.lastIndexOf('.') + 1)
              this.getFileType(extensionName);
              this.trackOrderListService.downloadEncryptedFile(data, this.extensionType);
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
  getFileType(extensionName) {
    console.log("extensionName" + extensionName);
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
  btnRight(e) {
    this.optionsadded = [];
    this.managernameList = [];
    var selectedOpts = $('#lstBox1 option:selected');
    console.log("selectedOpts", selectedOpts);
    for (var k = 0; k < selectedOpts.length; k++) {
      console.log(selectedOpts[k].value);
      // console.log(JSON.stringify(selectedOpts[k]));
      this.managernameList.push(selectedOpts[k].value)
    }
    if (selectedOpts.length == 0) {
      alert("Nothing to move.");
      e.preventDefault();
    }
    $('#lstBox2').append($(selectedOpts).clone());
    $(selectedOpts).remove();
    e.preventDefault();
  }


  btnLeft(e) {
    var selectedOpts = $('#lstBox2 option:selected');
    if (selectedOpts.length == 0) {
      alert("Nothing to move.");
      e.preventDefault();
    }

    $('#lstBox1').append($(selectedOpts).clone());
    $(selectedOpts).remove();
    e.preventDefault();
  }


  receivedMessageHandler(p) {
    this.msgOnButtonClick = p;
    console.log("uyguyggyygugyj-----------------------------------------------------------------", this.msgOnButtonClick);
  }

  downloadPOpdf(po_number, singlepodownload) {
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
        }
        this.loaderservice.hide();
        if (result[0].status == "Fail") {
          // this.dialogBox.popUpOpen2(result[0].message, 'error', 'profiledata');
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = {
            message: result[0].message,
            condition: 'error',
            page: 'profiledata'
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
      }, err => {
        this.loaderservice.hide();
        console.log(JSON.stringify(err))
      }
      );

  }

  sendConfirmation(status, message, subject, topic) {
    this.internalportalservice.submitInternalInvoiceChat("", this.poNumber, this.inVNumber, status, message, subject, topic).subscribe(res => {

      if (res[0].message == "Success") {

      }

    })
  }

  internalInvoiceStatusSubmit(status, message, subject, topic) {
    this.internalportalservice.internalInvoiceStatusSubmit("", this.poNumber, this.inVNumber, status, message, subject, topic).subscribe(res => {

      if (res[0].message == "Success") {

      }




    })
  }

  getlineitemdetails() {
    this.storagelist = [];
    this.locationlist = [];
    console.log("in here");
    this.internalportalservice.getlistitemsforinvoicenumbers(this.inVNumber, this.poNumber).subscribe(res => {
      if (res[0].message == "Success") {

        this.invoicedata = res[0].poData;
        console.log("this.invoicedata[0].ACCEPTEDQTY " + this.invoicedata[0].ACCEPTEDQTY);
        if (this.invoicedata[0].ACCEPTEDQTY == null || this.invoicedata[0].ACCEPTEDQTY == 0) {
          this.quantitiesaccepted = false;
          console.log("in if");
        }
        else {
          console.log("in else");

          this.quantitiesaccepted = true;
        }
        this.invoicedata = this.invoicedata.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
        for (let i = 0; i < this.invoicedata.length; i++) {
          // this.invoicedata[i].RATEPERQTY = Number(this.invoicedata[i].RATEPERQTY).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          // this.invoicedata[i].INVOICEAMOUNT = Number(this.invoicedata[i].INVOICEAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
          // storagelocation.value(this.invoicedata[i].STORAGELOCATION)
          // $("#storagelocation" + i).val(this.invoicedata[i].STORAGELOCATION);
          if (this.invoicedata[0].OVERALLSTATUS == "V") {
            this.hide = false;
          }
          else {
            this.hide = true;
          }
          // console.log("this.invoicedata[i].STORAGELOCATION "+this.invoicedata[i].STORAGELOCATION);
          console.log("this.invoicedata[i].STORAGELOCATION " + this.invoicedata[i].STORAGELOCATION);
          // if(this.invoicedata[i].STORAGELOCATION != null && this.invoicedata[i].STORAGELOCATION !="-")
          // {
          this.seletedValue[i] = this.invoicedata[i].STORAGELOCATION;
          if (this.invoicedata[i].ACCEPTEDQTY == null) {
            this.invoicedata[i].ACCEPTEDQTY = 0.00;
          }
          this.invoicedata[i].TOTALCALCULATEAMOUNT = Number(parseFloat(this.invoicedata[i].RATEPERQTY) * parseFloat(this.invoicedata[i].ACCEPTEDQTY));
          this.invoicedata[i].RATEPERQTY = parseFloat(this.invoicedata[i].RATEPERQTY);
          // this.seletedValue[i] = "5000";
          // }

        }
        console.log(this.submitdone);
        console.log(this.usertype);
        console.log(this.selectedConfirmatoryList.length);
        console.log(this.behalf);
        console.log(this.customManagerList.length, "customManagerList.length");
        console.log("this.invoicedata[0].ENDUSERREMARKS" + this.invoicedata[0].ENDUSERREMARKS);
        if (this.invoicedata[0].ENDUSERREMARKS != null) {
          // this.enduserremarkspresent = $("#enduserremarks").val(this.invoicedata[0].ENDUSERREMARKS);
          this.enduserremarkspresent = this.invoicedata[0].ENDUSERREMARKS;
        }
        else {
          this.enduserremarkspresent = "No Remarks Present";
        }


        console.log("this.invoicedata ==>", this.invoicedata);
        this.invoicenumber = this.inVNumber;
        this.ponumberfortrack = this.poNumber;
        this.status = this.invoicedata[0].OVERALLSTATUS;
        this.invoicedate = this.invoicedata[0].INVOICEDATE;
        this.invoiceamount = this.invoicedata[0].INVOICEAMOUNT;
        this.bussinesspartneroid = this.invoicedata[0].BUSINESSPARTNEROID
        this.paidamount = 0;
        this.user = this.invoicedata[0].CONTACTPERSON;
        // this.totalamount = this.invoicedata[0].TOTALAMOUNT;
        // this.totalamount = Number(this.invoicedata[0].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
        this.description = this.invoicedata[0].DESCRIPTION;
        this.vendorremarks = this.invoicedata[0].VENDORREMARKS;
        this.enduserremarks = this.invoicedata[0].USERREMARK;
        this.billofladingdate = this.invoicedata[0].BILLOFLADINGDATE;
        this.actualfilename = this.invoicedata[0].ACTUALFILENAME;
        console.log(this.actualfilename, 'actualfilename');
        this.savedfilename = this.invoicedata[0].SAVEDFILENAME;
        this.submitteddate = this.invoicedata[0].INVOICEDATE;
        this.totalamount = Number(this.invoicedata[0].TOTALAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
        this.taxAmount = Number(this.invoicedata[0].TAXAMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
        this.amtexcltax = (Number(this.invoicedata[0].TOTALAMOUNT) - Number(this.invoicedata[0].TAXAMOUNT)).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');

        this.internalportalservice.getstoragelocation(this.invoicedata[0].PLANT).subscribe(res1 => {
          if (res1[0].message == "Success") {
            this.locationlist = res1[0].storagelist;

            for (var a = 0; a < this.locationlist.length; a++) {
              // { storagelocation: string; locationdesc: string; }
              this.storagelist.push({ storagelocation: this.locationlist[a].STORAGELOCATION, locationdesc: this.locationlist[a].LOCATIONDESC })

            }
            console.log("this.storagelist ==>" + this.storagelist);
            for (let i = 0; i < this.invoicedata.length; i++) {
              this.invoicedata[i].RATEPERQTY = Number(this.invoicedata[i].RATEPERQTY)
              // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
              this.invoicedata[i].INVOICEAMOUNT = Number(this.invoicedata[i].INVOICEAMOUNT)
              // .toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')

              console.log("this.invoicedata[i].STORAGELOCATION " + this.invoicedata[i].STORAGELOCATION);
              console.log("this.storagelist[k].storagelocation " + this.locationlist[i].STORAGELOCATION);

              for (var k = 0; k < this.locationlist.length; k++) {
                if (this.locationlist[k].STORAGELOCATION == this.invoicedata[i].STORAGELOCATION) {
                  // this.seletedValue[i] = this.locationlist[k].LOCATIONDESC;
                  this.invoicedata[i].STORAGELOCATION = this.locationlist[k].LOCATIONDESC;
                  console.log("this.invoicedata[i].STORAGELOCATION in if " + this.invoicedata[i].STORAGELOCATION);
                  console.log(this.locationlist[k].LOCATIONDESC);
                }
              }

              // this.seletedValue[i] = "5000";
              // }

            }



          }
        });

      }
    });
  }

  numberOnly(event, i): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    console.log($('#AcceptedQtyId' + i).val());

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 46

      || ($('#AcceptedQtyId' + i).val().split('.').length === 2))) {

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

  hasDecimalPlace(value, x) {
    var pointIndex = value.indexOf('.');
    return pointIndex >= 0 && pointIndex < value.length - x;
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
    // if(this.ArrayOfSelectedFile[index]!=undefined ||this.ArrayOfSelectedFile[index].name != undefined )
    // {
    //   this.ArrayOfSelectedFile.splice(index, 1);
    // }
    console.log("this.ArrayOfSelectedFilename" + this.ArrayOfSelectedFilename.length);
  }

  checkacceptedquantity(event, invoicequantity, rownum) {

    console.log("event is here ==> " + event.target.value);
    console.log("acceptedquantity is here ==> " + invoicequantity);
    if ((parseFloat(event.target.value) > parseFloat(invoicequantity))) {

      $('#exceeded' + rownum).show();
      $('#zero' + rownum).hide();
      this.nullacceptedvalue = true;
      console.log("in 1");
      return;
    }
    else if (event.target.value == "") {
      $('#exceeded' + rownum).hide();
      $('#zero' + rownum).show();
      this.nullacceptedvalue = true;
      console.log("in 2");
      return;

    }
    else if (event.target.value != "" && (parseFloat(event.target.value) <= parseFloat(invoicequantity))) {
      $('#exceeded' + rownum).hide();
      $('#zero' + rownum).hide();
      this.nullacceptedvalue = false;
      console.log("in 3");
    }
    else {
      this.nullacceptedvalue = true;
      console.log("in 4");
    }
    // debugger;
    if (this.nullacceptedvalue == false) {
      for (let i = 0; i < this.invoicedata.length; i++) {
        console.log("parseFloat($('#AcceptedQtyId' + i).val() " + parseFloat($('#AcceptedQtyId' + i).val()));
        if (parseFloat($('#AcceptedQtyId' + i).val()) > parseFloat(this.invoicedata[i].QUANTITY) || $('#AcceptedQtyId' + i).val() == "") {
          this.nullacceptedvalue = true;
          console.log("in 5");
          break;
        }
        else if (parseFloat($('#AcceptedQtyId' + i).val()) <= parseFloat(invoicequantity) && $('#AcceptedQtyId' + i).val() != "") {
          this.nullacceptedvalue = false;
          console.log("in 6");
        }
      }
    }

  }

  calculateAmount(event, ratePerQuantity, index) {
    for (let i = 0; i < this.invoicedata.length; i++) {
      if (index == i) {
        this.invoicedata[index].INVOICEAMOUNT = parseFloat(event.target.value) * parseFloat(ratePerQuantity.replace(/,/g, ''));
        if (isNaN(this.invoicedata[index].INVOICEAMOUNT)) {
          this.invoicedata[index].INVOICEAMOUNT = 0.00;
        }
      }
    }
  }

  getstoragelocation(plant) {
    this.internalportalservice.getstoragelocation(plant).subscribe(res => {
      if (res[0].message == "Success") {
        this.locationlist = res[0].storagelist;
        this.storagelist = [];
        for (var a = 0; a < this.locationlist.length; a++) {
          // { storagelocation: string; locationdesc: string; }
          this.storagelist.push({ storagelocation: this.locationlist[a].STORAGELOCATION, locationdesc: this.locationlist[a].LOCATIONDESC })
        }
      }
    });
  }

  // submitgrn() {
  //   this.CloseconfirmAcceptQuantityPopup();
  //   this.actiontaken = true;
  //   this.shortpresent = false;
  //   // var storagelocation = $("#storagelocation" + k).val();
  //   // console.log("storagelocation ==>" + storagelocation);
  //   var username = sessionStorage.getItem('username');
  //   this.multiplesavedfilename = "";
  //   this.multipleactualfilename = "";
  //   for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
  //     this.multipleactualfilename = this.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
  //   }
  //   for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
  //     this.multiplesavedfilename = this.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
  //   }
  //   this.multipleactualfilename = this.multipleactualfilename.slice(0, -1);
  //   this.multiplesavedfilename = this.multiplesavedfilename.slice(0, -1);
  //   console.log("this.delivery.multipleactualfilename ", this.multipleactualfilename);
  //   console.log("this.delivery.multiplesavedfilename ", this.multiplesavedfilename);
  //   // +","+this.multipleactualfilename
  //   // +","+this.multiplesavedfilename+","+ $('#enduserremarks' + k).val()
  //   this.internalportalservice.getportalid(username).
  //     subscribe(res2 => {

  //       if (res2[0].message == "Success") {
  //         var portalid = res2[0].portalid;
  //         for (var k = 0; k < this.invoicedata.length; k++) {
  //           this.createSubmissionsModel = new createDeliveryInvoiceSubmissionsModel()

  //           this.createSubmissionsModel.po_num = this.invoicedata[k].PO_NUMBER;
  //           this.createSubmissionsModel.invoiceNumber = this.invoicedata[k].INVOICENUMBER;
  //           this.createSubmissionsModel.lineItemNumber = this.invoicedata[k].LINEITEMNUMBER;
  //           // this.invoicedata[k].SERVICENUMBER;
  //           this.createSubmissionsModel.acceptedqty = $('#AcceptedQtyId' + k).val();
  //           var storagelocation = $("#storagelocation" + k).val();
  //           console.log("this.invoicedata[k].INVOICEDATE " + this.invoicedata[k].INVOICEDATE);
  //           // var invoicedate = moment(new Date(this.invoicedata[k].INVOICEDATE)).format("YYYYMMDD");
  //           // console.log("Invoice date is here "+invoicedate);
  //           console.log("storage location is here before this.invoicedata[k].STORAGELOCATION" + this.invoicedata[k].STORAGELOCATION);
  //           console.log("storage location is here before " + storagelocation);
  //           var invoicedate = moment(new Date(this.invoicedata[k].INVOICEDATE)).format("DD-MMM-YYYY");
  //           console.log("Invoice date is here " + invoicedate);

  //           if (storagelocation == undefined) {
  //             if (this.invoicedata[k].STORAGELOCATION != undefined) {
  //               storagelocation = this.invoicedata[k].STORAGELOCATION;
  //             }
  //             else {
  //               storagelocation = "-";
  //             }

  //           }
  //           else if (storagelocation == '--SELECT STORAGE--') {
  //             storagelocation = "-";
  //           }
  //           console.log("storage location is here after " + storagelocation);
  //           var servicearray = [];

  //           // for dev start 
  //           if (configData.headerDisplay == "dev") {
  //             var data = "";

  //             if (!this.invoicedata[k].LINEITEMNUMBER.includes('-')) {

  //               data = this.invoicedata[k].PO_NUMBER + "," + this.invoicedata[k].INVOICENUMBER
  //                 + "," + this.invoicedata[k].LINEITEMNUMBER + "," + $('#AcceptedQtyId' + k).val()
  //                 + "," + storagelocation + "," + username + "," + portalid;
  //             }
  //             else {
  //               // servicearray = this.invoicedata[k].LINEITEMNUMBER.split('-');
  //               data = this.invoicedata[k].PO_NUMBER
  //                 + "," + this.invoicedata[k].LINEITEMNUMBER + "," + this.invoicedata[k].SERVICENUMBER
  //                 + "," + this.invoicedata[k].INVOICENUMBER + "," + invoicedate
  //                 + "," + $('#AcceptedQtyId' + k).val() + "," + storagelocation
  //                 + "," + username + "," + portalid;
  //             }


  //             // for dev end
  //           }

  //           else if(configData.headerDisplay=="prod"){

  //           // for uat start 
  //           var data = "";
  //           if(!this.invoicedata[k].LINEITEMNUMBER.includes('-'))
  //           {
  //           data =
  //             this.invoicedata[k].PO_NUMBER + "," + this.invoicedata[k].LINEITEMNUMBER+"," 
  //             + invoicedate+"," + this.invoicedata[k].INVOICENUMBER 
  //             + "," + $('#AcceptedQtyId' + k).val() + "," + storagelocation
  //             + "," +username+","+portalid;
  //           }
  //           else
  //           {

  //             data = this.invoicedata[k].PO_NUMBER 
  //             + "," +this.invoicedata[k].LINEITEMNUMBER+","+ this.invoicedata[k].SERVICENUMBER
  //             +","+this.invoicedata[k].INVOICENUMBER + "," + invoicedate
  //             +","+ $('#AcceptedQtyId' + k).val() + "," + storagelocation
  //             + "," + username+","+portalid;
  //           }

  //           }
  //           // for uat end 
  //           this.invoicesubmissionarray.push(data);
  //         }
  //         console.log("this.invoicesubmissionarray ==> ", this.invoicesubmissionarray);
  //         if (!this.invoicedata[0].LINEITEMNUMBER.includes('-')) {
  //           this.internalportalservice.updateacceptedquantityofinvoice(this.invoicesubmissionarray).
  //             subscribe(res => {

  //               if (res[0].message == "Success") {

  //                 this.grnnumber = res[0].grn;

  //                 this.internalportalservice.updateenduseretails(this.multipleactualfilename, this.multiplesavedfilename,
  //                   $('#enduserremarks').val(), this.invoicedata[0].INVOICENUMBER, this.invoicedata[0].PO_NUMBER).
  //                   subscribe(res1 => {
  //                     if (res1[0].message == "Success") {
  //                       for (var p = 0; p < this.invoicedata.length; p++) {
  //                         if (parseFloat($('#AcceptedQtyId' + p).val()) < parseFloat(this.invoicedata[p].QUANTITY)) {
  //                           this.shortpresent = true;
  //                           this.CreateCreditAdviceModel = new createCreditAdviceModel();
  //                           this.CreateCreditAdviceModel.invoicenumber = this.invoicedata[p].INVOICENUMBER;
  //                           this.CreateCreditAdviceModel.lineitemnumber = this.invoicedata[p].LINEITEMNUMBER;
  //                           this.CreateCreditAdviceModel.ponumber = this.invoicedata[p].PO_NUMBER;
  //                           this.CreateCreditAdviceModel.rateperqty = this.invoicedata[p].RATEPERQTY.replace(/,/g, '');
  //                           this.CreateCreditAdviceModel.bid = this.invoicedata[p].BUSINESSPARTNEROID;
  //                           this.CreateCreditAdviceModel.totalamount = this.invoicedata[p].TOTALAMOUNT;
  //                           this.CreateCreditAdviceModel.lineItemDesc = this.invoicedata[p].LINEITEMTEXT;
  //                           // this.CreateCreditAdviceModel.emailid = sessionStorage.getItem("username");

  //                           this.sortqty = parseFloat(this.invoicedata[p].QUANTITY) - parseFloat($('#AcceptedQtyId' + p).val());
  //                           this.sortqty = this.sortqty.toString();
  //                           this.CreateCreditAdviceModel.sortqty = this.sortqty;
  //                           this.CreateCreditAdviceModel.amount = "0.0";
  //                           this.creditAdviceArray.push(this.CreateCreditAdviceModel);
  //                           console.log("this.creditAdviceArray ==>", this.creditAdviceArray);

  //                         }
  //                       }
  //                       if (this.shortpresent == true) {
  //                         this.grnpresent = false;
  //                         this.trackOrderListService.createCreditAdvice(this.creditAdviceArray).subscribe(res3 => {
  //                           // this.dialogBox.popUpOpen2(res[0].message ,'success','approval');
  //                           if (res3[0].message = "shortfall Creditadvice created Sucess") {
  //                             if (res3[0].grn != "") {
  //                               this.usertype = "enduser";
  //                               // this.grnpresent = true;
  //                               console.log("res3 is here ==> " + res3[0].grn);
  //                               this.getlineitemdetails()
  //                               this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
  //                               this.dialogBox.grnAdvicePopUp('success', 'grndoneofapproval', this.grnnumber, this.invoicedata[0].INVOICENUMBER);
  //                               // this.dialogBox.popUpOpen2('GRN No.'+this.grnnumber+' created for Invoice No. '+this.invoicedata[0].INVOICENUMBER +'Request for Credit Note sent to the Vendor','success','grndoneofapproval');
  //                             }
  //                             else {
  //                               // this.grnpresent = false;
  //                             }
  //                           }
  //                         })
  //                       }
  //                       else {

  //                         if (res[0].grn != "") {
  //                           this.usertype = "enduser";
  //                           this.grnpresent = true;
  //                           console.log("res is here ==> " + res[0].grn);
  //                           this.getlineitemdetails()
  //                           this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
  //                           // this.dialogBox.popUpOpen2('GRN No.' + res[0].grn + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER, 'success', 'grndoneofapproval');
  //                           const dialogConfig = new MatDialogConfig();
  //                           dialogConfig.data = {
  //                             message: 'GRN No.' + res[0].grn + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER,
  //                             condition: 'success',
  //                             page: 'grndoneofapproval'
  //                           };
  //                           const mydata = dialogConfig.data;
  //                           console.log("PopupComponent", mydata);

  //                           const dialogRef = this.dialog.open(PopupComponent, {
  //                             panelClass: 'custom-modalbox',

  //                             width: '400px',
  //                             data: { datakey: dialogConfig.data }

  //                           });
  //                           dialogRef.afterClosed().subscribe(result => {
  //                             console.log(`Dialog result1: ${result}`);
  //                             // this.router.navigate(['/internaltrackInvoiceList']);
  //                           });


  //                         }

  //                         else {
  //                           this.grnpresent = false;
  //                         }
  //                       }
  //                     }
  //                   });
  //               }
  //               else {
  //                 // this.dialogBox.popUpOpen2(res[0].message, 'success', 'grndoneofapproval');
  //                 const dialogConfig = new MatDialogConfig();
  //                           dialogConfig.data = {
  //                             message: res[0].message,
  //                             condition: 'success',
  //                             page: 'grndoneofapproval'
  //                           };
  //                           const mydata = dialogConfig.data;
  //                           console.log("PopupComponent", mydata);

  //                           const dialogRef = this.dialog.open(PopupComponent, {
  //                             panelClass: 'custom-modalbox',

  //                             width: '400px',
  //                             data: { datakey: dialogConfig.data }

  //                           });
  //                           dialogRef.afterClosed().subscribe(result => {
  //                             console.log(`Dialog result1: ${result}`);
  //                             this.router.navigate(['/internaltrackInvoiceList']);
  //                           });

  //               }


  //             });
  //         }
  //         else {
  //           this.internalportalservice.updateacceptedservicequantityofinvoice(this.invoicesubmissionarray).
  //             subscribe(res => {

  //               if (res[0].message == "Success") {
  //                 this.grnnumberlistcommaseperated = res[0].grnlist;
  //                 this.scrnnumberlistcommaseperated = res[0].scrnlist;
  //                 console.log("===============>", this.scrnnumberlistcommaseperated);

  //                 // this.grnnumber = res[0].grn;
  //                 this.internalportalservice.updateenduseretails(this.multipleactualfilename, this.multiplesavedfilename,
  //                   $('#enduserremarks').val(), this.invoicedata[0].INVOICENUMBER, this.invoicedata[0].PO_NUMBER).
  //                   subscribe(res1 => {
  //                     if (res1[0].message == "Success") {
  //                       for (var p = 0; p < this.invoicedata.length; p++) {
  //                         if (parseFloat($('#AcceptedQtyId' + p).val()) < parseFloat(this.invoicedata[p].QUANTITY)) {
  //                           this.shortpresent = true;
  //                           this.CreateCreditAdviceModel = new createCreditAdviceModel();
  //                           this.CreateCreditAdviceModel.invoicenumber = this.invoicedata[p].INVOICENUMBER;
  //                           this.CreateCreditAdviceModel.lineitemnumber = this.invoicedata[p].LINEITEMNUMBER;
  //                           this.CreateCreditAdviceModel.ponumber = this.invoicedata[p].PO_NUMBER;
  //                           this.CreateCreditAdviceModel.rateperqty = this.invoicedata[p].RATEPERQTY.replace(/,/g, '');
  //                           this.CreateCreditAdviceModel.bid = this.invoicedata[p].BUSINESSPARTNEROID;
  //                           this.CreateCreditAdviceModel.totalamount = this.invoicedata[p].TOTALAMOUNT;
  //                           this.CreateCreditAdviceModel.lineItemDesc = this.invoicedata[p].LINEITEMTEXT;

  //                           this.sortqty = parseFloat(this.invoicedata[p].QUANTITY) - parseFloat($('#AcceptedQtyId' + p).val());
  //                           this.sortqty = this.sortqty.toString();
  //                           this.CreateCreditAdviceModel.sortqty = this.sortqty;
  //                           this.CreateCreditAdviceModel.amount = "0.0";
  //                           this.creditAdviceArray.push(this.CreateCreditAdviceModel);
  //                           console.log("this.creditAdviceArray ==>", this.creditAdviceArray);

  //                         }
  //                       }
  //                       if (this.shortpresent == true) {
  //                         this.grnpresent = false;
  //                         this.trackOrderListService.createCreditAdvice(this.creditAdviceArray).subscribe(res3 => {
  //                           // this.dialogBox.popUpOpen2(res[0].message ,'success','approval');
  //                           if (res3[0].message = "shortfall Creditadvice created Sucess") {
  //                             // if (res3[0].grn != "") {
  //                             //   this.usertype = "enduser";
  //                             //   // this.grnpresent = true;
  //                             //   console.log("res3 is here ==> " + res3[0].grn);
  //                             //   this.getlineitemdetails()
  //                             //   this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
  //                             //   this.dialogBox.grnAdvicePopUp('success', 'grndoneofapproval', this.grnnumber, this.invoicedata[0].INVOICENUMBER);
  //                             //   // this.dialogBox.popUpOpen2('GRN No.'+this.grnnumber+' created for Invoice No. '+this.invoicedata[0].INVOICENUMBER +'Request for Credit Note sent to the Vendor', );
  //                             // }
  //                             if (res[0].grnlist != "") {
  //                               this.usertype = "enduser";
  //                               this.grnpresent = true;
  //                               console.log("res is here ==> " + res[0].grn);
  //                               this.getlineitemdetails()
  //                               this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
  //                               // this.dialogBox.popUpOpen2('GRN No. ' + res[0].grnlist + ' and SRCN No. ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER + '. Request for Credit Note sent to the Vendor', 'success', 'grndoneofapproval');
  //                               const dialogConfig = new MatDialogConfig();
  //                               dialogConfig.data = {
  //                                 message: 'GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER,
  //                                 condition: 'success',
  //                                 page: 'grndoneofapproval'
  //                               };
  //                               const mydata = dialogConfig.data;
  //                               console.log("PopupComponent", mydata);

  //                               const dialogRef = this.dialog.open(PopupComponent, {
  //                                 panelClass: 'custom-modalbox',

  //                                 width: '400px',
  //                                 data: { datakey: dialogConfig.data }

  //                               });
  //                               dialogRef.afterClosed().subscribe(result => {
  //                                 console.log(`Dialog result1: ${result}`);
  //                                 // this.router.navigate(['/internaltrackInvoiceList']);
  //                               });

  //                             }
  //                             else {
  //                               // this.grnpresent = false;
  //                             }
  //                           }
  //                         })
  //                       }
  //                       else {

  //                         if (res[0].grnlist != "") {
  //                           this.usertype = "enduser";
  //                           this.grnpresent = true;
  //                           console.log("res is here ==> " + res[0].grn);
  //                           this.getlineitemdetails()
  //                           this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
  //                           // this.dialogBox.popUpOpen2('GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER, 'success', 'grndoneofapproval');
  //                           const dialogConfig = new MatDialogConfig();
  //                           dialogConfig.data = {
  //                             message: 'GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER,
  //                             condition: 'success',
  //                             page: 'grndoneofapproval'
  //                           };
  //                           const mydata = dialogConfig.data;
  //                           console.log("PopupComponent", mydata);

  //                           const dialogRef = this.dialog.open(PopupComponent, {
  //                             panelClass: 'custom-modalbox',

  //                             width: '400px',
  //                             data: { datakey: dialogConfig.data }

  //                           });
  //                           dialogRef.afterClosed().subscribe(result => {
  //                             console.log(`Dialog result1: ${result}`);
  //                             // this.router.navigate(['/internaltrackInvoiceList']);
  //                           });
  //                         }
  //                         else {
  //                           this.grnpresent = false;
  //                         }
  //                       }
  //                     }
  //                   });
  //               }
  //               else {
  //                 // this.dialogBox.popUpOpen2(res[0].message, 'success', 'grndoneofapproval');
  //                 const dialogConfig = new MatDialogConfig();
  //                 dialogConfig.data = {
  //                   message: res[0].message,
  //                   condition: 'success',
  //                   page: 'grndoneofapproval'
  //                 };
  //                 const mydata = dialogConfig.data;
  //                 console.log("PopupComponent", mydata);

  //                 const dialogRef = this.dialog.open(PopupComponent, {
  //                   panelClass: 'custom-modalbox',

  //                   width: '400px',
  //                   data: { datakey: dialogConfig.data }

  //                 });
  //                 dialogRef.afterClosed().subscribe(result => {
  //                   console.log(`Dialog result1: ${result}`);
  //                   this.router.navigate(['/internaltrackInvoiceList']);
  //                 });


  //               }


  //             });
  //         }
  //       }

  //     });


  // }

  submitgrn() {
    this.loaderservice.show();
    this.CloseconfirmAcceptQuantityPopup();
    this.actiontaken = true;
    this.shortpresent = false;
    // var storagelocation = $("#storagelocation" + k).val();
    // console.log("storagelocation ==>" + storagelocation);
    var username = sessionStorage.getItem('username');
    this.multiplesavedfilename = "";
    this.multipleactualfilename = "";
    for (var c = 0; c < this.ArrayOfSelectedFilename.length; c++) {
      this.multipleactualfilename = this.multipleactualfilename + this.ArrayOfSelectedFilename[c] + ",";
    }
    for (var x = 0; x < this.ArrayOfSelectedSavedFile.length; x++) {
      this.multiplesavedfilename = this.multiplesavedfilename + this.ArrayOfSelectedSavedFile[x] + ",";
    }
    this.multipleactualfilename = this.multipleactualfilename.slice(0, -1);
    this.multiplesavedfilename = this.multiplesavedfilename.slice(0, -1);
    console.log("this.delivery.multipleactualfilename ", this.multipleactualfilename);
    console.log("this.delivery.multiplesavedfilename ", this.multiplesavedfilename);
    // +","+this.multipleactualfilename
    // +","+this.multiplesavedfilename+","+ $('#enduserremarks' + k).val()
    this.internalportalservice.getportalid(username).
      subscribe(res2 => {

        if (res2[0].message == "Success") {
          var portalid = res2[0].portalid;
          for (var k = 0; k < this.invoicedata.length; k++) {
            this.createSubmissionsModel = new createDeliveryInvoiceSubmissionsModel()

            this.createSubmissionsModel.po_num = this.invoicedata[k].PO_NUMBER;
            this.createSubmissionsModel.invoiceNumber = this.invoicedata[k].INVOICENUMBER;
            this.createSubmissionsModel.lineItemNumber = this.invoicedata[k].LINEITEMNUMBER;
            // this.invoicedata[k].SERVICENUMBER;
            this.createSubmissionsModel.acceptedqty = $('#AcceptedQtyId' + k).val();
            var storagelocation = $("#storagelocation" + k).val();
            console.log("this.invoicedata[k].INVOICEDATE " + this.invoicedata[k].INVOICEDATE);
            // var invoicedate = moment(new Date(this.invoicedata[k].INVOICEDATE)).format("YYYYMMDD");
            // console.log("Invoice date is here "+invoicedate);
            console.log("storage location is here before this.invoicedata[k].STORAGELOCATION" + this.invoicedata[k].STORAGELOCATION);
            console.log("storage location is here before " + storagelocation);
            var invoicedate = moment(new Date(this.invoicedata[k].INVOICEDATE)).format("DD-MMM-YYYY");
            console.log("Invoice date is here " + invoicedate);

            if (storagelocation == undefined) {
              if (this.invoicedata[k].STORAGELOCATION != undefined) {
                storagelocation = this.invoicedata[k].STORAGELOCATION;
              }
              else {
                storagelocation = "-";
              }

            }
            else if (storagelocation == '--SELECT STORAGE--') {
              storagelocation = "-";
            }
            console.log("storage location is here after " + storagelocation);
            var servicearray = [];

            // for dev start 
            if (configData.headerDisplay == "dev") {
              var data = "";

              if (this.invoicedata[k].LINEITEMNUMBER.includes('-')) {

                // data = this.invoicedata[k].PO_NUMBER + "," + this.invoicedata[k].INVOICENUMBER
                //   + "," + this.invoicedata[k].LINEITEMNUMBER + "," + $('#AcceptedQtyId' + k).val()
                //   + "," + storagelocation + "," + username + "," + portalid + ",Y";
                data = this.invoicedata[k].PO_NUMBER + "," + this.invoicedata[k].LINEITEMNUMBER

                  + "," + this.invoicedata[k].SERVICENUMBER + "," + this.invoicedata[k].INVOICENUMBER

                  + "," + invoicedate + "," + $('#AcceptedQtyId' + k).val()

                  + "," + storagelocation + "," + username + ","

                  + portalid + ",'Y'";
              }
              else {
                // servicearray = this.invoicedata[k].LINEITEMNUMBER.split('-');
                // data = this.invoicedata[k].PO_NUMBER
                //   + "," + this.invoicedata[k].LINEITEMNUMBER + "," + this.invoicedata[k].SERVICENUMBER
                //   + "," + this.invoicedata[k].INVOICENUMBER + "," + invoicedate
                //   + "," + $('#AcceptedQtyId' + k).val() + "," + storagelocation
                //   + "," + username + "," + portalid + ",Y";
                data = this.invoicedata[k].PO_NUMBER + "," + this.invoicedata[k].LINEITEMNUMBER + ","

                  + invoicedate + "," + this.invoicedata[k].INVOICENUMBER + ","

                  + $('#AcceptedQtyId' + k).val() + "," + storagelocation + ","

                  + username + "," + portalid + ",'Y'";
              }


              // for dev end
            }

            else if (configData.headerDisplay == "prod") {

              // for uat start 
              var data = "";
              if (!this.invoicedata[k].LINEITEMNUMBER.includes('-')) {
                data =
                  this.invoicedata[k].PO_NUMBER + "," + this.invoicedata[k].LINEITEMNUMBER + ","
                  + invoicedate + "," + this.invoicedata[k].INVOICENUMBER
                  + "," + $('#AcceptedQtyId' + k).val() + "," + storagelocation
                  + "," + username + "," + portalid + ",Y";
              }
              else {

                data = this.invoicedata[k].PO_NUMBER
                  + "," + this.invoicedata[k].LINEITEMNUMBER + "," + this.invoicedata[k].SERVICENUMBER
                  + "," + this.invoicedata[k].INVOICENUMBER + "," + invoicedate
                  + "," + $('#AcceptedQtyId' + k).val() + "," + storagelocation
                  + "," + username + "," + portalid + ",Y";
              }

            }
            // for uat end 
            this.invoicesubmissionarray.push(data);
          }
          console.log("this.self " + this.self);

          console.log("this.invoicesubmissionarray ==> ", this.invoicesubmissionarray);
          if (this.self == true) {
            if (!this.invoicedata[0].LINEITEMNUMBER.includes('-')) {
              this.internalportalservice.updateacceptedquantityofinvoice(this.invoicesubmissionarray).
                subscribe(res => {

                  if (res[0].message == "Success") {

                    this.grnnumber = res[0].grn;

                    this.internalportalservice.updateenduseretails(this.multipleactualfilename, this.multiplesavedfilename,
                      $('#enduserremarks').val(), this.invoicedata[0].INVOICENUMBER, this.invoicedata[0].PO_NUMBER).
                      subscribe(res1 => {
                        if (res1[0].message == "Success") {
                          for (var p = 0; p < this.invoicedata.length; p++) {
                            if (parseFloat($('#AcceptedQtyId' + p).val()) < parseFloat(this.invoicedata[p].QUANTITY)) {
                              this.shortpresent = true;
                              this.CreateCreditAdviceModel = new createCreditAdviceModel();
                              this.CreateCreditAdviceModel.invoicenumber = this.invoicedata[p].INVOICENUMBER;
                              this.CreateCreditAdviceModel.lineitemnumber = this.invoicedata[p].LINEITEMNUMBER;
                              this.CreateCreditAdviceModel.ponumber = this.invoicedata[p].PO_NUMBER;
                              // if((this.invoicedata[p].RATEPERQTY).tostring().includes(',')){
                              // this.CreateCreditAdviceModel.rateperqty = this.invoicedata[p].RATEPERQTY.replace(/,/g, '');
                              // }
                              // else{
                              this.CreateCreditAdviceModel.rateperqty = this.invoicedata[p].RATEPERQTY;
                              // }
                              // return
                              this.CreateCreditAdviceModel.bid = this.invoicedata[p].BUSINESSPARTNEROID;
                              this.CreateCreditAdviceModel.totalamount = this.invoicedata[p].TOTALAMOUNT.replace(/,/g, '');
                              this.CreateCreditAdviceModel.lineItemDesc = this.invoicedata[p].LINEITEMTEXT;
                              // this.CreateCreditAdviceModel.emailid = sessionStorage.getItem("username");

                              this.sortqty = parseFloat(this.invoicedata[p].QUANTITY) - parseFloat($('#AcceptedQtyId' + p).val());
                              this.sortqty = this.sortqty.toString();
                              this.CreateCreditAdviceModel.sortqty = this.sortqty;
                              this.CreateCreditAdviceModel.amount = "0.0";
                              this.creditAdviceArray.push(this.CreateCreditAdviceModel);
                              console.log("this.creditAdviceArray ==>", this.creditAdviceArray);

                            }
                          }
                          if (this.shortpresent == true) {
                            this.grnpresent = false;
                            this.trackOrderListService.createCreditAdvice(this.creditAdviceArray).subscribe(res3 => {
                              // this.dialogBox.popUpOpen2(res[0].message ,'success','approval');
                              if (res3[0].message = "shortfall Creditadvice created Sucess") {
                                if (res3[0].grn != "") {
                                  this.usertype = "enduser";
                                  // this.grnpresent = true;
                                  console.log("res3 is here ==> " + res3[0].grn);
                                  this.getlineitemdetails()
                                  this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
                                  // this.dialogBox.grnAdvicePopUp('success', 'grndoneofapproval', this.grnnumber, this.invoicedata[0].INVOICENUMBER);
                                  // this.dialogBox.popUpOpen2('GRN No.'+this.grnnumber+' created for Invoice No. '+this.invoicedata[0].INVOICENUMBER +'Request for Credit Note sent to the Vendor', );
                                  this.loaderservice.hide();
                                  const dialogConfig = new MatDialogConfig();
                                  if (res3[0].warningMessage != "") {
                                    var showmessage = 'GRN No.' + this.grnnumber + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER + '. Request for Credit Note sent to the Vendor. WARNING: ' + res[0].warningMessage;

                                  }
                                  else {
                                    var showmessage = 'GRN No.' + this.grnnumber + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER + '. Request for Credit Note sent to the Vendor';

                                  }
                                  dialogConfig.data = {
                                    message: showmessage,
                                    condition: 'success',
                                    page: 'grndoneofapproval'
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
                                }
                                else {
                                  // this.grnpresent = false;
                                }
                              }
                            })
                          }
                          else {

                            if (res[0].grn != "") {
                              this.usertype = "enduser";
                              this.grnpresent = true;
                              console.log("res is here ==> " + res[0].grn);
                              this.getlineitemdetails()
                              this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
                              // this.dialogBox.popUpOpen2('GRN No.' + res[0].grn + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER, 'success', 'grndoneofapproval');
                              this.loaderservice.hide();
                              const dialogConfig = new MatDialogConfig();
                              if (res[0].warningMessage != "") {
                                var showmessage = 'GRN No.' + res[0].grn + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER + '. WARNING: ' + res[0].warningMessage;

                              }
                              else {
                                var showmessage = 'GRN No.' + res[0].grn + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER;

                              }
                              dialogConfig.data = {
                                message: showmessage,
                                condition: 'success',
                                page: 'grndoneofapproval'
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


                            }

                            else {
                              this.grnpresent = false;
                            }
                          }
                        }
                      });
                  }
                  else {
                    // this.dialogBox.popUpOpen2(res[0].message, 'success', 'grndoneofapproval');
                    this.loaderservice.hide();
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.data = {
                      message: res[0].message,
                      condition: 'success',
                      page: 'grndoneofapproval'
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


                });
            }
            else {
              this.internalportalservice.updateacceptedservicequantityofinvoice(this.invoicesubmissionarray).
                subscribe(res => {

                  if (res[0].message == "Success") {
                    this.grnnumberlistcommaseperated = res[0].grnlist;
                    this.scrnnumberlistcommaseperated = res[0].scrnlist;
                    console.log("===============>", this.scrnnumberlistcommaseperated);

                    // this.grnnumber = res[0].grn;
                    this.internalportalservice.updateenduseretails(this.multipleactualfilename, this.multiplesavedfilename,
                      $('#enduserremarks').val(), this.invoicedata[0].INVOICENUMBER, this.invoicedata[0].PO_NUMBER).
                      subscribe(res1 => {
                        if (res1[0].message == "Success") {
                          for (var p = 0; p < this.invoicedata.length; p++) {
                            if (parseFloat($('#AcceptedQtyId' + p).val()) < parseFloat(this.invoicedata[p].QUANTITY)) {
                              this.shortpresent = true;
                              this.CreateCreditAdviceModel = new createCreditAdviceModel();
                              this.CreateCreditAdviceModel.invoicenumber = this.invoicedata[p].INVOICENUMBER;
                              this.CreateCreditAdviceModel.lineitemnumber = this.invoicedata[p].LINEITEMNUMBER;
                              this.CreateCreditAdviceModel.ponumber = this.invoicedata[p].PO_NUMBER;

                              // this.CreateCreditAdviceModel.rateperqty = this.invoicedata[p].RATEPERQTY.replace(/,/g, '');
                              this.CreateCreditAdviceModel.rateperqty = this.invoicedata[p].RATEPERQTY;
                              this.CreateCreditAdviceModel.bid = this.invoicedata[p].BUSINESSPARTNEROID;
                              this.CreateCreditAdviceModel.totalamount = this.invoicedata[p].TOTALAMOUNT.replace(/,/g, '');
                              this.CreateCreditAdviceModel.lineItemDesc = this.invoicedata[p].LINEITEMTEXT;

                              this.sortqty = parseFloat(this.invoicedata[p].QUANTITY) - parseFloat($('#AcceptedQtyId' + p).val());
                              this.sortqty = this.sortqty.toString();
                              this.CreateCreditAdviceModel.sortqty = this.sortqty;
                              this.CreateCreditAdviceModel.amount = "0.0";
                              this.creditAdviceArray.push(this.CreateCreditAdviceModel);
                              console.log("this.creditAdviceArray ==>", this.creditAdviceArray);

                            }
                          }
                          if (this.shortpresent == true) {
                            this.grnpresent = false;
                            this.trackOrderListService.createCreditAdvice(this.creditAdviceArray).subscribe(res3 => {
                              // this.dialogBox.popUpOpen2(res[0].message ,'success','approval');
                              if (res3[0].message == "shortfall Creditadvice created Sucess") {
                                // if (res3[0].grn != "") {
                                //   this.usertype = "enduser";
                                //   // this.grnpresent = true;
                                //   console.log("res3 is here ==> " + res3[0].grn);
                                //   this.getlineitemdetails()
                                //   this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
                                //   this.dialogBox.grnAdvicePopUp('success', 'grndoneofapproval', this.grnnumber, this.invoicedata[0].INVOICENUMBER);
                                //   // this.dialogBox.popUpOpen2('GRN No.'+this.grnnumber+' created for Invoice No. '+this.invoicedata[0].INVOICENUMBER +'Request for Credit Note sent to the Vendor', );
                                // }
                                if (res[0].grnlist != "") {
                                  this.usertype = "enduser";
                                  this.grnpresent = true;
                                  console.log("res is here ==> " + res[0].grn);
                                  this.getlineitemdetails()
                                  this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
                                  // this.dialogBox.popUpOpen2('GRN No. ' + res[0].grnlist + ' and SRCN No. ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER + '. Request for Credit Note sent to the Vendor', 'success', 'grndoneofapproval');
                                  this.loaderservice.hide();
                                  const dialogConfig = new MatDialogConfig();
                                  if (res[0].warningMessage != "") {
                                    var showmessage = 'GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER + '. Request for Credit Note sent to the Vendor. WARNING: ' + res[0].warningMessage;

                                  }
                                  else {
                                    var showmessage = 'GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER + '. Request for Credit Note sent to the Vendor';

                                  }
                                  dialogConfig.data = {
                                    message: showmessage,
                                    condition: 'success',
                                    page: 'grndoneofapproval'
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

                                }
                                else {
                                  // this.grnpresent = false;
                                }
                              }
                            })
                          }
                          else {

                            if (res[0].grnlist != "") {
                              this.usertype = "enduser";
                              this.grnpresent = true;
                              console.log("res is here ==> " + res[0].grn);
                              this.getlineitemdetails()
                              this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
                              // this.dialogBox.popUpOpen2('GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER, 'success', 'grndoneofapproval');
                              this.loaderservice.hide();
                              const dialogConfig = new MatDialogConfig();
                              if (res[0].warningMessage != "") {
                                var showmessage = 'GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER + '. WARNING: ' + res[0].warningMessage;

                              }
                              else {
                                var showmessage = 'GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER;

                              }
                              dialogConfig.data = {
                                message: showmessage,
                                condition: 'success',
                                page: 'grndoneofapproval'
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
                            }
                            else {
                              this.grnpresent = false;
                            }
                          }
                        }
                      });
                  }
                  else {
                    // this.dialogBox.popUpOpen2(res[0].message, 'success', 'grndoneofapproval');
                    this.loaderservice.hide();
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.data = {
                      message: res[0].message,
                      condition: 'success',
                      page: 'grndoneofapproval'
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


                });
            }
          }
          else if (this.behalf == true) {
            if (!this.invoicedata[0].LINEITEMNUMBER.includes('-')) {
              this.internalportalservice.updateacceptedquantityofinvoicewithoutgrn(this.invoicesubmissionarray).
                subscribe(res => {

                  if (res[0].message == "Success") {

                    // this.grnnumber = res[0].grn;

                    this.internalportalservice.updateenduseretails(this.multipleactualfilename, this.multiplesavedfilename,
                      $('#enduserremarks').val(), this.invoicedata[0].INVOICENUMBER, this.invoicedata[0].PO_NUMBER).
                      subscribe(res1 => {
                        if (res1[0].message == "Success") {
                          for (var p = 0; p < this.invoicedata.length; p++) {
                            if (parseFloat($('#AcceptedQtyId' + p).val()) < parseFloat(this.invoicedata[p].QUANTITY)) {
                              this.shortpresent = true;
                              this.CreateCreditAdviceModel = new createCreditAdviceModel();
                              this.CreateCreditAdviceModel.invoicenumber = this.invoicedata[p].INVOICENUMBER;
                              this.CreateCreditAdviceModel.lineitemnumber = this.invoicedata[p].LINEITEMNUMBER;
                              this.CreateCreditAdviceModel.ponumber = this.invoicedata[p].PO_NUMBER;
                              this.CreateCreditAdviceModel.rateperqty = this.invoicedata[p].RATEPERQTY;
                              this.CreateCreditAdviceModel.bid = this.invoicedata[p].BUSINESSPARTNEROID;
                              this.CreateCreditAdviceModel.totalamount = this.invoicedata[p].TOTALAMOUNT.replace(/,/g, '');
                              this.CreateCreditAdviceModel.lineItemDesc = this.invoicedata[p].LINEITEMTEXT;
                              this.sortqty = parseFloat(this.invoicedata[p].QUANTITY) - parseFloat($('#AcceptedQtyId' + p).val());
                              this.sortqty = this.sortqty.toString();
                              this.CreateCreditAdviceModel.sortqty = this.sortqty;
                              this.CreateCreditAdviceModel.amount = "0.0";
                              this.creditAdviceArray.push(this.CreateCreditAdviceModel);
                              console.log("this.creditAdviceArray ==>", this.creditAdviceArray);

                            }
                          }
                          if (this.shortpresent == true) {
                            this.grnpresent = false;
                            this.trackOrderListService.createCreditAdvice(this.creditAdviceArray).subscribe(res3 => {
                              // this.dialogBox.popUpOpen2(res[0].message ,'success','approval');
                              if (res3[0].message = "shortfall Creditadvice created Sucess") {
                                // if (res3[0].grn != "") {
                                this.usertype = "enduser";
                                // this.grnpresent = true;
                                console.log("res3 is here ==> " + res3[0].grn);
                                this.getlineitemdetails()
                                this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
                                // this.dialogBox.grnAdvicePopUp('success', 'grndoneofapproval', this.grnnumber, this.invoicedata[0].INVOICENUMBER);
                                // this.dialogBox.popUpOpen2('GRN No.'+this.grnnumber+' created for Invoice No. '+this.invoicedata[0].INVOICENUMBER +'Request for Credit Note sent to the Vendor', );
                                const dialogConfig = new MatDialogConfig();
                                dialogConfig.data = {
                                  message: 'Request for Credit Note sent to the Vendor',
                                  condition: 'success',
                                  page: 'grndoneofapproval'
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


                                // }

                              }
                            })
                          }


                          else {

                            // if (res[0].grn != "") {
                            this.loaderservice.hide();
                            this.usertype = "enduser";
                            this.grnpresent = true;

                            this.getlineitemdetails()
                            this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
                            // this.dialogBox.popUpOpen2('GRN No.' + res[0].grn + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER, 'success', 'grndoneofapproval');
                            const dialogConfig = new MatDialogConfig();
                            dialogConfig.data = {
                              message: 'Add email IDs of end user’s on whose behalf you are accepting deliveries. End Users will be notified and will need to confirm/accept too.',
                              condition: 'note',
                              page: 'information2',
                              specific: 'note'
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


                            // }

                            // else {
                            //   this.grnpresent = false;
                            // }
                          }
                        }

                      });
                  }
                  else {
                    this.loaderservice.hide();
                    // this.dialogBox.popUpOpen2(res[0].message, 'success', 'grndoneofapproval');
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.data = {
                      message: res[0].message,
                      condition: 'success',
                      page: 'grndoneofapproval'
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
                });
            }
            else {
              this.internalportalservice.updateacceptedservicequantityofinvoicewithoutgrn(this.invoicesubmissionarray).
                subscribe(res => {

                  if (res[0].message == "Success") {
                    // this.grnnumberlistcommaseperated = res[0].grnlist;
                    // this.scrnnumberlistcommaseperated = res[0].scrnlist;
                    // console.log("===============>", this.scrnnumberlistcommaseperated);

                    // this.grnnumber = res[0].grn;
                    this.internalportalservice.updateenduseretails(this.multipleactualfilename, this.multiplesavedfilename,
                      $('#enduserremarks').val(), this.invoicedata[0].INVOICENUMBER, this.invoicedata[0].PO_NUMBER).
                      subscribe(res1 => {
                        if (res1[0].message == "Success") {
                          for (var p = 0; p < this.invoicedata.length; p++) {
                            if (parseFloat($('#AcceptedQtyId' + p).val()) < parseFloat(this.invoicedata[p].QUANTITY)) {
                              this.shortpresent = true;
                              this.CreateCreditAdviceModel = new createCreditAdviceModel();
                              this.CreateCreditAdviceModel.invoicenumber = this.invoicedata[p].INVOICENUMBER;
                              this.CreateCreditAdviceModel.lineitemnumber = this.invoicedata[p].LINEITEMNUMBER;
                              this.CreateCreditAdviceModel.ponumber = this.invoicedata[p].PO_NUMBER;

                              // this.CreateCreditAdviceModel.rateperqty = this.invoicedata[p].RATEPERQTY.replace(/,/g, '');
                              this.CreateCreditAdviceModel.rateperqty = this.invoicedata[p].RATEPERQTY;
                              this.CreateCreditAdviceModel.bid = this.invoicedata[p].BUSINESSPARTNEROID;
                              this.CreateCreditAdviceModel.totalamount = this.invoicedata[p].TOTALAMOUNT.replace(/,/g, '');
                              this.CreateCreditAdviceModel.lineItemDesc = this.invoicedata[p].LINEITEMTEXT;

                              this.sortqty = parseFloat(this.invoicedata[p].QUANTITY) - parseFloat($('#AcceptedQtyId' + p).val());
                              this.sortqty = this.sortqty.toString();
                              this.CreateCreditAdviceModel.sortqty = this.sortqty;
                              this.CreateCreditAdviceModel.amount = "0.0";
                              this.creditAdviceArray.push(this.CreateCreditAdviceModel);
                              console.log("this.creditAdviceArray ==>", this.creditAdviceArray);

                            }
                          }

                          if (this.shortpresent == true) {
                            this.grnpresent = false;
                            this.trackOrderListService.createCreditAdvice(this.creditAdviceArray).subscribe(res3 => {
                              // this.dialogBox.popUpOpen2(res[0].message ,'success','approval');
                              if (res3[0].message == "shortfall Creditadvice created Sucess") {









                                // if (res[0].grnlist != "") {
                                this.usertype = "enduser";
                                this.grnpresent = true;
                                console.log("res is here ==> " + res[0].grn);
                                this.getlineitemdetails()
                                this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
                                // this.dialogBox.popUpOpen2('GRN No. ' + res[0].grnlist + ' and SRCN No. ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER + '. Request for Credit Note sent to the Vendor', 'success', 'grndoneofapproval');
                                this.loaderservice.hide();
                                const dialogConfig = new MatDialogConfig();
                                dialogConfig.data = {
                                  message: 'Request for Credit Note sent to the Vendor',
                                  condition: 'success',
                                  page: 'grndoneofapproval'
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

                                // }
                                // else {
                                //   // this.grnpresent = false;
                                // }
                              }
                            })
                          }


                          else {

                            // if (res[0].grnlist != "") {
                            this.usertype = "enduser";
                            this.grnpresent = true;
                            console.log("res is here ==> " + res[0].grn);
                            this.getlineitemdetails()
                            this.getInvoiceDetails(this.invoicedata[0].PO_NUMBER, this.invoicedata[0].INVOICENUMBER);
                            // this.dialogBox.popUpOpen2('GRN No.' + res[0].grnlist + ' and SRCN No ' + res[0].scrnlist + ' created for Invoice No. ' + this.invoicedata[0].INVOICENUMBER, 'success', 'grndoneofapproval');
                            this.loaderservice.hide();
                            const dialogConfig = new MatDialogConfig();
                            dialogConfig.data = {
                              message: 'Add email IDs of end user’s on whose behalf you are accepting deliveries. End Users will be notified and will need to confirm/accept too.',
                              condition: 'note',
                              page: 'information2',
                              specific: 'note'
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
                            // }
                            // else {
                            //   this.grnpresent = false;
                            // }
                          }
                        }

                      });
                  }
                  else {
                    // this.dialogBox.popUpOpen2(res[0].message, 'success', 'grndoneofapproval');
                    this.loaderservice.hide();
                    const dialogConfig = new MatDialogConfig();
                    dialogConfig.data = {
                      message: res[0].message,
                      condition: 'success',
                      page: 'grndoneofapproval'
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


                });
            }
          }

        }

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
            }
            else if (ValidateSingleInput(file.name.toUpperCase())) {
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
    this.uploadfile();
  }

  uploadfile() {
    const formData = new FormData();
    this.loaderservice.show();

    for (var i = 0; i < this.ArrayOfSelectedFile.length; i++) {

      console.log("this.ArrayOfSelectedFile[i].name ==> " + this.ponumber + "_enduserinvoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
      formData.append("file[]", this.ArrayOfSelectedFile[i], this.ponumber + "_enduserinvoice_" + this.getFileNameWOExtention(this.ArrayOfSelectedFile[i].name) + "_" + this.timestampnow + "." + this.getExtensionOfFile(this.ArrayOfSelectedFile[i].name));
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
        return;
      }

    });
  }

  getFileNameWOExtention(name) {
    // return name.split(".")[0];
    var flName = name.substr(0, name.lastIndexOf(".")).replace(/_/g, "-").replace(/\./g, "-");
    return flName;
  }


  getExtensionOfFile(name) {
    return name.split(".")[name.split(".").length - 1];
  }

  getTimeStampFileName(fileName, extension) {
    console.log(Date.now().toString());
    return fileName + Date.now().toString() + "." + extension;
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
  confirmAcceptQuantityPopup() {
    $("#acceptQuantityConfirm").css("visibility", "visible");
    $("#acceptQuantityConfirm").css("opacity", "1");
    (<any>$("#popupComment").modal('show'));
  }
  CloseconfirmAcceptQuantityPopup() {
    $("#acceptQuantityConfirm").css("visibility", "hidden");
    $("#acceptQuantityConfirm").css("opacity", "0");
  }

  returnInvoice() {
    this.enduserReturnArray = [];
    for (let i = 0; i < this.invoicedata.length; i++) {
      this.enduserReturnmodel = new enduserReturnModel();
      this.enduserReturnmodel.bid = this.invoicedata[i].BUSINESSPARTNEROID;
      this.enduserReturnmodel.invoicenumber = this.invoicedata[i].INVOICENUMBER;
      this.enduserReturnmodel.lineitemnumber = this.invoicedata[i].LINEITEMNUMBER;
      this.enduserReturnmodel.ponumber = this.invoicedata[i].PO_NUMBER;
      this.enduserReturnmodel.quantity = this.invoicedata[i].QUANTITY;
      this.enduserReturnmodel.status = "N"

      this.enduserReturnArray.push(this.enduserReturnmodel)
    }

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
      // this.dialogBox.popUpOpen_callback_confirm('Do you want to return this invoice to vendor?', '1', 'confirm',
      //   (value) => {
      //     this.confirmationValue = value;
      //     console.log("value is here ==>" + value);

      // this.dialogBox.popUpOpen2
      if (this.confirmationValue == true) {

        this.internalportalservice.getEndUserReturn(this.enduserReturnArray).subscribe(res => {
          console.log(res);
          this.loaderservice.hide();
          if (res[0].message == "Invoice returned successfully")
            this.sendConfirmation('N', "Invoice Returned - " + this.msgOnButtonClick, 'SubmitQuery', this.inVNumber)
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
            this.router.navigate(['/internaltrackInvoiceList']);
          });
        })

      }
    })

  }
  getvalue(e, type) {
    var checked: boolean = e.target.checked
    console.log("event", e.target.checked);
    if (checked == true) {
      this.self = false;
      this.behalf = false;
      this.acceptedqty = false;
      if (type == 'self') {
        this.self = true;
        $("#acceptcheck1").prop("checked", false);
      }
      else if (type == 'behalf') {
        this.behalf = true;
        $("#acceptcheck").prop("checked", false);
      }
    }
    if (checked == false) {
      this.acceptedqty = true;
    }
    console.log(this.self + "this.self");
    console.log(this.behalf + "this.behalf");

  }

  enduserstatuschange(event) {
    debugger
    console.log(event.target.value);
    if (event.target.value != 'A') {

      this.submitdone = true;
    }
    else {

      this.submitdone = false;
    }
    for (let loop = 0; loop <= this.customManagerList.length - 1; loop++) {
      if (sessionStorage.getItem('username') == this.customManagerList[loop].EUMANAGER) {
        if (this.customManagerList[loop].STATUS == 'CM') {
          this.submitdone = false;
        }
      }
    }
    if (this.behalf && this.selectedConfirmatoryList.length == 0) {
      if (event.target.value == 'A') {
        $("#selectManager").val('A');
        this.submitdone = false;
      }

      if (event.target.value == 'R') {
        $("#selectManager").val('R')
        this.submitdone = false;
      }

      if (event.target.value == 'P') {
        $("#selectManager").val('P');
        this.submitdone = false;
      }

      if (event.target.value == 'O') {
        $("#selectManager").val('O')
        this.submitdone = false;
      }
      if (event.target.value == 'V') {
        $("#selectManager").val('V')
        this.submitdone = false;
      }
    }
    console.log(this.submitdone);
    console.log(this.usertype);
    console.log(this.selectedConfirmatoryList.length);
    console.log(this.behalf);
    console.log(this.customManagerList.length, "customManagerList.length");
  }

  toggle(index) {
    // $('.prevChar').eq(e).toggle();
    if ($('#showId' + index).hasClass('showNothing')) {
      $('#showId' + index).removeClass('showNothing');
    } else {
      $('#showId' + index).addClass('showNothing');
    }
    if ($('#messagescrollMore' + index).hasClass('showNothing')) {
      $('#messagescrollMore' + index).removeClass('showNothing');
      $('#messagescrollMore' + index).addClass('showMore');
      $('#messagescrollMore' + index).toggleClass('showMore');
    } else {
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
