import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-invalidsession',
  templateUrl: './invalidsession.component.html',
  styleUrls: ['./invalidsession.component.css']
})
export class InvalidsessionComponent implements OnInit {
  sessionLogout: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var responseValue = atob(params.order) 
      if (responseValue == "true") {
        this.sessionLogout = true;
      } else {
        this.sessionLogout = false;
      }
    })
  }

}
