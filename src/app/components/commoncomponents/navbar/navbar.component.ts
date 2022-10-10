import { AuthService } from './../../../services/auth/auth.service';
import { AuthGuard } from './../../../guard/auth.guard';
import { ProfileDataService } from '../../../services/profileData/profileData.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { windowCount } from 'rxjs/operators';
import { LoginService } from 'app/services/login/login.service';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileGeneralDataComponent } from 'app/components/pagecomponents/profiledata/profiledata.component';
import * as data from 'assets/configdata/appconfig.json'
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
import {Title} from "@angular/platform-browser";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @ViewChild(ProfileGeneralDataComponent) profilegeneraldata: ProfileGeneralDataComponent;
    @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
    // headerDisplay = require('assets/configdata/appconfig.json').headerDisplay;
    headerDisplay=data.headerDisplay
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    isLoggedin: boolean = false;
    isLoggedIn$: Observable<boolean>;
    url: string;
    showStatus: boolean = true;
    email: string;
    userName: string;
    gstpincodevalues: any = [];
    gstpincode: any = [];
    gstpinlist: any = [];
    commonfilter: any = {};
    isbuyer: boolean = false;
    isenduser: boolean = false;
    ispayee: boolean = false;
    // public myProfileForm = new FormGroup({
    //     gst: new FormControl(''),
    //     pin: new FormControl('')

    // });
    public loginForm = new FormGroup({
        // PAN: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
        // OTP: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]{6}$')]),
        Email: new FormControl(''),
        // recaptcha: new FormControl('', Validators.required)
    
      })

    public POOrderList = new FormGroup({
        gst: new FormControl('', [Validators.required]),
        pincode: new FormControl('', [Validators.required])

    });
    pinlist: any = [];
    changed: boolean = false;
    differentbid: boolean = false;
    gst: string;
    pincode: string;
    pinlist1: any;
    switched: boolean = false;
    currgstvalue: any;
    currpincode: any;
    bussinesspartnertext: string;
    bid: string;
    innerportal: boolean=false;
    innerbuyerportal: boolean = false;
    forinternal: string;
    username: any;
    currcity: string;
    vendorPortal: boolean = false;
    internalbcclportal: boolean =false;
    todaysDate=new Date();
    type: string;
    sessiontimeout: boolean;
    constructor(location: Location, private element: ElementRef, private router: Router,
        private loginService: LoginService,
        private loaderservice: LoaderService, private profileService: ProfileDataService, private authService: AuthService,
        private titleService:Title ) {
        this.location = location;
        this.sidebarVisible = false;

    }


    ngOnInit() {
        this.username = sessionStorage.getItem('username')
        this.type = sessionStorage.getItem("portaltype");
        if(this.type == 'innerbuyerportal')
        {
            this.isenduser=true;
        }
        else if(this.type == 'innerportal')
        {
            this.isenduser=false;
        }
        else if(this.type == 'payerportal')
        {
            this.ispayee=true;
        }
        else if(this.type == 'vendorportal')
        {
            this.vendorPortal=true;
        }
        else if(this.type=='internalbcclportal'){
            this.internalbcclportal=true;
        }
        else if(this.type =='vendorportal')
        {   
            this.vendorPortal=true;
            console.log(this.vendorPortal,'this.vendorPortal vendorPortal')
        }
      
        // this.username = 
        // ,"innerportal");
        // console.log("type is here "+type);
        
        // if(type == 'innerportal')
        // {
        //     console.log("in if");
        //     // this.innerportal = true;
            
        // }
        // else if(type == 'innerbuyerportal')
        // {
        //     this.innerbuyerportal = true;
        // }
        // else
        // {
        //     console.log("in else");
        //     this.innerportal = false;
        //     this.innerbuyerportal=false;
        // }
        
        this.url = this.router.url;
        this.authService.getNotifier().subscribe(res => {
            console.log("Notifier response", res)
            this.showStatus = res.inlogin
        })
        var curgst = sessionStorage.getItem('currentgst');
        var curpincode = sessionStorage.getItem('currentpincode');
        var city = sessionStorage.getItem('city');
        this.bid = sessionStorage.getItem('Bid');
        this.bussinesspartnertext = sessionStorage.getItem('Bussinesspartnertext');
        // sessionStorage.setItem("Bussinesspartnertext", res.body[0].bussinesspartnertext);
        if (curgst != '') {
            this.currgstvalue = curgst;
            this.currpincode = curpincode;
            this.currcity = city;
            // this.switched = true;
        }
        // const inx = this.mail.findIndex(mail => mail === email); 
        // if(this.isLoggedIn$){
        this.getloggedinUser();
        if(sessionStorage.getItem("loginUser") !=null)
        {
        this.getgst()
        }
        // }
        // this.getpicodegst();
        // this.getuserProfile();
        // console.log("Active URL",window.URL)


        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });

        //Hide Navbar elements if not logged in 
         this.isLoggedIn$ = this.authService.isLoggedin;
       
        //  console.log(this.isLoggedIn$)
        window.addEventListener('popstate', function (event) {
            if (window.location.href.includes('/login')) {
                // Log the state data to the console
                sessionStorage.clear();
                window.location.reload();
            }
            console.log(event.state);
        });

    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            // toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        // this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return '';
    }


 

    logOut() {

        this.loginService.logout().subscribe(res => {
            console.log("response is here ==> " + res);
            if (res[0].data == 'true') {
                this.titleService.setTitle("BCCL PartnerDX");
               
                var typeOfuser=sessionStorage.getItem('portaltype')
                if(typeOfuser == 'innerportal' || typeOfuser == 'internalbcclportal' ||
                typeOfuser == 'innerbuyerportal' || typeOfuser == 'payerportal'){
                this.router.navigate(['/invalidsession'], { queryParams: { order: btoa("true") } }).then(()=>{
                    this.authService.logout();
                    sessionStorage.removeItem('loginUser');
                // window.location.reload();
            });
            }
            else{
                this.router.navigate(['/login']).then(()=>{
                    this.authService.logout();
                    sessionStorage.removeItem('loginUser');
                // window.location.reload();
            });
            }
                
            }

        });
        
    }
   
        
     



    


    editProfile() {

        // let LoginUser= sessionStorage.getItem("PAN")
        // location.reload();
        this.router.navigate(['/profileGeneralData']);
    }

    getloggedinUser() {
        console.log(sessionStorage.getItem("loginUser"));
        if(sessionStorage.getItem("loginUser") !=null)
        {
            this.email = sessionStorage.getItem("loginUser");
            this.userName = this.email.substring(0, this.email.lastIndexOf("@"));
    
            console.log("LoginUser", this.userName);   // john.doe
        }
        
    }



    // getgstpincodevalues() {
    //     this.gstpincodevalues = [
    //         { bid: '1', value: '421202' },
    //         { bid: '1', value: '421201' }
    //     ]
    // }

    signinnewuser(event) {
        console.log("event.target.value ==> " + event.target.value);
        console.log("this.gstpinlist ==> ", this.gstpinlist);
        console.log("this.changed " + this.changed);
        // if(event.target.value == '' || (!this.POOrderList.controls['gst'].value) ||
        // (!this.POOrderList.controls['pincode'].value) || (!this.changed))
        // {
        //     return false;
        // }
        // for (var i = 0; i < this.gstpinlist.length; i++) {
        //     if (this.gstpinlist[i].bid == event.target.value) {
        //         console.log("this.gstpinlist[i].primaryemail" + this.gstpinlist[i].primaryemail);
        //         sessionStorage.setItem("loginUser", this.gstpinlist[i].primaryemail)
        //         sessionStorage.setItem("gstselectedpincodegst", this.gstpinlist[i].bid)
        //     }
        // }
        // for (var a = 0; a < this.gstpincode.length; a++) {
        //     // var sessionbid = sessionStorage.getItem('bid');
        //    if(this.POOrderList.controls['pincode'].value == this.gstpincode[a].BUSINESSPARTNEROID &&
        //    this.POOrderList.controls['gst'].value == this.gstpincode[a].BUSINESSPARTNEROID)
        //    {

        //    }

        // }
        //    if(this.POOrderList.controls['pincode'].value != this.POOrderList.controls['gst'].value)
        //    {
        //     //    this.differentbid = true;
        //     return;
        //    }
        //    else
        //    {
        //    for(var a = 0; a < this.gstpincode.length; a++)
        //    {
        //        if(this.gstpincode[a])
        //        var email = 
        //    }
        // sessionStorage.setItem("loginUser", this.gstpinlist[i].primaryemail)
        // sessionStorage.setItem("gstselectedpincodegst", this.POOrderList.controls['pincode'].value)
        // this.loginService.signonhistory(this.POOrderList.controls['pincode'].value).subscribe(res => {
        //     const accessKey = res.headers.get('Authorizationkey');
        //     const profileAccesKey = res.headers.get('Authorization');
        //     //  console.log("is Bid ??", Bid)
        //     sessionStorage.setItem("Bid", this.POOrderList.controls['pincode'].value);

        //     // if (res.body[0].message == "Invalid OTP") {
        //     //   // this.toastr.error(res.body[0].message)
        //     //   this.invalid = true;
        //     //   this.invalidmessage = res.body[0].message;
        //     //   // this.loginMessage = res.body[0].message;
        //     // }
        //     // else 
        //     if (res.body[0].message == "Success") {
        //         // this.toastr.success("success!!");
        //         if (res != null || res != undefined) {
        //             // console.log("AuthKey", res.headers.get('Authorizationkey'), "Authorization", res.headers.get('Authorization'));
        //             if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
        //                 sessionStorage.setItem('ACCESS_TOKEN', accessKey);
        //                 sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);

        //                 this.authService.login()

        //                 this.loaderservice.show()
        //                 setTimeout(() => {
        //                     this.router.navigate(['/dashboard']).then(() => {
        //                         window.location.reload();
        //                     });
        //                 }, 200);


        //                 //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        //                 //     this.router.navigate(['/dashboard']);
        //                 // }); 
        //                 this.loaderservice.hide();
        //                 // this.getpicodegst()
        //                 // location.reload();
        //             }
        //         }
        //     } else {
        //         //   this.invalid = true;
        //         //   this.invalidmessage = res.body[0].message;
        //         // this.toastr.error(res.body[0].message)
        //     }



        // });
        // err => {
        //     // this.loaderservice.hide();
        // };
        // }
    }
    getuserProfile() {
        try {
            this.profileService.getProfile().subscribe(response => {

                console.log("profileDetails", response[0])
                if (response) {
                    console.log("success")
                    // console.log("updated form", this.organizationData)
                    sessionStorage.setItem('GST', response[0].bankingData[0].GST_REGN);
                    sessionStorage.setItem('PINCODE', response[0].generalData[0].POSTAL_CODE);

                    this.gst = response[0].bankingData[0].GST_REGN;
                    this.pincode = response[0].generalData[0].POSTAL_CODE;
                }


            })
        } catch (Error) {
            console.error("error in getDetails", Error);
        }

    }
    getpincode() {
        this.pinlist1 = [];
        this.pinlist = [];
        var gst = this.POOrderList.controls['gst'].value;
        console.log("gst is here ==>" + gst);
        this.loginService.getpincode(gst).subscribe(res => {
            if (res.body[0].message == "Success") {
                this.pinlist1 = res.body[0].poData;
                // var bussinessuseroid =  sessionStorage.getItem('Bid');
                // console.log("bussinessuseroid ==>"+bussinessuseroid);
                // this.pinlist = res.body[0].poData;
                console.log("this.pinlist", this.pinlist1.length);
                console.log("this.pinlist", this.pinlist1);
                for (var b = 0; b < this.pinlist1.length; b++) {
                    this.pinlist.push({
                        bid: this.pinlist1[b].BUSINESSPARTNEROID,
                        value: this.pinlist1[b].PINCODE,
                        city: this.pinlist1[b].CITY
                        // primaryemail: this.pinlist[b].PRIMARYEMAILID
                    });
                }


            }
            else {

            }


        });
        err => {

        };
    }

    getgst() {
        this.gstpinlist = [];
        var email = sessionStorage.getItem('loginUser');
        this.loginService.getgst(email).subscribe(res => {
            if (res.body[0].message == "Success") {
                this.gstpincode = res.body[0].poData;
                var bussinessuseroid = sessionStorage.getItem('Bid');
                for (var c = 0; c < this.gstpincode.length; c++) {
                    if (bussinessuseroid == this.gstpincode[c].BUSINESSPARTNEROID) {
                        this.currgstvalue = this.gstpincode[c].ATTRIBUTEVALUE;
                    }
                }
                this.loginService.getpincode(this.currgstvalue).subscribe(res => {
                    if (res.body[0].message == "Success") {
                        this.pinlist1 = res.body[0].poData;
                        // // var bussinessuseroid =  sessionStorage.getItem('Bid');
                        // // console.log("bussinessuseroid ==>"+bussinessuseroid);
                        // // this.pinlist = res.body[0].poData;
                        // console.log("this.pinlist", this.pinlist1.length);
                        // console.log("this.pinlist", this.pinlist1);
                        // for (var b = 0; b < this.pinlist1.length; b++) {
                        //     this.pinlist.push({
                        //         bid: this.pinlist1[b].BUSINESSPARTNEROID,
                        //         value: this.pinlist1[b].PINCODE,
                        //         // primaryemail: this.pinlist[b].PRIMARYEMAILID
                        //     });
                        // }
                        for (var p = 0; p < this.pinlist1.length; p++) {
                            if (bussinessuseroid == this.pinlist1[p].BUSINESSPARTNEROID) {
                                this.currpincode = this.pinlist1[p].PINCODE;
                                this.currcity = this.pinlist1[p].CITY;
                            }

                        }


                    }
                    else {

                    }


                });
                err => {

                };
                console.log("bussinessuseroid ==>" + bussinessuseroid);
                this.gstpinlist = res.body[0].poData;
                

            }
            else {

            }


        });
        err => {

        };
    }

    getvalues(event) {
        this.changed = true;
        console.log("event.target.value" + event.target.value);
    }

    submitgstpin() {
        console.log(this.POOrderList.controls['pincode'].value);
        this.loginService.signonhistory(this.POOrderList.controls['pincode'].value).subscribe(res => {
            if(res.body[0].message == "Success")
            {
            const accessKey = res.headers.get('Authorizationkey');
            const profileAccesKey = res.headers.get('Authorization');
            //  console.log("is Bid ??", Bid)
            sessionStorage.setItem("Bid", this.POOrderList.controls['pincode'].value);
            sessionStorage.setItem("currentgst", this.POOrderList.controls['gst'].value);
            sessionStorage.setItem("Bussinesspartnertext", res.body[0].Bussinesspartnertext);
            
            // sessionStorage.setItem("currentpincode", this.POOrderList.controls['pincode'].value);
            for (var y = 0; y < this.pinlist.length; y++) {
                if (this.pinlist[y].BUSINESSPARTNEROID == this.POOrderList.controls['pincode'].value) {
                    // this.currpincode = this.pinlist[y].PINCODE;
                    sessionStorage.setItem("currentpincode", this.pinlist[y].PINCODE);
                    console.log("this.pinlist[y].CITY==>",this.pinlist[y].CITY)
                    sessionStorage.setItem("city", this.pinlist[y].CITY);
                    
                }
            }
            // this.gst = this.POOrderList.controls['gst'].value;
            // this.pincode = this.POOrderList.controls['pincode'].value
            if (res.body[0].message == "Success") {
                // this.toastr.success("success!!");
                if (res != null || res != undefined) {
                    // console.log("AuthKey", res.headers.get('Authorizationkey'), "Authorization", res.headers.get('Authorization'));
                    if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
                        sessionStorage.setItem('ACCESS_TOKEN', accessKey);
                        sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);
                        // this.getuserProfile()
                        this.authService.login()

                        this.loaderservice.show()
                        setTimeout(() => {
                            this.router.navigate(['/dashboard']).then(() => {
                                window.location.reload();
                            });
                        }, 200);


                        //   this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                        //     this.router.navigate(['/dashboard']);
                        // }); 
                        this.loaderservice.hide();
                        // this.getpicodegst()
                        // location.reload();
                    }
                }
            } else {
                //   this.invalid = true;
                //   this.invalidmessage = res.body[0].message;
                // this.toastr.error(res.body[0].message)
            }



        }});
        err => {
            // this.loaderservice.hide();
        };

    }

    navigatetointernalportal() {

        this.loginService.logout().subscribe(res => {
            console.log("response is here ==> " + res);
            if (res[0].data == 'true') {
                this.authService.logout();
                this.loginService.checkemailforinternalportal(this.loginForm.controls['Email'].value).subscribe(res => {
                    if (res.body[0].status == "Success") {
                        const accessKey = res.headers.get('Authorizationkey');
                        const profileAccesKey = res.headers.get('Authorization');

                        console.log("this.loginForm.controls['Email'].value" + this.loginForm.controls['Email'].value);
                        this.forinternal = this.loginForm.controls['Email'].value;
                        this.username = this.loginForm.controls['Email'].value;
                       
                        if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
                            sessionStorage.setItem('ACCESS_TOKEN', accessKey);
                            sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);
                            sessionStorage.setItem('username', this.username);
                            
                            this.authService.login();
                          
                            this.getPortalTypebasedonemail(this.username);
              
                            this.loaderservice.show()
                         
                            this.loaderservice.hide();
                          }
                        
                       
                    }

                });

            }

        });




    }

    getPortalTypebasedonemail(userName)
    {
    console.log('clicked--------------response print')
    this.loginService.getportalType(userName).subscribe(res => {
    console.log(res,'--------------response print')
    if (res.body.length>0) {
     
        if(res.body[0].mode == 'buyer')
        {
        // setTimeout(() => {
        //     this.router.navigate(['/internalBuyerportal'], { queryParams: { orderNo: userName } }).then(() => {
        //         window.location.reload();
        //     });
        // }, 200);
            this.isbuyer=true;
            this.isenduser=true;
            sessionStorage.setItem("portaltype","innerbuyerportal");
            this.innerbuyerportal = true;
            this.vendorPortal=false;
            this.innerportal=false;
            this.ispayee=false
            setTimeout(() => {
                this.router.navigate(['/internalTrackPO'], { queryParams: { orderNo: this.forinternal } }).then(() => {
                    // window.location.reload();
                });
            }, 200);
            // this.router.navigate(['/internalportal']);
            console.log(this.innerbuyerportal,'this.innerbuyerportal isbuyer' )
            console.log(this.vendorPortal,'this.vendorPortal isbuyer')
            console.log(this.innerportal,'this.innerportal isbuyer')
        }
        else if((res.body[0].mode == 'enduser') || (res.body[0].mode == 'internalbcclportal'))
        {
            if(res.body[0].mode == 'internalbcclportal'){
                this.internalbcclportal=true;
                sessionStorage.setItem("portaltype","internalbcclportal");
            }
            else{
                this.internalbcclportal=false
                sessionStorage.setItem("portaltype","innerportal");
            }
            this.isenduser=false;
           
            this.innerportal=true;
            this.vendorPortal=false;
            this.innerbuyerportal = false;
            this.ispayee=false
            setTimeout(() => {
                if((res.body[0].mode == 'enduser'))
                {
                    this.router.navigate(['/internalTrackPO'], { queryParams: { orderNo: this.forinternal } }).then(() => {
                        // window.location.reload();
                    });
                }
                else if(res.body[0].mode == 'internalbcclportal'){
                    this.router.navigate(['/internaltrackInvoiceList'], { queryParams: { orderNo: this.forinternal } }).then(() => {
                        // window.location.reload();
                    });
                }
               
                
            }, 200);
            // this.router.navigate(['/internalBuyerportal']);
            console.log(this.innerbuyerportal,'this.innerbuyerportal isenduser')
            console.log(this.vendorPortal,'this.vendorPortal isenduser')
            console.log(this.innerportal,'this.innerportal isenduser')
        }
        else if(res.body[0].mode == 'payer')
        {
            sessionStorage.setItem("portaltype","payerportal");
            this.isenduser=false;
            this.innerportal=false;
            this.vendorPortal=false;
            this.ispayee=true;
            setTimeout(() => {
                this.router.navigate(['/internalTrackPO'], { queryParams: { orderNo: this.forinternal } }).then(() => {
                    // window.location.reload();
                });
            }, 200);
            
        }
        // else{
        //     setTimeout(() => {
        //         this.router.navigate(['/internaltrackInvoiceList'], { queryParams: { orderNo: this.forinternal } }).then(() => {
        //             // window.location.reload();
        //         });
        //     }, 200);
            
        // }
      
    }
    });
    }
    // dashboard()
    // {
    //     var typeOfuser=sessionStorage.getItem('portaltype')
    //     if( typeOfuser == 'payerportal')
    //     {
    //         this.router.navigate(['/internalportal']);
    //     }    
    // }

    TrackPO()
    {
        var typeOfuser=sessionStorage.getItem('portaltype')
        if(typeOfuser == 'innerportal' || typeOfuser == 'internalbcclportal' ||
        typeOfuser == 'innerbuyerportal' || typeOfuser == 'payerportal')
        {
            this.router.navigate(['/internalTrackPO']);
        }
        // else if(typeOfuser == 'innerbuyerportal' || typeOfuser == 'payerportal')
        // {
        //     this.router.navigate(['/internalTrackPO']);
        // }
    }
    ViewDashBoard()
    {
        var typeOfuser=sessionStorage.getItem('portaltype')
        if(typeOfuser == 'innerportal')
        {
            this.router.navigate(['/internalportal']);
        }
        else if(typeOfuser == 'innerbuyerportal')
        {
            this.router.navigate(['/internalBuyerportal']);
        }
        else if(typeOfuser == 'payerportal')
        {
            this.router.navigate(['/internalPayerportal']);
        }
        else if(typeOfuser == 'internalbcclportal')
        {
            this.router.navigate(['/internaltrackInvoiceList']);
        }
    }

    navigatetobuyerinternalportal()
    {
        this.loginService.logout().subscribe(res => {
            console.log("response is here ==> " + res);
            if (res[0].data == 'true') {
                this.authService.logout();
                this.loginService.checkemailforinternalportal(this.loginForm.controls['Email'].value).subscribe(res => {
                    if (res.body[0].status == "Success") {
                        const accessKey = res.headers.get('Authorizationkey');
                        const profileAccesKey = res.headers.get('Authorization');

                        console.log("this.loginForm.controls['Email'].value" + this.loginForm.controls['Email'].value);
                        this.forinternal = this.loginForm.controls['Email'].value;
                        this.username = this.loginForm.controls['Email'].value;
                        if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
                            sessionStorage.setItem('ACCESS_TOKEN', accessKey);
                            sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);
                            sessionStorage.setItem('username', this.username);
                            this.authService.login()
              
                            this.loaderservice.show()
                            setTimeout(() => {
                                this.router.navigate(['/internalTrackPO'], { queryParams: { orderNo: this.forinternal } }).then(() => {
                                    window.location.reload();
                                });
                            }, 200);
                            this.loaderservice.hide();
                          }
                    }

                });
            }
        });
    }
    submitInvoicePopup(){
        this.dialogBox.submitInvoicepopUp();
        $("#withPo").prop('checked', false);
        $("#withoutPo").prop('checked', false);
        $("#bulkinvoice").prop('checked',false);
    }
}
