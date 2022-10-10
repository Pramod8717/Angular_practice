import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from 'assets/user';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.gettoken());
  constructor(private router:Router) { }
  public isLogin: boolean = false;
  private editTeamNotifier = new Subject<any>();
 

 get isLoggedin(){
    return this.loggedIn.asObservable(); 
}

login(){
    this.loggedIn.next(true);
    sessionStorage.getItem("PROFILE_ACCESS")
    // console.log("this.isloggedin", this.loggedIn)
    // this.router.navigate(['/']);

}
editTeamBroadcaster(data) {
  this.editTeamNotifier.next({
   inLogin: data
  })
}

getNotifier():Observable<any>{

  return this.editTeamNotifier.asObservable()

}
  gettoken(){  
    // console.log("token",sessionStorage.getItem("PROFILE_ACCESS"))
    return !!sessionStorage.getItem("PROFILE_ACCESS");  
    }  

  public logout(){
    this.loggedIn.next(false);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('ACCESS_TOKEN');
    sessionStorage.removeItem('PROFILE_ACCESS');
    sessionStorage.removeItem('GST');
    sessionStorage.removeItem('PINCODE');
    sessionStorage.removeItem('Bid');
    sessionStorage.removeItem('currentgst');
    sessionStorage.removeItem('Bussinesspartnertext');
    sessionStorage.removeItem('currentpincode');
    sessionStorage.removeItem('receiverMail');
    sessionStorage.removeItem('PODetails');
    sessionStorage.removeItem('loginUser');
    // sessionStorage.removeItem('Bussinesspartnertext');
    sessionStorage.removeItem('PODetails');
    sessionStorage.removeItem('poNumber');
    sessionStorage.removeItem('lineItemData');
    sessionStorage.removeItem('text');
    sessionStorage.removeItem('totQuantity');
    sessionStorage.removeItem('InvoiceData');
    sessionStorage.removeItem('portaltype');

  }
}
