# Backend Agents

## OVERVIEW

6 specialized agents + general fallback. LangGraph orchestration. Direct XML output (no tool calls).

## STRUCTURE

```
agents/
├── dispatcher.py   # Router: @agent tags + LLM intent classification
├── graph.py        # LangGraph state machine definition
├── mindmap.py      # Mind-elixir Markdown output
├── flow.py         # React Flow JSON output
├── mermaid.py      # Mermaid syntax output
├── charts.py       # ECharts config output
├── drawio.py       # mxGraph XML output
├── infographic.py  # AntV DSL output
└── general.py      # Plain text fallback
```

## AGENT ROUTING

### Explicit Tags
```
@mindmap @flow @flowchart @mermaid @chart @charts @drawio @infographic
```

### LLM Fallback
If no explicit tag, `dispatcher.py` uses LLM to classify intent based on:
- Agent capability descriptions
- Conversation history
- Last active agent (continuity preference)
- Current visual context

### Agent Capabilities
| Agent       | Best For                                    | Output Format     |
| ----------- | ------------------------------------------- | ----------------- |
| mindmap     | Hierarchies, brainstorming, outlining       | Markdown/Markmap  |
| flow        | Standard flowcharts                         | React Flow JSON   |
| mermaid     | Sequence, Class, State, Gantt, ERD          | Mermaid syntax    |
| charts      | Quantitative data (sales, stats, trends)    | ECharts config    |
| drawio      | Architecture, cloud infra, detailed UML     | mxGraph XML       |
| infographic | Data posters, visual storytelling, timelines| AntV DSL          |
| general     | Greetings, non-diagram questions            | Plain text        |

## OUTPUT FORMAT

All agents must output:
```xml
<design_concept>
AI's reasoning about structure, layout, design decisions...
</design_concept>
<code>
Actual diagram content (JSON/XML/Markdown depending on agent)...
</code>
```

## GRAPH FLOW

```
router → route_decision → [agent] → END
```

See `graph.py` for state machine definition.

## ADDING NEW AGENT

1. Create `new_agent.py` with `new_agent_node(state)` function
2. Register in `graph.py`:
   - `workflow.add_node("new_agent", new_agent)`
   - Add to `route_decision()` return types
   - Add edge: `workflow.add_edge("new_agent", END)`
3. Add to `dispatcher.py`:
   - Add `@newagent` to mappings
   - Add to `agent_descriptions`
   - Add intent detection in `route_decision()`

## CONVENTIONS

- Use `get_configured_llm(state)` for LLM (respects user model selection)
- Include time context via `get_time_instructions()`
- Handle multimodal input (images, documents) in agent prompts
- Always output XML tags, never use tool calls

## ANTI-PATTERNS

- **NEVER** use LangChain tool calls — output XML directly
- **NEVER** bypass the router — all requests go through `dispatcher.py`
- **AVOID** modifying `AgentState` without updating `state/state.py`
