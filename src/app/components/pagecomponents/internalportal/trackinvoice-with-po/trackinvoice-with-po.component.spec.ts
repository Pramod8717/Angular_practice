import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackinvoiceWithPOComponent } from './trackinvoice-with-po.component';

describe('TrackinvoiceWithPOComponent', () => {
  let component: TrackinvoiceWithPOComponent;
  let fixture: ComponentFixture<TrackinvoiceWithPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackinvoiceWithPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackinvoiceWithPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
