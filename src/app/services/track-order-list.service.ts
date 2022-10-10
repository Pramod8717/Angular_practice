import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'app/models/appsetting';

@Injectable({
  providedIn: 'root'
})
export class TrackOrderListService {

  constructor(private http:HttpClient,
    // private loaderService: LoaderService
    ) { }
  Authorization = sessionStorage.getItem('PROFILE_ACCESS')
  Authorizationkey = sessionStorage.getItem('ACCESS_TOKEN')
  //LoggedInUser = sessionStorage.getItem('loginUser');
  ReceiverMail = sessionStorage.getItem('receiverMail');
  headers= new HttpHeaders()
   .set('Authorization',this.Authorization)
   .set('Authorizationkey',this.Authorizationkey)
   .set('Content-Type', 'application/x-www-form-urlencoded')
   .set("Accept", "*/*");
   getInvoiceData(){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();
   // console.log("loggedIn User", this.LoggedInUser)
    return this.http.post<any>(AppSettings.getInvoiceData,jsonData,{headers: this.headers,responseType: "json", withCredentials: true})
  }
}