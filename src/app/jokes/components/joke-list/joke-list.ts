import { Component, inject } from '@angular/core';
import { JokeItem } from '../joke-item/joke-item';
import { ChuckNorrisApi } from '../../../core/services/chuck-norris-api';
import { AsyncPipe } from '@angular/common';
import { Joke } from '../../../core/models/joke';
import { ReplaySubject, from } from 'rxjs';
import { withLatestFrom, map, tap, take } from 'rxjs/operators';
import { TimerToggle } from '../timer-toggle/timer-toggle';

@Component({
    selector: 'cn-joke-list',
    imports: [JokeItem, AsyncPipe, TimerToggle],
    templateUrl: './joke-list.html',
    styleUrl: './joke-list.scss',
})
export class JokeList {
    private api = inject(ChuckNorrisApi);
    private _jokes$ = new ReplaySubject<Joke[]>(1);
    jokes$ = this._jokes$.asObservable();

    constructor() {
        this.loadJokes();
    }

    private async loadJokes() {
        const jokes = await Promise.all(Array.from({ length: 10 }, () => this.api.fetchJoke()));
        this._jokes$.next(jokes);
    }

    handleJokeDeleted(jokeId: string) {
        from(this.api.fetchJoke())
            .pipe(
                withLatestFrom(this._jokes$),
                map(([newJoke, jokes]) => [...jokes.filter((joke) => joke.id !== jokeId), newJoke]),
                tap((updatedJokes) => this._jokes$.next(updatedJokes)),
            )
            .subscribe();
    }

    handleTimerTick() {
        from(this.api.fetchJoke())
            .pipe(
                withLatestFrom(this._jokes$),

                map(([newJoke, currentJokes]) => {
                    const [_, ...remainingJokes] = currentJokes;
                    return [...remainingJokes, newJoke];
                }),

                tap((updatedJokes) => this._jokes$.next(updatedJokes)),
                take(1),
            )
            .subscribe();
    }
}
