import { AppSettings } from './../../models/appsetting';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  Authorization:any;
  Authorizationkey:any;
  
  headers= new HttpHeaders()
     .set('Authorization',sessionStorage.getItem('PROFILE_ACCESS'))
    .set('Authorizationkey',sessionStorage.getItem('ACCESS_TOKEN'))
    .set('Content-Type', 'application/x-www-form-urlencoded')

  constructor(private http:HttpClient) {
  }

 
  getProfile(){

    let urlSearchParams: HttpParams = new HttpParams();
    let Bid =sessionStorage.getItem("Bid");
    urlSearchParams =  urlSearchParams.append('Bid', sessionStorage.getItem("Bid"));
    let jsonData = urlSearchParams.toString();

    // console.log("type", this.Authorization)
    
    return this.http.post<any>(AppSettings.profileDetails,jsonData,{responseType: "json", withCredentials: true})
  }

    
   save(model :any){
// this.headers.set('Content-Type', 'application/x-www-form-urlencoded')
      // console.log("save service" ,model, this.headers);
      let urlSearchParams: HttpParams = new HttpParams();
      model.forEach(res => {
        urlSearchParams = urlSearchParams.append('bussinesslist', res);
      });

      // console.log("data after loop",urlSearchParams)

      let jsonData = urlSearchParams.toString() ;
      return this.http.post<any>(AppSettings.saveProfileData,jsonData,{headers: this.headers, withCredentials: true})  
    }


    uploadFile(file , fileName =""){


     let headers1= new HttpHeaders()
      .set('Authorization',this.Authorization)
      .set('Authorizationkey',this.Authorizationkey)
      .set("Accept", "*/*");

      let urlSearchParams: HttpParams = new HttpParams();

      let formData: FormData = new FormData();
      if (fileName == "") {
        formData.append("file", file);
      }
      else {
        formData.append("file", file);
      }
      let jsonData = urlSearchParams.toString();
      return this.http.post<any>(AppSettings.uploadProductPortfolio,formData,{withCredentials: true})
     
    }
  }

