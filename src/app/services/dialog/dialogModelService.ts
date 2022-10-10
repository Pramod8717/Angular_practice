import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import { Subject } from 'rxjs';

@Injectable()
export class dialogModelService {
  
  private componentMethodCallSource = new Subject<any>();
  private componentMethodCallSourceServiceError = new Subject<any>();
  
  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  componentMethodCallSourceServiceError$ = this.componentMethodCallSourceServiceError.asObservable();


  // Service message commands
  callComponentMethod(model)  {
    this.componentMethodCallSource.next(model);    
  }

  showServiceErrorModal(model)
  {
    this.componentMethodCallSourceServiceError.next(model);
  }

}
