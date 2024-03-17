import { client } from './client.ts';

const $count = client.count.$get;
const $countUpdate = client.count.$post;

export class CounterUpdateEvent extends Event {
  constructor(public prop: number | State) {
    super('update')
  }
}

export type State = 'idle' | 'syncing' | 'updating';

export class Counter extends EventTarget {
  private _count = 0;
  private _state: State = 'syncing';

  constructor() {
    super();
    this.init();
  }

  get state() {
    return this._state;
  }

  set state(value: State) {
    this._state = value;
    this.dispatchEvent(new CounterUpdateEvent(value));
  }

  async init() {
    try {
      const res = await $count();
      if (res.ok) {
        const { count } = await res.json();
        this.state = 'idle';
        this.count = count;
      }
    } catch (error) {
      console.error(error);
    }
  }

  get count() {
    return this._count;
  }

  set count(value: number) {
    this._updateCount(value);
  }

  private async _updateCount(value: number) {
    this.state = 'updating';
    try {
      const res = await $countUpdate({ json: { count: value } });
      if (res.ok) {
        const { count } = await res.json();
        this._state = 'idle';
        this._count = count;
        this.dispatchEvent(new CounterUpdateEvent(value));
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export const counter = new Counter();
