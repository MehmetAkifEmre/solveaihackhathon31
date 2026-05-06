# AI Traceability

## AI-Augmented Modules

| Module | AI Contribution | Human Verification |
| --- | --- | --- |
| `backend/app/services/ai_classifier.py` | Skills Agent assisted fallback classification rules and provider boundary. | Feature Developer checks category, priority, and department mapping with demo examples. |
| `backend/app/services/data_extractor.py` | Skills Agent assisted deterministic extraction heuristics for request metadata. | Feature Developer verifies JSON fields remain understandable and safe for display. |
| `backend/app/services/draft_generator.py` | Skills Agent assisted professional Turkish draft templates. | Human reviewer checks tone, correctness, and non-commitment language. |
| `backend/app/services/workflow_engine.py` | Skills Agent assisted state transition sequence and failure handling. | Maintainer validates workflow statuses and API outputs. |
| `docs/ROADMAP.md` | Plan Agent generated milestone and issue structure. | Team reviews branch names, ownership, and demo scope before implementation. |

## Plan Agent Output

The Plan Agent produced:

- MVP architecture.
- GitHub issue list.
- Branch strategy.
- Team responsibility split.
- Demo-first milestone order.

## Skills Agent Output

The Skills Agent focused on:

- AI provider abstraction.
- Mock provider behavior when no API key exists.
- Workflow orchestration and metrics logic.
- Demo-safe error handling.

## Human Verification Method

1. Run backend and frontend locally.
2. Create a new request from the UI.
3. Confirm request reaches `waiting_approval`.
4. Confirm approve/reject actions update status.
5. Confirm metrics show at least 50% reduction.
6. Review AI-generated text before approval.

## Traceability Comment Standard

AI-assisted backend modules include a short header comment:

```python
# AI Traceability:
# Skills Agent assisted in designing this module.
# Human review completed by Feature Developer.
```
