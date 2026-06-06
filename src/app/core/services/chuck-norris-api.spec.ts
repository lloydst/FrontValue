import { ChuckNorrisApi } from './chuck-norris-api';

function mockFetch() {
    return vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({
            value: 'Chuck Norris can divide by zero',
            icon_url: 'https://example.com/icon.png',
            id: 'abc123',
        }),
    });
}

describe('ChuckNorrisApi', () => {
    function createService() {
        return new ChuckNorrisApi();
    }

    it('should call Chuck Norris API', async () => {
        globalThis.fetch = mockFetch();

        const service = createService();

        await service.fetchJoke();

        expect(globalThis.fetch).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/random');
    });
});
