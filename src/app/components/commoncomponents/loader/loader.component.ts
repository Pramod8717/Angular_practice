import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../../../services/LoaderService/loader.service';
import { LoaderState } from '../../../services/LoaderService/loader-state';



@Component({
  selector: 'app-loader',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']

})

export class LoaderComponent implements OnInit {
  loading = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) 
  { }



  ngOnInit() {

    // console.log(localStorage.getItem("pagetitle"));
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
        this.loading = state.show;
});

  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}