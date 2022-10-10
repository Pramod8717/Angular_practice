import { Component, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-internal-track-invoice-without-po',
  templateUrl: './internal-track-invoice-without-po.component.html',
  styleUrls: ['./internal-track-invoice-without-po.component.css']
})
export class InternalTrackInvoiceWithoutPOComponent implements OnInit {
  managerAddCountList:[];
  count:number=0;
  removecount:number=5;
  constructor() { }

  ngOnInit(): void {
  }
  AddManagertolist()
  {
    this.count++;
    //this.managerAddCountList.length='5';
    if(this.count<5)
    // for(var k=0;k<5;k++)
    // {

    // Reject is removed for temporary purpose dated 18022022
      // $("#more-Manager").append("<div  class='inv-form-inputs'> <div class='form-group'> <div class='customFormGroup' disabled> <label style='font-size: 20px; font-weight: 600; color: black;'>Manager Approval</label> <select class='form-control form-select' aria-label='Default select example'><option selected disabled>--Select--</option><option value='1'>Accepted</option><option value='1'>Reject</option><option value='1'>On Hold</option></select><div class='wizard-form-error'></div></div></div></div>");
      $("#more-Manager").append("<div  class='inv-form-inputs'> <div class='form-group'> <div class='customFormGroup' disabled> <label style='font-size: 20px; font-weight: 600; color: black;'>Manager Approval</label> <select class='form-control form-select' aria-label='Default select example'><option selected disabled>--Select--</option><option value='1'>Accepted</option><option value='1'>On Hold</option></select><div class='wizard-form-error'></div></div></div></div>"); 
    //}
    // $("#more-Manager").append("<div class='form-group'><label for=''>Manager Approval</label><input type='text' class='form-control' id='' placeholder=''/></div>"); 
    
  }
  removeManagertolist()
  {
    this.removecount--;
    if(this.removecount>0)
    {
      $("#more-Manager").children().last().remove();  
    }
   
  }
}
