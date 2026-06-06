import { BehaviorSubject } from 'rxjs';
import { vi } from 'vitest';
import { Joke } from '../../core/models/joke';

export function createFavoriteMock() {
    const subject = new BehaviorSubject<Joke[]>([]);

    return {
        favorites$: subject.asObservable(),

        getAll: vi.fn().mockResolvedValue([]),

        add: vi.fn().mockResolvedValue(undefined),
        remove: vi.fn().mockResolvedValue(undefined),

        emitFavorites: (favorites: Joke[]) => subject.next(favorites),
    };
}
