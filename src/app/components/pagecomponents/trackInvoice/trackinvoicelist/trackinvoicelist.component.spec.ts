import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackInvoiceListComponent } from './trackinvoicelist.component';

describe('TrackInvoiceListComponent', () => {
  let component: TrackInvoiceListComponent;
  let fixture: ComponentFixture<TrackInvoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackInvoiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
