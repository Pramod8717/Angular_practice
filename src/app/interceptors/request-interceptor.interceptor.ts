import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestInterceptorInterceptor implements HttpInterceptor {
  Authorization: string;
  Authorizationkey: string;
  counter=0;

  constructor(private router: Router,private authService: AuthService,
    private loaderservice:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.Authorization = sessionStorage.getItem('PROFILE_ACCESS')
    this.Authorizationkey = sessionStorage.getItem('ACCESS_TOKEN')
console.log("request.url"+request.url);
    if (!request.url.includes("chklogin")  && !request.url.includes("productProfile")
    && !request.url.includes("multiplefileuploads")
    && !request.url.includes("pOSubmitInvoice1") && !request.url.includes("updateacceptedquantity")
    && !request.url.includes("addMultipleManager") 
    && !request.url.includes("chkemail") && !request.url.includes("pOCreateDeliverynew")
    && !request.url.includes("buyerponinvoicesummery") && !request.url.includes("shortfallcreditadvice") && !request.url.includes("getEnderUserReturn")
    ) {
    const authReq = request.clone({
      headers: new HttpHeaders()
      .set('Authorization',this.Authorization)
      .set('Authorizationkey',this.Authorizationkey)
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
   
    
    // console.log(authReq)
    // return next.handle(authReq);
    // -------------Changed 10-10-2021-------------------------------
    return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
  }
  else if ((request.url.includes("pOSubmitInvoice1")) ||
  (request.url.includes("addMultipleManager") || (request.url.includes("pOCreateDeliverynew"))
  || (request.url.includes("buyerponinvoicesummery")) || (request.url.includes("updateacceptedquantity"))) || (request.url.includes("shortfallcreditadvice")) || (request.url.includes("getEnderUserReturn"))) {
    const authReq = request.clone({
      headers: new HttpHeaders()
      .set('Authorization',this.Authorization)
      .set('Authorizationkey',this.Authorizationkey)
      .set('Content-Type', 'application/json')
    });
    return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
  }
  else if(request.url.includes("productProfile") || request.url.includes("multiplefileuploads")){
    console.log("in here ==>");
    const authReq = request.clone({
      headers: new HttpHeaders()
      .set('Authorization',this.Authorization)
      .set('Authorizationkey',this.Authorizationkey)
      .set("Accept", "*/*")
    });
    // console.log(authReq)
    // return next.handle(authReq);
    // -------------Changed 10-10-2021-------------------------------
    return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
    
  }
  else{
    console.log(request)
    return next.handle(request);
  }
  }

  // Added 10-10-2021------------------
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    console.log("in");
    
    if (err.status === 406 || err.status === 401 || err.status === 408) {
      this.loaderservice.hide();
      // this.loggedIn.next(false);

      if(this.counter<1)
      {
     
      var sessiontimeout = true;
      let message = ""
      var typeOfuser=sessionStorage.getItem('portaltype')
      if(typeOfuser == 'innerportal' || typeOfuser == 'internalbcclportal' ||
      typeOfuser == 'innerbuyerportal' || typeOfuser == 'payerportal'){
      this.router.navigate(['/invalidsession'],{ queryParams: { order: sessiontimeout, errorstatus:  err.status}});
      this.authService.logout();
      sessionStorage.removeItem('loginUser');
      }
      else{
        this.router.navigate(['/login'],{ queryParams: { order: sessiontimeout, errorstatus:  err.status}});
        this.authService.logout();
        sessionStorage.removeItem('loginUser');
      }
        this.counter=1;
        // this.router.navigate(['./login']);
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }
}
}

