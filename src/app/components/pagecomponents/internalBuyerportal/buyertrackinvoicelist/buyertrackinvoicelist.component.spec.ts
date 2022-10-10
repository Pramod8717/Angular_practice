import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyertrackinvoicelistComponent } from './buyertrackinvoicelist.component';

describe('BuyertrackinvoicelistComponent', () => {
  let component: BuyertrackinvoicelistComponent;
  let fixture: ComponentFixture<BuyertrackinvoicelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyertrackinvoicelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyertrackinvoicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
