import { client } from './client.ts';

const $count = client.count.$get;
const $countUpdate = client.count.$post;

export class CounterUpdateEvent extends Event {
  constructor(public props: 'state' | 'count') {
    super('update')
  }
}

export type State = 'idle' | 'initializing' | 'updating';

export class Counter extends EventTarget {
  private _count = 0;
  private _state: State = 'initializing';

  constructor() {
    super();
    this.init();
  }

  get state() {
    return this._state;
  }

  set state(value: State) {
    this._state = value;
  }

  get count() {
    return this._count;
  }

  set count(value: number) {
    if (this.state === 'updating' || this.state === 'initializing') {
      this._count = value;
      this.state = 'idle';
      this.dispatchEvent(new CounterUpdateEvent('count'));
    }
    else {
      this.state = 'updating';
      this._updateCount(value);
    }
  }

  async init() {
    try {
      const res = await $count();
      if (res.ok) {
        const { count } = await res.json();
        this.count = count;
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async _updateCount(value: number) {
    try {
      const res = await $countUpdate({ json: { count: value } });
      if (res.ok) {
        const { count } = await res.json();
        this.count = count;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export const counter = new Counter();
