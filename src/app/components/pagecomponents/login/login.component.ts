// import { LoaderService } from './../../../services/LoaderService/loader.service';
import { LoaderService } from '../../../services/LoaderService/loader.service'
import { AuthService } from './../../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { loginModel } from '../../../models/login.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { delay, isEmpty } from 'rxjs/operators';
import { interval, Subject, Subscription } from 'rxjs';
import { timeStamp } from 'console';
import { AppSettings } from 'app/models/appsetting';
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
// import { ReCaptcha2Component } from 'ngx-captcha';
import { NgxCaptchaModule, ReCaptcha2Component } from 'ngx-captcha';
import { Delivery } from 'app/models/delivery';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
  delivery = new Delivery();
  div1: boolean = true;
  div2: boolean = false;
  div3: boolean = false;
  siteKey: string = "6Ld_H3sbAAAAAARN_lMYL3LCVf4gKmSXnSWl-bea";
  loginModel = new loginModel();
  data: any = [];
  mail: any = []
  flag = 0;
  panNo: string;
  emailID: string;
  isAuthenticationFailure: boolean = true;
  loginMessage: string
  email: any;
  submitted = false;
  timeDifference: number;
  milliSecondsInASecond: number = 1000;
  private subscription: Subscription;
  timerFlag: boolean = false;
  wrongotp: boolean = false;
  emailhere: string;
  errorMessage: boolean = false;
  emailmessage: string;
  loginMessage1: string;
  invalid: boolean = false;
  invalidmessage: any;
  message: string = "false";

  public loginForm = new FormGroup({
    // PAN: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
    OTP: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')]),
    Email: new FormControl(''),
    recaptcha: new FormControl('', Validators.required)

  })
  bussinesspartneroid: any;
  samplearray2: any[];
  samplearray: any[];
  samplearray3: any[];
  // samplearray4: Delivery[];
  samplearray4: Array<Delivery> = [];
  otp: void;
  errorcode: string = "";

  constructor(private http: HttpClient, private loginService: LoginService,
    private router: Router, private toastr: ToastrService, private authService: AuthService,
    private loaderservice: LoaderService, private route: ActivatedRoute,  private titleService:Title) {
    this.timeDifference = AppSettings.OTP_TIME;
    sessionStorage.removeItem("PROFILE_ACCESS")

  }
  get f() { return this.loginForm.controls };

  ngOnInit(): void {
    sessionStorage.removeItem('portaltype');
    this.titleService.setTitle("BCCL Partner Portal");
    this.route.queryParams.subscribe(params => {
     
      console.log("Params=======> ",params); // { order: "popular" }
      this.message = params.order;
      this.errorcode = params.errorstatus;
// if(params.errorstatus == '408')
// {
//   this.message = params.order;
// }
// else
// {
//   this.message = params.order;
// }
      
      console.log( "message===========>",  this.message  ); // popular
    }
    );
    if (this.message == "true") {
if(this.errorcode == '408')
{
  this.loginMessage = "Invalid session. Session timed out !!!"
  this.authService.logout();
  this.emailmessage = "null";
}
else
{
  this.loginMessage = "Session expired. Please login !!! "
  this.authService.logout();
  this.emailmessage = "null";
}
      
    }

  }
  emails: any = [];

  // submit() {
  //   this.div1 = false;
  //   this.div2 = true;

  // }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }


  /*Sending User input pan and check is is valid or not*/
  // submitPAN(PAN: string) {
  //   // console.log(PAN, typeof (PAN));
  //   this.loginMessage = "";
  //   if (!this.loginForm.controls.Email.valid) {
  //     this.submitted = true;
  //     return
  //   }

  //   let pan = PAN;
  //   // this.loginService.sendPAN(pan).subscribe(res => {
  //   //   if ((res[0].data == undefined) || (res[0].data == '')) {
  //   //     this.isAuthenticationFailure = false
  //   //     this.loginMessage = res[0].message
  //   //     // this.toastr.error(this.loginMessage);
  //   //   }
  //   //   else {

  //   //     this.panNo = res[0].data[0].pan
  //   //     this.emails.push(res[0].data[0].email1)
  //   //     this.emails.push(res[0].data[0].email2)
  //   //     this.emails.push(res[0].data[0].email3)
  //   //     for (let i = 0; i <= (this.emails.length - 1); i++) {
  //   //       //  console.log( "data", this.emails[i] , i)
  //   //       this.mail.push(this.censorEmail(this.emails[i]))
  //   //     }
  //   //     // console.log("censored", this.mail)

  //   //     if ((this.panNo == '') || (this.emailID == '')) {
  //   //       this.isAuthenticationFailure = false
  //   //       this.loginMessage = res[0].message
  //   //       // this.toastr.error(this.loginMessage);
  //   //     }
  //   //     else {
  //   //       this.loginForm.controls.PAN.setValue(this.panNo)
  //   //       this.loginForm.controls.Email.setValue(this.emailID)
  //   //       // console.log("setvalue", this.loginForm)
  //   //       // this.toastr.success("Sucess!! OTP sent sucessfully to your E-mail ID.")
  //   //       this.div1 = false;
  //   //       this.div2 = true;
  //   //     }
  //   //   }


  //   // })
  // }

  /* Dummy Functionality */
  dummyLogin() {
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }

  /* Send OTP to the Email ID */

  // sendOTP(pan: string, email: string) {
  //   this.wrongotp = false;
  //   this.invalidmessage = "";
  //   this.loginForm.controls['OTP'].reset();


  //   this.timeDifference=AppSettings.OTP_TIME;
  //   console.log("is valid ??", this.loginForm.controls.Email)
  //   if (this.loginForm.controls.Email.value == undefined || this.loginForm.controls.Email.value == null || this.loginForm.controls.Email.value == "") {
  //     this.submitted = true
  //     this.timerFlag = false;
  //     return
  //   }
  //   else{
  //     this.timerFlag=true;
  //   }
  //   const inx = this.mail.findIndex(mail => mail === email);
  //   // console.log("loginData", pan, email, inx , this.emails[inx]) 
  //   this.loginModel.Email = this.emails[inx];
  //   sessionStorage.setItem("loginUser", this.loginModel.Email)
  //   if (pan == null || pan == "" || email == null || email == "") {
  //     this.toastr.error("Please Select Email ID.")
  //   }
  //   else {
  //     this.loaderservice.show();
  //     this.loginService.sendOTP(pan, this.emails[inx]).subscribe(res => {
  //       // console.log("data from backend ", res[0].message)
  //       this.startTimer();
  //       if (res[0].message == "OTP send to email address") {

  //         // this.toastr.success("Success!! OTP sent sucessfully to your E-mail ID.")
  //         this.emailmessage = "otpsuccess";
  //         setTimeout(() => {
  //           this.loginMessage ="";

  //         }, 
  //        10000);
  //        this.loginMessage = "OTP sent successfully to your E-mail ID."

  //       } else {
  //         this.emailmessage = "otpfail";
  //         setTimeout(() => {
  //           this.loginMessage ="";

  //         }, 10000);
  //         this.loginMessage = "Email not delievered !!"
  //       }
  //       this.div3 = true;
  //       this.loaderservice.hide();
  //     })
  //   }
  // }

  /* Login to the Dashboard */
  // login() {
  //   if (this.loginForm.controls.Email.value != null || this.loginForm.controls.PAN.value != null || this.loginForm.controls.OTP.value != null)
  //     // console.log("this.loginModel", this.loginModel)
  //     this.loginModel.PAN = this.loginForm.controls.PAN.value;
  //   this.loginModel.OTP = this.loginForm.controls.OTP.value;
  //   // this.loginModel.Email = this.loginForm.controls.Email.value;
  //   if (this.loginForm.status == 'VALID') {
  //     this.loginService.signin(this.loginModel.Email, this.loginModel.OTP, this.loginModel.PAN).subscribe(res => {
  //       // console.log("userdata", res);
  //       const accessKey = res.headers.get('Authorizationkey');
  //       const profileAccesKey = res.headers.get('Authorization');
  //       const Bid = res.body[0].Bid;
  //       //  console.log("is Bid ??", Bid)
  //       sessionStorage.setItem("Bid", Bid);
  //       if (res.body[0].message == "Invalid OTP") {
  //         // this.toastr.error(res.body[0].message)
  //         this.invalid = true;

  //         this.invalidmessage = res.body[0].message;
  //         // this.loginMessage = res.body[0].message;
  //       }
  //       else if (res.body[0].message == "Valid Otp") {
  //         // this.toastr.success("success!!");
  //         if (res != null || res != undefined) {
  //           // console.log("AuthKey", res.headers.get('Authorizationkey'), "Authorization", res.headers.get('Authorization'));
  //           if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
  //             sessionStorage.setItem('ACCESS_TOKEN', accessKey);
  //             sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);
  //             this.authService.login()

  //             this.loaderservice.show()
  //             setTimeout(() => {
  //               this.router.navigate(['/dashboard']).then(() => {
  //                 window.location.reload();
  //               });
  //             }, 200);



  //             //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
  //             //     this.router.navigate(['/dashboard']);
  //             // }); 
  //             this.loaderservice.hide();

  //             // location.reload();
  //           }
  //         }
  //       } else {
  //         this.invalid = true;
  //         this.invalidmessage = res.body[0].message;
  //         // this.toastr.error(res.body[0].message)
  //       }
  //     })
  //   }
  //   else {
  //     // this.toastr.error("Please enter valid Data")
  //     this.emailmessage=null;
  //     this.loginMessage = "Please Select Captcha"
  //   }
  // }

  /* Masking Data Logic*/
  censorWord(str) {
    return str[0] + str[1] + str[2] + "*".repeat(str.length - 2) + str.slice(-3);
  }
  censorEmail(email: any) {
    var arr = email.split("@");
    return this.censorWord(arr[0]) + "@" + this.censorWord(arr[1]);
  }

  private getTimeDifference(ref: number) {
    this.allocateTimeUnits(this.timeDifference, ref);
  }

  private allocateTimeUnits(timeDifference, ref: number) {
    this.timeDifference = timeDifference - 1;
    if (this.timeDifference == 0) {
      this.stopTimer()
    }
  }
  // stopTimer() {
  //   this.subscription.unsubscribe();
  //   this.timerFlag=false
  // }

  // startTimer() {
  //   this.subscription = interval(this.milliSecondsInASecond)
  //     .subscribe(x => { this.getTimeDifference(0); });
  // }

  // resetbelowvalue(event){
  //   this.loginMessage = "";
  //   this.invalidmessage = "";
  //   console.log("event is here"+event.value);
  //   this.emailhere = event.value;
  //   console.log(this.loginForm.controls['OTP'].value);
  //   if(this.loginForm.controls['OTP'].value != "")
  //   {
  //     console.log("in if");
  //     this.loginForm.controls['OTP'].setValue(null);
  //     this.captchaElem.resetCaptcha();
  //     this.stopTimer()
  //     this.div3 = false;
  //   }
  //   else
  //   {
  //     console.log("in hees");
  //   }
  // }
  //   checkotp(event)
  //   {
  //     this.wrongotp = false; 
  // console.log("event is here "+event.target.value.length);
  // if(event.target.value.length == 6)
  // {
  //  if (this.loginForm.controls.Email.value != null || this.loginForm.controls.PAN.value != null || this.loginForm.controls.OTP.value != null)
  //       // console.log("this.loginModel", this.loginModel)
  //       this.loginModel.PAN = this.loginForm.controls.PAN.value;
  //     this.loginModel.OTP = this.loginForm.controls.OTP.value;
  //       this.loginService.signin(this.loginModel.Email, this.loginModel.OTP, this.loginModel.PAN).subscribe(res => {

  //         if (res.body[0].message == "Invalid OTP") {

  //           this.wrongotp = true;
  //           // setTimeout(()=>{  this.wrongotp = false; }, 10000)


  //         }
  //         else if (res.body[0].message == "Valid Otp") {
  //           this.wrongotp = false;

  //         } else {
  //           this.wrongotp = false;
  //           this.invalid = true;
  //           this.invalidmessage = res.body[0].message;

  //         }
  //       })

  //   }
  //   else{
  //     return false;
  //   }
  //   }

  // clearform(){
  //   this.loginForm.controls.OTP.setValue(null)
  //   this.wrongotp=false;
  //   this.invalid=false;
  // }




  // ----------------------------------------Changes 27-10-2021 start---------------------------------------------------

  sendemailid(PAN: string) {
    this.loaderservice.show();
    // console.log(PAN, typeof (PAN));
    this.timeDifference = AppSettings.OTP_TIME;
    // this.samplearray=[];
    // this.samplearray2 = [
    //   {key:"ponumber",value:"PO123456"},
    //   {key:"invoicenumber",value:"INV7654321"}

    // ];
    // this.samplearray3 = [
    //   {key:"ponumber",value:"PO123456"},
    //   {key:"invoicenumber",value:"INV7654321"}

    // ];


    // ];
    // var data =
    //           this.ensureDetail[i][0] + "," + this.ensureDetail[i][1] + "," + this.ensureDetail[i][4] 
    //           + "," + encodeURIComponent(this.ensureDetail[i][6]) + "," + localStorage.getItem('UserOID') + "," 
    //           + this.ensureDetail[i][8] + "," + encodeURIComponent(this.ensureDetail[i][9]) + "," + this.ensureDetail[i][10] 
    //           + "," + localStorage.getItem('UserOID') + "," + 'A' + "," + this.ensureDetail[i][5] + "," 
    //           + this.ensureDetail[i][21];
    // var data1 =
    //           this.ensureDetail[i][0] + "," + this.ensureDetail[i][1] + "," + this.ensureDetail[i][4] 
    //           + "," + encodeURIComponent(this.ensureDetail[i][6]) + "," + localStorage.getItem('UserOID') + "," 
    //           + this.ensureDetail[i][8] + "," + encodeURIComponent(this.ensureDetail[i][9]) + "," + this.ensureDetail[i][10] 
    //           + "," + localStorage.getItem('UserOID') + "," + 'A' + "," + this.ensureDetail[i][5] + "," 
    //           + this.ensureDetail[i][21];         

    // this.samplearray.push(data);
    // this.samplearray.push(data1);
    // this.samplearray.push(this.samplearray4);

    // this.samplearray4 = [
    //   {ponumber:'PO102454',invoicenumber:"INV7654322"},
    //   {ponumber:'PO102453',invoicenumber:"INV7654321"}
    // ]
    // for(var a=0;a<=2;a++)
    // {
    //   let delivery = new Delivery();
    // this.delivery.ponumber = "PO102454";
    // this.delivery.invoicenumber = "INV7654322"
    // }
    // let delivery = new Delivery();
    // delivery.ponumber = "PO102454";
    // delivery.invoicenumber = "INV7654322"
    // this.samplearray4.push(delivery);
    // let delivery1 = new Delivery();
    // delivery1.ponumber = "PO102453";
    // delivery1.invoicenumber = "INV7654321"
    // this.samplearray4.push(delivery1);
    // console.log("this.samplearray4 "+this.samplearray4);
    // this.loginService.sendEmaildemo(this.samplearray4).subscribe(res => {

    // });

    // c-tejas.bangera@timesgroup.com
    // this.captchaElem.resetCaptcha();
    // this.captchaElem.reloadCaptcha();

    this.loginForm.controls['OTP'].setValue(null);
    // this.loaderservice.show();
    this.loginMessage = "";
    if (!this.loginForm.controls.Email.valid) {
      this.submitted = true;
      return
    }

    let emailid = PAN.toLowerCase();
    console.log(emailid);
    
    this.loginService.sendEmail(emailid).subscribe(res => {
      this.loaderservice.hide();
      if (res[0].message == 'No Data Found for given Email Id') {
        console.log("in");
        this.loginMessage = 'Email ID not Registered'
        // this.toastr.error(this.loginMessage);
      }
      else if(res[0].message == 'deactivated')
        {
          this.loginMessage = 'Currently in beta. Await further communication.'
        }
      else{
        sessionStorage.setItem("loginUser", emailid);
        this.bussinesspartneroid = res[0].poData.BUSINESSPARTNEROID;
        console.log("this.bussinesspartneroid ==> " + this.bussinesspartneroid);
        // this.emails.push(res[0].data[0].email1)
        // this.emails.push(res[0].data[0].email2)
        // this.emails.push(res[0].data[0].email3)
        // for (let i = 0; i <= (this.emails.length - 1); i++) {
        //   //  console.log( "data", this.emails[i] , i)
        //   this.mail.push(this.censorEmail(this.emails[i]))
        // }
        // console.log("censored", this.mail)

        // if (this.bussinesspartneroid == '') {
        //   this.isAuthenticationFailure = false
        //   this.loginMessage = res[0].message
        //   // this.toastr.error(this.loginMessage);
        // }
        // else {
        //   // this.loginForm.controls.PAN.setValue(this.panNo)
        //   this.loginForm.controls.Email.setValue(this.emailID)
        //   // console.log("setvalue", this.loginForm)
        //   // this.toastr.success("Sucess!! OTP sent sucessfully to your E-mail ID.")
        //   this.div1 = false;
        //   this.div2 = true;
        // }

        this.startTimer();
        this.timerFlag = true;
      this.otp = res[0].message
    //  alert(res[0].message);
        if ((res[0].message).includes("OTP send to email address")) {

          // this.toastr.success("Success!! OTP sent sucessfully to your E-mail ID.")
          this.emailmessage = "otpsuccess";
          setTimeout(() => {
            this.loginMessage = "";

          },
            10000);
          this.loginMessage = "OTP sent successfully to your E-mail ID."

        } else {
          this.emailmessage = "otpfail";
          setTimeout(() => {
            this.loginMessage = "";

          }, 10000);
          this.loginMessage = "Email not delivered !!"
        }
        this.div1 = false;
        this.div2 = true
        this.div3 = true;

      }

      // this.loaderservice.hide();
    });
    err => {
      this.loaderservice.hide();
    };
    // this.loaderservice.hide();
  }


  //  sendOTP(email: string) {
  //     this.wrongotp = false;
  //     this.invalidmessage = "";
  //     this.loginForm.controls['OTP'].reset();


  //     this.timeDifference=AppSettings.OTP_TIME;
  //     console.log("is valid ??", this.loginForm.controls.Email)

  //     // if (this.loginForm.controls.Email.value == undefined || 
  //     //   this.loginForm.controls.Email.value == null || 
  //     //   this.loginForm.controls.Email.value == "") {
  //     //   this.submitted = true
  //     //   this.timerFlag = false;
  //     //   return
  //     // }
  //     // else{
  //     //   this.timerFlag=true;
  //     // }
  //     // const inx = this.mail.findIndex(mail => mail === email);
  //     // // console.log("loginData", pan, email, inx , this.emails[inx]) 
  //     // this.loginModel.Email = this.emails[inx];
  //     // sessionStorage.setItem("loginUser", this.loginModel.Email)
  //     // if (pan == null || pan == "" || email == null || email == "") {
  //     //   this.toastr.error("Please Select Email ID.")
  //     // }
  //     // else {
  //       this.loaderservice.show();
  //       this.loginService.sendOTP(this.bussinesspartneroid, email).subscribe(res => {
  //         // console.log("data from backend ", res[0].message)
  //         this.startTimer();
  //         if (res[0].message == "OTP send to email address") {

  //           // this.toastr.success("Success!! OTP sent sucessfully to your E-mail ID.")
  //           this.emailmessage = "otpsuccess";
  //           setTimeout(() => {
  //             this.loginMessage ="";

  //           }, 
  //          10000);
  //          this.loginMessage = "OTP sent successfully to your E-mail ID."
  //          this.timerFlag=true;

  //         } else {
  //           this.emailmessage = "otpfail";
  //           setTimeout(() => {
  //             this.loginMessage ="";

  //           }, 10000);
  //           this.loginMessage = "Email not delievered !!"
  //         }
  //         this.div3 = true;
  //         this.loaderservice.hide();
  //       })
  //     // }
  //   }

  /* Login to the Dashboard */
  login() {
    if (this.loginForm.controls.OTP.value != null)
      // console.log("this.loginModel", this.loginModel)
      // this.loginModel.PAN = this.loginForm.controls.PAN.value;
      this.loginModel.OTP = this.loginForm.controls.OTP.value;
     console.log(this.loginForm.controls['Email'].value.toLowerCase());
      
    this.loginModel.Email = this.loginForm.controls['Email'].value.toLowerCase();
    if (this.loginForm.status == 'VALID') {
      this.loginService.signin(this.loginModel.Email, this.loginModel.OTP, this.bussinesspartneroid).subscribe(res => {
        // console.log("userdata", res);
        const accessKey = res.headers.get('Authorizationkey');
        const profileAccesKey = res.headers.get('Authorization');
        const Bid = this.bussinesspartneroid;
        //  console.log("is Bid ??", Bid)

        if (res.body[0].message == "Invalid OTP") {
          // this.toastr.error(res.body[0].message)
          this.invalid = true;
          setTimeout(() => {
            // this.loginMessage ="";
            this.invalidmessage = "";
          },
            10000);
          //  this.loginMessage = "OTP sent successfully to your E-mail ID."

          this.invalidmessage = res.body[0].message;
          // this.loginMessage = res.body[0].message;
        }
        else if (res.body[0].message == "Valid Otp") {
          sessionStorage.setItem("Bussinesspartnertext", res.body[0].bussinesspartnertext);
          sessionStorage.setItem("Bid", Bid);

          if (res != null || res != undefined) {
            // console.log("AuthKey", res.headers.get('Authorizationkey'), "Authorization", res.headers.get('Authorization'));
            if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
              sessionStorage.setItem('ACCESS_TOKEN', accessKey);
              sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);
              sessionStorage.setItem("portaltype","vendorportal");
              this.authService.login()

              this.loaderservice.show()
              setTimeout(() => {
                this.router.navigate(['/dashboard']).then(() => {
                  window.location.reload();
                });
              }, 100);
              this.loaderservice.hide();
            }
          }
        } else {
          this.invalid = true;
          setTimeout(() => {
            // this.loginMessage ="";
            this.invalidmessage = "";
          },
            10000);
          this.invalidmessage = res.body[0].message;
        }
      })
    }
    else {
      this.emailmessage = null;
      this.loginMessage = "Please Select Captcha"
    }
  }

  clearform() {
    this.loginForm.controls.OTP.setValue(null)
    this.wrongotp = false;
    this.invalid = false;
  }


  checkotp(event) {
    // this.wrongotp = false;
    // console.log("event is here " + event.target.value.length);
    // if (event.target.value.length == 6) {
    //   if (this.loginForm.controls.Email.value != null || this.loginForm.controls.OTP.value != null)
    //     // console.log("this.loginModel", this.loginModel)
    //     // this.loginModel.PAN = this.loginForm.controls.PAN.value;
    //     this.loginModel.OTP = this.loginForm.controls.OTP.value;
    //   this.loginModel.Email = this.loginForm.controls.Email.value.toLowerCase();
    //   this.loginService.signin(this.loginModel.Email, this.loginModel.OTP, this.bussinesspartneroid).subscribe(res => {

    //     if (res.body[0].message == "Invalid OTP") {

    //       this.wrongotp = true;
    //     }
    //     else if (res.body[0].message == "Valid Otp") {
    //       this.wrongotp = false;

    //     } else {
    //       this.wrongotp = false;
    //       this.invalid = true;
    //       this.invalidmessage = res.body[0].message;

    //     }
    //   })

    // }
    // else {
    //   return false;
    // }
  }

  stopTimer() {
    this.subscription.unsubscribe();
    this.timerFlag = false
  }

  startTimer() {
    this.subscription = interval(this.milliSecondsInASecond)
      .subscribe(x => { this.getTimeDifference(0); });
  }

  ValidateEmail(event) {
    // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/.test(event.target.value)) {
      // [<>=]{1,2}
      this.submitted = false;
      console.log("true here");
      return (true)
    }
    this.submitted = true;
    console.log("false here");
    // alert("You have entered an invalid email address!")
    return (false)
  }
  // ----------------------------------------Changes 27-10-2021 end ------------------------------------------------
}
