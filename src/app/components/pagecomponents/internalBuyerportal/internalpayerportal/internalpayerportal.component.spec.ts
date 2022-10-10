import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalpayerportalComponent } from './internalpayerportal.component';

describe('InternalpayerportalComponent', () => {
  let component: InternalpayerportalComponent;
  let fixture: ComponentFixture<InternalpayerportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalpayerportalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalpayerportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
