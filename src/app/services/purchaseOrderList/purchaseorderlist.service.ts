import { AppSettings } from '../../models/appsetting';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'assets/configdata/baseURL';


@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderListService {
  PurchaseOrderList: any;
 

  constructor(private http: HttpClient) { }

  Authorization = sessionStorage.getItem('PROFILE_ACCESS');
  Authorizationkey = sessionStorage.getItem('ACCESS_TOKEN');
  LoggedInUser = sessionStorage.getItem('loginUser');
  ReceiverMail = sessionStorage.getItem('receiverMail');

  headers = new HttpHeaders()
    .set('Authorization', this.Authorization)
    .set('Authorizationkey', this.Authorizationkey)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set("Accept", "*/*");

  headers1 = new HttpHeaders()
    .set('Authorization', this.Authorization)
    .set('Authorizationkey', this.Authorizationkey)
    .set('Content-Type', 'application/json')
    .set("Accept", "*/*");

  getPO(pagenumber,status,ponumber,fromdateofduration,todateofduration,fromdateofpo,todateofpo,plant) {

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

  

  getPODetails(po_num) {

    console.log("session BID", sessionStorage.getItem("Bid"))
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('po_num', po_num);
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.purchaseOrderDetails, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  getgrnbasedonpo(ponumber)
  {
    console.log("session BID", sessionStorage.getItem("Bid"))
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('ponumber', ponumber);
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getgrnonpo, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })

  }

  getgrnonpoandinvoice(ponumber,dcnumber)
  {
    console.log("session BID", sessionStorage.getItem("Bid"))
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('ponumber', ponumber);
    // urlSearchParams = urlSearchParams.append('dcnumber', dcnumber);
    dcnumber.forEach(feedback => {

      urlSearchParams = urlSearchParams.append('dcnumber', feedback);
    });
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getgrnonpoandinvoice, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })

  }

  submitConfirmation(poNumber, status, message, subject, topic) {

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    if (subject == "POconfirmation") {
      urlSearchParams = urlSearchParams.append('po_num', poNumber);
    }
    if (subject == "SubmitQuery") {
      urlSearchParams = urlSearchParams.append('po_num', topic);
    }
    // urlSearchParams = urlSearchParams.append('invoice_num', uniqueInvNumber);
    urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('message', message);
    urlSearchParams = urlSearchParams.append('subject', subject)
    urlSearchParams = urlSearchParams.append('topic', topic)
    urlSearchParams = urlSearchParams.append('emailid', this.LoggedInUser)
    urlSearchParams = urlSearchParams.append('invoiceNumber', '')
    console.log("loggedIn User", this.LoggedInUser)
    let jsonData = urlSearchParams.toString();

    console.log("type", this.Authorization)

    return this.http.post<any>(AppSettings.confirmPurchaseOrder, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }


  submitInvoiceChat(poNumber, uniquePONumber, uniqueInvNumber, status, message, subject, topic) {

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    if (subject == "POconfirmation") {
      urlSearchParams = urlSearchParams.append('po_num', poNumber);
    }
    if (subject == "SubmitQuery") {
      urlSearchParams = urlSearchParams.append('po_num', uniquePONumber);
    }
    urlSearchParams = urlSearchParams.append('invoice_num', uniqueInvNumber);
    // urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('message', message);
    urlSearchParams = urlSearchParams.append('subject', subject)
    urlSearchParams = urlSearchParams.append('topic', topic)
    urlSearchParams = urlSearchParams.append('emailid', this.LoggedInUser)
    // urlSearchParams = urlSearchParams.append('RequsitionerEmail', this.ReceiverMail)
    console.log("loggedIn User", this.LoggedInUser)
    let jsonData = urlSearchParams.toString();

    console.log("type", this.Authorization)

    return this.http.post<any>(AppSettings.invoiceChat, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }


  getMessages(poNumber) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num', poNumber);
    let jsonData = urlSearchParams.toString();
    console.log("jsonData", jsonData)

    return this.http.post<any>(AppSettings.getMessagesList, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }


  invoicesubmission(irnnumber, irndate, ponumber, invoiceNumber, invoicedate,
    refno, grnnumber, lineitemnumber, ordernumber, quantity, uoM, contactPerson, contactPersonPhone,
    vendorid, company, plant, department, costcenter, category, businessPartnerText, profileid, invoiceDocumentPath,
    invoiceamount, igstamount, cgstamount, sgstamount, totalamount, description, status, actualfilename,
     savedfilename,BalanceQty,rawinvno) {

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num', ponumber);
    urlSearchParams = urlSearchParams.append('irnnumber', irnnumber);
    urlSearchParams = urlSearchParams.append('irndate', irndate);
    urlSearchParams = urlSearchParams.append('invoiceNumber', invoiceNumber);
    urlSearchParams = urlSearchParams.append('invoicedate', invoicedate);
    urlSearchParams = urlSearchParams.append('referenceNumber', refno);
    urlSearchParams = urlSearchParams.append('gRNNumber', grnnumber);
    urlSearchParams = urlSearchParams.append('lineItemNumber', lineitemnumber);
    urlSearchParams = urlSearchParams.append('orderNumber', ordernumber);
    urlSearchParams = urlSearchParams.append('quantity', quantity);
    urlSearchParams = urlSearchParams.append('uOM', uoM);
    urlSearchParams = urlSearchParams.append('contactPerson', contactPerson);
    urlSearchParams = urlSearchParams.append('contactPersonPhone', contactPersonPhone);
    urlSearchParams = urlSearchParams.append('vendorID', vendorid);
    urlSearchParams = urlSearchParams.append('company', company);
    urlSearchParams = urlSearchParams.append('plant', plant);
    urlSearchParams = urlSearchParams.append('department', department);
    urlSearchParams = urlSearchParams.append('costCentre', costcenter);
    urlSearchParams = urlSearchParams.append('category', category);
    urlSearchParams = urlSearchParams.append('businessPartnerText', businessPartnerText);
    urlSearchParams = urlSearchParams.append('profileID', profileid);
    urlSearchParams = urlSearchParams.append('invoiceDocumentPath', invoiceDocumentPath);
    urlSearchParams = urlSearchParams.append('iGSTAmount', igstamount);
    urlSearchParams = urlSearchParams.append('cGSTAmount', cgstamount);
    urlSearchParams = urlSearchParams.append('sgstAmount', sgstamount);
    urlSearchParams = urlSearchParams.append('totalAmount', totalamount);
    urlSearchParams = urlSearchParams.append('description', description)
    urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('invoiceamount', invoiceamount);
    urlSearchParams = urlSearchParams.append('savedfilename', savedfilename);
    urlSearchParams = urlSearchParams.append('actualfilename', actualfilename);
    urlSearchParams = urlSearchParams.append('buyerId', sessionStorage.getItem('Buyer'));
    urlSearchParams = urlSearchParams.append('endUserId', sessionStorage.getItem("Requisitioner"));
    urlSearchParams = urlSearchParams.append('endUserStatus', 'P');
    urlSearchParams=urlSearchParams.append('created_by', this.LoggedInUser);
    urlSearchParams=urlSearchParams.append('modified_by', this.LoggedInUser);
    
    // var useremail = localStorage.getItem('EMAILIDUSER');
    // if(useremail != '')
    // {
    //   urlSearchParams = urlSearchParams.append('endUserId', useremail);
      
    // }
    // else
    // {
    //   urlSearchParams = urlSearchParams.append('endUserId', sessionStorage.getItem("Requisitioner"));
    // }
    urlSearchParams = urlSearchParams.append('euManager', '');
    urlSearchParams = urlSearchParams.append('stage','1');
    urlSearchParams = urlSearchParams.append('balance_qty',BalanceQty);
    urlSearchParams = urlSearchParams.append('rawinvno', rawinvno);
    
    let jsonData = urlSearchParams.toString();

    console.log("type", this.Authorization)
    // -----------------------testing
    // return this.http.post<any>(AppSettings.downloadPOdetails,jsonData,{headers: this.headers, withCredentials: true})
    // ----------------------------proper
    return this.http.post<any>(AppSettings.submitInvoiceDetails, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }


  invoicesubmissionwithoutpo(irnNumber,irnDate,invoiceNumber, invoicedate,invoiceamount, totalamount, description,
    status,useremail,billofladingdate,actualfilename,
    savedfilename,multipleactualfilename,multiplesavedfilename) {

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('irnNumber', irnNumber);
    urlSearchParams = urlSearchParams.append('irnDate', irnDate);
    urlSearchParams = urlSearchParams.append('invoiceNumber', invoiceNumber);
    urlSearchParams = urlSearchParams.append('invoicedate', invoicedate);
    urlSearchParams = urlSearchParams.append('totalAmount', totalamount);
    urlSearchParams = urlSearchParams.append('description', description);
    urlSearchParams = urlSearchParams.append('status', status);
    urlSearchParams = urlSearchParams.append('invoiceamount', invoiceamount);
    urlSearchParams = urlSearchParams.append('endUserStatus', 'P');
    urlSearchParams = urlSearchParams.append('euManager', "sachin.mehta@timesgroup.com");
    urlSearchParams = urlSearchParams.append('stage','1');
    urlSearchParams = urlSearchParams.append('useremail',useremail);
    urlSearchParams = urlSearchParams.append('billofladingdate',billofladingdate);
    urlSearchParams = urlSearchParams.append('actualfilename',actualfilename);
    urlSearchParams = urlSearchParams.append('savedfilename',savedfilename);
    urlSearchParams = urlSearchParams.append('multipleactualfilename',multipleactualfilename);
    urlSearchParams = urlSearchParams.append('multiplesavedfilename',multiplesavedfilename);

    let jsonData = urlSearchParams.toString();

    console.log("type", this.Authorization)
    // -----------------------testing
    // return this.http.post<any>(AppSettings.downloadPOdetails,jsonData,{headers: this.headers, withCredentials: true})
    // ----------------------------proper
    return this.http.post<any>(AppSettings.submitInvoiceDetailswithoutPO, jsonData, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  invoicesubmission1(array) {

    return this.http.post<any>(AppSettings.submitInvoiceDetails, array, { headers: this.headers, responseType: "json", withCredentials: true })
  }

  sendEmaildemo(array) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    array.forEach(feedback => {

      urlSearchParams = urlSearchParams.append('feedback', feedback);
    });
    let jsonData = urlSearchParams.toString();
    // let headers2 = new HttpHeaders()
    //   .set('Authorization', this.Authorization)
    //   .set('Authorizationkey', this.Authorizationkey)
    //   .set('Content-Type', 'application/json')
    //   .set("Accept", "*/*");

    let headers2 = new HttpHeaders()
      .append('Authorization', this.Authorization)
      .append('Authorizationkey', this.Authorizationkey)
      .append('Content-Type', 'application/json')
      .append("Accept", "*/*");

    console.log("URL", array)
    return this.http.post<any>(AppSettings.panDetailsdemo, array, { headers: headers2, responseType: "json", withCredentials: true })
  }

  fileupload(file, fileName = "") {


    let headers1 = new HttpHeaders()
      .set('Authorization', this.Authorization)
      .set('Authorizationkey', this.Authorizationkey)
      .set("Accept", "*/*");

    let urlSearchParams: HttpParams = new HttpParams();

    let formData: FormData = new FormData();
    if (fileName == "") {
      formData.append("file", file);
    }
    else {
      formData.append("file", file, fileName);
    }
    let jsonData = urlSearchParams.toString();
    //  let options = new RequestOptions({ headers: headers1, withCredentials: true });
    return this.http.post<any>(AppSettings.uploadProductPortfolio, formData, { headers: headers1, withCredentials: true })

  }

  // fileupload(file, fileName = "") {
  //   console.log(file,'fileeeeeeeeeeeeee')
  //   // this.loaderService.show();
  //   // this.auth = this.commonservice.gettoken();
  //   // console.log("save service" ,model, this.headers);
  //   // let urlSearchParams: HttpParams = new HttpParams();
  //   const headers= new HttpHeaders()
  //  .set('Authorization',this.Authorization)
  //  .set('Authorizationkey',this.Authorizationkey)
  //  .set("Accept", "*/*");
  //   // const headers = new Headers();

  //   // headers.append('Authorization', this.auth.value);
  //   // headers.append('Authorizationkey', this.auth.keyvalue);
  //   // headers.append("Accept", "*/*");

  //   let urlSearchParams: HttpParams = new HttpParams();

  //   let formData: FormData = new FormData();
  //   if (fileName == "") {
  //     formData.append("file", file);
  //   }
  //   else {
  //     formData.append("file", file, fileName);
  //   }
  //   let jsonData = urlSearchParams.toString();
  //     // for testing purpose
  //   // return this.http.post<any>(AppSettings.downloadPOdetails,formData,{headers: headers, withCredentials: true})
  //   // proper purpose
  //   return this.http.post<any>(AppSettings.submitFile,formData,{headers: headers, withCredentials: true})

  // }

  getpolistfile(model: string,ponumber,fromdateofduration,todateofduration,fromdateofpo,todateofpo) {
    console.log("save service", model, this.headers);
    let urlSearchParams: HttpParams = new HttpParams();
    const headers = new HttpHeaders()
      .set('Authorization', this.Authorization)
      .set('Authorizationkey', this.Authorizationkey)
      .set("Accept", "*/*");
    // model.forEach(res => {
    //   urlSearchParams = urlSearchParams.append('ponumbers', res);
    // });
    urlSearchParams = urlSearchParams.append('mode', model);
    urlSearchParams = urlSearchParams.append('ponumber', ponumber);
    urlSearchParams = urlSearchParams.append('fromdateofduration', fromdateofduration);
    urlSearchParams = urlSearchParams.append('todateofduration', todateofduration);
    urlSearchParams = urlSearchParams.append('fromdateofpo', fromdateofpo);
    urlSearchParams = urlSearchParams.append('todateofpo', todateofpo);
    console.log("data after loop", urlSearchParams)

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.downloadPOdetails, jsonData, { headers: headers, withCredentials: true })

  }

  getinternalpolistfile(emailid,currstatus,
    popaginationnumber,ponum,fromdateofduration,todateofduration,
    fromdateofpo,todateofpo,plant,vendor) {
    // console.log("save service", model, this.headers);
    let urlSearchParams: HttpParams = new HttpParams();
    const headers = new HttpHeaders()
      .set('Authorization', this.Authorization)
      .set('Authorizationkey', this.Authorizationkey)
      .set("Accept", "*/*");
      urlSearchParams = urlSearchParams.append('email', emailid);
      urlSearchParams = urlSearchParams.append('status', currstatus);
      urlSearchParams = urlSearchParams.append('nPage', popaginationnumber);
      urlSearchParams = urlSearchParams.append('ponumber', ponum);
      urlSearchParams = urlSearchParams.append('fromdateofduration', fromdateofduration);
      urlSearchParams = urlSearchParams.append('todateofduration', todateofduration);
      urlSearchParams = urlSearchParams.append('fromdateofpo', fromdateofpo);
      urlSearchParams = urlSearchParams.append('todateofpo', todateofpo);
      urlSearchParams = urlSearchParams.append('plant', plant);
      urlSearchParams = urlSearchParams.append('vendor', vendor);

    console.log("data after loop", urlSearchParams)

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.downloadinternalPOdetails, jsonData, { headers: headers, withCredentials: true })

  }

  getReadStatus() {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('emailid', sessionStorage.getItem("loginUser"));

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.messageStatus, jsonData, { headers: this.headers, withCredentials: true })
    
  }

  getChatStatus(){
      let urlSearchParams: HttpParams = new HttpParams();
      urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
      urlSearchParams=urlSearchParams.append('emailid', sessionStorage.getItem('loginUser'));
  
      let jsonData = urlSearchParams.toString();
  
      return this.http.post<any>(AppSettings.getUnreadMessage, jsonData, { headers: this.headers, withCredentials: true })
  
  
  
    }
  

  getReadStatusUpdate(poNumber) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num', poNumber);

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.messageStatusUpdate, jsonData, { headers: this.headers, withCredentials: true })
    
  }

  getChatStatusUpdate(poNumber, invNumber) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid',sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num',poNumber);
    urlSearchParams=urlSearchParams.append('invoice_num',invNumber);
    urlSearchParams=urlSearchParams.append('emailid',sessionStorage.getItem('loginUser'));

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.updateChatStatus, jsonData, { headers: this.headers, withCredentials: true })
  }


  getorderitems(lineitemnumber,poNumber) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid',sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num',poNumber);
    urlSearchParams=urlSearchParams.append('lineitemnumber',lineitemnumber);

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.getorderitems, jsonData, { headers: this.headers, withCredentials: true })
  }
  


  getIRNNumber(actualfilename,savedfilename){

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('actualfilename',actualfilename);
    urlSearchParams=urlSearchParams.append('savedfilename',savedfilename);
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.IRNscannerApi,jsonData,{ headers: this.headers, withCredentials: true })
  }

  readbulkuploadfile(savedfilename){

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('fileName',savedfilename);
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.readbulkuploadfile,jsonData,{ headers: this.headers, withCredentials: true })
  }


  createcustomdeliveryitems(ponumber,podate,lineitemnumbers,quantity){

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('ponumber',ponumber);
    urlSearchParams=urlSearchParams.append('podate',podate);
    lineitemnumbers.forEach(res => {
      urlSearchParams = urlSearchParams.append('lineitemnumbers', res);
    });
    quantity.forEach(res => {
      urlSearchParams = urlSearchParams.append('quantity', res);
    });
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.createcustomdeliveryitems,jsonData,{ headers: this.headers, withCredentials: true })
  }


  getorderforfullpo(ponumber){

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('ponumber',ponumber);
   
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.getorderforfullpo,jsonData,{ headers: this.headers, withCredentials: true })
  }

  multiplefileupload(formData:FormData)
  {
    
    let urlSearchParams: HttpParams = new HttpParams();
    let formData1: FormData = new FormData();
    formData.forEach(res => {
      formData1.append("files", res);
      // formData.append("files", res, fileName);
      // urlSearchParams = urlSearchParams.append('files', res.toString());
    });

     return this.http.post<any>(AppSettings.multiplefileupload, formData1, { headers: this.headers, withCredentials: true })

  }


  getwopodetails(invoicenumber){

    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('invoicenumber',invoicenumber);
   
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.getwopodetails,jsonData,{ headers: this.headers, withCredentials: true })
  }
  
  // fileupload(file, fileName = "") {


  //   let headers1 = new HttpHeaders()
  //     .set('Authorization', this.Authorization)
  //     .set('Authorizationkey', this.Authorizationkey)
  //     .set("Accept", "*/*");

  //   let urlSearchParams: HttpParams = new HttpParams();

  //   let formData: FormData = new FormData();
  //   if (fileName == "") {
  //     formData.append("file", file);
  //   }
  //   else {
  //     formData.append("file", file, fileName);
  //   }
  //   let jsonData = urlSearchParams.toString();
  //   //  let options = new RequestOptions({ headers: headers1, withCredentials: true });
  //   return this.http.post<any>(AppSettings.uploadProductPortfolio, formData, { headers: headers1, withCredentials: true })

  // }
  

  
  setDCNumbers(ponumber, dcn){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('ponumber',ponumber);
      dcn.forEach(number => {
        urlSearchParams = urlSearchParams.append('dcn', number);
      });
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.senddcn,jsonData,{ headers: this.headers, withCredentials: true })
  }


  readandinsertbulkuploadfile(filename1,username1){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('filename',filename1);
    urlSearchParams=urlSearchParams.append('username',username1);
    
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.readandinsertbulkuploadfile,jsonData,{ headers: this.headers, withCredentials: true })
  }
  poInvoiceSearch(poInvNumber){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('poInvNumber',poInvNumber);
    
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.poInvSearch,jsonData,{ headers: this.headers, withCredentials: true })
  }

  
  getPOformultiple(ponumber,fromdateofduration,todateofduration){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('ponumber',ponumber);
    urlSearchParams=urlSearchParams.append('fromdateofduration',fromdateofduration);
    urlSearchParams=urlSearchParams.append('todateofduration',todateofduration);
    
    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.poInvSearchformultiplpo,jsonData,{ headers: this.headers, withCredentials: true })
  }

  removeEmptyDeliveries(ponumber,DCNumber){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams=urlSearchParams.append('ponumber',ponumber);
    DCNumber.forEach(res => {
      urlSearchParams = urlSearchParams.append('dcnumber', res);
    });

    let jsonData = urlSearchParams.toString();
    return this.http.post(AppSettings.deleteemptydeliveries,jsonData,{ headers: this.headers, withCredentials: true })
  
  }

  getinternalpolistdashboardfile(ponumber,status, fromdurationdate, todurationdate, plant, purchasegroup, 
    requisitioneremailid,frompoamount,topoamount, ageingfrom,ageingto, npage,vendor) {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('ponumber', ponumber);
    urlSearchParams =  urlSearchParams.append('status', status);
    urlSearchParams =  urlSearchParams.append('fromdurationdate', fromdurationdate);
    urlSearchParams =  urlSearchParams.append('todurationdate', todurationdate);
    urlSearchParams =  urlSearchParams.append('plant', plant);
    urlSearchParams =  urlSearchParams.append('purchasegroup', purchasegroup);
    urlSearchParams =  urlSearchParams.append('requisitioneremailid', requisitioneremailid);
    urlSearchParams =  urlSearchParams.append('frompoamount', frompoamount);
    urlSearchParams =  urlSearchParams.append('topoamount', topoamount);
    urlSearchParams =  urlSearchParams.append('ageingfrom', ageingfrom);
    urlSearchParams =  urlSearchParams.append('ageingto', ageingto);
    urlSearchParams = urlSearchParams.append('vendor', vendor);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.pointernaldashboarddownload, jsonData, { withCredentials: true })
 
  }

  downloadinternalInvoiceData(invnumb,ponum,status,fromduration,toduration,plant,purgroup,reqemailid,frominvoiceamount,toinvoiceamount,
    fromageing,toageing,paginationnumber,vendor){
    let urlSearchParams: HttpParams = new HttpParams();

    urlSearchParams =  urlSearchParams.append('invoicenumber', invnumb);
    urlSearchParams =  urlSearchParams.append('ponumber', ponum);
    urlSearchParams =  urlSearchParams.append('status', status);
    urlSearchParams =  urlSearchParams.append('fromdurationdate', fromduration);
    urlSearchParams =  urlSearchParams.append('todurationdate', toduration);
    urlSearchParams =  urlSearchParams.append('plant', plant);
    urlSearchParams =  urlSearchParams.append('purchasegroup', purgroup);
    urlSearchParams =  urlSearchParams.append('requisitioneremailid', reqemailid);
    urlSearchParams =  urlSearchParams.append('frominvamount', frominvoiceamount);
    urlSearchParams =  urlSearchParams.append('toinvamount', toinvoiceamount);
    urlSearchParams =  urlSearchParams.append('ageingfrom', fromageing);
    urlSearchParams =  urlSearchParams.append('ageingto', toageing);
    urlSearchParams =  urlSearchParams.append('vendor', vendor);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getinternaldashboardSearchdata,jsonData,{withCredentials:true})
  
  }
  
}
