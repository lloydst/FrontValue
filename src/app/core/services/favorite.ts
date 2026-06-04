import { Injectable } from '@angular/core';
import { Joke } from '../models/joke';

@Injectable({
    providedIn: 'root',
})
export class Favorite {
    private dbPromise: Promise<IDBDatabase>;

    constructor() {
        this.dbPromise = this.openDB();
    }

    private openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('favorites', 1);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                if (!db.objectStoreNames.contains('jokes')) {
                    db.createObjectStore('jokes', { keyPath: 'id' });
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async add(joke: Joke) {
        const db = await this.dbPromise;

        const transaction = db.transaction('jokes', 'readwrite');
        const store = transaction.objectStore('jokes');

        store.put(joke);
    }

    async remove(id: string) {
        const db = await this.dbPromise;

        const transaction = db.transaction('jokes', 'readwrite');
        const store = transaction.objectStore('jokes');

        store.delete(id);
    }

    async getAll(): Promise<Joke[]> {
        const db = await this.dbPromise;

        return new Promise((resolve, reject) => {
            const transaction = db.transaction('jokes', 'readonly');
            const store = transaction.objectStore('jokes');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}
