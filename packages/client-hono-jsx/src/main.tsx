import '@rhds/elements/rh-button/rh-button.js';
import { useState, useEffect } from 'hono/jsx';
import { render } from 'hono/jsx/dom';
import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { client } from './client';

function Counter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const res = await client.count.$get();
        if (res.ok) {
          const { count } = await res.json();
          setCount(count);
        }
      } catch (error) {
      }
    }
    init();
  }, []);

  async function updateCount() {
    if (count === null) return;
    try {
      const res = await client.count.$post({ json: { count: count + 1 } });
      if (res.ok) {
        const { count } = await res.json();
        setCount(count);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <rh-button id="counter" onClick={updateCount}>
      {count === null ? 'Loading...' : `Count ${count}`}
    </rh-button>
  );
}

function App() {
  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src={typescriptLogo} class="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript + Hono + Hono JSX</h1>
      <div class="card">
        <Counter />
      </div>
      <p class="read-the-docs">
        Click on the Vite and TypeScript logos to learn more
      </p>
    </div>
  )
}

render(<App />, document.querySelector<HTMLDivElement>('#app')!);
