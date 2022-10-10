import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internalbuyerportaldashboard',
  templateUrl: './internalbuyerportaldashboard.component.html',
  styleUrls: ['./internalbuyerportaldashboard.component.css']
})
export class InternalbuyerportaldashboardComponent implements OnInit {
  searchKey:any;
  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem("portaltype","innerbuyerportal");
  }


}
