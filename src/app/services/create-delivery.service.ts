import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'app/models/appsetting';

@Injectable({
  providedIn: 'root'
})
export class CreateDeliveryService {
  Authorization = sessionStorage.getItem('PROFILE_ACCESS');
  Authorizationkey = sessionStorage.getItem('ACCESS_TOKEN');
  LoggedInUser = sessionStorage.getItem('loginUser');
  ReceiverMail = sessionStorage.getItem('receiverMail');

  headers= new HttpHeaders()
   .set('Authorization',this.Authorization)
   .set('Authorizationkey',this.Authorizationkey)
   .set('Content-Type', 'application/x-www-form-urlencoded')
   .set("Accept", "*/*");
  constructor(private http:HttpClient) { }
  submitDelivery(Data,lineitemtext,bussinesspartnertext,category,costcenter,unitofmeasure,contactpersonphone,company,plant,department,city,state,country,pincode,materialType,rateperQty,balQuantity,model){

    console.log('createDelivery', Data.value)
    let urlSearchParams: HttpParams = new HttpParams();

    urlSearchParams =  urlSearchParams.append('bid', sessionStorage.getItem("Bid"));
    urlSearchParams =  urlSearchParams.append('po_num', Data.PONumber);
    urlSearchParams =  urlSearchParams.append('lineItemNumber', Data.lineItem);
    urlSearchParams =  urlSearchParams.append('lineItemText',lineitemtext); // Check 
    urlSearchParams =  urlSearchParams.append('company', company); //
    urlSearchParams =  urlSearchParams.append('plant', plant); //
    urlSearchParams =  urlSearchParams.append('department',department); //
    urlSearchParams =  urlSearchParams.append('category', category); //
    urlSearchParams =  urlSearchParams.append('costCentre', costcenter); //
    urlSearchParams =  urlSearchParams.append('businessPartnerText',bussinesspartnertext); //
    urlSearchParams =  urlSearchParams.append('quantity', Data.orderquantity); //
    // urlSearchParams =  urlSearchParams.append('quantity', sessionStorage.getItem("Bid")); //
    urlSearchParams =  urlSearchParams.append('unitOfMeasure',unitofmeasure); //
    urlSearchParams =  urlSearchParams.append('contactPersonEmailID', Data.emailId); //
    urlSearchParams =  urlSearchParams.append('contactPersonPhone', contactpersonphone); //
    urlSearchParams =  urlSearchParams.append('deliveryAddress', Data.dispatchAddress); 
    urlSearchParams =  urlSearchParams.append('city', city); //
    urlSearchParams =  urlSearchParams.append('state', state); //
    urlSearchParams =  urlSearchParams.append('country', country);//
    urlSearchParams =  urlSearchParams.append('pinCode', pincode);//
    urlSearchParams =  urlSearchParams.append('iGSTAmount', Data.InvIGST);
    urlSearchParams =  urlSearchParams.append('cGSTAmount', Data.InvCGST);
    urlSearchParams =  urlSearchParams.append('sgstAmount',Data.InvSGST);
    urlSearchParams =  urlSearchParams.append('orderNumber', Data.ordernum);
    urlSearchParams =  urlSearchParams.append('Remark',Data.Remark);
    urlSearchParams =  urlSearchParams.append('deliveryDate', Data.delDate);
    urlSearchParams =  urlSearchParams.append('materialType',materialType);
    urlSearchParams =  urlSearchParams.append('rateperqty', rateperQty);
    urlSearchParams = urlSearchParams.append('Balance_qty', balQuantity)
    urlSearchParams =  urlSearchParams.append('Status', 'A');
    

    let urlSearchParams2: HttpParams = new HttpParams();
    // urlSearchParams2 =  urlSearchParams2.append('bid', sessionStorage.getItem("Bid"));
    // urlSearchParams2 =  urlSearchParams2.append('lineItemText',lineitemtext); // Check 
    // urlSearchParams2 =  urlSearchParams2.append('company', company); //
    // urlSearchParams2 =  urlSearchParams2.append('plant', plant); //
    // urlSearchParams2 =  urlSearchParams2.append('department',department); //
    // urlSearchParams2 =  urlSearchParams2.append('category', category); //
    // urlSearchParams2 =  urlSearchParams2.append('costCentre', costcenter); //
    // urlSearchParams2 =  urlSearchParams2.append('contactPersonPhone', contactpersonphone);
    // urlSearchParams2 =  urlSearchParams2.append('businessPartnerText',bussinesspartnertext);
    // urlSearchParams2 =  urlSearchParams2.append('city', city); //
    // urlSearchParams2 =  urlSearchParams2.append('state', state); //
    // urlSearchParams2 =  urlSearchParams2.append('country', country);//
    // urlSearchParams2 =  urlSearchParams2.append('pinCode', pincode);//
    // urlSearchParams2 =  urlSearchParams2.append('materialType',materialType);
    // urlSearchParams2 =  urlSearchParams2.append('rateperqty', rateperQty);
    // urlSearchParams2 = urlSearchParams2.append('Balance_qty', balQuantity)
    // urlSearchParams2 =  urlSearchParams2.append('Status', 'A');
    

// urlSearchParams2 = urlSearchParams2.append('data',Data)
for (const key in model) {
 urlSearchParams2= urlSearchParams2.append(key, model[key]);
  console.log("??????????", model);
  
}
    let jsonData = urlSearchParams2.toString()
    console.log("actual urlsearch parm", urlSearchParams);
    console.log("my model", urlSearchParams2);
    
    

    return this.http.post<any>(AppSettings.createDelivery,jsonData,{headers: this.headers,responseType: "json", withCredentials: true})
  }

  newCreateDelivery(arraybody){
    let urlSearchParams: HttpParams = new HttpParams();
    arraybody.forEach(feedback => {

      urlSearchParams = urlSearchParams.append('feedback', feedback);
    });
    let headers2 = new HttpHeaders()
    .append('Authorization', this.Authorization)
    .append('Authorizationkey', this.Authorizationkey)
    .append('Content-Type', 'application/json')
    .append("Accept", "*/*");
    return this.http.post<any>(AppSettings.createDeliveryPojo,arraybody,{headers: headers2,responseType: "json", withCredentials: true})
  }
}

