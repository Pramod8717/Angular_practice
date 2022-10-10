import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerpurchaseorderlistComponent } from './buyerpurchaseorderlist.component';

describe('BuyerpurchaseorderlistComponent', () => {
  let component: BuyerpurchaseorderlistComponent;
  let fixture: ComponentFixture<BuyerpurchaseorderlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerpurchaseorderlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerpurchaseorderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
