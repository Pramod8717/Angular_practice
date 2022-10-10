import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  isLoggedIn$: Observable<boolean>;
  innerportal: boolean;
  
  constructor(private authService: AuthService) { }


  ngOnInit() {

    var type = sessionStorage.getItem("portaltype");
    // ,"innerportal");
    if(type == 'innerportal')
    {
        this.innerportal = true;
    }

     //Hide Navbar elements if not logged in 
     this.isLoggedIn$ = this.authService.isLoggedin; 
    //  console.log(this.isLoggedIn$)
     window.addEventListener('popstate', function (event) {
         if(window.location.href.includes('/login')){
        // Log the state data to the console
        sessionStorage.clear();
    window.location.reload();
         }
        // console.log(event.state);
    });
  }

}
