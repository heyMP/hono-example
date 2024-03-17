import { counter } from './counter.js';

export function setupCounter(element: HTMLSpanElement) {
  counter.addEventListener('update', () => update());

  function update() {
    element.innerHTML = `Count ${counter.count}`;
    if (counter.state !== 'idle') {
      element.setAttribute('disabled', '');
    }
    else {
      element.removeAttribute('disabled');
    }
  }

  element.addEventListener('click', () => {
    if (counter.state === 'syncing') return;
    counter.count++;
  })
}
