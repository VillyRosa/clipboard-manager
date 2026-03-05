import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiedCard } from './copied-card';

describe('CopiedCard', () => {
  let component: CopiedCard;
  let fixture: ComponentFixture<CopiedCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopiedCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopiedCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
