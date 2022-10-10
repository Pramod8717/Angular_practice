import { AppSettings } from './../../models/appsetting';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  // pagenumber:any;
  // status:any
  // ponumber:any
  // fromdateofduration:any
  // todateofduration:any
  // fromdateofpo:any
  // todateofpo:any
  // plant:any;
  getUrl: any;
  LoggedInUser: any;
  constructor(private http: HttpClient) { }

  headers= new HttpHeaders()
     .set('Accept', 'application/json')

  sendPAN(PAN) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('pan', PAN);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.panDetails, jsonData, {withCredentials:true })
  }

  sendOTP(pan,email){
    // console.log("userdata", pan, email)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    urlSearchParams = urlSearchParams.append('pan' , pan)
    let jsonData = urlSearchParams.toString();
    // console.log("json", jsonData)

    return this.http.post<any>(AppSettings.sendOTP, jsonData, { withCredentials:true})
  }

  signin(email, OTP, bid) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    urlSearchParams = urlSearchParams.append('otp', OTP);
    urlSearchParams = urlSearchParams.append('Bid' , bid)
    let jsonData = urlSearchParams.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.signIn, jsonData, { observe:'response', withCredentials:true})  
    
  }

  signonhistory(bid) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('bid', bid);
    let jsonData = urlSearchParams.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.signonhistory, jsonData, { observe:'response', withCredentials:true})  
    
  }
 

  // getpincodegst(email) {
  //   let urlSearchParams: HttpParams = new HttpParams();
  //   urlSearchParams =  urlSearchParams.append('email', email);
  //   let jsonData = urlSearchParams.toString();
  //   // console.log("json", jsonData)
  //   return this.http.post<any>(AppSettings.getgstpincode, jsonData, { observe:'response', withCredentials:true})  
    
  // }

  getgst(email) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('email', email);
    let jsonData = urlSearchParams.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getgst, jsonData, { observe:'response', withCredentials:true})  
    
  }
  getpincode(gst)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('gst', gst);
    let jsonData = urlSearchParams.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getpincode, jsonData, { observe:'response', withCredentials:true})  
   
  }
  
  sendEmail(Email) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('email', Email);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.panDetails, jsonData, {withCredentials:true })
  }

  sendEmaildemo(array) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    array.forEach(feedback => {

      urlSearchParams = urlSearchParams.append('feedback', feedback);
    });
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.panDetailsdemo, array, {withCredentials:true })
  }

  checkemailforinternalportal(email)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    let jsonData = urlSearchParams.toString();
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.verifyinternalportal, jsonData, { observe:'response', withCredentials:true})  
 
  }

  getportalType(email)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('email', email);
    let jsonData = '';
    // console.log("json", jsonData)
    return this.http.post<any>(AppSettings.getportalTypeonemail, jsonData, { observe:'response', withCredentials:true})
  }

 
  // make a function1 for api calling podata

  getPo(pagenumber,status,ponumber,fromdateofduration,todateofduration,fromdateofpo,todateofpo,plant) {

    console.log("session BID", sessionStorage.getItem("Bid"))
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('nPage',pagenumber);
    urlSearchParams = urlSearchParams.append('ponumber',ponumber);
    urlSearchParams = urlSearchParams.append('fromdateofduration',fromdateofduration);
    urlSearchParams = urlSearchParams.append('todateofduration',todateofduration);
    urlSearchParams = urlSearchParams.append('fromdateofpo',fromdateofpo);
    urlSearchParams = urlSearchParams.append('todateofpo',todateofpo);
    urlSearchParams = urlSearchParams.append('plant',plant);
    let jsonData = urlSearchParams.toString();
    console.log("loggedIn User", this.LoggedInUser)
    return this.http.post<any>(AppSettings.PurchaseOrderList, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  getWOPO(pageno,status,ponum,fromdateofduration,todateofduration,fromdateofpo,todateofpo) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('pageno', pageno);
    urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('ponumber', ponum);
    urlSearchParams = urlSearchParams.append('fromdateofduration', fromdateofduration);
    urlSearchParams = urlSearchParams.append('todateofduration', todateofduration);
    urlSearchParams = urlSearchParams.append('fromdateofpo', fromdateofpo);
    urlSearchParams = urlSearchParams.append('todateofpo', todateofpo);

    let jsonData = urlSearchParams.toString();
    console.log("loggedIn User", this.LoggedInUser)
    return this.http.post<any>(AppSettings.PurchaseOrderListWOPO, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }


// make a function2 for api calling invoiceData

getInvoiceData(bid,page,status, invoicenumber,ponumber,fromdate,todate,plant)
 {
  let urlSearchParams: HttpParams = new HttpParams();
  urlSearchParams =  urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
  urlSearchParams = urlSearchParams.append('page',page);
  urlSearchParams = urlSearchParams.append('status',status);
  urlSearchParams = urlSearchParams.append('invoicenumber',invoicenumber);
  urlSearchParams = urlSearchParams.append('ponumber',ponumber);
  urlSearchParams = urlSearchParams.append('fromdate',fromdate);
  urlSearchParams = urlSearchParams.append('todate',todate);
  urlSearchParams = urlSearchParams.append('plant',plant);
  let jsonData = urlSearchParams.toString();
 // console.log("loggedIn User", this.LoggedInUser)
  return this.http.post<any>(AppSettings.getInvoiceData,jsonData,{headers: this.headers,responseType: "json", withCredentials: true})
}
  
  logout()
  {
    return this.http.post<any>(AppSettings.logout, '', {withCredentials: true})
  }
}
