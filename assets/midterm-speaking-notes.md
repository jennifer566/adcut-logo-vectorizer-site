# Adcut Logo Vectorizer: exact midterm script

UNC COMP 523, Team E. Prepared October 4, 2026.

This script is written word for word for the eight-slide presentation. At a normal speaking pace it targets about eight minutes and twenty seconds, leaving time for questions and transition inside the ten-to-twelve-minute slot.

Suggested speaker assignment: Jennifer, slides 1 and 2; Hamsini, slides 3 and 4; Vibhas, slides 5 and 6; Alex, slides 7 and 8. The team should confirm the assignment and rehearse aloud.

## Slide 1: Adcut Logo Vectorizer (40 seconds)

> Good morning. We are Team E: Jennifer Lee, Hamsini Tankala, Vibhas Nair, and Alex Tang. Our client contact is Nick Dokich from Adcut. Adcut creates custom flooring and turf designs, and the company needs a faster way to turn customer logo images into geometry that can be prepared for water jet cutting. Our project is Adcut Logo Vectorizer. We are designing a Windows application that separates the colored sections of a logo, traces their boundaries, and exports CAD geometry for Adcut's existing workflow. Today, we will explain the user workflow, interface, system metaphor, architecture, and development platform.

## Slide 2: From customer artwork to CAD geometry (65 seconds)

> The intended users are Adcut owners and employees. A customer may send a JPEG, PNG, or another image that looks correct on screen but does not contain usable cutting geometry. The employee first uploads that artwork. The application then identifies each distinct color region. The client told us that different colors must remain separate regions even when they represent the same material, so we cannot merge regions simply because their material is identical. Next, the application traces closed boundaries and converts suitable shapes into smooth CAD geometry. The employee enters a physical output dimension and units because pixel size alone cannot determine fabrication size. The minimum successful workflow is simple: upload the image, process it, and download a DXF that works in Adcut's downstream CAD and cutting process.

## Slide 3: Cutting quality depends on geometry (70 seconds)

> Visual similarity is not enough for this project. Nick described a problem with another vectorization tool: it can represent a curve with thousands of short straight segments. The result may look round on a monitor, but that geometry can reduce cutting quality and make the CAD file harder to edit. The comparison on this slide shows that difference. On the left, a circle consists of many small segments and control points. On the right, one native circle describes the same shape cleanly. Our design therefore treats native lines, circles, and arcs as a quality goal whenever the source supports them. DXF is our first export target. The client also prefers DWG and can use SVG as a fallback, but exact DXF conventions and native DWG feasibility still require validation.

## Slide 4: Proposed employee interface (75 seconds)

> This is our proposed interface for the initial workflow. The employee chooses an artwork file, enters the required output width, and selects millimeters or inches. The color-region setting allows the employee to guide the initial separation when automatic detection needs help. After the employee selects Convert, the application reports its current stage and prevents duplicate conversion requests. The optional preview compares the source artwork with traced boundaries and displays warnings when geometry needs review. Download DXF becomes available only after conversion and validation succeed. If the file is invalid or the geometry cannot be exported reliably, the interface keeps the employee's settings and explains what needs correction. Changing the source or scale invalidates the previous download so that an outdated file cannot be mistaken for the current result.

## Slide 5: System metaphor: a digital stencil workshop (50 seconds)

> Our system metaphor is a digital stencil workshop. The customer's artwork is the pattern. Each distinct color region becomes a separate stencil piece. Tracing defines the edge of each piece, and curve fitting improves that edge for CAD use. The final DXF packages the pieces for downstream preparation. This metaphor gives the team a consistent vocabulary for the system. It also clarifies two important boundaries. First, the application prepares geometry but does not operate the water jet. Second, it cannot recreate detail that is missing from a blurry image. The stencil idea also helps us reason about adjacent regions, because neighboring pieces can share an edge without requiring two unintended cuts.

## Slide 6: Proposed system architecture (85 seconds)

> The interface layer uses Streamlit and handles file selection, settings, progress, warnings, and downloads. Input adapters decode image formats with Pillow and will later rasterize PDF pages with pypdfium2. The processing layer uses OpenCV and NumPy to reduce colors, identify regions, and extract boundaries. A separate geometry stage will preserve holes and shared edges, fit lines, circles, and arcs, and apply the selected physical scale. Before export, validation checks for open paths, invalid coordinates, degenerate entities, and unintended duplicate boundaries. The export adapter uses ezdxf to write native DXF entities. Keeping processing and export logic separate from the interface allows us to test them without a browser. Our current foundation exports native circles and has seven automated tests. Image-to-DXF conversion, arc fitting, and shared-boundary processing remain implementation work. AutoCAD and IGEMS import are external acceptance steps.

## Slide 7: Selected development platform (65 seconds)

> We selected Python 3.11 with Streamlit for the initial Windows application. This keeps the interface and image-processing pipeline in one language while we solve the geometry problems. OpenCV and NumPy support segmentation and contour operations. Pillow handles raster image decoding, pypdfium2 is planned for PDF input, and ezdxf serializes the DXF output. We use VS Code and GitHub for development, with pytest, Ruff, pre-commit, and Windows continuous integration for automated checks. The application will run locally through a browser interface. The client allows cloud hosting, but local execution avoids sending customer artwork to an external service during the initial version. React or Vue could support richer editing later. Native DWG export remains a separate feasibility and licensing question.

## Slide 8: Current evidence and next validation (50 seconds)

> For the midterm, we have completed the updated specifications, interface design, system metaphor, architecture, platform decision, and technical design baseline. The private development repository contains a native-circle DXF exporter, seven passing tests, and a passing Windows check. We are not presenting a finished converter, and we have not yet validated output in Adcut's machine workflow. The next technical work is image decoding, color segmentation, region topology, shared-boundary handling, and curve fitting. We also need permitted sample artwork and accepted CAD examples from Adcut. Those samples will let us confirm units, scale, layers, DXF version, supported entities, and error tolerances. Our final acceptance target is a DXF that Adcut can successfully use in its existing workflow. Thank you. We are ready for questions.

## Prepared answers for likely questions

**Why Streamlit instead of React or Vue?**

> Streamlit keeps the initial interface and processing pipeline in one Python codebase. A richer manual editor could justify a separate frontend later, but manual editing is not confirmed as part of the core workflow.

**Why not export every contour as line segments?**

> The client reports that excessive short segments reduce cutting quality and make files harder to work with. We need to evaluate entity quality and geometric error, not only visual similarity.

**Does the application produce DWG files?**

> Not in the initial design. DXF is the first target. Native DWG requires a separate conversion approach and a licensing review.

**What currently works?**

> The development foundation exports native circle entities to DXF and has seven automated tests. The full image conversion pipeline has not been implemented.

**How will the team prove that the output is correct?**

> We will start with synthetic shapes whose geometry is known. Then we will test permitted client artwork and accepted CAD examples. Final validation requires successful import into AutoCAD or IGEMS and confirmation from Adcut. Exact tolerances still need client input.

**Can the application make a blurry logo accurate at a ten-foot size?**

> Scaling cannot recover missing detail. The application should warn the employee when the source quality limits the output, and any accuracy claim must come from sample-based testing.

## Reference basis

Project facts reflect the client responses supplied to the team. Course format follows https://www.cs.unc.edu/~stotts/COMP523-F26/midTerm.html and the Fall 2026 portion of https://www.cs.unc.edu/~stotts/COMP523-F26/calendar.html. The generated presentation images are representative illustrations and do not depict Adcut's actual equipment, artwork, or output.
