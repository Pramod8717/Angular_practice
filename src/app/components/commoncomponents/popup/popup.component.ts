import { Component, Inject, OnInit, Output,EventEmitter  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoaderService } from 'app/services/LoaderService/loader.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  mydata: any;
  @Output() datasharingFunction2 = new EventEmitter();
  dataGO: any;
  validate: boolean = false;
  btnDisabled: boolean;

 

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private loaderService: LoaderService,public dialogRef: MatDialogRef<PopupComponent>) { }

  displayTextarea:boolean=false;
  ngOnInit(): void {
   this.mydata= this.data.datakey;
   console.log("loder:", this.mydata);  
       
  }

  openTextarea(){
    this.btnDisabled = false
    // debugger;
    if(this.mydata.condition !="Pending" && this.mydata.condition !="Continue"){
    this.displayTextarea=true;
    }
    else{
      this.displayTextarea=false;
      this.onNoClick(true, null) 
    }
  }
  
onNoClick(value, message){
  this.btnDisabled = false
  this.dataGO = message;
  console.log("messagess 1======>", this.dataGO );
  this.datasharingFunction2.emit(this.dataGO);
  console.log("messagess======>", this.dataGO );
  
  this.dialogRef.close({return:value,messageString:message});
  // console.log("click", value)
  
  // return value
}

Check(message) {
  this.validate = true
  if (message.value != "" && message.value != " " && message.value != null && message.value.trim().length != 0) {
    this.validate = false;
  }


}
ClosepopupMessage() {
  $("#ConfirmationpopUp").css("visibility", "hidden");
  $("#ConfirmationpopUp").css("opacity", "0");
}
}
