# BeautifulDiagram AI - Project Knowledge Base

**Generated:** 2026-03-12
**Commit:** 83cd1a8
**Branch:** main

## OVERVIEW

Agentic AI visualization platform. Multi-agent orchestration via LangGraph transforms NLP + multimodal inputs into professional diagrams. 6 specialized agents (MindMap, Flow, Charts, Draw.io, Mermaid, Infographic).

## STRUCTURE

```
.
├── backend/           # FastAPI + LangGraph AI orchestration
├── frontend/          # React 19 SPA (visualization canvas + chat)
├── website/           # Next.js marketing site (i18n, MDX)
├── nginx/             # Reverse proxy config
└── docker-compose.yml # Multi-service orchestration
```

## WHERE TO LOOK

| Task                         | Location                              | Notes                         |
| ---------------------------- | ------------------------------------- | ----------------------------- |
| Add new agent                | `backend/app/agents/` + `graph.py`    | Register in graph, add router |
| Modify routing logic         | `backend/app/agents/dispatcher.py`    | @agent tags + LLM fallback    |
| SSE streaming endpoint       | `backend/app/api/routes.py`           | StreamingTagParser            |
| Frontend agent renderers     | `frontend/src/components/agents/`     | One per agent type            |
| State management             | `frontend/src/store/chatStore.ts`     | Zustand, message branching    |
| Document parsing             | `backend/app/services/file_service.py`| PDF/DOCX/XLSX/PPTX            |
| Session persistence          | `backend/app/services/chat.py`        | PostgreSQL, branching         |

## KEY ARCHITECTURE

### XML Tag Output (No Tool Calls)
Agents output directly:
```xml
<design_concept>AI reasoning...</design_concept>
<code>diagram content...</code>
```
Parsed by `StreamingTagParser` in real-time.

### Dual-Stream SSE
- `design_concept` stream → AI reasoning (yellow panel)
- `code` stream → Diagram rendering

### Message Branching
- `turn_index` + `parent_id` for version tracking
- Git-like branching for retry alternatives

## CONVENTIONS

### Python (Backend)
- **Python 3.13+** required
- **uv** for dependencies (`uv sync`)
- **asyncpg** for PostgreSQL (no sync drivers)
- **SQLModel** for ORM (not raw SQLAlchemy)

### TypeScript (Frontend)
- **React 19** concurrent rendering
- **Zustand** for state (no Redux/Context)
- **TailwindCSS 4.1** (new config format)
- Strict mode enabled

### Routing
- Explicit: `@mindmap`, `@flow`, `@mermaid`, `@charts`, `@drawio`, `@infographic`
- Fallback: LLM intent classification via `dispatcher.py`

## ANTI-PATTERNS (THIS PROJECT)

- **NEVER** use tool calls in agents — output XML tags directly
- **NEVER** hardcode database passwords (see docker-compose.yml FIXME)
- **AVOID** sync database operations — always use asyncpg
- **GUARD**: `chatStore.ts` has type guards — don't bypass them

## COMMANDS

```bash
# Development
cd backend && uv sync && bash start_backend.sh  # Port 8000
cd frontend && npm install && npm run dev        # Port 5173

# Production
docker-compose up -d

# Database migrations
cd backend && alembic upgrade head
```

## KNOWN ISSUES

1. **docker-compose.yml:10** — Hardcoded `POSTGRES_PASSWORD`
2. **file_service.py** — Async coordination needs refactor
3. **No automated tests** — Manual test scripts only
4. **No CI linting** — Only Docker builds in GitHub Actions

## NOTES

- License: AGPL-3.0 (network use = distribution)
- Demo: https://20190601.xyz/
- Uses OpenAI-compatible APIs (OpenAI, DeepSeek, custom)
