import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isShown: boolean = false ;
  customerForm: any;
  poDataList: any;
  dialog: any;
  form: any;
 
  constructor(

    private router: Router,)
    
    {
    this.form=new FormGroup( {
      fname:new FormControl(""),
      lname:new FormControl(""),
      email:new FormControl(""),
      Mobile:new FormControl(""),
      address:new FormControl(""),
      check1:new FormControl(""),
      check2:new FormControl(""),
      check3:new FormControl(""),
      check4:new FormControl(""),

      }
    )

    }

  ngOnInit(): void {
document.body.className="bgIMG"

  }
 
    //  *******************CheckBox***********************  
    onChangeToggle(event:any) {
      console.log(event.target.checked);
      if(event.target.checked== true){
        this.isShown=true
        console.log("visible");
        
      } else{
        this.isShown=false 
        console.log("invisible"); 
      }
      }

      // **************************
onClick(){
      let data5:any =this.form.value;
      this.router.navigate(['/profile'],{
        queryParams:{data:JSON.stringify(data5)}
        
          })
    } 

}
