# HealthGuard Validation Matrix

## Purpose
This document explains what has been validated, what remains partially validated, and what is still out of scope.

## Validation Levels
- **Validated**: tested directly with real runtime behavior or repeatable scripts
- **Partially Validated**: documented and smoke-tested, but not fully proven under all real-world conditions
- **Planned**: defined in architecture / skill behavior, but not yet fully exercised

## Core Runtime
| Area | Status | Notes |
|------|--------|-------|
| CLI preflight starts with valid config | Validated | `node cli/healthguard.js` tested |
| Missing `TOOLS.md` fails closed | Validated | `tests/cli_smoke_test.js` |
| Withdrawal markers fail closed | Validated | `tests/cli_smoke_test.js` |
| Real Binance API key scope audit | Validated | live signed request to Binance |
| Observer-mode read-only flow | Validated | executed against real account |
| Core report generation | Validated | real report produced |

## Reporting Structure
| Area | Status | Notes |
|------|--------|-------|
| Risk enum + score | Partially Validated | present in live outputs, may still vary in wording |
| Major vs Minor holdings split | Validated | observed in real report output |
| Intelligence Coverage / Confidence | Validated | observed in real report output |
| Market Priority field | Validated | observed in real report output |
| Trading Signal field | Validated | observed in real report output |
| Fixed sub-structure wording consistency | Partially Validated | improving, but model phrasing may still vary |

## Optional Intelligence
| Area | Status | Notes |
|------|--------|-------|
| Core mode without OpenNews/OpenTwitter | Validated | degraded mode observed |
| OpenNews/OpenTwitter degraded handling | Validated | report continues with medium confidence |
| BWEnews / external feed integration | Planned | documented as optional event-stream enrichment |
| Formula News / third-party event streams | Planned | documented as optional event-stream enrichment |

## Installation / Safety
| Area | Status | Notes |
|------|--------|-------|
| Layered installer (`--core-only`) | Validated | installer supports core-only mode by installing 5 official skills from `binance-skills-hub` and verifying 2 bundled core skills shipped in this repository |
| Layered installer (`--with-optional-intel`) | Validated | installer supports optional intelligence mode |
| Dry-run installer plan | Validated | installer supports `--dry-run` |
| Dedicated workspace guidance | Validated | documented in README / SECURITY / RUNBOOK |
| Read-only rollout path | Validated | documented and tested |

## Not Yet Fully Proven
- Full guardian-mode trade execution flow with safe test harness
- Multi-session concurrency stability for local test agent runs
- Production-grade external event-stream ingestion pipeline
- Long-term scheduled monitoring under mixed optional intelligence availability

## Recommended Auditor Conclusion
HealthGuard is suitable for **isolated, read-only, observer-mode deployment** with the layered installer and CLI preflight. Optional intelligence sources improve coverage but are not required for core portfolio diagnostics.
