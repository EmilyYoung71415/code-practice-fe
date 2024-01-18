import { LRUCache } from './index';

describe('LRU', () => {
  test('LRU get should work', () => {
    const size = 3;
    const cache = new LRUCache(size);
    cache.put('a', 1);
    cache.put('b', 2);
    const res1 = cache.get('a');
    expect(res1).toBe(1);
    const res2 = cache.get('b');
    expect(res2).toBe(2);
  });

  test('LRU put should work when size is over', () => {
    const size = 2;
    const cache = new LRUCache(size);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.put('c', 3);
    const res1 = cache.get('a');
    expect(res1).toBe(-1);
    const res2 = cache.get('c');
    expect(res2).toBe(3);
  });
});
