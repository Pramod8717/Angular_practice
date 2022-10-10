import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplepoinvoicesubmissionComponent } from './multiplepoinvoicesubmission.component';

describe('MultiplepoinvoicesubmissionComponent', () => {
  let component: MultiplepoinvoicesubmissionComponent;
  let fixture: ComponentFixture<MultiplepoinvoicesubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplepoinvoicesubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplepoinvoicesubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
