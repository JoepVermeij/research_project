# Research Project: QR Code-Based Attendance Registration

**Course:** 42TIW1140 Research Project (2025-26-PWTIW)  
**Supervisor:** Kris Hermans — Kris.Hermans@pxl.be

## Project Overview

This research project investigates **attendance registration via QR codes** for events such as job fairs and expos. The goal is to conduct a practice-oriented study that is both theoretically grounded (literature review) and practically validated (proof of concept).

An existing student project is already building a functional system with a **.NET backend** and **Vue.js frontend**, covering the core functional requirements. Our research focuses on the **non-functional requirements** that a follow-up project should address, specifically:

| Requirement | Description |
|---|---|
| **Fraud Resistance** | QR codes must not be copyable or shareable — ensuring integrity and reliability of attendance data. |
| **Robustness** | The system must remain operational during WiFi dropouts (several minutes) — covering reliability, availability, and performance. |
| **Security** | The system must be resistant to hacking and protect personal data appropriately. |

### System Context

- Companies register for an event
- Each student receives a unique QR code
- Matchmaking: a company scans a student's QR code
- Companies can download a student's CV after scanning
- Statistics are generated (popular companies, student engagement, etc.)

## Research Approach

The project follows a structured research process:

1. **Context & Motivation** — Describe the problem context using the 6W method (What, Who, When, Why, Where, How)
2. **Problem Definition** — Formulate a clear central research question and sub-questions (must be specific, scoped, unambiguous, and non-Googleable)
3. **Research Methodology** — Define a concrete, pragmatic step-by-step plan
4. **Literature Study** — Collect, evaluate (CRAAP test), and synthesize relevant sources
5. **Execution Phase** — Build a self-designed proof of concept (not a tutorial reproduction), document experiments and collect artifacts
6. **Conclusion & Recommendations** — Provide a well-founded advisory based on findings

## Deliverables

### Paper Structure

| Section | Length |
|---|---|
| Title page | — |
| Project description | 1 page |
| Table of contents | 1 page |
| List of abbreviations and terms | 1 page (if applicable) |
| Research question | 1 page |
| Research methodology | 1 page |
| Literature review | 2 pages |
| Conclusion, recommendations, results | 1 page |
| AI usage accountability | 1 page |
| Bibliography | 1 page |

### Presentation

- Realization walkthrough
- Artifacts showcase
- Live demonstration of the POC
- Conclusion

### Individual Reflection

Each team member submits an individual reflection on the process, using a method taught in Communication Skills or an approved alternative.

## Planning

| Phase | Deliverable | Activities |
|---|---|---|
| **Contact Moment 1** | Draft 1 | Group formation, research question, research methodology |
| **Contact Moment 2** | Draft 2 | Progress update, literature review, prototype (initial), preliminary results, feedback |
| **Contact Moment 3** | Final Paper + Presentation | Submit final paper, individual reflection, deliver presentation |

## AI Usage Policy

AI tools may be used, but responsibly:

- **Be critical** — Verify every AI-suggested source using the CRAAP method to eliminate hallucinations (document as artifact)
- **Be transparent** — Describe which AI tools were used and for which tasks, including example prompts and outputs (document as artifact)
- **Learn to prompt** — Effective use of GenAI is considered an essential skill
- **Be honest** — Never copy AI output verbatim; demonstrate that you can process it into original, personal text

## Evaluation

- First exam opportunity: group assignment with individual grading
- Second exam opportunity: individual assignment
- Attendance is mandatory for all contact moments (on campus)

## Repository Structure

```
research_project/
├── course_material/       # Course documentation and assignment briefs
├── README.md              # This file
```
