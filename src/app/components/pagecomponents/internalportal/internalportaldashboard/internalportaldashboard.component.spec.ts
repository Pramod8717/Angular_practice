import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalportaldashboardComponent } from './internalportaldashboard.component';

describe('InternalportaldashboardComponent', () => {
  let component: InternalportaldashboardComponent;
  let fixture: ComponentFixture<InternalportaldashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalportaldashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalportaldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
