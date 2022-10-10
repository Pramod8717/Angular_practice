import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-multiplepoinvoicepurchaseorderslist',
  templateUrl: './multiplepoinvoicepurchaseorderslist.component.html',
  styleUrls: ['./multiplepoinvoicepurchaseorderslist.component.css']
})
export class MultiplepoinvoicepurchaseorderslistComponent implements OnInit {

  public POOrderList = new FormGroup({
    PONumber: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required)
  })
  Duration = [];
  // durationfromdate: string;
  // durationtodate: string;
  poDataList: any=[];
  durationpresent: boolean = false;
  ponumberpresent: boolean = false;
  fromdateofduration: string;
  todateofduration: string;
  ponum: string;

  constructor(private purchaseOrderListService: PurchaseOrderListService) { }

  ngOnInit(): void {

    // this.durationlist();
  }

  // openAdavnceSearch() {
  //   let advanceSearcBox = document.getElementById("advanceSearcBox");
  //   let closeArrow = document.getElementById("closeArrow");
  //   let openArrow = document.getElementById("openArrow");
  //   if (advanceSearcBox.style.display === "none") {
  //     advanceSearcBox.style.display = "block";
  //     closeArrow.style.display = "block";
  //     openArrow.style.display = "none";
  //   } else {
  //     advanceSearcBox.style.display = "none";
  //     openArrow.style.display = "block";
  //     closeArrow.style.display = "none";
  //   }
  // }

  // searchorders()
  // {
  //   console.log("this.POOrderList.controls['PONumber'].value ==>" + this.POOrderList.controls['duration'].value);
  //   console.log("this.POOrderList.controls['fromDate'].value ==>" + this.POOrderList.controls['fromDate'].value);
  //   console.log("this.POOrderList.controls['toDate'].value ==>" + this.POOrderList.controls['toDate'].value);
  //   this.durationpresent = false;
  //   this.ponumberpresent = false;
  //   this.poDataList = [];
  //   var today = new Date();
  //   var lastyear = today.getFullYear() - 1 + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + '00:00:00.0';
  //   var halfyear = today.getFullYear() + '-' + (today.getMonth() - 5) + '-' + today.getDate() + ' ' + '00:00:00.0';
  //   // var quarter = today.getFullYear() + '-' + (today.getMonth() - 2) + '-' + today.getDate() + ' ' + '00:00:00.0';
  //   var month = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate() + ' ' + '00:00:00.0';

  //   var threeMonthsAgo = moment().subtract(3, 'months');
  //   var oneMonthsAgo = moment().subtract(1, 'months');
  //   var sixMonthsAgo = moment().subtract(6, 'months');
  //   var oneyearago = moment().subtract(12, 'months');
  //   // this.responseList.length = 0
  //   console.log("Month", oneMonthsAgo, "Quarter", threeMonthsAgo, "HalfYear", sixMonthsAgo, "Lastyear", oneyearago, "Tday", today);
  //   this.fromdateofduration = "";
  //   this.todateofduration = "";
  //   if (this.POOrderList.controls['PONumber'].value) {
  //     this.ponumberpresent = true;
  //     this.ponum = this.POOrderList.controls['PONumber'].value.trim();
  //   }
  //   else {
  //     this.ponum = "NA";
  //   }

  //   if (this.POOrderList.controls['duration'].value == 'ALL') {
     
  //     this.fromdateofduration = "NA";
  //     this.todateofduration = "NA";
  //   }
  //   else if (this.POOrderList.controls['duration'].value == '3M') {

  //     console.log("in" + threeMonthsAgo.format("DD/MM/YYYY"));
  //     // console.log("moment ==>"+moment.utc(moment(this.convert(new Date(this.todateofduration))).format("YYYY-MM-DD"), "DD/MM/YYYY"));
  //     // this.fromdateofduration = moment(new Date(quarter)).format("DD/MM/YYYY");
  //     this.fromdateofduration = threeMonthsAgo.format("DD/MM/YYYY");
  //     this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
  //     this.durationpresent = true;
  //   }
  //   else if (this.POOrderList.controls['duration'].value == '6M') {
  //     // this.fromdateofduration = moment(new Date(halfyear)).format("DD/MM/YYYY");
  //     this.fromdateofduration = sixMonthsAgo.format("DD/MM/YYYY");
  //     this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
  //     this.durationpresent = true;
  //   }
  //   else if (this.POOrderList.controls['duration'].value == '1Y') {

  //     this.fromdateofduration = oneyearago.format("DD/MM/YYYY");
  //     this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
  //     this.durationpresent = true;
  //   }
  //   else if (this.POOrderList.controls['duration'].value == '1M') {
  //     this.fromdateofduration = oneMonthsAgo.format("DD/MM/YYYY");
  //     this.todateofduration = moment(new Date()).format("DD/MM/YYYY");
  //     this.durationpresent = true;
  //   }
  //   console.log("this.fromdateofduration ==>" + this.fromdateofduration);
  //   console.log("this.todateofduration ==>" + this.todateofduration);
  //   this.purchaseOrderListService.getPOformultiple(this.ponum, this.fromdateofduration, this.todateofduration).subscribe(res => {
  //     console.log(res);
  //   });
  // }

  // durationlist() {
  //   // this.selected = 'ALL';
  //   this.POOrderList.controls['duration'].setValue('ALL');
  //   console.log("in here");
  //   this.Duration =
  //     [
  //       { id: 'ALL', value: '--Select---' },
  //       { id: '1M', value: 'Last 1 Month' },
  //       { id: '3M', value: 'Last 3 Months' },
  //       { id: '6M', value: 'Last 6 Months' },
  //       { id: '1Y', value: 'Last 1 Year' }
  //     ]



  // }

}
