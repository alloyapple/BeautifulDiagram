# Frontend State Management (Zustand)

## Stores

- `chatStore.ts` — Messages, sessions, version branching
- `settingsStore.ts` — Model configs, API keys
- `canvasState.ts` — UI layout state

## Gotchas

- **crypto.randomUUID**: Check `typeof crypto.randomUUID === 'function'` not just truthiness — property may exist but not be callable in non-HTTPS contexts, older browsers, or certain iframes. `settingsStore.ts` has fallback UUID generator.
