# Course and project tasks - October 4, 2026

## Completed in this update

- [x] Read Fall 2026 calendar and midterm instructions, excluding older semester material.
- [x] Preserve team edits and incorporate initial and follow-up client feedback.
- [x] Correct stale current-status text, output preferences, color/material description, optional editing, and broken question anchors.
- [x] Select and document the starting platform, alternatives, and tradeoffs.
- [x] Publish the midterm architecture diagram, UI mockup, system metaphor, and technical design baseline with contracts, geometry invariants, interaction states, and validation strategy.
- [x] Publish the editable eight-slide PowerPoint with a full speaking script, suggested four-person allocation, timing guidance, and Q&A notes.
- [x] Create a separate private development repository with a native-circle exporter, seven tests, Windows CI, formatting and commit hooks, setup instructions, and implementation backlog.

## Human tasks before October 5 class

- [ ] All four members review and substantially revise the written/deck drafts as needed under the course AI guidance.
- [ ] Assign speaking parts and perform a timed rehearsal within the 10-12 minute slot including questions and transitions.
- [ ] Open the PPTX on the presenting computer and check projector/podium access.
- [ ] Confirm the instructor received the project URL and has the required access.
- [ ] Agree a tech-talk topic and confirm/email it to the instructor. It was due at end of week of September 21. Suggested topic: native CAD curves versus segmented raster tracing.
- [ ] Attend October 5, 7, and 12 presentation sessions; all teams must be ready October 5.

## Information and implementation still required

- [ ] Add teammate/client/instructor repository access using confirmed GitHub accounts.
- [ ] Reconcile this new repository with the repository Nick offered, to avoid splitting development history.
- [ ] Obtain permitted sample artwork and accepted CAD outputs.
- [ ] Confirm actual DXF version, units, layers, scale, arc conventions, tool versions, and acceptance tolerances with Adcut.
- [ ] Build upload, segmentation, shared-boundary tracing, curve fitting, SVG fallback, and the Streamlit interface.
- [ ] Validate holes, adjacent regions, small logos enlarged to fabrication scale, and AutoCAD/IGEMS imports.
- [ ] Decide DWG export, PDF region selection, and editing scope after feasibility work.
- [ ] Record actual meetings and progress since September 21. Do not fabricate dates, attendance, decisions, or implementation progress.
- [ ] Prepare the ethics assignment due at end of week of October 19.

## Draft tech-talk email (not sent)

To: help-comp523@cs.unc.edu
Subject: COMP 523 Team E - Proposed Tech Talk Topic

Hello Professor Stotts,

Team E proposes a tech talk on representing raster logo boundaries as native CAD lines and arcs, including why excessive short segments can reduce water jet cutting quality. We would cover the difference between visual tracing and usable CAD geometry, DXF entities, and validation in downstream CAD software.

Please let us know whether this scope is suitable. Our project website is https://jennifer566.github.io/adcut-logo-vectorizer-site/.

Thank you,
COMP 523 Team E

## Sources

- https://www.cs.unc.edu/~stotts/COMP523-F26/calendar.html
- https://www.cs.unc.edu/~stotts/COMP523-F26/midTerm.html

The calendar states end-of-week deadlines without exact hours. The midterm slot is 10-12 minutes total. The page's separate 3-4 minute estimate per member conflicts with four speakers in that slot, so rehearse to the total limit.
