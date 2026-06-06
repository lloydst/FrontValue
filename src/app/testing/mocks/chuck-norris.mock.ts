import { vi } from 'vitest';

export function createChuckNorrisApiMock() {
    let idCounter = 1;

    return {
        fetchJoke: vi.fn().mockImplementation(async () => {
            const id = idCounter++;
            return {
                icon_url: `icon-${id}.png`,
                joke: `Joke ${id}`,
                id: String(id),
            };
        }),
    };
}
