# Changelog

All notable changes to the Norumoto Website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.7.6] - 2026-07-28

### Changed
- **Human Concierge UI Transformation**: Replaced technical header badge `Online (RAG Active)` with `Sales Executive • Online` / `Perunding Jualan • Dalam Talian`.
- **Natural Greeting Message**: Updated welcome greeting to a warm executive concierge greeting.
- **Natural Typing Indicators**: Replaced machine boot-up log rotation (`Waking up AI engine`, `Analyzing RAG`, etc.) with natural typing status indicators (`Syazwani sedang menaip...` / `Syazwani is typing...`).
- **SITE_VERSION Bump**: Bumped site version to `2.7.0` in `website.js`.

## [2.7.5] - 2026-07-27

### Added
- **Browser Favicon Integration**: Set the official green Norumoto emblem logo (`emblem_logo_v3.png`) as the browser tab favicon.

### Changed
- **Footer Brand Logos Resize**: Scaled up the Norumoto emblem logo (from height 30px to 55px) and text logo (from height 16px to 28px) in the footer to improve brand visibility.
- **Cache Busting Version Bump**: Updated references and query strings across files to `v2.7.5`.

## [2.7.4] - 2026-07-27

### Changed
- **HQ Google Maps URL Update**: Replaced the generic search query link with the official Google Maps direct link (`https://maps.app.goo.gl/D9PetZURPeHo9MrM8`) for the HQ office address.
- **Cache Busting Version Bump**: Updated references and query strings across files to `v2.7.4`.

## [2.7.3] - 2026-07-27

### Fixed
- **Local Booking Form Visibility**: Added `style="display: none;"` directly to the `<form id="lead-booking-form">` wrapper tag. This resolves the bug where the local form was still rendering directly below the embedded Test Ride Portal iframe.
- **Cache Busting Version Bump**: Updated references and query strings across files to `v2.7.3`.

## [2.7.2] - 2026-07-27

### Changed
- **HQ Address Update**: Updated official headquarters address from LOT 57108 to LOT 79979 in both footer markup and script dealer fallback arrays.
- **Clickable Contacts & Address Links**: Modified the footer address blocks to link directly to Google Maps search URLs, and wrapped all phone numbers in native `tel:` dialer links. Configured links to inherit text color and omit underlining to maintain consistent design styling.
- **Cache Busting Version Bump**: Updated references and query strings across files to `v2.7.2`.

## [2.7.1] - 2026-07-27

### Changed
- **Removed Local Booking Wizard Entirely**: Completely hid the local pre-order booking form container (`#lead-booking-form` and progress wizard), shifting focus fully to the official Test Ride questionnaire portal.
- **Embedded External Test Ride Portal**: Replaced the right form panel in the booking section with a seamless `iframe` embedding the official test ride questionnaire directly into the page.
- **Rebranded Reservation Section Details**: Updated the left details panel to align with the Test Ride theme ("Experience Norumoto Today" and trial terms).
- **Cache Busting Version Bump**: Updated references and query strings across files to `v2.7.1`.

## [2.7.0] - 2026-07-27

### Added
- **Dedicated Test Ride Portal Integration**: Integrated the official test ride questionnaire and liability waiver portal (hosted at `https://norumoto-ev-test-ride.web.app/`) strategically into the website.
- **Strategic Navigation & Hero CTAs**: Updated the header navigation CTA and added a primary secondary CTA button in the Hero section to link directly to the Test Ride portal in a new tab.
- **Strategic Test Ride Promo Card**: Embedded a styled promotion alert card within the pre-order details container prompting prospective riders to complete their license credentials and liability waiver on the portal.

### Changed
- **Removed Redundant Local Test Ride Fields**: Hidden the local "Enquiry Type" tabs selection and preferred date/time inputs within the booking section, refocusing the local wizard form strictly on Placing Pre-Orders (which collects coordinates, dealerships, and financing preferences).
- **Enforced Address Verification**: Made the "Delivery Address" input field legally required by default for all Pre-Orders.
- **Cache Busting Version Bump**: Updated references and query strings across files to `v2.7.0`.

## [2.6.8] - 2026-07-26

### Changed
- **Mobile Portrait Background Framing Override**: Added targeted media queries for mobile viewports (`@media (max-width: 768px)`), adjusting `background-position` to `left 25%` and setting `background-attachment: scroll`. This ensures optimal framing of the subject's face on mobile screens while eliminating mobile fixed-parallax scrolling stutter.
- **Cache Busting Version Bump**: Updated version attributes and references to `v2.6.8` across link imports and system variables.

## [2.6.4] - 2026-07-25

### Changed
- **Darkened Wallpaper Background overlays**: Restored the dark theme status for `.core-tech-sec` and `.tech-sec` by applying a heavy linear-gradient overlay (`rgba(10, 11, 18, 0.85)`). This ensures maximum text legibility and contrast for all white titles and body paragraphs.
- **Prevented Subject Face Cropping**: Changed the background attachment from `fixed` to `scroll` and adjusted background position to `center 10%` for both campus scooter sections. This locks the subject's face fully within the visible frame across all screens without cropping.
- **Cache Busting Version Bump**: Updated version attributes and references to `v2.6.4` across link imports and system variables.

## [2.6.3] - 2026-07-25

### Changed
- **Precise Bounding Box Overlay Alignment**: Replaced hotspot label horizontal and vertical scaling coordinates with exact, canvas-derived pixel offsets. Swapped the horizontal center translation to pure left alignment (`transform: translateY(-50%)`) to start the active text at the exact character start point in the drawing, masking the underlying white text 100% cleanly.
- **Cache Busting Version Bump**: Updated version attributes and references to `v2.6.3` across link imports and system variables.

## [2.6.2] - 2026-07-25

### Changed
- **Synchronized Overlay text with Blueprint Image**: Updated all active HTML label tooltips in `index.html` to match the exact static text baked in the blueprint image (e.g. "Solid State Dashboard", "Graphene Steel Wire Tyre", "Liquid-cooled Motor 2.0").
- **Synchronized Sidebar Detail Cards**: Updated `techData` inside `luyuan_features.js` and language translations in `website.js` to align their English/Malay titles exactly to the blueprint terms, achieving full synchronization between left overlay and right detail box.
- **Cache Busting Version Bump**: Updated version attributes and references to `v2.6.2` across link imports and system variables.

## [2.6.1] - 2026-07-25

### Changed
- **Align Hotspot Tooltips using Container Queries**: Implemented container queries on `.diagram-img-wrapper` (`container-type: inline-size`) and absolute-positioned `.hotspot-label` using `cqw` responsive units. This ensures all active HTML labels sit directly, perfectly centered on top of the baked-in white text in the image across all responsive desktop and tablet viewports.
- **Cache Busting Version Bump**: Updated version attributes and references to `v2.6.1` across link imports and system variables.

## [2.6.0] - 2026-07-25

### Changed
- **Reverted Left Card to Dark Glass style**: Reverted the left diagram container `.diagram-viewport` background back to the dark card layout (`rgba(10, 10, 12, 0.88)` with glassmorphic backdrop-filter) to match the dark aesthetic stage of the mockups.
- **Restored Original Blueprint Image inside Dark Card**: Restored the original scooter blueprint image containing the white labels and pointer lines. Because they are white, they render with high contrast and visibility against the dark card.
- **Cache Busting Version Bump**: Updated version attributes and references to `v2.6.0` across link imports and system variables.

## [2.5.9] - 2026-07-25

### Changed
- **Restored White Card Background for Left Box**: Restored solid white background (`#ffffff`), border, and soft shadow for the left diagram container `.diagram-viewport` in both `tech_layout.css` and `luyuan_features.css`.
- **Restored Original Scooter Blueprint Image**: Restored the original transparent scooter blueprint image with all dark-grey labels and pointer lines from the backup file, allowing them to render with maximum contrast on the white container.
- **Cache Busting Version Bump**: Updated version attributes and references to `v2.5.9` across link imports and system variables.

## [2.5.8] - 2026-07-25

### Changed
- **Erase White Background of Focused Component Images**: Wrote a Python script to scan and convert all pure white background pixels in the 8 focused component rendering drawings to 100% transparent PNGs. This completely eliminates the white box frame on dark cards without color distortion.
- **Removed Image Color Inversions**: Restored natural colors and styling for component drawings (removing `filter: invert(1)` and `mix-blend-mode: screen`), rendering the high-definition product images cleanly on the dark glass container.
- **Robust Scooter Pointer Lines Erasure**: Automated the white line and text erasure on the left (`x < 780`) and right (`x > 1140`) of the scooter blueprint, removing all floating residual lines with pixel-level precision.
- **Cache Busting Version Bump**: Updated version attributes and references to `v2.5.8` across link imports and system variables.

## [2.5.7] - 2026-07-25

### Changed
- **Brightened Focused Component Drawings**: Applied `filter: invert(1)` and `mix-blend-mode: screen` on the focused component rendering images (`.tech-info-img-box img`) inside the dark card. This inverts the dark line drawings to bright, glowing white schematics and blends their backgrounds 100% transparently, restoring full visibility and brightness.
- **Removed Diagram Radial Gradient Spotlight**: Removed the radial gradient background from `.diagram-img-wrapper` to restore the clean dark card viewport layout.
- **Restored Wallpaper Dark Gradients**: Restored the original linear-gradient overlays on the background wallpapers of `.core-tech-sec` (and `.tech-sec`) to ensure optimal visual contrast and text legibility.
- **Cache Busting Version Bump**: Updated version references to `v2.5.7` across link imports and system variables.

## [2.5.6] - 2026-07-25

### Changed
- **Erase Baked-In Text Labels**: Used correct pixel coordinates to erase all white text labels and horizontal lines from `core_technology_scooter.png`. This completely resolves the double-text overlap with the active HTML labels.
- **Radial Gradient Background Glow**: Added a soft white radial gradient background to `.diagram-img-wrapper` to restore full contrast and brightness of the transparent scooter detail lines on dark card viewports.
- **Shortened Core Tech Subtitle**: Shortened the subtitle in `index.html` and updated `website.js` translation map to prevent line-wrapping positioning issues in browsers.
- **Brightened Wallpaper Background**: Removed the dark linear gradient overlays from `.core-tech-sec` (and `.tech-sec`) to restore the background wallpaper to 100% natural brightness.
- **Cache Busting Version Bump**: Updated version attributes and references to `v2.5.6` on all link imports and system variables.

## [2.5.5] - 2026-07-25

### Changed
- **Positioned Core Tech Title and Subtitle**: Centered the title and subtitle of `#core-technology` to avoid clashing with the background image subject on the left.
- **Removed White Card Image Box Frame**: Set `.core-tech-layout-wrapper .tech-info-img-box` background to transparent to let detail drawings blend seamlessly into the dark glassmorphic cards.
- **Cache Busting Version Bump**: Updated references to `v2.5.5`.

## [2.5.2] - 2026-07-25

### Changed
- **Enlarged Core Technology Displays**: Increased the max-width and height boundaries of the main motor/scooter diagram viewport and container on desktop, allowing the core vehicle graphic (and Spline 3D viewer) to scale up significantly.
- **Enlarged Part Images**: Doubled the height of the selected component detail image card (`.tech-info-img-box`) on the right to make the focused parts illustrations significantly larger.
- **Cache Busting Version Bump**: Updated version attributes and references to `v2.5.2`.

## [2.5.0] - 2026-07-25

### Added
- **Combined Design Studio & Gallery**: Integrated the descriptive color cards and custom speed mode options directly into the `#configurator` section, dismissing the redundant separate `#gallery` block.
- **Dynamic Color Descriptions**: Implemented dynamic translation-friendly color descriptions that update seamlessly when switching color swatches in either English or Malay.
- **Official Specifications Categories**: Reorganized the specifications table into the exact 5 official specs categories (Performance, Power System & Battery, Chassis & Control, Dimensions & Weight, Smart Features & Safety).

### Changed
- **Official Specs Copy Overhaul**: Aligned all headings, subheadings, and tech specification details across the Performance, Design, Technology, and FAQ sections with the official specs table (replacing unstructured copies like *Tesla-Grade*, *Carbon Panels*, and *Dual Displays*).
- **Refined Display Title**: Renamed the handlebar instrument screen feature to **Dual Smart LED / TFT Digital Screen** per design feedback.
- **Cleaned Warranty Specs**: Cleaned up specs and FAQ answers to refer to standard **2-years OR 20,000 km** warranty.
- **Cache Busting Version Bump**: Updated link imports and system variables to `v2.5.0` for all stylesheets and scripts.

## [2.4.3] - 2026-07-23

### Changed
- **Unified Pure White Card Container Background**: Changed `.tech-info-img-box` background from light grey `#f5f5f7` to pure white `#ffffff` to ensure the white background of the component images merges 100% seamlessly and has no visible borders/margins inside the card.
- **Cache Busting Version Bump**: Updated stylesheet version references in `index.html` to `v=2.4.3`.

## [2.4.2] - 2026-07-23

### Changed
- **Restored Main Diagram Scooter Display**: Reverted `core_technology_scooter.png` and `.diagram-viewport` background to their original solid, unblended dark card styles (removing `mix-blend-mode: screen` and transparent viewport settings).
- **Detail Focused Card Image Refinement**: Positioned the focused component image container (`.tech-info-img-box`) as a floating rounded light-grey inset container (`border-radius: 18px` with margins) inside the dark glass sidebar.
- **Enlarged and Blended Component Graphics**: Configured the component detail images to use `mix-blend-mode: multiply` to blend their white backgrounds seamlessly and scaled them up by `1.35x` to make them larger and more focused.
- **Cache Busting Version Bump**: Updated stylesheet version references in `index.html` to `v=2.4.2`.

## [2.4.1] - 2026-07-23

### Added
- **Fullscreen Immersive Core Tech Section**: Overhauled `#core-technology` to a full screen height (`100vh`) using the `campus_scooter_sunny.webp` campus wallpaper as a background.
- **Glassmorphic Sidebar Detail Card**: Refactored the detail panel (`#tech-info-modal`) to sit as an absolute-positioned floating glassmorphic card on the right on desktop, stacking vertically on mobile.
- **Transparent Scooter Graphic Blending**: Added `mix-blend-mode: screen` to the main scooter hotspot diagram (`core_technology_scooter.png`) to make its solid dark background transparent, allowing it to float directly over the campus scene.
- **Cache Busting Version Bump**: Updated stylesheet import references in `index.html` to `v=2.4.1`.
