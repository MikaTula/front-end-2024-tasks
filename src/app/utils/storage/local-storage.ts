import {KeyValueStorage} from './key-value-storage';
import {signal, Signal} from '@angular/core';

export const LocalStorage = new KeyValueStorage(localStorage);

export function localStorageSignal<T extends string>(key: string): Signal<T | undefined> {
  const s = signal<T | undefined>(LocalStorage.getItem(key) as T | undefined);

  function handler(evt: StorageEvent) {
    if (evt.key === key) {
      if (evt.oldValue !== evt.newValue) {
        s.set(evt.newValue as T | undefined);
      }
    }
  }

  window.addEventListener('storage', handler);
  return s;
}
