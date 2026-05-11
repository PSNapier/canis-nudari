---
description: Stress-tests plans, specs, and implementation ideas through structured interrogation. Expose unknowns before build.
---

# Grill Plan

Relentlessly test plan quality. Expose unknowns before build.

## Input
User passes one of:
- Plain-text plan in chat
- Path to a markdown file
- Pasted plan text

If missing, ask for it first before proceeding.

## Operating Mode
- Ask ONE focused question at a time using the `AskUserQuestion` tool
- Prefer multiple-choice options (2–4 realistic choices)
- No generic yes/no unless decision is truly binary
- After each answer: brief acknowledgement, then next highest-risk question
- If answer can be learned from repo/files, inspect directly instead of asking
- Stop only when all critical branches resolved

## Investigation Order
Follow this order unless context demands otherwise:

1. Objective + constraints
2. Scope boundaries (in/out)
3. Data model + state transitions
4. Failure modes + rollback
5. Security + abuse paths
6. Performance + scaling limits
7. Edge cases + weird inputs
8. Operational concerns (observability, deploy, migration)
9. Test strategy + acceptance criteria

## Question Quality Rules
Each question must:
- Target one decision
- Include 2–4 realistic options with trade-off context
- Avoid asking what can be learned from code/docs

## Drill-Down Framework
For each major decision, walk this tree:
1. Assumption
2. Evidence
3. Risk if assumption wrong
4. Mitigation
5. Owner + trigger to revisit

Do not move on until branch is concrete enough to implement.

## Stop Conditions
Stop grilling when ALL are true:
- Core decisions made
- Biggest risks have mitigations
- Open questions are non-blocking and explicitly tracked
- MVP slice clearly defined

## Output Format
When complete, return:

### Decisions Locked
- Bullet list of finalized choices

### Risks Remaining
- Risk | Impact | Mitigation | Owner

### Open Questions
- Only unresolved, non-blocking items

### Build-Ready Checklist
- [ ] Scope frozen for first iteration
- [ ] Security model reviewed
- [ ] Performance budget defined
- [ ] Rollback path defined
- [ ] Test plan covers happy path + edge cases

## Defaults
- Bias toward simpler architecture first
- Reject premature abstraction unless clear near-term need
- Prefer explicit constraints over optimistic assumptions

---

Begin by asking the user for their plan if not already provided. Then start the interrogation from step 1.
