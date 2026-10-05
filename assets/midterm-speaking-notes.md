# Adcut Logo Vectorizer: midterm speaking notes

UNC COMP 523, Team E. Prepared October 4, 2026 for October 5 readiness.

Suggested speaking allocation, subject to the team's confirmation: Jennifer slides 1-2; Hamsini slides 3-4; Vibhas slides 5-6; Alex slides 7-8. Target speaking time is 8 minutes 20 seconds. Rehearse aloud and adjust pacing to leave room for questions and transitions in the 10-12 minute slot. These are speaking notes, not a record of rehearsal or team approval.

## 1. Introduction (40 seconds)

We are Team E: Jennifer Lee, Hamsini Tankala, Vibhas Nair, and Alex Tang. Our project is Adcut Logo Vectorizer, and our client contact is Nick Dokich. Adcut needs to turn customer logo images into geometry for its water jet cutting workflow. Our application will prepare those drawings for downstream CAD tools. Today we will cover the employee workflow, interface design, system metaphor, architecture, and selected development platform.

## 2. Users and workflow (65 seconds)

The intended users are Adcut owners and employees. A customer supplies artwork, often a photo or raster logo. Employees need to turn its colored regions into usable cutting geometry. The core interaction is to upload the artwork and download a DXF file that works in the downstream machine workflow. Color boundaries matter: even when two colors use the same material, the client wants those colors represented as distinct sections. Our processing pipeline will identify those regions and trace their boundaries. We will ask for an explicit physical output dimension so that pixels do not silently determine fabrication size. The application prepares geometry; CAD and CAM software still handle the cutting job.

## 3. Scope and cutting quality (70 seconds)

The confirmed core is image upload, vectorization, and usable file export. Preview and editing are optional rather than prerequisites to the basic workflow. Nick highlighted a problem he encountered with a competing tool: curved shapes became many short straight segments. We therefore plan native circles and arcs where the geometry supports them. That is a design objective, not a solved tracing result. DXF is our first export target. The client also prefers DWG and can use SVG as a fallback. We still need confirmation of DXF conventions, units, layers, tolerances, and accepted entities. PDF region selection and correction of enlarged low-resolution artwork are further design topics, not approved core requirements.

## 4. Interface design (75 seconds)

This is a static mockup of the planned local browser interface. The employee selects artwork, enters the required output width and units, and starts conversion. Color controls belong to the proposed design and still need validation against sample artwork. An optional preview can show the source and traced boundaries, alongside warnings that require review. Download becomes available only after conversion and validation succeed. Invalid files should leave the previous job untouched and produce a specific error. If geometry cannot be exported reliably, the system should explain the issue rather than offer a file as though it were ready for cutting. The preview does not prove machine compatibility; downstream import testing is still required.

## 5. System metaphor (50 seconds)

Our system metaphor is a digital stencil workshop. The artwork is the pattern, and the distinct colored sections become stencil pieces. Tracing describes each piece's edge. Curve fitting refines the geometry, and the DXF package carries those templates into CAD preparation. This vocabulary connects the user workflow to our modules. It also sets a useful boundary: the workshop prepares templates, but does not run the water jet or reconstruct detail missing from a blurry image. Adjacent stencil pieces also remind us that shared borders require careful handling so that we do not accidentally produce duplicate cutting instructions.

## 6. Architecture (85 seconds)

The Streamlit interface manages files, settings, progress, and downloads. Input adapters decode artwork into an image representation. The processing layer segments colors and builds region boundaries with holes and adjacency information. A separate geometry stage will fit supported curves and apply the chosen physical scale. A validator checks closure, finite coordinates, degenerate entities, and duplicate boundaries before the export adapter writes DXF. Keeping this logic outside the UI allows tests to run without a browser. The existing foundation demonstrates native-circle DXF serialization with seven automated tests and a passing Windows check. It does not yet convert images. AutoCAD and IGEMS validation sit outside the application and require client samples and access to the target workflow.

## 7. Platform (65 seconds)

We selected Python 3.11 and a local Streamlit browser interface for Windows. This keeps the UI and image-processing code in one language while we work on the geometry problems. OpenCV and NumPy provide image processing and contour operations. Pillow handles image decoding, and pypdfium2 is selected for later PDF rasterization. ezdxf handles DXF serialization. We use VS Code and GitHub, with pytest, Ruff, and pre-commit for development checks. Local execution is our initial deployment decision, not a client prohibition on cloud hosting. Hardware sizing and processing time need representative-file measurements. Native DWG export remains a separate feasibility question.

## 8. Progress and validation (50 seconds)

The website now contains the revised specifications, platform decision, architecture, system metaphor, and interface design. The separate development repository contains the tested native-circle export foundation. The next implementation work is the image-processing pipeline, shared-boundary handling, and curve fitting. The key external dependencies are representative artwork, accepted CAD examples, and confirmation of the target export conventions. Our acceptance endpoint is a DXF that works in Adcut's actual workflow. We have not performed that acceptance test yet. Thank you; we welcome questions about the design and the validation approach.

## Questions and concise answers

- **Why Streamlit instead of React?** It keeps the initial workflow in one Python codebase. Rich manual editing could justify a different UI later, but editing is not confirmed as core.
- **Why not just export every contour as line segments?** The client reports that excessive short segments hurt cutting quality. We need to test curve fitting and entity quality as well as visual similarity.
- **Does the tool produce DWG?** Not currently. DXF is the first target. Native DWG needs a separately reviewed conversion approach and licensing decision.
- **What is already running?** A native-circle DXF export foundation with automated tests. The full image converter has not been implemented.
- **How will you prove correctness?** Synthetic geometry fixtures first, then permitted client artwork and accepted CAD references, then AutoCAD/IGEMS import and client acceptance. Exact tolerances remain unconfirmed.
- **Can a blurry image become an accurate ten-foot logo?** Scaling alone cannot recover missing information. Warnings and review are necessary; accuracy claims require sample-based validation.
- **What does the client still need to provide?** Representative artwork, accepted outputs, tool versions, DXF conventions, and agreed acceptance tolerances.

## Reference basis

Project facts reflect the client responses supplied to the team. Course format follows https://www.cs.unc.edu/~stotts/COMP523-F26/midTerm.html and the Fall 2026 portion of https://www.cs.unc.edu/~stotts/COMP523-F26/calendar.html. The course requires all four members to contribute and speak. The team must review and revise these materials, perform its own rehearsal, and confirm submission.
