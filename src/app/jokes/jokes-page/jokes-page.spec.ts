import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesPage } from './jokes-page';

describe('JokesPage', () => {
  let component: JokesPage;
  let fixture: ComponentFixture<JokesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(JokesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
