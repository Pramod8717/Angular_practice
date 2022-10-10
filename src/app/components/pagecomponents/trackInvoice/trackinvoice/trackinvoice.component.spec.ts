import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackInvoiceComponent } from './trackinvoice.component';

describe('TrackInvoiceComponent', () => {
  let component: TrackInvoiceComponent;
  let fixture: ComponentFixture<TrackInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
