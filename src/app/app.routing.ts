import { AuthGuard } from './guard/auth.guard';
import { FourZeroFourComponent } from './components/commoncomponents/fourzerofour/fourzerofour.component';
import { ProfileGeneralDataComponent } from './components/pagecomponents/profiledata/profiledata.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule,CanActivate, PreloadAllModules,} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/commoncomponents/navbar/navbar.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {InvoiceComponent } from './components/pagecomponents/purchaseorder/invoice/invoice.component';
import {InvoiceDetailsComponent} from './components/pagecomponents/trackInvoice/invoicedetails/invoicedetails.component';
import {InvoiceListComponent } from './components/pagecomponents/trackInvoice/invoicelist/invoicelist.component';
import {PurchaseOrdersListComponent } from './components/pagecomponents/purchaseorder/purchaseorderslist/purchaseorderslist.component';
import {TrackInvoiceComponent} from './components/pagecomponents/trackInvoice/trackinvoice/trackinvoice.component';
import {LoginComponent} from './components/pagecomponents/login/login.component';
import {TrackInvoiceListComponent} from './components/pagecomponents/trackInvoice/trackinvoicelist/trackinvoicelist.component';
import { DashboardComponent } from './components/pagecomponents/dashboard/dashboard.component';
import { PracticeComponent } from './components/pagecomponents/practice/practice.component';


const routes: Routes =[
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    },
    
  ],
   
  },
  // {path: 'practice', component:PracticeComponent, canActivate:[AuthGuard]}

  
  // {
  //   path:'',
  //   component: NavbarComponent

  // }
  // { 
  //   path: 'dashboard', 
  //   component: DashboardComponent,
   
   
  // },
  // { 
  //   path: 'submitInvoiceFromList', 
  //   component: InvoiceComponent,
   
  // },
  // { 
  //   path: 'submitInvoiceList', 
  //   component: InvoiceDetailsComponent,
   
  // },
  // { 
  //   path: 'invoiceList', 
  //   component: InvoiceListComponent,
   
  // },
  // { 
  //   path: 'purchaseOrdersList', 
  //   component: PurchaseOrdersListComponent,
   
  // },
  // { 
  //   path: 'trackInvoiceDetails', 
  //   component: TrackInvoiceComponent,
   
  // },
  // { 
  //   path: 'login', 
  //   component: LoginComponent 
  // },
  // { 
  //   path: 'trackInvoiceList', 
  //   component: TrackInvoiceListComponent,
   
  // },
  // {
  //   path: 'profileGeneralData',
  //   component: ProfileGeneralDataComponent,
   
  // },
  // // {
  // //   path: '**', component:FourZeroFourComponent
  // // }
  // {path: '404', component: FourZeroFourComponent},
  //   {path: '**', redirectTo: '/404'}
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true,  preloadingStrategy: PreloadAllModules 
    })
  ],
  exports: [RouterModule
  ],
})
export class AppRoutingModule { }
