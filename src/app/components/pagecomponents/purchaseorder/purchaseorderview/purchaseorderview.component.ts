import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';

@Component({
  selector: 'app-purchaseorderview',
  templateUrl: './purchaseorderview.component.html',
  styleUrls: ['./purchaseorderview.component.css']
})
export class PoOrderViewComponent implements OnInit {
  productList: any;
  poDetail: any =[];
  poNumber=sessionStorage.getItem("poNumber")
  message: any;
  Amount: any;
  Date: any;
  Status: any;
  uniquelineitems: any = [];
  uniquelineitem: any = [];
  orderlistoflineitem: any[];
  lineitemnumber:any = [];
  lineitemnumberset:any =[];
  orderlist: any = [];
result:any;
  valueininr: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private activatedRoute: ActivatedRoute,private purchaseOrderListService:PurchaseOrderListService) {
    // console.log("is it working ??", JSON.parse(sessionStorage.getItem("PODetails")))
   }
  //  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  ngOnInit(): void {
    // this.initAcc('.Basicaccordion', true);
    this.route.queryParams.subscribe(params => {
      console.log( "what are the ?", params); // { order: "popular" }
      this.poNumber = atob(params.POnumber);
      this.message = atob(params.Query);
      this.Amount = atob(params.Amount);
      this.Date = atob(params.Date);
      this.Status = atob(params.Status)
    });

    this.getPOitems(this.poNumber)
   
    // this.purchaseOrderListService.getPODetails(this.poNumber).subscribe(res=>{
    //   this.poDetail = res[0].poData
    //   console.log("PODEtails in details......", this.poDetail)
      
    // })
    this.productList=JSON.parse(sessionStorage.getItem("PODetails"));

    console.log("product data",this.productList)
  }
 
  initAcc(elem, option){
    // console.log("Clicked")
    document.addEventListener('click', function (e) {
          const element = e.target as Element;
          // console.log(element.matches(elem+' .Basicaccordion-btn'))
        
          if (!element.matches(elem+' .Basicaccordion-btn')) return;

        else{
          // console.log("else")
            if( !(<HTMLInputElement>e.target).parentElement.classList.contains('active')){
                if(option==true){
                    var elementList = document.querySelectorAll(elem+' .Basicaccordion-container');
                    Array.prototype.forEach.call(elementList, function (e) {
                        e.classList.remove('active');
                    });
                }            
                (<HTMLInputElement>e.target).parentElement.classList.add('active');
            }else{
              (<HTMLInputElement>e.target).parentElement.classList.remove('active');
            }
        }
    });
  //  this.initAccNested('.aNestedTblAccordion', true);
}

openAccordioninnerTab(event,i,j) { 
  console.log("event ==>"+event.target.value);
  $( ".customtbl-accordion-head-inner .plusminusArrow").removeClass("fa-minus");
  $( ".customtbl-accordion-head-inner .plusminusArrow").addClass("fa-plus");
console.log($( "#lineitem"+i+j ));

  if ($( "#lineitem"+i+j ).hasClass( "active" )) { 
    console.log('true');
    $( "#lineitem"+i+j ).removeClass('active');


   } 
   else {
       console.log('false');
       $(".customtbl-accordion-head-inner.active").removeClass("active");
       console.log($( "#lineitem"+i+j));
       $( "#lineitem"+i+j ).addClass('active');
       $( ".customtbl-accordion-head-inner.active .plusminusArrow").addClass("fa-minus");
       $( ".customtbl-accordion-head-inner.active .plusminusArrow").removeClass("fa-plus");
   }
  }


initAccNested(e , option, lineitemnumber,ponumber ){

  console.log("e is here "+e.target.value);
  console.log("option "+option);
  console.log("lineitemnumber "+lineitemnumber);
  console.log("ponumber "+ponumber);
  let elem = '.Basicaccordion';
  option = true;
  console.log("orderlist", this.orderlist);
  
// if(this.orderlist.length != 0){
//  console.log("Clicked ")
 // document.addEventListener('click', function (e) {
       const element = e.target as Element;
       // console.log(element.matches(elem+' .atbl-btn'))
     
       if (!element.matches(elem+' .Accordionbtnclick')) return;

     else{
       // console.log("else")
         if( !(<HTMLInputElement>e.target).parentElement.parentElement.classList.contains('active')){
            //  if(option==true){
            //      var elementList = document.querySelectorAll(elem+'.Basicaccordion-container');
            //      Array.prototype.forEach.call(elementList, function (e) {
            //          e.classList.remove('active');
            //      });
            //  }        
            $(".Basicaccordion-container.active").removeClass("active");    
             (<HTMLInputElement>e.target).parentElement.parentElement.classList.add('active');
         }else{
           (<HTMLInputElement>e.target).parentElement.parentElement.classList.remove('active');
         }
     }
    // }
 // });
//  this.initAccNested('.aNestedTblAccordion', true);

  this.orderlist = [];
  this.valueininr = [];
  console.log("option is here ", option,"++++lineitemnumber+++++", lineitemnumber ,"xxxponumberxxxxxxxx",ponumber );
  console.log("this.polist ==> " + this.poDetail);


  // for (var i = 0; i < this.poDetail.length; i++) {
  //   if (this.poDetail[i].LINEITEMNUMBER == lineitemnumber && this.poDetail[i].ORDERNUMBER != null)
  //     this.orderlist.push(this.poDetail[i]);
  for (var k = 0; k < this.poDetail.length; k++) {
  // }
    if (this.poDetail[k].ORDERNUMBER != null && this.poDetail[k].PO_NUMBER == ponumber && this.poDetail[k].LINEITEMNUMBER == lineitemnumber) {
      this.orderlist.push(this.poDetail[k]);
    }
  }
  this.orderlist = this.orderlist.sort((d, e) => 
  {if (d.ORDERNUMBER > e.ORDERNUMBER) {
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
  console.log("this.orderlist" + JSON.stringify(this.orderlist),'orderlist**********************');
   for(var j=0;j<this.orderlist.length;j++)
   {
    console.log("nub1",Number(this.orderlist[j].QUANTITY))
     this.valueininr.push(Number(this.orderlist[j].QUANTITY) * Number(this.orderlist[j].RATEPERQTY))
   }
 console.log("this.valueininr ==>"+this.valueininr);
}

Number(val) {
  if (val == null) {
    return 0;
  }
  else {
    return parseInt(val);
  }
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
    console.log("this.uniquelineitems======>>>",JSON.stringify(this.uniquelineitems));
    // this.uniquelineitems = this.uniquelineitem.sort((a, b) => a.LINEITEMNUMBER - b.LINEITEMNUMBER);
    this.uniquelineitems = this.uniquelineitems.sort((a, b) => 
    {if (a.LINEITEMNUMBER > b.LINEITEMNUMBER) {
      return 1;
  }

  if (a.LINEITEMNUMBER < b.LINEITEMNUMBER) {
      return -1;
  }

  return 0;
});
    console.log("this.poDetail isisis ==>"+JSON.stringify(this.uniquelineitems))
    sessionStorage.setItem("PODetails", JSON.stringify(this.poDetail));
    // console.log("Number(a.LINEITEMNUMBER)"+Number(a.LINEITEMNUMBER));
    // this.uniquelineitems = this.uniquelineitem.sort((a, b) => Number(a.LINEITEMNUMBER) - Number(b.LINEITEMNUMBER));
// let lengthofArray = (res[0].poData).length-1

// console.log("PODATA", lengthofArray)
console.log("Lineitemtext ", this.poDetail)
for(var i = 0;i<this.poDetail.length;i++)
{
this.lineitemnumber.push(this.poDetail[i].LINEITEMNUMBER); 
}
console.log("this.lineitemnumber. "+this.lineitemnumber);
var mySet = new Set(this.lineitemnumber);
 mySet.forEach(v => this.lineitemnumberset.push(v));
console.log("Set items this.lineitemnumberset ==>"+this.lineitemnumberset);

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
  
}
