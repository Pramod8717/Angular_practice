import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGeneralDataComponent } from './profiledata.component';

describe('ProfileGeneralDataComponent', () => {
  let component: ProfileGeneralDataComponent;
  let fixture: ComponentFixture<ProfileGeneralDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileGeneralDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileGeneralDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
