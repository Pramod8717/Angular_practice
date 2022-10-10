import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaltrackinvoicedetailsComponent } from './internaltrackinvoicedetails.component';

describe('InternaltrackinvoicedetailsComponent', () => {
  let component: InternaltrackinvoicedetailsComponent;
  let fixture: ComponentFixture<InternaltrackinvoicedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternaltrackinvoicedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternaltrackinvoicedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
