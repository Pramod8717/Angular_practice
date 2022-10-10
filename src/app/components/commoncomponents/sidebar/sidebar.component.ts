import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { Observable } from 'rxjs';
import {Title} from "@angular/platform-browser";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
     { path: '/dashboard', title: 'Dashboard',  icon: '', class: '' },
     { path: '/purchaseOrdersList', title: 'Purchase Orders',  icon: '', class: '' },
    //  { path: '/submitInvoice', title: 'Submit Invoices',  icon: '', class: '' },
     { path: '/trackInvoiceList', title: 'Track invoices',  icon: '', class: '' },
     { path: '/invalidsession', title: 'Logout',  icon: '', class: '' },

   // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    //{ path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
   // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
   // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  //  { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
   // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    
];

export const ROUTES2: RouteInfo[] = [
    { path: '/internalportal', title: 'Dashboard',  icon: '', class: '' },
    { path: '/purchaseOrdersList', title: 'Purchase Orders',  icon: '', class: '' },
   //  { path: '/submitInvoice', title: 'Submit Invoices',  icon: '', class: '' },
    { path: '/internaltrackInvoiceList', title: 'Approve/Track invoices',  icon: '', class: '' },
    { path: '/login', title: 'Logout',  icon: '', class: '' },

  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
   //{ path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
 //  { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  isLoggedIn$: Observable<boolean>;
  email: string;
  userName: string;
  innerportal: boolean;
  username: string;
  bid: string;
  bussinesspartnertext: string;
  mobile_menu_visible: any = 0;
  private sidebarVisible: boolean;
   toggleButton: any;
  private listTitles: any[];
    location: Location;
    // mobile_menu_visible: any = 0;
    // private toggleButton: any;
    // private sidebarVisible: boolean;
    isLoggedin: boolean = false;
    // isLoggedIn$: Observable<boolean>;
    url: string;
    showStatus: boolean = true;
    // email: string;
    // userName: string;
    gstpincodevalues: any = [];
    gstpincode: any = [];
    gstpinlist: any = [];
    commonfilter: any = {};
    menuItems2: any;

  constructor(private authService: AuthService , private router: Router,  private element: ElementRef,
    private titleService:Title) { 
    this.sidebarVisible = false;
    this.location = location;
  }

  ngOnInit() {
    this.bid = sessionStorage.getItem('Bid');
    this.bussinesspartnertext = sessionStorage.getItem('Bussinesspartnertext');
    this.userName = sessionStorage.getItem('username')
    var type = sessionStorage.getItem("portaltype");
    // ,"innerportal");
    if(type == 'innerportal')
    {
        this.innerportal = true;
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    this.menuItems2 = ROUTES2.filter(menuItem => menuItem);


      //Hide Navbar elements if not logged in 
      this.isLoggedIn$ = this.authService.isLoggedin; 
      console.log("data......",this.isLoggedIn$)
      window.addEventListener('popstate', function (event) {
          if(window.location.href.includes('/login')){
         // Log the state data to the console
         sessionStorage.clear();
     window.location.reload();
          }
        //  console.log(event.state);
     });


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

     
    //  if(this.isLoggedIn$){
    //  this.getloggedinUser();
    //  }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logOut(){
    this.titleService.setTitle("BCCL Partner Portal");
    this.authService.logout();
    this.router.navigate(['/login']);
}

editProfile() {

    // let LoginUser= sessionStorage.getItem("PAN")
    // location.reload();
    this.router.navigate(['/profileGeneralData']);
}


getloggedinUser(){
  this.email= sessionStorage.getItem("loginUser");
  this.userName = this.email.substring(0, this.email.lastIndexOf("@"));
// var domain = this.email.substring(this.email.lastIndexOf("@") +1);

console.log("LoginUser from sidebar", this.userName );   // john.doe
}

closeSidebar(){
var $layer: any = document.getElementsByClassName('close-layer')[0];
if ($layer) {
    $layer.remove();
    this.mobile_menu_visible = 0;
}
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
        toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
};
sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    this.sidebarVisible = false;
    body.classList.remove('nav-open');
    this.closeSidebar();
    // const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
        $toggle.classList.remove('toggled');
    }, 400);
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

}
