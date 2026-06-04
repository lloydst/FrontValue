import { Injectable } from '@angular/core';
import { Joke } from '../models/joke';

@Injectable({
    providedIn: 'root',
})
export class ChuckNorrisApi {
    async fetchJoke(): Promise<Joke> {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        return { joke: data.value, icon_url: data.icon_url, id: data.id };
    }
}
