import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';

@Component({
  selector: 'app-purchaseorderdispached',
  templateUrl: './purchaseorderdispached.component.html',
  styleUrls: ['./purchaseorderdispached.component.css']
})
export class PoOrderDispachedComponent implements OnInit {
  [x: string]: any;
  data:any;
  poNumber: any;
  message: any;
  Amount: any;
  Date: any;
  Status: any;
  orderNo: any;
  Quantity: any;

  constructor(private route: ActivatedRoute) { }
  // @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      
      console.log( "what are the ?", params); // { order: "popular" }
      this.orderNo = params.orderNo
      this.poNumber = params.poNumber;
      this.message = params.message;
      this.Quantity = params.Quantity;
      // this.Amount = params.Amount;
      this.Date = params.Date;
      // this.Status = params.Status;
      this.lineItemNumber = params.lineItemNumber;
      this.lineItemText = params.lineItemText;
      this.email = params.email;
      this.address = params.address

    
    });
  }

}
