import { TestBed } from '@angular/core/testing';

import { ChuckNorrisApi } from './chuck-norris-api';

describe('ChuckNorrisApi', () => {
    let service: ChuckNorrisApi;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ChuckNorrisApi);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
