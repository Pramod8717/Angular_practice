import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSubmissionComponent } from './invoice-submission.component';

describe('InvoiceSubmissionComponent', () => {
  let component: InvoiceSubmissionComponent;
  let fixture: ComponentFixture<InvoiceSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
