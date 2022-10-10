import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'app/services/login/login.service';
import * as moment from 'moment/moment';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { LoaderService } from 'app/services/LoaderService/loader.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  public POOrderList = new FormGroup({
    PONumber: new FormControl("", Validators.required),
    fromDate: new FormControl("", Validators.required),
    toDate: new FormControl("", Validators.required),
    Plant: new FormControl("", Validators.required),
    duration: new FormControl("", Validators.required),
  });

  formStatus=true;

  poDataList:any=[];
  poData:any=[];
  fromdateofduration: any='NA';
  todateofduration: any='NA';
  plant: any='NA';
  todateofpo: any='NA';
  fromdateofpo: any='NA ';
  ponumber: any='NA';
  status: any='ALL';
  pagenumber: any = 1;
  dataSource = new MatTableDataSource<Element>(this.poDataList);
  bid: any ='20001';
  page: any ='1';
  invoicenumber: string;
  fromdate: any ='NA';
  todate: any ='NA';
  paginationpagenumber: number = 1;
  currstatus: any = "P";
  innum: any = "NA";
  ponum: any = "NA";
  fd: any = "NA";
  td: any = "NA";
  fromtodatepresent: boolean = false;
  fromdateerror: boolean = false;
  todateerror: boolean = false;
  disable: boolean = false;
  mintodate: any;
  PlantList: any[];
  trackOrderListService: any;
  tempPlantList: any = [];
  disableprevious: boolean = true;
  popaginationnumber = 1;
  plantpresent: boolean = false;
  ponumberpresent: boolean = false;
  filteredponumberData: any[];
  filtereddate: any[];


  maxdate: any;
  mindate: any;
  totalItems: any;
  
  powithnodeliveries: any;
  poCountAsPerStatus: any;
  statusList: any = [];

  pgNolist: any[];
  servicePOList: any;
// adminForm:any;
// customerForm:any;

  constructor(private router:Router, 
    private route: ActivatedRoute, 
    private activatedRoute: ActivatedRoute,
    private loginservice:LoginService,
    private loaderservice: LoaderService,
    private purchaseOrderListService: PurchaseOrderListService
    
  
    ) { 
      console.warn("getpData >>>>API Successful.....");

      this.loginservice.getPo(this.pagenumber,this.status,this.ponumber,
        this.fromdateofduration,this.todateofduration,
        this.fromdateofpo,this.todateofpo,this.plant).subscribe(res => {
        console.log(res); 
        console.log(res[0].poData);
        this.poDataList  = res[0].poData;
      })

      


//  console.warn("getInvoiceData >>>>API Succesfully....");

//  this.loginservice.getInvoicedata(this.paginationpagenumber,
//   this.currstatus,
//   this.innum,
//   this.ponum,
//   this.fd,
//   this.td,
//   this.plant).subscribe(res => {
//     console.log(res);
//   })

  }

  ngOnInit(): void {
   console.log("i'm in oninit Testttt"); 

   
  
  }


  adminForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
    mobile:new FormControl('',[Validators.required,Validators.maxLength(10)]),
    amount:new FormControl('',[Validators.required]),
   });

   customerForm=new FormGroup({
    cname:new FormControl('',[Validators.required]),
    cemail:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
    cmobile:new FormControl('',[Validators.required,Validators.maxLength(10)]),
    camount:new FormControl('',[Validators.required]),
   });
// ************Admin Form****************

   onSubmit(event){

    console.warn(this.adminForm.value)
    console.log("PoDataList>>>>"+this.poDataList)
    event=this.poDataList;
    console.warn("POData on Submit button"+event)
   }

   get name(){

    return this.adminForm.get('name')
   }
   
   get email(){

    return this.adminForm.get('email')
   }

   get mobile(){

    return this.adminForm.get('mobile')
   }

   get amount(){

    return this.adminForm.get('amount')
   }

// ************Customer Form****************

   onClick(event){

    console.warn(this.customerForm.value)
    // console.log("PoDataList>>>>"+this.poDataList)
    event=this.poDataList;
    console.warn("POData on Submit button"+event)
   }

   get cname(){

    return this.customerForm.get('cname')
   }
   
   get cemail(){

    return this.customerForm.get('cemail')
   }

   get cmobile(){

    return this.customerForm.get('cmobile')
   }

   get camount(){

    return this.customerForm.get('camount')
   }
//******************************************

onDetails(poNumber,date,amount){ 
   
    let data:any=this.poDataList;
    console.warn("Data Show"+data);
    
    this.router.navigate(['./details'],{
      // queryParams:{data:JSON.stringify(data)}
      queryParams: {POnumber:poNumber,Date:date,amount:amount}
    
   })
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

  onDateChange() {
    if (this.POOrderList.controls['fromDate'].value) {
      if (this.POOrderList.controls['toDate'].value) {
        this.disable = false;
        this.fromdateerror = false;
        this.todateerror = false;
      }
      else {
        this.todateerror = true;
        this.fromdateerror = false;
        this.disable = true;
      }
      this.mintodate = new Date(this.POOrderList.controls['fromDate'].value);

    }
    else if (this.POOrderList.controls['toDate'].value) {
      if (this.POOrderList.controls['fromDate'].value) {
        this.disable = false;
        this.fromdateerror = false;
        this.todateerror = false;
      }
      else {
        this.fromdateerror = true;
        this.todateerror = false;
        this.disable = true;
      }
    }
  }

  getPlantData(e) {
    this.PlantList = [];
    this.trackOrderListService.getPlanCode(e.target.value.toUpperCase()).subscribe(res => {
      this.tempPlantList = res[0].grnbasedonpo;
      console.log(this.PlantList, 'PlantList')
    });
  }


searchorders() {
    this.currstatus = "AS";
    this.popaginationnumber = 1
    this.disableprevious = true;
    console.log("this.POOrderList.controls['fromDate'].value ==>" + this.POOrderList.controls['fromDate'].value);
    console.log("this.POOrderList.controls['toDate'].value ==>" + this.POOrderList.controls['toDate'].value);
    this.plantpresent = false;
    this.ponumberpresent = false;
    this.fromtodatepresent = false;
    this.filteredponumberData = [];
    this.poDataList = [];
    this.filtereddate = [];
    var today = new Date();
  //  debugger;
    if (this.POOrderList.controls['PONumber'].value) {
      this.ponumberpresent = true;
      this.ponum = this.POOrderList.controls['PONumber'].value.trim();
    }
    else {
      this.ponum = "NA";
    }
    // if (this.POOrderList.controls['Plant'].value) {
    //   for (var b = 0; b < this.tempPlantList.length; b++) {
    //     if (this.tempPlantList[b].PLANTNAME == this.POOrderList.controls['Plant'].value.trim()) {
    //       this.plant = this.tempPlantList[b].PLANTCODE;
    //     }
    //   }
    //   this.plantpresent = true;
    //   // this.plant = this.POOrderList.controls['Plant'].value.trim();
    // }
    // else {
    //   this.plant = "NA";
    // }

    if (this.POOrderList.controls['fromDate'].value) {
      this.fromtodatepresent = true;

      this.fromdateofpo = moment(new Date(this.POOrderList.controls['fromDate'].value)).format("DD/MM/YYYY");
      this.todateofpo = moment(new Date(this.POOrderList.controls['toDate'].value)).format("DD/MM/YYYY");
    }
    else {
      this.fromdateofpo = "NA";
      this.todateofpo = "NA";
    }
    console.log("invoice",this.invoicenumber);
    
    if (this.invoicenumber == "NA") {
      // getpo call
      console.log("in function");
      console.log("ponumber",this.ponumber);
      
      this.loginservice.getPo(this.pagenumber,this.currstatus,this.ponum,this.fromdateofduration,this.todateofduration,this.fromdateofpo,this.todateofpo,this.plant).
      subscribe(res => {
          let advanceSearcBox = document.getElementById("advanceSearcBox");
          let closeArrow = document.getElementById("closeArrow");
          let openArrow = document.getElementById("openArrow");
          advanceSearcBox.style.display = "none";
          openArrow.style.display = "block";
          closeArrow.style.display = "none";
          // this.POOrderList.reset();
          // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
          // if (!res[0].message) {
            // debugger;
            console.log('ghfghfgh',res);
            this.poDataList = res[0].poData;
            // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
             this.totalItems = res[0].popages;
            
        });             
 }
}

 // ***************Status Bar*********************

 sortData(status: string) {
      this.currstatus = status;
      this.popaginationnumber = 1;
      this.POOrderList.controls.duration.setValue("ALL");
      this.POOrderList.controls.PONumber.setValue(null);
      this.POOrderList.controls.fromDate.setValue(null);
      this.POOrderList.controls.toDate.setValue(null);
      this.ponum = "NA";
      this.fromdateofduration = "NA";
      this.todateofduration = "NA";
      this.fromdateofpo = "NA";
      this.todateofpo = "NA";
      this.plant = "NA";
      this.loginservice.getPo(this.popaginationnumber, this.currstatus, this.ponum, this.fromdateofduration, 
        this.todateofduration, this.fromdateofpo, this.todateofpo, this.plant).subscribe(res => {

          if (!res[0].message) {

          this.purchaseOrderListService.getWOPO('1', this.currstatus, this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo).subscribe(res1 => {
   
            if (res1[0].message != 'No Data Found for given Vendor Id') {
  
               this.powithnodeliveries = res1[0].poData;
            }
            else {
              this.powithnodeliveries = [];
            }
            this.poCountAsPerStatus = res[0].poCountAsPerStatus;
          
            if (this.invoicenumber == undefined) {
              this.poDataList = res[0].poData;
              // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
              for (let i = 0; i < this.poDataList.length; i++) {
                this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
              }
            }
            else {
              this.poDataList = res1[0].poData;
              for (let i = 0; i < this.poDataList.length; i++) {
                this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
              }
            }
  
            console.log("updatelist", this.poDataList);
  
            console.log("Data PO POLIST API", this.poDataList);
            console.log("data from read status API", this.statusList);
  
            // this.poDataList = [];
            // this.filterpodatalist = res[0].poData;
            this.totalItems = res[0].popages;
  
  
          });
        }
        else {
          this.poDataList = [];
          this.totalItems = 0;
        }
      }, err => {
        this.loaderservice.hide();
      })
      setTimeout(() => {
        this.pgNolist = [];
        // for (var m = pageNo; m <= Mpage; m++) {
        //   this.pgNolist.push(this.poDataList[m]);
        // }
        this.pgNolist = this.poDataList;
        console.log("this.statuslist", this.statusList);
        console.log("this.pgNolist" + this.pgNolist);
        for (var k = 0; k < this.poDataList.length; k++) {
          for (var j = 0; j < this.statusList.length; j++) {
            if (this.statusList.length != 0) {
              if (this.statusList[j]['STATUS'] == "A" && this.statusList[j]['PONUMBER'] == this.poDataList[k]['PO_NUMBER']) {
  
                $("#green" + k).addClass('displayBlock');
                $("#white" + k).addClass('displayNone');
              }
              else {
                //$("#green" + k).addClass('displayNone');
                $("#white" + k).addClass('displayBlock');
              }
            }
            else {
              $("#white" + k).addClass('displayBlock');
            }
          }
          this.loaderservice.hide();
        }
  
      }, 1000); err => {
        this.loaderservice.hide();
      }
  
    }

    ServicePO() {
      this.currstatus = 'SP';
      this.popaginationnumber = 1;
      console.log("============>", this.servicePOList);
  
      this.purchaseOrderListService.getPO(this.popaginationnumber, this.currstatus, this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo, this.plant).subscribe(res => {
       
        if (!res[0].message) {
  
  
          this.purchaseOrderListService.getWOPO(this.popaginationnumber, this.currstatus, this.ponum, this.fromdateofduration, this.todateofduration, this.fromdateofpo, this.todateofpo).subscribe(res1 => {
            if (res1[0].message != 'No Data Found for given Vendor Id') {
  
              this.powithnodeliveries = res1[0].poData;
            }
            else {
              this.powithnodeliveries = [];
            }
            this.poCountAsPerStatus = res[0].poCountAsPerStatus;
            if (this.invoicenumber == undefined) {
              this.poDataList = res[0].poData;
              // this.poCountAsPerStatus = res[0].poCountAsPerStatus;
              for (let i = 0; i < this.poDataList.length; i++) {
                this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
              }
            }
            else {
              this.poDataList = res1[0].poData;
              for (let i = 0; i < this.poDataList.length; i++) {
                this.poDataList[i].AMOUNT = Number(this.poDataList[i].AMOUNT).toFixed(2).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
              }
            }
  
            console.log("updatelist", this.poDataList);
  
            console.log("Data PO POLIST API", this.poDataList);
            console.log("data from read status API", this.statusList);
  
            // this.poDataList = [];
            // this.filterpodatalist = res[0].poData;
            this.totalItems = res[0].popages;
  
  
          });
        }
        else {
          this.poDataList = [];
          this.totalItems = 0;
        }
      }, err => {
        this.loaderservice.hide();
      })
  
      // this.poDataList = this.servicePOList;
      // this.totalItems = this.poDataList.length;
  
      setTimeout(() => {
        for (var k = 0; k < this.poDataList.length; k++) {
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
      }, 500);
    }
    
  

}