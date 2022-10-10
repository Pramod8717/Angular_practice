import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoOrderDispachedComponent } from './purchaseorderdispached.component';

describe('PoOrderDispachedComponent', () => {
  let component: PoOrderDispachedComponent;
  let fixture: ComponentFixture<PoOrderDispachedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoOrderDispachedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoOrderDispachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
