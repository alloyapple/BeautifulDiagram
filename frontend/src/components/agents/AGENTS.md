# Frontend Agent Renderers

## OVERVIEW

React components that render diagram output from backend agents. One renderer per agent type.

## STRUCTURE

```
agents/
├── types.ts           # Shared type definitions
├── MindmapAgent.tsx   # Mind-elixir renderer
├── FlowAgent.tsx      # React Flow renderer
├── MermaidAgent.tsx   # Mermaid.js renderer
├── ChartsAgent.tsx    # ECharts renderer
├── DrawioAgent.tsx    # Draw.io iframe renderer
└── InfographicAgent.tsx # AntV Infographic renderer
```

## RENDERER PROTOCOL

Each agent component receives:
```typescript
interface AgentProps {
  code: string;           // Diagram content from backend
  messageId: string;      // For export naming
  onExport?: (format: 'png' | 'svg') => void;
}
```

## CANVAS INTEGRATION

`CanvasPanel.tsx` dynamically selects renderer based on `activeAgent`:
```typescript
const AGENT_COMPONENTS = {
  mindmap: MindmapAgent,
  flow: FlowAgent,
  mermaid: MermaidAgent,
  charts: ChartsAgent,
  drawio: DrawioAgent,
  infographic: InfographicAgent,
};
```

## EXPORT FUNCTIONALITY

Most agents support PNG/SVG export:
- **Mindmap**: `html-to-image` on rendered DOM
- **Flow**: React Flow's `toImage()` API
- **Mermaid**: `mermaid.render()` + canvas export
- **Charts**: ECharts' `getDataURL()` method
- **Drawio**: PostMessage API to iframe
- **Infographic**: AntV's built-in export

## STATE MANAGEMENT

Agent selection synced with `chatStore`:
```typescript
setAgent: (agent) => {
  set({ activeAgent: agent });
  setCanvasState({ activeAgent: agent });
}
```

## ADDING NEW RENDERER

1. Create `NewAgent.tsx`:
   ```typescript
   export function NewAgent({ code, messageId }: AgentProps) {
     // Render diagram
   }
   ```
2. Add to `types.ts` if new types needed
3. Register in `CanvasPanel.tsx` `AGENT_COMPONENTS` map
4. Handle in `chatStore.ts` `setAgent()` if special logic needed

## CONVENTIONS

- Use `react-zoom-pan-pinch` for zoomable canvases
- Export naming: `${messageId}-${agentType}-{timestamp}`
- Handle rendering errors gracefully (show fallback UI)
- Support dark mode via Tailwind classes

## ANTI-PATTERNS

- **NEVER** parse code outside render phase — causes flicker
- **NEVER** mutate code prop — treat as immutable
- **AVOID** direct DOM manipulation — use refs only for export
