import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoProfile } from './ngo-profile';

describe('NgoProfile', () => {
  let component: NgoProfile;
  let fixture: ComponentFixture<NgoProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgoProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
