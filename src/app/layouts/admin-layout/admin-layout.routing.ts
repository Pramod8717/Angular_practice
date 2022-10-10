import { InternalportalViewPurchaseorderComponent } from './../../components/pagecomponents/internalportal/internalportal-view-purchaseorder/internalportal-view-purchaseorder.component';
import { InternalportalTrackPOComponent } from './../../components/pagecomponents/internalportal/internalportal-track-po/internalportal-track-po.component';
import { SubmitInvoiceComponent } from './../../components/pagecomponents/trackInvoice/submitinvoice/submitinvoice.component';
import { AuthGuard } from './../../guard/auth.guard';
import { LoginComponent } from './../../components/pagecomponents/login/login.component';
import { Routes } from '@angular/router';

import { InvalidsessionComponent } from 'app/invalidsession/invalidsession.component';
import { DashboardComponent } from '../../components/pagecomponents/dashboard/dashboard.component';
import {MultiplepoinvoicesubmissionComponent} from '../../components/pagecomponents/multiplepoinvoicesubmission/multiplepoinvoicesubmission.component';
import { IconsComponent } from '../../components/commoncomponents/icons/icons.component';
import { ProfileGeneralDataComponent } from '../../components/pagecomponents/profiledata/profiledata.component';
import { InvoiceComponent } from '../../components/pagecomponents/purchaseorder/invoice/invoice.component';
import { InvoiceDetailsComponent } from '../../components/pagecomponents/trackInvoice/invoicedetails/invoicedetails.component';
import { TrackInvoiceComponent } from '../../components/pagecomponents/trackInvoice/trackinvoice/trackinvoice.component';
import { TrackInvoiceListComponent } from '../../components/pagecomponents/trackInvoice/trackinvoicelist/trackinvoicelist.component';
import { InvoiceListComponent } from '../../components/pagecomponents/trackInvoice/invoicelist/invoicelist.component';
import { PurchaseOrdersListComponent } from '../../components/pagecomponents/purchaseorder/purchaseorderslist/purchaseorderslist.component';
import { CreateDeliveryComponent } from 'app/components/pagecomponents/purchaseorder/createdelivery/createdelivery.component';
import { PoOrderDispachedComponent } from 'app/components/pagecomponents/purchaseorder/poorderdispached/purchaseorderdispached.component';
import { PoOrderViewComponent } from 'app/components/pagecomponents/purchaseorder/purchaseorderview/purchaseorderview.component';
import { FourZeroFourComponent } from 'app/components/commoncomponents/fourzerofour/fourzerofour.component';
// import { InternalportaldashboardComponent } from 'app/components/pagecomponents/internalportal/internalportaldashboard/internalportaldashboard.component';
import { InvoiceSubmissionComponent } from 'app/components/pagecomponents/invoice-submission/invoice-submission.component'
import { InternalportaltrackinvoicelistComponent } from 'app/components/pagecomponents/internalportal/internalportaltrackinvoicelist/internalportaltrackinvoicelist.component';
import { TrackinvoiceWithPOComponent } from 'app/components/pagecomponents/internalportal/trackinvoice-with-po/trackinvoice-with-po.component'
import { InternalTrackInvoiceWithoutPOComponent } from 'app/components/pagecomponents/internalportal/internal-track-invoice-without-po/internal-track-invoice-without-po.component'
import { InternalbuyerportaldashboardComponent } from 'app/components/pagecomponents/internalBuyerportal/internalbuyerportaldashboard/internalbuyerportaldashboard.component';
import { VendorListComponent } from 'app/components/pagecomponents/internalBuyerportal/buyerportalvendorlist/vendor-list.component';
import { BuyerpurchaseorderlistComponent } from 'app/components/pagecomponents/internalBuyerportal/buyerPOList/buyerpurchaseorderlist.component';
import { BuyertrackinvoicelistComponent } from 'app/components/pagecomponents/internalBuyerportal/buyertrackinvoicelist/buyertrackinvoicelist.component';
import { InternaltrackinvoicedetailsComponent } from 'app/components/pagecomponents/internalBuyerportal/internaltrackinvoicedetails/internaltrackinvoicedetails.component';
import { InternalpayerportalComponent } from 'app/components/pagecomponents/internalBuyerportal/internalpayerportal/internalpayerportal.component';
import { createCreditNoteComponent } from 'app/components/pagecomponents/trackInvoice/createCreditNote/createCreditNote.component';
import { MultiplepoinvoicepurchaseorderslistComponent } from 'app/components/pagecomponents/purchaseorder/multiplepoinvoicepurchaseorderslist/multiplepoinvoicepurchaseorderslist.component';
import { InternalportaldashboardComponent } from 'app/components/pagecomponents/internalportal/internalportaldashboard/internalportaldashboard.component';
import { PracticeComponent } from 'app/components/pagecomponents/practice/practice.component';
import { DetailsComponent } from 'app/details/details.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',       component: DashboardComponent ,canActivate:[AuthGuard]},
    {path: 'practice', component:PracticeComponent ,canActivate:[AuthGuard]},
    {path: 'details', component:DetailsComponent,canActivate:[AuthGuard]},
    { path: 'icons',           component: IconsComponent,canActivate:[AuthGuard]},
    { path: 'profileGeneralData',  component: ProfileGeneralDataComponent,canActivate:[AuthGuard] },
    { path: 'submitInvoiceFromList', component: InvoiceComponent,canActivate:[AuthGuard] },
    { path: 'submitInvoiceList', component: InvoiceDetailsComponent,canActivate:[AuthGuard] },
    { path: 'trackInvoiceDetails', component: TrackInvoiceComponent,canActivate:[AuthGuard] },
    { path: 'trackInvoiceList', component: TrackInvoiceListComponent,canActivate:[AuthGuard] },
    { path: 'invoiceList', component: InvoiceListComponent,canActivate:[AuthGuard] },
    { path: 'purchaseOrdersList', component: PurchaseOrdersListComponent,canActivate:[AuthGuard]},
    { path: 'multipopurchaseorderlist', component: MultiplepoinvoicepurchaseorderslistComponent,canActivate:[AuthGuard]},
    {path:'login', component:LoginComponent},
    {path:'multipoinvoicesubmission', component:MultiplepoinvoicesubmissionComponent},
    { path: 'multipopurchaseorderlist', component: MultiplepoinvoicepurchaseorderslistComponent,canActivate:[AuthGuard]},
    {path:'submitInvoice', component:SubmitInvoiceComponent,canActivate:[AuthGuard]},
    {path: 'createDelivery', component:CreateDeliveryComponent,canActivate:[AuthGuard]},
    {path:'poOrderDispatched', component:PoOrderDispachedComponent,canActivate:[AuthGuard]},
    {path:'poOrderView', component:PoOrderViewComponent,canActivate:[AuthGuard]},
    {path:'internalportal', component:InternalportaldashboardComponent,canActivate:[AuthGuard]},
    { path: 'internaltrackInvoiceList', component: InternalportaltrackinvoicelistComponent },
    {path:'invoicesubmission', component:InvoiceSubmissionComponent},
    {path:'multipoinvoicesubmission', component:MultiplepoinvoicesubmissionComponent},
    {path:'internaltrackinvoicewithPO', component:TrackinvoiceWithPOComponent,canActivate:[AuthGuard]},
    {path:'internaltrackinvoicewithoutPO', component:InternalTrackInvoiceWithoutPOComponent,canActivate:[AuthGuard]},
    {path:'internalTrackPO', component:InternalportalTrackPOComponent},
    {path:'internalViewPO', component:InternalportalViewPurchaseorderComponent},
    {path:'internalBuyerportal', component:InternalbuyerportaldashboardComponent,canActivate:[AuthGuard]},
    {path:'vendorList', component:VendorListComponent,canActivate:[AuthGuard]},
    {path:'internalpurchaseorderlist', component:BuyerpurchaseorderlistComponent},
    {path:'invalidsession', component:InvalidsessionComponent},
    {path:'internalinvoicelist', component:BuyertrackinvoicelistComponent},
    {path:'internaltrackinvoicedetails', component:InternaltrackinvoicedetailsComponent,canActivate:[AuthGuard]},
    {path:'internalPayerportal', component:InternalpayerportalComponent,canActivate:[AuthGuard]},
    {path:'createCreditNote',component:createCreditNoteComponent,canActivate:[AuthGuard]},
    // {path: '**', component:FourZeroFourComponent }
    {path: '404', component: FourZeroFourComponent, canActivate:[AuthGuard]},
    {path: '**', redirectTo: '/404', canActivate:[AuthGuard]},
    
];
