import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'app/models/appsetting';

@Injectable({
  providedIn: 'root'
})
export class InternalportalserviceService {
  

  constructor(private http: HttpClient) { }
  // getinvoicedetailsbasedonemailid(emailid: string) {
  //   throw new Error('Method not implemented.');
  // }

  getinvoicedetailsbasedonemailid(emailid: string,mpage,status,invno,pono,fdate,tdate,plant,vendor) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('emailid', emailid);
    urlSearchParams =  urlSearchParams.append('page', mpage);
    urlSearchParams =  urlSearchParams.append('status', status);
    urlSearchParams =  urlSearchParams.append('invoicenumber', invno);
    urlSearchParams =  urlSearchParams.append('ponumber', pono);
    urlSearchParams =  urlSearchParams.append('fromdate', fdate);
    urlSearchParams =  urlSearchParams.append('todate', tdate);
    urlSearchParams =  urlSearchParams.append('plant', plant);
    urlSearchParams =  urlSearchParams.append('vendor', vendor);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.getinvoicedetailsbasedonemailid, jsonData, {withCredentials:true })
  }

  updateEndUserApprovalStatus(InvoiceNumber,ponumber,enduserstatus,enduserId,stage,storekeeper) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('INVOICENUMBER', InvoiceNumber);
    urlSearchParams =  urlSearchParams.append('PONUMBER', ponumber);
    urlSearchParams =  urlSearchParams.append('enduserstatus', enduserstatus);
    urlSearchParams =  urlSearchParams.append('enduserId', sessionStorage.getItem('username'));
    urlSearchParams =  urlSearchParams.append('stage', stage);
    urlSearchParams =  urlSearchParams.append('storekeeperaction', storekeeper);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.userapprovalstatus, jsonData, {withCredentials:true })
  }
  updateManagerApprovalStatus(InvoiceNumber,ponumber,managerstatus,managerId,stage) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('INVOICENUMBER', InvoiceNumber);
    urlSearchParams =  urlSearchParams.append('PONUMBER', ponumber);
    urlSearchParams =  urlSearchParams.append('managerstatus', managerstatus);
    urlSearchParams =  urlSearchParams.append('managerId', sessionStorage.getItem('username'));
    urlSearchParams =  urlSearchParams.append('stage', stage);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.managerapprovalstatus, jsonData, {withCredentials:true })
  }

  updateManagerConfirmerStatus(InvoiceNumber,ponumber,managerstatus,managerId,stage) {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('INVOICENUMBER', InvoiceNumber);
    urlSearchParams =  urlSearchParams.append('PONUMBER', ponumber);
    urlSearchParams =  urlSearchParams.append('managerstatus', managerstatus);
    urlSearchParams =  urlSearchParams.append('managerId', sessionStorage.getItem('username'));
    urlSearchParams =  urlSearchParams.append('stage', stage);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.updateManagerConfirmerStatus, jsonData, {withCredentials:true })
  }
  getManagerList() {
    return this.http.post<any>(AppSettings.managerlistforpproval, '', {withCredentials:true })
  }

  getoverallstatus(InvoiceNumber) 
  {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoice', InvoiceNumber);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.overallstatusUpdate, jsonData, {withCredentials:true })
  }

  invoiceBankDetails(vendor) 
  {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('vendorId', vendor);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.invoiceBankvendorDetails, jsonData, {withCredentials:true })
  }

  addMultipleManager(invoiceList) 
  {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoiceList', invoiceList);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.addmultipleManagers, invoiceList, {withCredentials:true })
  }

  addMultipleManagerandConfirmers(invoiceList , confirmerslist)
  {
    // urlSearchParams =  urlSearchParams.append('invoiceList', invoiceList);
    // urlSearchParams =  urlSearchParams.append('confirmerslist', confirmerslist);
    let urlSearchParams: HttpParams = new HttpParams();
    invoiceList.forEach(feedback1 => {
  
      urlSearchParams = urlSearchParams.append('managersapprovelist', feedback1);
    });
    confirmerslist.forEach(feedback => {
  
      urlSearchParams = urlSearchParams.append('confirmerslist', feedback);
    });
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL){invoiceList,jsonData}
    return this.http.post<any>(AppSettings.addMultipleManagerandConfirmers, jsonData, {withCredentials:true })
  }

  
  getmanagercountdetails(inv_num,po_num) 
  {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoice', inv_num);
    urlSearchParams =  urlSearchParams.append('po_num', po_num);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.managercountdetails, jsonData, {withCredentials:true })
  }

  trackinvoicestatusforinternal(inv_num,po_num)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoicenumber', inv_num);
    urlSearchParams =  urlSearchParams.append('ponumber', po_num);
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.internaltrackinvoicestatus, jsonData, {withCredentials:true })
  }
  getMultipleManagerList(inv_num,po_num) 
  {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoice', inv_num);
    urlSearchParams =  urlSearchParams.append('po_num', po_num);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.getMultipleManagerList, jsonData, {withCredentials:true })
  }
  searchPeople(text,actionby,plant,material) 
  {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('text', text);
    urlSearchParams =  urlSearchParams.append('actionby', actionby);
    urlSearchParams =  urlSearchParams.append('plant', plant);
    urlSearchParams =  urlSearchParams.append('material', material);
    // urlSearchParams =  urlSearchParams.append('actionby', sessionStorage.getItem('storekeeper'));
    let jsonData = urlSearchParams.toString();
    console.log("AppSettings.apitime ==>", AppSettings.apitime)
    if (AppSettings.apitime == "http://115.242.9.72:8085/DxProject" || AppSettings.apitime == "http://localhost:8080/DxProject") {
      return this.http.post<any>(AppSettings.searchpeoplefordevenvironment, jsonData, { withCredentials: true })
    }
    else {
      return this.http.post<any>(AppSettings.searchpeople, jsonData, { withCredentials: true })
    }

  }
  getcustomManagerList(email,plant,material) 
  {
    // console.log("sending Data", PAN)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('emailid', email);
    urlSearchParams =  urlSearchParams.append('actionby', sessionStorage.getItem('storekeeper'));
    urlSearchParams =  urlSearchParams.append('plant', plant);
    urlSearchParams =  urlSearchParams.append('material', material);
    let jsonData = urlSearchParams.toString();
    console.log("AppSettings.apitime", AppSettings.apitime);
    if (AppSettings.apitime == "http://115.242.9.72:8085/DxProject" || AppSettings.apitime == "http://localhost:8080/DxProject") {
      return this.http.post<any>(AppSettings.getcustomManagerListfordevenvironment, jsonData, { withCredentials: true })
    }
    else {
      return this.http.post<any>(AppSettings.getcustomManagerList, jsonData, { withCredentials: true })
    }

  }

  getstatuschatmessages(inv,po)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('invoicenumber', inv);
    urlSearchParams=urlSearchParams.append('po_num', po);

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.getstatuschatmessages, jsonData, { withCredentials: true })

  }

  getChatStatus(){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    urlSearchParams=urlSearchParams.append('emailid', sessionStorage.getItem('username'));

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.getUnreadMessage, jsonData, { withCredentials: true })



  }

  getInternalPoData(emailid,status,npage,ponumber,fromdateofduration,todateofduration,fromdateofpo,todateofpo,
    plant,vendor){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('email', emailid);
    urlSearchParams =  urlSearchParams.append('status', status);
    urlSearchParams =  urlSearchParams.append('nPage', npage);
    urlSearchParams =  urlSearchParams.append('ponumber', ponumber);
    urlSearchParams =  urlSearchParams.append('fromdateofduration', fromdateofduration);
    urlSearchParams =  urlSearchParams.append('todateofduration', todateofduration);
    urlSearchParams =  urlSearchParams.append('fromdateofpo', fromdateofpo);
    urlSearchParams =  urlSearchParams.append('todateofpo', todateofpo);
    urlSearchParams =  urlSearchParams.append('plant', plant);
    urlSearchParams =  urlSearchParams.append('vendor', vendor);

    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.internalPortalPOList, jsonData, {withCredentials:true })

  }

getInternalBuyerInvoiceData(emailid:string){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('email', emailid);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.internalBuyerPortalInvoiceList, jsonData, {withCredentials:true })

  }
  
    getInternalBuyerInvoiceSummary(emailid:string){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('emailid', emailid);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.internalBuyerPortalSummaryInvoiceList, jsonData, {withCredentials:true })

  }
  getInvoicesbasedonUserType(emailid:string,mpage,status,invno,pono,fdate,tdate,plant,vendor){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('emailid', emailid);
    urlSearchParams =  urlSearchParams.append('page', mpage);
    urlSearchParams =  urlSearchParams.append('status', status);
    urlSearchParams =  urlSearchParams.append('invoicenumber', invno);
    urlSearchParams =  urlSearchParams.append('ponumber', pono);
    urlSearchParams =  urlSearchParams.append('fromdate', fdate);
    urlSearchParams =  urlSearchParams.append('todate', tdate);
    urlSearchParams =  urlSearchParams.append('plant', plant);
    urlSearchParams =  urlSearchParams.append('vendor', vendor);
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.InvoicesbasedonUserType, jsonData, {withCredentials:true })

  }
  
   getlistitemsforinvoicenumbers(data,ponumber)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoice', data);
    urlSearchParams =  urlSearchParams.append('po_num', ponumber);
    
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getinternallistitemsforinvoicenumber,jsonData,{withCredentials: true})

   }

  
  getInternalLineItems(ponumber){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('po_num', ponumber);
    let jsonData = urlSearchParams.toString();
    // console.log("URL",baseURL)
    return this.http.post<any>(AppSettings.internalportalLineitems, jsonData, {withCredentials:true })
  }

  getInternalInvMessages(poNumber,invNumber) {
    let urlSearchParams: HttpParams = new HttpParams();
    // urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num', poNumber);
    urlSearchParams = urlSearchParams.append('invoicenumber', invNumber);
    let jsonData = urlSearchParams.toString();
    console.log("jsonData", jsonData)

    return this.http.post<any>(AppSettings.getInvMessages, jsonData, { responseType: "json", withCredentials: true })
  }


  submitInternalInvoiceChat(poNumber, uniquePONumber, uniqueInvNumber, status, message, subject, topic) {

    let urlSearchParams: HttpParams = new HttpParams();
    // urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
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
    urlSearchParams = urlSearchParams.append('emailid', sessionStorage.getItem('username'))
    // urlSearchParams = urlSearchParams.append('RequsitionerEmail', this.ReceiverMail)
    console.log("loggedIn User", sessionStorage.getItem('loginUser'))
    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.sendInvMessages, jsonData, {responseType: "json", withCredentials: true })
  }

  internalInvoiceStatusSubmit(poNumber, uniquePONumber, uniqueInvNumber, status, message, subject, topic) {

    let urlSearchParams: HttpParams = new HttpParams();
    // urlSearchParams = urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
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
    urlSearchParams = urlSearchParams.append('emailid', sessionStorage.getItem('username'))
    // urlSearchParams = urlSearchParams.append('RequsitionerEmail', this.ReceiverMail)
    console.log("loggedIn User", sessionStorage.getItem('loginUser'))
    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.internalInvoiceStatusSubmit, jsonData, {responseType: "json", withCredentials: true })
  }

  


  getInternalPOMessages(poNumber) {
    let urlSearchParams: HttpParams = new HttpParams();
    // urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('po_num', poNumber);
    let jsonData = urlSearchParams.toString();
    console.log("jsonData", jsonData)

    return this.http.post<any>(AppSettings.getPOMessages, jsonData, { responseType: "json", withCredentials: true })
  }

  sendInternalMessage(poNumber, status, message, subject, topic) {

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
    urlSearchParams = urlSearchParams.append('emailid',sessionStorage.getItem('username'))
    urlSearchParams = urlSearchParams.append('invoiceNumber', '')
    // console.log("loggedIn User", this.LoggedInUser)
    let jsonData = urlSearchParams.toString();

    // console.log("type", this.Authorization)

    return this.http.post<any>(AppSettings.sendPOMessages, jsonData, {responseType: "json", withCredentials: true })
  }


  getInternalPOReadStatus() {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('emailid', sessionStorage.getItem("username"));

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.pomessageReadStatus, jsonData, { withCredentials: true })

  }


  getChatStatusUpdate(bid,poNumber, invNumber) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('bid',bid);
    urlSearchParams = urlSearchParams.append('po_num',poNumber);
    urlSearchParams=urlSearchParams.append('invoice_num',invNumber);
    urlSearchParams=urlSearchParams.append('emailid',sessionStorage.getItem('username'));

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.updateInternalChatStatus, jsonData, {withCredentials: true })
  }


  getInternalInvoiceReadStatus() {
    let urlSearchParams: HttpParams = new HttpParams();
    // urlSearchParams = urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    urlSearchParams = urlSearchParams.append('emailid', sessionStorage.getItem("username"));

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.getInternalInvoicemessageStatus, jsonData, { withCredentials: true })

  }

  getinternalorderitems(lineitemnumber,poNumber) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('po_num',poNumber);
    urlSearchParams=urlSearchParams.append('lineitemnumber',lineitemnumber);

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.getinternalorderitems, jsonData, {withCredentials: true })
  }

  reassignenduser(invoicenumber,poNumber,emailid) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('ponumber',poNumber);
    urlSearchParams=urlSearchParams.append('invoicenumber',invoicenumber);
    urlSearchParams = urlSearchParams.append('emailtobereassigned',emailid);
    urlSearchParams = urlSearchParams.append('useremailid',sessionStorage.getItem('username'));


    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.reassignenduser, jsonData, {withCredentials: true })
  }

  updateacceptedquantityofinvoice(model) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
  
  model.forEach(feedback => {

    urlSearchParams = urlSearchParams.append('updateaccepted', feedback);
  });
  let jsonData = urlSearchParams.toString();


    return this.http.post<any>(AppSettings.updateacceptedquantityofinvoice, jsonData, {responseType: "json", withCredentials: true })
  }

  updateacceptedquantityofinvoicewithoutgrn(model) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
  
  model.forEach(feedback => {

    urlSearchParams = urlSearchParams.append('updateacceptedwithoutgrn', feedback);
  });
  let jsonData = urlSearchParams.toString();


    return this.http.post<any>(AppSettings.updateacceptedquantityofinvoicewithoutgrn, jsonData, {responseType: "json", withCredentials: true })
  }

  updateacceptedservicequantityofinvoice(model)
  {
    let urlSearchParams: HttpParams = new HttpParams();
  model.forEach(feedback => {

    urlSearchParams = urlSearchParams.append('updateaccepted', feedback);
  });
  let jsonData = urlSearchParams.toString();


    return this.http.post<any>(AppSettings.updateacceptedservicequantityofinvoice, jsonData, {responseType: "json", withCredentials: true })

  }

  updateacceptedservicequantityofinvoicewithoutgrn(model)
  {
    let urlSearchParams: HttpParams = new HttpParams();
  model.forEach(feedback => {

    urlSearchParams = urlSearchParams.append('updateserviceaccepted', feedback);
  });
  let jsonData = urlSearchParams.toString();


    return this.http.post<any>(AppSettings.updateacceptedservicequantityofinvoicewithoutinvoice, jsonData, {responseType: "json", withCredentials: true })

  }

  getportalid(enduser)
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('useremail',enduser);
    // urlSearchParams = urlSearchParams.append('useremailid',sessionStorage.getItem('username'));


    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.getportalid, jsonData, {withCredentials: true })

  }
  
  updateenduseretails(multipleactualfilename,multiplesavedfilename,enduserremark,invoicenumber,ponumber) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('multipleactualfilename',multipleactualfilename);
    urlSearchParams = urlSearchParams.append('multiplesavedfilename',multiplesavedfilename);
    urlSearchParams = urlSearchParams.append('enduserremark',enduserremark);
    urlSearchParams = urlSearchParams.append('invoicenumber',invoicenumber);
    urlSearchParams = urlSearchParams.append('ponumber',ponumber);
   

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.updateenduseretails, jsonData, {withCredentials: true })
  }
  
  getstoragelocation(plant) {
    // console.log(poNumber)
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams = urlSearchParams.append('plant',plant);
   

    let jsonData = urlSearchParams.toString();

    return this.http.post<any>(AppSettings.getstoragelocation, jsonData, {withCredentials: true })
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

     return this.http.post<any>(AppSettings.internalmultiplefileupload, formData1, { withCredentials: true })

  }
  getcreditadviceDetails(inv_num,po_num) 
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoice', inv_num);
    urlSearchParams =  urlSearchParams.append('po_num', po_num);
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getcreditadvice, jsonData, {withCredentials:true })
  }
  getinternalcreditadviceDetails(inv_num,po_num) 
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('invoice', inv_num);
    urlSearchParams =  urlSearchParams.append('po_num', po_num);
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.internalgetcreditadvice, jsonData, {withCredentials:true })
  }
  createcreditNote(bid,creditadviceno,invoice,po_num,amount,tax,totalamt,actualfilename,savedfilename) 
  {
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('bid', bid);
    urlSearchParams =  urlSearchParams.append('creditadviceno', creditadviceno);
    urlSearchParams =  urlSearchParams.append('invoice', invoice);
    urlSearchParams =  urlSearchParams.append('po_num', po_num);
    urlSearchParams =  urlSearchParams.append('amount', amount);
    urlSearchParams =  urlSearchParams.append('tax', tax);
    urlSearchParams =  urlSearchParams.append('totalamt', totalamt);
    urlSearchParams =  urlSearchParams.append('actualfilename', actualfilename);
    urlSearchParams =  urlSearchParams.append('savedfilename', savedfilename);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.createCreditNote, jsonData, {withCredentials:true })
  }
  getCreditNoteDetails(creditadviceno,invoice,po_num){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('creditadviceno', creditadviceno);
    urlSearchParams =  urlSearchParams.append('invoice', invoice);
    urlSearchParams =  urlSearchParams.append('po_num', po_num);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getcreditNoteDetails,jsonData,{withCredentials:true})
  }

  getInternalCreditNoteDetails(creditadviceno,invoice,po_num){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('creditadviceno', creditadviceno);
    urlSearchParams =  urlSearchParams.append('invoice', invoice);
    urlSearchParams =  urlSearchParams.append('po_num', po_num);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getinternalcreditNoteDetails,jsonData,{withCredentials:true})
  }


  getEndUserReturn(array){

    let urlSearchParams: HttpParams = new HttpParams();
    array.forEach(feedback => {

      urlSearchParams = urlSearchParams.append('feedback', feedback);
    });
    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getEndUserReturn,array,{withCredentials:true})
  }

  getemailidsbasedonmaterial(material,plant){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('materrial', material);
    urlSearchParams =  urlSearchParams.append('plant', plant);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getidsbasedonmaterial,jsonData,{withCredentials:true})
  }

  getPlanCode(codeordesc){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('codeordesc', codeordesc);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getinternalplantcodeordesc,jsonData,{withCredentials:true})
  }

  getVendorData(vendordesc){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('vendordesc', vendordesc);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getinternalvendorcodeordesc,jsonData,{withCredentials:true})
  }

  getPurchaseGroup(matcodeordesc){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('matcodeordesc', matcodeordesc);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getmatcodeordesc,jsonData,{withCredentials:true})
  }

  getpurchasegroupData(matdesc){
    let urlSearchParams: HttpParams = new HttpParams();
    urlSearchParams =  urlSearchParams.append('matcodeordesc', matdesc);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getinternalpurchasegroupdesc,jsonData,{withCredentials:true})
  }

  getinternalSearchdata(invnumb,ponum,status,fromduration,toduration,plant,purgroup,reqemailid,frominvoiceamount,toinvoiceamount,
    fromageing,toageing,paginationnumber,vendor){
    let urlSearchParams: HttpParams = new HttpParams();
    // status, fromdurationdate, todurationdate,plant,purchasegroup,
    // requisitioneremailid,frompoamount,topoamount,ageingfrom,ageingto,npage

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
    urlSearchParams =  urlSearchParams.append('npage', paginationnumber);
    urlSearchParams =  urlSearchParams.append('vendor', vendor);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.getinternalSearchdata,jsonData,{withCredentials:true})
  }

  pointernaldashboardsearch(ponumber,status, fromdurationdate, todurationdate, plant, purchasegroup, 
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
    urlSearchParams = urlSearchParams.append('npage', npage);
    urlSearchParams = urlSearchParams.append('vendor', vendor);

    let jsonData = urlSearchParams.toString();
    return this.http.post<any>(AppSettings.pointernaldashboardsearch, jsonData, { withCredentials: true })
  }

  
}
