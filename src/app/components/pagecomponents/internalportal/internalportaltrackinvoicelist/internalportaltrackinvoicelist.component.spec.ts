import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalportaltrackinvoicelistComponent } from './internalportaltrackinvoicelist.component';

describe('InternalportaltrackinvoicelistComponent', () => {
  let component: InternalportaltrackinvoicelistComponent;
  let fixture: ComponentFixture<InternalportaltrackinvoicelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalportaltrackinvoicelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalportaltrackinvoicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
