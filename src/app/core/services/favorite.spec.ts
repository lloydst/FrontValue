/* eslint-disable @typescript-eslint/no-explicit-any */
import { Favorite } from './favorite';
import { Joke } from '../models/joke';

class FakeIDBRequest {
    onsuccess: any;
    onerror: any;
    result: any;

    constructor(result?: any) {
        this.result = result;
        setTimeout(() => this.onsuccess?.(), 0);
    }
}

class FakeObjectStore {
    private data = new Map<string, any>();

    put(value: any) {
        this.data.set(value.id, value);
        return new FakeIDBRequest();
    }

    delete(id: string) {
        this.data.delete(id);
        return new FakeIDBRequest();
    }

    getAll() {
        return new FakeIDBRequest(Array.from(this.data.values()));
    }

    count() {
        return new FakeIDBRequest(this.data.size);
    }

    index() {
        return {
            openCursor: () => new FakeIDBRequest(null),
        };
    }
}

class FakeTransaction {
    objectStore() {
        return new FakeObjectStore();
    }
}

class FakeDB {
    transaction() {
        return new FakeTransaction();
    }
}

class FakeIDBOpenRequest {
    
    onsuccess: any;
    
    onerror: any;
    result = new FakeDB();

    constructor() {
        setTimeout(() => this.onsuccess?.(), 0);
    }
}


(globalThis as any).indexedDB = {
    open: () => new FakeIDBOpenRequest(),
};

describe('Favorite', () => {
    function createService() {
        return new Favorite();
    }
    it('should add joke and update timestamp', async () => {
        const service = createService();

        const joke: Joke = {
            id: '1',
            joke: 'Chuck Norris joke',
            icon_url: 'img.png',
        };

        await service.add(joke);

        expect(joke.timestamp).toBeDefined();
        expect(typeof joke.timestamp).toBe('number');
    });
});
