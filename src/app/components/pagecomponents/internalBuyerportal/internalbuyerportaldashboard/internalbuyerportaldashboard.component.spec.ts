import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalbuyerportaldashboardComponent } from './internalbuyerportaldashboard.component';

describe('InternalbuyerportaldashboardComponent', () => {
  let component: InternalbuyerportaldashboardComponent;
  let fixture: ComponentFixture<InternalbuyerportaldashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalbuyerportaldashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalbuyerportaldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
