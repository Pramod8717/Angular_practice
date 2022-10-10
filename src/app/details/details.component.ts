import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { query } from 'chartist';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  ponumber:any;
  data1:any;
  date: any;
  amount: any;
  constructor(private router:Router,
    private route:ActivatedRoute) { 
  }

  
  onBack(){

    this.router.navigate(['./practice'],{
      
        })

  }

  
  openapproval(n) {
    console.log(n);
    let approvalBox = document.getElementById("approvalBox" + n);
    let closeArrow = document.getElementById("closeArrow" + n);
    let openArrow = document.getElementById("openArrow" + n);
    if (approvalBox.style.display === "none") {
      approvalBox.style.display = "block";
      closeArrow.style.display = "block";
      openArrow.style.display = "none";
    } else {
      approvalBox.style.display = "none";
      openArrow.style.display = "block";
      closeArrow.style.display = "none";
    }
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params)=>{
      console.log(params);
     this.ponumber= params.POnumber,
     this.date = params.Date,
     this.amount = params.amount
    // this.data1=JSON.parse(params['data'])
    
    
    })
    
      }

    }
