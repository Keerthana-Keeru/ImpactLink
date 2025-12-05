import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoFeedback } from './ngo-feedback';

describe('NgoFeedback', () => {
  let component: NgoFeedback;
  let fixture: ComponentFixture<NgoFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoFeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgoFeedback);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
