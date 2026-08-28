# ORB8 Backend Bootstrap

FastAPI bootstrap for ORB8's Market Evidence workflow.

## Included

- Venture creation
- Market hypothesis generation
- Market evidence collection
- Deterministic market scoring
- Evidence boundary: known vs unknown
- Dashboard aggregation endpoint
- Raw evidence drill-down
- Stub clients for Google Trends, Data Commons, and World Bank
- SQLite async persistence
- Basic tests

## Quick start

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'
uvicorn app.main:app --reload
```

Open:

- API docs: http://127.0.0.1:8000/docs
- Health: http://127.0.0.1:8000/api/v1/health

## Primary flow

```text
POST /api/v1/ventures
POST /api/v1/ventures/{venture_id}/market/hypothesis
POST /api/v1/ventures/{venture_id}/market/collect
POST /api/v1/ventures/{venture_id}/market/diagnose
GET  /api/v1/ventures/{venture_id}/market/dashboard
GET  /api/v1/ventures/{venture_id}/evidence
```

## Important

The integration clients intentionally return deterministic sample data so the backend runs immediately without credentials. Replace each client's `fetch` implementation with the real provider API when ready.

The market score is rule-based. The LLM should interpret the evidence, not invent the score.
