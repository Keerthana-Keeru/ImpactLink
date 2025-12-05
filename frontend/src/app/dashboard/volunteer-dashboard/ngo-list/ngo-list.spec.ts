import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoList } from './ngo-list';

describe('NgoList', () => {
  let component: NgoList;
  let fixture: ComponentFixture<NgoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
