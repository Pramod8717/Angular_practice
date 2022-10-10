import { AppSettings } from '../../models/appsetting';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'assets/configdata/baseURL';


@Injectable({
  providedIn: 'root'
})
export class TrackOrderListService {
  extensionType: any;

  constructor(private http:HttpClient) { }

  Authorization = sessionStorage.getItem('PROFILE_ACCESS');
  Authorizationkey = sessionStorage.getItem('ACCESS_TOKEN');
  LoggedInUser = sessionStorage.getItem('loginUser');
  ReceiverMail = sessionStorage.getItem('receiverMail');

  headers= new HttpHeaders()
   .set('Authorization',this.Authorization)
   .set('Authorizationkey',this.Authorizationkey)
   .set('Content-Type', 'application/x-www-form-urlencoded')
   .set("Accept", "*/*");

  //  getInvoiceData(){
  //   let urlSearchParams: HttpParams = new HttpParams();
  //   urlSearchParams =  urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
  //   let jsonData = urlSearchParams.toString();
  //   console.log("loggedIn User", this.LoggedInUser)
  //   return this.http.post<any>(AppSettings.getInvoiceData,jsonData,{headers: this.headers,responseType: "json", withCredentials: true})
  // }

  getInvoiceData(mpage,status,invno,pono,fdate,tdate,plant){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    urlSearchParams =  urlSearchParams.append('page', mpage);
    urlSearchParams =  urlSearchParams.append('status', status);
    urlSearchParams =  urlSearchParams.append('invoicenumber', invno);
    urlSearchParams =  urlSearchParams.append('ponumber', pono);
    urlSearchParams =  urlSearchParams.append('fromdate', fdate);
    urlSearchParams =  urlSearchParams.append('todate', tdate);
    urlSearchParams =  urlSearchParams.append('plant', plant);
    let jsonData = urlSearchParams.toString();
    console.log("loggedIn User", this.LoggedInUser)
    return this.http.post<any>(AppSettings.getInvoiceData,jsonData,{headers: this.headers,responseType: "json", withCredentials: true})
  }

  
  getfullInvoiceData (){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();
    console.log("loggedIn User", this.LoggedInUser)
    return this.http.post<any>(AppSettings.getfullInvoiceData ,jsonData,{headers: this.headers,responseType: "json", withCredentials: true})
  }

 
  getlistitemsforinvoicenumber(data,ponumber)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoice', data);
    urlSearchParams =  urlSearchParams.append('po_num', ponumber);
    
    let jsonData = urlSearchParams.toString();
    console.log("loggedIn User", this.LoggedInUser)
    return this.http.post<any>(AppSettings.getlistitemsforinvoicenumber,jsonData,{headers: this.headers,responseType: "json", withCredentials: true})

  }

  getlistitemsforinvoicenumberininternal(data,ponumber)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoice', data);
    urlSearchParams =  urlSearchParams.append('po_num', ponumber);
    
    let jsonData = urlSearchParams.toString();
    console.log("loggedIn User", this.LoggedInUser)
    return this.http.post<any>(AppSettings.getlistitemsforinvoicenumberininternal,jsonData,{headers: this.headers,responseType: "json", withCredentials: true})

  }

  getfile(savedfilename,typeofdownload)
  {
    let urlSearchParams: HttpParams = new HttpParams();
  urlSearchParams = urlSearchParams.append('fileName', savedfilename);
  urlSearchParams = urlSearchParams.append('typeofdownload', typeofdownload);



  let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getFile,jsonData,{headers: this.headers,responseType: "json", withCredentials: true})
  }

  

  getinternalfile(savedfilename,typeofdownload)
  {
    let urlSearchParams: HttpParams = new HttpParams();
  urlSearchParams = urlSearchParams.append('fileName', savedfilename);
  urlSearchParams = urlSearchParams.append('typeofdownload', typeofdownload);



  let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getinternalFile,jsonData,{headers: this.headers,responseType: "json", withCredentials: true})
  }

  downloadInvoiceData(status,po,inv,fd,td){
    let urlSearchParams: HttpParams = new HttpParams();
    const headers= new HttpHeaders()
   .set('Authorization',this.Authorization)
   .set('Authorizationkey',this.Authorizationkey)
   .set("Accept", "*/*");
   urlSearchParams =  urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
   urlSearchParams =  urlSearchParams.append('status', status);
   urlSearchParams =  urlSearchParams.append('po', po);
   urlSearchParams =  urlSearchParams.append('inv', inv);
   urlSearchParams =  urlSearchParams.append('fd', fd);
   urlSearchParams =  urlSearchParams.append('td', td);
    console.log("data after loop",urlSearchParams)

    let jsonData = urlSearchParams.toString() ;
    return this.http.post<any>(AppSettings.downloadinvoicelist,jsonData,{headers: headers, withCredentials: true})  

  }

  downloadapprovalData(status,po,inv,fd,td){
    let urlSearchParams: HttpParams = new HttpParams();
    const headers= new HttpHeaders()
   .set('Authorization',this.Authorization)
   .set('Authorizationkey',this.Authorizationkey)
   .set("Accept", "*/*");
   urlSearchParams =  urlSearchParams.append('emailid', sessionStorage.getItem("username"));
   urlSearchParams =  urlSearchParams.append('status', status);
   urlSearchParams =  urlSearchParams.append('po', po);
   urlSearchParams =  urlSearchParams.append('inv', inv);
   urlSearchParams =  urlSearchParams.append('fd', fd);
   urlSearchParams =  urlSearchParams.append('td', td);
    console.log("data after loop",urlSearchParams)

    let jsonData = urlSearchParams.toString() ;
    return this.http.post<any>(AppSettings.downloadapprovalinvoicelist,jsonData,{headers: headers, withCredentials: true})  

  }

  downloadinternalInvoiceData(emailid, paginationpagenumber, 
    currstatus, innum,
    ponum,fd,td,plant,vendor){
    // console.log("save service" ,model, this.headers);
    let urlSearchParams: HttpParams = new HttpParams();
    const headers= new HttpHeaders()
   .set('Authorization',this.Authorization)
   .set('Authorizationkey',this.Authorizationkey)
   .set("Accept", "*/*");
   urlSearchParams =  urlSearchParams.append('emailid', emailid);
   urlSearchParams =  urlSearchParams.append('page', paginationpagenumber);
   urlSearchParams =  urlSearchParams.append('status', currstatus);
   urlSearchParams =  urlSearchParams.append('invoicenumber', innum);
   urlSearchParams =  urlSearchParams.append('ponumber', ponum);
   urlSearchParams =  urlSearchParams.append('fromdate', fd);
   urlSearchParams =  urlSearchParams.append('todate', td);
   urlSearchParams =  urlSearchParams.append('plant', plant);
   urlSearchParams =  urlSearchParams.append('vendor', vendor);
    // model.forEach(res => {
    //   urlSearchParams = urlSearchParams.append('invoicenumber', res);
    // });
    // model1.forEach(res1 => {
    //   urlSearchParams = urlSearchParams.append('ponumber', res1);
    // });

    console.log("data after loop",urlSearchParams)

    let jsonData = urlSearchParams.toString() ;
    return this.http.post<any>(AppSettings.downloadinternalinvoicelist,jsonData,{headers: headers, withCredentials: true})  

  }

  getInvMessages(poNumber,invNumber) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num', poNumber);
    urlSearchParams = urlSearchParams.append('invoicenumber', invNumber);
    let jsonData = urlSearchParams.toString();
    console.log("jsonData", jsonData)

    return this.http.post<any>(AppSettings.getInvMessagesList, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  trackinvoicestatus(invoicenumber,ponumber,bussinesspartneroid)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('invoicenumber', invoicenumber);
    urlSearchParams = urlSearchParams.append('ponumber', ponumber);
    urlSearchParams = urlSearchParams.append('bussinesspartneroid', bussinesspartneroid);
    let jsonData = urlSearchParams.toString();
    console.log("jsonData", jsonData)

    return this.http.post<any>(AppSettings.trackinvoicestatus, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })

  }
  createCreditAdvice(array) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    array.forEach(feedback => {

      urlSearchParams = urlSearchParams.append('feedback', feedback);
    });
    let jsonData = urlSearchParams.toString();
    let headers2 = new HttpHeaders()
      .append('Authorization', this.Authorization)
      .append('Authorizationkey', this.Authorizationkey)
      .append('Content-Type', 'application/json')
      .append("Accept", "*/*");

    console.log("URL", array)
    return this.http.post<any>(AppSettings.createCreditAdvice, array, { headers: headers2, responseType: "json", withCredentials: true })
  }
  getVendorReturn(poNumber,invNumber) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('po_num', poNumber);
    urlSearchParams = urlSearchParams.append('invoice', invNumber);
    let jsonData = urlSearchParams.toString();
    console.log("jsonData", jsonData)

    return this.http.post<any>(AppSettings.getVendorReturn, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  
  gethistoricData() {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();
    console.log("jsonData", jsonData)

    return this.http.post<any>(AppSettings.gethistoricData, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }


  updatefiles(inv,po,timestamp,filenames)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoicenumber', inv);
    urlSearchParams =  urlSearchParams.append('purchasenumber', po);
    urlSearchParams =  urlSearchParams.append('timestamp', timestamp);
    filenames.forEach(res => {
      urlSearchParams = urlSearchParams.append('filenames', res);
    });
    let jsonData = urlSearchParams.toString();
    console.log("jsonData", jsonData)
    
    return this.http.post<any>(AppSettings.updatefiles, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
 
  }

  getPlanCode(codeordesc){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('codeordesc', codeordesc);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getplantcodeordesc,jsonData,{withCredentials:true})
  }
  downloadEncryptedFile(data,extensionType){
    var byteCharacters = atob(data);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    let file = new Blob([byteArray], { type: extensionType });            
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL)
    console.log(fileURL);
}

}