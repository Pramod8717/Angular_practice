import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoOrderViewComponent } from './purchaseorderview.component';

describe('PoOrderViewComponent', () => {
  let component: PoOrderViewComponent;
  let fixture: ComponentFixture<PoOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoOrderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
