import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerToggle } from './timer-toggle';

describe('TimerToggle', () => {
    let component: TimerToggle;
    let fixture: ComponentFixture<TimerToggle>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TimerToggle],
        }).compileComponents();

        fixture = TestBed.createComponent(TimerToggle);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
