import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';

@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.css']
})
export class InvoiceListComponent implements OnInit {
  public invoiceList = new FormGroup({
    invoiceNo : new FormControl('', Validators.required),
    PONumber  : new FormControl('',Validators.required),
    invoiceStatus : new FormControl('',Validators.required),
    invoiceValue : new FormControl('',Validators.required)
  })

  
  public hasError = (controlName: string, errorName: string) =>{
    return this.invoiceList.controls[controlName].hasError(errorName);
  }
  
  constructor(private router:Router) { }
  // @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  ngOnInit(): void {
  }

  getInvoice(){
    if(this.invoiceList.status == 'VALID'){
      this.router.navigate(['/invoice-details']);
      // invoice-details
      }
  }

}
