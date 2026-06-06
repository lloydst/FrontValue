import { Injectable } from '@angular/core';
import { Joke } from '../models/joke';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Favorite {
    private dbPromise: Promise<IDBDatabase>;
    private _favorites$ = new ReplaySubject<Joke[]>();
    favorites$ = this._favorites$.asObservable();

    private openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('favorites', 2);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                if (!db.objectStoreNames.contains('jokes')) {
                    const store = db.createObjectStore('jokes', { keyPath: 'id' });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                } else if (event.oldVersion < 2) {
                    const store = (event.target as IDBOpenDBRequest).transaction?.objectStore(
                        'jokes',
                    );
                    if (store && !store.indexNames.contains('timestamp')) {
                        store.createIndex('timestamp', 'timestamp', { unique: false });
                    }
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    private async getStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
        const db = await this.dbPromise;
        const transaction = db.transaction('jokes', mode);
        return transaction.objectStore('jokes');
    }

    constructor() {
        this.dbPromise = this.openDB();
    }

    async add(joke: Joke) {
        const store = await this.getStore('readwrite');
        joke.timestamp = Date.now();
        const count = store.count();
        count.onsuccess = () => {
            if (count.result >= 10) {
                const cursor = store.indexNames.contains('timestamp')
                    ? store.index('timestamp').openCursor()
                    : store.openCursor();
                cursor.onsuccess = (event) => {
                    const result = (event.target as IDBRequest).result;

                    if (result) {
                        store.delete(result.primaryKey);
                    }
                };
            }
        };
        store.put(joke);
    }

    async remove(id: string) {
        const store = await this.getStore('readwrite');
        store.delete(id);
        this._favorites$.next((await this.getAll()).filter((joke) => joke.id !== id));
    }

    async getAll(): Promise<Joke[]> {
        const store = await this.getStore('readonly');

        return new Promise((resolve, reject) => {
            const request = store.getAll();

            request.onsuccess = () => {
                this._favorites$.next(request.result);
                resolve(request.result);
            };
            request.onerror = () => reject(request.error);
        });
    }
}
