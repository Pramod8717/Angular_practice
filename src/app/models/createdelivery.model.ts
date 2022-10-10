import { Injectable } from '@angular/core';


export class createDeliveryModel{
    bid:any
    po_num : any;
    lineItemNumber:any;
    lineItemText:any;
    company:any;
    plant:any;
    department:any;
    category:any;
    costCentre:any;
    businessPartnerText:any;
    quantity:any;
    unitOfMeasure:any;
    contactPersonEmailID:any;
    contactPersonPhone:any;
    deliveryAddress:any;
    city:any;
    state:any;
    country:any;
    pinCode:any;
    iGSTAmount:any;
    cGSTAmount:any;
    sgstAmount:any;
    orderNumber:any;
    Remark:any;
    deliveryDate:any;
    materialType:any;
    rateperqty:any;
    Balance_qty:any;
    Status:'A';
}


export class createDeliverySubmissionsModel{

    businesspartneroid:any
    ponumber : any;
    lineitemnumber:any;
    lineitemtext:any;
    company:any;
    plant:any;
    department:any;
    category:any;
    costcentre:any;
    businesspartnertext:any;
    quantity:any;
    unitofmeasure:any;
    contactpersonemailid:any;
    contactpersonphone:any;
    deliveryaddress1:any;
    deliveryaddress2:any;
    deliveryaddress3:any;
    city:any;
    state:any;
    country:any;
    pincode:any;
    igstamount:any;
    cgstamount:any;
    sgstamount:any;
    ordernumber:any;
    remark:any;
    material_type:any;
    rateperqty:any;
    balance_qty:any;
    status:'A';
    storagelocation:any;
    material:any;
    deliverydate:any;
   
}

export class createDeliveryInvoiceSubmissionsModel{
    bid:any
    po_num:any;
    irnNumber:any;
    irnDate:any;
    invoiceNumber:any;
    invoiceDate:any;
    referenceNumber:any;
    gRNNumber:any;
    lineItemNumber:any;
    orderNumber:any;
    quantity:any;
    uOM:any;
    contactPerson:any;
    contactPersonPhone:any;
    vendorID:any;
    company:any;
    plant:any;
    department:any;
    costCentre:any;
    category:any;
    businessPartnerText:any;
    profileID:any;
    invoiceDocumentPath:any;
    iGSTAmount:any;
    cGSTAmount:any;
    sgstAmount:any;
    totalAmount:any;
    description:any;
    invoiceamount:any;
    actualfilename:any;
    savedfilename:any;
    createdby:any;
    managerid:any;
    buyerid:any;
    stage:any;
    balance_qty:any;
    modified_by:any;
    rawinvno:any;
    invoicetype:any;
    status:'P';
    acceptedqty:any;
    storagelocation:any;
}

export class deliveryDetails{
    DcNo:any;
    DQty:any
    DcDate:any;
    LINEITEMNUMBER:any;
    PO_NUMBER:any;
    LINEITEMTEXT:any;
    UNITOFMEASURE;
    Per:1;
    lineType:any;
    QUANTITY:any;
    CURRENCY:any;
    RATEPERQTY:any;
    BALANCE_QTY:any;
    AMOUNT:any;
    TOTALAMONT:any;
    vendorId:any;
    PODATE:any;
    DC:any;
    MATERIAL:any;
    PLANT:any;
}
export class orderdetailsModel{
    DC:any;
    DQty:any
    DcDate:any;
    AMOUNT:any;
    LINEITEMNUMBER:any;
    ORDERNUMBER:any;
    QUANTITY:any;
    vendorID:any;
    DcNo:any;
}

export class LineItemOrderModel{
    PO_NUMBER:any;
    LINEITEMNUMBER:any;
    ORDERNUMBER:any;
    DISPATCHDATE:any;
    QUANTITY:any;
    AMOUNT:any = 0;
    DC:any;
    DcNo:any;
    DcDate:any;
}