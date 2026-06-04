import { Component } from '@angular/core';
import { TimerToggle } from '../components/timer-toggle/timer-toggle';
import { JokeList } from '../components/joke-list/joke-list';

@Component({
    selector: 'cn-jokes-page',
    imports: [JokeList, TimerToggle],
    templateUrl: './jokes-page.html',
    styleUrl: './jokes-page.scss',
})
export class JokesPage {}
