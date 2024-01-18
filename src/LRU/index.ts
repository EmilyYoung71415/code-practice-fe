export class LRUCache<T> {
  private _size: number;
  private _cache: Map<string, T> = new Map();

  constructor(size: number) {
    this._size = size;
  }

  get(key: string) {
    if (!this._cache.has(key)) return -1;
    const value = this._cache.get(key);
    // 每次获取都重新set，以刷新key的访问新旧顺序
    this._cache.delete(key);
    this._cache.set(key, value);
    return value;
  }

  put(key: string, value: T) {
    if (this._cache.has(key)) {
      this._cache.delete(key);
    }
    this._cache.set(key, value);
    if (this._cache.size > this._size) {
      const oldestKey = this._cache.keys().next().value;
      this._cache.delete(oldestKey);
    }
  }
}
