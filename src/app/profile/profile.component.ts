  import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data1: any;

  constructor(   
    private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params)=>{
      console.log(params);
      this.data1=JSON.parse(params['data5']);
    })
    
      }
  }


