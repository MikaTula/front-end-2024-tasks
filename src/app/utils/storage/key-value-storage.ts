export class KeyValueStorage {
  private readonly storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  public getItem(key: string): string | undefined {
    return this.storage.getItem(key) || undefined;
  }

  public setItem(key: string, value: string | undefined): void {
    const oldValue = this.getItem(key);

    if (oldValue !== value) {
      if (value !== undefined) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }

      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: value,
          oldValue: oldValue
        })
      );
    }
  }
}
