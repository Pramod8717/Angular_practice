import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTrackInvoiceWithoutPOComponent } from './internal-track-invoice-without-po.component';

describe('InternalTrackInvoiceWithoutPOComponent', () => {
  let component: InternalTrackInvoiceWithoutPOComponent;
  let fixture: ComponentFixture<InternalTrackInvoiceWithoutPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalTrackInvoiceWithoutPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTrackInvoiceWithoutPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
