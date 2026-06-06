import { Component, OnDestroy, output } from '@angular/core';
import { Subject, switchMap, timer, NEVER } from 'rxjs';

@Component({
    selector: 'cn-timer-toggle',
    imports: [],
    templateUrl: './timer-toggle.html',
    styleUrl: './timer-toggle.scss',
})
export class TimerToggle implements OnDestroy {
    private interval = 5000;
    tick = output<void>();

    isRunning = false;
    private toggle$ = new Subject<boolean>();

    private sub = this.toggle$
        .pipe(switchMap((running) => (running ? timer(0, this.interval) : NEVER)))
        .subscribe(() => this.tick.emit());

    toggleTimer() {
        this.isRunning = !this.isRunning;
        this.toggle$.next(this.isRunning);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
