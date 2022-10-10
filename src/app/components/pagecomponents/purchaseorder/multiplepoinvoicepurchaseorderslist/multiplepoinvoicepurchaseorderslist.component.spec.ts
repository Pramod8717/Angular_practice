import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplepoinvoicepurchaseorderslistComponent } from './multiplepoinvoicepurchaseorderslist.component';

describe('MultiplepoinvoicepurchaseorderslistComponent', () => {
  let component: MultiplepoinvoicepurchaseorderslistComponent;
  let fixture: ComponentFixture<MultiplepoinvoicepurchaseorderslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplepoinvoicepurchaseorderslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplepoinvoicepurchaseorderslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
