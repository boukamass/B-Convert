import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PowerProvider from './lib/PowerProvider.tsx'

console.log('[main.tsx] Starting B-Convert application...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure index.html has a div with id="root"');
}

console.log('[main.tsx] Root element found, rendering app...');

createRoot(rootElement).render(
  <StrictMode>
    <PowerProvider>
      <App />
    </PowerProvider>
  </StrictMode>,
)
