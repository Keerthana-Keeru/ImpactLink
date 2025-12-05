import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOpportunity } from './create-opportunity';

describe('CreateOpportunity', () => {
  let component: CreateOpportunity;
  let fixture: ComponentFixture<CreateOpportunity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOpportunity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOpportunity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
