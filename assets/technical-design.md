# Adcut Logo Vectorizer: technical design

Team E, UNC COMP 523. October 4, 2026. Midterm design baseline.

This document describes the selected implementation direction. It is not client sign-off, a completed application, or a machine-readiness certification.

## Purpose and boundary

Adcut employees upload customer artwork and obtain distinct color-region geometry for downstream CAD preparation. DXF is the initial export target. AutoCAD/IGEMS import and machine preparation remain external. The application does not generate machine instructions or control a water jet.

## Platform decision

Python 3.11 with Streamlit on Windows is the initial platform. VS Code is the selected IDE. OpenCV and NumPy support segmentation and contour extraction; Pillow decodes raster images; pypdfium2 supports later PDF rasterization; ezdxf serializes DXF. pytest, Ruff, pre-commit, and GitHub Windows CI provide checks. The application starts as a local process with a browser interface. No cloud service or image upload to an external processor is required by this design.

React/Vue would allow richer manual editing but adds a separate frontend/API boundary. That cost is not justified for the initial upload/export workflow. Potrace and vtracer are comparison candidates, not selected dependencies: their suitability for required CAD curves and shared boundaries needs evaluation. PyInstaller packaging follows a working pipeline. Native DWG remains outside the first implementation until conversion feasibility and licensing are reviewed. Hardware minimums and processing limits remain unmeasured.

## Component responsibilities and contracts

| Component | Input | Output | Responsibility |
| --- | --- | --- | --- |
| Interface | Artwork, output width, units, optional processing settings | Conversion request, progress, warnings, download | Validate required fields; isolate job state; prevent stale downloads |
| Decoder | File bytes, media type, optional PDF page/selection | Oriented RGBA image plus source metadata | Reject corrupt input; preserve aspect ratio; make page/frame selection explicit |
| Segmentation | Image and proposed color settings | Region labels and palette | Reduce raster noise and separate distinct colors without merging solely by material |
| Topology builder | Region labels | Closed boundaries, holes, shared-edge relationships | Retain holes and region identities; identify boundaries shared by neighboring regions |
| Geometry fitter | Boundaries and tolerance settings | Lines, circles, arcs, closed region loops | Fit supported entities; report residual error; retain source-region association |
| Scale transform | Geometry, image extent, explicit width and units | Physical-coordinate geometry | Apply uniform scale and coordinate orientation consistently |
| Validator | Geometry and export profile | Accepted geometry or actionable issues | Check finite coordinates, closure, degeneracy, supported entities, duplicates |
| Export adapter | Validated geometry and profile | DXF bytes; later SVG fallback | Serialize without changing topology or silently inventing missing units |

These are proposed contracts, not implemented APIs. The current repository implements native-circle DXF serialization only.

## Geometry model and invariants

A region has an identifier, a source color, an exterior boundary, and zero or more holes. An edge can be referenced by neighboring regions with opposite directions. Geometry entities carry explicit coordinates and a type. The export profile carries units and DXF version. Region identity and fabrication material assignment are different concepts.

Closed-region requirements and duplicate-cut avoidance must both survive export. Shared boundaries should exist once in the internal model, while region loops reference them. Whether downstream CAD expects separate closed loops, deduplicated cutting edges, or a particular layer arrangement needs client confirmation. The exporter must not silently choose a machine strategy that loses region closure or doubles cuts.

Raster coordinates use a top-left origin and downward y-axis. The CAD transform must consistently invert the y direction, translate the origin, and scale all coordinates and radii. For a selected artwork width of W pixels and requested physical width L, the nominal uniform scale is L/W; the exact pixel-edge convention must be tested. Units cannot be inferred from pixel count or a PDF's appearance.

## UI behavior

The initial screen contains file selection and explicit output dimension/units. Proposed color settings and optional preview are secondary. Convert stays unavailable while required inputs are missing or invalid. During processing, a status indicator reports the active stage and duplicate starts are prevented. A failure names the failing stage and preserves the input/settings for correction. A successful job exposes the matching export and warnings. Changing the source or output settings invalidates the previous download until conversion runs again.

The midterm mockup represents a single upload/settings/preview/export screen. It is a design artifact, not a functioning interface. PDF area selection and manual path editing are later candidates.

## Input and output scope

JPEG and PNG are the first implementation targets because the client named them. WEBP, GIF, and PDF remain project-brief coverage targets; animation frame selection, PDF page selection, transparency, and color management require explicit policy and tests. Exact file-size and dimension limits will follow measurement rather than an invented requirement.

DXF is the first output. R2000 is the existing development default, not an approved client format. R12 compatibility must be separately tested if required. DWG is a client preference with unresolved implementation feasibility. SVG is a fallback, not proof of CAD compatibility.

## Validation plan

| Test family | Evidence to collect | Passing condition |
| --- | --- | --- |
| Decode | Valid and corrupt representative files | Supported files decode correctly; invalid files produce clear errors |
| Regions | Synthetic adjacent colors, holes, islands | Expected region identities and topology survive processing |
| Curves | Known circles/arcs at multiple raster sizes | Entity type and geometric error are measured against an agreed tolerance |
| Scaling | Known-size shape in mm and inches | Dimensions and orientation round-trip without unintended distortion |
| Boundaries | Adjacent regions and thin details | No unintended missing, doubled, or degenerate edges |
| Serialization | DXF re-read and library audit | Expected entities/units preserved and audit clean |
| Target import | Client files in AutoCAD/IGEMS | Client confirms accepted import and downstream usability |
| Performance | Representative files and recorded hardware | Measured runtime compared with the client's informal under-one-hour expectation |

Seven automated tests currently cover the native-circle foundation, invalid radii, explicit units, and empty input. Windows CI passed for that foundation. This does not validate image tracing, native arc fitting, downstream software, or cutting quality.

## Delivery sequence and unresolved decisions

Implement JPEG/PNG decoding and region topology first, then physical scaling and DXF export, followed by curve fitting and target-tool validation. Add preview, further formats, and packaging after the core path is reliable. Samples and accepted CAD outputs are needed to resolve tolerances, units, layers, DXF version, and supported entities. Team members and instructors need confirmed repository access; publication of the website does not grant access to the private development repository.

## References

- Streamlit: https://docs.streamlit.io/get-started/installation
- OpenCV contours: https://docs.opencv.org/4.x/d4/d73/tutorial_py_contours_begin.html
- ezdxf: https://ezdxf.readthedocs.io/en/stable/
- pypdfium2: https://pypdfium2.readthedocs.io/en/stable/
- Course midterm: https://www.cs.unc.edu/~stotts/COMP523-F26/midTerm.html
